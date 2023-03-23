import { GLUtils } from "./webglutils";
import { $gl } from "./gl";
import { Texture } from "../types";
import { Renderer, RenderLayer } from "./renderer";

const { mat4, vec3 } = require("gl-matrix");
const nw = (window as any).nw;
const fs = nw.require("fs");

const vert_source = `#version 300 es

in vec4 a_position;
in vec2 a_texcoord;

uniform mat4 u_projection;
uniform mat4 u_matrix;

out vec2 v_texcoord;

void main() {
    gl_Position = u_projection * u_matrix * a_position;
    v_texcoord = a_texcoord;
}
`;

const frag_source = `#version 300 es
precision highp float;

in vec2 v_texcoord;

uniform sampler2D u_texture;

out vec4 outColor;

void main() {
    outColor = texture(u_texture, v_texcoord);
}
`;


let initialised = false;
let prog: WebGLProgram;
let texcoord_loc: number;
let tex_loc: WebGLUniformLocation;
let mat_loc: WebGLUniformLocation;
let proj_loc: WebGLUniformLocation;
let texcoord_buffer: WebGLBuffer;


function initTilemapRendering() {
    if (initialised) {
        return;
    }
    // setup rendering program
    prog = GLUtils.programFromSources(vert_source, frag_source);
    texcoord_loc = $gl.getAttribLocation(prog, "a_texcoord");
    tex_loc = $gl.getUniformLocation(prog, "u_texture");
    mat_loc = $gl.getUniformLocation(prog, "u_matrix");
    proj_loc = $gl.getUniformLocation(prog, "u_projection");
    
    $gl.useProgram(prog);

    // setup texture coord buffer
    texcoord_buffer = $gl.createBuffer();
    $gl.bindBuffer($gl.ARRAY_BUFFER, texcoord_buffer);
    $gl.enableVertexAttribArray(texcoord_loc);
    $gl.vertexAttribPointer(
        texcoord_loc,
        2,           // size
        $gl.FLOAT,   // type
        false,       // normalise
        0,           // stride
        0            // offset
    );

    
    initialised = true;
}




class TileSet {
    texture: Texture;
    columns: number;
    tileWidth: number;
    tileHeight: number;
    firstgid: number;

    constructor(texture: Texture, columns: number, tileWidth: number, tileHeight: number, firstgid: number = 1) {
        this.texture = texture;
        this.columns = columns;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.firstgid = firstgid;
    }

    getTexCoords(gid: number) {
        // subtract the first gid to get the tile's index in the tileset
        let tile = gid - this.firstgid;

        // get the tile's position in the tileset
        let tileX = tile % (this.texture.width / this.tileWidth);
        let tileY = Math.floor(tile / (this.texture.width / this.tileWidth));

        // get the uv coordinates of the tile
        let u1 = tileX * this.tileWidth / this.texture.width;
        let v1 = tileY * this.tileHeight / this.texture.height;
        let u2 = u1 + this.tileWidth / this.texture.width;
        let v2 = v1 + this.tileHeight / this.texture.height;

        // return the tile's uv coordinates
        return [
            u1, v1,
            u1, v2,
            u2, v1,
            u2, v1,
            u1, v2,
            u2, v2
        ];
    }
}


class TileMapSubLayer {
    name: string
    pos = { x: 0, y: 0 };
    data: number[][];

    constructor(name: string, data: number[][], pos = { x: 0, y: 0 }) {
        this.name = name;
        this.data = data;
        this.pos = pos;
    }

    /**
     * 
     * @param (x, y) the position of the tile to get
     * @param tile - the gid of the tile to set
     */
    setTile(x: number, y: number, tile: number) {
        this.data[y][x] = tile;
    }
}







class TileMapObjectLayer {
    name: string;
    objects: Map<string, TileMapObject>;

    constructor(name: string, objects: Map<string, TileMapObject>) {
        this.name = name;
        this.objects = objects;
    }

    /**
     * 
     * @param name name of the object to get
     * @returns the object with the given name, or undefined if it doesn't exist
     */
    getObject(name: string) {
        return this.objects.get(name);
    }
}

abstract class TileMapObject {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(name: string, x: number, y: number, width: number, height: number) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class TileMapPoint extends TileMapObject {
    constructor(name: string, x: number, y: number) {
        super(name, x, y, 0, 0);
    }

    static parse(json: any): TileMapPoint {
        return new TileMapPoint(json.name, json.x, json.y);
    }
}

class TileMapRectangle extends TileMapObject {
    constructor(name: string, x: number, y: number, width: number, height: number) {
        super(name, x, y, width, height);
    }

    static parse (json: any): TileMapRectangle {
        return new TileMapRectangle(json.name, json.x, json.y, json.width, json.height);
    }
}

class TileMapEllipse extends TileMapObject {
    constructor(name: string, x: number, y: number, width: number, height: number) {
        super(name, x, y, width, height);
    }

    static parse(json: any): TileMapEllipse {
        return new TileMapEllipse(json.name, json.x, json.y, json.width, json.height);
    }
}

class TileMapPolygon extends TileMapObject {
    points: number[][];

    constructor(name: string, x: number, y: number, points: number[][]) {
        super(name, x, y, 0, 0);
        this.points = points;
    }

    static parse(json: any): TileMapPolygon {
        let points = [];
        for (const point of json.polygon) {
            points.push([point.x, point.y]);
        }
        return new TileMapPolygon(json.name, json.x, json.y, points);
    }
}







export class TileMapJSONParser {
    /**
     * Parse a tilemap object from a `.json` file, exported from Tiled (https://www.mapeditor.org/).  
     * In order to export in the correct format, ensure that the tilesets are embedded in the `json` file (can be toggled when opening a tileset in Tiled).   
     * Additionally, make sure to export it directly into the projects directory, as Tiled will configure the paths to the tilesets relative to the `json` file.  
     * As such, also make sure that the tileset images are being stored within the projects directory.  
     * **This means that if you want to move the location of the tilemap `.json` you should delete it and re-export from Tiled to ensure the relative paths stay valid**
     * 
     * This function supports arbitrary layers and tilesets, but won't support any custom properties, or transparency colours set in Tiled.
     * In order to add transparency, make tilesets with transparent backgrounds in an image editor, and then export them as `.png` files.
     * 
     * To retrieve objects from the object layer, use the `getObject` function of the `TileMapObjectLayer` class. 
     * To retrieve an object layer from the tilemap, use the `getObjectLayer` function of the `TileMapLayer` class.
     * 
     * @param json_path path to the json file
     * @returns a new TileMapLayer object, if the json file is valid
     */
    static parse(json_path: string): TileMapLayer {
        const file = fs.readFileSync(json_path, 'utf8');
        const data = JSON.parse(file);
        let tile_layers = [];
        let object_layers = [];
        let tilesets = [];

        // get the tile size
        const tileHeight = data.tileheight;
        const tileWidth = data.tilewidth;

        // parse each layer
        for (const layer of data.layers) {
            // parse tile layer
            if (layer.type == 'tilelayer'){ 
                tile_layers.push(this.parseTileLayer(layer));
            } 
            // parse object layer
            else if (layer.type == 'objectgroup') {
                object_layers.push(this.parseObjectLayer(layer));
            }
        }

        // parse tilesets
        for (const tileset of data.tilesets) {
            tilesets.push(this.parseTileSet(tileset));
        }
        
        // create the tilemap layer
        const args = {
            tile_width: tileWidth,
            tile_height: tileHeight,
            tilemap_layers: tile_layers,
            object_layers: object_layers,
            tilesets: tilesets
        }
        return new TileMapLayer(args);
    }

    private static parseTileLayer(layer: any): TileMapSubLayer {
        const data = layer.data;
        // convert the data to a 2d array
        let data2d = [];
        for (let i = 0; i < layer.height; i++) {
            data2d.push(data.slice(i * layer.width, (i + 1) * layer.width));
        }
        const pos = {x: layer.x, y: layer.y};
        const name = layer.name;

        return new TileMapSubLayer(name, data2d, pos);
    }

    private static parseObjectLayer(layer: any): TileMapObjectLayer {
        let objects = new Map<string, TileMapObject>();
        for (const object of layer.objects) {
            if (object.point) {
                objects.set(object.name, TileMapPoint.parse(object));
            } else if (object.ellipse) {
                objects.set(object.name, TileMapEllipse.parse(object));
            } else if (object.polygon) {
                objects.set(object.name, TileMapPolygon.parse(object));
            } else {
                objects.set(object.name, TileMapRectangle.parse(object));
            }
        }

        return new TileMapObjectLayer(layer.name, objects);
    }

    private static parseTileSet(tileset: any): TileSet {
        const firstgid = tileset.firstgid;
        const texture = Renderer.loadTexture(tileset.image);
        const columns = tileset.columns;
        const tileWidth = tileset.tilewidth;
        const tileHeight = tileset.tileheight;

        return new TileSet(texture, columns, tileWidth, tileHeight, firstgid);
    }
}





class TileMapLayer extends RenderLayer {
    pos: {x: number, y: number};
    tile_width: number;
    tile_height: number;
    object_layers: TileMapObjectLayer[];
    tilemap_layers: TileMapSubLayer[];
    tilesets: TileSet[];
    last_tileset: number;
    last_gid: number;

    constructor(
        args: {tile_width: number, tile_height:number, tilemap_layers: TileMapSubLayer[], 
        object_layers: TileMapObjectLayer[], tilesets: TileSet[], pos?: {x: number, y: number}}
    ) {
        super();
        this.tile_height = args.tile_height;
        this.tile_width = args.tile_width;
        this.tilemap_layers = args.tilemap_layers;
        this.object_layers = args.object_layers;
        this.tilesets = args.tilesets;
        this.pos = args.pos || {x: 0, y: 0};
        // make sure the program is compiled
        initTilemapRendering();

        this.last_gid = 0;
        this.last_tileset = -1;
    }

    render() {
        $gl.useProgram(prog);
        this.bindTextures();
        $gl.bindBuffer($gl.ARRAY_BUFFER, texcoord_buffer);
        $gl.vertexAttribPointer(
            texcoord_loc,
            2,           // size
            $gl.FLOAT,   // type
            false,       // normalise
            0,           // stride
            0            // offset
        );

        // use orthographic projection to scale coords to -1->1 (calculate once per frame to account for viewport changes)
        const proj_matrix = mat4.create();
        mat4.ortho(
            proj_matrix,
            0,
            Renderer.resolution.x * Renderer.viewport.sx,
            Renderer.resolution.y * Renderer.viewport.sy,
            0,
            -1,
            1
        );
        $gl.uniformMatrix4fv(proj_loc, false, proj_matrix);

        for (const layer of this.tilemap_layers) {
            this.renderLayer(layer);
        }
    }

    private bindTextures() {
        for (let i = 0; i < this.tilesets.length; i++) {
            const tileset = this.tilesets[i];
            $gl.activeTexture($gl.TEXTURE0 + i);
            $gl.bindTexture($gl.TEXTURE_2D, tileset.texture.texture);
        }
    }

    private useTile(gid: number) {
        // if the gid is the same as the last one, don't update the buffer
        if (this.last_gid == gid) return;

        // find the tileset that contains the gid
        let count = 0;
        let tileset = this.tilesets[0];
        while (gid >= tileset.firstgid) {
            count++;
            if (count >= this.tilesets.length){
                break;
            }
            tileset = this.tilesets[count];
        }
        tileset = this.tilesets[count-1];
        
        // only change the tileset if it is different
        if (this.last_tileset != count - 1) {
            $gl.uniform1i(tex_loc, count-1);
        }

        // get the texture coordinates and update the buffer
        const tex_coords = tileset.getTexCoords(gid);
        $gl.bufferData($gl.ARRAY_BUFFER, new Float32Array(tex_coords), $gl.STATIC_DRAW);

        // update the last gid and tileset
        this.last_gid = gid;
        this.last_tileset = count - 1;
    }

    private renderLayer(layer: TileMapSubLayer) {
        for (let y = 0; y < layer.data.length; y++) {
            for (let x = 0; x < layer.data[y].length; x++) {
                // get the tile
                const gid = layer.data[y][x];
                if (gid == 0) continue;
                this.useTile(gid);

                // set transform
                this.setTransform(x, y, layer, this.tilesets[this.last_tileset]);

                // draw the tile
                $gl.drawArrays($gl.TRIANGLES, 0, 6);
            }
        }
    }

    private setTransform(x: number, y: number, layer: TileMapSubLayer, tileset: TileSet) {
        // if the tileset is not the same size as the tilemap grid, offset it vertically,
        // as the tiles are drawn from the top left corner, whereas the tiles in Tiled are drawn from the bottom left corner
        const tileSizeDiff = tileset.tileWidth - this.tile_width;
        const x_pos = this.pos.x + layer.pos.x + x * this.tile_width;
        const y_pos = this.pos.y + layer.pos.y + y * this.tile_height - tileSizeDiff;
        const img_matrix = mat4.create();
        mat4.translate(img_matrix, img_matrix, vec3.fromValues(x_pos, y_pos, 0));
        mat4.translate(
            img_matrix,
            img_matrix,
            vec3.fromValues(-Renderer.viewport.x, -Renderer.viewport.y, 0)
        );
        mat4.scale(
            img_matrix,
            img_matrix,
            vec3.fromValues(tileset.tileWidth, tileset.tileHeight, 1)
        );
        $gl.uniformMatrix4fv(mat_loc, false, img_matrix);
    }

    
    /**
     * 
     * @param name name of the object layer to get
     * @returns object layer with the given name or undefined if it doesn't exist
     */
    getObjectLayer(name: string) {
        return this.object_layers.find((layer) => layer.name === name);
    }

    /**
     * 
     * @param name name of the tile layer to get
     * @returns tile layer with the given name or undefined if it doesn't exist
     */
    getTileLayer(name: string) {
        return this.tilemap_layers.find((layer) => layer.name === name);
    }
}