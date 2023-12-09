const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const closeFilter = $('#filter-close')
const filterFullscreen = $('.offcanvas-container')
const openFilterBtn = $('#open-filter')

openFilterBtn.addEventListener('click', () => {
    filterFullscreen.classList.remove('closed')
})
closeFilter.addEventListener('click', () => {
    filterFullscreen.classList.add('closed')
})