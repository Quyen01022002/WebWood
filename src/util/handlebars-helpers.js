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
handlebars.registerHelper('getFirstColorImagesUrl', function(colors) {
  // Kiểm tra nếu mảng colors không rỗng và có phần tử đầu tiên
  if (Array.isArray(colors) && colors.length > 0) {
    return colors[0].images[0].url; // Trả về tên của phần tử đầu tiên
  }
  return ''; // Trả về chuỗi trống nếu mảng colors rỗng hoặc không có phần tử
});
handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case '===':
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case '!=':
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case '!==':
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case '<':
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case '<=':
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case '>':
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case '>=':
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});
handlebars.registerHelper('add', function (value1, value2) {
  return value1 + value2;
});