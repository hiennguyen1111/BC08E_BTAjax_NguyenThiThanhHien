function NhanVien(){
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.chucVu = '';
    this.heSoChucVu = '';
    this.luongCoBan = '';
    this.soGioLam = '';
    this.tongLuong = function () {
        return this.luongCoBan * this.heSoChucVu;
    }
    this.xepLoaiTrongThang = function () {
        var xepLoai = '';
        if(Number(this.soGioLam) > 120) {
            xepLoai = 'Nhân viên xuất sắc!'
        } else if (Number(this.soGioLam) > 100) {
            xepLoai = 'Nhân viên giỏi!'
        } else if (Number(this.soGioLam) > 80) {
            xepLoai = 'Nhân viên khá'
        } else if (Number(this.soGioLam) > 50) {
            xepLoai = 'Nhân viên trung bình'
        } else {
            xepLoai = 'Không thể xếp loại!';
        }
        return xepLoai;
    }
}