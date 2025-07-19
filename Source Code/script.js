// Mobile Menu Toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Cart Functionality
        const cartButton = document.getElementById('cart-button');
        const cartPopup = document.getElementById('cart-popup');
        const closeCart = document.getElementById('close-cart');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.getElementById('cart-count');
        
        let cart = [];
        
        cartButton.addEventListener('click', () => {
            cartPopup.classList.remove('hidden');
        });
        
        closeCart.addEventListener('click', () => {
            cartPopup.classList.add('hidden');
        });
        
        // Add to Cart functionality
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.text-green-600').textContent;
                
                // Add item to cart
                cart.push({
                    name: productName,
                    price: parseFloat(productPrice.replace('$', ''))
                });
                
                // Update cart count
                cartCount.textContent = cart.length;
                
                // Update cart display
                updateCartDisplay();
                
                // Show feedback
                const oldText = button.textContent;
                button.textContent = 'Added!';
                setTimeout(() => {
                    button.textContent = oldText;
                }, 2000);
            });
        });
        
        function updateCartDisplay() {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="text-center py-10">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p class="mt-4 text-gray-500">Your cart is empty</p>
                    </div>
                `;
                cartTotal.textContent = '$0.00';
                return;
            }
            
            let total = 0;
            let itemsHTML = '';
            
            cart.forEach(item => {
                total += item.price;
                itemsHTML += `
                    <div class="flex justify-between items-center py-3 border-b">
                        <div>
                            <p class="font-medium">${item.name}</p>
                            <p class="text-sm text-gray-500">1 x $${item.price.toFixed(2)}</p>
                        </div>
                        <button class="remove-item text-red-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                `;
            });
            
            cartItemsContainer.innerHTML = itemsHTML;
            cartTotal.textContent = `$${total.toFixed(2)}`;
            
            // Add event listeners to remove buttons
            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    cart.splice(index, 1);
                    cartCount.textContent = cart.length;
                    updateCartDisplay();
                });
            });
        }
