export const dealMenuList = (data) => {
  let listArrat = data.filter(item => !item.render);
  
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