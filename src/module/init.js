import "./requestNextAnimationFrame";
import Res from "./res";
import Main from "./main";
import Poll from "./pool";
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
    this.instance = new Main(this.ctx, this.canvas);
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
        [
          "../Resources/background.png",
          "../Resources/bg.png",
          "../Resources/enemy0_down1.png",
          "../Resources/enemy0_down2.png",
          "../Resources/enemy0_down3.png",
          "../Resources/enemy0_down1.png",
          "../Resources/hero1.png",
          "../Resources/hero2.png",
          "../Resources/bullet1.png",
          "../Resources/enemy0.png",
          "../Resources/enemy0_down1.png",
          "../Resources/enemy0_down2.png",
          "../Resources/enemy0_down3.png",
          "../Resources/enemy0_down4.png",
          "../Resources/game_pause_nor.png",
          "../Resources/game_pause_pressed.png",
          "../Resources/game_resume_nor.png",
          "../Resources/game_resume_pressed.png",
          "../Resources/score.png"
        ],
        () => {
          setTimeout(() => {
            this.render();
          }, 0);
        }
      );
      return this.res;
    }
  },
  gameStatus: true,
  Pool() {
    if (this.poll) {
      return this.poll;
    } else {
      this.poll = new Poll();
      return this.poll;
    }
  }
});
export default P;
