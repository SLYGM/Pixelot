import Position from "../components/Position.js";
import { Component, System, GameObjectBase } from "../ecs.js";
import { $scene } from "../sceneManager.js";

class Health extends Component {
    hp: number = 10;

    constructor(hp: number) {
        super();
        this.hp = hp;
    }
}

class HealthSystem extends System {
    component = Health;

    update(entities: Set<GameObjectBase>) {
        console.log(entities.size);
        for (const entity of entities) {
            console.log("Updating entity", entity);
            const health = entity.get(Health);
            health.hp -= health.hp * $scene.dt;
            if (health.hp <= 0) {
                console.log("enemy is dead");
                $scene.deleteEntity(entity);
            }
        }
    }
}

class Enemy extends GameObjectBase {
    onCreate() {
        this.add(new Position).add(new Health(20));
    }
    update() {}
}

// example usage
function damageExample() {
    let enemy: any = new Enemy('enemy');
    $scene.addSystem(new HealthSystem(), 0);
    $scene.addEntity(enemy);
    $scene.update();

    // position is now (1, 1)
    // this is an example of how since `enemy` is a proxy we can access the health component directly.
    // although TypeScript doesn't play nice with proxies so we have to set the type to `any`.
    // This shouldn't be a problem since the user is working in JS not TS anyway.
    console.log(enemy.Health);
    $scene.update();
}
