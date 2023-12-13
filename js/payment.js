const provinceSelect = document.getElementById('provinceSelect');
const districtSelect = document.getElementById('districtSelect');
const vietnamLocations = {{provinces}}; // Thay thế bằng dữ liệu thực tế từ API
console.log(vietnamLocations);
function populateDistricts(selectedProvinceId) {
  // Làm sạch danh sách huyện
  districtSelect.innerHTML = '<option value="">Chọn huyện</option>';
  
  // Lấy danh sách huyện tương ứng với tỉnh đã chọn
  const districts = vietnamLocations.districts.filter(district => district.province_id === selectedProvinceId);
  
  // Điền danh sách huyện vào phần tử select
  districts.forEach(district => {
    const option = document.createElement('option');
    option.value = district.id;
    option.text = district.name;
    districtSelect.appendChild(option);
  });
}


provinceSelect.addEventListener('change', () => {
  const selectedProvinceId = provinceSelect.value;
  populateDistricts(selectedProvinceId);
  console.log("quyên");
});