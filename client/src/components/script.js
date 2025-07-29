const products = [
            { id: 1, name: "Sleek Laptop", price: 1200.00, description: "Experience blazing-fast performance and stunning visuals with our latest laptop. Perfect for work and play.", emoji: "💻", category: "Electronics" },
            { id: 2, name: "SmartPhone X", price: 899.99, description: "Capture life's moments with an incredible camera and enjoy seamless multitasking on this powerful smartphone.", emoji: "📱", category: "Electronics" },
            { id: 3, name: "Acoustic Headphones", price: 199.50, description: "Immerse yourself in crystal-clear audio with noise-cancelling technology. Designed for ultimate comfort.", emoji: "🎧", category: "Accessories" },
            { id: 4, name: "Chronos Smartwatch", price: 249.00, description: "Track your fitness, receive notifications, and stay connected on the go with this stylish smartwatch.", emoji: "⌚", category: "Wearables" },
            { id: 5, name: "The Alchemist (Book)", price: 15.99, description: "A timeless tale of following your dreams and finding your destiny. A must-read classic.", emoji: "📚", category: "Books" },
            { id: 6, name: "Casual T-shirt", price: 25.00, description: "Soft, breathable cotton t-shirt for everyday comfort. Available in multiple colors and sizes.", emoji: "👕", category: "Apparel" },
            { id: 7, name: "Designer Jeans", price: 75.00, description: "Stylish and durable denim jeans with a modern fit. Perfect for any casual occasion.", emoji: "👖", category: "Apparel" },
            { id: 8, name: "Sporty Sneakers", price: 89.99, description: "Lightweight and comfortable sneakers designed for peak athletic performance and casual wear.", emoji: "👟", category: "Footwear" },
            { id: 9, name: "Travel Backpack", price: 59.99, description: "Spacious and durable backpack with multiple compartments, ideal for daily commutes or weekend trips.", emoji: "🎒", category: "Bags" },
            { id: 10, name: "Ceramic Coffee Mug", price: 12.00, description: "Enjoy your favorite hot beverages in this elegant and sturdy ceramic mug. Dishwasher safe.", emoji: "☕", category: "Home Goods" },
            { id: 11, name: "Gaming Controller", price: 60.00, description: "Experience immersive gaming with precise controls and ergonomic design. Compatible with multiple platforms.", emoji: "🎮", category: "Gaming" },
            { id: 12, name: "Gourmet Pizza (Novelty)", price: 18.50, description: "A delicious, cheesy, and fully loaded novelty pizza. (For display purposes, not edible!)", emoji: "🍕", category: "Novelties" },
            { id: 13, name: "Modern Sofa", price: 850.00, description: "Comfortable and stylish sofa, perfect for your living room. Adds a touch of modern elegance.", emoji: "🛋️", category: "Furniture" },
            { id: 14, name: "Smart LED Lightbulb", price: 10.99, description: "Control your lighting with your smartphone. Energy-efficient and long-lasting smart bulb.", emoji: "💡", category: "Smart Home" },
            { id: 15, name: "Collapsible Laundry Basket", price: 22.00, description: "A space-saving and durable laundry basket, perfect for organizing your home.", emoji: "🧺", category: "Home Goods" },
            { id: 16, name: "Premium Pen Set", price: 30.00, description: "Smooth writing experience with a beautifully crafted pen set. Ideal for gifting.", emoji: "🖊️", category: "Office Supplies" },
            { id: 17, name: "Stylish Keychain", price: 8.99, description: "Keep your keys secure and stylish with this unique and durable keychain.", emoji: "🔑", category: "Accessories" },
            { id: 18, name: "Mountain Bicycle", price: 450.00, description: "Explore the outdoors with this robust mountain bike. Designed for trails and urban commutes.", emoji: "🚲", category: "Sports" },
            { id: 19, name: "Acoustic Guitar", price: 299.00, description: "Learn to play your favorite tunes with this high-quality acoustic guitar. Perfect for beginners and pros.", emoji: "🎸", category: "Musical Instruments" },
            { id: 20, name: "Fluffy Teddy Bear", price: 35.00, description: "A cuddly and adorable teddy bear, perfect for kids and collectors alike. Super soft!", emoji: "�", category: "Toys" }
        ];

        const categories = [...new Set(products.map(p => p.category))];
        categories.sort();

        const productGrid = document.getElementById('productGrid');
        const productModal = document.getElementById('productModal');
        const modalProductEmoji = document.getElementById('modalProductEmoji');
        const modalProductName = document.getElementById('modalProductName');
        const modalProductPrice = document.getElementById('modalProductPrice');
        const modalProductDescription = document.getElementById('modalProductDescription');
        const productQuantityInput = document.getElementById('productQuantity');
        const searchInput = document.getElementById('searchInput');
        const toastNotification = document.getElementById('toastNotification');

        const categoriesMenu = document.getElementById('categoriesMenu');
        const categoriesList = document.getElementById('categoriesList');
        const cartMenu = document.getElementById('cartMenu');
        const ordersMenu = document.getElementById('ordersMenu');
        const cartNavLink = document.getElementById('cartNavLink');
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        const cartTotalSpan = document.getElementById('cartTotal');
        const emptyCartMessage = document.getElementById('emptyCartMessage');
        const ordersContainer = document.getElementById('ordersContainer');
        const emptyOrdersMessage = document.getElementById('emptyOrdersMessage');
        const sortSelect = document.getElementById('sortSelect');
        const authNavLink = document.getElementById('authNavLink');
        const authMenu = document.getElementById('authMenu');
        const signInRegisterForm = document.getElementById('signInRegisterForm');
        const userGreeting = document.getElementById('userGreeting');
        const loggedInUserGreeting = document.getElementById('loggedInUserGreeting');
        const authUsernameInput = document.getElementById('authUsername');
        const authPasswordInput = document.getElementById('authPassword');


        let currentProductInModal = null;
        let cartItems = JSON.parse(localStorage.getItem('shopsphereCartItems')) || [];
        let loggedInUser = JSON.parse(localStorage.getItem('shopsphereLoggedInUser')) || null;
        let allUsers = JSON.parse(localStorage.getItem('shopsphereAllUsers')) || {};
        let orders = JSON.parse(localStorage.getItem('shopsphereOrders')) || [];
        let currentFilterCategory = null;
        let currentSortOption = 'default';

        function displayProducts(filteredAndSortedProducts = products) {
            productGrid.innerHTML = '';
            if (filteredAndSortedProducts.length === 0) {
                productGrid.innerHTML = '<p class="text-xl text-gray-600 col-span-full text-center">No products found matching your search.</p>';
                return;
            }

            filteredAndSortedProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-between text-center border border-gray-200 hover:border-blue-400';
                productCard.innerHTML = `
                    <p class="product-emoji mb-4">${product.emoji}</p>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">${product.name}</h3>
                    <p class="text-2xl font-bold text-blue-600 mb-4">$${product.price.toFixed(2)}</p>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full">
                        View Details
                    </button>
                `;
                productCard.querySelector('button').onclick = () => openModal(product);
                productGrid.appendChild(productCard);
            });
        }

        function openModal(product) {
            currentProductInModal = product;
            modalProductEmoji.textContent = product.emoji;
            modalProductName.textContent = product.name;
            modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
            modalProductDescription.textContent = product.description;
            productQuantityInput.value = 1;
            productModal.classList.add('open');
            productModal.style.display = 'flex';
            closeAllPopups();
        }

        function closeModal() {
            productModal.classList.remove('open');
            setTimeout(() => {
                productModal.style.display = 'none';
                currentProductInModal = null;
            }, 300);
        }

        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            let filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );

            if (currentFilterCategory && currentFilterCategory !== 'All') {
                filtered = filtered.filter(product => product.category === currentFilterCategory);
            }

            applySorting(filtered);
        }

        function filterByCategory(category) {
            currentFilterCategory = category;
            searchInput.value = '';
            let filtered = products;
            if (category !== 'All') {
                filtered = products.filter(product => product.category === category);
            }
            applySorting(filtered);
            closeAllPopups();
        }

        function sortProducts() {
            currentSortOption = sortSelect.value;
            let sortedProducts = [...products];

            const searchTerm = searchInput.value.toLowerCase();
            sortedProducts = sortedProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            if (currentFilterCategory && currentFilterCategory !== 'All') {
                sortedProducts = sortedProducts.filter(product => product.category === currentFilterCategory);
            }


            switch (currentSortOption) {
                case 'priceAsc':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'priceDesc':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'nameAsc':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'nameDesc':
                    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'default':
                default:
                    sortedProducts.sort((a, b) => a.id - b.id);
                    break;
            }
            displayProducts(sortedProducts);
        }

        function applySorting(productsToDisplay) {
            const tempSortOption = sortSelect.value;
            let sortedProducts = [...productsToDisplay];

            switch (tempSortOption) {
                case 'priceAsc':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'priceDesc':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'nameAsc':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'nameDesc':
                    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'default':
                default:
                    sortedProducts.sort((a, b) => a.id - b.id);
                    break;
            }
            displayProducts(sortedProducts);
        }

        function showToast(message) {
            toastNotification.textContent = message;
            toastNotification.classList.add('show');
            setTimeout(() => {
                toastNotification.classList.remove('show');
            }, 2000);
        }

        function addToCartFromModal() {
            if (currentProductInModal) {
                const quantity = parseInt(productQuantityInput.value, 10);
                if (isNaN(quantity) || quantity <= 0) {
                    showToast('Please enter a valid quantity.');
                    return;
                }

                const existingItemIndex = cartItems.findIndex(item => item.product.id === currentProductInModal.id);

                if (existingItemIndex > -1) {
                    cartItems[existingItemIndex].quantity += quantity;
                } else {
                    cartItems.push({ product: currentProductInModal, quantity: quantity });
                }
                localStorage.setItem('shopsphereCartItems', JSON.stringify(cartItems));
                updateCartDisplay();
                showToast(`${quantity}x ${currentProductInModal.name} added to cart!`);
                closeModal();
            }
        }

        function removeFromCart(productId) {
            cartItems = cartItems.filter(item => item.product.id !== productId);
            localStorage.setItem('shopsphereCartItems', JSON.stringify(cartItems));
            updateCartDisplay();
            showToast('Item removed from cart.');
        }

        function updateCartDisplay() {
            cartItemsContainer.innerHTML = '';
            let total = 0;

            if (cartItems.length === 0) {
                emptyCartMessage.style.display = 'block';
            } else {
                emptyCartMessage.style.display = 'none';
                cartItems.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0';
                    itemDiv.innerHTML = `
                        <div class="flex-grow">
                            <p class="font-medium text-gray-800">${item.product.emoji} ${item.product.name}</p>
                            <p class="text-sm text-gray-600">Qty: ${item.quantity} x $${item.product.price.toFixed(2)}</p>
                        </div>
                        <button onclick="removeFromCart(${item.product.id})" class="ml-4 text-red-500 hover:text-red-700 text-sm font-semibold">
                            Remove
                        </button>
                    `;
                    cartItemsContainer.appendChild(itemDiv);
                    total += item.product.price * item.quantity;
                });
            }
            cartTotalSpan.textContent = `$${total.toFixed(2)}`;
            cartNavLink.textContent = `Cart (${cartItems.length})`;
        }

        function proceedToCheckout() {
            if (cartItems.length === 0) {
                showToast('Your cart is empty. Add items before checking out.');
                return;
            }
            if (!loggedInUser) {
                showToast('Please sign in to proceed to checkout.');
                closeAllPopups();
                authMenu.classList.add('open');
                return;
            }

            const newOrder = {
                id: Date.now(),
                userId: loggedInUser.username,
                items: JSON.parse(JSON.stringify(cartItems)),
                total: cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2),
                date: new Date().toLocaleString()
            };

            orders.push(newOrder);
            localStorage.setItem('shopsphereOrders', JSON.stringify(orders));

            cartItems = [];
            localStorage.setItem('shopsphereCartItems', JSON.stringify(cartItems));

            updateCartDisplay();
            updateOrdersDisplay();
            closeAllPopups();
            showToast('Order placed successfully!');
        }

        function updateOrdersDisplay() {
            ordersContainer.innerHTML = '';
            const userOrders = orders.filter(order => order.userId === loggedInUser?.username);

            if (userOrders.length === 0) {
                emptyOrdersMessage.style.display = 'block';
            } else {
                emptyOrdersMessage.style.display = 'none';
                userOrders.sort((a, b) => b.id - a.id);
                userOrders.forEach(order => {
                    const orderDiv = document.createElement('div');
                    orderDiv.className = 'border border-gray-200 rounded-md p-3 mb-3 bg-gray-50';
                    orderDiv.innerHTML = `
                        <p class="font-semibold text-gray-800">Order #${order.id}</p>
                        <p class="text-sm text-gray-600">Date: ${order.date}</p>
                        <ul class="list-disc list-inside text-sm text-gray-700 mt-2">
                            ${order.items.map(item => `<li>${item.product.emoji} ${item.product.name} (Qty: ${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}</li>`).join('')}
                        </ul>
                        <p class="font-bold text-gray-900 mt-2">Total: $${order.total}</p>
                    `;
                    ordersContainer.appendChild(orderDiv);
                });
            }
        }

        function closeAllPopups() {
            categoriesMenu.classList.remove('open');
            cartMenu.classList.remove('open');
            ordersMenu.classList.remove('open');
            authMenu.classList.remove('open');
        }

        function toggleCategoriesMenu(event) {
            event.preventDefault();
            event.stopPropagation();
            closeAllPopups();
            categoriesMenu.classList.toggle('open');
        }

        function toggleCartMenu(event) {
            event.preventDefault();
            event.stopPropagation();
            closeAllPopups();
            cartMenu.classList.toggle('open');
            updateCartDisplay();
        }

        function toggleOrdersMenu(event) {
            event.preventDefault();
            event.stopPropagation();
            closeAllPopups();
            ordersMenu.classList.toggle('open');
            updateOrdersDisplay();
        }

        function toggleAuth(event) {
            event.preventDefault();
            event.stopPropagation();
            closeAllPopups();
            authMenu.classList.toggle('open');
            updateAuthDisplay();
        }

        function updateAuthDisplay() {
            if (loggedInUser) {
                authNavLink.textContent = `Hello, ${loggedInUser.username}`;
                signInRegisterForm.style.display = 'none';
                userGreeting.style.display = 'block';
                loggedInUserGreeting.textContent = `Welcome, ${loggedInUser.username}!`;
            } else {
                authNavLink.textContent = 'Sign In';
                signInRegisterForm.style.display = 'block';
                userGreeting.style.display = 'none';
                authUsernameInput.value = '';
                authPasswordInput.value = '';
            }
        }

        function signIn() {
            const username = authUsernameInput.value.trim();
            const password = authPasswordInput.value.trim();

            if (!username || !password) {
                showToast('Please enter both username and password.');
                return;
            }

            if (allUsers[username] && allUsers[username] === password) {
                loggedInUser = { username: username };
                localStorage.setItem('shopsphereLoggedInUser', JSON.stringify(loggedInUser));
                updateAuthDisplay();
                closeAllPopups();
                showToast(`Welcome back, ${username}!`);
            } else {
                showToast('Invalid username or password.');
            }
        }

        function register() {
            const username = authUsernameInput.value.trim();
            const password = authPasswordInput.value.trim();

            if (!username || !password) {
                showToast('Please enter both username and password.');
                return;
            }
            if (allUsers[username]) {
                showToast('Username already exists. Please choose a different one.');
                return;
            }

            allUsers[username] = password;
            localStorage.setItem('shopsphereAllUsers', JSON.stringify(allUsers));
            loggedInUser = { username: username };
            localStorage.setItem('shopsphereLoggedInUser', JSON.stringify(loggedInUser));
            updateAuthDisplay();
            closeAllPopups();
            showToast(`Registration successful! Welcome, ${username}!`);
        }

        function signOut() {
            loggedInUser = null;
            localStorage.removeItem('shopsphereLoggedInUser');
            updateAuthDisplay();
            closeAllPopups();
            showToast('You have been signed out.');
        }

        document.addEventListener('click', (event) => {
            const isClickInsideCategories = categoriesMenu.contains(event.target) || event.target.closest('.nav-link-wrapper')?.contains(categoriesMenu) && event.target.closest('.nav-link')?.textContent.includes('Categories');
            const isClickInsideCart = cartMenu.contains(event.target) || event.target.closest('.nav-link-wrapper')?.contains(cartMenu) && event.target.closest('.nav-link')?.textContent.includes('Cart');
            const isClickInsideOrders = ordersMenu.contains(event.target) || event.target.closest('.nav-link-wrapper')?.contains(ordersMenu) && event.target.closest('.nav-link')?.textContent.includes('Your Orders');
            const isClickInsideAuth = authMenu.contains(event.target) || event.target.closest('.nav-link-wrapper')?.contains(authMenu) && (event.target.closest('.nav-link')?.textContent.includes('Sign In') || event.target.closest('.nav-link')?.textContent.includes('Hello,'));


            if (!isClickInsideCategories) {
                categoriesMenu.classList.remove('open');
            }
            if (!isClickInsideCart) {
                cartMenu.classList.remove('open');
            }
            if (!isClickInsideOrders) {
                ordersMenu.classList.remove('open');
            }
            if (!isClickInsideAuth) {
                authMenu.classList.remove('open');
            }

            if (event.target === productModal) {
                closeModal();
            }
        });

        function populateCategoriesMenu() {
            const allCategoriesLi = document.createElement('li');
            allCategoriesLi.className = 'py-1 text-gray-700 hover:text-blue-600 cursor-pointer';
            allCategoriesLi.textContent = 'All Products';
            allCategoriesLi.onclick = () => filterByCategory('All');
            categoriesList.appendChild(allCategoriesLi);

            categories.forEach(category => {
                const li = document.createElement('li');
                li.className = 'py-1 text-gray-700 hover:text-blue-600 cursor-pointer';
                li.textContent = category;
                li.onclick = () => filterByCategory(category);
                categoriesList.appendChild(li);
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            populateCategoriesMenu();
            filterProducts();
            updateCartDisplay();
            updateAuthDisplay();
            updateOrdersDisplay();
        });