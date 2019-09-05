export default class Pool {
  constructor() {}
  getItemByName(name, instance, ...arg) {
    this[name] || (this[name] = []);
    if (this[name].length == 0) {
      let ins = new instance(...arg);
      ins.onEnable && ins.onEnable();
      return ins;
    } else {
      let ins = this[name].shift();
      ins.onEnable && ins.onEnable();
      return ins;
    }
  }
  recover(name, instance) {
    instance.recover && instance.recover();
    this[name].push(instance);
  }
}
