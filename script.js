const menuItems = {
    burger: [
        { id: 'b1', name: 'Classic Beef Burger', price: 450, image: '🍔' }
    ],
    pizza: [
        { id: 'p1', name: 'Margherita Pizza', price: 800, image: '🍕' }
    ],
    pasta: [
        { id: 'pa1', name: 'Spaghetti Bolognese', price: 600, image: '🍝' }
    ],
    rice: [
        { id: 'r1', name: 'Chicken Biryani', price: 450, image: '🍚' }
    ],
    chicken: [
        { id: 'c1', name: 'Grilled Chicken', price: 500, image: '🍗' }
    ],
    fish: [
        { id: 'f1', name: 'Grilled Tilapia', price: 600, image: '🐟' }
    ],
    eggs: [
        { id: 'e1', name: 'Scrambled Eggs', price: 200, image: '🍳' }
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

function updateDailyTotal() {
    const dailyTotalElement = document.getElementById('daily-total');
    dailyTotalElement.textContent = dailyTotal.toFixed(2);

    const amountElement = dailyTotalElement.parentElement;
    amountElement.classList.add('highlight');

    setTimeout(() => {
        amountElement.classList.remove('highlight');
    }, 300);
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
