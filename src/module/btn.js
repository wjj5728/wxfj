import baseSprite from "./baseSprite";
export default class Btn extends baseSprite {
  constructor(ctx, canvas) {
    super(ctx, canvas);
    this.index = 0;
    this.width = 42;
    this.height = 45;
    this.x = P._width - this.width - 20;
    this.y = 20;
    this.res = ["../Resources/game_pause_nor.png", "../Resources/game_pause_pressed.png", "../Resources/game_resume_nor.png", "../Resources/game_resume_pressed.png"];
    this.render();
    this.initEvent();
  }
  initEvent() {
    this.canvas.addEventListener("touchstart", e => {
      let startX = e.touches[0].clientX;
      let startY = e.touches[0].clientY;
      if (this.isTouch(startX, startY)) {
        if (this.index == 0) {
          this.index = 2;
          P.instance.stop();
        } else {
          this.index = 0;
          P.instance.go();
        }
      } else {
        if (!P.gameStatus) {
          P.instance.restart();
        }
      }
    });
  }
  isTouch(x, y) {
    let ra = 0;
    if (x > this.x + ra && x < this.x + this.width - ra && y > this.y + ra && y < this.y + this.height - ra) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    let sp = P.Res().getRes(this.res[this.index]);
    this.drawToCanvas(sp, this.x, this.y, sp.width, sp.height);
  }
}
