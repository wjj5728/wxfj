import baseSprite from "./baseSprite";
import data from "./data";
export default class Bullet extends baseSprite {
  constructor(ctx) {
    super(ctx);
    this.width = 9;
    this.height = 21;
    this.type = 1;
    this.x = data.bulletX - this.width / 2;
    this.y = data.bulletY;
    this.bullet = window.P.Res().getRes("../Resources/bullet" + this.type + ".png");
  }
  onEnable() {
    // console.log("enable");
    this.x = data.bulletX - this.width / 2;
    this.y = data.bulletY;
  }
  render() {
    this.y -= 10;
    this.drawToCanvas(this.bullet, this.x, this.y, this.bullet.width, this.bullet.height);
  }
  recover() {
    console.log("recover");
  }
}
