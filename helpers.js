function isApi(requestPath) {

  const regx = /^\/api\/.*/;

  return requestPath.match(regx);

}


module.exports = {
  isApi
};
