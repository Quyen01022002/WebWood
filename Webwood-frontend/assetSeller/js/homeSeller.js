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