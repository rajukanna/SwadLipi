// SwadLipi Main Desktop Application Controller
// Faithful implementation of Yummies Food Delivery Template for Indian Restaurant Menu Translation

const appState = {
  allDishes: [],
  filteredDishes: [],
  selectedDish: null,
  activeCategory: 'All',
  activeRegion: 'All',
  searchQuery: '',
  favorites: new Set(),
  cart: {}, // { dishId: quantity }
  targetLanguage: 'English',
  userPreferences: {
    dietary: 'Veg',
    spiceTolerance: 'Medium',
    isJain: false,
    isHalal: false,
    nutAllergy: false,
    lactoseIntolerant: false
  }
};

window.appState = appState;

document.addEventListener('DOMContentLoaded', async () => {
  await loadInitialDishes();
  setupEventListeners();
  renderCategoryTabs();
  renderDishesGrid();

  // Select first dish by default for desktop inspector view
  if (appState.allDishes.length > 0) {
    selectDish(appState.allDishes[0]);
  }

  // Initialize Maharaj AI Agent
  window.maharajAgent = new MaharajAgent();
});

// Load Dishes from Server API or fallback to REGIONAL_MENUS
async function loadInitialDishes() {
  try {
    const res = await fetch('/api/dishes');
    const data = await res.json();
    if (data.success && data.dishes) {
      appState.allDishes = data.dishes;
    }
  } catch (e) {
    console.warn('Using client-side fallback dishes:', e);
    const fallbackList = [];
    Object.values(window.REGIONAL_MENUS || {}).forEach(menu => {
      fallbackList.push(...menu.dishes);
    });
    appState.allDishes = fallbackList;
  }
  appState.filteredDishes = [...appState.allDishes];
}

// Render Category Tabs (Matches Screen 2 in Yummies Template)
function renderCategoryTabs() {
  const tabs = ['All', 'Meals', 'Sides', 'Snacks', 'Desserts', 'Beverages'];
  const container = document.getElementById('categoryTabs');
  if (!container) return;

  container.innerHTML = tabs.map(tab => `
    <button class="category-tab-btn ${tab === appState.activeCategory ? 'active' : ''}" data-category="${tab}">
      ${tab}
    </button>
  `).join('');

  container.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      appState.activeCategory = btn.dataset.category;
      container.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterDishes();
    });
  });
}

// Filter Dishes based on search, category, region, and dietary preferences
function filterDishes() {
  appState.filteredDishes = appState.allDishes.filter(dish => {
    // Category match
    const categoryMatch = appState.activeCategory === 'All' || dish.category === appState.activeCategory;

    // Region match
    const regionMatch = appState.activeRegion === 'All' || dish.region.includes(appState.activeRegion);

    // Search query match
    const query = appState.searchQuery.toLowerCase().trim();
    const searchMatch = !query || 
      dish.name.toLowerCase().includes(query) ||
      (dish.vernacular && dish.vernacular.toLowerCase().includes(query)) ||
      dish.culturalExplanation.toLowerCase().includes(query) ||
      dish.keyIngredients.some(i => i.toLowerCase().includes(query));

    // Dietary filter
    let dietaryMatch = true;
    if (appState.userPreferences.dietary === 'Pure Veg' && dish.dietary !== 'Veg') {
      dietaryMatch = false;
    }
    if (appState.userPreferences.isJain && !dish.dietaryTags.some(t => t.toLowerCase().includes('jain'))) {
      dietaryMatch = false;
    }

    return categoryMatch && regionMatch && searchMatch && dietaryMatch;
  });

  renderDishesGrid();
}

// Render Dishes Grid (Screen 2: Circular dishes with hearts & prices)
function renderDishesGrid() {
  const container = document.getElementById('dishesGrid');
  if (!container) return;

  if (appState.filteredDishes.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #FFFFFF; border-radius: 20px;">
        <span style="font-size: 40px;">🔍</span>
        <h3 style="font-family: var(--font-heading); margin-top: 12px; color: var(--text-main);">No dishes match your filter</h3>
        <p style="color: var(--text-muted); font-size: 13px; margin-top: 4px;">Try loosening dietary filters or search for another delicious Indian specialty!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = appState.filteredDishes.map(dish => {
    const isFav = appState.favorites.has(dish.id);
    const isSelected = appState.selectedDish && appState.selectedDish.id === dish.id;
    const spiceChillies = '🌶️'.repeat(dish.spiceLevel || 0);

    return `
      <div class="dish-card ${isSelected ? 'selected' : ''}" data-id="${dish.id}">
        <!-- Veg/NonVeg Indicator -->
        <div class="card-dietary-dot ${dish.dietary === 'Veg' ? 'veg' : 'non-veg'}" title="${dish.dietary}"></div>

        <!-- Favorite Heart Toggle -->
        <button class="favorite-heart-btn ${isFav ? 'active' : ''}" data-id="${dish.id}" title="Save to Favorites">
          ${isFav ? '❤️' : '🤍'}
        </button>

        <!-- Circular Plate Photography -->
        <div class="dish-card-image-wrap">
          <img src="${dish.image}" alt="${dish.name}" loading="lazy" onerror="this.src='/images/biryani.jpg'" />
        </div>

        <!-- Dish Title & Vernacular -->
        <h3 class="dish-card-title">${dish.name}</h3>
        <div class="dish-card-vernacular">${dish.vernacular || dish.region}</div>

        <!-- Price & Spice Meter -->
        <div class="dish-card-price-row">
          <span class="dish-card-price">₹${dish.price}</span>
          ${dish.spiceLevel > 0 ? `<span class="dish-card-spice-meter" title="Spice level: ${dish.spiceLevel}/4">${spiceChillies}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Add click listeners to cards
  container.querySelectorAll('.dish-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger card selection if heart button was clicked
      if (e.target.closest('.favorite-heart-btn')) return;
      const dishId = card.dataset.id;
      const dish = appState.allDishes.find(d => d.id === dishId);
      if (dish) selectDish(dish);
    });
  });

  // Favorite button toggles
  container.querySelectorAll('.favorite-heart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dishId = btn.dataset.id;
      if (appState.favorites.has(dishId)) {
        appState.favorites.delete(dishId);
        btn.classList.remove('active');
        btn.innerHTML = '🤍';
      } else {
        appState.favorites.add(dishId);
        btn.classList.add('active');
        btn.innerHTML = '❤️';
      }
    });
  });
}

// Select Dish and Display in the Right Inspector (Screen 3 Replication)
function selectDish(dish) {
  appState.selectedDish = dish;
  if (window.maharajAgent) {
    window.maharajAgent.setCurrentDish(dish);
  }

  // Update card highlighting
  document.querySelectorAll('.dish-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.id === dish.id);
  });

  const qty = appState.cart[dish.id] || 1;
  const isFav = appState.favorites.has(dish.id);

  // Update Inspector elements
  const heroImage = document.getElementById('inspectorHeroImage');
  if (heroImage) heroImage.src = dish.image;

  const heroHeart = document.getElementById('inspectorHeroHeart');
  if (heroHeart) heroHeart.innerHTML = isFav ? '❤️' : '🤍';

  const titleEl = document.getElementById('inspectorDishTitle');
  if (titleEl) titleEl.innerText = dish.name;

  const vernacularEl = document.getElementById('inspectorDishVernacular');
  if (vernacularEl) vernacularEl.innerText = dish.vernacular || '';

  const ratingEl = document.getElementById('inspectorRatingVal');
  if (ratingEl) ratingEl.innerText = dish.rating || '4.8';

  const reviewCountEl = document.getElementById('inspectorReviewCount');
  if (reviewCountEl) reviewCountEl.innerText = `(${dish.reviewsCount || 120} reviews)`;

  const regionTag = document.getElementById('inspectorRegionTag');
  if (regionTag) regionTag.innerText = dish.region;

  const priceTag = document.getElementById('inspectorPriceTag');
  if (priceTag) priceTag.innerText = `₹${dish.price}`;

  const stepperVal = document.getElementById('stepperQuantityVal');
  if (stepperVal) stepperVal.innerText = qty;

  // Generic Translation vs SwadLipi Callout
  const badTrans = document.getElementById('inspectorBadTranslation');
  if (badTrans) badTrans.innerText = `Generic Tool: "${dish.literalTranslation}"`;

  const smartTrans = document.getElementById('inspectorSmartTranslation');
  if (smartTrans) smartTrans.innerText = dish.whyGenericFails;

  // Description
  const descEl = document.getElementById('inspectorDescription');
  if (descEl) {
    descEl.innerHTML = `${dish.culturalExplanation} <span class="calorie-highlight">(Contains ${dish.calories || '350 kcal'})</span>`;
  }

  // Flavor Profile
  const fp = dish.flavorProfile || { spicy: 50, tangy: 40, savory: 80, sweet: 20, rich: 70 };
  updateFlavorBar('flavorSpicy', fp.spicy);
  updateFlavorBar('flavorTangy', fp.tangy);
  updateFlavorBar('flavorSweet', fp.sweet);
  updateFlavorBar('flavorRich', fp.rich);

  // How to Eat
  const etiquetteEl = document.getElementById('inspectorEtiquette');
  if (etiquetteEl) {
    etiquetteEl.innerHTML = `<strong>Culinary Etiquette:</strong> ${dish.howToEat || 'Enjoy hot and freshly served with matching flatbread or steamed rice.'}`;
  }

  // Recommended Sides (Horizontal Scroll Cards with '+' button)
  const sidesRow = document.getElementById('inspectorSidesRow');
  if (sidesRow) {
    sidesRow.innerHTML = (dish.recommendedSides || [
      { name: "Sirka Pyaaz", price: 35, image: "🧅" },
      { name: "Roasted Papad", price: 30, image: "🫓" },
      { name: "Mint Chutney", price: 25, image: "🍃" }
    ]).map(side => `
      <div class="side-card">
        <span class="side-card-icon">${side.image || '🍲'}</span>
        <span class="side-card-name" title="${side.name}">${side.name}</span>
        <div class="side-card-bottom">
          <span class="side-card-price">₹${side.price}</span>
          <button class="side-add-btn" data-name="${side.name}" data-price="${side.price}" title="Add ${side.name}">+</button>
        </div>
      </div>
    `).join('');

    sidesRow.querySelectorAll('.side-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sideName = btn.dataset.name;
        const sidePrice = parseInt(btn.dataset.price, 10);
        showNotification(`Added ${sideName} (+₹${sidePrice}) to meal`);
        updateCartTotal(dish.price * qty + sidePrice);
      });
    });
  }

  // Update Bottom Total
  updateCartTotal(dish.price * qty);
}

function updateFlavorBar(id, value) {
  const bar = document.getElementById(id);
  if (bar) bar.style.width = `${Math.min(100, Math.max(5, value))}%`;
}

function updateCartTotal(total) {
  const totalValEl = document.getElementById('inspectorTotalAmount');
  if (totalValEl) {
    totalValEl.innerText = `₹${total}`;
  }
}

// Notification Toast
function showNotification(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.background = 'var(--primary)';
  toast.style.color = '#FFFFFF';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = 'var(--radius-pill)';
  toast.style.boxShadow = 'var(--shadow-lg)';
  toast.style.fontSize = '13px';
  toast.style.fontWeight = '700';
  toast.style.zIndex = '9999';
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// Setup Event Listeners
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('menuSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value;
      filterDishes();
    });
  }

  // Regional Filter Chips
  document.querySelectorAll('.region-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.region-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.activeRegion = chip.dataset.region;
      filterDishes();
    });
  });

  // Quantity Stepper (- 1 +)
  const stepMinus = document.getElementById('stepMinusBtn');
  const stepPlus = document.getElementById('stepPlusBtn');
  const stepVal = document.getElementById('stepperQuantityVal');

  if (stepMinus && stepPlus && stepVal) {
    stepMinus.addEventListener('click', () => {
      if (!appState.selectedDish) return;
      let q = appState.cart[appState.selectedDish.id] || 1;
      if (q > 1) {
        q--;
        appState.cart[appState.selectedDish.id] = q;
        stepVal.innerText = q;
        updateCartTotal(appState.selectedDish.price * q);
      }
    });

    stepPlus.addEventListener('click', () => {
      if (!appState.selectedDish) return;
      let q = appState.cart[appState.selectedDish.id] || 1;
      q++;
      appState.cart[appState.selectedDish.id] = q;
      stepVal.innerText = q;
      updateCartTotal(appState.selectedDish.price * q);
    });
  }

  // Primary Action Button ("Add to Order / Explain Dish")
  const primaryActionBtn = document.getElementById('btnPrimaryOrder');
  if (primaryActionBtn) {
    primaryActionBtn.addEventListener('click', () => {
      if (!appState.selectedDish) return;
      const q = appState.cart[appState.selectedDish.id] || 1;
      appState.cart[appState.selectedDish.id] = q;
      updateCartBadge();
      showNotification(`Added ${q}x ${appState.selectedDish.name} to shortlist!`);
    });
  }

  // Pronunciation Audio Button
  const audioBtn = document.getElementById('btnPronounceAudio');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (!appState.selectedDish) return;
      window.speechService.speak(appState.selectedDish.name);
    });
  }

  // Inspector Floating Heart Toggle
  const heroHeart = document.getElementById('inspectorHeroHeart');
  if (heroHeart) {
    heroHeart.addEventListener('click', () => {
      if (!appState.selectedDish) return;
      const id = appState.selectedDish.id;
      if (appState.favorites.has(id)) {
        appState.favorites.delete(id);
        heroHeart.innerHTML = '🤍';
      } else {
        appState.favorites.add(id);
        heroHeart.innerHTML = '❤️';
      }
      renderDishesGrid();
    });
  }

  // Modals Setup
  setupModals();
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadgeCount');
  if (badge) {
    const totalItems = Object.values(appState.cart).reduce((a, b) => a + b, 0);
    badge.innerText = totalItems;
  }
}

// Modal open & close logic
function setupModals() {
  // Auth & Profile Modal (Screen 1)
  const authModal = document.getElementById('authProfileModal');
  const openAuthBtn = document.getElementById('openProfileBtn');
  const closeAuthBtn = document.getElementById('closeAuthModalBtn');

  if (openAuthBtn && authModal) {
    openAuthBtn.addEventListener('click', () => authModal.classList.add('active'));
  }
  if (closeAuthBtn && authModal) {
    closeAuthBtn.addEventListener('click', () => authModal.classList.remove('active'));
  }

  // Dietary Toggle Buttons in Auth Modal
  document.querySelectorAll('.diet-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const pref = btn.dataset.pref;
      if (pref === 'jain') appState.userPreferences.isJain = btn.classList.contains('active');
      if (pref === 'veg') appState.userPreferences.dietary = btn.classList.contains('active') ? 'Pure Veg' : 'All';
      if (pref === 'halal') appState.userPreferences.isHalal = btn.classList.contains('active');
      if (pref === 'nuts') appState.userPreferences.nutAllergy = btn.classList.contains('active');
      filterDishes();
    });
  });

  // Save Dietary Preferences Button
  const saveDietBtn = document.getElementById('saveDietaryPreferencesBtn');
  const spiceSelect = document.getElementById('userSpiceSelect');
  if (saveDietBtn) {
    saveDietBtn.addEventListener('click', () => {
      if (spiceSelect) {
        appState.userPreferences.spiceTolerance = spiceSelect.value;
      }
      filterDishes();
      if (authModal) authModal.classList.remove('active');
      showNotification('Dietary profile preferences saved and applied!');
    });
  }

  // Global Escape key listener to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }
  });

  // AI Maharaj Chat Modal
  const aiChatModal = document.getElementById('aiChatModal');
  const openChatBtns = document.querySelectorAll('.open-chat-btn');
  const closeChatBtn = document.getElementById('closeChatModalBtn');

  openChatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (aiChatModal) aiChatModal.classList.add('active');
    });
  });
  if (closeChatBtn && aiChatModal) {
    closeChatBtn.addEventListener('click', () => aiChatModal.classList.remove('active'));
  }

  // Menu Scanner Modal
  const scannerModal = document.getElementById('scannerModal');
  const openScannerBtns = document.querySelectorAll('.open-scanner-btn');
  const closeScannerBtn = document.getElementById('closeScannerModalBtn');
  const runScanBtn = document.getElementById('btnRunMenuScan');
  const scannerInput = document.getElementById('scannerRawText');

  openScannerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (scannerModal) scannerModal.classList.add('active');
    });
  });
  if (closeScannerBtn && scannerModal) {
    closeScannerBtn.addEventListener('click', () => scannerModal.classList.remove('active'));
  }

  // Load sample menu presets into scanner
  document.querySelectorAll('.sample-menu-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.preset;
      if (type === 'dhaba') {
        scannerInput.value = "1. Paneer Butter Masala - ₹320\n2. Dal Makhani - ₹290\n3. Garlic Butter Naan - ₹75\n4. Kesar Mango Lassi - ₹150";
      } else if (type === 'udupi') {
        scannerInput.value = "1. Mysore Masala Dosa - ₹180\n2. Medu Vada - ₹90\n3. Bisi Bele Bath - ₹160\n4. Filter Kaapi - ₹60";
      } else if (type === 'hyd') {
        scannerInput.value = "1. Hyderabadi Chicken Dum Biryani - ₹380\n2. Mirchi ka Salan - ₹90\n3. Shahi Gulab Jamun - ₹140\n4. Burani Garlic Raita - ₹60";
      }
    });
  });

  if (runScanBtn && scannerInput) {
    runScanBtn.addEventListener('click', async () => {
      const rawText = scannerInput.value.trim();
      if (!rawText) return;

      runScanBtn.innerText = "Translating & Decoding Menu... 🍛";
      try {
        const res = await fetch('/api/scan-menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ menuText: rawText })
        });
        const data = await res.json();
        if (data.success && data.items) {
          appState.allDishes = [...data.items, ...appState.allDishes];
          filterDishes();
          selectDish(data.items[0]);
          scannerModal.classList.remove('active');
          showNotification(`Decoded ${data.totalParsed} authentic Indian dishes!`);
        }
      } catch (err) {
        console.error('Scan error:', err);
      } finally {
        runScanBtn.innerText = "Translate & Extract Menu Dishes";
      }
    });
  }

  // Close modals on clicking backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}
