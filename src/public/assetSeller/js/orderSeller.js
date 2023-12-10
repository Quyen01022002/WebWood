//const { default: axios } = require("axios");

const setStatusOrder = document.getElementById('save_status');
function savestatus(id){
    const status_order = document.getElementById('status_order').value;
    console.log(status_order);
    axios.post('/admin/orders/'+id, {statusOrder: status_order}).then(response => {
    

      })
      .catch(error => {
        console.error('Lỗi set status', error);
      });



}