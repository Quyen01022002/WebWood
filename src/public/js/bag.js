document.addEventListener("DOMContentLoaded", function () {
  const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const quantityInput = $$(".product-quantity__input");
const btnPlus = $$(".btn-plus");
const btnMinus = $$(".btn-minus");
const priceMain=$$(".cart-total-price");

let total=0;

btnPlus.forEach((plus, index) => {
  const quantity = quantityInput[index];
  const minus = btnMinus[index];
  const price=priceMain[index];
  const productId = quantity.getAttribute("data-product-id"); // Lấy ID sản phẩm từ thuộc tính data-product-id
  const color = quantity.getAttribute("data-product-color");

  
  quantity.oninput = function () {
    quantity.setAttribute("value", this.value);
    updateQuantity(productId, this.value,color); 
    
  };
  
  const totalPriceElement = document.getElementById("total");
  const productTotal = parseInt(price.textContent.replace(/,/g, '')) * quantity.value;
  total += productTotal;
  totalPriceElement.textContent =total.toLocaleString();

  plus.onclick = function () {
    var currentValue = parseInt(quantity.value,color);
    if (isNaN(currentValue)) {
      currentValue = 0;
    }
    quantity.value = (currentValue + 1).toString();
    updateQuantity(productId, quantity.value,color); 
    total +=parseInt(price.textContent.replace(/,/g, '')) ;
    totalPriceElement.textContent =total.toLocaleString();
    
  };

  minus.onclick = function () {
    var currentValue = parseInt(quantity.value);
    if (isNaN(currentValue)) {
      quantity.value = "0";
    }
    if (currentValue > 0) {
      quantity.value = (currentValue - 1).toString();
    }
    updateQuantity(productId, quantity.value,color); 
  total -=parseInt(price.textContent.replace(/,/g, '')) ;
  totalPriceElement.textContent =total.toLocaleString();
  
   
  };
});
function updateQuantity(productId, newQuantity,color) {
  jQuery.ajax({
    url: '/cart/changequantity', 
    method: 'POST',
    data: { productId, newQuantity ,color},
    
  });
}
});

