const pizzas = [
  { id: 1, name: 'Margherita', desc: 'San Marzano tomato, fresh mozzarella, basil', price: 14.99, emoji: '🍕' },
  { id: 2, name: 'Pepperoni', desc: 'Tomato sauce, mozzarella, spicy pepperoni', price: 16.99, emoji: '🍕' },
  { id: 3, name: 'BBQ Chicken', desc: 'BBQ sauce, grilled chicken, red onion, cilantro', price: 17.99, emoji: '🍕' },
  { id: 4, name: 'Quattro Formaggi', desc: 'Mozzarella, gorgonzola, parmesan, ricotta', price: 18.99, emoji: '🧀' },
  { id: 5, name: 'Veggie Supreme', desc: 'Bell peppers, mushrooms, olives, spinach', price: 15.99, emoji: '🥦' },
  { id: 6, name: 'Diavola', desc: 'Spicy salami, chili flakes, tomato, mozzarella', price: 17.49, emoji: '🌶️' },
  { id: 7, name: 'Prosciutto', desc: 'Prosciutto di Parma, arugula, shaved parmesan', price: 19.99, emoji: '🥩' },
  { id: 8, name: 'Truffle Mushroom', desc: 'Truffle oil, wild mushrooms, fontina, thyme', price: 21.99, emoji: '🍄' },
];

let cart = [];

// Render menu
const grid = document.getElementById('menuGrid');
pizzas.forEach(p => {
  grid.innerHTML += `
    <div class="menu-card">
      <div class="emoji">${p.emoji}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">$${p.price.toFixed(2)}</div>
      <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>`;
});

function addToCart(id) {
  const item = pizzas.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  updateCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.querySelector('.cart-count').textContent = count;
  document.getElementById('cartTotal').textContent = total.toFixed(2);

  const itemsEl = document.getElementById('cartItems');
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }
  itemsEl.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span class="item-name">${c.emoji} ${c.name} × ${c.qty}</span>
        <span class="item-price">$${(c.price * c.qty).toFixed(2)}</span>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${c.id})">✕</button>
    </div>`).join('');
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) return alert('Your cart is empty!');
  alert(`🍕 Order placed! Total: $${cart.reduce((s,c) => s + c.price * c.qty, 0).toFixed(2)}\nThank you for choosing Bella Pizza!`);
  cart = [];
  updateCart();
  toggleCart();
}

function submitForm(e) {
  e.preventDefault();
  alert('✅ Message sent! We\'ll get back to you shortly.');
  e.target.reset();
}
