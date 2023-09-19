const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const vnpayBtn = $('#continue-vnpay')
const deliveryBtn = $('#continue-delivery')
const radioVnpay = $('#vnpay-payment')
const radioDelivery = $('#payment-on-delivery')

const continueToPayMentBtn = $('#continue-payment-section')
const backToDeliveryInfo = $('#back-to-delivery-info')
const deliveryInfoSection = $('#delivery-info-section')
const paymentMethodSection = $('#payment-method-section')


// click là chuyển sang section thanh toán
continueToPayMentBtn.onclick = function(e) {
    deliveryInfoSection.classList.remove('section-current')
    paymentMethodSection.classList.add('section-current')
    e.preventDefault()
}

backToDeliveryInfo.onclick = function(e) {
    paymentMethodSection.classList.remove('section-current')
    deliveryInfoSection.classList.add('section-current')
    e.preventDefault()
}

radioDelivery.onclick = function () {
    vnpayBtn.classList.remove('step-btn-active')
    deliveryBtn.classList.add('step-btn-active')
    deliveryBtn.style.animation = `slideInLeft .5s ease`
}

radioVnpay.onclick = function () {
    deliveryBtn.classList.remove('step-btn-active')
    vnpayBtn.classList.add('step-btn-active')
    vnpayBtn.style.animation = `slideInLeft .5s ease`
}
