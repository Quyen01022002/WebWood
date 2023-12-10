var table;
function initTableData(){
    const data = {{{product}}};
    table=$('#products').DataTable({
        "processing": true,
        data,
        columns:[
            {data: 'name'},
            {data: 'description'},
            {data: 'category'},
            {data: 'ByPrice'},
            {data: 'SellPrice'},
            {data: 'quantity'},
            {data: 'sellquantity'}
            ]
        });
    }
$(document).ready(function(){
    initTableData();
});