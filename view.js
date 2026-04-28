alert("JS LOADED");
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const count = document.getElementById("count");

  const parts = [
    { id: 1, name: "Oil Filter", category: "Engine", price: 9.99, stock: 20 },
    { id: 2, name: "Brake Pads", category: "Brakes", price: 49.99, stock: 12 },
    { id: 3, name: "Air Filter", category: "Engine", price: 19.99, stock: 30 },
    { id: 4, name: "Headlights", category: "Lighting", price: 79.99, stock: 6 },
    { id: 5, name: "Spark Plugs", category: "Engine", price: 39.99, stock: 18 }
  ];

  output.innerHTML = "";

  parts.forEach(p => {
    output.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>$${p.price}</td>
        <td>${p.stock}</td>
        <td>-</td>
      </tr>
    `;
  });

  count.innerText = "Total parts: " + parts.length;
});