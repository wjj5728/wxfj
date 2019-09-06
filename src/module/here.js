import baseSprite from "./baseSprite";
import data from "./data";
import Bullet from "./bullet";
class Hero extends baseSprite {
  constructor(ctx, canvas) {
    super(ctx, canvas);
    this.hero1 = window.P.Res().getRes("../Resources/hero1.png");
    this.hero2 = window.P.Res().getRes("../Resources/hero2.png");
    this.width = 100;
    this.height = 124;
    this.x = window.P._width / 2 - this.hero1.width / 2;
    this.y = window.P._height - 200;
    data.bulletX = this.x + this.width / 2;
    data.bulletY = this.y - 20;
    this.originX = -this.hero1.width / 2;
    this.originY = -this.hero1.height / 2;
    this.render();
    this.initEvent();
    this.touchId = 0;
    this.startX = 0;
    this.startY = 0;
    this.isTouch = false;
  }
  render() {
    // this.ctx.translate(this.originX, this.originY);
    // this.drawToCanvas(this.hero1, this.x, this.y, this.hero1.width, this.hero1.height);
    // this.ctx.translate(0, 0);
    this.ani(["../Resources/hero2.png", "../Resources/hero1.png"]);
  }
  initEvent() {
    this.canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      this.touchId = e.touches[0].identifier;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.isTouchHero();
    });
    this.canvas.addEventListener("touchmove", e => {
      e.preventDefault();
      if (e.touches[0].identifier != this.touchId || !this.isTouch) return;
      let movex = e.touches[0].clientX;
      let movey = e.touches[0].clientY;
      this.setPosition(movex, movey);
    });
  }
  isTouchHero() {
    let ra = 30;
    if (this.startX > this.x + ra && this.startX < this.x + this.width - ra && this.startY > this.y + ra && this.startY < this.y + this.height - ra) {
      this.isTouch = true;
    } else {
      this.isTouch = false;
    }
  }
  setPosition(movex, movey) {
    let x = movex - this.width / 2;
    let y = movey - this.height / 2;
    if (x >= window.P._width - this.width) {
      x = window.P._width - this.width;
    } else if (x <= 0) {
      x = 0;
    }
    if (y >= window.P._height - this.height) {
      y = window.P._height - this.height;
    }
    this.x = x;
    this.y = y;
    data.bulletX = this.x + this.width / 2;
    data.bulletY = this.y - 20;
  }
  shoot() {
    let bullet = P.Pool().getItemByName("Bullet", Bullet, this.ctx, this.canvas);
    data.bullets.push(bullet);
  }
}
export default Hero;
