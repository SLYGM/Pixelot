export type Texture = {
    width: number;
    height: number;
    texture: WebGLTexture | null;
};

export type Updatable = {
    update: (dt: number) => void;
};

export type Constructor<T> = new (...args: any[]) => T;
