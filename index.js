// Lấy phần tử có id là "app" từ tài liệu HTML
const app = document.querySelector("#app");

// Lấy phần tử có id là "pageNumbers" từ tài liệu HTML
const pageNumbersContainer = document.querySelector("#pageNumbers");

// Mảng dữ liệu cần hiển thị
const data = ["a", "b", "c", "d", "e", "f"];

// Số lượng phần tử hiển thị trên mỗi trang
const perPageLength = 2;

// Mảng để lưu trữ dữ liệu được chia thành các trang
let pages = [];


// Kiểm tra xem có dữ liệu và số lượng phần tử trên mỗi trang có hợp lệ không
if (data && perPageLength > 0) {
  // Chia mảng dữ liệu thành các trang và lưu vào mảng pages
  for (let i = 0; i < data.length; i += perPageLength) {
    let page = data.slice(i, i + perPageLength);
    pages.push(page);
  }
}


// Hàm tạo và hiển thị nội dung trang
const makePage = (currentPage = 0) => {
  // Xóa nội dung trang trước đó, nếu có
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }

  // Tạo và thêm các phần tử của trang hiện tại vào app
  pages.length > 0 &&
    pages[currentPage].map((el) => {
      let p = document.createElement("p");
      p.innerHTML = el;
      return app.appendChild(p);
    });
};

// Hàm xử lý khi click vào số trang
const setPage = ({
  target: {
    dataset: { pageNumber },
  },
}) => makePage(pageNumber);

// Hàm tạo và hiển thị các số trang
const makePageNumbers = () => {
  // Chỉ thêm chức năng phân trang nếu có nhiều hơn perPageLength phần tử
  if (data.length > perPageLength) {
    // Duyệt qua các trang và tạo các số trang
    pages.forEach((el, idx) => {
      let pageNumber = document.createElement("a");
      pageNumber.innerHTML = idx + 1;
      pageNumber.dataset.pageNumber = idx;
      pageNumber.classList.add("page-numbers");
      pageNumber.setAttribute("href", "#");
      pageNumber.addEventListener("click", setPage, true);
      pageNumbersContainer.appendChild(pageNumber);
    });
  }
};

// Gọi hàm để hiển thị trang và số trang ban đầu
makePage();
makePageNumbers();
