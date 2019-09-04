import baseSprite from "./baseSprite";
export default class Bg extends baseSprite {
  constructor(ctx, canvas) {
    super(ctx, canvas);
    this.bgY = 0;
    this.bgHeight = 0;
    this.render();
  }
  render() {
    let bg1 = window.P.Res().getRes("../Resources/background.png");
    let bg2 = window.P.Res().getRes("../Resources/background.png");
    this.bgHeight = bg1.height;
    this.drawToCanvas(bg1, 0, -bg1.height + this.bgY, window.P._width, bg1.height);
    this.drawToCanvas(bg2, 0, this.bgY, window.P._width, bg2.height);
  }
  update() {
    this.bgY += 2;
    if (this.bgY == this.bgHeight) {
      this.bgY = 0;
    }
  }
}
