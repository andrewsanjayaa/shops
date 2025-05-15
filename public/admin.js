//Variable

const links = document.querySelectorAll("aside nav a");
const sections = {
  dashboard: document.getElementById("dashboard"),
  product: document.getElementById("product"),
  addproduct: document.getElementById("addproduct"),
  user: document.getElementById("user"),
  testimonial: document.getElementById("testimonial"),
  about: document.getElementById("about"),
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

// Show Message

const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get("msg");

if (message) {
  Swal.fire({
    title: "Good job!",
    text: decodeURIComponent(message),
    icon: "success",
  });
}

// Display User
document.addEventListener("DOMContentLoaded", () => {
  fetch("/users")
    .then((res) => res.json())
    .then((data) => {
      const usertable = document.getElementById("usertable");
      usertable.innerHTML = "";

      data.forEach((item) => {
        const row = document.createElement("tr");
        row.className = "divide-x divide-gray-400";
        const modalId = `modal_${item.id}`;

        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.username}</td>
          <td>${item.roles}</td>
          <td class=" py-2 w-60">
            <div class="flex justify-center">
              <label for="${modalId}" class="btn btn-sm bg-gray-300 text-black font-medium rounded hover:bg-gray-400 w-12 text-center items-center">Edit</label>
              <button type="button" class="btn delete-btn btn-sm bg-red-300 text-black font-medium rounded hover:bg-red-400 w-12 text-center items-center" data-id="${item.id}">Delete</button>
            </div>
            <input type="checkbox" id="${modalId}" class="modal-toggle" />
            <div class="modal" role="dialog">
              <div class="modal-box">
                <h3 class="font-bold text-lg mb-4">Edit User</h3>
                <form method="POST" action="/users/update">
                  <input type="hidden" name="id" value="${item.id}">
                  <label class = "font-semibold text-black block mb-1 text-left" for "username"> Username </label>
                  <input name="username" value="${item.username}" class="w-full p-3 bg-red-100 border-none focus:outline-no" />
                  <label class = "font-semibold text-black block mb-1 text-left" for "userroles"> Roles </label>
                  <input name="userrole" value="${item.roles}" class="w-full p-3 bg-red-100 border-none focus:outline-no" />
                  <label class = "font-semibold text-black block mb-1 text-left" for "userpassword"> New Password </label>
                  <input name="userpassword" type="password" placeholder="New Password" class="w-full p-3 bg-red-100 border-none focus:outline-no" />
                  <div class="modal-action">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <label for="${modalId}" class="btn">Close</label>
                  </div>
                </form>
              </div>
            </div>
            <div>
            </div>
          </td>
        `;

        usertable.appendChild(row);
      });
    })
    .catch((err) => console.error("Gagal fetch data users:", err));
});

// Delete User
document.addEventListener("click", async (e) => {
  if (e.target.matches(".delete-btn")) {
    const userId = e.target.dataset.id;

    if (confirm("Yakin ingin menghapus user ini?")) {
      const res = await fetch(`/users/delete/${userId}`, { method: "DELETE" });

      if (res.ok) {
        const result = await res.json();
        window.location.href =
          window.location.origin + window.location.pathname;
      } else {
        const result = await res.json();
        alert(result.message || "Gagal menghapus user");
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  new FroalaEditor("#editor", {
    events: {
      initialized: function () {
        fetch("/about")
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
          })
          .then((data) => {
            if (data.description) {
              this.html.set(data.description);
            }
          })
          .catch((err) =>
            console.error("Gagal fetch data about:", err.message)
          );
      },
    },
  });
});

document.getElementById("editor-form").addEventListener("submit", function (e) {
  const editorInstance = FroalaEditor.INSTANCES[0];
  editorInstance.events.trigger("form.submit");
});

