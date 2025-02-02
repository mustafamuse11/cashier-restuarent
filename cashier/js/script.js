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
let dailyTotal = 0;

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

function clearOrder(resetDaily = false) {
  currentOrder = [];
  updateOrderDisplay();
  if (resetDaily) {
    resetDailyTotal();
  }
}

function processPayment() {
  if (currentOrder.length === 0) return;

  const total = currentOrder.reduce((sum, item) => sum + item.price, 0) * 1.16;

  dailyTotal += total;
  updateDailyTotal();

  const modal = document.getElementById('sale-modal');
  document.getElementById('modal-total').textContent = `Amount: Ksh ${total.toFixed(2)}`;

  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.display = 'none';
    clearOrder();
  }, 2000);
}

function updateDailyTotal() {
  const dailyTotalElement = document.getElementById('daily-total');
  dailyTotalElement.textContent = dailyTotal.toFixed(2);

  const amountElement = dailyTotalElement.parentElement;
  amountElement.classList.add('highlight');

  setTimeout(() => {
    amountElement.classList.remove('highlight');
  }, 300);
}

function resetDailyTotal() {
  dailyTotal = 0;
  updateDailyTotal();
}

window.onload = function () {
  initializeMenu();
  updateDailyTotal();
};

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
