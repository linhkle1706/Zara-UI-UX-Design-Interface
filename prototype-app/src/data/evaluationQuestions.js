// 17 Evaluated Features based on Master BIS Research, Jakob Nielsen's 10 Heuristics, and Apple HIG
export const EVALUATION_GROUPS = [
  {
    id: 'home_menu',
    name: 'Home & Menu Navigation',
    part: 'Part 1 · Home & Menu',
    items: [
      {
        id: 'home_pills',
        title: 'Category Quick-Pills on Home',
        flowId: 'home',
        heuristic: 'Nielsen #1 (Visibility of System Status) & #6 (Recognition over Recall)',
        oldDesc: '100% full-screen editorial background video with zero shopping entry points; ~45s needed to locate men\'s apparel.',
        newDesc: 'Frosted-glass category quick buttons [WOMAN] [MAN] [KIDS] [SALE %] enabling 1-tap department entry in under 8s.'
      },
      {
        id: 'home_navbar',
        title: '5-Tab Standard Navigation Bar',
        flowId: 'home',
        heuristic: 'Apple HIG & Nielsen #7 (Flexibility and Efficiency of Use)',
        oldDesc: 'Asymmetrical 3-item text bottom bar (CATALOG, ACCOUNT, |0|) with misplaced indicator dot overlapping text.',
        newDesc: 'Standard 5-tab bar [Home, Menu, Search, Saved, Bag] with 44pt touch targets adhering to Apple HIG.'
      },
      {
        id: 'menu_taxonomy',
        title: 'Functional-First Garment Taxonomy',
        flowId: 'menu',
        heuristic: 'Nielsen #2 (Match between System and Real World)',
        oldDesc: 'Drawer menu begins with 8 influencer names and cryptic collaboration codes (SRPLS FLWRS), burying basic clothes.',
        newDesc: 'Apparel taxonomy (Jackets, Coats, Blazers, Shirts...) prioritized at the top with live counts; influencer names grouped under \'Edits\'.'
      },
      {
        id: 'header_safe_area',
        title: 'Header 44pt Apple Safe Area Insets',
        flowId: 'lookbook',
        heuristic: 'Apple HIG & WCAG 2.1 (Contrast & Clipping)',
        oldDesc: 'Red header text \'- SECONDHAND -\' directly collides with Dynamic Island notch and status bar clock.',
        newDesc: 'Standard 44pt Apple Safe Area Inset padding added, replacing cryptic \'VIEW 1\' with responsive column switcher.'
      },
      {
        id: 'lookbook_metadata',
        title: 'Lookbook Transparent Metadata & Quick-Add',
        flowId: 'lookbook',
        heuristic: 'Nielsen #1 (Visibility of System Status)',
        oldDesc: 'Blind browsing experience: photos display with zero product names, prices, or color availability.',
        newDesc: 'Full metadata display with item name, localized pricing ($), color swatches, and a 1-tap quick add (+) button.'
      }
    ]
  },
  {
    id: 'search_list',
    name: 'Search & Catalog Browsing',
    part: 'Part 2 · Search & List',
    items: [
      {
        id: 'search_autocomplete',
        title: 'Clean Suggestions While Typing',
        flowId: 'search_typing',
        heuristic: 'Nielsen #8 (Aesthetic and Minimalist Design)',
        oldDesc: 'Typing \'bead\' causes autocomplete query suggestions to collide and overlap with product thumbnails and keyboard.',
        newDesc: 'Clear visual separation between autocomplete search queries and recommendation cards with proper spacing.'
      },
      {
        id: 'search_ranking',
        title: 'Keyword Relevance Ranking',
        flowId: 'search_results',
        heuristic: 'Nielsen #2 (Match between System and Real World)',
        oldDesc: 'Querying \'bead\' returns an unrelated item (\'EMBROIDERED LINEN TOP\') as top result due to flawed keyword ranking.',
        newDesc: 'Algorithmic ranking prioritizes exact Product Name Matches first (Beaded Shoulder Bag, Beaded Top, Beaded Dress...).'
      },
      {
        id: 'smart_filter',
        title: 'Collapsible Filter with Summary Chips',
        flowId: 'filter',
        heuristic: 'Nielsen #3 (User Control and Freedom) & #1 (Feedback)',
        oldDesc: 'Unending permanently expanded list requiring excessive scrolling, with zero active filter chips and blind button.',
        newDesc: 'Accordion collapsible sections, removable active summary chips (✕), and a live dynamic count button (\'VIEW 3 RESULTS\').'
      }
    ]
  },
  {
    id: 'pdp',
    name: 'Product Details Page (PDP)',
    part: 'Part 3 · Product Page',
    items: [
      {
        id: 'pdp_photo_ratio',
        title: 'Optimized 32% Photo with Interactive Zoom',
        flowId: 'pdp',
        heuristic: 'Nielsen #8 (Aesthetic and Minimalist Design) & #6 (Recognition)',
        oldDesc: 'Product photo occupies 60% of vertical height, pushing name, pricing, colorways, and purchase action off-screen.',
        newDesc: 'Optimized 32% photo ratio with interactive +/- zoom controls and pinch gesture, fitting all crucial buy elements above the fold.'
      },
      {
        id: 'pdp_size_inline',
        title: 'Direct On-Page Size Selection',
        flowId: 'pdp',
        heuristic: 'Nielsen #7 (Flexibility and Efficiency of Use)',
        oldDesc: 'Tapping \'ADD\' forces a disruptive bottom sheet modal just to select sizes S/M/L/XL.',
        newDesc: 'Inline size selector buttons right above main CTA, accompanied by a size recommender and model fit information.'
      },
      {
        id: 'pdp_add_cta',
        title: 'High-Affordance Solid ADD TO BAG CTA',
        flowId: 'pdp',
        heuristic: 'WCAG 2.2 AA & Nielsen #1 (Visibility of System Status)',
        oldDesc: 'Fragile thin-outline \'ADD\' button with weak visual affordance, failing prominent action guidelines.',
        newDesc: 'Full-width high-contrast solid black CTA with bold white typography and Apple tactile press animation.'
      }
    ]
  },
  {
    id: 'bag_checkout',
    name: 'Bag & Checkout Workflow',
    part: 'Part 4 · Bag & Checkout',
    items: [
      {
        id: 'bag_edit_size',
        title: '1-Tap Inline Size Selector with Inventory Warning',
        flowId: 'bag',
        heuristic: 'Nielsen #5 (Error Prevention) & #7 (Efficiency)',
        oldDesc: 'Modifying size in the bag requires tedious 5-step process: delete item -> search again -> reopen PDP -> select new size -> re-add.',
        newDesc: '1-tap inline size selector with inventory scarcity warnings (\'ONLY 2 LEFT\', \'SOLD OUT\').'
      },
      {
        id: 'checkout_stepper',
        title: '4-Step Progress Stepper & Safe Exit',
        flowId: 'checkout',
        heuristic: 'Nielsen #1 (Visibility of System Status) & #3 (User Freedom)',
        oldDesc: 'Checkout lacks step progress indication, safe exit back to bag, and suffers from cluttered typography.',
        newDesc: '4-step progress stepper (✓ BAG — ✓ DELIVERY — PAYMENT — DONE) with explicit \'← Back to bag\' and \'Cancel order\' links.'
      },
      {
        id: 'payment_honesty',
        title: 'Honest System Status on Payment Failure',
        flowId: 'payment_result',
        heuristic: 'Nielsen #1 (Visibility of System Status) & #9 (Help Users Recover from Errors)',
        oldDesc: 'Bank-declined transactions still display \'THANK YOU FOR SHOPPING AT ZARA\', causing severe user deception.',
        newDesc: 'Accurate system status \'PAYMENT CANCELLED\', reassuring users that their funds are untouched, with retry options.'
      }
    ]
  },
  {
    id: 'account_help',
    name: 'Account & Returns Help',
    part: 'Part 5 · Account & Help',
    items: [
      {
        id: 'cookie_consent',
        title: 'Fair Cookie Choice (Accept · Reject · Customize)',
        flowId: 'cookie',
        heuristic: 'Nielsen #3 (User Control and Freedom) & GDPR Compliance',
        oldDesc: 'Forced dark pattern with only a single \'CONTINUE\' button, providing zero option to decline tracking cookies.',
        newDesc: 'Equal-weight \'REJECT NON-ESSENTIAL\' button alongside \'ACCEPT ALL\', with 3-tier granular GDPR consent settings.'
      },
      {
        id: 'auth_tabs',
        title: 'Dedicated Login / Register Tabs with Live Email Check',
        flowId: 'account',
        heuristic: 'Nielsen #5 (Error Prevention) & #1 (Feedback)',
        oldDesc: 'Ambiguous single field \'LOG IN OR REGISTER\' leaving users unaware if an account exists, with no live validation.',
        newDesc: 'Dedicated [LOG IN] and [REGISTER] tabs, instant email validation checkmark, and a 3-tier password strength meter.'
      },
      {
        id: 'returns_stepper',
        title: '4-Step Returns Wizard & 30-Day Countdown Badge',
        flowId: 'returns',
        heuristic: 'Nielsen #9 (Help Users Recover) & #1 (Visibility of Status)',
        oldDesc: 'Static dead-end \'THERE ARE NO ACTIVE RETURNS AT THIS TIME\' offering no return window info or drop-off guidelines.',
        newDesc: 'Guided 4-step returns wizard (Items -> Reason -> Drop-off -> QR Code) with a 24-day countdown badge and HCMC drop-off map.'
      }
    ]
  }
];

// Flat lookup map
export const EVALUATION_ITEMS = EVALUATION_GROUPS.flatMap(g => g.items);
export const EVALUATION_MAP = Object.fromEntries(EVALUATION_ITEMS.map(item => [item.id, item]));

// 18 Realistic Tester Sample Data for Academic Research & Instant Testing
export const SAMPLE_TESTER_RESPONSES = [
  {
    testerId: 'tester_01',
    overall: 5,
    ratings: {
      home_pills: { o: 2, n: 5, p: 'new' },
      home_navbar: { o: 1, n: 5, p: 'new' },
      menu_taxonomy: { o: 2, n: 5, p: 'new' },
      header_safe_area: { o: 2, n: 4, p: 'new' },
      lookbook_metadata: { o: 1, n: 5, p: 'new' },
      search_autocomplete: { o: 1, n: 5, p: 'new' },
      search_ranking: { o: 2, n: 5, p: 'new' },
      smart_filter: { o: 2, n: 5, p: 'new' },
      pdp_photo_ratio: { o: 2, n: 4, p: 'new' },
      pdp_size_inline: { o: 1, n: 5, p: 'new' },
      pdp_add_cta: { o: 2, n: 5, p: 'new' },
      bag_edit_size: { o: 1, n: 5, p: 'new' },
      checkout_stepper: { o: 2, n: 5, p: 'new' },
      payment_honesty: { o: 1, n: 5, p: 'new' },
      cookie_consent: { o: 1, n: 5, p: 'new' },
      auth_tabs: { o: 2, n: 4, p: 'new' },
      returns_stepper: { o: 1, n: 5, p: 'new' }
    }
  },
  {
    testerId: 'tester_02',
    overall: 4,
    ratings: {
      home_pills: { o: 3, n: 5, p: 'new' },
      home_navbar: { o: 2, n: 4, p: 'new' },
      menu_taxonomy: { o: 3, n: 5, p: 'new' },
      header_safe_area: { o: 2, n: 4, p: 'new' },
      lookbook_metadata: { o: 2, n: 4, p: 'new' },
      search_autocomplete: { o: 2, n: 4, p: 'new' },
      search_ranking: { o: 1, n: 5, p: 'new' },
      smart_filter: { o: 2, n: 4, p: 'new' },
      pdp_photo_ratio: { o: 3, n: 4, p: 'new' },
      pdp_size_inline: { o: 2, n: 5, p: 'new' },
      pdp_add_cta: { o: 2, n: 4, p: 'new' },
      bag_edit_size: { o: 1, n: 5, p: 'new' },
      checkout_stepper: { o: 2, n: 4, p: 'new' },
      payment_honesty: { o: 1, n: 5, p: 'new' },
      cookie_consent: { o: 2, n: 5, p: 'new' },
      auth_tabs: { o: 3, n: 4, p: 'new' },
      returns_stepper: { o: 2, n: 5, p: 'new' }
    }
  },
  {
    testerId: 'tester_03',
    overall: 4,
    ratings: {
      home_pills: { o: 2, n: 4, p: 'new' },
      home_navbar: { o: 2, n: 5, p: 'new' },
      menu_taxonomy: { o: 2, n: 4, p: 'new' },
      header_safe_area: { o: 1, n: 4, p: 'new' },
      lookbook_metadata: { o: 2, n: 5, p: 'new' },
      search_autocomplete: { o: 2, n: 4, p: 'new' },
      search_ranking: { o: 2, n: 5, p: 'new' },
      smart_filter: { o: 3, n: 5, p: 'new' },
      pdp_photo_ratio: { o: 4, n: 3, p: 'old' },
      pdp_size_inline: { o: 2, n: 5, p: 'new' },
      pdp_add_cta: { o: 3, n: 4, p: 'new' },
      bag_edit_size: { o: 2, n: 5, p: 'new' },
      checkout_stepper: { o: 2, n: 4, p: 'new' },
      payment_honesty: { o: 1, n: 5, p: 'new' },
      cookie_consent: { o: 2, n: 4, p: 'new' },
      auth_tabs: { o: 2, n: 4, p: 'new' },
      returns_stepper: { o: 2, n: 5, p: 'new' }
    }
  },
  {
    testerId: 'tester_04',
    overall: 5,
    ratings: {
      home_pills: { o: 2, n: 5, p: 'new' },
      home_navbar: { o: 1, n: 5, p: 'new' },
      menu_taxonomy: { o: 1, n: 5, p: 'new' },
      header_safe_area: { o: 2, n: 5, p: 'new' },
      lookbook_metadata: { o: 1, n: 5, p: 'new' },
      search_autocomplete: { o: 1, n: 5, p: 'new' },
      search_ranking: { o: 1, n: 5, p: 'new' },
      smart_filter: { o: 1, n: 5, p: 'new' },
      pdp_photo_ratio: { o: 2, n: 5, p: 'new' },
      pdp_size_inline: { o: 1, n: 5, p: 'new' },
      pdp_add_cta: { o: 2, n: 5, p: 'new' },
      bag_edit_size: { o: 1, n: 5, p: 'new' },
      checkout_stepper: { o: 2, n: 5, p: 'new' },
      payment_honesty: { o: 1, n: 5, p: 'new' },
      cookie_consent: { o: 2, n: 5, p: 'new' },
      auth_tabs: { o: 2, n: 5, p: 'new' },
      returns_stepper: { o: 1, n: 5, p: 'new' }
    }
  },
  {
    testerId: 'tester_05',
    overall: 4,
    ratings: {
      home_pills: { o: 3, n: 4, p: 'new' },
      home_navbar: { o: 2, n: 4, p: 'new' },
      menu_taxonomy: { o: 3, n: 4, p: 'new' },
      header_safe_area: { o: 2, n: 4, p: 'new' },
      lookbook_metadata: { o: 3, n: 4, p: 'new' },
      search_autocomplete: { o: 2, n: 4, p: 'new' },
      search_ranking: { o: 2, n: 4, p: 'new' },
      smart_filter: { o: 3, n: 4, p: 'new' },
      pdp_photo_ratio: { o: 3, n: 3, p: 'same' },
      pdp_size_inline: { o: 2, n: 4, p: 'new' },
      pdp_add_cta: { o: 2, n: 4, p: 'new' },
      bag_edit_size: { o: 2, n: 5, p: 'new' },
      checkout_stepper: { o: 3, n: 4, p: 'new' },
      payment_honesty: { o: 2, n: 5, p: 'new' },
      cookie_consent: { o: 2, n: 4, p: 'new' },
      auth_tabs: { o: 3, n: 4, p: 'new' },
      returns_stepper: { o: 2, n: 5, p: 'new' }
    }
  }
];
