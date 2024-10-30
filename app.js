import { fetchJsonData } from "./data.js";

let defaultId = 1;

const app = {
   actionFunction: function (e) {
      const img = e.target;
      // Ẩn hình ảnh
      img.style.display = "none";

      // Hiện visdeo
      // iframe.style.display = "block";

      // Gọi hàm phát video
      //   this?.playVideo();

      // Phóng to video toàn màn hình
      if (iframe.requestFullscreen) {
         iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
         // Firefox
         iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
         // Chrome, Safari và Opera
         iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
         // IE/Edge
         iframe.msRequestFullscreen();
      }
   },
   renderCenter: function (defaultId, datas) {
      const h1 = document.querySelector("h1");
      const divCenter = document.querySelector(".center");
      if (divCenter.querySelector("img")) {
         const img = divCenter.querySelector("img");
         img.removeEventListener("click", this.actionFunction);
      }
      const itemId = datas.find((data) => Number(defaultId) === Number(data.id));
      divCenter.innerHTML = `<img
                    id="thumbnail"
                    style="cursor: pointer"
                    src="https://cms.imgworlds.com/assets/a5366382-0c26-4726-9873-45d69d24f819.jpg?key=home-gallery"
                    alt=""
                />
                ${itemId?.link}`;
      h1.innerText = itemId?.name;
      const img = document.getElementById("thumbnail");
      this.clickImage(img);
   },
   clickImage: function (img) {
      img.addEventListener("click", this.actionFunction);
   },
   playVideo: function () {
      //  Tạo một iframe mới với nguồn video
      // const newIframe = document.querySelector("iframe");
      //   newIframe
      //  newIframe.src =
      //      "https://drive.google.com/file/d/1qrx8i861-5V7Rl7OlWOQAzinONGylXFQ/view?autoplay=1";
      //  newIframe.width = "100%";
      //  newIframe.height = "100%";
      //  newIframe.allowFullscreen = true;
      //  // Thay thế iframe cũ bằng iframe mới
      //  iframe.parentNode.replaceChild(newIframe, iframe);
   },
   fetchData: async function () {
      const data = await fetchJsonData();
      return data;
   },
   setDefaultId: function (id, datas) {
      defaultId = Number(id);
      this.renderCenter(defaultId, datas);
   },
   start: async function () {
      const iframe = document.getElementById("my-video");
      const btns = document.querySelector(".btns");

      const datas = await this.fetchData();
      const length = datas.length;
      this.renderCenter(defaultId, datas);

      btns.innerHTML = `${[...Array(length)]
         .map((_, index) => {
            return `<button class="uiverse">
                <div class="wrapper">
                    <span>${index + 1}</span>
                    <div class="circle circle-12"></div>
                    <div class="circle circle-11"></div>
                    <div class="circle circle-10"></div>
                    <div class="circle circle-9"></div>
                    <div class="circle circle-8"></div>
                    <div class="circle circle-7"></div>
                    <div class="circle circle-6"></div>
                    <div class="circle circle-5"></div>
                    <div class="circle circle-4"></div>
                    <div class="circle circle-3"></div>
                    <div class="circle circle-2"></div>
                    <div class="circle circle-1"></div>
                </div>
            </button>`;
         })
         .join("")}`;

      console.log(Array.from(btns.children));
      Array.from(btns.children).map((item, index) => {
         item.addEventListener("click", (e) => {
            // const id = e.target.querySelector("span").innerText;
            // console.log(id, e.target)
            this.setDefaultId(index + 1, datas);
         });
      });
   },
};

app.start();
