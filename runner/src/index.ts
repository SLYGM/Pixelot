import * as engine from 'retro-engine';

Initialise();

export async function Initialise() {
  console.log(`Hello World!`);
  engine.Renderer.init();
  await engine.doProjectImports('project1');
  engine.Game.loadGame('../sugma/projects/project1');
  engine.Game.start();
}
