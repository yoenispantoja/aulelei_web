function Host() {
  return location.hostname + ':' + location.port;
}

export const environment = {
  production: true,
  apiUrl: 'https://dondedorian.herokuapp.com/api',
  apiMedias: 'https://dondedorian.herokuapp.com/'

};
