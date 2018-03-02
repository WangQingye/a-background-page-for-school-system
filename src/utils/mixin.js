const globalMethods = {
  methods: {
    log(event, status) {
      let text = status ? "成功" : "失败";
      console.log(`获取${event}${text}`);
    },
    // 切换ID和name
    switchIdorName(key, arr, type) {
      let text;
      if (type == 'id') {
        arr.forEach((item) => {
          if (item.id == key) text = item.name;
        })
      } else {
        arr.forEach((item) => {
          if (item.name == key) text = item.id;
        })
      }
      return text;
    }
  }
}

export {
  globalMethods
}
