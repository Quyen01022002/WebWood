const btnEditVariant = $$('.btn-edit-variant')
const btnAddVariant = $$('.btn-add-variant')

const modalAddVariant = $$('#modalAddVariant')
const modalTitle = $('.modal-title')

btnAddVariant.onclick = () => {
    modalTitle.textContent = `New Variant`
}
btnEditVariant.forEach((btn, index) => {
    btn.onclick = function () {
        modalTitle.textContent = `Edit Variant`
    }
})
