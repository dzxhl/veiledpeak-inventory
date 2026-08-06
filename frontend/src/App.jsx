import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
const [sku, setSku] = useState("");
const [name, setName] = useState("");
const [cost, setCost] = useState("");
const [price, setPrice] = useState("");
const [quantity, setQuantity] = useState("");
const [location, setLocation] = useState("");
const [notes, setNotes] = useState("");
  useEffect(() => {
    loadProducts();
  }, []);
function addProduct() {
  axios
    .post("http://127.0.0.1:8000/products", {
      sku,
      name,
      cost: Number(cost),
      price: Number(price),
      quantity: Number(quantity),
      location,
      notes,
    })
    .then(() => {
      loadProducts();

      setSku("");
      setName("");
      setCost("");
      setPrice("");
      setQuantity("");
      setLocation("");
      setNotes("");
    })
    .catch((error) => {
      console.error(error);
    });
}
  function loadProducts() {
    axios
      .get("http://127.0.0.1:8000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>VeiledPeak Inventory</h1>

      <hr />

      <h2>Products</h2>

      <div style={{ marginBottom: "20px" }}>
  <input
    placeholder="SKU"
    value={sku}
    onChange={(e) => setSku(e.target.value)}
  />

  <input
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <input
    placeholder="Cost"
    value={cost}
    onChange={(e) => setCost(e.target.value)}
  />

  <input
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
  />

  <input
    placeholder="Quantity"
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
  />

  <input
    placeholder="Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
  />

  <input
    placeholder="Notes"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
  />

  <button onClick={addProduct}>Add Product</button>
</div>

      <br />
      <br />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;