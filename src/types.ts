type Texture = {
    width: number;
    height: number;
    texture: WebGLTexture | null;
}

type Sprite = {
    x: number;
    y: number;
    tex: Texture;
}

type Updatable = {
    update: (dt: number) => void;
}