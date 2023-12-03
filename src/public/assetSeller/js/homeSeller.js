const { response } = require("express")

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const body = $('body')
const menuBtn = $('#menu-btn')
const closeBtn = $('#close-btn')
const themeToggle = $('#theme-toggle')
var scrollTopBtn = $('#scrollTop-btn')
var rootElement = document.documentElement

const sidebarLinks = $$('.sidebar-link')
var sidebarArr = [{ link: 'homeSeller.html' },
{ link: 'orderSeller.html' },
{ link: 'messageSeller.html' },
{ link: 'productSeller.html' },
{ link: 'categorySeller.html' },
{ link: 'customerSeller.html' },
]


menuBtn.addEventListener('click', () => {
  body.classList.add('open-menu')
})
closeBtn.addEventListener('click', () => {
  body.classList.remove('open-menu')
})
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme-variables')

  themeToggle.querySelector('i:nth-child(1)').classList.toggle('active')
  themeToggle.querySelector('i:nth-child(2)').classList.toggle('active')
});

// Scroll top 0
window.addEventListener('scroll', function () {
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
  if ((rootElement.scrollTop / scrollTotal) > 0.80) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Sidebar event click
sidebarArr.forEach((item, index) => {
  const sidebarLink = sidebarLinks[index]
  sidebarLink.addEventListener('click', function () {
    window.location.href = item.link
  })
})


function deleteProduct(slug) {
  axios.delete('/admin/products/' + slug)
    .then(response => {
      console.log('Đã xóa sản phẩm thành công:', response.data);
      
      document.getElementById('successModal').style.display = 'block';
      setTimeout(() => {
        document.getElementById('successModal').style.display = 'none';
        window.location.reload();
      }, 2000);
     
    })
    .catch(error => {
      console.error('Lỗi khi xóa sản phẩm:', error);
    });
}


function addCategory() {
  const catename = document.getElementById('catename').value;
  const imgage = document.getElementById('avatarImagePath').value;
  axios.post('/admin/categories/add-category', {
    catename: catename,
    imgage: imgage,
    // Thêm các thông tin sản phẩm khác nếu cần
  })
  .then(response => {
    // console.log('Danh mục đã được thêm thành công:', response.data);
    // alert('Danh mục đã được thêm thành công!');
    window.location.href ='/admin/categories';
    // Sau khi thêm thành công, có thể redirect hoặc làm gì đó khác tùy ý
  })
  .catch(error => {
    console.error('Lỗi khi thêm danh mục sản phẩm:', error);
    alert('Có lỗi xảy ra khi thêm danh mục sản phẩm!');
    // Xử lý lỗi nếu có
  });

  
}

function updateCategory(id) {
  const catename = document.getElementById('catename').value;
  const imgage = document.getElementById('avatarImagePath').value;
  axios.post('/admin/categories/'+ id, {
    _id: id,
    catename: catename,
    imgage: imgage,
    new: true
    // Thêm các thông tin sản phẩm khác nếu cần
  })
  .then(response => {
    // console.log('Danh mục đã được thêm thành công:', response.data);
    // alert('Danh mục đã được thêm thành công!');
    window.location.href ='/admin/categories';
    // Sau khi thêm thành công, có thể redirect hoặc làm gì đó khác tùy ý
  })
  .catch(error => {
    console.error('Lỗi khi thêm danh mục sản phẩm:', error);
    alert('Có lỗi xảy ra khi thêm danh mục sản phẩm!');
    // Xử lý lỗi nếu có
  });

  
}
function deleteCategory(catename) {
  axios.delete('/admin/categories/' + catename)
    .then(response => {
      console.log('Đã xóa sản phẩm thành công:', response.data);
      
      document.getElementById('successModal').style.display = 'block';
      setTimeout(() => {
        document.getElementById('successModal').style.display = 'none';
        window.location.href='/admin/categories';
      }, 2000);
     
    })
    .catch(error => {
      console.error('Lỗi khi xóa sản phẩm:', error);
    });
}

function deleteUser(userid, status) {
  axios.put('/admin/users/' + userid + '/' + status)
    .then(response => {
      console.log('Đã xóa sản phẩm thành công:', response.data);
      
      window.location.reload();
     
    })
    .catch(error => {
      console.error('Lỗi khi xóa sản phẩm:', error);
    });
}

function updateUser(username) {
  
  axios.put('/admin/users/' + username)
    .then(response => {
      console.log('Đã xóa sản phẩm thành công:', response.data);
      
      window.location.href='/admin/users';
     
    })
    .catch(error => {
      console.error('Lỗi khi xóa sản phẩm:', error);
    });
}

  function searchCategory() {
  const categoryNameInput = document.getElementById('customer-name');
  const value = categoryNameInput.value;
  axios.get('/admin/categories?q=' + value)
    .then(response => {
      console.log('Đã tìm ra sản phẩm');
      
      console.log(value);
       window.location.href='/admin/categories?q='+value;
    })
    .catch(error => {
      console.error('Lỗi khi xóa sản phẩm:', error);
    });
}

function searchProduct() {
  const categoryNameInput = document.getElementById('customer-name');
  const value = categoryNameInput.value;
  axios.get('/admin/products?q=' + value)
    .then(response => {
      console.log('Đã tìm ra sản phẩm');
      
      console.log(value);
       window.location.href='/admin/products?q='+value;
    })
    .catch(error => {
      console.error('Lỗi khi xóa sản phẩm:', error);
    });
}
function searchUser() {
  const categoryNameInput = document.getElementById('customer-name');
  const value = categoryNameInput.value;
  axios.get('/admin/users?q=' + value)
    .then(response => {
      console.log('Đã tìm ra sản phẩm');
      
      console.log(value);
       window.location.href='/admin/users?q='+value;
    })
    .catch(error => {
      console.error('Lỗi khi xóa sản phẩm:', error);
    });
}
function searchOrder() {
  const categoryNameInput = document.getElementById('customer-name');
  const value = categoryNameInput.value;
  axios.get('/admin/orders?q=' + value)
    .then(response => {
      console.log('Đã tìm ra sản phẩm');
      
      console.log(value);
       window.location.href='/admin/orders?q='+value;
    })
    .catch(error => {
      console.error('Lỗi khi xóa sản phẩm:', error);
    });
}

function logout(){
  axios.post('/admin/logout').then(response => {
    window.location.href='/admin/login';
  }).catch(error => {
    console.error('Đăng xuất thất bại');
  })

}