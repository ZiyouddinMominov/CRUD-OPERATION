const wrapper = document.getElementById("wrapper");

function createHtml(data) {
  return `
        <h3 class = "text-white">${data.name}</h3>
        <h3 class = "text-white">${data.price}</h3>
        <p class = "text-white">${data.description}</p>
        <p class = "text-white">${data.category_id}</p>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
  let elId = window.location.href.substring(
    window.location.href.search("id=") + 3
  );
  console.log(elId);
  if (elId && elId.length == 36) {
    fetch(`https://auth-rg69.onrender.com/api/products/${elId}`)
      .then((res) => res.json())
      .then((data) => {
        let block = createHtml(data);
        wrapper.innerHTML = block;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    window.location.assign("http://127.0.0.1:5500/index.html");
  }
});
