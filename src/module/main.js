// import { addSprite } from "./sprite";
import Bg from "./bg";
import Hero from "./here";
import Enemy0 from "./enemy0";
import Ani from "./animation";
import data from "./data";
import P from "./init";
var lastTime = 0;
var shot = true;
class Main {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.bgY = 0;
    this.aniId = null;
    this.restart();
    this.ani = new Ani(ctx);
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

    for (let i = 0, len = data.bullets.length; i < len; i++) {
      const element = data.bullets[i];
      element.render();
    }
    for (let i = 0, len = data.enemy0s.length; i < len; i++) {
      const element = data.enemy0s[i];
      element.render();
    }
  }
  update() {
    this.bg.update();
    this.hero.render();
    this.ctx.fillText(this.calculateFPS().toFixed() + " fps", 45, 50);
    for (let i = 0, len = data.bullets.length; i < len; i++) {
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
    for (let i = 0, len = data.enemy0s.length; i < len; i++) {
      const element = data.enemy0s[i];
      if (element.y > P._height + 50) {
        P.Pool().recover("Enemy0", element);
        data.enemy0s.splice(i, 1);
        i--;
        break;
      } else {
        element.render();
      }
    }
    this.collision();
  }
  collision() {
    for (let i = 0; i < data.enemy0s.length; i++) {
      let enemy0 = data.enemy0s[i];
      for (let j = 0; j < data.bullets.length; j++) {
        const bullet = data.bullets[j];
        if (enemy0.isCollision(bullet) && bullet.visible) {
          bullet.visible = false;
          enemy0.hp -= 1;
          if (enemy0.hp == 0) {
            P.Pool().recover("Enemy0", enemy0);
            data.enemy0s.splice(j, 1);
            this.ani.playAnimation("enemy0");
            j--;
          }
          console.log("hit");
        }
      }
    }
  }
  calculateFPS() {
    var now = +new Date();
    var fps = 1000 / (now - lastTime);

    lastTime = now;

    return fps;
  }
  loop() {
    this.render();
    this.update();
    data.frame += 1;
    // if (shot) {
    //   let enemy0 = P.Pool().getItemByName("Enemy0", Enemy0, this.ctx);
    //   data.enemy0s.push(enemy0);
    //   setTimeout(() => {
    //     this.hero.shoot();
    //   }, 1000);
    //   shot = false;
    // }
    if (data.frame % 20 == 0) {
      this.hero.shoot();
    }
    if (data.frame % 80 == 0) {
      let enemy0 = P.Pool().getItemByName("Enemy0", Enemy0, this.ctx);
      data.enemy0s.push(enemy0);
    }
    this.aniId = requestAnimationFrame(this.bindThis);
  }
}
export default Main;
