export default function generateCart(cartItems, cart) {
  if (cartItems.length === 0) {
    cart.innerHTML = `<h2>Your cart is empty</h2>`;
    return;
  }

  cart.innerHTML = ""; // clear cart before re-render

  // Render each item
  cartItems.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.className = "item-card";

    itemCard.innerHTML = `
      <div class="cart-item--container">
        <div class="cart-details">
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div class="cart-functions">
          <button class="decrement-btn">-</button>
          <span class="item-qty">${item.quantity}</span>
          <button class="increment-btn">+</button>
        </div>
      </div>
    `;

    // increment
    itemCard.querySelector(".increment-btn").addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      generateCart(cartItems, cart);
    });

    // decrement
    itemCard.querySelector(".decrement-btn").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        const index = cartItems.findIndex((p) => p.id === item.id);
        cartItems.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
      generateCart(cartItems, cart);
    });

    cart.appendChild(itemCard);
  });

  // === INVOICE SECTION ===
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 499 ? 0 : 50;
  const grandTotal = subtotal + tax + shipping;

  const invoiceElement = document.createElement("div");
  invoiceElement.className = "invoice";

  invoiceElement.innerHTML = `
        <hr />
    <h2>Invoice</h2>
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>Tax (10%): $${tax.toFixed(2)}</p>
    <p>Shipping: $${shipping.toFixed(2)}</p>
    <h3>Grand Total: $${grandTotal.toFixed(2)}</h3>
    <button id="checkout-btn">Proceed to Checkout</button>
    <button id="print-btn">Print Invoice</button>
    `;

  cart.appendChild(invoiceElement);

  // Checkout handler
  document.getElementById("checkout-btn").addEventListener("click", () => {
    alert(
      "✅ Order placed successfully! (Here you can integrate real checkout)"
    );
    localStorage.clear();
    cartItems.length = 0;
    generateCart(cartItems, cart);
  });

  // Print handler
  document.getElementById("print-btn").addEventListener("click", () => {
    const invoiceHTML = `
        <h2>Invoice</h2>
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>Tax (10%): $${tax.toFixed(2)}</p>
    <p>Shipping: $${shipping.toFixed(2)}</p>
    <h3>Grand Total: $${grandTotal.toFixed(2)}</h3>
      `;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2, h3 { margin-bottom: 0.5rem; }
            p { margin: 0.25rem 0; }
            hr { margin: 1rem 0; }
          </style>
        </head>
        <body>
          ${invoiceHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  });
}
// localStorage.clear();
