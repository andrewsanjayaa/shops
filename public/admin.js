//Variable

const links = document.querySelectorAll("aside nav a");
const sections = {
  dashboard: document.getElementById("dashboard"),
  product: document.getElementById("product"),
  addproduct: document.getElementById("addproduct"),
  user: document.getElementById("user"),
};

//Background nav effect

links.forEach((link) => {
  link.addEventListener("click", function () {
    links.forEach((el) => el.classList.remove("bg-[#FDB0C0]"));
    this.classList.add("bg-[#FDB0C0]");

    // Get text for the section

    const sectionName = this.innerText.trim().toLowerCase();

    // Show and Hide Section

    for (const key in sections) {
      if (sectionName.includes(key)) {
        sections[key].classList.remove("hidden");
      } else {
        sections[key].classList.add("hidden");
      }
    }
  });
});

//Show Add Product Section

const productbutton = document.getElementById("addproductbutton");
productbutton.addEventListener("click", () => {
  for (const key in sections) {
    sections[key].classList.add("hidden");
  }
  sections.addproduct.classList.remove("hidden");
});

//Go Back From Add Product Section

document.getElementById("backbutton").addEventListener("click", () => {
  for (const key in sections) {
    sections[key].classList.add("hidden");
  }
  sections.product.classList.remove("hidden");
});

//Submit Message for Product

const productsubmit = document.getElementById("productsubmit");
const productmessage = document.getElementById("productmessage");

productsubmit.addEventListener("click", () => {
  event.preventDefault();
  productmessage.textContent = "✅ Product successfully added!";
  productmessage.style.color = "green";

  setTimeout(() => {
    productmessage.textContent = "";
  }, 3000);
});

const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get("msg");

if (message) {
  alert(decodeURIComponent(message));
}
