export const pad = (num, n) => {
  var len = num.toString().length;
  while (len < n) {
      num = '0' + num;
      len++;
  }
  return num;
}
Date.prototype.FormatDate = function (fmt) {  
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 c
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
  //调用示例：   new Date(时间戳).FormatDate('yyyy-MM-dd hh:mm:ss')  除了月份M大写其余全部小写
}

export const getShortDate = timestamp => {
    var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    return Y + '.' + String(M);
}
export const getFullTime = date => {
  var d = new Date(date);
  var Y = d.getFullYear();
  var M = d.getMonth() + 1; 
  var D = d.getDate();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  return pad(Y, 4) + '-' + pad(M, 2) + '-' + pad(D, 2) + ' ' + pad(h, 2) + ':' + pad(m, 2) + ":" + pad(s, 2);
}
export const getLocalDate = date => {
  var d = new Date(date * 1000);
  var Y = d.getFullYear();
  var M = d.getMonth() + 1; 
  var D = d.getDate();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  return pad(Y, 4) + '-' + pad(M, 2) + '-' + pad(D, 2) + ' ' + pad(h, 2) + ':' + pad(m, 2);
}
export const getNoYearDate = date => {
  var d = new Date(date * 1000);
  var Y = d.getFullYear();
  var M = d.getMonth() + 1;
  var D = d.getDate();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  return pad(M, 2) + '-' + pad(D, 2) + ' ' + pad(h, 2) + ':' + pad(m, 2);
}

export const getFormatDate = date => {
    var d = new Date(date * 1000);
    var Y = d.getFullYear();
    var M = d.getMonth() + 1;
    var D = d.getDate();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    return pad(Y, 4) + '-' + pad(M, 2) + '-' + pad(D, 2);
}

export const getMonthAndDayDate = date =>{
    var d = new Date(date * 1000);
    var Y = d.getFullYear();
    var M = d.getMonth() + 1;
    var D = d.getDate();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    return pad(M, 2) + '-' + pad(D, 2);
}

// export const getFileName = fileName => {
//   var date = new Date();
//   var y = date.getFullYear();
//   var m = (date.getMonth() + 1);
//   var d = date.getDate();
//   var h = date.getHours();
//   var min = date.getMinutes();
//   var s = date.getSeconds();
//   var randStr = randomString(6);
//   var result =/\.(\w+)$/.exec(fileName);
//   var key = 'web_' + Cookies.get("user") + '_' + y.toString() + pad(m, 2) + pad(d, 2) + pad(h, 2) + pad(min, 2) + pad(s, 2) + '_' + randStr + result[0];
//   return key;
// }
