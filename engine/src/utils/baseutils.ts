import { Game } from "../gameloop.js";

const nw = (window as any).nw;
let fs, path;
if (nw) {
    fs = nw.require("fs");
    path = nw.require("path");
} else {
    fs = require("fs");
    path = require("path");
}

export class StringUtils {
    static isPostfix(str1: string, str2: string): boolean {
        const idx = str1.indexOf(str2);
        return idx >= 0 && idx + str2.length == str1.length;
    }
}

export class FileUtils {
    /**
     * Find the path to the file with the given name in the given directory and its subdirectories.
     * 
     * @param name name of the file to find e.g. 'scene.json'
     * @param startPath starting path of the search e.g. './projects/project1/'
     * @returns file path if found, null otherwise
     */
    static findFile(name: string, startPath: string): string | null {
        // if file exists, return it's path
        if (fs.existsSync(startPath + name)) {
            return path.join(startPath, name);
        }
        
        // otherwise, search in subdirectories
        const files = fs.readdirSync(startPath);
        for (const file of files) {
            const filename = path.join(startPath, file);
            const stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                const result = FileUtils.findFile(name, filename + '/');
                if (result) {
                    return path.resolve(result);
                }
            }
        }

        return null;
    }
}

// AutoMap: Map extension that automatically creates new entries when accessing a non-existing key
export class AutoMap<K, V> extends Map<K, V> {
    constructor(private factory: (key: K) => V) {
        super();
    }

    override get(key: K): V {
        if (!this.has(key)) {
            this.set(key, this.factory(key));
        }
        return super.get(key);
    }
}

export class PathUtils {

    /* expand a project asset path to a full path (e.g. './assets/texture.png' -> '/projects/project1/assets/texture.png')
    Expansion will vary depending on whether the game is in dev mode or not */
    static assetPath(filepath: string): string {
        if (Game.isDevMode) {
            return path.resolve(`./projects/${Game.project_name}/`, filepath);
        } else {
            return path.resolve('./game/assets/', filepath);
        }
    }
}