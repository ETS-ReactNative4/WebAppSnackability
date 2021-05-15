let timeout;

export const debounce = (callback, wait) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        timeout = null;
        callback();
    }, wait);
}
