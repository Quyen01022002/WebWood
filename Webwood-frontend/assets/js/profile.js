const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const sections = $$('.section')
const sidebarItems = $$('#profile-sidebar .sidebar-item')

const addressItems = $$('.address-item')
const btnSetDefaults = $$('.address-btn-default')

const modal = $('.modal-address')
const closeModal = $('.close')
const btnAddAddress = $('.btn-add-address')
const btnEditAddress = $$('.btn-edit-address')
const btnAcceptDelete = $('.btn-accept-delete')
const btnDeleteAddress = $$('.btn-delete-address')
const modalHeaderTitle = $('.modal-header-title')

// Hiển thị nội dung của từng sidebar
sidebarItems.forEach((sidebar, index) => {
    const section = sections[index]

    sidebar.onclick = function (event) {
        event.preventDefault()
        $('.section.active').classList.remove('active')
        $('.sidebar-item.active').classList.remove('active')

        this.classList.add('active')
        section.classList.add('active')

        document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    }
});

// Set địa chỉ mặc định
btnSetDefaults.forEach((btn, index) => {
    const addressItem = addressItems[index]

    btn.onclick = function () {
        $('.address-item.default').classList.remove('default')
        // $('.address-btn-default.active').classList.remove('active')

        addressItem.classList.add('default')
        // $('.address-btn-default').classList.add('active')
    }

});

// Đóng mở modal add,edit address
btnAddAddress.onclick = () => {
    modal.style.display = 'block';
    modalHeaderTitle.textContent = `New Address`
}

closeModal.onclick = () => {
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

btnEditAddress.forEach((btn, index) => {
    const addressItem = addressItems[index]
    const btnDelete = btnAcceptDelete[index]

    btn.onclick = function () {
        modal.style.display = "block";
        modalHeaderTitle.textContent = `Edit Address`

        modal.scrollIntoView({ behavior: "smooth" })
    }
})
