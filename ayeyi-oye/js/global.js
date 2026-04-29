/* ============================================
   AYEYI OYE — Global JavaScript
   Shared cart, toast, and nav utilities
   ============================================ */

// ── CART STATE ──
let cartItems = JSON.parse(localStorage.getItem('ao_cart') || '[]');

function getCartCount() {
  return cartItems.reduce((sum, item) => sum + item.qty, 0);
}

function saveCart() {
  localStorage.setItem('ao_cart', JSON.stringify(cartItems));
}

function clearCart() {
  cartItems = [];
  saveCart();
  updateCartUI();
}

function getCartSummary() {
  if (!cartItems.length) {
    return 'No cart items selected.';
  }

  return cartItems
    .map(item => `${item.qty} x ${item.name} (${item.price})`)
    .join('\n');
}

function addToCart(name, price) {
  const existing = cartItems.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ name, price, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`"${name}" added to cart`);
}

function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = count;
  });
}

function showCart() {
  const count = getCartCount();
  if (count === 0) {
    showToast('Your cart is empty');
  } else {
    showToast(`You have ${count} item(s) in your cart`);
  }
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── NAV ACTIVE STATE ──
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  setActiveNav();
});
