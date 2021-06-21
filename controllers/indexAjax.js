console.log(axios);

// var promise = axios({
//   url: "../data/text.json", //Đường dẫn đến file hoặc server (api) (Backend cung cấp)
//   method: "GET",
//   responseType:'json',
// });

// //Xử lý thành công
// promise.then(function (result) {
//   console.log("result", result.data);
//   document.querySelector('body').innerHTML=result.data.title;
// });

// //Xử lý thất bại
// promise.catch(function(error) {
//     console.log('error',error)
// })

// var promise = axios({
//   url: "../data/data.xml", //Đường dẫn đến file hoặc server (api) (Backend cung cấp)
//   method: "GET",
//   responseType: "document",
// });

// //Xử lý thành công
// promise.then(function (result) {
//   console.log("result", result.data);
//   document.querySelector("body").innerHTML = result.data.querySelector('title').innerHTML;
// });

// //Xử lý thất bại
// promise.catch(function (error) {
//   console.log("error", error);
// });

//Tạo đối tượng kiểm tra dữ liệu
var kiemTra = new Validation();

document.querySelector("#btnThemNhanVien").onclick = function () {
  //Lấy thông tin người dùng nhập vào chứa vào đối tượng sinh viên
  var nhanVien = new NhanVien();
  nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVien.chucVu = document.querySelector("#chucVu").value;
  nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVien.soGioLam = document.querySelector("#soGioLam").value;

  // Kiểm tra dữ liệu trước khi đưa vào mảng
  // ------------------------------------- validation ---------------------------------------------------
  // (1): Kiểm tra rỗng (bắt buộc nhập)
  var valid = true;
  valid &=
    kiemTra.kiemTraRong(
      nhanVien.maNhanVien,
      "#error_required_maNhanVien",
      "Mã nhân viên"
    ) &
    kiemTra.kiemTraRong(
      nhanVien.tenNhanVien,
      "#error_required_tenNhanVien",
      "Tên nhân viên"
    );
  // (2): Kiểm tra ký tự
  valid &= kiemTra.kiemTraKyTu(
    nhanVien.tenNhanVien,
    "#error_allLetter_tenNhanVien",
    "Tên nhân viên"
  );

  // (3): Kiểm tra độ dài
  valid &= kiemTra.kiemTraDoDai(
    nhanVien.maNhanVien,
    "#error_min_max_length_maNhanVien",
    4,
    6,
    "Mã nhân viên"
  );

  // (4): Kiểm tra giá trị
  valid &= kiemTra.kiemTraGiaTri(
    nhanVien.luongCoBan,
    "#error_min_max_value_luongCoBan",
    1000000,
    20000000,
    "Lương cơ bản"
  );
  
  // (5): Kiểm tra số
  valid &=
    kiemTra.tatCaSo(
      nhanVien.soGioLam,
      "#error_allNumber_soGioLam",
      "Số giờ làm"
    );

  if (!valid) {
    return;
  }

  
  document.querySelector("#btnCapNhatThongTin").onclick = function () {
  document.querySelector("#maNhanVien").disabled = false;
  document.querySelector("#btnThemNhanVien").disabled = false;
  document.querySelector("#btnCapNhatThongTin").disabled = true;
}

};


// PHUONG THUC GET: LAY DL TU SERVER
function layDanhSachNhanVienApi() {
    var promise =axios ({
        url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method:'GET',
        responseType:'json'
    });

    //Xử lý thành công
    promise.then(function(result) {
        console.log('result',result.data);
        renderTableNhanVien(result.data);
    })
    //xử lý thất bại
    promise.catch(function(error) {
        console.log('result',error);
    })
}

layDanhSachNhanVienApi();

function renderTableNhanVien(arrNV) {
    //input
    //Từ mảng arrNV tạo ra 1 chuỗi html <tr> <td></td></tr>
    //arrNV = [{maNhanVien:'',....},{maNhanVien:'',....},{maNhanVien:'',....}]
    var content = "";
    for (var index = 0; index < arrNV.length; index++) {
      //Mỗi lần duyệt lấy ra 1 đối tượng nhân viên
      var nv = arrNV[index];
      var nhanVien = new NhanVien();
      nhanVien.maNhanVien = nv.maNhanVien;
      nhanVien.tenNhanVien = nv.tenNhanVien;
      nhanVien.chucVu = nv.chucVu;
      nhanVien.luongCoBan = nv.luongCoBan;
      nhanVien.soGioLam = nv.soGioLam;
  
      //Từ dữ liệu nhân viên đó => tạo ra 1 chuỗi html tr
      var trNhanVien = `
                  <tr>
                      <td>${nhanVien.maNhanVien}</td>
                      <td>${nhanVien.tenNhanVien}</td>
                      <td>${nhanVien.chucVu}</td>
                      <td>${nhanVien.luongCoBan}</td>
                      <td>${nhanVien.tongLuong()}</td>
                      <td>${nhanVien.soGioLam}</td>
                      <td>${nhanVien.xepLoaiTrongThang()}</td>
                      <td><button onclick="xoaNhanVien('${
                        nhanVien.maNhanVien
                      }')" class="btn btn-danger">Xoá</button>
                      <button onclick="chinhSua('${
                        nhanVien.maNhanVien
                      }')" class="ml-2 btn btn-primary">Chỉnh sửa</button>                     
                      </td>
                  </tr>
          `;
      content += trNhanVien;
    }
    //Dom đến tbody trên giao diện để gán innerHTML vào
    document.querySelector("#tblNhanVien").innerHTML = content;
  
    // console.log('content',content);
  }


// POST: PHƯƠNG THỨC ĐƯA DỮ LIỆU TỪ NGƯỜI DÙNG VỀ SERVER
document.querySelector('#btnThemNhanVien').onclick = function () {
  var nhanVien = new NhanVien();
  // Lấy dữ liệu từ input đổ vào biến nhanVien
  nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVien.chucVu = document.querySelector("#chucVu").value;
  // nhanVien.heSoChucVu = document.querySelector("#heSoChucVu").value;
  nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVien.soGioLam = document.querySelector("#soGioLam").value;

  console.log('nhanVien', nhanVien);
  // Gửi DL về server = Ajax
var promise = axios({
  url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien`, // Đường dẫn BE cung cấp
  method: 'POST', // Phương thức BE cung cấp
  data:nhanVien // dữ liệu gửi đến server theo format BE
});

promise.then(function(result) {
  console.log('result', result.data);
  // Khi thêm dữ liệu thành công => Gọi hàm lấy DS NV từ server về lần nữa
  layDanhSachNhanVienApi();
})

promise.catch(function(error) {
  // hiển thị lỗi do backend trả ra
  console.log('error', error.response.data);
})

}

// DELETE: PHUONG THUC XOA SINH VIEN AJAX
function xoaNhanVien(maNhanVien) {
  console.log('maNhanVien', maNhanVien)

  var promise = axios ({
    url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
    method: 'DELETE',
  })

  promise.then(function(result) {
    console.log('result', result.data);
    // Khi thêm dữ liệu thành công => Gọi hàm lấy DS NV từ server về lần nữa
    layDanhSachNhanVienApi();
  })
  
  promise.catch(function(error) {
    // hiển thị lỗi do backend trả ra
    console.log('error', error.response.data);
  })
}

// ** CHINH SUA THONG TIN **
function chinhSua(maNhanVien){
  var promise = axios ({
    url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
    method:'get'
  })

  promise.then(function(result) {
    var nhanVien = result.data;
    // Dua cac gia tri tu du lieu lay ve len cac control input phia tren
  document.querySelector("#maNhanVien").value = nhanVien.maNhanVien;
  document.querySelector("#tenNhanVien").value = nhanVien.tenNhanVien;
  document.querySelector("#chucVu").value = nhanVien.chucVu;
  document.querySelector("#luongCoBan").value = nhanVien.luongCoBan;
  document.querySelector("#soGioLam").value = nhanVien.soGioLam; 
  })
  
  promise.catch(function(error) {
    // hiển thị lỗi do backend trả ra
    console.log('error', error.response.data);
  })
}

// Lấy những gì người dùng thay đổi

document.querySelector('#btnCapNhatThongTin').onclick = function () {
  var nhanVienUpdate = new NhanVien();
  nhanVienUpdate.maNhanVien = document.querySelector('#maNhanVien').value;
  nhanVienUpdate.tenNhanVien = document.querySelector('#tenNhanVien').value;
  nhanVienUpdate.chucVu = document.querySelector('#chucVu').value;
  nhanVienUpdate.luongCoBan = document.querySelector('#luongCoBan').value;
  nhanVienUpdate.soGioLam = document.querySelector('#soGioLam').value;
  
  console.log(nhanVienUpdate);
  // gui DL ve server
  var promise = axios ({
    url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVienUpdate.maNhanVien}`,
    method:'PUT',
    data:nhanVienUpdate
  })
  promise.then(function(result) {
    console.log(result.data);
    layDanhSachNhanVienApi();
  })
  promise.catch(function(error) {
    // hiển thị lỗi do backend trả ra
    console.log('error', error.response.data);
  })

}
