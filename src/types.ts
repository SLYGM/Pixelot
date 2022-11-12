type Texture = {
    width: number;
    height: number;
    texture: WebGLTexture | null;
}


type Updatable = {
    update: (dt: number) => void;
}