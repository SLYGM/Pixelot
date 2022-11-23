class Sprite extends Component {
    dependencies = [Position];
    tex: string;
    node: AVLKey<Sprite>;
    layer: RenderLayer;

    //sprites will be drawn above objects with a lower z index than their own
    constructor(texAlias: string, l: string, zindex: number = 0) {
        super();
        this.tex = texAlias;
        const layer = Renderer.getLayer(l);
        if (layer && layer instanceof SpriteLayer) layer.addSprite(this, zindex);
        else return undefined;
        this.layer = layer;
    }

    getPos(): {x: number, y: number} {
        const pos = this.owner.get(Position);
        return {x: pos.x, y: pos.y};
    }
}