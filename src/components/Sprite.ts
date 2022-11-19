class Sprite extends Component {
    dependencies = [Position];
    tex: Texture

    constructor(texAlias: string) {
        super();
        this.tex = Renderer.textures.get(texAlias);
    }
}