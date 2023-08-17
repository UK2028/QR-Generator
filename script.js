let input = document.querySelector(".inputText");
let generate = document.querySelector(".generate");
let image = document.querySelector(".qr-code");
let downloadDiv = document.querySelector(".qr-code-button");
let downloadButtonDesktop = document.querySelector(".download-button-desktop");
let downloadButtonMobile = document.querySelector(".download-button-mobile");
let selectSize = document.getElementById("select-size");

let qr;
let download_link;

(function createSize() {
  for (let i = 100; i <= 10000; i += 100) {
    select = i === 300 ? "selected" : "";
    let option = `<option value=${i} ${select}>${i}X${i}</option>`;
    selectSize.insertAdjacentHTML("beforeend", option);
  }
})();

function QRGenerator() {
  qr = new QRCode(image, {
    text: `${input.value.trim()}`,
    width: selectSize.value,
    height: selectSize.value,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
  downloadDiv.style.display = "block";
  download_link_desktop = document.createElement("a");
  download_link_mobile = document.createElement("a");
  download_link_desktop.setAttribute("download", "qr_code_desktop.png");
  download_link_mobile.setAttribute("download", "qr_code_mobile.png");
  download_link_desktop.innerText = "Download for Desktop";
  download_link_mobile.innerText = "Download for Mobile";
  download_link_desktop.style.color = "white";
  download_link_desktop.style.textDecoration = "none";
  download_link_mobile.style.color = "white";
  download_link_mobile.style.textDecoration = "none";
  let qr_code_img = document.querySelector(".qr-code img");
  setTimeout(() => {
    download_link_desktop.setAttribute(
      "href",
      `${qr_code_img.getAttribute("src")}`
    );
  }, 300);
  let qr_code_can = document.querySelector(".qr-code canvas");
  setTimeout(() => {
    download_link_mobile.setAttribute("href", `${qr_code_can.toDataURL()}`);
  }, 300);
  downloadButtonDesktop.appendChild(download_link_desktop);
  downloadButtonMobile.appendChild(download_link_mobile);
}

function removeImage() {
  image.remove();
  downloadDiv.remove();
  let ele = document.createElement("div");
  let btnDiv = document.createElement("div");
  let btnDesktop = document.createElement("button");
  let btnMobile = document.createElement("button");
  btnDesktop.classList.add(
    "download-button-desktop",
    "btn",
    "btn-primary",
    "mx-3"
  );
  btnMobile.classList.add(
    "download-button-mobile",
    "btn",
    "btn-primary",
    "mx-3"
  );
  btnDiv.classList.add("align-self-center", "qr-code-button");
  btnDiv.style.display = "none";
  ele.classList.add("align-self-center", "qr-code", "m-4");
  document.querySelector(".wrapper").appendChild(ele);
  btnDiv.appendChild(btnDesktop);
  btnDiv.appendChild(btnMobile);
  document.querySelector(".wrapper").appendChild(btnDiv);
  image = document.querySelector(".qr-code");
  downloadDiv = document.querySelector(".qr-code-button");
  downloadButtonDesktop = document.querySelector(".download-button-desktop");
  downloadButtonMobile = document.querySelector(".download-button-mobile");
}

generate.addEventListener("click", () => {
  if (input.value != "") {
    if (qr != undefined) {
      qr.clear();
      removeImage();
    }
    QRGenerator();
  } else {
    removeImage();
  }
});
