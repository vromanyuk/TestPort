import { Application } from 'pixi.js';
import { MainScene } from './scenes/Main';

(async () => {
  const app = new Application();
  await app.init({ 
    background: '#4D35FF', 
    height: 768, 
    width: 1024 
  });
  document.body.appendChild(app.canvas);

  new MainScene(app)
})();