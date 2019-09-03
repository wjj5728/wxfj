class Res {
  constructor() {
    this.list = {};
  }
  load(url, compelte) {
    if (!(url instanceof Array)) {
      this.loadImage(url, compelte);
    } else {
      for (let i = 0; i < url.length; i++) {
        const element = url[i];
        if (i == url.length - 1) {
          this.loadImage(element, compelte);
        } else {
          this.loadImage(element);
        }
      }
    }
  }
  getRes(name) {
    console.log(name);
    return this.list[name];
  }
  loadImage(url, compelte) {
    let image = new Image();
    image.crossOrigin = "wjj";
    image.onload = () => {
      this.list[url] = image;
      console.log(image.width);
      compelte && compelte();
      //   image = null;
    };
    image.src = url;
  }
}
export default Res;
