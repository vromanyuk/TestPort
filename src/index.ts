import * as PIXI from 'pixi.js';
import { MainScene } from './scenes/Main';

(async () => {
  const app = new PIXI.Application();
  await app.init({background: '#4D35FF', resizeTo: window});
  document.body.appendChild(app.canvas);

  new MainScene(app)
})();