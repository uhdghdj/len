
(() => {
  "use strict";

  const SUPABASE_URL = "https://nmtdliqubfpextwdfqkf.supabase.co";
  const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tdGRsaXF1YmZwZXh0d2RmcWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNzE0MjUsImV4cCI6MjEwNjc0NzQyNX0.9XrmjJ9usGauKu82L82DyL5dAt_YhfwZXq5uq55I2NY";
  const CURRENT_STORE_WHATSAPP = "201044285043";
  const REST = `${SUPABASE_URL}/rest/v1`;
  const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };
  const $ = selector => document.querySelector(selector);

  const governorates = [
    { id: "dakahlia", ar: "الدقهلية", en: "Dakahlia", fee: 65 },
    { id: "alexandria", ar: "الإسكندرية", en: "Alexandria", fee: 75 },
    { id: "cairo", ar: "القاهرة", en: "Cairo", fee: 75 },
    { id: "giza", ar: "الجيزة", en: "Giza", fee: 75 },
    { id: "qalyubia", ar: "القليوبية", en: "Qalyubia", fee: 75 },
    { id: "beheira", ar: "البحيرة", en: "Beheira", fee: 75 },
    { id: "gharbia", ar: "الغربية", en: "Gharbia", fee: 75 },
    { id: "monufia", ar: "المنوفية", en: "Monufia", fee: 75 },
    { id: "damietta", ar: "دمياط", en: "Damietta", fee: 75 },
    { id: "kafr-el-sheikh", ar: "كفر الشيخ", en: "Kafr El Sheikh", fee: 75 },
    { id: "matrouh", ar: "مطروح", en: "Matrouh", fee: 130 },
    { id: "ismailia", ar: "الإسماعيلية", en: "Ismailia", fee: 90 },
    { id: "suez", ar: "السويس", en: "Suez", fee: 90 },
    { id: "port-said", ar: "بورسعيد", en: "Port Said", fee: 90 },
    { id: "sharqia", ar: "الشرقية", en: "Sharqia", fee: 75 },
    { id: "faiyum", ar: "الفيوم", en: "Faiyum", fee: 105 },
    { id: "beni-suef", ar: "بني سويف", en: "Beni Suef", fee: 105 },
    { id: "minya", ar: "المنيا", en: "Minya", fee: 105 },
    { id: "asyut", ar: "أسيوط", en: "Asyut", fee: 105 },
    { id: "sohag", ar: "سوهاج", en: "Sohag", fee: 125 },
    { id: "qena", ar: "قنا", en: "Qena", fee: 125 },
    { id: "aswan", ar: "أسوان", en: "Aswan", fee: 125 },
    { id: "luxor", ar: "الأقصر", en: "Luxor", fee: 125 },
    { id: "red-sea", ar: "البحر الأحمر", en: "Red Sea", fee: 125 },
    { id: "new-valley", ar: "الوادي الجديد", en: "New Valley", fee: 130 },
    { id: "north-sinai", ar: "شمال سيناء", en: "North Sinai", fee: 130 },
    { id: "south-sinai", ar: "جنوب سيناء", en: "South Sinai", fee: 130 }
  ];

  const state = {
    lang: "ar",
    products: [],
    categories: [],
    settings: {},
    category: "all",
    query: "",
    cart: readCart()
  };

  const dictionary = {
    ar: {
      announcement: "شحن لجميع المحافظات · اكتشفي جمالك بطريقتك مع LEN",
      home: "الرئيسية", shop: "المتجر", story: "قصتنا", contact: "تواصلي معنا",
      heroEyebrow: "ميكاب وعناية بالبشرة",
      heroTitle: "اكتشفي جمالك بطريقتك",
      heroText: "دعي كل تفصيلة تحكي عنكِ — منتجات مختارة بعناية لميكابكِ وعناية بشرتكِ.",
      shopNow: "تسوّقي الآن", carefullyChosen: "مختارة بعناية",
      carefullyChosenText: "منتجات نحبها ونثق بها", madeForYou: "صُنعت لأجلكِ",
      madeForYouText: "تجربة جمال رقيقة وبسيطة", fastDelivery: "توصيل سريع",
      fastDeliveryText: "لباب بيتك في كل المحافظات", collection: "مجموعة LEN",
      discover: "اكتشفي مفضلاتك", searchPlaceholder: "ابحثي عن منتج...",
      loading: "جارٍ تحميل المنتجات...", ourStory: "قصتنا",
      storyTitle: "لأن الجمال شعور قبل أن يكون مظهرًا",
      storyText: "بدأت LEN بحب التفاصيل الأنثوية الصغيرة. نختار كل منتج ليضيف لحظتكِ الخاصة من الثقة والدلال.",
      exploreCollection: "اكتشفي المجموعة ←", footerText: "جمالكِ الطبيعي هو مصدر إلهامنا.",
      quickLinks: "روابط سريعة", customerCare: "خدمة العملاء",
      supportHours: "يوميًا من 10 صباحًا إلى 10 مساءً", followUs: "تابعينا",
      rights: "جميع الحقوق محفوظة.", yourCart: "سلة مشترياتك", all: "الكل",
      add: "أضيفي للسلة", soldOut: "نفد المخزون", new: "جديد", empty: "لا توجد منتجات مطابقة.",
      cartEmpty: "سلة مشترياتك فارغة.", subtotal: "قيمة المنتجات", checkout: "إتمام الطلب",
      remove: "حذف", inStock: "متوفر", quantity: "الكمية",
      checkoutTitle: "بيانات التوصيل", fullName: "الاسم بالكامل",
      phone: "رقم الهاتف", secondPhone: "رقم إضافي (اختياري)",
      governorate: "اختاري المحافظة", address: "العنوان بالكامل بالتفصيل",
      notes: "ملاحظات (اختياري)", payment: "طريقة الدفع", instapay: "InstaPay",
      vodafone: "Vodafone Cash", deposit: "العربون المطلوب",
      placeOrder: "تأكيد الطلب", required: "يرجى إكمال جميع البيانات المطلوبة.",
      added: "تمت إضافة المنتج للسلة", orderSuccess: "تم استلام طلبك بنجاح",
      orderNumber: "رقم الطلب", orderError: "تعذر إرسال الطلب الآن. حاولي مرة أخرى.",
      details: "التفاصيل", shipping: "الشحن", orderTotal: "الإجمالي شامل الشحن",
      chooseGovernorate: "اختاري المحافظة لحساب الشحن",
      shippingRule: "سعر الشحن اتحدد طبقًا لمحافظتك ولشحنة وزنها 2 كجم. للعلم كل كجم زيادة = 10ج. للتأكد من سعر الشحن",
      deliveryRule: "مدة التوصيل من 3 إلى 5 أيام، بدءًا من تاني يوم بعد الطلب، والجمعة والسبت إجازة ومبيتحسبوش.",
      shipmentWeight: "الوزن المحتسب للشحنة", estimated: "تقديري",
      currencySuffix: "جنيه", free: "—"
    }
  };

  const t = key => dictionary.ar[key] || key;
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const productNameEnglish = product => product.name_en || product.name_ar || "";
  const productNameArabic = product => product.name_ar && product.name_ar !== product.name_en
    ? product.name_ar
    : "";
  const description = product => product.description_ar || product.description_en || "";
  const categoryName = category => String(category.name_ar || category.name_en || "")
    .replaceAll("مكياج", "ميكاب");
  const productImage = product => product.image_url || product.images?.[0]?.image_url || "";
  const categoryImage = category => {
    const direct = category.image_url || category.cover_image_url || category.image ||
      category.thumbnail_url || category.photo_url;
    if (direct) return direct;
    const product = state.products.find(item => String(item.category_id) === String(category.id));
    return product ? productImage(product) : "";
  };
  const formatNumber = (value, options = {}) => Number(value || 0).toLocaleString("en-US", options);
  const money = value => {
    const amount = formatNumber(value, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${amount} ${state.settings.currency || t("currencySuffix")}`;
  };
  const productDiscountPercent = product => {
    const percentage = Number(product?.discount_percentage ?? 0);
    return Number.isFinite(percentage) && percentage > 0 && percentage <= 100
      ? percentage
      : 0;
  };
  const productUnitPrice = product => {
    const price = Number(product?.price || 0);
    const percentage = productDiscountPercent(product);
    return Number((price * (1 - percentage / 100)).toFixed(2));
  };
  const productPriceMarkup = product => productDiscountPercent(product)
    ? `<span class="price product-price-discounted"><s class="product-price-old">${money(product.price)}</s><strong class="product-price-current">${money(productUnitPrice(product))}</strong></span>`
    : `<span class="price">${money(product.price)}</span>`;
  const productDiscountBadge = product => {
    const percentage = productDiscountPercent(product);
    return percentage
      ? `<span class="product-discount-badge">خصم ${formatNumber(percentage, { maximumFractionDigits: 2 })}%</span>`
      : "";
  };
  function ensureProductDiscountStyles() {
    if ($("#lenProductDiscountStyles")) return;
    const style = document.createElement("style");
    style.id = "lenProductDiscountStyles";
    style.textContent = `
      #productGrid .product-media { position: relative; }
      #productGrid .product-discount-badge { position: absolute; z-index: 2; top: 12px; left: 12px; padding: 6px 10px; border-radius: 3px; background: #651d31; color: #fff; font-size: 12px; font-weight: 700; line-height: 1.2; }
      .product-price-discounted { display: inline-flex; align-items: baseline; flex-wrap: wrap; gap: 8px; }
      .product-price-old { color: #8b817d; font-size: .78em; font-weight: 400; text-decoration: line-through; }
      .product-price-current { color: #651d31; font-weight: 700; }
    `;
    document.head.append(style);
  }

  function normalizedWhatsAppNumber(value) {
    if (!value) return "";
    const digits = String(value).replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
      .replace(/[^\d]/g, "");
    const international = digits.startsWith("00") ? digits.slice(2)
      : digits.startsWith("0") ? `20${digits.slice(1)}`
        : digits.startsWith("20") ? digits
          : `20${digits}`;
    return /^201[0125]\d{8}$/.test(international) ? international : "";
  }

  function storeWhatsAppNumber() {
    const configured = Object.entries(state.settings || {})
      .filter(([key]) => /whatsapp|wa_?phone|phone_?wa/i.test(key))
      .map(([, value]) => normalizedWhatsAppNumber(value))
      .find(Boolean);
    return configured || CURRENT_STORE_WHATSAPP;
  }

  function whatsappUrl(message = "", phone = "") {
    const suffix = message ? `?text=${encodeURIComponent(message)}` : "";
    const number = normalizedWhatsAppNumber(phone) || storeWhatsAppNumber();
    return `https://wa.me/${number}${suffix}`;
  }

  function displayWhatsAppNumber() {
    const number = storeWhatsAppNumber();
    return `0${number.slice(2, 4)} ${number.slice(4)}`;
  }

  function formatPaymentPhone(value) {
    if (value == null || typeof value === "object") return "";
    const raw = String(value).trim().replace(/[٠-٩]/g, digit =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
    );
    const digits = raw.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) return "";
    if (digits.startsWith("20") && digits.length === 12) return `0${digits.slice(2)}`;
    if (digits.length === 10 && digits.startsWith("1")) return `0${digits}`;
    return raw;
  }

  function flattenSettings(value, prefix = "", result = []) {
    if (!value || typeof value !== "object") return result;
    Object.entries(value).forEach(([key, entry]) => {
      const name = prefix ? `${prefix}_${key}` : key;
      if (entry && typeof entry === "object" && !Array.isArray(entry)) {
        flattenSettings(entry, name, result);
      } else {
        result.push([name.toLowerCase(), entry]);
      }
    });
    return result;
  }

  function paymentRecipientPhone(paymentMethod) {
    const methodPattern = paymentMethod === "instapay"
      ? /insta.?pay/i
      : /vodafone|vf.?cash/i;
    const entries = flattenSettings(state.settings);
    const specific = entries.find(([key, value]) =>
      methodPattern.test(key) && formatPaymentPhone(value)
    );
    if (specific) return formatPaymentPhone(specific[1]);

    const generic = entries.find(([key, value]) =>
      !/whatsapp|wa_?phone/i.test(key) &&
      /(payment|transfer|recipient|receiver|wallet|account)/i.test(key) &&
      /(phone|mobile|number)/i.test(key) &&
      formatPaymentPhone(value)
    );
    return generic ? formatPaymentPhone(generic[1]) : "";
  }

  function renderWhatsAppLinks() {
    document.querySelectorAll("[data-whatsapp-link]").forEach(link => {
      link.href = whatsappUrl();
      link.querySelectorAll("[data-whatsapp-display]").forEach(node => {
        node.textContent = displayWhatsAppNumber();
      });
    });
  }

  function readCart() {
    try {
      const cart = JSON.parse(localStorage.getItem("len-cart") || "[]");
      return Array.isArray(cart) ? cart.filter(row => row && row.id != null && Number(row.quantity) > 0) : [];
    } catch {
      return [];
    }
  }

  function toast(message) {
    const node = $("#toast");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove("show"), 2600);
  }

  async function get(path) {
    const response = await fetch(`${REST}${path}`, { headers });
    const body = await response.json();
    if (!response.ok) throw new Error(body.message || "Request failed");
    return body;
  }

  async function load() {
    try {
      ensureProductDiscountStyles();
      const [categories, products, settings] = await Promise.all([
        get("/categories?select=*&order=name_en"),
        get("/products?select=*,category:categories(*),images:product_images(*)&is_active=eq.true&order=created_at.desc"),
        get("/store_settings?select=*&limit=1")
      ]);
      state.categories = categories;
      state.products = products;
      state.settings = settings[0] || {};
      renderWhatsAppLinks();
      renderCategories();
      renderProducts();
      renderCart();
    } catch (error) {
      console.error(error);
      $("#productGrid").innerHTML = `<div class="empty">${t("orderError")}</div>`;
    }
  }

  function applyLanguage() {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    document.body.dir = "rtl";
    document.querySelectorAll("[data-i18n]").forEach(node => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(node => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    renderCategories();
    renderProducts();
    renderCart();
  }

  function renderCategories() {
    const holder = $("#categoryTabs");
    if (!holder) return;
    const allImage = state.products.map(productImage).find(Boolean) || "";
    const cards = [{
      id: "all",
      label: t("all"),
      image: allImage,
      count: state.products.length,
      lang: "ar"
    }, ...state.categories.map(category => ({
      id: String(category.id),
      label: categoryName(category),
      image: categoryImage(category),
      count: state.products.filter(product => String(product.category_id) === String(category.id)).length,
      lang: category.name_ar ? "ar" : "en"
    }))];
    holder.innerHTML = cards.map(card => `
      <button class="category-card${state.category === card.id ? " active" : ""}"
        data-category="${esc(card.id)}" aria-pressed="${state.category === card.id}">
        <span class="category-card-media">
          ${card.image
            ? `<img src="${esc(card.image)}" alt="" loading="lazy">`
            : `<span class="category-card-placeholder" aria-hidden="true">LEN</span>`}
          <span class="category-card-count">${formatNumber(card.count)}</span>
        </span>
        <span class="category-card-name" lang="${card.lang}" dir="${card.lang === "ar" ? "rtl" : "ltr"}">${esc(card.label)}</span>
      </button>
    `).join("");
  }

  function renderProducts() {
    const holder = $("#productGrid");
    if (!holder) return;
    const query = state.query.trim().toLowerCase();
    const items = state.products.filter(product =>
      (state.category === "all" || String(product.category_id) === state.category) &&
      (!query || `${product.name_ar || ""} ${product.name_en || ""}`.toLowerCase().includes(query))
    );
    holder.innerHTML = items.length ? items.map(product => `
      <article class="product-card">
        <div class="product-media" data-product="${esc(product.id)}">
          ${productImage(product)
            ? `<img src="${esc(productImage(product))}" alt="${esc(productNameEnglish(product))}" loading="lazy">`
            : `<div class="product-placeholder">LEN</div>`}
          <span class="badge">${Number(product.stock_quantity) > 0 ? t("inStock") : t("soldOut")}</span>
          ${productDiscountBadge(product)}
          ${Number(product.stock_quantity) > 0
            ? `<button class="quick-add" data-add="${esc(product.id)}">${t("add")}</button>`
            : ""}
        </div>
        <div class="product-info">
          <small lang="${product.category?.name_ar ? "ar" : "en"}"
            dir="${product.category?.name_ar ? "rtl" : "ltr"}">${esc(categoryName(product.category || {}))}</small>
          <h3 class="product-name-en" lang="en" dir="ltr">${esc(productNameEnglish(product))}</h3>
          ${productNameArabic(product)
            ? `<p class="product-name-ar" lang="ar" dir="rtl">${esc(productNameArabic(product))}</p>`
            : ""}
          ${productPriceMarkup(product)}
        </div>
      </article>
    `).join("") : `<div class="empty">${t("empty")}</div>`;
  }

  function saveCart() {
    localStorage.setItem("len-cart", JSON.stringify(state.cart));
    renderCart();
  }

  function addToCart(id) {
    const product = state.products.find(item => String(item.id) === String(id));
    if (!product || Number(product.stock_quantity) <= 0) return;
    const row = state.cart.find(item => String(item.id) === String(id));
    if (row) row.quantity = Math.min(row.quantity + 1, Number(product.stock_quantity));
    else state.cart.push({ id: product.id, quantity: 1 });
    saveCart();
    toast(t("added"));
  }

  function cartProducts() {
    return state.cart.map(row => ({
      row,
      product: state.products.find(item => String(item.id) === String(row.id))
    })).filter(item => item.product);
  }

  function cartTotal() {
    return cartProducts().reduce((sum, item) =>
      sum + productUnitPrice(item.product) * item.row.quantity, 0);
  }

  function renderCart() {
    const items = cartProducts();
    $("#cartCount").textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    $("#cartItems").innerHTML = items.length ? items.map(({ row, product }) => `
      <div class="cart-row">
        ${productImage(product)
          ? `<img src="${esc(productImage(product))}" alt="">`
          : `<div class="mini-placeholder">LEN</div>`}
        <div>
          <h4 class="product-name-en" lang="en" dir="ltr">${esc(productNameEnglish(product))}</h4>
          ${productNameArabic(product)
            ? `<small class="cart-name-ar" lang="ar" dir="rtl">${esc(productNameArabic(product))}</small>`
            : ""}
          ${productPriceMarkup(product)}
          <div class="quantity">
            <button data-qty="${esc(product.id)}" data-delta="-1" aria-label="−">−</button>
            <span>${row.quantity}</span>
            <button data-qty="${esc(product.id)}" data-delta="1" aria-label="+">+</button>
          </div>
        </div>
        <button class="remove" data-remove="${esc(product.id)}" aria-label="${t("remove")}">×</button>
      </div>
    `).join("") : `<div class="empty">${t("cartEmpty")}</div>`;
    $("#cartSummary").innerHTML = items.length ? `
      <div class="summary-line"><b>${t("subtotal")}</b><b class="price">${money(cartTotal())}</b></div>
      <button class="checkout-button" id="checkoutButton">${t("checkout")}</button>
    ` : "";
  }

  function openCart(open = true) {
    $("#cartDrawer").classList.toggle("open", open);
    $("#backdrop").classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  function showProduct(id) {
    const product = state.products.find(item => String(item.id) === String(id));
    if (!product) return;
    $("#productDetails").innerHTML = `
      <div class="dialog-product">
        ${productImage(product)
          ? `<img src="${esc(productImage(product))}" alt="${esc(productNameEnglish(product))}">`
          : `<div class="detail-placeholder">LEN</div>`}
        <div class="dialog-copy">
          <p class="eyebrow" lang="${product.category?.name_ar ? "ar" : "en"}"
            dir="${product.category?.name_ar ? "rtl" : "ltr"}">${esc(categoryName(product.category || {}))}</p>
          <h2 class="product-name-en" lang="en" dir="ltr">${esc(productNameEnglish(product))}</h2>
          ${productNameArabic(product)
            ? `<p class="product-name-ar dialog-name-ar" lang="ar" dir="rtl">${esc(productNameArabic(product))}</p>`
            : ""}
          ${productPriceMarkup(product)}
          <p class="description" lang="${product.description_ar ? "ar" : "en"}"
            dir="${product.description_ar ? "rtl" : "ltr"}">${esc(description(product))}</p>
          <p class="stock">${Number(product.stock_quantity) > 0
            ? `${t("inStock")} · ${product.stock_quantity}`
            : t("soldOut")}</p>
          ${Number(product.stock_quantity) > 0
            ? `<button class="primary-button" data-add="${esc(product.id)}">${t("add")}</button>`
            : ""}
        </div>
      </div>
    `;
    $("#productDialog").showModal();
  }

  function productWeightKg(product) {
    const kg = Number(product.shipping_weight_kg ?? product.weight_kg);
    if (Number.isFinite(kg) && kg > 0) return kg;
    const grams = Number(product.shipping_weight_grams ?? product.weight_grams);
    if (Number.isFinite(grams) && grams > 0) return grams / 1000;
    return null;
  }

  function shipmentWeight() {
    const items = cartProducts();
    const weights = items.map(({ product }) => productWeightKg(product));
    // Do not undercharge mixed/unknown carts: when any product has no saved
    // weight, use a transparent 1 kg estimate for the whole shipment.
    const complete = items.length > 0 && weights.every(weight => weight !== null);
    const weightKg = complete
      ? items.reduce((sum, item, index) => sum + weights[index] * item.row.quantity, 0)
      : 1;
    return { weightKg: Math.max(weightKg, 0.01), estimated: !complete };
  }

  function shippingCost(governorateId) {
    const region = governorates.find(item => item.id === governorateId);
    if (!region) return 0;
    const { weightKg } = shipmentWeight();
    const extraKilos = Math.max(0, Math.ceil(weightKg - 2 - 1e-9));
    return region.fee + extraKilos * 10;
  }

  function renderCheckoutSummary() {
    const summary = $("#orderTotals");
    if (!summary) return;
    const governorateId = $("#governorateSelect")?.value || "";
    const selectedRegion = governorates.find(item => item.id === governorateId);
    const weight = shipmentWeight();
    const shipping = selectedRegion ? shippingCost(governorateId) : null;
    const orderTotal = cartTotal() + (shipping || 0);
    const depositPercent = Number(state.settings.deposit_percentage ?? 30);
    const deposit = orderTotal * depositPercent / 100;
    const weightText = `${formatNumber(weight.weightKg, {
      maximumFractionDigits: 2
    })} كجم${weight.estimated ? ` (${t("estimated")})` : ""}`;

    summary.innerHTML = `
      <div class="summary-line"><span>${t("subtotal")}</span><b class="price">${money(cartTotal())}</b></div>
      <div class="summary-line"><span>${t("shipping")}${selectedRegion ? ` · ${esc(selectedRegion.ar)}` : ""}</span>
        <b class="price">${shipping === null ? t("free") : money(shipping)}</b></div>
      <div class="summary-line"><span>${t("shipmentWeight")}</span><span>${weightText}</span></div>
      <div class="shipping-note">
        <p>${t("shippingRule")} <a data-whatsapp-link href="#">تواصل واتساب</a>.</p>
        <p>${t("deliveryRule")}</p>
      </div>
      <div class="summary-line grand-total"><b>${t("orderTotal")}</b><b class="price">${money(orderTotal)}</b></div>
      <div class="summary-line"><span>${t("deposit")} (${formatNumber(depositPercent)}%)</span><b class="price">${money(deposit)}</b></div>
    `;
    renderWhatsAppLinks();
    renderPaymentInstructions();
  }

  function renderPaymentInstructions() {
    const paymentMethod = $("#paymentMethod")?.value || "instapay";
    const methodName = paymentMethod === "instapay" ? "InstaPay" : "Vodafone Cash";
    const phone = paymentRecipientPhone(paymentMethod);
    const useTransferNumberForWhatsApp = Boolean(normalizedWhatsAppNumber(phone));
    const phoneNode = $("#checkoutTransferPhone");
    const methodNode = $("#checkoutPaymentMethod");
    const contactNote = $("#checkoutContactInstruction");
    const whatsappLink = $("#checkoutWhatsappLink");

    if (phoneNode) phoneNode.textContent = phone || "غير مسجل في إعدادات المتجر";
    if (methodNode) methodNode.textContent = methodName;
    if (contactNote) {
      contactNote.textContent = useTransferNumberForWhatsApp
        ? "بعد التحويل، برجاء التواصل معنا عبر واتساب على نفس الرقم وإرسال صورة التحويل ورقم الطلب لتأكيد الأوردر."
        : `بعد التحويل، برجاء التواصل معنا عبر واتساب على رقم خدمة العملاء ${displayWhatsAppNumber()} وإرسال صورة التحويل ورقم الطلب لتأكيد الأوردر.`;
    }
    if (whatsappLink) {
      whatsappLink.href = whatsappUrl("", useTransferNumberForWhatsApp ? phone : "");
      whatsappLink.textContent = useTransferNumberForWhatsApp
        ? "التواصل عبر واتساب على نفس الرقم"
        : `واتساب خدمة العملاء · ${displayWhatsAppNumber()}`;
    }
  }

  function checkout() {
    const depositPercent = Number(state.settings.deposit_percentage ?? 30);
    $("#checkoutContent").innerHTML = `
      <div class="checkout-wrap">
        <p class="eyebrow">LEN</p>
        <h2>${t("checkoutTitle")}</h2>
        <aside class="checkout-whatsapp-note" role="note">
          <strong>ملاحظة لتأكيد الطلب:</strong>
          <p>يتم دفع العربون الموضح في ملخص الطلب مقدمًا كجدية حجز، وهو جزء من قيمة الأوردر ويُخصم منها؛ لأننا نرسل الأوردر مع شركة شحن ونسدد تكلفة التوصيل مقدمًا.</p>
          <p>يتم تحويل العربون عبر <strong id="checkoutPaymentMethod">InstaPay</strong> على رقم التحويل:
            <strong id="checkoutTransferPhone">غير مسجل في إعدادات المتجر</strong>.</p>
          <p>باقي ثمن الأوردر يتم دفعه عند الاستلام.</p>
          <p id="checkoutContactInstruction"></p>
          <a id="checkoutWhatsappLink" href="#" target="_blank" rel="noopener noreferrer">واتساب</a>
        </aside>
        <form class="checkout-form" id="checkoutForm">
          <div class="field">
            <label for="fullName">${t("fullName")}</label>
            <input id="fullName" name="full_name" autocomplete="name" required>
          </div>
          <div class="field">
            <label for="phone">${t("phone")}</label>
            <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required>
          </div>
          <div class="field">
            <label for="secondPhone">${t("secondPhone")}</label>
            <input id="secondPhone" name="second_phone" type="tel" inputmode="tel">
          </div>
          <div class="field">
            <label for="governorateSelect">${t("governorate")}</label>
            <select id="governorateSelect" name="governorate" required>
              <option value="">${t("chooseGovernorate")}</option>
              ${governorates.map(region => `
                <option value="${region.id}">${region.ar} — ${formatNumber(region.fee)} جنيه</option>
              `).join("")}
            </select>
          </div>
          <div class="field full">
            <label for="address">${t("address")}</label>
            <textarea id="address" name="address" rows="3" autocomplete="street-address" required></textarea>
          </div>
          <div class="field full">
            <label for="notes">${t("notes")}</label>
            <textarea id="notes" name="notes" rows="2"></textarea>
          </div>
          <div class="field">
            <label for="paymentMethod">${t("payment")}</label>
            <select id="paymentMethod" name="payment_method">
              <option value="instapay" lang="en" dir="ltr">${t("instapay")}</option>
              <option value="vodafone_cash" lang="en" dir="ltr">${t("vodafone")}</option>
            </select>
          </div>
          <div class="order-total" id="orderTotals" data-deposit-percent="${depositPercent}"></div>
          <button class="checkout-button field full" type="submit">${t("placeOrder")}</button>
        </form>
      </div>
    `;
    $("#governorateSelect").addEventListener("change", renderCheckoutSummary);
    $("#paymentMethod").addEventListener("change", renderPaymentInstructions);
    renderWhatsAppLinks();
    renderCheckoutSummary();
    openCart(false);
    $("#checkoutDialog").showModal();
  }

  function whatsappOrderLink(orderNumber, phone = "") {
    const message = `مرحبًا LEN، رقم طلبي ${orderNumber}. سأرفق صورة تحويل العربون لتأكيد الطلب.`;
    return whatsappUrl(message, phone);
  }

  async function submitOrder(form) {
    const button = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form));
    const region = governorates.find(item => item.id === data.governorate);
    if (!region) {
      toast(t("required"));
      return;
    }
    button.disabled = true;

    const productSubtotal = cartTotal();
    const shipping = shippingCost(region.id);
    const grandTotal = productSubtotal + shipping;
    const depositPercent = Number(state.settings.deposit_percentage ?? 30);
    const deposit = grandTotal * depositPercent / 100;
    const weight = shipmentWeight();
    const orderNumber = `LEN-${Date.now().toString().slice(-8)}`;
    const items = cartProducts().map(({ row, product }) => ({
      product_id: product.id,
      product_name_ar: product.name_ar,
      product_name_en: product.name_en,
      quantity: row.quantity,
      unit_price: productUnitPrice(product),
      total_price: productUnitPrice(product) * row.quantity,
      discount_percentage: productDiscountPercent(product)
    }));
    const shippingNote = `الشحن: ${shipping} جنيه | وزن الشحنة: ${weight.weightKg} كجم${weight.estimated ? " (تقديري)" : ""} | الإجمالي شامل الشحن: ${grandTotal} جنيه`;
    const orderNotes = [data.notes?.trim(), shippingNote].filter(Boolean).join("\n");

    try {
      const customerResponse = await fetch(`${REST}/customers`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify({
          full_name: data.full_name,
          phone: data.phone,
          second_phone: data.second_phone || null,
          governorate: region.ar,
          address: data.address,
          notes: data.notes || null
        })
      });
      const customers = await customerResponse.json();
      if (!customerResponse.ok) throw new Error(customers.message || "Customer request failed");
      const customer = Array.isArray(customers) ? customers[0] : customers;

      const orderResponse = await fetch(`${REST}/orders`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify({
          order_number: orderNumber,
          customer_id: customer.id,
          subtotal: productSubtotal,
          deposit_percentage: depositPercent,
          deposit_amount: deposit,
          remaining_amount: grandTotal - deposit,
          payment_method: data.payment_method,
          payment_status: "pending",
          order_status: "new",
          notes: orderNotes,
          items
        })
      });
      const orders = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orders.message || "Order request failed");

      try {
        const emailResponse = await fetch(
          `${SUPABASE_URL}/functions/v1/send-order-email`,
          {
            method: "POST",
            headers: {
              ...headers,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              order_number: orderNumber
            })
          }
        );

        const emailResult = await emailResponse.json().catch(() => ({}));

        if (!emailResponse.ok || !emailResult.success) {
          console.error(
            "Admin email notification failed:",
            emailResult
          );
        } else {
          console.log(
            "Admin email notification sent:",
            emailResult.email_id || orderNumber
          );
        }
      } catch (emailError) {
        console.error(
          "Admin email notification request failed:",
          emailError
        );
      }

      state.cart = [];
      saveCart();
      const transferPhone = paymentRecipientPhone(data.payment_method);
      const useTransferNumberForWhatsApp = Boolean(normalizedWhatsAppNumber(transferPhone));
      const paymentMethodName = data.payment_method === "instapay" ? "InstaPay" : "Vodafone Cash";
      $("#checkoutContent").innerHTML = `
        <div class="success-panel">
          <b>✓</b>
          <h2>${t("orderSuccess")}</h2>
          <div class="success-order-details">
            <p><span>${t("orderNumber")}</span><strong lang="en" dir="ltr">${esc(orderNumber)}</strong></p>
            <p><span>رقم التحويل · ${paymentMethodName}</span>
              <strong lang="en" dir="ltr">${transferPhone
                ? esc(transferPhone)
                : "غير مسجل — تواصلي معنا قبل التحويل"}</strong></p>
          </div>
          <p>${t("orderTotal")}: <strong class="price">${money(grandTotal)}</strong></p>
          <p class="success-instructions">
            يتم دفع العربون الموضح في ملخص الطلب مقدمًا كجدية حجز، وهو جزء من قيمة الأوردر ويُخصم منها؛ لأننا نرسل الأوردر مع شركة شحن ونسدد تكلفة التوصيل مقدمًا.
            يتم التحويل عبر ${esc(paymentMethodName)} على رقم التحويل
            <strong lang="en" dir="ltr">${transferPhone ? esc(transferPhone) : "غير مسجل في إعدادات المتجر"}</strong>.
            باقي ثمن الأوردر يتم دفعه عند الاستلام.
            ${useTransferNumberForWhatsApp
              ? "بعد التحويل، برجاء التواصل معنا عبر واتساب على نفس الرقم وإرسال صورة التحويل ورقم الطلب لتأكيد الأوردر."
              : `بعد التحويل، برجاء التواصل معنا عبر واتساب على رقم خدمة العملاء ${esc(displayWhatsAppNumber())} وإرسال صورة التحويل ورقم الطلب لتأكيد الأوردر.`}
          </p>
          <a class="whatsapp-cta" href="${whatsappOrderLink(orderNumber, useTransferNumberForWhatsApp ? transferPhone : "")}" target="_blank" rel="noopener noreferrer">إرسال صورة التحويل ورقم الطلب عبر واتساب</a>
        </div>
      `;
    } catch (error) {
      console.error(error);
      toast(t("orderError"));
      button.disabled = false;
    }
  }

  document.addEventListener("click", event => {
    const category = event.target.closest("[data-category]");
    if (category) {
      state.category = category.dataset.category;
      renderCategories();
      renderProducts();
      requestAnimationFrame(() => {
        $("#productGrid").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    const addButton = event.target.closest("[data-add]");
    if (addButton) {
      event.stopPropagation();
      addToCart(addButton.dataset.add);
    }

    const product = event.target.closest("[data-product]");
    if (product && !event.target.closest("[data-add]")) showProduct(product.dataset.product);

    const quantityButton = event.target.closest("[data-qty]");
    if (quantityButton) {
      const row = state.cart.find(item => String(item.id) === quantityButton.dataset.qty);
      const productItem = state.products.find(item => String(item.id) === quantityButton.dataset.qty);
      if (row && productItem) {
        row.quantity = Math.max(0, Math.min(
          Number(productItem.stock_quantity),
          row.quantity + Number(quantityButton.dataset.delta)
        ));
        if (!row.quantity) state.cart = state.cart.filter(item => item !== row);
        saveCart();
      }
    }

    const removeButton = event.target.closest("[data-remove]");
    if (removeButton) {
      state.cart = state.cart.filter(item => String(item.id) !== removeButton.dataset.remove);
      saveCart();
    }

    if (event.target.id === "checkoutButton") checkout();
    if (event.target.closest("[data-close-dialog]")) $("#productDialog").close();
    if (event.target.closest("[data-close-checkout]")) $("#checkoutDialog").close();
    if (event.target.closest("#mainNav a")) {
      $("#mainNav").classList.remove("open");
      $("#menuButton").setAttribute("aria-expanded", "false");
    }
    if (!event.target.closest("#mainNav") && !event.target.closest("#menuButton")) {
      $("#mainNav").classList.remove("open");
      $("#menuButton").setAttribute("aria-expanded", "false");
    }
  });

  $("#cartButton").addEventListener("click", () => openCart());
  $("#closeCart").addEventListener("click", () => openCart(false));
  $("#backdrop").addEventListener("click", () => openCart(false));
  $("#menuButton").addEventListener("click", () => {
    const menu = $("#mainNav");
    const isOpen = menu.classList.toggle("open");
    $("#menuButton").setAttribute("aria-expanded", String(isOpen));
  });
  $("#searchButton").addEventListener("click", () => {
    $("#shop").scrollIntoView();
    setTimeout(() => $("#searchInput").focus(), 300);
  });
  $("#searchInput").addEventListener("input", event => {
    state.query = event.target.value;
    renderProducts();
  });
  document.addEventListener("submit", event => {
    if (event.target.id === "checkoutForm") {
      event.preventDefault();
      submitOrder(event.target);
    }
  });
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  });

  applyLanguage();
  renderWhatsAppLinks();
  load();
})();
