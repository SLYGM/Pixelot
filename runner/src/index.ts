import * as engine from 'retro-engine';

Initialise();

async function Initialise() {
  console.log(`Hello World!`);
  engine.Renderer.init();
  await engine.doGameImports();
  engine.Game.loadGame();
  engine.Game.start();
}
