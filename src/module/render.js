import { addSprite } from "./sprite";
class Render {
  constructor() {
    this.x = 0;
    this.step = 1;
  }
  render(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(this.x, 0, 10, 150);
    this.x += this.step;
    this.adBg(ctx);
  }
  adBg(ctx) {
    let bg = window.P.Res().getRes("../Resources/background.png");
    addSprite(ctx, bg, 0, 0, bg.width, bg.height);
  }
}
export default Render;
