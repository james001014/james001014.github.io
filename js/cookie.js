// cookie.js

/**
 * 设置 cookie
 * @param {string} name - cookie 名称
 * @param {string} value - cookie 值
 * @param {number} [days] - cookie 的过期天数（可选），默认是会话级别的 cookie
 * @param {string} [path] - cookie 的路径（可选），默认为当前路径
 * @param {boolean} [secure] - 是否只通过 HTTPS 传输（可选）
 * @param {string} [sameSite] - SameSite 属性，可以是 "Strict", "Lax", 或 "None"（可选）
 */
function setCookie(name, value, days, path = '/', secure = false, sameSite = 'Lax') {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // 转换天数为毫秒
        expires = "; expires=" + date.toUTCString();
    }
    let cookie = `${name}=${encodeURIComponent(value)}${expires}; path=${path}`;
    if (secure) cookie += "; secure";
    cookie += `; samesite=${sameSite}`;
    document.cookie = cookie;
}

/**
 * 获取 cookie
 * @param {string} name - 要获取的 cookie 名称
 * @returns {string|null} - 返回 cookie 值，若不存在返回 null
 */
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

/**
 * 删除 cookie
 * @param {string} name - 要删除的 cookie 名称
 * @param {string} [path] - 删除 cookie 的路径（可选），如果路径不同需要指定路径
 */
function deleteCookie(name, path = '/') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
}

/**
 * 检查 cookie 是否存在
 * @param {string} name - cookie 名称
 * @returns {boolean} - 如果 cookie 存在则返回 true，否则返回 false
 */
function cookieExists(name) {
    return getCookie(name) !== null;
}

