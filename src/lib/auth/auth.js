import Cookies from "js-cookie";

export function setToken(token) {

  console.log("This is new token",token);
  Cookies.set("token", token, { expires: 7 }); // 7 days
}

export function getToken() {
  return Cookies.get("token");
}

export function removeToken() {
  Cookies.remove("token");
}
