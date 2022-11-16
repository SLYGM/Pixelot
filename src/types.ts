export type Texture = {
    width: number;
    height: number;
    texture: WebGLTexture | null;
}

export type Sprite = {
    x: number;
    y: number;
    tex: Texture;
}

export type Updatable = {
    update: (dt: number) => void;
}