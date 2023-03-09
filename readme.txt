-Các project có thể hỗ trợ:
	https://github.com/safak/youtube2022/blob/blog-app/api/index.js
	mern_social_web
	sern_social_web

-Các framework mà tôi sẽ sử dụng trong project này đó là
1. Phía front-end:
	ReactJS, axios, react-slick, react-quill,  
	@mui/icons-material @mui/material @emotion/styled @emotion/react
	react-router-dom
2 Phía be:
	expressjs, nodemon, mysql, bcryptjs, cookie-parser, cors,jsonwebtoken, multer

Còn các thư viện xuất file, nhập file 
- Cấu trúc folder:
Gồm 2 folder lớn: client và server
trong thằng src của client chắc là tôi cần phải chia ra vì để những thằng admin 
có một noi làm việt riêng

* Về phía login: 

* Tôi đang bị bí cái đoạn điều hướng:
	- khi mà login xong thì có cái để phân biệt được mấy thằng đó, giờ là vấn đề tạo router mà thôi

http://localhost:8800/api/auth/login

tìm hiểu về crud: https://www.material-react-table.com/docs/examples/editing-crud
https://github.com/vikas62081/agGrid/blob/crudOperation/src/App.js
https://mui.com/x/react-data-grid/editing/
hoặc key: crud table react js with material ui

TRY HARD

Vấn đề đầu tiên: cần phải suy nghĩ về cái hk
SELECT class.*, COUNT(students.maSv) as 'So Luong Sinh Vien', course.name, teacher.name as 'Khoa Hoc' from class, students, course, teacher where class.maGv = teacher.maGv, class.maLop = students.maLop and course.maKhoaHoc = class.maKhoaHoc and teacher.maGv = '0805-05';

bay gio la cai nghiep vu no la ntn nho: toi can quan ly 2 cai diem cua sinh vien do la diem tuan CDSV va diem tbtl hk
Thôi thì bây giờ cứ làm theo cái luồng flow giống thằng quanlylopchunhiem cung được
Vấn đề phát sinh ở đây đó là chúng ta cần lấy ra thằng HỌC KÌ
Cái hướng giải quyết của tôi ở đây đó là:
- Vẫn show ra các lớp -> khi click vào 1 lớp cụ thể thì redirect sang lớp đó -> click vào button quản lý điểm -> chọn hk -> đẩy hk lên query 
-> redirect sang trang điểm

- Tự nhiên nãy thấy làm vậy mệt hơn 1 bước:
	+ Tại sao ko ở trang quan ly sinh vien làm điều đó.
	+ Cắt cơn luôn nhỉ.
- Bây giờ sang trang sinh viên:
	+ Bây giờ có 2 hướng:
		- 1: Vẫn theo cái layout cũ
		- 2: Theo layout của thằng login
	+ Vậy chắc là tôi vẫn theo cái cách 1 vậy.
	+ Cái vấn đề ở đây đấy là cái chỗ hiển thị nó có 3 cái cột luôn.
	Thì bây giờ cứ show hẳn ra 3 nhánh: sinh viên, lớp trưởng, hội đồng khoa.
	+ Code riêng cái file phiếu chấm ra
Bây giờ là đang đi theo hướng cũ r này:
	Thứ nhất là để chấm thì ta cần phải chọn theo kì để chấm



******************Lưu trữ tại liệu***********************


