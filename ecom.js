// ==========================================
// E-COMMERCE WEBSITE
// USE CASE 1
// User can select a product and add it
// to the shopping cart.
// ==========================================

// ==========================================
// TEST JAVASCRIPT CONNECTION
// ==========================================

console.log("JavaScript is working!");

// ==========================================
// PRODUCTS
// ==========================================

const products = [
{
id: 1,
name: "Running Shoes",
price: 1499,
image: "https://one8.com/cdn/shop/files/V10015001_03_6d97ac06-93e4-46c0-b7ee-12a9ae14bd22.jpg?v=1781597662"
},
{
id: 2,
name: "Smart Watch",
price: 2499,
image: "https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw56274f50/images/Fastrack/Catalog/3300NM01_1.jpg?sw=600&sh=600"
},
{
id: 3,
name: "Headphones",
price: 999,
image: "https://m.media-amazon.com/images/I/512sO2L0k6L.jpg"
},
{
id: 4,
name: "Travel Bag",
price: 1299,
image: "https://americantourister.in/cdn/shop/files/0A5A9129.jpg?crop=center&height=4100&v=1751551434&width=4100"
}
];

// ==========================================
// LOAD CART FROM LOCAL STORAGE
// ==========================================

let cart = [];

try {
const savedCart = localStorage.getItem("cart");

if (savedCart) {
cart = JSON.parse(savedCart);
}
} catch (error) {
console.error("Error loading cart:", error);
cart = [];
}

// ==========================================
// SAVE CART
// ==========================================

function saveCart() {
try {
localStorage.setItem("cart", JSON.stringify(cart));
} catch (error) {
console.error("Error saving cart:", error);
}
}

// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {
console.log("Add to cart clicked:", productId);

const product = products.find(function(item) {
return item.id === productId;
});

if (!product) {
console.error("Product not found:", productId);
return;
}

const existingProduct = cart.find(function(item) {
return item.id === productId;
});

if (existingProduct) {
existingProduct.quantity++;
} else {
cart.push({
id: product.id,
name: product.name,
price: product.price,
image: product.image,
quantity: 1
});
}

saveCart();
updateCartCount();

// alert(product.name + " has been added to your cart!");

console.log("Current cart:", cart);
}

// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {
const cartCountElement = document.getElementById("cartCount");

if (!cartCountElement) {
console.error("cartCount element not found!");
return;
}

let totalItems = 0;

cart.forEach(function(item) {
totalItems += item.quantity;
});

cartCountElement.textContent = totalItems;

console.log("Cart count:", totalItems);
}

// ==========================================
// OPEN CART
// ==========================================

function openCart() {
const cartModal = document.getElementById("cartModal");

if (!cartModal) {
console.error("cartModal element not found!");
return;
}

cartModal.style.display = "block";
displayCart();
}

// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {
const cartModal = document.getElementById("cartModal");

if (!cartModal) {
return;
}

cartModal.style.display = "none";
}

// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

if (!cartItems || !cartTotal) {
console.error("Cart elements not found!");
return;
}

cartItems.innerHTML = "";

if (cart.length === 0) {
cartItems.innerHTML = `
<div class="empty-cart">
Your cart is empty 🛒
</div>
`;

cartTotal.textContent = "₹0";
return;
}

let total = 0;

cart.forEach(function(item) {
const itemTotal = item.price * item.quantity;

total += itemTotal;

const cartItem = document.createElement("div");

cartItem.className = "cart-item";

cartItem.innerHTML = `
<img
src="${item.image}"
alt="${item.name}"
>

<div class="cart-item-info">
<h4>${item.name}</h4>

<p>
₹${item.price.toLocaleString("en-IN")}
</p>
</div>

<div class="quantity">
<button
onclick="decreaseQuantity(${item.id})">
−
</button>

<span>${item.quantity}</span>

<button
onclick="increaseQuantity(${item.id})">
+
</button>
</div>

<button
class="remove-button"
onclick="removeFromCart(${item.id})">
Remove
</button>
`;

cartItems.appendChild(cartItem);
});

cartTotal.textContent = "₹" + total.toLocaleString("en-IN");
}

// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(productId) {
const item = cart.find(function(item) {
return item.id === productId;
});

if (!item) {
return;
}

item.quantity++;

saveCart();
displayCart();
updateCartCount();
}

// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(productId) {
const item = cart.find(function(item) {
return item.id === productId;
});

if (!item) {
return;
}

if (item.quantity > 1) {
item.quantity--;
} else {
cart = cart.filter(function(item) {
return item.id !== productId;
});
}

saveCart();
displayCart();
updateCartCount();
}

// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(productId) {
cart = cart.filter(function(item) {
return item.id !== productId;
});

saveCart();
displayCart();
updateCartCount();
}

// ==========================================
// CHECKOUT
// ==========================================

function checkout() {
if (cart.length === 0) {
alert("Your cart is empty!");
return;
}

alert("Order placed successfully! 🎉");

cart = [];

saveCart();
displayCart();
updateCartCount();
}

// ==========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ==========================================

window.addEventListener("click", function(event) {
const cartModal = document.getElementById("cartModal");

if (event.target === cartModal) {
closeCart();
}
});

// ==========================================
// INITIALIZE CART
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
console.log("Page loaded successfully.");
updateCartCount();
});