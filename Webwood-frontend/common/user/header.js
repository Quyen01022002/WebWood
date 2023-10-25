const header =  document.querySelector(".header")
const wallHeader =  document.querySelector(".wall-header")
const slideBar =  document.querySelector(".slidebar")
const orderTabs = document.querySelector('section#orders .order-tabs')
var prevScrollpos = window.scrollY;

window.onscroll = function () {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
        if (header.classList.contains("hide-header"))
            header.classList.remove("hide-header")
        header.classList.add("show-header")
        if(wallHeader)
            wallHeader.style.top = "60px"
        if(slideBar)
            slideBar.style.top = "120px"
        if(orderTabs)
            orderTabs.style.top = "60px"
    } else {
        if (header.classList.contains("show-header"))
            header.classList.remove("show-header")
        header.classList.add("hide-header")
        if(wallHeader){
            wallHeader.classList.add("header-sticky")
            wallHeader.style.top = "0"
        }
        if(slideBar)
            slideBar.style.top = "60px"
        if(orderTabs)
            orderTabs.style.top = 0
    }
    prevScrollpos = currentScrollPos;
}
