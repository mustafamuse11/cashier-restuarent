// Products data with images
const products = {
  laptop: { name: 'Laptop', price: 120000, icon: '💻' },
  mobile: { name: 'Mobile', price: 65000, icon: '📱' },
  book: { name: 'Book', price: 2500, icon: '��' },
  pen: { name: 'Pen', price: 300, icon: '🖊️' },
  bag: { name: 'Bag', price: 5500, icon: '🎒' },
  perfume: { name: 'Perfume', price: 8000, icon: '🌺' },
  flower: { name: 'Flower', price: 1200, icon: '🌹' },
  mouse: { name: 'Mouse', price: 3500, icon: '🖱️' }
};

// Cart array to store items
let cart = [];

// Add this at the top with other variables
let totalSalesBalance = 0;

// Initialize the page
function init() {
  displayProducts();
  updateCartDisplay();
}

// Display products in the grid
function displayProducts() {
  const productsDiv = document.querySelector('.products');
  productsDiv.innerHTML = Object.values(products).map(product => `
        <div class="product-item" onclick="addToCart('${Object.keys(product)[0]}')">
            <div class="product-image">${product.icon}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">Ksh ${product.price.toLocaleString()}</div>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(productId) {
  const product = products[productId];
  cart.push(product);
  updateCartDisplay();

  // Enhanced visual feedback
  const productElement = document.querySelector(`[onclick="addToCart('${productId}')"]`);
  productElement.style.transform = 'scale(0.95)';
  productElement.style.backgroundColor = '#e8f4ff';
  setTimeout(() => {
    productElement.style.transform = 'scale(1)';
    productElement.style.backgroundColor = '';
  }, 200);
}

// Update cart display
function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
            <span>${item.icon} ${item.name}</span>
            <span>Ksh ${item.price.toLocaleString()}</span>
        `;
    cartItems.appendChild(cartItem);
  });

  updateTotal();
}

// Update total amount
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('total').textContent = total.toLocaleString();
}

// Simplified checkout function with basic popup
function checkout() {
  if (cart.length === 0) {
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalSalesBalance += total;

  document.getElementById('sales-balance').textContent = totalSalesBalance.toLocaleString();

  // Show simple "Sale Completed" popup
  showModal('Sale Completed', `Ksh ${total.toLocaleString()}`);
  cart = [];
  updateCartDisplay();

  // Auto close after 1.5 seconds
  setTimeout(() => {
    closeModal();
  }, 1500);
}

// Update resetAll function to remove confirmation
function resetAll() {
  cart = [];
  totalSalesBalance = 0;
  updateCartDisplay();
  document.getElementById('sales-balance').textContent = '0';

  const balanceElement = document.querySelector('.sales-balance');
  balanceElement.style.backgroundColor = '#e74c3c';
  setTimeout(() => {
    balanceElement.style.backgroundColor = '#3498db';
  }, 300);
}

// Show modal function
function showModal(title, message) {
  const modal = document.getElementById('custom-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');

  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.style.display = 'block';
}

// Close modal function
function closeModal() {
  const modal = document.getElementById('custom-modal');
  modal.style.display = 'none';
}

// Initialize when page loads
window.onload = init;

const menuItems = {
  burger: [
    { id: 'b1', name: 'Classic Burger', price: 850, image: '🍔' },
    { id: 'b2', name: 'Cheese Burger', price: 950, image: '🍔' },
    { id: 'b3', name: 'Chicken Burger', price: 800, image: '🍔' }
  ],
  pizza: [
    { id: 'p1', name: 'Margherita Pizza', price: 1200, image: '🍕' },
    { id: 'p2', name: 'Pepperoni Pizza', price: 1400, image: '🍕' },
    { id: 'p3', name: 'BBQ Chicken Pizza', price: 1500, image: '🍕' }
  ],
  pasta: [
    { id: 'pa1', name: 'Spaghetti Bolognese', price: 750, image: '🍝' },
    { id: 'pa2', name: 'Alfredo Pasta', price: 850, image: '🍝' }
  ],
  rice: [
    { id: 'r1', name: 'Chicken Biryani', price: 650, image: '🍚' },
    { id: 'r2', name: 'Fried Rice', price: 450, image: '🍚' }
  ],
  chicken: [
    { id: 'c1', name: 'Grilled Chicken', price: 950, image: '🍗' },
    { id: 'c2', name: 'Chicken Wings', price: 750, image: '🍗' }
  ],
  fish: [
    { id: 'f1', name: 'Grilled Fish', price: 1100, image: '🐟' },
    { id: 'f2', name: 'Fish & Chips', price: 850, image: '🐟' }
  ],
  eggs: [
    { id: 'e1', name: 'Scrambled Eggs', price: 250, image: '🍳' },
    { id: 'e2', name: 'Omelette', price: 300, image: '🍳' }
  ]
};

let currentOrder = [];

// Display all menu items initially
function initializeMenu() {
  const menuGrid = document.querySelector('.menu-grid');
  Object.values(menuItems).flat().forEach(item => {
    const itemElement = createMenuItemElement(item);
    menuGrid.appendChild(itemElement);
  });
}

function createMenuItemElement(item) {
  const div = document.createElement('div');
  div.className = 'menu-item';
  div.onclick = () => addToOrder(item);
  div.innerHTML = `
        <div class="item-image">${item.image}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-price">Ksh ${item.price}</div>
    `;
  return div;
}

function addToOrder(item) {
  currentOrder.push(item);
  updateOrderDisplay();
}

function updateOrderDisplay() {
  const orderItems = document.getElementById('order-items');
  orderItems.innerHTML = '';

  currentOrder.forEach((item, index) => {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
            <span>${item.name}</span>
            <span>Ksh ${item.price}</span>
            <button onclick="removeItem(${index})">✕</button>
        `;
    orderItems.appendChild(orderItem);
  });

  updateTotals();
}

function removeItem(index) {
  currentOrder.splice(index, 1);
  updateOrderDisplay();
}

function updateTotals() {
  const subtotal = currentOrder.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('tax').textContent = tax.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);
}

function clearOrder() {
  currentOrder = [];
  updateOrderDisplay();
}

function processPayment() {
  if (currentOrder.length === 0) return;

  const total = currentOrder.reduce((sum, item) => sum + item.price, 0) * 1.16;
  const modal = document.getElementById('sale-modal');
  document.getElementById('modal-total').textContent = `Amount: Ksh ${total.toFixed(2)}`;

  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.display = 'none';
    clearOrder();
  }, 2000);
}

// Initialize menu when page loads
window.onload = initializeMenu;

// Category filter functionality
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    const category = e.target.textContent.toLowerCase();
    const menuGrid = document.querySelector('.menu-grid');
    menuGrid.innerHTML = '';

    if (category === 'all') {
      Object.values(menuItems).flat().forEach(item => {
        menuGrid.appendChild(createMenuItemElement(item));
      });
    } else {
      menuItems[category]?.forEach(item => {
        menuGrid.appendChild(createMenuItemElement(item));
      });
    }
  });
});
