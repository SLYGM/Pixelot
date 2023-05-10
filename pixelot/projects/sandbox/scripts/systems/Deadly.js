import DeadlyComponent from '../components/Deadly.js';
import Health from '../components/Health.js';

export default class Deadly extends engine.System {
    // the component is the component class that this system will operate on.
    component = DeadlyComponent;

    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor method.
    static arg_names = [];
    static arg_types = [];

    // The update method is called every frame. 
    // The entities parameter is an array of all the entities that have the component that this system operates on.
    update(entities, dt) {
        entities.forEach(entity => {
            engine.SceneManager.currentScene.getEntitiesWithComponent(Health).forEach(entity2 => {
                let dist = Math.sqrt(Math.pow(entity.Position.x - entity2.Position.x, 2) + Math.pow(entity.Position.y - entity2.Position.y, 2));

                if (dist < entity.Deadly.radius + entity2.Health.radius) {
                    entity2.Health.hp -= 1;
                    entity.Deadly.sound.play();
                    entity.scene.deleteEntity(entity);
                    if (entity2.Health.hp <= 0) {
                        entity2.scene.deleteEntity(entity2);
                        let text = engine.SceneManager.currentScene.getEntity("game over text");
                        if (text) {
                            text.Text.visible = true;
                        }
                    }
                }
            });
        });
    }
}