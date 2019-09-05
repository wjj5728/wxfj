import data from "./data";
export default class baseSprite {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.originX = 0;
    this.originY = 0;
    this.index = 0;
    this.visible = true;
  }
  ani(arr = [], interval = 8, time = 0, complete = () => {}) {
    if (this.index == arr.length && time == 0) {
      this.index = 0;
    } else if (this.index == arr.length && time == 1) {
      complete && complete();
      return;
    }
    if (time == 0) {
      let sprite = window.P.Res().getRes(arr[this.index]);
      this.drawToCanvas(sprite, this.x, this.y, sprite.width, sprite.height);
      if (data.frame % interval == 0) {
        this.index += 1;
      }
    } else {
      let sprite = window.P.Res().getRes(arr[this.index]);
      this.drawToCanvas(sprite, this.x, this.y, sprite.width, sprite.height);
      if (data.frame % interval == 0) {
        this.index += 1;
      }
    }
  }
  drawToCanvas(image, x, y, width, height) {
    if (!this.visible) return;
    this.ctx.drawImage(image, x, y, width, height);
  }
  isCollision(other) {
    let flag = this.y + this.height < other.y || this.y > other.y + other.height || this.x + this.width < other.x || this.x > other.x + other.width;
    return !flag;
  }
}
