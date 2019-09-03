import "./requestNextAnimationFrame";
import Res from "./res";
import Render from "./render";
let P = (window.P = {
  init(width, height) {
    this.designWidth = width;
    this.designHeight = height;
    this.Brower();
    this.Res();
    let canvas = (this.canvas = document.createElement("canvas"));
    canvas.width = this._width;
    canvas.height = this._height;
    let ctx = (this.ctx = canvas.getContext("2d"));
    document.body.appendChild(canvas);
  },
  render() {
    let _this = this;
    let render = new Render();

    requestAnimationFrame(func);
    function func() {
      render.render(_this.ctx, _this.canvas);
      requestAnimationFrame(func);
    }
  },
  Brower(width) {
    this.screenHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
    this.screenWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
    // let scaleX = this.screenWidth / this.designWidth;
    this._width = this.screenWidth;
    this._height = this.screenHeight;
  },
  Res() {
    if (this.res) {
      return this.res;
    } else {
      this.res = new Res();
      this.res.load(
        ["../Resources/background.png", "../Resources/bg.png", "../Resources/enemy0_down1.png", "../Resources/enemy0_down2.png", "../Resources/enemy0_down3.png", "../Resources/enemy0_down1.png"],
        () => {
          console.log(123123);
          setTimeout(() => {
            this.render();
          }, 0);
        }
      );
      return this.res;
    }
  }
});
export default P;
