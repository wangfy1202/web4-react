/**
 * config
 */

let BASE_API = ""; //各个环境接口地址
const { BUILD_ENV } = process.env;
if (BUILD_ENV === "sit") {
  BASE_API = "http://api.shanghaim.net/mock/28/api/";
} else if (BUILD_ENV === "uat") {
  BASE_API = "http://api.shanghaim.net/mock/28/api/";
} else if (BUILD_ENV === "pr") {
  BASE_API = "http://api.shanghaim.net/mock/28/api/";
} else if (BUILD_ENV === "prod") {
  BASE_API = "http://api.shanghaim.net/mock/28/api/";
} else {
  BASE_API = "http://api.shanghaim.net/mock/28/api/";
}

export { BASE_API };
