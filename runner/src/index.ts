import * as engine from 'retro-engine';
(window as any).engine = engine;

Initialise();

async function Initialise() {
  engine.Renderer.init();
  engine.connectCanvas();
  await engine.doGameImports();
  engine.Game.loadGame();
  engine.Game.start();
}
