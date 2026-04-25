/* ============================================
   AYEYI OYE — Collection Page JavaScript
   ============================================ */

const products = [
  { id:1, name:"Celestial Wrap Dress",   price:"GH₵ 480", category:"dress",  tag:"New",        emoji:"👗", bg:"#c4a882" },
  { id:2, name:"Ivory Pleated Midi",     price:"GH₵ 420", category:"dress",  tag:"",           emoji:"👗", bg:"#d4b896" },
  { id:3, name:"Onyx Evening Gown",      price:"GH₵ 650", category:"dress",  tag:"Bestseller", emoji:"👗", bg:"#8a7a6a" },
  { id:4, name:"Silk Occasion Dress",    price:"GH₵ 560", category:"dress",  tag:"",           emoji:"👗", bg:"#b89070" },
  { id:5, name:"Draped Linen Blouse",    price:"GH₵ 280", category:"women",  tag:"",           emoji:"👚", bg:"#c8b49a" },
  { id:6, name:"Structured Crop Top",    price:"GH₵ 240", category:"women",  tag:"New",        emoji:"👚", bg:"#b8a888" },
  { id:7, name:"Open-Back Silk Top",     price:"GH₵ 310", category:"women",  tag:"",           emoji:"👚", bg:"#d0bc9c" },
  { id:8, name:"Kente-trim Blouse",      price:"GH₵ 295", category:"women",  tag:"Limited",    emoji:"👚", bg:"#c0aa84" },
  { id:9, name:"Tailored Ankara Shirt",  price:"GH₵ 320", category:"men",    tag:"",           emoji:"👔", bg:"#a89478" },
  { id:10,name:"Classic Linen Kaftan",   price:"GH₵ 380", category:"men",    tag:"Bestseller", emoji:"👔", bg:"#b8a080" },
  { id:11,name:"Modern Agbada Top",      price:"GH₵ 450", category:"men",    tag:"New",        emoji:"👔", bg:"#c0aa84" },
  { id:12,name:"Embroidered Dashiki",    price:"GH₵ 340", category:"men",    tag:"",           emoji:"👔", bg:"#9a8466" },
];

let currentFilter = 'all';

function renderProducts(filter) {
  currentFilter = filter;
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card visible';
    card.innerHTML = `
      <div class="product-placeholder" style="background:${p.bg};">
        <div class="placeholder-icon">${p.emoji}</div>
        <div class="placeholder-label" style="color:rgba(255,255,255,0.35);">Add your photo</div>
      </div>
      ${p.tag ? `<span class="product-tag-badge">${p.tag}</span>` : ''}
      <div class="product-overlay">
        <div class="product-name">${p.name}</div>
        <div class="product-price">${p.price}</div>
        <button class="add-to-cart-btn" onclick="addToCart('${p.name}', '${p.price}')">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterProducts(filter, btn) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(filter);
}

document.addEventListener('DOMContentLoaded', () => renderProducts('all'));
