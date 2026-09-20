// PRODUCT DATA

const products = [

    {
        id: 1,
        name: "Classic Beige Blazer",
        category: "Women",
        price: 2499,
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        name: "Premium White Shirt",
        category: "Men",
        price: 1499,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        name: "Minimalist Watch",
        category: "Accessories",
        price: 2999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        name: "Elegant Summer Dress",
        category: "Women",
        price: 1899,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "Casual Denim Jacket",
        category: "Men",
        price: 2199,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        name: "Leather Handbag",
        category: "Accessories",
        price: 1799,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        name: "Oversized Hoodie",
        category: "Women",
        price: 1299,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        name: "Classic Sunglasses",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    }

];


// CART

let cart = [];


// DISPLAY PRODUCTS

function displayProducts(productList) {

    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        productGrid.innerHTML = "<p>No products found.</p>";

        return;

    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <span class="category-label">${product.category}</span>

                <h3>${product.name}</h3>

                <div class="price">₹${product.price.toLocaleString("en-IN")}</div>

                <button class="add-cart" data-id="${product.id}">
                    Add To Cart
                </button>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


// FILTER PRODUCTS

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const category = button.dataset.filter;

        if (category === "All") {

            displayProducts(products);

        } else {

            const filteredProducts = products.filter(
                product => product.category === category
            );

            displayProducts(filteredProducts);

        }

    });

});


// ADD TO CART

document.getElementById("productGrid").addEventListener("click", event => {

    if (event.target.classList.contains("add-cart")) {

        const productId = Number(event.target.dataset.id);

        const selectedProduct = products.find(
            product => product.id === productId
        );

        cart.push(selectedProduct);

        updateCart();

        alert("Product added to cart!");

    }

});


// UPDATE CART

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <img src="${product.image}" alt="${product.name}">

            <div>

                <h4>${product.name}</h4>

                <p>₹${product.price.toLocaleString("en-IN")}</p>

                <button class="remove-item" data-index="${index}">
                    Remove
                </button>

            </div>

        `;

        cartItems.appendChild(item);

    });

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    }

    cartCount.textContent = cart.length;

    cartTotal.textContent = total.toLocaleString("en-IN");

}


// REMOVE FROM CART

document.getElementById("cartItems").addEventListener("click", event => {

    if (event.target.classList.contains("remove-item")) {

        const index = Number(event.target.dataset.index);

        cart.splice(index, 1);

        updateCart();

    }

});


// OPEN CART

document.getElementById("cartBtn").addEventListener("click", () => {

    document.getElementById("cartSidebar").classList.add("active");

    document.getElementById("cartOverlay").classList.add("active");

});


// CLOSE CART

function closeCart() {

    document.getElementById("cartSidebar").classList.remove("active");

    document.getElementById("cartOverlay").classList.remove("active");

}

document.getElementById("closeCart").addEventListener("click", closeCart);

document.getElementById("cartOverlay").addEventListener("click", closeCart);


// SEARCH

document.getElementById("searchBtn").addEventListener("click", () => {

    document.getElementById("searchBox").classList.toggle("active");

});

document.getElementById("searchInput").addEventListener("input", event => {

    const searchTerm = event.target.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );

    displayProducts(filteredProducts);

});


// CATEGORY CLICK

document.querySelectorAll(".category-card").forEach(card => {

    card.addEventListener("click", () => {

        const category = card.dataset.category;

        const filteredProducts = products.filter(
            product => product.category === category
        );

        displayProducts(filteredProducts);

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// NEWSLETTER

document.getElementById("newsletterForm").addEventListener("submit", event => {

    event.preventDefault();

    alert("Thank you for subscribing to LUXORA!");

    event.target.reset();

});


// CHECKOUT

document.getElementById("checkoutBtn").addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

    } else {

        alert("Thank you for shopping with LUXORA!");

    }

});


// INITIAL DISPLAY

displayProducts(products);

updateCart();