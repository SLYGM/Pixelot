import Position from "../../base_scripts/components/Position.js";

export default class BallSpawner extends engine.GameObjectBase {

  // the arg_names and arg_types arrays are used to define the arguments that are passed to the onCreate() method.
  // the following are some example arguments
  static arg_names = ["amount"];
  static arg_types = [engine.Types.Number];

  // The onCreate() method is called when the object is created.
  onCreate(amount) {
    self.amount = amount;
    self.spawned = false;
    console.log(engine.PrefabFactory.getAllPrefabNames());
    // engine.SceneManager.currentScene.spawnPrefab("ball.prefab", [1], "ball");
  }

  // The update() method is called every frame.
  update() {
    if (!self.spawned) {
      for (let i = 0; i < self.amount; i++) {
        engine.SceneManager.currentScene.spawnPrefab("ball", [1], "ball");
      }
      // Randomize positions
      let entities = engine.SceneManager.currentScene.getEntitiesWithComponent(Position);
      for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];
        entity.Position.x = Math.random() * 200;
        entity.Position.y = Math.random() * 100;
      }
      self.spawned = true;
    }
  }
}
