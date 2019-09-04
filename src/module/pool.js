export default class Poll {
  constructor() {}
  getItemByName(name, instance, ...arg) {
    this[name] || (this[name] = []);
    if (this[name].length == 0) {
      let ins = new instance(...arg);
      ins.onEnable && ins.onEnable();
      return ins;
    } else {
      let ins = this[name].pop();
      ins.onEnable && ins.onEnable();
      return ins;
    }
  }
  recover(name, instance) {
    instance.recover && instance.recover();
    this[name].push(instance);
    console.log(this[name]);
  }
}
