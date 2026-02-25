export function getToken() {
  return localStorage.getItem("token");
}

export function getRole() {
  const token = getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
}

export function logout() {
  localStorage.clear();
  window.location.href = "/auth/login";
}
