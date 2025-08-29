// IMPORTS
import generateCart from "./cart.js";

// PRODUCTS
const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 120,
    image:
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/lddanijntooidcnakfzc/NIKE+AIR+MAX+EXCEE.png",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 150,
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/603054f90779462f92ccbc56321755e9_9366/Ultraboost_Light_Shoes_Black_GY9351.jpg",
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 100,
    image:
      "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/AUGUST/27/AAlRHZxG_c0f23736475042f9b977fffac45c0c86.jpg",
  },
  {
    id: 4,
    name: "Converse Chuck 70",
    price: 80,
    image:
      "https://www.converse.in/media/catalog/product/1/6/162058c_l_107x182.jpg",
  },
  {
    id: 5,
    name: "New Balance 550",
    price: 110,
    image:
      "https://www.sneakerjagers.com/_next/image?url=https%3A%2F%2Fblog.sneakerjagers.com%2Fwp-content%2Fuploads%2F2021%2F10%2FUnbenannt-1-1.jpg&w=3840&q=100",
  },
  {
    id: 6,
    name: "Jordan 1 Retro",
    price: 200,
    image:
      "https://www.superkicks.in/cdn/shop/files/5_122e1f88-6d06-4b00-988b-ed937512e03a.png?v=1753874819&width=533",
  },
];

// VARIABLES
const listingElement = document.getElementById("listing");
const cart = document.getElementById("cart");
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Default empty cart text
cart.innerHTML = `<h2>Your cart is empty</h2>`;

// Render products
products.forEach((product) => {
  const card = document.createElement("article");
  card.className = "product-card";

  card.innerHTML = `
     <img src="${product.image}" alt="${product.name}" />
        <div class="product-details">
          <h3>${product.name}</h3>
          <span>$${product.price.toFixed(2)}</span>
        </div>
        <button class="add-btn">Add to cart</button>
  `;

  card.querySelector(".add-btn").addEventListener("click", () => {
    const currentItem = cartItems.find((p) => p.id === product.id);

    if (currentItem) {
      currentItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    cart.innerHTML = ``;
    generateCart(cartItems, cart);
  });
  listingElement.appendChild(card);
});

// Initial render
generateCart(cartItems, cart);
