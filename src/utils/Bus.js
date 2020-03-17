const TIME_OUT = 6 * 60 * 60 * 1000;

class Bus {
  get(name) {
    if (localStorage.getItem(name)) {
      const store = JSON.parse(localStorage.getItem(name));
      const { data, timeout } = store;
      if (timeout < Date.now()) {
        this.remove(name);
        return false;
      }
      return data;
    }
    return '';
  }
  set(name, val) {
    const time = Date.now() + TIME_OUT;
    const data = JSON.stringify({
      data: val,
      timeout: time
    });
    localStorage.setItem(name, data);
  }
  remove(name) {
    localStorage.removeItem(name);
  }
}

export const bus = new Bus();
