// Attach to the form submit, not the button
document.getElementById("contact").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the page from refreshing

  const commentValue = document.getElementById("comment").value;

  if (commentValue.trim() !== "") {
    document.getElementById("message").textContent = 3;
    ("Thank you for your message!");
    document.getElementById("contact").reset();
  } else {
    document.getElementById("message").textContent =
      "Please write something first.";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navbarHeight = navbar.offsetHeight;

  window.addEventListener("scroll", () => {
    if (window.scrollY > navbarHeight) {
      navbar.classList.add("bg-white", "text-black");
      navbar.classList.remove("bg-transparent", "text-white");
    } else {
      navbar.classList.add("bg-transparent", "text-white");
      navbar.classList.remove("bg-white", "text-black");
    }
  });
});

const hamburgerButton = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");

hamburgerButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((data) => {
      const carousel = document.getElementById("carousel");
      carousel.innerHTML = ""; // Clear existing items

      // Jika data langsung array: gunakan ini
      data.forEach((item) => {
        const div = document.createElement("div");
        div.className = "carousel-item flex flex-col m-0 p-0";

        div.innerHTML = `
          <img
            src="./aset/${item.image}"
            class="rounded-box w-2/3"
          />
          <p class="text-lg font-bold dark:text-white text-center pt-3 w-2/3">
            ${item.name}
          </p>
          <p class="text-md font-bold dark:text-white text-center w-2/3">
            ${item.description}
          </p>
        `;

        carousel.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Gagal mengambil data produk:", error);
    });
});
