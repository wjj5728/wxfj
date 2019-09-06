import baseSprite from "./baseSprite";
import Ani from "./animation";
export default class Enemy0 extends baseSprite {
  constructor(ctx) {
    super(ctx);
    this.inithp = 1;
    this.hp = 1;
    this.x = 0;
    this.y = 0;
    this.width = 51;
    this.height = 39;
    this.enemy0 = null;
  }
  onEnable() {
    this.visible = true;
    this.hp = 1;
    this.x = parseInt(Math.random() * (P._width - this.width));
    this.y = -50;
  }
  render() {
    this.y += 2;
    if (this.hp == 1) {
      this.enemy0 = P.Res().getRes("../Resources/enemy0.png");
    }
    this.drawToCanvas(this.enemy0, this.x, this.y, this.enemy0.width, this.enemy0.height);
  }
  recover() {}
}
