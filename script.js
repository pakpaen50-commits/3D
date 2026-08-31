// =========================
// BUNT 3D SHOPPING SYSTEM
// =========================

let cart = JSON.parse(localStorage.getItem("buntCart")) || [];


// =========================
// CART COUNT
// =========================

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

}


// =========================
// ADD TO CART
// =========================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        cart.push({
            name: name,
            price: price
        });

        localStorage.setItem(
            "buntCart",
            JSON.stringify(cart)
        );

        updateCartCount();

        button.textContent = "✓ Added";

        setTimeout(() => {
            button.textContent = "Add to Cart";
        }, 1000);

    });

});


// =========================
// PRODUCT FILTER
// =========================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const products =
    document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        products.forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    if (!cartItems) return;


    // ถ้าไม่มีสินค้า
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div class="empty-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    You haven't added any 3D assets yet.
                </p>

                <a href="products.html">
                    Browse Products
                </a>

            </div>
        `;

        updateCartSummary();

        return;
    }


    // แสดงสินค้า
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-left">

                <div class="cart-item-image">
                    🧊
                </div>

                <div>

                    <h3>${item.name}</h3>

                    <p>Premium 3D Asset</p>

                </div>

            </div>


            <div class="cart-item-price">

                <strong>
                    ฿${item.price.toLocaleString()}
                </strong>

                <button
                    class="remove-item"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        `;

        cartItems.appendChild(cartItem);

    });


    updateCartSummary();

}


// =========================
// REMOVE ITEM
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "buntCart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();

}


// =========================
// CART SUMMARY
// =========================

function updateCartSummary() {

    const summaryItems =
        document.getElementById("summary-items");

    const cartTotal =
        document.getElementById("cart-total");


    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );


    if (summaryItems) {
        summaryItems.textContent = cart.length;
    }


    if (cartTotal) {
        cartTotal.textContent =
            `฿${total.toLocaleString()}`;
    }

}


// =========================
// INITIALIZE
// =========================

updateCartCount();
displayCart();
// =========================
// CHECKOUT
// =========================

function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");


    if (!checkoutItems) return;


    // ไม่มีสินค้า
    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="checkout-empty">

                <p>
                    Your cart is empty.
                </p>

                <a href="products.html">
                    Browse Products
                </a>

            </div>
        `;

        checkoutTotal.textContent = "฿0";

        return;
    }


    checkoutItems.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        total += item.price;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `

            <span class="checkout-item-name">
                ${item.name}
            </span>

            <span class="checkout-item-price">
                ฿${item.price.toLocaleString()}
            </span>

        `;


        checkoutItems.appendChild(itemElement);

    });


    checkoutTotal.textContent =
        `฿${total.toLocaleString()}`;

}


// =========================
// PLACE ORDER
// =========================

const checkoutForm =
    document.getElementById("checkout-form");


if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a product first."
            );

            return;
        }


        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;


        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        let paymentName;


        if (payment === "promptpay") {
            paymentName = "PromptPay";
        }

        else if (payment === "bank") {
            paymentName = "Bank Transfer";
        }

        else {
            paymentName = "Credit / Debit Card";
        }


        alert(
            `Order completed!\n\n` +
            `Customer: ${name}\n` +
            `Email: ${email}\n` +
            `Payment: ${paymentName}`
        );


        // ล้างตะกร้า
        cart = [];

        localStorage.setItem(
            "buntCart",
            JSON.stringify(cart)
        );


        updateCartCount();


        // กลับหน้าสินค้า
        window.location.href =
            "products.html";

    });

}


displayCheckout();
// =========================
// PRODUCT DETAIL ADD CART
// =========================

const detailAddButton =
    document.querySelector(".detail-add-cart");

if (detailAddButton) {

    detailAddButton.addEventListener("click", () => {

        const name =
            detailAddButton.dataset.name;

        const price =
            Number(detailAddButton.dataset.price);


        cart.push({
            name: name,
            price: price
        });


        localStorage.setItem(
            "buntCart",
            JSON.stringify(cart)
        );


        updateCartCount();


        detailAddButton.textContent =
            "✓ Added to Cart";


        setTimeout(() => {

            detailAddButton.textContent =
                "🛒 Add to Cart";

        }, 1200);

    });

}
// =========================
// GALLERY FILTER
// =========================

const galleryFilters =
    document.querySelectorAll(".gallery-filter");

const galleryCards =
    document.querySelectorAll(".gallery-card");


galleryFilters.forEach(button => {

    button.addEventListener("click", () => {

        galleryFilters.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        const category =
            button.dataset.gallery;


        galleryCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.galleryCategory === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// =========================
// GALLERY MODAL
// =========================

const galleryModal =
    document.getElementById("gallery-modal");

const modalImage =
    document.getElementById("modal-image");

const modalTitle =
    document.getElementById("modal-title");

const modalClose =
    document.getElementById("modal-close");


galleryCards.forEach(card => {

    card.addEventListener("click", () => {

        const image =
            card.querySelector(".gallery-image")
                .textContent.trim();

        const title =
            card.dataset.title;


        modalImage.textContent = image;

        modalTitle.textContent = title;

        galleryModal.classList.add("show");

    });

});


if (modalClose) {

    modalClose.addEventListener("click", () => {

        galleryModal.classList.remove("show");

    });

}


if (galleryModal) {

    galleryModal.addEventListener("click", event => {

        if (event.target === galleryModal) {

            galleryModal.classList.remove("show");

        }

    });

}
// =========================
// CUSTOM 3D FORM
// =========================

const customForm =
    document.getElementById("custom-form");


if (customForm) {

    customForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("custom-name").value;

        const email =
            document.getElementById("custom-email").value;

        const modelType =
            document.getElementById("model-type").value;

        const budget =
            document.getElementById("budget").value;


        if (!modelType) {

            alert("Please select a model type.");

            return;

        }


        alert(
            `Project request sent!\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Model: ${modelType}\n` +
            `Budget: ${budget || "Not specified"}`
        );


        customForm.reset();

    });

}
// =========================
// CONTACT FORM
// =========================

const contactForm =
    document.getElementById("contact-form");


if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("contact-name").value;

        const subject =
            document.getElementById("contact-subject").value;


        alert(
            `Message sent successfully!\n\n` +
            `Thank you, ${name}.\n` +
            `Subject: ${subject}`
        );


        contactForm.reset();

    });

}
// =========================
// PRODUCT SEARCH
// =========================

const productSearch =
    document.getElementById("product-search");

const productCategory =
    document.getElementById("product-category");

const productSort =
    document.getElementById("product-sort");

const productsGrid =
    document.getElementById("products-grid");

const productsEmpty =
    document.getElementById("products-empty");


if (
    productSearch &&
    productCategory &&
    productSort
) {

    function filterProducts() {

        const search =
            productSearch.value
                .toLowerCase()
                .trim();

        const category =
            productCategory.value;

        const cards =
            Array.from(
                productsGrid.querySelectorAll(
                    ".product-card"
                )
            );


        let visibleProducts = cards.filter(card => {

            const name =
                card.dataset.name.toLowerCase();

            const cardCategory =
                card.dataset.category;


            const matchSearch =
                name.includes(search);

            const matchCategory =
                category === "all" ||
                cardCategory === category;


            return matchSearch &&
                   matchCategory;

        });


        // Sort
        const sort =
            productSort.value;


        if (sort === "low") {

            visibleProducts.sort(
                (a, b) =>
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
            );

        }


        if (sort === "high") {

            visibleProducts.sort(
                (a, b) =>
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
            );

        }


        if (sort === "name") {

            visibleProducts.sort(
                (a, b) =>
                    a.dataset.name.localeCompare(
                        b.dataset.name
                    )
            );

        }


        // Rebuild grid
        cards.forEach(card => {

            card.style.display = "none";

        });


        visibleProducts.forEach(card => {

            card.style.display = "block";

            productsGrid.appendChild(card);

        });


        // Empty
        if (visibleProducts.length === 0) {

            productsEmpty.style.display =
                "block";

        } else {

            productsEmpty.style.display =
                "none";

        }

    }


    productSearch.addEventListener(
        "input",
        filterProducts
    );

    productCategory.addEventListener(
        "change",
        filterProducts
    );

    productSort.addEventListener(
        "change",
        filterProducts
    );

}
