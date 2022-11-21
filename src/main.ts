Renderer.loadTexture('./images/frog.png', 'frog')
Renderer.loadTexture('./images/tile.png', 'tile')

class TestEntity extends GameObjectBase {
    onCreate(): void {
        this.get(Position).x = 50;
        this.get(Position).y = 50;
    }

    update(): void {
        this.get(Position).x += 1;
    }
}

let t = new TestEntity('test');
t.add(new Position).add(new Sprite('frog'));
$scene.addEntity(t);
$scene.addSystem(new RenderSystem(), 0);

PostProcessing.add(new BarShader());

Game.addToUpdateQueue($scene);
Game.start();
