const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const body = $('body')
const menuBtn = $('#menu-btn')
const closeBtn = $('#close-btn')
const themeToggle = $('#theme-toggle')  

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
