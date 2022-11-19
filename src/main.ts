Renderer.addLayer(new SpriteLayer());
Renderer.loadTexture('./images/frog.png', 'frog')
Renderer.loadTexture('./images/tile.png', 'tile')

class TestEntity extends GameObjectBase {
    speed: number;
    
    constructor(speed: number) {
        super();
        this.speed = speed;
    }
    
    onCreate(): void {
        this.get(Position).x = 50;
        this.get(Position).y = 50;
    }

    update(): void {
        this.get(Position).x += this.speed;
    }
}

let t = new TestEntity(1);
t.add(new Position).add(new Sprite('frog', 0, 1));
_scene.spawn(t);

let u = new TestEntity(2);
u.add(new Position).add(new Sprite('tile', 0, 2));
_scene.spawn(u);

_scene.addSystem(new RenderSystem(), 0);

PostProcessing.add(new BarShader());

Game.addToUpdateQueue(_scene);
Game.start();
