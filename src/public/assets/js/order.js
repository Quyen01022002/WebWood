const tabItems = $$('.order-tab-item')
const orderContents = $$('.order-content')
const tabActive = $('.order-tab-item[aria-selected="true"]')
const line = $('.order-tab-line')

console.log([tabActive])
console.log(tabActive.offsetWidth)
line.style.left = tabActive.offsetLeft + 'px'
line.style.width = tabActive.offsetWidth + 'px'

tabItems.forEach((element, index) => {
    const orderContent = orderContents[index]
    element.onclick = function (event) {
        const isSelected = this.getAttribute('aria-selected') === 'true'
        if (isSelected) {
            // event.preventDefault();
        }
        else{
            $('.order-tab-item[aria-selected="true"]').setAttribute('aria-selected', "false")
            $('.order-content.active').classList.remove('active')
    
            line.style.left = this.offsetLeft + 'px'
            line.style.width = this.offsetWidth + 'px'
    
            this.setAttribute('aria-selected', "true")
            orderContent.classList.add('active')
    
            document.body.scrollIntoView({ behavior: 'smooth' })
        }
    }
});