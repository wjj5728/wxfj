import baseSprite from "./baseSprite";
import data from "./data";
export default class Score extends baseSprite {
  constructor(ctx) {
    super(ctx);
    this.width = 400;
    this.height = 99;
    this.render();
  }
  render() {
    let sp = P.Res().getRes("../Resources/score.png");
    // this.ctx.globalAlpha = 0.1;
    this.drawToCanvas(sp, (P._width - this.width) / 2 + 10, 100, this.width, this.height);
    // this.ctx.globalAlpha = 1;
  }
}
