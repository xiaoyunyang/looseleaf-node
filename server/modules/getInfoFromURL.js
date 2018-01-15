/**
 * getUsernameFromURL
 * @param {[string]} path [path for the url with format:  protocol://hostname:port/@username]
 * @return {[function]} [a closure]
 *
 * Usage example:
 * getInfoFromURL("https://medium.com/@xiaoyunyang")("username")
 * returns "xiaoyunyang"
 *
 * See docs on Node URL: https://nodejs.org/docs/latest/api/url.html
 *
 */
const getInfoFromURL = path => {
  const URL = require("url").URL;
  const myUrl = new URL(path)
  const pathname = myUrl.pathname
  return (param) => {
    if (param == "username") return getUsernameFromURL(pathname)
    else if (param == "pathname") return getPathnameFromURL(pathname)
    else return "error"
  }
}
const getUsernameFromURL = pathname => {
  const regex = new RegExp('/@');
  const username = pathname.split(regex).slice(1)[0]
  if(!username) {
    return "Error in parsing: URL needs to be in format://hostname:port/@username"
  }
  return username
}
const getPathnameFromURL = pathname => {
  const regex = new RegExp('/');
  const name = pathname.split(regex).slice(1)[0]
  if(!name) {
    return "Error in parsing: URL needs to be in format://hostname:port/pathname"
  }
  return name
}

// TODO: TEST CODE BELOW. Remote for production
let path = "https://medium.com/@xiaoyunyang"
console.log(getInfoFromURL(path)("username"))

/*
We have to use module.export because our server doesn't get transpiled into ES6.
export default [module name] is ES6 syntax
 */

module.exports = getInfoFromURL
