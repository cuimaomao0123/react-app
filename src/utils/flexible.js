
/*自己写的，跟狙屏幕大小修改HTML根节点font-size大小的方案，用作rem的适配*/

export const changeHtmlSize = (num) => {        //num是划分的份数
  const htmlWidth = document.body.clientWidth || document.documentElement.clientWidth;
  const fontSize = htmlWidth / num;
  const html = document.getElementsByTagName('html')[0];
  html.style.fontSize = fontSize + 'px';
}

