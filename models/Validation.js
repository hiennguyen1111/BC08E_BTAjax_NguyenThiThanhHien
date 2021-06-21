function Validation() {
    //Chứa các phương thức kiểm tra hợp lệ
    this.kiemTraRong = function (value, selectorError, name) {
      //Xử lý không hợp lệ
      //.trim(): loại bỏ khoảng trắng đầu cuối của chuỗi
      if (value.trim() === "") {
        document.querySelector(selectorError).innerHTML =
          name + " không được bỏ trống !";
        return false;
      }
      //Xử lý hợp lệ
      document.querySelector(selectorError).innerHTML = "";
      return true;
    };
  
    this.kiemTraKyTu = function (value, selectorError, name) {
      var regexAllSelector = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  
      if (regexAllSelector.test(value)) {
        document.querySelector(selectorError).innerHTML = "";
        return true;
      }
      document.querySelector(selectorError).innerHTML = name + " phải là chữ";
      return false;
    };
  
    this.tatCaSo = function (value, selectorError, name) {
      var regexNumber = /^[0-9]+$/;
  
      if (regexNumber.test(value)) {
        document.querySelector(selectorError).innerHTML = "";
        return true;
      }
      document.querySelector(selectorError).innerHTML = name + " từ 50 đến 120";
      return false;
    };
  
    this.kiemTraDoDai = function (
      value,
      selectorError,
      minLength,
      maxLength,
      name
    ) {
      if (value.length < minLength || value.length > maxLength) {
        document.querySelector(
          selectorError
        ).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự!`;
  
        return false;
      }
      
      document.querySelector(selectorError).innerHTML='';
      return true;
    };
  
    this.kiemTraGiaTri=function (
      value,
      selectorError,
      minValue,
      maxValue,
      name
    ) {
      if (value < minValue || value > maxValue) {
          document.querySelector(
            selectorError
          ).innerHTML = `${name} từ ${minValue} đến ${maxValue}`;
    
          return false;
        }
        
        document.querySelector(selectorError).innerHTML='';
        return true;
    }
    
  }
  