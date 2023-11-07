const handlebars = require('handlebars');

handlebars.registerHelper('getFirstColorName', function(colors) {
  // Kiểm tra nếu mảng colors không rỗng và có phần tử đầu tiên
  if (Array.isArray(colors) && colors.length > 0) {
    return colors[0].name; // Trả về tên của phần tử đầu tiên
  }
  return ''; // Trả về chuỗi trống nếu mảng colors rỗng hoặc không có phần tử
});
handlebars.registerHelper('getFirstColorImages', function(images) {
  // Kiểm tra nếu mảng colors không rỗng và có phần tử đầu tiên
  if (Array.isArray(images) && images.length > 0) {
    return images[0].url; // Trả về tên của phần tử đầu tiên
  }
  return ''; // Trả về chuỗi trống nếu mảng colors rỗng hoặc không có phần tử
});