fetch("http://localhost:5000/api/v1/categories")
  .then(res => res.json())
  .then(data => {
    const dropdown = document.getElementById("categoryDrop");

    data.forEach(row => {
      let opt = document.createElement("option");
      opt.value = row.category;
      opt.textContent = row.category;
      dropdown.appendChild(opt);
    });
  });

document.getElementById("categoryDrop").addEventListener("change", () => {
  let category = document.getElementById("categoryDrop").value;

  fetch(`http://localhost:5000/api/v1/car_parts/category/${category}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("id").value = data.id;
      document.getElementById("name").value = data.name;
      document.getElementById("price").value = data.price;
      document.getElementById("stock").value = data.stock_quantity;
    });
});

function updatePart() {
  let id = document.getElementById("id").value;

  let updated = {
    name: document.getElementById("name").value,
    category: document.getElementById("categoryDrop").value,
    price: document.getElementById("price").value,
    stock_quantity: document.getElementById("stock").value
  };

  fetch(`http://localhost:5000/api/v1/car_parts/${id}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(updated)
  })
  .then(res => res.json())
  .then(data => {
    alert("Record updated!");
  });
}