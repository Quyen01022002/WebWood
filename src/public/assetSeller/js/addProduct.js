// const btnEditVariant = $$('.btn-edit-variant')
// const btnAddVariant = $$('.btn-add-variant')

// const modalAddVariant = $$('#modalAddVariant')
// const modalTitle = $('.modal-title')

// btnAddVariant.onclick = () => {
//     if(modalTitle)
//         modalTitle.textContent = `New Variant`
// }
// btnEditVariant.forEach((btn, index) => {
//     btn.onclick = function () {
//         modalTitle.textContent = `Edit Variant`
//     }
// })

const colorList = [];

const addColor = document.getElementById('add_color');
  addColor.addEventListener('click',function(){
      let empty= false;
      
      const inputs = document.querySelectorAll('.add_color_modal input[type="text"][required], .add_color_modal input[type="number"][required]');
  for (const input of inputs) {
    if (input.value === '') {
      input.classList.add('error-input');
      input.focus();
      empty = true;
      break;
    }else {
      input.classList.remove('error-input');
    }
  }
if (empty===false){
      const todoBody = document.getElementById('bodyyy')
      const newRow = document.createElement('tr');
      
      const code = document.getElementById('color_code').value;
      const name_color = document.getElementById('color_name').value;
      const quantity = document.getElementById('quantity').value;
      const img1 = document.getElementById('image1FileName').value;
      const img2 = document.getElementById('image2FileName').value;
      const img3 = document.getElementById('image3FileName').value;
      const color = {
        name: name_color,
        code: code,
        quantity_color: parseInt(quantity, 10),
        images: [
            {url: img1},
            {url: img2},
            {url: img3}
        ]
      };
      colorList.push(color);

     const product_name = document.getElementById('name_product').value;
     newRow.innerHTML = `
         
          <td>
            <div
              class="table-customer-name"
              id="table-product-name"
            >
              <img
                src="${img1}"
                alt=""
                class="table-product-img"
              />
              <div
                class="d-flex flex-column align-items-start"
              >
                <p>${product_name}</p>
                <span
                  class="fz-15 fw-4"
                  style="color: ${code}"
                  >${name_color}</span
                >
              </div>
            </div>
          </td>
          <td>
            <div
              class="d-flex justify-content-center align-items-center"
            >
              <div
                class="d-flex flex-column gap-3 product-desc"
              >
                <div
                  class="d-flex justify-content-between align-items-center"
                >
                  <h5 class="text-gray fz-15">
                    Quantity:
                  </h5>
                  <h4>${quantity}</h4>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column gap-2">
              <span
                class="text-gray fz-15 fst-italic"
                style="white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px; "
                >${img1}</span
              >
              <span
                class="text-gray fz-15 fst-italic"
                style="white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px; "
                >${img2}</span
              >
              <span
                class="text-gray fz-15 fst-italic"
                style="white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px; "
                >${img3}</span
              >
            </div>
          </td>
          <td>
            <div class="table-action">
              
              <button
              type="button"
                class="table-action-btn"
                aria-label="Delete"
                data-microtip-position="top"
                role="tooltip"
                onclick="deleteTask(this)"
              >
                <i
                  class="fa-solid fa-trash-can table-action-icon"
                  style="color: #ff7782"
                ></i>
              </button>
            </div>
          </td>
                                      
      `;
      
      todoBody.appendChild(newRow);
      cleanModal();
      closeMyModal();
}
    });
function closeMyModal() {
  let myModal = document.getElementById('modalAddVariant'); // Thay yourModalId bằng ID của modal cần đóng
  let modal = bootstrap.Modal.getInstance(myModal); // Lấy đối tượng modal

  if (modal) {
    modal.hide(); // Gọi hàm hide để đóng modal
  }
}

function deleteTask(btn) {
  var row = btn.parentNode.parentNode.parentNode;
  var rowIndex = row.rowIndex;
  colorList.splice(rowIndex-1);
 row.remove(); // Xóa hàng khỏi table
}

function handleFileSelect(event, inputId) {
    const file = event.target.files[0];
    const inputFileName = document.getElementById(`${inputId}FileName`);
    
    if (file) {
      inputFileName.value = file.name;
    }
  }


function cleanModal() {
  document.getElementById('color_code').value = '';
  document.getElementById('color_name').value = ''; 
  document.getElementById('quantity').value = ''; 
  document.getElementById('image1FileName').value ='';
  document.getElementById('image2FileName').value = '';
  document.getElementById('image3FileName').value ='';
}




function saveProductFunction(){
    const product_name = document.getElementById('name_product').value;
    const description = document.getElementById('product-desc').value;
    const cate = document.getElementById('cate_choose').value;
    let isSell = false;
    const buyPrice = document.getElementById('buy_price').value;
    const sellPrice = document.getElementById('sell_price').value;
     const brand = document.getElementById('brand_seller').value;
    const availableRadio = document.getElementById('available');
    if (availableRadio.checked){isSell = true}
    let quantity =0;
    for (let i = 0; i < colorList.length; i++) {
        quantity += colorList[i].quantity_color;
      }
      const slug = convertToSlug(product_name);
    const productNew = {
        name: product_name,
        description: description,
        category: cate,
        buyPrice: parseInt(buyPrice, 10),
        sellPrice: parseInt(sellPrice, 10),
        soldQuantity: 0,
        quantity: quantity,
        isSell: isSell,
        brand: brand,
        colors: colorList,
        slug: slug
    }
    axios.post('/admin/products/add-product', productNew)
       .then(response => {
            console.log("thực thi "+ productNew);
       })
       .catch(error => {
        console.log("lỗi")
       });

}

function updateProductFunction(idpro){
  const product_name = document.getElementById('name_product').value;
  const description = document.getElementById('product_desc').value;
  console.log('mô tả nè: ', description);
  const cate = document.getElementById('cate_choose').value;
  let isSell = false;
  const buyPrice = document.getElementById('buy_price').value;
  const sellPrice = document.getElementById('sell_price').value;
   const brand = document.getElementById('brand_seller').value;
  const availableRadio = document.getElementById('available');
  if (availableRadio.checked){isSell = true}
  let quantity =0;
  for (let i = 0; i < colorList.length; i++) {
      quantity += colorList[i].quantity_color;
    }

  const slug = convertToSlug(product_name);
  const productNew = {
      name: product_name,
      description: description,
      category: cate,
      buyPrice: parseInt(buyPrice, 10),
      sellPrice: parseInt(sellPrice, 10),
      soldQuantity: 0,
      quantity: quantity,
      isSell: isSell,
      brand: brand,
      colors: colorList,
      slug: slug
  }

  console.log(colorList);
   axios.post('/admin/products/' + idpro, productNew)
      .then(response => {
           console.log("thực thi "+ productNew);
           window.location.href = "/admin/products";
      })
     .catch(error => {
      console.log("lỗi")
     });

}
function convertToSlug(text) {
  text = text.toLowerCase();
  text = text.replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu gạch ngang
  text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Loại bỏ dấu
  text = text.replace(/đ/g, 'd'); // Thay thế ký tự đ thành d
  text = text.replace(/[^\w\-]+/g, ''); // Loại bỏ các ký tự không phải là chữ cái, số, hoặc dấu gạch ngang
  return text;
}

function getColorList(colList){
  for (let i = 0; i<colList.length; i++)
  {
    colorList.push(colList[i]);
  }
}


async function displayImagePath(input,index) {
  try {
      const imagePathInput = document.getElementById('image'+index+'FileName');
      return new Promise((resolve, reject) => {
          if (input.files && input.files[0]) {
              const reader = new FileReader();

              reader.onload = function(e) {
                  const imageURL = e.target.result;
                  imagePathInput.value = imageURL; // Lưu đường dẫn của hình ảnh vào một input hoặc biến để sử dụng sau này
                  resolve(imageURL); // Trả về đường dẫn của hình ảnh sau khi đã chọn
              };

              reader.onerror = function(error) {
                  reject(error); // Trả về lỗi nếu có lỗi xảy ra khi đọc hình ảnh
              };

              reader.readAsDataURL(input.files[0]);
          } else {
              reject(new Error('Không có tệp hình ảnh được chọn'));
          }
      });
  } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
      throw error;
  }
}

// // Sử dụng hàm displayImagePath:
// const fileInput = document.getElementById('yourFileInputId'); // Thay 'yourFileInputId' bằng ID thực của input file của bạn
// fileInput.addEventListener('change', async function(event) {
//   try {
//       const imageURL = await displayImagePath(event.target);
//       console.log('Đường dẫn của hình ảnh đã chọn:', imageURL);
//       // Bạn có thể sử dụng imageURL cho mục đích của bạn, vì nó chứa đường dẫn của hình ảnh đã chọn
//   } catch (error) {
//       console.error('Đã xảy ra lỗi:', error);
//   }
// });
