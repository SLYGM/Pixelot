import Position from "../components/Position.js";

export default class Spawner extends engine.GameObjectBase {

  // the arg_names and arg_types arrays are used to define the arguments that are passed to the onCreate() method.
  // the following are some example arguments
  static arg_names = ["Prefab name", "Initial amount", "Spawn continuously", "Spawn time"];
  static arg_types = [engine.Types.String, engine.Types.Number, engine.Types.Boolean, engine.Types.Number];

  // The onCreate() method is called when the object is created.
  onCreate(prefab, amount, spawn_continuously, spawn_time) {
    this.prefab = prefab;
    this.amount = amount;
    this.spawned = false;
    this.spawn_continuously = spawn_continuously;
    this.spawn_time = spawn_time;
    this.spawn_timer = spawn_time;
    this.min_dist_from_player = 50;
  }

  // The update() method is called every frame.
  update(dt) {
    if (!this.spawned) {
      for (let i = 0; i < this.amount; i++) {
        let entity = engine.SceneManager.currentScene.spawnPrefab(this.prefab, [], this.prefab);
        // Randomize position
        while (true) {
          entity.Position.x = Math.random() * 416;
          entity.Position.y = Math.random() * 230;
          // Make sure its more than 20 pixels away from the player
          let player = engine.SceneManager.currentScene.getEntity("player");
          if (player) {
            let dx = entity.Position.x - player.Position.x;
            let dy = entity.Position.y - player.Position.y;
            if (Math.sqrt(dx * dx + dy * dy) > this.min_dist_from_player) {
              break;
            }
          } else {
            break;
          }
        }
      }
      this.spawned = true;
    }

    if (this.spawn_continuously) {
      this.spawn_timer -= dt;
      if (this.spawn_timer <= 0) {
        this.spawn_timer = this.spawn_time;
        let entity = engine.SceneManager.currentScene.spawnPrefab(this.prefab, [], this.prefab);
        // Randomize position
        while (true) {
          entity.Position.x = Math.random() * 416;
          entity.Position.y = Math.random() * 230;
          // Make sure its more than 20 pixels away from the player
          let player = engine.SceneManager.currentScene.getEntity("player");
          if (player) {
            let dx = entity.Position.x - player.Position.x;
            let dy = entity.Position.y - player.Position.y;
            if (Math.sqrt(dx * dx + dy * dy) > this.min_dist_from_player) {
              break;
            }
          } else {
            break;
          }
        }
      }
    }
  }
}
