export function getFbCookies() {
    const cookie = document.cookie;
    const fbp = cookie.match(/_fbp=([^;]+)/)?.[1];
    const fbc = cookie.match(/_fbc=([^;]+)/)?.[1];
    return { fbp, fbc };
}
  