    // ── CURSOR ──
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button, .cat-card, .product-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    // ── LOADER ──
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
      }, 1800);
    });

    // ── NAVBAR SCROLL ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    });

    // ── MOBILE MENU ──
    document.getElementById('hamburger').onclick = () => {
      document.getElementById('mobileNav').classList.add('open');
    };
    document.getElementById('closeMenu').onclick = () => {
      document.getElementById('mobileNav').classList.remove('open');
    };
    function closeNav() {
      document.getElementById('mobileNav').classList.remove('open');
    }

    // ── PARALLAX BANNER ──
    const bannerBg = document.getElementById('bannerBg');
    window.addEventListener('scroll', () => {
      const banner = bannerBg.closest('.banner');
      const rect = banner.getBoundingClientRect();
      const speed = -0.25;
      bannerBg.style.transform = `translateY(${rect.top * speed}px)`;
    });

    // ── PRODUCTS DATA ──
    const products = [
      {
        id: 1,
        name: "Celestial Diamond Necklace",
        category: "Necklaces",
        price: 45000,
        originalPrice: 52000,
        rating: 4.9,
        reviews: 128,
        badge: "New",
        img: "https://i1-c.pinimg.com/webp85/736x/bd/20/78/bd20784dde146f486e76e83824244377.webp"
      },
      {
        id: 2,
        name: "Heritage Gold Bangles Set",
        category: "Bangles",
        price: 38500,
        originalPrice: null,
        rating: 4.8,
        reviews: 94,
        badge: "Bestseller",
        img: "https://i1-c.pinimg.com/1200x/a3/1e/bb/a31ebbc33a34510752754956c6650ede.jpg"
      },
      {
        id: 3,
        name: "Royal Ruby Earrings",
        category: "Earrings",
        price: 22000,
        originalPrice: 28000,
        rating: 4.7,
        reviews: 67,
        badge: "Sale",
        img: "https://i1-c.pinimg.com/736x/63/fe/98/63fe986ca528a1abd3414fa832d591de.jpg"
      },
      {
        id: 4,
        name: "Eternity Diamond Ring",
        category: "Rings",
        price: 65000,
        originalPrice: null,
        rating: 5.0,
        reviews: 203,
        badge: "Limited",
        img: "https://i.pinimg.com/736x/ba/f4/f8/baf4f8456222bead43f69057d20f9607.jpg"
      },
      {
        id: 5,
        name: "Pearl Strand Necklace",
        category: "Necklaces",
        price: 18500,
        originalPrice: 22000,
        rating: 4.8,
        reviews: 89,
        badge: "Popular",
        img: "https://i1-c.pinimg.com/webp85/736x/1c/f3/61/1cf361128d658b8c4890a602d39ea6b7.webp"
      },
      {
        id: 6,
        name: "Gold Chain Bracelet",
        category: "Bracelets",
        price: 29000,
        originalPrice: null,
        rating: 4.6,
        reviews: 55,
        badge: "New",
        img: "https://i1-c.pinimg.com/webp85/1200x/a6/fc/c3/a6fcc33135423e67b46f25102e96607d.webp"
      },
      {
        id: 7,
        name: "Sapphire Pendant Set",
        category: "Necklaces",
        price: 35500,
        originalPrice: 42000,
        rating: 4.9,
        reviews: 112,
        badge: "Sale",
        img: "https://i1-c.pinimg.com/1200x/0c/74/f9/0c74f99ff12bbdd2b72a00aa46eb3b84.jpg"
      },
      {
        id: 8,
        name: "Classic Mangalsutra",
        category: "Necklaces",
        price: 55000,
        originalPrice: null,
        rating: 4.9,
        reviews: 178,
        badge: "Bestseller",
        img: "https://i1-c.pinimg.com/736x/d9/c6/21/d9c62164eb6c7cefe75e5592bcdab3a1.jpg"
      }
    ];

    function formatPrice(p) {
      return '₹' + p.toLocaleString('en-IN');
    }

    function renderProducts() {
      const grid = document.getElementById('productsGrid');
      grid.innerHTML = products.map(p => `
    <div class="product-card" onclick="addToCart(${p.id}, event)">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart(${p.id}, event)">Add to Bag</button>
          <button class="btn-wishlist" onclick="event.stopPropagation(); wishlist(${p.id})">♡</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">
          <strong>${formatPrice(p.price)}</strong>
          ${p.originalPrice ? ` <s style="font-size:.8rem;color:#B0A898;">${formatPrice(p.originalPrice)}</s>` : ''}
        </div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.round(p.rating))}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
      </div>
    </div>
  `).join('');

      // Re-attach hover listeners for cursor
      document.querySelectorAll('.product-card').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
      });
    }

    // ── CART ──
    let cart = [];

    function addToCart(id, e) {
      if (e) e.stopPropagation();
      const product = products.find(p => p.id === id);
      const existing = cart.find(c => c.id === id);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      updateCartUI();
      showToast(`${product.name} added to bag!`);
    }

    function removeFromCart(id) {
      cart = cart.filter(c => c.id !== id);
      updateCartUI();
    }

    function changeQty(id, delta) {
      const item = cart.find(c => c.id === id);
      if (item) {
        item.qty += delta;
        if (item.qty <= 0) removeFromCart(id);
        else updateCartUI();
      }
    }

    function updateCartUI() {
      const total = cart.reduce((s, c) => s + c.qty, 0);
      document.getElementById('cartBadge').textContent = total;

      const itemsEl = document.getElementById('cartItems');
      const emptyEl = document.getElementById('cartEmpty');
      const footerEl = document.getElementById('cartFooter');

      if (cart.length === 0) {
        emptyEl.style.display = 'block';
        footerEl.style.display = 'none';
        itemsEl.innerHTML = '';
        itemsEl.appendChild(emptyEl);
      } else {
        emptyEl.style.display = 'none';
        footerEl.style.display = 'block';
        itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `).join('');
      }

      const grandTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
      document.getElementById('cartTotalPrice').textContent = formatPrice(grandTotal);
    }

    function openCart() {
      document.getElementById('cartDrawer').classList.add('open');
      document.getElementById('cartOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeCart() {
      document.getElementById('cartDrawer').classList.remove('open');
      document.getElementById('cartOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }

    document.getElementById('cartBtn').onclick = openCart;
    document.getElementById('closeCart').onclick = closeCart;
    document.getElementById('cartOverlay').onclick = closeCart;

    function checkout() {
      if (cart.length === 0) return;
      showToast('Redirecting to checkout...');
      setTimeout(closeCart, 1500);
    }

    function wishlist(id) {
      const p = products.find(x => x.id === id);
      showToast(`${p.name} added to wishlist! ♡`);
    }

    // ── TOAST ──
    let toastTimer;
    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toastMsg').textContent = msg;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ── TESTIMONIALS ──
    const slides = document.querySelectorAll('.testi-slide');
    let curSlide = 0;
    let slideTimer;

    const dotsContainer = document.getElementById('testiDots');
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.onclick = () => goToSlide(i);
      dotsContainer.appendChild(dot);
    });

    function goToSlide(n) {
      slides[curSlide].classList.remove('active');
      document.querySelectorAll('.dot')[curSlide].classList.remove('active');
      curSlide = n;
      slides[curSlide].classList.add('active');
      document.querySelectorAll('.dot')[curSlide].classList.add('active');
      resetTimer();
    }

    function nextSlide() {
      goToSlide((curSlide + 1) % slides.length);
    }

    function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, 5000);
    }

    resetTimer();

    // ── NEWSLETTER ──
    function subscribe() {
      const email = document.getElementById('emailInput').value;
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address.');
        return;
      }
      showToast('Welcome to the Lumière Circle! 10% off code sent to your email.');
      document.getElementById('emailInput').value = '';
    }

    document.getElementById('emailInput').addEventListener('keypress', e => {
      if (e.key === 'Enter') subscribe();
    });

    // ── SCROLL ANIMATIONS ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.cat-card, .product-card, .section-header').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    });

    // ── INIT ──
    renderProducts();
    updateCartUI();