import baseSprite from "./baseSprite";
import data from "./data";
export default class Ani extends baseSprite {
  constructor(ctx) {
    super(ctx);
    this.index = 0;
  }
  playAnimation(name, interval = 10) {
    let sprite = window.P.Res().getRes(data.Ani[name][this.index]);
    this.drawToCanvas(sprite, this.x, this.y, sprite.width, sprite.height);
    setInterval(() => {
      if (this.index == data.Ani[name].length - 1) {
        return;
      }
      this.index += 1;
    }, 100);
  }
}
