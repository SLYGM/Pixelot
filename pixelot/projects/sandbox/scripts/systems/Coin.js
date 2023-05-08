import CoinComponent from '../components/Coin.js';
import CoinCollector from '../components/CoinCollector.js';

export default class Coin extends engine.System {
    // the component is the component class that this system will operate on.
    component = CoinComponent;

    // the arg_names and arg_types arrays are used to define the arguments that are passed to the constructor method.
    static arg_names = [];
    static arg_types = [];

    // The update method is called every frame. 
    // The entities parameter is an array of all the entities that have the component that this system operates on.
    update(entities, dt) {
        entities.forEach(entity => {
            engine.SceneManager.currentScene.getEntitiesWithComponent(CoinCollector).forEach(coin_collector => {
                let dist = Math.sqrt(Math.pow(entity.Position.x - coin_collector.Position.x, 2) + Math.pow(entity.Position.y - coin_collector.Position.y, 2));
                // console.log(dist);
                // console.log(entity.Coin);
                // console.log(coin_collector.CoinCollector);
                if (dist < entity.Coin.radius + coin_collector.CoinCollector.radius) {
                    coin_collector.CoinCollector.score += entity.Coin.points;
                    entity.Coin.sound.play();
                    entity.scene.deleteEntity(entity);
                }
            });
        });
    }
}
