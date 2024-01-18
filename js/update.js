const name = document.getElementById("name");
const price = document.getElementById("price");
const category = document.getElementById("category");
const description = document.getElementById("description");
const button = document.getElementById("button");
const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", function () {
  let id;
  if (window.location.href.search("id=") > 0) {
    id = window.location.href.substring(window.location.href.search("id=") + 3);
  }

  if (id) {
    fetch(`https://auth-rg69.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          name.value = data.name;
          category.value = data.category_id;
          price.value = data.price;
          description.value = data.description;
        }
      })
      .catch((err) => {
        window.location.assign("http://127.0.0.1:5500/pages/admin.html");
      });
  } else {
    window.location.assign("http://127.0.0.1:5500/pages/admin.html");
  }
});

button &&
  button.addEventListener("click", function () {
    let phone = {
      name: name.value,
      price: price.value,
      description: description.value,
      status: "active",
      category_id: category.value,
    };
  });
