const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Detailed Indian Culinary Knowledge Base (Pre-loaded for reliable offline & low-latency execution)
const CULINARY_DB = [
  {
    id: "biryani-hyd",
    name: "Hyderabadi Chicken Dum Biryani",
    vernacular: "हैदराबादी चिकन दम बिरयानी",
    region: "Awadh & Hyderabad",
    category: "Meals",
    price: 380,
    rating: 4.9,
    reviewsCount: 342,
    image: "/images/biryani.jpg",
    dietary: "Non-Veg",
    dietaryTags: ["Halal Available", "Nut-Free Options"],
    spiceLevel: 3, // 1 to 4
    calories: "580 kcal",
    literalTranslation: "Steamed spicy rice with poultry",
    culturalExplanation: "Royal Nizami delicacy where aged basmati rice and tender bone-in chicken marinated in yogurt, fried onions (birista), mint, and 18 aromatic spices are sealed with dough ('dum') in a heavy pot and slow-cooked over smoldering coals. Each grain remains distinct and infused with saffron.",
    whyGenericFails: "Generic translation tools label it as 'chicken fried rice' or 'chicken boiled rice', masking its laborious 4-hour sealed dum cooking technique, the delicate saffron floral aroma, and the layered assembly.",
    flavorProfile: { spicy: 75, tangy: 30, savory: 95, sweet: 10, rich: 85 },
    keyIngredients: ["Long-grain Basmati Rice", "Tender Chicken", "Desi Ghee", "Saffron (Kesar)", "Fried Onions (Birista)", "Mint & Coriander", "Star Anise & Mace"],
    allergens: ["Dairy (Ghee/Yogurt)"],
    howToEat: "Traditionally eaten with the fingers of your right hand to feel the distinct rice grains. Drizzle with Mirchi ka Salan (tangy peanut-sesame curry) and a spoonful of cold cucumber raita to soothe the spice.",
    recommendedSides: [
      { name: "Mirchi ka Salan", price: 90, image: "🌶️" },
      { name: "Burani Garlic Raita", price: 60, image: "🥣" },
      { name: "Sirka Pyaaz (Pickled Onions)", price: 40, image: "🧅" }
    ]
  },
  {
    id: "masala-dosa",
    name: "Mysore Masala Dosa",
    vernacular: "ಮೈಸೂರು ಮಸಾಲ ದೋಸೆ / मैसूर मसाला डोसा",
    region: "Udupi & Tamil Nadu",
    category: "Meals",
    price: 180,
    rating: 4.8,
    reviewsCount: 420,
    image: "/images/dosa.jpg",
    dietary: "Veg",
    dietaryTags: ["100% Vegetarian", "Jain Option", "Gluten-Free"],
    spiceLevel: 2,
    calories: "340 kcal",
    literalTranslation: "Fermented pancake with potato filling",
    culturalExplanation: "Crisp, golden crepe made from naturally fermented rice and black gram batter, roasted in pure butter/ghee. Smeared on the inside with a fiery roasted red chili-garlic chutney paste, then folded over a spiced potato mash ('aaloo palya') seasoned with mustard seeds, curry leaves, and green chilies.",
    whyGenericFails: "Generic tools call it a 'potato pancake' or 'crepe'. This ignores that the batter is probiotic fermented overnight, resulting in a crisp exterior and tangy, pillowy interior that is naturally gluten-free.",
    flavorProfile: { spicy: 50, tangy: 65, savory: 80, sweet: 15, rich: 60 },
    keyIngredients: ["Fermented Rice & Urad Dal", "Potatoes", "Red Chili Chutney Paste", "Mustard Seeds", "Curry Leaves", "Butter/Ghee"],
    allergens: ["Dairy (if made with butter/ghee; can be vegan with sesame oil)"],
    howToEat: "Break off a piece of the crispy crepe edge with potato filling using one hand, dip generously into fresh wet coconut chutney first, followed by a dunk in steaming hot tangy drumstick sambhar.",
    recommendedSides: [
      { name: "Medu Vada (1 pc)", price: 50, image: "🥯" },
      { name: "Filter Kaapi (South Indian Coffee)", price: 60, image: "☕" },
      { name: "Ghee Podi Dip", price: 45, image: "✨" }
    ]
  },
  {
    id: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    vernacular: "पनीर बटर मसाला",
    region: "Punjab & Delhi",
    category: "Meals",
    price: 320,
    rating: 4.9,
    reviewsCount: 512,
    image: "/images/paneer.jpg",
    dietary: "Veg",
    dietaryTags: ["100% Vegetarian", "High Protein"],
    spiceLevel: 1,
    calories: "450 kcal",
    literalTranslation: "Cottage cheese butter spice paste",
    culturalExplanation: "Velvety, mildly sweet and savory curry where soft cubes of fresh unaged artisan Indian cottage cheese (paneer) are simmered in a luscious tomato-cashew makhani gravy enriched with butter, heavy cream, and aromatic sun-dried fenugreek leaves (kasuri methi).",
    whyGenericFails: "Generic tools translate 'paneer' as 'cottage cheese', confusing Western diners who expect lumpy, salted curd curds. Paneer is a dense, sliceable curd that holds its shape and soaks up luxurious gravies.",
    flavorProfile: { spicy: 25, tangy: 45, savory: 75, sweet: 40, rich: 95 },
    keyIngredients: ["Fresh Paneer", "Plum Tomatoes", "Cashew Nut Paste", "Butter & Fresh Cream", "Kasuri Methi (Fenugreek)", "Cardamom"],
    allergens: ["Dairy (Milk, Cream, Butter)", "Tree Nuts (Cashew)"],
    howToEat: "Tear a warm piece of garlic butter naan or tandoori roti, press it down to scoop a paneer cube with generous velvet gravy. Do not drink with a spoon — flatbread is your primary utensil.",
    recommendedSides: [
      { name: "Garlic Butter Naan", price: 75, image: "🫓" },
      { name: "Jeera Rice", price: 140, image: "🍚" },
      { name: "Laccha Pyaaz with Lime", price: 35, image: "🧅" }
    ]
  },
  {
    id: "pani-puri",
    name: "Pani Puri / Gol Gappe",
    vernacular: "पानी पूरी / गोल गप्पे / पुचका",
    region: "Street Food (All India)",
    category: "Snacks",
    price: 120,
    rating: 5.0,
    reviewsCount: 680,
    image: "/images/chaat.jpg",
    dietary: "Veg",
    dietaryTags: ["100% Vegetarian", "Vegan", "Jain Option"],
    spiceLevel: 3,
    calories: "180 kcal (6 pcs)",
    literalTranslation: "Water bread balls",
    culturalExplanation: "India's undisputed street food royalty: fragile, hollow semolina spheres crack-punctured on top, packed with spiced sprouted moong/chickpeas and potatoes, then flooded with ice-cold, zesty mint-coriander-black-salt water ('teekha pani') and sweet-tangy date-tamarind chutney.",
    whyGenericFails: "Literally rendered as 'water bread', creating a bizarre impression. It is a multi-sensory burst of crispy, spicy, sour, sweet, and freezing liquid sensations in a single mouthful.",
    flavorProfile: { spicy: 70, tangy: 90, savory: 80, sweet: 50, rich: 15 },
    keyIngredients: ["Semolina Puri Shells", "Fresh Mint & Coriander", "Black Salt (Kala Namak)", "Roasted Cumin", "Tamarind Pulp", "Boiled Chickpeas"],
    allergens: ["Gluten (Semolina/Wheat)"],
    howToEat: "CRITICAL: Pop the entire sphere into your mouth in ONE bite! Never attempt to bite it in half, or the spiced herb water will burst everywhere.",
    recommendedSides: [
      { name: "Dahi Puri Topping Upgrade", price: 50, image: "🍶" },
      { name: "Extra Sweet Tamarind Shot", price: 20, image: "🍯" },
      { name: "Dry Puri (Sukha Puri finale)", price: 25, image: "🍘" }
    ]
  },
  {
    id: "gulab-jamun",
    name: "Shahi Gulab Jamun",
    vernacular: "शाही गुलाब जामुन",
    region: "North India & Mughlai",
    category: "Desserts",
    price: 140,
    rating: 4.9,
    reviewsCount: 390,
    image: "/images/gulab_jamun.jpg",
    dietary: "Veg",
    dietaryTags: ["100% Vegetarian"],
    spiceLevel: 0,
    calories: "320 kcal (2 pcs)",
    literalTranslation: "Rose blackberry dumplings",
    culturalExplanation: "Classic celebratory sweet: delicate dumplings crafted from reduced solid milk dough (khoya) and a pinch of flour, slow-fried in desi ghee to a rich mahogany glow, then submerged in warm syrup perfumed with Kashmiri saffron, green cardamom, and rose water.",
    whyGenericFails: "Generic translators translate 'Gulab' to Rose and 'Jamun' to Blackberry, leading tourists to think it is fruit salad! 'Jamun' refers only to the dark spherical shape resembling the Indian black plum.",
    flavorProfile: { spicy: 0, tangy: 5, savory: 15, sweet: 98, rich: 90 },
    keyIngredients: ["Khoya (Evaporated Milk Solids)", "Desi Ghee", "Sugar Syrup", "Cardamom Powder", "Saffron Strands", "Pistachio Slivers"],
    allergens: ["Dairy (Milk Solids)", "Tree Nuts (Pistachio garnish)", "Gluten (Maida)"],
    howToEat: "Served warm. Slice gently with a dessert spoon to watch the fragrant rose syrup seep out from the tender center. Perfect when paired with a scoop of rabri or vanilla ice cream.",
    recommendedSides: [
      { name: "Rabri (Condensed Milk)", price: 70, image: "🥛" },
      { name: "Vanilla Bean Kulfi", price: 80, image: "🍨" },
      { name: "Warm Masala Chai", price: 50, image: "🍵" }
    ]
  },
  {
    id: "mango-lassi",
    name: "Kesar Mango Lassi",
    vernacular: "केसर आम की लस्सी",
    region: "Punjab & North India",
    category: "Beverages",
    price: 150,
    rating: 4.9,
    reviewsCount: 295,
    image: "/images/lassi.jpg",
    dietary: "Veg",
    dietaryTags: ["100% Vegetarian", "Gluten-Free", "Probiotic"],
    spiceLevel: 0,
    calories: "260 kcal",
    literalTranslation: "Mango sour milk churn",
    culturalExplanation: "Luxurious, thick smoothie whipped from fresh hung curd (yogurt) and sun-ripened Alphonso or Kesar mango pulp, sweetened with raw sugar and infused with crushed green cardamom, crowned with saffron threads and slivered pistachios. Served chilled in traditional earthen kulhads.",
    whyGenericFails: "Generic translation renders it as 'curd drink' or 'fermented milk beverage', which sounds sour or medicinal rather than creamy, decadent, and tropical.",
    flavorProfile: { spicy: 0, tangy: 40, savory: 10, sweet: 85, rich: 80 },
    keyIngredients: ["Fresh Whole Milk Yogurt", "Alphonso Mango Pulp", "Green Cardamom", "Kashmiri Saffron", "Crushed Pistachio"],
    allergens: ["Dairy (Yogurt)", "Tree Nuts (Pistachio)"],
    howToEat: "Sip cold between spicy curry bites. The active lactic probiotics and milk fat immediately neutralize capsaicin burn from hot chilies.",
    recommendedSides: [
      { name: "Roasted Masala Papad", price: 40, image: "🫓" },
      { name: "Samosa with Mint Chutney", price: 60, image: "🥟" }
    ]
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani (Slow-Cooked Overnight)",
    vernacular: "दाल मखनी",
    region: "Punjab & Delhi",
    category: "Meals",
    price: 290,
    rating: 4.8,
    reviewsCount: 380,
    image: "/images/paneer.jpg",
    dietary: "Veg",
    dietaryTags: ["100% Vegetarian", "High Protein", "Gluten-Free"],
    spiceLevel: 1,
    calories: "380 kcal",
    literalTranslation: "Buttery lentils",
    culturalExplanation: "Signature Punjabi dish where whole black lentils (urad) and red kidney beans (rajma) are simmered gently on a low charcoal flame for over 16 hours with garlic, ginger, and ripe tomatoes, finished with churned white butter and sweet cream.",
    whyGenericFails: "Calling it 'buttery lentils' misses the signature charcoal smokiness (dhungar technique) and silky, melt-in-the-mouth consistency achieved only through prolonged slow simmering.",
    flavorProfile: { spicy: 20, tangy: 30, savory: 90, sweet: 15, rich: 95 },
    keyIngredients: ["Whole Black Lentils", "Kidney Beans", "Butter", "Heavy Cream", "Ginger Garlic Paste", "Kashmiri Degi Mirch"],
    allergens: ["Dairy"],
    howToEat: "Pair with buttery garlic naan or layered tandoori lachha paratha and crunchy raw pickled onions.",
    recommendedSides: [
      { name: "Butter Naan", price: 65, image: "🫓" },
      { name: "Sirka Pyaaz", price: 35, image: "🧅" }
    ]
  },
  {
    id: "litti-chokha",
    name: "Bihari Litti Chokha",
    vernacular: "लिट्टी चोखा",
    region: "Bengal & East",
    category: "Meals",
    price: 240,
    rating: 4.7,
    reviewsCount: 210,
    image: "/images/biryani.jpg",
    dietary: "Veg",
    dietaryTags: ["100% Vegetarian", "High Fiber", "Rustic Heritage"],
    spiceLevel: 3,
    calories: "460 kcal",
    literalTranslation: "Dough balls with mash",
    culturalExplanation: "Ancient rustic delicacy from Bihar: whole-wheat dough balls stuffed with roasted gram flour ('sattu') seasoned with carom seeds (ajwain), nigella (kalonji), mustard oil, and pickle brine, baked over cow-dung or charcoal embers, drenched in molten desi ghee, and served with a fire-roasted eggplant and tomato mash ('chokha').",
    whyGenericFails: "Generic tools call it 'bread balls with mashed vegetables'. This strips away the rustic smoky char, the distinctive pungency of cold-pressed raw mustard oil, and its historic status as an all-weather ancient warrior ration.",
    flavorProfile: { spicy: 65, tangy: 60, savory: 85, sweet: 5, rich: 75 },
    keyIngredients: ["Roasted Gram Flour (Sattu)", "Whole Wheat", "Raw Mustard Oil", "Fire-Roasted Eggplant", "Garlic & Green Chilies", "Pure Desi Ghee"],
    allergens: ["Gluten", "Mustard Oil", "Dairy (Ghee)"],
    howToEat: "Crush the hot litti sphere between your palms to crack the crust, dunk it completely into molten ghee, and scoop a generous portion of spicy baingan-aloo chokha.",
    recommendedSides: [
      { name: "Tamatar ki Chutney", price: 40, image: "🍅" },
      { name: "Desi Ghee Dip Bowl", price: 50, image: "🧈" }
    ]
  }
];

// Healthcheck endpoint for Render
app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'SwadLipi AI Menu Translator',
    environment: process.env.RENDER ? 'Render Cloud Web Service' : 'Local Environment',
    version: '1.0.0'
  });
});

// System Information
app.get('/api/system-info', (req, res) => {
  res.json({
    service: 'SwadLipi Menu Translator AI Runtime',
    platform: process.env.RENDER ? 'Render.com Cloud Native' : 'Local Node.js Development',
    aiRuntime: process.env.GEMINI_API_KEY ? 'Google Gemini 2.5 Active' : 'SwadLipi Neural Culinary Knowledge Engine (Zero-Latency Fallback Active)',
    dishesAvailable: CULINARY_DB.length,
    languagesSupported: ['English', 'Hindi (हिंदी)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Bengali (বাংলা)', 'Marathi (मराठी)', 'Gujarati (ગુજરાતી)', 'French (Français)', 'German (Deutsch)', 'Spanish (Español)', 'Japanese (日本語)']
  });
});

// Get all dishes
app.get('/api/dishes', (req, res) => {
  res.json({ success: true, count: CULINARY_DB.length, dishes: CULINARY_DB });
});

// Deep Contextual Translator Endpoint
app.post('/api/translate', async (req, res) => {
  const { query, targetLanguage = 'English', dietaryPreference = 'All', userSpiceTolerance = 'Medium' } = req.body;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Please provide a dish or menu text to translate.' });
  }

  const cleanQuery = query.toLowerCase().trim();

  // Check if we have an exact or close match in our pre-indexed culinary database
  const matchedDish = CULINARY_DB.find(dish => 
    dish.name.toLowerCase().includes(cleanQuery) || 
    cleanQuery.includes(dish.name.toLowerCase().split(' ')[0]) ||
    (dish.vernacular && dish.vernacular.includes(query.trim()))
  );

  if (matchedDish) {
    return res.json({
      success: true,
      source: 'culinary_database',
      dish: matchedDish,
      targetLanguage,
      note: 'Decoded using SwadLipi Deep Culinary Context Engine'
    });
  }

  // If Gemini API is configured in Render environment variables
  if (process.env.GEMINI_API_KEY) {
    try {
      const prompt = `You are SwadLipi, an expert Indian culinary intelligence agent.
A user wants to translate and understand the Indian dish: "${query}" in language: "${targetLanguage}".
User dietary preference: "${dietaryPreference}". Spice tolerance: "${userSpiceTolerance}".

Output strict JSON with these keys:
{
  "name": "Proper English Dish Name",
  "vernacular": "Name in native Indian script (Devanagari, Tamil, etc)",
  "region": "Region of origin (e.g. Punjab, Chettinad, Bengal, Kerala, Gujarat, Awadh)",
  "category": "Meals | Sides | Snacks | Desserts | Beverages",
  "dietary": "Veg | Non-Veg | Egg",
  "dietaryTags": ["array of tags like Jain-friendly, Vegan, Gluten-Free, Halal"],
  "spiceLevel": number 0 to 4,
  "calories": "Estimated calories",
  "literalTranslation": "What generic tools incorrectly translate it to",
  "culturalExplanation": "Rich 2-3 sentence culinary explanation explaining cooking technique, mouthfeel, aroma",
  "whyGenericFails": "Explain exactly why standard translation tools fail for this dish",
  "flavorProfile": { "spicy": number 0-100, "tangy": number 0-100, "savory": number 0-100, "sweet": number 0-100, "rich": number 0-100 },
  "keyIngredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
  "allergens": ["Allergens like Dairy, Nuts, Gluten"],
  "howToEat": "Dining etiquette (utensils vs fingers, what to dip, order of eating)",
  "recommendedSides": [{"name": "Side Dish 1", "price": 60, "image": "🍲"}]
}`;

      // Call Gemini API via fetch
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (content) {
        const parsed = JSON.parse(content);
        parsed.id = 'gen-' + Date.now();
        parsed.price = parsed.price || 250;
        parsed.rating = 4.8;
        parsed.reviewsCount = 145;
        parsed.image = "/images/biryani.jpg";
        return res.json({ success: true, source: 'gemini_ai', dish: parsed, targetLanguage });
      }
    } catch (err) {
      console.error('Gemini API call failed, falling back to heuristic engine:', err.message);
    }
  }

  // Smart Heuristic Fallback Engine for custom queries
  const isSweet = /jamun|halwa|kheer|jalebi|rasgulla|laddu|peda|barfi|sandesh|payasam/i.test(cleanQuery);
  const isBread = /roti|naan|paratha|kulcha|puri|bhatura/i.test(cleanQuery);
  const isRice = /biryani|pulao|rice|bath|khichdi/i.test(cleanQuery);
  const isDrink = /lassi|chai|chaas|sharbat|coffee|rasam/i.test(cleanQuery);
  const isChaat = /chaat|puri|samosa|pakoda|kachori|tikki|vada/i.test(cleanQuery);

  const fallbackDish = {
    id: 'custom-' + Date.now(),
    name: query.charAt(0).toUpperCase() + query.slice(1),
    vernacular: "भारतीय व्यंजन",
    region: "Regional India",
    category: isDrink ? "Beverages" : isSweet ? "Desserts" : isChaat ? "Snacks" : isBread || isRice ? "Breads & Rice" : "Meals",
    price: 220,
    rating: 4.7,
    reviewsCount: 88,
    image: isSweet ? "/images/gulab_jamun.jpg" : isDrink ? "/images/lassi.jpg" : isChaat ? "/images/chaat.jpg" : isRice ? "/images/biryani.jpg" : "/images/paneer.jpg",
    dietary: /chicken|mutton|fish|prawn|egg|gosht|murgh|keema/i.test(cleanQuery) ? "Non-Veg" : "Veg",
    dietaryTags: ["Authentic Preparation", "Local Spices"],
    spiceLevel: isSweet ? 0 : 2,
    calories: "320 kcal",
    literalTranslation: `Literal translation fails to capture authentic Indian tempering and spices`,
    culturalExplanation: `An authentic preparation of ${query}, combining regional Indian herbs, toasted whole spices, and traditional cooking methods to create balanced aromas and distinct textures.`,
    whyGenericFails: `Generic translation tools translate words literally without understanding Indian cooking processes such as 'tadka' (tempering hot oil with spices), 'dum' (slow steam cooking), or fermented batters.`,
    flavorProfile: { spicy: isSweet ? 5 : 60, tangy: 40, savory: isSweet ? 10 : 80, sweet: isSweet ? 90 : 15, rich: 65 },
    keyIngredients: ["Regional Spice Blend", "Pure Desi Ghee or Cold-Pressed Oil", "Aromatic Herbs", "Core Produce"],
    allergens: ["May contain Dairy or Spices"],
    howToEat: isDrink ? "Sip chilled or steaming hot" : isSweet ? "Enjoy as a satisfying sweet finale" : "Best enjoyed fresh with matching Indian flatbreads or steamed basmati rice",
    recommendedSides: [
      { name: "Fresh Mint Chutney", price: 35, image: "🍃" },
      { name: "Roasted Masala Papad", price: 40, image: "🫓" }
    ]
  };

  return res.json({
    success: true,
    source: 'heuristic_culinary_engine',
    dish: fallbackDish,
    targetLanguage
  });
});

// Conversational AI Agent ("Maharaj AI") Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory = [], currentDish = null, userPreferences = {} } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  // If Gemini API is available
  if (process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `You are "Maharaj AI" (महाराज जी), a warm, cultured, and encyclopedic Indian restaurant food concierge and culinary guide.
You help diners, travelers, and food lovers understand Indian menus, decipher regional dishes, navigate spice levels, handle allergies (nut, dairy, gluten), and respect dietary restrictions (Pure Veg, Jain without onion/garlic, Halal, Sattvic).
Tone: Warm, welcoming, respectful, knowledgeable (like an affectionate master chef in a heritage Indian rasoi).
Current dish inspected: ${currentDish ? JSON.stringify(currentDish.name) : 'None'}.
User preferences: ${JSON.stringify(userPreferences)}.
Keep answers punchy, vivid, appetizing, and practical (2-4 paragraphs or formatted bullet points).`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
      const payload = {
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
        ]
      };

      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        return res.json({ success: true, reply, agent: 'Maharaj AI (Gemini 2.0 Flash)' });
      }
    } catch (err) {
      console.error('Chat Gemini call failed, using rule engine:', err.message);
    }
  }

  // Conversational Rule Engine
  const q = message.toLowerCase();
  let reply = "";

  if (q.includes("spice") || q.includes("spicy") || q.includes("hot") || q.includes("teekha")) {
    reply = `Namaste! Indian spice is never just about burning chili heat; it's about layer upon layer of fragrant aromatics like cardamom, cinnamon, cumin, and coriander.\n\n` +
      `• **For Mild / Low Heat**: Go for *Paneer Butter Masala*, *Malai Kofta*, *Korma*, or *Dal Makhani*. Ask the kitchen for *"Kam Mirchi"* (less chili).\n` +
      `• **The Secret Antidote**: If you bite into something spicy, never drink water! Order a cold **Kesar Mango Lassi** or a bowl of **Cucumber Raita** — the dairy fats and casein instantly dissolve the capsaicin molecules on your tongue!`;
  } else if (q.includes("jain") || q.includes("garlic") || q.includes("onion")) {
    reply = `A wonderful question! In authentic Jain cuisine, dishes are prepared without onions, garlic, potatoes, carrots, or any root vegetables beneath the earth.\n\n` +
      `• *South Indian*: Mysore Plain Dosa or Idlis with coconut-coriander chutney (verify no onion in sambhar).\n` +
      `• *North Indian*: Many restaurants can prepare *Jain Paneer Makhani* or *Dal Tadka* using hing (asafoetida) and ginger-tomato base instead of alliums.\n` +
      `• When ordering at any local dhaba, simply say: **"Bhaiya, Jain khana chahiye, bina pyaaz-lehsun aur aaloo ke."**`;
  } else if (q.includes("vegan") || q.includes("dairy") || q.includes("ghee") || q.includes("butter")) {
    reply = `Many Indian dishes are naturally plant-based, but pure desi ghee, butter, and yogurt are culturally revered in North Indian kitchens.\n\n` +
      `• **Safe Vegan Staples**: *Chana Masala*, *Aloo Gobi*, *Baingan Bharta*, *Pani Puri*, *Idli Sambar*, and *Steamed Basmati Rice*.\n` +
      `• **Crucial Pro-Tip**: Always request: **"Bina ghee aur bina makhan ke banaiye, sirf tel (vegetable/mustard oil) use kijiye."** (Make without ghee or butter, use cooking oil only).`;
  } else if (q.includes("how to eat") || q.includes("hands") || q.includes("etiquette") || q.includes("fork")) {
    reply = `Eating with your hands is an ancient Vedic sensory tradition! You engage all five senses — touch, sight, aroma, taste, and sound.\n\n` +
      `1. **Rule of the Right Hand**: Always use your right hand to tear flatbreads (Naan, Roti) and scoop curries. The left hand holds your water glass.\n` +
      `2. **Pani Puri**: Never bite into it halfway! Pop the whole sphere in your mouth in one shot.\n` +
      `3. **Dosas & Thalis**: Tear crisp dosa bits with your fingers, dip into chutneys. Eating with fingers lets your fingertips judge the temperature and texture before it hits your palate.`;
  } else if (q.includes("biryani") || (currentDish && currentDish.name.toLowerCase().includes("biryani"))) {
    reply = `Ah, the crown jewel of Indian feasts! Authentic Hyderabadi Dum Biryani is layered raw or half-cooked, sealed with atta (dough), and cooked on slow 'dum'.\n\n` +
      `• **Perfect Pairings**: Always pair with *Mirchi Ka Salan* (a tangy, nutty gravy made with green peppers, peanuts, and sesame seeds) and *Burani Raita* (whipped yogurt with garlic and roasted cumin).\n` +
      `• Look for long, unbroken grains of fragrant aged basmati rice dyed naturally with strands of Kashmiri saffron!`;
  } else {
    reply = `Pranam! I am **Maharaj AI**, your personal Indian culinary concierge.\n\n` +
      `Whether you want to understand what a strange Hindi dish name on a blackboard means, discover why generic Google translations fail for Indian food, or find dishes matching your dietary restrictions (Jain, Vegan, Gluten-Free, Low-Spice), I am at your service!\n\n` +
      `Try asking me:\n` +
      `• *"Why is Gulab Jamun called Rose Blackberry by generic translators?"*\n` +
      `• *"What dishes should I order if I cannot tolerate spicy chili?"*\n` +
      `• *"Can you recommend the best sides to accompany Biryani or Dal Makhani?"*`;
  }

  return res.json({
    success: true,
    reply,
    agent: 'Maharaj AI (SwadLipi Built-in Culinary Intelligence)'
  });
});

// Menu Scanner & Batch Parser
app.post('/api/scan-menu', (req, res) => {
  const { menuText } = req.body;

  if (!menuText || menuText.trim() === '') {
    return res.status(400).json({ error: 'Please provide raw menu text to parse.' });
  }

  // Parse lines, find dishes, prices, and match against culinary knowledge
  const lines = menuText.split(/\r?\n/).filter(line => line.trim().length > 0);
  const detectedItems = [];

  for (const line of lines) {
    const priceMatch = line.match(/(?:₹|Rs\.?|INR)?\s*(\d{2,4})/i);
    const price = priceMatch ? parseInt(priceMatch[1], 10) : 220;
    const nameCandidate = line.replace(/(?:₹|Rs\.?|INR)?\s*\d{2,4}/gi, '').trim();

    if (nameCandidate.length > 2) {
      // Find closest dish match
      const matched = CULINARY_DB.find(d => 
        nameCandidate.toLowerCase().includes(d.name.toLowerCase().split(' ')[0]) ||
        (d.vernacular && nameCandidate.includes(d.vernacular))
      );

      if (matched) {
        detectedItems.push({ ...matched, detectedName: nameCandidate, price: price || matched.price });
      } else {
        detectedItems.push({
          id: 'scanned-' + Math.random().toString(36).substr(2, 9),
          name: nameCandidate,
          vernacular: "स्थानीय विशेष",
          region: "Local Specialty",
          category: /tea|coffee|lassi|sharbat|shake/i.test(nameCandidate) ? "Beverages" :
                    /halwa|sweet|jamun|kulfi|ice cream/i.test(nameCandidate) ? "Desserts" :
                    /samosa|chaat|pakora|vada/i.test(nameCandidate) ? "Snacks" : "Meals",
          price: price,
          rating: 4.6,
          reviewsCount: 75,
          image: "/images/paneer.jpg",
          dietary: /chicken|mutton|fish|prawn|egg|kebab/i.test(nameCandidate) ? "Non-Veg" : "Veg",
          dietaryTags: ["Handcrafted in Kitchen"],
          spiceLevel: 2,
          calories: "320 kcal",
          literalTranslation: "Literal translation misses traditional preparation nuances",
          culturalExplanation: `Fresh local preparation of ${nameCandidate} using traditional regional spice combinations.`,
          whyGenericFails: "Generic tools translate words literally instead of recognizing regional culinary names and preparation styles.",
          flavorProfile: { spicy: 50, tangy: 30, savory: 75, sweet: 15, rich: 60 },
          keyIngredients: ["Fresh Local Spices", "Ghee or Oil", "Base Produce"],
          allergens: ["Ask server for specific allergens"],
          howToEat: "Best enjoyed fresh at the restaurant table.",
          recommendedSides: [{ name: "Papad & Chutney", price: 40, image: "🫓" }]
        });
      }
    }
  }

  res.json({
    success: true,
    totalParsed: detectedItems.length,
    items: detectedItems
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🍛 SwadLipi - Indian Restaurant Menu AI Translator`);
  console.log(`🌐 Server & AI Runtime running on http://localhost:${PORT}`);
  console.log(`🚀 Ready for Render Deployment (Cloud Web Service)`);
  console.log(`=======================================================`);
});
