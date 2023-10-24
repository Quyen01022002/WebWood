const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const header = $(".header")
const wallHeader = $(".wall-header")
const slideBar = $(".slidebar")
var prevScrollpos = window.scrollY;

window.onscroll = function () {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
        if (header.classList.contains("hide-header"))
            header.classList.remove("hide-header")
        header.classList.add("show-header")
        wallHeader.style.top = "60px"
        slideBar.style.top = "120px"
    } else {
        if (header.classList.contains("show-header"))
            header.classList.remove("show-header")
        header.classList.add("hide-header")
        wallHeader.classList.add("header-sticky")
        wallHeader.style.top = "0"
        slideBar.style.top = "60px"
    }
    prevScrollpos = currentScrollPos;
}
