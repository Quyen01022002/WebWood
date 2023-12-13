const numberInput = document.querySelector('.product-quantity__input')

numberInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
})