const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const quantityInput = $$(".product-quantity__input");
const btnPlus = $$(".btn-plus");
const btnMinus = $$(".btn-minus");


btnPlus.forEach((plus, index) => {
    const quantity = quantityInput[index]
    const minus = btnMinus[index];

    quantity.oninput = function () {
        quantity.setAttribute("value", this.value);
    }

    plus.onclick = function () {
        var currentValue = parseInt(quantity.value);
        if(isNaN(currentValue)){
            currentValue = 1
        }
        quantity.value = (currentValue + 1).toString();
    }

    minus.onclick = function () {
        var currentValue = parseInt(quantity.value);
        if(isNaN(currentValue)){
            quantity.value = "1"
        }
        if (currentValue > 1)
            quantity.value = (currentValue - 1).toString();
    }
});


