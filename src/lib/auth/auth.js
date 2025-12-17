import Cookies from "js-cookie";

export function setSessionData(data){
  Cookies.set("userData", JSON.stringify(data), { expires: 7 }); // 7 days
}
export function getSessionData(){
  const data = Cookies.get("userData");
  return data ? JSON.parse(data) : null;
}
export function checkLogIn(){
  const data = Cookies.get("userData");
  return data == null? false:true;
}
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

export function isProvider() {
  const data = getSessionData();
  if (!data) return false;
  // Check common role field names for provider status
  return data.user.role === 'provider'  
}

export function isAdmin() {
  const data = getSessionData();
  if (!data) return false;
  // Check common role field names for admin status
  return data.user.role === 'provider' || data.user.role === 'admin' ; 
}
