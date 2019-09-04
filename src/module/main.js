// import { addSprite } from "./sprite";
import Bg from "./bg";
import Hero from "./here";
import data from "./data";
import P from "./init";
class Main {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.bgY = 0;
    this.aniId = null;
    this.restart();
  }
  restart() {
    this.bg = new Bg(this.ctx, this.canvas);
    this.hero = new Hero(this.ctx, this.canvas);
    this.bindThis = this.loop.bind(this);
    this.aniId = requestAnimationFrame(this.bindThis);
  }
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bg.render();
    this.hero.render();
  }
  update() {
    this.bg.update();
    this.hero.render();
    for (let i = 0; i < data.bullets.length; i++) {
      const element = data.bullets[i];
      if (element.y <= -20) {
        P.Pool().recover("Bullet", element);
        data.bullets.splice(i, 1);
        i--;
        break;
      } else {
        element.render();
      }
    }
  }
  loop() {
    this.render();
    this.update();
    data.frame += 1;
    if (data.frame % 20 == 0) {
      this.hero.shoot();
    }
    this.aniId = requestAnimationFrame(this.bindThis);
  }
}
export default Main;
