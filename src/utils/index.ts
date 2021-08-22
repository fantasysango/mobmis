import { Toast } from 'vant'

export function $toast(...args: any[]) {
    return Toast(...args)
}

export function closest(el: any, selector: any) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
}