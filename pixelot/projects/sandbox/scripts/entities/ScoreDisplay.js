
import CoinCollector from "../components/CoinCollector.js";

export default class ScoreDisplay extends engine.GameObjectBase {

  // the arg_names and arg_types arrays are used to define the arguments that are passed to the onCreate() method.
  // the following are some example arguments
  static arg_names = [];
  static arg_types = [];

  // The onCreate() method is called when the object is created.
  onCreate() {

  }

  // The update() method is called every frame.
  update(dt) {
    let entities = engine.SceneManager.currentScene.getEntitiesWithComponent(CoinCollector);
    let coin_count = 0;
    entities.forEach(entity => {
      coin_count += entity.CoinCollector.score;
    });
    this.Text.text = "Score " + coin_count;
    this.Position.x = 5;
    this.Position.y = 20;
  }
}
