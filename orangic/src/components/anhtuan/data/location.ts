const city = {
    HN: 'Hà Nội',
    HCM: 'Hồ Chí Minh',
    DNG: 'Đà Nẵng',
    CT: 'Cần Thơ',
    HP: 'Hải Phòng',
    BD: 'Bình Dương',
    LA: 'Long An',
    BRVT: 'Bà Rịa Vũng Tàu',
    KH: 'Khánh Hòa',
    QN: 'Quảng Nam',
    DN: 'Đồng Nai',
    DT: 'Đồng Tháp',
    TG: 'Tiền Giang',
    AG: 'An Giang',
    BTH: 'Bình Thuận',
    BL: 'Bạc Liêu',
    BTR: 'Bến Tre',
    BDI: 'Bình Dương',
    BP: 'Bình Phước',
    CM: 'Cà Mau',
}

const district = {
    HN: ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa', 'Cầu Giấy', 'Thanh Xuân', 'Hoàng Mai', 'Long Biên'],
    HCM: ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7',
        'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Quận Bình Tân',
        'Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Phú Nhuận', 'Quận Tân Bình',
        'Quận Tân Phú', 'Quận Thủ Đức', 'Huyện Bình Chánh', 'Huyện Cần Giờ',
        'Huyện Củ Chi', 'Huyện Hóc Môn', 'Huyện Nhà Bè'],
    DNG: ['Quận Cẩm Lệ', 'Quận Hải Châu', 'Quận Liên Chiểu', 'Quận Ngũ Hành Sơn',
        'Quận Sơn Trà', 'Quận Thanh Khê', 'Huyện Hòa Vang'],
    CT: ['Quận Bình Thủy', 'Quận Cái Răng', 'Quận Ninh Kiều', 'Quận Ô Môn',
        'Quận Thốt Nốt', 'Huyện Cờ Đỏ', 'Huyện Phong Điền', 'Huyện Thới Lai',
        'Huyện Vĩnh Thạnh'],
    HP: ['Quận Dương Kinh', 'Quận Hải An', 'Quận Hồng Bàng', 'Quận Kiến An',
        'Quận Lê Chân', 'Quận Ngô Quyền', 'Huyện An Dương', 'Huyện An Lão',
        'Huyện Bạch Long Vĩ', 'Huyện Cát Hải', 'Huyện Kiến Thuỵ', 'Huyện Thủy Nguyên',
        'Huyện Tiên Lãng', 'Huyện Vĩnh Bảo'],
    BD: ['Thị xã Bến Cát', 'Thị xã Dĩ An', 'Thị xã Thuận An', 'Huyện Bắc Tân Uyên',
        'Huyện Bàu Bàng', 'Huyện Bình Dương', 'Huyện Dầu Tiếng', 'Huyện Phú Giáo',
        'Huyện Tân Uyên', 'Huyện Thuận An'],
    LA: ['Thành phố Tân An', 'Huyện Bến Lức', 'Huyện Cần Đước', 'Huyện Cần Giuộc',
        'Huyện Châu Thành', 'Huyện Đức Hòa', 'Huyện Đức Huệ', 'Huyện Mộc Hóa',
        'Huyện Tân Hưng', 'Huyện Tân Thạnh', 'Huyện Tân Trụ', 'Huyện Thạnh Hóa',
        'Huyện Thủ Thừa', 'Huyện Vĩnh Hưng'],
    BRVT: ['Thành phố Vũng Tàu', 'Thị xã Bà Rịa', 'Huyện Châu Đức', 'Huyện Côn Đảo',
        'Huyện Đất Đỏ', 'Huyện Long Điền', 'Huyện Tân Thành', 'Huyện Xuyên Mộc'],
    KH: ['Thành phố Nha Trang', 'Thành phố Cam Ranh', 'Huyện Cam Lâm', 'Huyện Diên Khánh',
        'Huyện Khánh Vĩnh', 'Huyện Khánh Sơn', 'Huyện Ninh Hòa', 'Huyện Trường Sa',
        'Huyện Vạn Ninh'],
    QN: ['Thành phố Tam Kỳ', 'Thành phố Hội An', 'Huyện Bắc Trà My', 'Huyện Đại Lộc',
        'Huyện Điện Bàn', 'Huyện Đông Giang', 'Huyện Duy Xuyên', 'Huyện Hiệp Đức',
        'Huyện Nam Giang', 'Huyện Nam Trà My', 'Huyện Nông Sơn', 'Huyện Núi Thành',
        'Huyện Phú Ninh', 'Huyện Phước Sơn', 'Huyện Quế Sơn', 'Huyện Tây Giang',
        'Huyện Thăng Bình', 'Huyện Tiên Phước'],
    DN: ['Thành phố Biên Hòa', 'Thành phố Long Khánh', 'Huyện Cẩm Mỹ', 'Huyện Định Quán',
        'Huyện Long Thành', 'Huyện Nhơn Trạch', 'Huyện Tân Phú', 'Huyện Thống Nhất',
        'Huyện Trảng Bom', 'Huyện Vĩnh Cửu', 'Huyện Xuân Lộc'],
    DT: ['Thành phố Cao Lãnh', 'Thành phố Sa Đéc', 'Thị xã Hồng Ngự', 'Huyện Cao Lãnh',
        'Huyện Châu Thành', 'Huyện Hồng Ngự', 'Huyện Lai Vung', 'Huyện Lấp Vò',
        'Huyện Tam Nông', 'Huyện Tân Hồng', 'Huyện Thanh Bình', 'Huyện Tháp Mười'],
    TG: ['Thành phố Mỹ Tho', 'Thị xã Gò Công', 'Thị xã Cai Lậy', 'Huyện Cái Bè',
        'Huyện Cai Lậy', 'Huyện Châu Thành', 'Huyện Chợ Gạo', 'Huyện Gò Công Đông',
        'Huyện Gò Công Tây', 'Huyện Tân Phước', 'Huyện Tân Phú Đông', 'Huyện Tân Thạnh',
        'Huyện Châu Thành'],
    AG: ['Thành phố Long Xuyên', 'Thành phố Châu Đốc', 'Thị xã Tân Châu', 'Huyện An Phú',
        'Huyện Châu Phú', 'Huyện Châu Thành', 'Huyện Chợ Mới', 'Huyện Phú Tân',
        'Huyện Thoại Sơn', 'Huyện Tịnh Biên', 'Huyện Tri Tôn'],
    BTH: ['Thành phố Phan Thiết', 'Thị xã La Gi', 'Huyện Bắc Bình', 'Huyện Đức Linh',
        'Huyện Hàm Tân', 'Huyện Hàm Thuận Bắc', 'Huyện Hàm Thuận Nam', 'Huyện Phú Quí',
        'Huyện Tánh Linh', 'Huyện Tuy Phong'],
    BL: ['Thành phố Bạc Liêu', 'Huyện Đông Hải', 'Huyện Giá Rai', 'Huyện Hòa Bình',
        'Huyện Hồng Dân', 'Huyện Phước Long', 'Huyện Vĩnh Lợi'],
    BTR: ['Thành phố Bến Tre', 'Huyện Ba Tri', 'Huyện Bình Đại', 'Huyện Châu Thành',
        'Huyện Chợ Lách', 'Huyện Giồng Trôm', 'Huyện Mỏ Cày Bắc', 'Huyện Mỏ Cày Nam',
        'Huyện Thạnh Phú'],
    BDI: ['Thành phố Thủ Dầu Một', 'Thị xã Bến Cát', 'Thị xã Dĩ An', 'Thị xã Thuận An',
        'Huyện Bắc Tân Uyên', 'Huyện Bàu Bàng', 'Huyện Bình Dương', 'Huyện Dầu Tiếng',
        'Huyện Phú Giáo', 'Huyện Tân Uyên', 'Huyện Thuận An'],
    BP: ['Thị xã Phước Long', 'Huyện Bình Phước', 'Huyện Bù Đăng', 'Huyện Bù Đốp',
        'Huyện Bù Gia Mập', 'Huyện Chơn Thành', 'Huyện Đồng Phú', 'Huyện Hớn Quản',
        'Huyện Lộc Ninh', 'Huyện Phú Riềng'],
    CM: ['Thành phố Cà Mau', 'Huyện Cái Nước', 'Huyện Đầm Dơi', 'Huyện Năm Căn',
        'Huyện Ngọc Hiển', 'Huyện Phú Tân', 'Huyện Thới Bình', 'Huyện Trần Văn Thời',
        'Huyện U Minh'],
}