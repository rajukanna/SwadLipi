// SwadLipi Client-Side Indian Culinary Intelligence & Translation Data
const REGIONAL_MENUS = {
  dhaba: {
    name: "Sher-e-Punjab Heritage Dhaba",
    region: "Punjab & Delhi",
    dishes: [
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
        id: "mango-lassi",
        name: "Kesar Mango Lassi",
        vernacular: "केसर आम की लस्सी",
        region: "Punjab & Delhi",
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
      }
    ]
  },
  udupi: {
    name: "Sri Krishna Udupi Bhavan",
    region: "Udupi & Tamil Nadu",
    dishes: [
      {
        id: "masala-dosa",
        name: "Mysore Masala Dosa",
        vernacular: "ಮೈಸೂರು ಮಸಾಲ ದೋಸೆ",
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
      }
    ]
  },
  hyderabad: {
    name: "Bawarchi Nizami Rasoi",
    region: "Awadh & Hyderabad",
    dishes: [
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
        spiceLevel: 3,
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
        id: "gulab-jamun",
        name: "Shahi Gulab Jamun",
        vernacular: "शाही गुलाब जामुन",
        region: "Awadh & Hyderabad",
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
      }
    ]
  },
  chaat: {
    name: "Purani Dilli Chaat Gali",
    region: "Street Food (All India)",
    dishes: [
      {
        id: "pani-puri",
        name: "Pani Puri / Gol Gappe",
        vernacular: "पानी पूरी / गोल गप्पे",
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
      }
    ]
  }
};

window.REGIONAL_MENUS = REGIONAL_MENUS;
