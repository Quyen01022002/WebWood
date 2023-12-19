const orderHitorySection = $('#customer-order-history')
const orderDetailSection = $('#customer-order-detail')
const back = $('.back')
const orderLink = $$('.order-link')

orderLink.forEach((element, index) => {
    element.onclick = function (e) {
        const orderId = element.getAttribute('data-id');
        orderHitorySection.classList.remove('active')
        orderDetailSection.classList.add('active')
        DetailOrder(orderId)
        e.preventDefault()
        document.body.scrollIntoView({behavior: 'smooth'})
    }
});
back.onclick = function (e) {
    orderDetailSection.classList.remove('active')
    orderHitorySection.classList.add('active')
    e.preventDefault()
}

function DetailOrder(productId) {
    console.log(productId)
    jQuery.ajax({
      url: '/profile/detail', 
      method: 'GET',
      data: {productId},
      success: function (data) {
    
        displayOrderDetails(data.Detail);
    },
    error: function (error) {
        console.error('Error fetching order details:', error);
    }
      
    });
  }
  function displayOrderDetails(detail) {

    console.log(detail);
    console.log(detail._id);
    
    // Using vanilla JavaScript to set text content
    document.getElementById('diachi').innerText = detail.Address    ;
    
    document.getElementById('orderIdInput').value = detail._id    ;
    // Using vanilla JavaScript to set text content
    document.getElementById('order-status').innerText = detail.Status;
    document.getElementById('emailnguoinhan').innerText = detail.email;
    document.getElementById('total').innerText = detail.Total;
    document.getElementById('menthod').innerText = detail.Method;
    if(detail.Status=="PendingConfirmation")
    {
        document.getElementById('xacnhan').innerText = "Confirmation";
    }
    // Using vanilla JavaScript to clear content
    var orderProductsElement = document.getElementById('order-products');
    while (orderProductsElement.firstChild) {
        orderProductsElement.removeChild(orderProductsElement.firstChild);
    }
    
    // Using vanilla JavaScript to append content
    detail.products.forEach(product => {
        // Create productItem container div
        var productItemContainer = document.createElement('div');
        productItemContainer.className = 'order-product-item';
    
        // Create order-product-left container div
        var orderProductLeftContainer = document.createElement('div');
        orderProductLeftContainer.className = 'order-product-left';
    
        // Create image element
        var productImage = document.createElement('img');
        productImage.src = product.image;  // Replace with the actual image source
        productImage.alt = '';
        productImage.className = 'order-product-image';
    
        // Create order-product-info container div
        var orderProductInfoContainer = document.createElement('div');
        orderProductInfoContainer.className = 'order-product-info';
    
        // Create order-product-name span
        var orderProductName = document.createElement('span');
        orderProductName.className = 'order-product-name';
        orderProductName.innerText = product.name;
    
        // Create order-product-variation div
        var orderProductVariation = document.createElement('div');
        orderProductVariation.className = 'order-product-variation';
        orderProductVariation.innerText = 'Variation: ' + product.color;
    
        // Create order-product-quantity div
        var orderProductQuantity = document.createElement('div');
        orderProductQuantity.className = 'order-product-quantity';
        orderProductQuantity.innerText = 'x' + product.quantity;
    
        // Append created elements to the DOM
        orderProductInfoContainer.appendChild(orderProductName);
        orderProductInfoContainer.appendChild(orderProductVariation);
        orderProductInfoContainer.appendChild(orderProductQuantity);
    
        orderProductLeftContainer.appendChild(productImage);
        orderProductLeftContainer.appendChild(orderProductInfoContainer);
    
        productItemContainer.appendChild(orderProductLeftContainer);
    
        // Create order-price div
        var orderPrice = document.createElement('div');
        orderPrice.className = 'order-price';
        var priceSpan = document.createElement('span');
        priceSpan.innerText = product.price + '$';  // Replace with the actual price
        orderPrice.appendChild(priceSpan);
    
        productItemContainer.appendChild(orderPrice);
    
        // Append the productItemContainer to the order-products container
        orderProductsElement.appendChild(productItemContainer);
    });
    
    
   // Function to update status on the server
function updateStatusOnServer() {
    var orderId = getOrderId(); 
    $.ajax({
        url: '/profile/update', 
        method: 'POST',
        data: { orderId: orderId, status: newStatus },
        success: function(data) {
            console.log('Status updated successfully');
           
        },
        error: function(error) {
            console.error('Error updating status:', error);
        }
    });
}

}
