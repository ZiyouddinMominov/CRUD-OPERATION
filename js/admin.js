// FUNCTIONS JSDAN IMPORT QILISH
import { createRowTable } from "./functions.js";
// HTML FAYLDAN KERAKLI ELEMENTLARNI ID ORQALI CHAQIRISH
const tbody = document.getElementById("tbody");
const name = document.getElementById("name");
const price = document.getElementById("price");
const category = document.getElementById("category");
const description = document.getElementById("description");
const button = document.getElementById("button");
const form = document.getElementById("form");
let backDataLength = 0;
// EKRAN REFRESH BO'LGANDA BO'LADIGAN HODISALAR
document.addEventListener("DOMContentLoaded", function () {
  // FETCH START
  fetch("https://auth-rg69.onrender.com/api/products/all", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length) {
        backDataLength = data.length;
        data.forEach((phone, num) => {
          let tr = createRowTable(phone, num + 1);
          tbody.innerHTML += tr;
        });
        // FETCH END
        // DELETE BUTTONNI OLISH
        const deleteButton = document.querySelectorAll("td i.bi-archive");
        deleteButton.length &&
          deleteButton.forEach((del) => {
            del.addEventListener("click", function () {
              let isDelete = confirm("Rostdan ham ochirmoqchimisiz?");
              if (isDelete) {
                let deleteId = this.parentNode.getAttribute("data-id");
                if (deleteId) {
                  fetch(
                    `https://auth-rg69.onrender.com/api/products/${deleteId}`,
                    {
                      method: "DELETE",
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.message) {
                        window.location.reload();
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }
            });
          });

        const editButton = document.querySelectorAll("td i.bi-pen-fill");
        editButton.length &&
          editButton.forEach((edit) => {
            edit.addEventListener("click", function () {
              let editId = this.parentNode.getAttribute("data-id");
              if (edit) {
                window.location.assign(
                  `http://127.0.0.1:5500/pages/update.html?id=${editId}`
                );
              }
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
// VALIDATE FUNCTION START
function validate() {
  if (!name.value) {
    alert("Nom kiritilishi shart");
    name.focus();
    return false;
  }
  if (!price.value) {
    alert("Narx kiritilishi shart");
    price.focus();
    return false;
  }
  if (!category.value) {
    alert("Kategoriya kiritilishi shart");
    category.focus();
    return false;
  }
  if (price.value <= 0) {
    alert("Narxni bunday kiritish mumkin emas");
    category.focus();
    return false;
  }
  return true;
}
// VALIDATE FUNCTION END
// BUTTON BOSILISHI START
button &&
  button.addEventListener("click", function (e) {
    e.preventDefault();
    if (validate(name, price, category, description)) {
      let phone = {
        name: name.value,
        price: price.value,
        description: description.value,
        status: "active",
        category_id: category.value,
      };

      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(phone),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            let tr = createRowTable(data, backDataLength + 1);
            backDataLength++;
            tbody.innerHTML += tr;
          }
          form.reset();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(`Validatsiadan o'tmadi`);
    }
  });
// BUTTON BOSILISHI END
