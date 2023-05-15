import Position from "../components/Position.js";
export default class PlatformSpawner extends engine.GameObjectBase {

  // the arg_names and arg_types arrays are used to define the arguments that are passed to the onCreate() method.
  // the following are some example arguments
  static arg_names = ["spawnDistance"];
  static arg_types = [engine.Types.Number];

  platforms = [];

  spawnDistance = 100;

  lastSpawnedPlatform = 100;

  // The onCreate() method is called when the object is created.
  onCreate(sd) {
    this.spawnDistance = sd;
  }

  // The update() method is called every frame.
  update(dt) {

    this.platforms.forEach(p => {
      const screenHeight = 240;
      if (p.get(Position).y > engine.Renderer.viewport.y + screenHeight) {
        this.scene.deleteEntity(p);
        this.platforms.splice(this.platforms.indexOf(p), 1);
      }
    });

    if (engine.Renderer.viewport.y < this.lastSpawnedPlatform - this.spawnDistance) {
      const platform = this.scene.spawnPrefab("SmallPlatform", [], "SmallPlatform" + Math.random());
      this.platforms.push(platform);
      console.log(this.platforms);
      platform.Position.x = Math.random() * 226 + 100;
      platform.Position.y = engine.Renderer.viewport.y - 20;
      this.lastSpawnedPlatform = engine.Renderer.viewport.y;
    }

  }
}
