// import { addSprite } from "./sprite";
import Bg from "./bg";
import Hero from "./here";
import Enemy0 from "./enemy0";
import Ani from "./animation";
import data from "./data";
import Btn from "./btn";
import Score from "./score";
var lastTime = 0;
var shot = true;
class Main {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.bgY = 0;
    this.aniId = null;
    this.isStop = false;
    this.start();
  }
  start() {
    this.bg = new Bg(this.ctx, this.canvas);
    this.Btn = new Btn(this.ctx, this.canvas);
    this.hero = new Hero(this.ctx, this.canvas);
    this.bindThis = this.loop.bind(this);
    this.aniId = requestAnimationFrame(this.bindThis);
  }
  restart() {
    data.score = 0;
    P.gameStatus = true;
    this.bindThis = this.loop.bind(this);
    this.aniId = requestAnimationFrame(this.bindThis);
  }
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bg.render();
    this.Btn.render();
    for (let i = 0, len = data.bullets.length; i < len; i++) {
      const element = data.bullets[i];
      element.render();
    }
    for (let i = 0, len = data.enemy0s.length; i < len; i++) {
      const element = data.enemy0s[i];
      element.render();
    }
    if (!P.gameStatus) {
      this.finish();
    }
  }
  update() {
    this.bg.update();
    this.hero.render();
    this.ctx.font = "10px Arial";
    this.ctx.fillText(this.calculateFPS().toFixed() + " fps", 45, 50);
    this.ctx.globalAlpha = 0.1;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "200px Arial";
    this.ctx.fillText(data.score, this.canvas.width / 2, 350);
    this.ctx.globalAlpha = 1;
    /* 子弹循环 */
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
    /* 敌军循环 */
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
    /* 爆炸动画 */
    for (let i = 0; i < data.animation.length; i++) {
      const element = data.animation[i];
      if (!element.isPlay) {
        element.render();
      } else {
        data.animation.splice(i, 1);
      }
    }
    this.collision();
  }
  /* 碰撞检测 */
  collision() {
    /* 子弹跟敌军碰撞 */
    for (let i = 0; i < data.enemy0s.length; i++) {
      let enemy0 = data.enemy0s[i];
      for (let j = 0; j < data.bullets.length; j++) {
        const bullet = data.bullets[j];
        if (enemy0.isCollision(bullet) && bullet.visible) {
          bullet.visible = false;
          P.Pool().recover("Bullet", bullet);
          data.bullets.splice(j, 1);
          j--;
          enemy0.hp -= 1;
          if (enemy0.hp == 0) {
            data.score += 1;
            P.Pool().recover("Enemy0", enemy0);
            data.enemy0s.splice(i, 1);
            let ani = new Ani(this.ctx);
            ani.playAnimation("enemy0", enemy0);
            i--;
          }
        }
      }
    }
    /* 敌军跟人物的碰撞 */
    for (let i = 0; i < data.enemy0s.length; i++) {
      const enemy0 = data.enemy0s[i];
      if (enemy0.isCollision(this.hero)) {
        P.Pool().recover("Enemy0", enemy0);
        data.enemy0s.splice(i, 1);
        let ani = new Ani(this.ctx);
        ani.playAnimation("enemy0", enemy0);
        i--;
        this.Btn.index = 0;
        this.Btn.render();
        this.finish();
      }
    }
  }
  calculateFPS() {
    var now = +new Date();
    var fps = 1000 / (now - lastTime);

    lastTime = now;

    return fps;
  }
  stop() {
    this.isStop = true;
  }
  go() {
    this.isStop = false;
    this.aniId = requestAnimationFrame(this.bindThis);
  }
  finish() {
    P.gameStatus = false;
    cancelAnimationFrame(this.aniId);
    new Score(this.ctx).render();
  }
  loop() {
    this.render();
    this.update();
    data.frame += 1;
    if (!P.gameStatus || this.isStop) {
      return;
    }
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
