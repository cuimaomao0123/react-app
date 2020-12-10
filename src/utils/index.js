export const dealMenuList = (data) => {
  /*  
    [
      {
        path: '/home',
        title: '首页管理'
        routes:[
          {
            path: '/home/view',
            title: '首页管理'
          }
        ]
      }
    ]
  */
  let menuList = []
  for(let item of data.filter(n => n.title)){
    let menu = Object.assign({},item);
    menu.title = item.title;
    menu.path = item.path;
    if(item.routes && item.routes.length > 0){
      menu.routes = []
      for(let iten of item.routes.filter(m => m.title)){
        let menu_routes = Object.assign({},iten)
        menu_routes.title = iten.title
        menu_routes.path = iten.path
        menu.routes.push(menu_routes)
      }
    }
    menuList.push(menu)
  }
  return menuList;
}

export const getToken = () => {
  return localStorage.getItem('react_token');
}

export const setToken = (token) => {
  localStorage.setItem('react_token',token);
}

export const isToken = () => {
  return getToken() ? true : false;
}