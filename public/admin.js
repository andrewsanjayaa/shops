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

    const sectionName = this.innerText.trim().toLowerCase();

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

// About
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

// Get Product
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((data) => {
      const producttable = document.getElementById("producttable");
      producttable.innerHTML = "";

      data.forEach((item) => {
        const row = document.createElement("tr");
        row.className = "divide-x divide-gray-400";
        const productmodal = `product_modal_${item.id}`;

        row.innerHTML = `
          <td class="py-3 px-4 pointer-events-none">${item.id}</td>
          <td class="py-3 px-4 pointer-events-none">
            <img src="aset/${item.image}" class="h-24 mx-auto" />
          </td>
          <td class="py-3 px-4 pointer-events-none">${item.name}</td>
          <td class="py-3 px-4 pointer-events-none">${item.description}</td>
          <td class="py-3 px-4 pointer-events-none">${item.stock}</td>
          <td class="py-3 w-35">
            <div class="flex justify-center">
              <label for="${productmodal}" class="btn btn-sm bg-gray-300 text-black font-medium rounded hover:bg-gray-400 w-12 text-center items-center">Edit</label>
              <button type="button" class="btn deleteproduct-btn btn-sm bg-red-300 text-black font-medium rounded hover:bg-red-400 w-12 text-center items-center" data-id="${item.id}">Delete</button>
            </div>
            <input type="checkbox" id="${productmodal}" class="modal-toggle" />
            <div class="modal" role="dialog">
              <div class="modal-box">
                <h3 class="font-bold text-lg mb-4">Edit User</h3>
                <form method="POST" action="/api/products/update" enctype="multipart/form-data">
                  <input type="hidden" name="id" value="${item.id}">
                  <label class = "font-semibold text-black block mb-1 text-left" for "productname"> Product Name </label>
                  <input name="productname" value="${item.name}" class="w-full p-3 bg-red-100 border-none focus:outline-no" />
                  <label class = "font-semibold text-black block mb-1 text-left" for "productprice"> Price </label>
                  <input name="productprice" value="${item.stock}" class="w-full p-3 bg-red-100 border-none focus:outline-no" />
                  <label class = "font-semibold text-black block mb-1 text-left" for "productimage"> New Image </label>
                  <input name="productimage" type="file" placeholder="New Password" class="w-full p-3 bg-red-100 border-none focus:outline-no" />
                  <label class = "font-semibold text-black block mb-1 text-left" for "productdetail"> Detail </label>
                  <input name="productdetail" value="${item.description}" class="w-full p-3 bg-red-100 border-none focus:outline-no" />
                  <div class="modal-action">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <label for="${productmodal}" class="btn">Close</label>
                  </div>
                </form>
              </div>
            </div>
          </td>
        `;

        producttable.appendChild(row);
      });
    })
    .catch((err) => console.error("Gagal fetch data products:", err));
});

// Delete Product
document.addEventListener("click", async (e) => {
  if (e.target.matches(".deleteproduct-btn")) {
    const userId = e.target.dataset.id;

    if (confirm("Yakin ingin menghapus product ini?")) {
      const res = await fetch(`/api/products/delete/${userId}`, {
        method: "DELETE",
      });

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

// Select Product
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("testiproduct");
      select.innerHTML = '<option value="">Select Product</option>'; // Reset isi dulu

      data.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        select.appendChild(option);
      });
    })
    .catch((err) => console.error("Gagal fetch data users:", err));
});

// Testimonial Product
document.addEventListener("DOMContentLoaded", () => {
  fetch("/testimonials")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const testitable = document.getElementById("testimonialtable");
      testitable.innerHTML = "";

      data.forEach((test, index) => {
        const tab = document.createElement("tr");
        tab.className = "divide-x divide-gray-400";

        tab.innerHTML = `
          <td class="py-3 px-4">${test.id}</td>
          <td class="py-3 px-4">
            <img src="aset/${test.image}" class="h-24 mx-auto" />
          </td>
          <td class="py-3 px-4">${test.detail}</td>
          <td class="py-3 px-4">${test.product}</td>
          <td class="py-3 w-35" style="position: relative; z-index: 10;">
            <div class="flex justify-center gap-2" style="position: relative; z-index: 11;">
              <button 
                type="button" 
                class="edit-testimonial-btn" 
                data-id="${test.id || index}"
                data-detail="${test.detail}"
                data-product="${test.product}"
                data-image="${test.image}"
                style="
                  background-color: #d1d5db !important;
                  color: #000 !important;
                  font-weight: 500 !important;
                  padding: 8px 16px !important;
                  border-radius: 6px !important;
                  border: none !important;
                  cursor: pointer !important;
                  min-width: 60px !important;
                  position: relative !important;
                  z-index: 12 !important;
                  pointer-events: auto !important;
                  display: inline-block !important;
                  text-align: center !important;
                  transition: background-color 0.2s ease !important;
                "
                onmouseover="this.style.backgroundColor='#9ca3af'"
                onmouseout="this.style.backgroundColor='#d1d5db'"
              >
                Edit
              </button>
              <button 
                type="button" 
                class="delete-testimonial-btn"
                data-id="${test.id || index}"
                style="
                  background-color: #fca5a5 !important;
                  color: #000 !important;
                  font-weight: 500 !important;
                  padding: 8px 16px !important;
                  border-radius: 6px !important;
                  border: none !important;
                  cursor: pointer !important;
                  min-width: 60px !important;
                  position: relative !important;
                  z-index: 12 !important;
                  pointer-events: auto !important;
                  display: inline-block !important;
                  text-align: center !important;
                  transition: background-color 0.2s ease !important;
                "
                onmouseover="this.style.backgroundColor='#f87171'"
                onmouseout="this.style.backgroundColor='#fca5a5'"
              >
                Delete
              </button>
            </div>
          </td>
        `;

        testitable.appendChild(tab);
        console.log(`Row ${index} added to table`);
      });

      setTimeout(() => {
        setupEventListeners(data);
      }, 100);
    })
    .catch((err) => {
      const testitable = document.getElementById("testimonialtable");
      if (testitable) {
        testitable.innerHTML = `
          <tr>
            <td colspan="5" class="text-center py-4 text-red-500">
              Error loading testimonials: ${err.message}
            </td>
          </tr>
        `;
      }
    });

  function setupEventListeners(data) {
    console.log("Setting up event listeners...");

    const existingButtons = document.querySelectorAll(
      ".edit-testimonial-btn, .delete-testimonial-btn"
    );
    existingButtons.forEach((btn) => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
    });

    const editButtons = document.querySelectorAll(".edit-testimonial-btn");

    editButtons.forEach((button, index) => {
      console.log(`Setting up listener for edit button ${index}`);

      // Multiple event binding methods to ensure it works
      button.onclick = function (e) {
        handleEditClick(e, this, data);
      };

      button.addEventListener("click", function (e) {
        handleEditClick(e, this, data);
      });

      // Test if button is actually clickable
      button.addEventListener("mousedown", function () {
        console.log("Mouse down on edit button:", this.getAttribute("data-id"));
      });

      button.addEventListener("mouseup", function () {
        console.log("Mouse up on edit button:", this.getAttribute("data-id"));
      });
    });

    const deleteButtons = document.querySelectorAll(".delete-testimonial-btn");
    deleteButtons.forEach((button, index) => {
      button.onclick = async function (e) {
        handleDeleteClick(e, this);
      };

      button.addEventListener("click", async function (e) {
        handleDeleteClick(e, this);
      });
    });
  }

  function handleEditClick(e, button, data) {
    e.preventDefault();
    e.stopPropagation();

    console.log("=== EDIT BUTTON CLICKED ===");
    console.log("Button:", button);
    console.log("Event:", e);

    const testId = button.getAttribute("data-id");
    const testDetail = button.getAttribute("data-detail");
    const testProduct = button.getAttribute("data-product");
    const testImage = button.getAttribute("data-image");

    console.log("Button data:", { testId, testDetail, testProduct, testImage });

    const testData = {
      id: testId,
      detail: testDetail,
      product: testProduct,
      image: testImage,
    };

    console.log("Calling showEditModal with:", testData);
    showEditModal(testData);
  }

  async function handleDeleteClick(e, button) {
    e.preventDefault();
    e.stopPropagation();
    const testId = button.getAttribute("data-id");
    console.log(testId);

    if (confirm("Yakin ingin menghapus Testimoni ini?")) {
      try {
        const res = await fetch(`/testimonials/delete/${testId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          const result = await res.json();
          window.location.href =
            window.location.origin + window.location.pathname;
        } else {
          const result = await res.json();
          alert(result.message || "Gagal menghapus");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function showEditModal(testData) {
    const existingModal = document.getElementById("testimonial-edit-modal");
    if (existingModal) {
      existingModal.remove();
    }

    const modalHTML = `
      <div id="testimonial-edit-modal" style="
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background-color: rgba(0, 0, 0, 0.5) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        z-index: 99999 !important;
        pointer-events: auto !important;
      ">
        <div style="
          background: white !important;
          padding: 2rem !important;
          border-radius: 8px !important;
          width: 90% !important;
          max-width: 500px !important;
          max-height: 90vh !important;
          overflow-y: auto !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
          position: relative !important;
          z-index: 100000 !important;
        ">
          <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #111;">Edit Testimonial</h3>
          <form method="POST" action="/testimonials/update" enctype="multipart/form-data">
            <input type="hidden" name="id" value="${testData.id}">
            
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #374151;">Current Image:</label>
            <img src="aset/${
              testData.image
            }" style="width: 100px; height: 100px; object-fit: cover; margin-bottom: 1rem; border-radius: 4px;" />
            
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #374151;">New Image (optional):</label>
            <input 
              name="imagetesti" 
              type="file" 
              accept="image/*"
              style="
                width: 100%; 
                padding: 0.75rem; 
                margin-bottom: 1rem; 
                border: 2px solid #d1d5db; 
                border-radius: 6px;
                font-size: 14px;
              "
            />
            
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #374151;">Detail:</label>
            <textarea 
              name="detailtesti" 
              rows="3"
              style="
                width: 100%; 
                padding: 0.75rem; 
                margin-bottom: 1.5rem; 
                border: 2px solid #d1d5db; 
                border-radius: 6px;
                font-size: 14px;
                resize: vertical;
              "
            >${testData.detail || ""}</textarea>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
              <button 
                type="button" 
                id="close-testimonial-modal"
                style="
                  padding: 0.75rem 1.5rem; 
                  background: #6b7280; 
                  color: white; 
                  border: none; 
                  border-radius: 6px; 
                  cursor: pointer;
                  font-weight: 500;
                  transition: background-color 0.2s ease;
                "
                onmouseover="this.style.backgroundColor='#4b5563'"
                onmouseout="this.style.backgroundColor='#6b7280'"
              >
                Cancel
              </button>
              <button 
                type="submit"
                style="
                  padding: 0.75rem 1.5rem; 
                  background: #3b82f6; 
                  color: white; 
                  border: none; 
                  border-radius: 6px; 
                  cursor: pointer;
                  font-weight: 500;
                  transition: background-color 0.2s ease;
                "
                onmouseover="this.style.backgroundColor='#2563eb'"
                onmouseout="this.style.backgroundColor='#3b82f6'"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    console.log("Modal HTML added to body");

    // Add close functionality
    const closeBtn = document.getElementById("close-testimonial-modal");
    const modal = document.getElementById("testimonial-edit-modal");

    if (closeBtn) {
      closeBtn.onclick = function () {
        console.log("Close button clicked");
        modal.remove();
      };
    }

    if (modal) {
      modal.onclick = function (e) {
        if (e.target === this) {
          console.log("Modal backdrop clicked");
          this.remove();
        }
      };
    }

    console.log("Modal setup complete");
  }
});
