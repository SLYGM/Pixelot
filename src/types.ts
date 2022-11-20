export type Texture = {
    width: number;
    height: number;
    texture: WebGLTexture | null;
}

export type Updatable = {
    update: (dt: number) => void;
}