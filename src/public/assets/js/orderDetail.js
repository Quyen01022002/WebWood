const orderHitorySection = $('#customer-order-history')
const orderDetailSection = $('#customer-order-detail')
const back = $('.back')
const orderLink = $$('.order-link')

orderLink.forEach((element, index) => {
    element.onclick = function (e) {
        orderHitorySection.classList.remove('active')
        orderDetailSection.classList.add('active')
        e.preventDefault()
        document.body.scrollIntoView({behavior: 'smooth'})
    }
});
back.onclick = function (e) {
    orderDetailSection.classList.remove('active')
    orderHitorySection.classList.add('active')
    e.preventDefault()
}