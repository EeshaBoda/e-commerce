// ==========================================
// E-COMMERCE WEBSITE
// USE CASE 1
// User can select a product and add it
// to the shopping cart.
// ==========================================

console.log("JavaScript is working!");

// ==========================================
// PRODUCTS
// ==========================================

const products = [
{
id:1,
name:"Running Shoes",
price:1499,
image:"https://one8.com/cdn/shop/files/V10015001_03_6d97ac06-93e4-46c0-b7ee-12a9ae14bd22.jpg?v=1781597662"
},
{
id:2,
name:"Smart Watch",
price:2499,
image:"https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw56274f50/images/Fastrack/Catalog/3300NM01_1.jpg?sw=600&sh=600"
},
{
id:3,
name:"Headphones",
price:999,
image:"https://m.media-amazon.com/images/I/512sO2L0k6L.jpg"
},
{
id:4,
name:"Travel Bag",
price:1299,
image:"https://americantourister.in/cdn/shop/files/0A5A9129.jpg?crop=center&height=4100&v=1751551434&width=4100"
},
{
id:5,
name:"Denim Jacket",
price:1799,
category:"Clothing",
image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
},
{
id:6,
name:"Wireless Headphones",
price:2499,
category:"Electronics",
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
},
{
id:7,
name:"Smart Watch Pro",
price:1999,
category:"Electronics",
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
},
{
id:8,
name:"Casual Sneakers",
price:1499,
category:"Shoes",
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
},
{
id:9,
name:"Leather Handbag",
price:1299,
category:"Accessories",
image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
},
{
id:10,
name:"Sunglasses",
price:799,
category:"Accessories",
image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
},
{
id:11,
name:"Backpack",
price:999,
category:"Bags",
image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
},
{
id:12,
name:"Cotton Hoodie",
price:1199,
category:"Clothing",
image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
},
{
id:13,
name:"Bluetooth Speaker",
price:1599,
category:"Electronics",
image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
},
{
id:14,
name:"Sports Cap",
price:499,
category:"Accessories",
image:"https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500"
}
];

// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts() {

const productContainer = document.getElementById("productContainer");

if (!productContainer) {
console.error("productContainer element not found!");
return;
}

productContainer.innerHTML = "";

products.forEach(function(product) {

const productCard = document.createElement("div");

productCard.className = "product-card";

productCard.innerHTML = `
<img
src="${product.image}"
alt="${product.name}"
onerror="this.src='https://via.placeholder.com/300x250?text=Image+Not+Available'"
>

<h3>${product.name}</h3>

<p>₹${product.price.toLocaleString("en-IN")}</p>

<button onclick="addToCart(${product.id})">
Add to Cart
</button>
`;

productContainer.appendChild(productCard);

});

}

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

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

} catch (error) {

console.error(
"Error saving cart:",
error
);

}

}

// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

console.log(
"Add to cart clicked:",
productId
);

const product = products.find(function(item) {

return item.id === productId;

});

if (!product) {

console.error(
"Product not found:",
productId
);

return;

}

const existingProduct = cart.find(function(item) {

return item.id === productId;

});

if (existingProduct) {

existingProduct.quantity++;

} else {

cart.push({

id:product.id,
name:product.name,
price:product.price,
image:product.image,
quantity:1

});

}

saveCart();

updateCartCount();

console.log(
"Current cart:",
cart
);

}

// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

const cartCountElement =
document.getElementById("cartCount");

if (!cartCountElement) {

console.error(
"cartCount element not found!"
);

return;

}

let totalItems = 0;

cart.forEach(function(item) {

totalItems += item.quantity;

});

cartCountElement.textContent = totalItems;

}

// ==========================================
// OPEN CART
// ==========================================

function openCart() {

const cartModal =
document.getElementById("cartModal");

if (!cartModal) {

console.error(
"cartModal element not found!"
);

return;

}

cartModal.style.display = "block";

displayCart();

}

// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

const cartModal =
document.getElementById("cartModal");

if (!cartModal) {
return;
}

cartModal.style.display = "none";

}

// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

if (!cartItems || !cartTotal) {

console.error(
"Cart elements not found!"
);

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

const itemTotal =
item.price * item.quantity;

total += itemTotal;

const cartItem =
document.createElement("div");

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

<span>
${item.quantity}
</span>

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

cartTotal.textContent =
"₹" + total.toLocaleString("en-IN");

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

alert(
"Order placed successfully! 🎉"
);

cart = [];

saveCart();

displayCart();

updateCartCount();

}

// ==========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ==========================================

window.addEventListener(
"click",
function(event) {

const cartModal =
document.getElementById("cartModal");

if (event.target === cartModal) {

closeCart();

}

});

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
"DOMContentLoaded",
function() {

console.log(
"Page loaded successfully."
);

displayProducts();

updateCartCount();

}
);
