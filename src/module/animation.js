import baseSprite from "./baseSprite";
import data from "./data";
export default class Ani extends baseSprite {
  constructor(ctx) {
    super(ctx);
    this.index = 0;
    this.isPlay = false;
    this.timer = null;
    this.instance = null;
  }
  playAnimation(name, instance, interval = 100) {
    this.instance = instance;
    this.name = name;
    this.isPlay = false;
    this.timer = setInterval(() => {
      if (this.index == data.Ani[name].length - 1) {
        this.isPlay = true;
        clearInterval(this.timer);
      }
      this.index += 1;
    }, 100);
    data.animation.push(this);
  }
  loop() {}
  render() {
    let sprite = window.P.Res().getRes(data.Ani[this.name][this.index]);
    this.drawToCanvas(sprite, this.instance.x, this.instance.y, sprite.width, sprite.height);
  }
}
