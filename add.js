function addPart() {
  const part = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    stock_quantity: document.getElementById("stock").value
  };

  fetch("http://localhost:5000/api/v1/car_parts", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(part)
  })
  .then(res => res.json())
  .then(data => {
    alert("Record has been saved.");
  });
}