import { useState, useEffect } from "react";
import {
  products,
  heroImages,
  bannerImage,
  aboutImage,
  reviews,
} from "./data/products.js";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";


// ===== YOUR DETAILS - CHANGE THESE =====
const WHATSAPP_NUMBER = "+2349046352851"; // ← CHANGE THIS
const EMAIL = "jasminecancrochet@gmail.com"; // ← CHANGE THIS
const INSTAGRAM = "jasminecancrochet";
const TIKTOK = "jasminecancrochet";
// =======================================

// ----- Flower shape -----
// This loop works out the outline of a flower with 8 petals.
// We use it later to cut badges and pictures into a flower shape.
const flowerPoints = Array.from({ length: 72 }, (_, i) => {
  const angle = (i / 72) * 2 * Math.PI;
  const radius = 44 + 6 * Math.cos(angle * 8);
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
}).join(", ");
const flowerShape = { clipPath: `polygon(${flowerPoints})` };

// ----- A small daisy drawing (used for decoration) -----
function Daisy({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      {/* 4 petals rotated = 8 petals */}
      {[0, 45, 90, 135].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="50"
          rx="12"
          ry="40"
          fill="#ffffff"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill="#FFE59A" />
    </svg>
  );
}

// ----- Flower category badges -----
// "filter" must match the category names in products.js
const badges = [
  { script: "shop", label: "Bags", filter: "Bags", color: "flower-cream", image: "/images/hand-bag.jpg" },
  { script: "shop", label: "Headwear", filter: "Headwear", color: "flower-blush", image: "/images/headwear.jpg" },
  { script: "shop", label: "Accessories", filter: "Accessories", color: "flower-butter", image: "/images/scrunchie.jpg" },
  { script: "made for you", label: "Custom Order", filter: null, color: "flower-purple", image: "/images/custom-order.jpg" },
];

// ----- "How it works" steps -----
const steps = [
  { title: "Pick your piece", text: "Choose a product from the shop, or tell me your own idea." },
  { title: "Fill the form", text: "Add your size, colour and delivery location." },
  { title: "Send on WhatsApp", text: "Your order opens in WhatsApp and we take it from there." },
];

// Words that scroll across the purple ticker band
const tickerText =
  "Crochet Bags ✿ Beanies ✿ Scrunchies ✿ Earrings ✿ Bucket Hats ✿ Made With Love ✿ ";

  // ----- Small social icons (drawn with SVG, no libraries needed) -----


function App() {
  // Everything typed into the order form
  const [form, setForm] = useState({ name: "", phone: "", product: "", details: "" });

  // Which carousel picture is showing (0 = the first one)
  const [slide, setSlide] = useState(0);

  // Which product category is selected in the shop
  const [filter, setFilter] = useState("All");

    // Is the phone menu open?
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to a section and close the phone menu
  function goTo(id) {
    scrollToSection(id);
    setMenuOpen(false);
  }

  // Moves the carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((current) => (current + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  function nextSlide() {
    setSlide((slide + 1) % heroImages.length);
  }

  function prevSlide() {
    setSlide((slide - 1 + heroImages.length) % heroImages.length);
  }

  // Scrolls smoothly to a section by its id
  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }

  // Updates the form when someone types
  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  // "Order This" button: fill the form and scroll to it
  function handleOrderThis(productName) {
    setForm({ ...form, product: productName });
    scrollToSection("order");
  }

  // Category badge / banner button: pick a category and scroll to the shop
  function handleCategory(categoryName) {
    setFilter(categoryName);
    scrollToSection("shop");
  }

  // Form submit: open WhatsApp with the order message
  function handleSubmit(event) {
    event.preventDefault();

    const message =
      `Hello Jasminecancrochet! I'd like to place an order.\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Product: ${form.product}\n` +
      `Details (size/color/delivery): ${form.details}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  // Only show products that match the selected category
  const shownProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  // Cheapest product price (for the "Prices from" number)
  const lowestPrice = Math.min(...products.map((product) => product.price));

  return (
    <div className="app">
      {/* ===== TOP ANNOUNCEMENT BAR ===== */}
      <div className="top-bar">Handmade to order ✿ Order easily on WhatsApp</div>

      {/* ================= HEADER: logo + menu strip (sticky) ================= */}
            {/* ================= HEADER: logo left, menu middle, button right ================= */}
            <header className="site-header">
        <div className="header-inner">
          <img
            src="/logo.png"
            alt="Jasminecancrochet logo"
            className="logo"
            onClick={() => goTo("home")}
          />

          <nav className={menuOpen ? "nav-strip open" : "nav-strip"}>
            <button onClick={() => goTo("home")}>Home</button>
            <button onClick={() => goTo("shop")}>Shop</button>
            <button onClick={() => goTo("about")}>About</button>
            <button onClick={() => goTo("reviews")}>Reviews</button>
            <button onClick={() => goTo("order")}>Order</button>
          </nav>

          <div className="header-right">
            <button className="header-btn" onClick={() => goTo("order")}>
              Order Now
            </button>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* ================= 1. HERO SECTION ================= */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-card">
            {/* Decorations */}
            <span className="sparkle s1">✦</span>
            <span className="sparkle s2">✦</span>
            <Daisy className="daisy daisy-1" />
            <Daisy className="daisy daisy-2" />

            {/* Left side: words */}
            <div className="hero-text">
              <span className="pill">Made to order</span>
              <h2>
                Handmade Crochet,{" "}
                <span className="script">Crafted With Love</span>
              </h2>
              <p className="hero-subtext">
                Crochet Bags &amp; Accessories — Beanies, Scrunchies, Earrings &amp; More
              </p>
              <div className="hero-buttons">
                <button className="btn" onClick={() => scrollToSection("shop")}>
                  Shop Now
                </button>
                <button className="btn btn-light" onClick={() => scrollToSection("order")}>
                  Place Custom Order
                </button>
              </div>

              {/* Small facts row */}
              <div className="stats">
                <div className="stat">
                  <strong>100%</strong>
                  <span>Handmade</span>
                </div>
                <div className="stat">
                  <strong>Custom</strong>
                  <span>Your colour &amp; size</span>
                </div>
              </div>
            </div>

            {/* Right side: arch carousel + tilted photos */}
            <div className="hero-visual">
              <div className="polaroid polaroid-1">
                <img src={heroImages[1].src} alt="" />
              </div>
              <div className="polaroid polaroid-2">
                <img src={heroImages[2].src} alt="" />
              </div>

              <div className="carousel">
                <img
                  className="carousel-img"
                  src={heroImages[slide].src}
                  alt={heroImages[slide].alt}
                />
                <button className="carousel-arrow left" onClick={prevSlide} aria-label="Previous picture">
                  ‹
                </button>
                <button className="carousel-arrow right" onClick={nextSlide} aria-label="Next picture">
                  ›
                </button>
                <div className="carousel-dots">
                  {heroImages.map((image, index) => (
                    <button
                      key={index}
                      className={index === slide ? "dot active" : "dot"}
                      onClick={() => setSlide(index)}
                      aria-label={`Go to picture ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="sticker">
                Made
                <br />
                with
                <br />
                love
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCROLLING TICKER BAND ===== */}
      <div className="ticker">
        <div className="ticker-track">
          {/* Two identical copies make the loop seamless */}
          <span>{tickerText.repeat(4)}</span>
          <span>{tickerText.repeat(4)}</span>
        </div>
      </div>

      {/* ================= FLOWER CATEGORY BADGES ================= */}
      <section className="section flower-section">
        <div className="container">
          <p className="eyebrow">shop by collection</p>
          <h2 className="section-title">Find Your Style</h2>
          <div className="flowers">
            {badges.map((badge) => (
              <button
                key={badge.label}
                className={`flower ${badge.color} ${badge.image ? "has-image" : ""}`}
                style={flowerShape}
                onClick={() =>
                  badge.filter ? handleCategory(badge.filter) : scrollToSection("order")
                }
              >
                {badge.image && <img className="flower-img" src={badge.image} alt="" />}
                <span className="flower-script">{badge.script}</span>
                <span className="flower-name">{badge.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className="scallop scallop-lilac"></div>

      {/* ================= FEATURE BANNER ================= */}
      <section className="banner-wrap">
        <div className="container">
          <div
            className="banner"
            style={{
              backgroundImage: `linear-gradient(rgba(74,14,122,0.55), rgba(74,14,122,0.55)), url(${bannerImage})`,
            }}
          >
            <p className="banner-small">Featured · Handmade bags</p>
            <h2>The Bag Collection</h2>
            <p>Totes and shoulder bags, crocheted stitch by stitch and made just for you.</p>
            <button className="btn-white" onClick={() => handleCategory("Bags")}>
              Explore the collection →
            </button>
          </div>
        </div>
      </section>

      {/* ================= 2. SHOP SECTION ================= */}
      <div className="strip">
        <h2>See What's New</h2>
      </div>

      <section id="shop" className="section shop-section">
        <div className="container">
          {/* Category filter buttons */}
          <div className="filters">
            {["All", "Bags", "Headwear", "Accessories"].map((name) => (
              <button
                key={name}
                className={filter === name ? "filter active" : "filter"}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {shownProducts.map((product) => (
              <div className="card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="card-pill">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="card-desc">{product.description}</p>
                  <div className="card-bottom">
                    <span className="price">₦{product.price.toLocaleString()}</span>
                    <button
                      className="btn btn-small"
                      onClick={() => handleOrderThis(product.name)}
                    >
                      Order This
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="steps-section">
        <div className="container">
          <p className="eyebrow">simple &amp; easy</p>
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            {steps.map((step, index) => (
              <div className="step" key={step.title}>
                <span className="step-number">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="scallop scallop-sage"></div>

      {/* ================= ABOUT ================= */}
      <section id="about" className="section">
        <div className="container about-grid">
          <div className="about-picture">
            <Daisy className="daisy about-daisy" />
            <img
              src={aboutImage}
              alt="Jasmine, the maker behind Jasminecancrochet"
              className="about-image"
              style={flowerShape}
            />
          </div>
          <div className="about-text">
            <p className="eyebrow left">face of the brand</p>
            <h2>Hi, I'm Jasmine</h2>
            {/* ← CHANGE THIS text to your own story */}
            <p>
              The creative hands behind Jasminecancrochet. What began as a love for yarn,
              colour and crochet has grown into a handmade brand creating bags and
              accessories with personality. Every piece is made by hand, from choosing the
              colour combinations to adding the smallest finishing details.
            </p>
            <p>
              For me, crochet is more than making things with yarn. It’s a way of turning
              creativity into something you can carry, wear and call your own. Tell me the
              colour and size you want, and I’ll make it just for you.
            </p>
            <p>
              Thank you for supporting my little creative world. Every piece you choose
              carries a little bit of my heart.
            </p>
            <p className="signoff">Handcrafted with love, one stitch at a time.</p>
            <button className="btn" onClick={() => scrollToSection("order")}>
              Place Custom Order
            </button>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section id="reviews" className="section reviews-section">
        <div className="container">
          <p className="eyebrow">kind words</p>
          <h2 className="section-title">Customer Reviews</h2>
          <div className="reviews">
            {reviews.map((review) => (
              <div className="review" key={review.id}>
                <div className="stars">★★★★★</div>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="scallop scallop-blush"></div>

      {/* ================= INSTAGRAM ================= */}
      <section className="section insta-section">
        <div className="container">
          <p className="eyebrow">come say hi</p>
          <h2 className="insta-title">Follow on Instagram</h2>
          <p className="insta-handle">
            <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer">
              @{INSTAGRAM}
            </a>
          </p>
          {/* Uses your product pictures for now. Swap for real post photos later. */}
          <div className="insta-grid">
            {products.slice(0, 4).map((product) => (
              <a
                key={product.id}
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={product.image} alt={product.name} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. ORDER / CONTACT SECTION ================= */}
      <section id="order" className="section order-section">
        <div className="container">
          <p className="eyebrow">let's make something</p>
          <h2 className="section-title">Place Your Order</h2>

          <form className="order-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />

            <label htmlFor="phone">WhatsApp / Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 08012345678"
              required
            />

            <label htmlFor="product">Product You Want</label>
            <input
              id="product"
              type="text"
              name="product"
              value={form.product}
              onChange={handleChange}
              placeholder="e.g. Crochet Tote Bag"
              required
            />

            <label htmlFor="details">Size / Color / Delivery Location</label>
            <textarea
              id="details"
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder="Tell me your preferred size, colour and where to deliver"
              rows="4"
              required
            />

            <button type="submit" className="btn">
              Send Order on WhatsApp
            </button>
          </form>

          <div className="contact-info">
            <a className="contact-pill" href={`mailto:${EMAIL}`}>
              ✉ {EMAIL}
            </a>
            <a
              className="contact-pill"
              href={`https://instagram.com/${INSTAGRAM}`}
              target="_blank"
              rel="noreferrer"
            >
              @{INSTAGRAM}
            </a>
          </div>
        </div>
      </section>

            {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="container footer-row">
          {/* Left: logo on a curvy shape */}
          <div className="footer-logo-blob">
            <img src="/logo.png" alt="Jasminecancrochet logo" className="footer-logo" />
          </div>

          {/* Middle: links in a row, then email and copyright */}
          <div className="footer-center">
            <nav className="footer-nav">
              <button onClick={() => scrollToSection("home")}>Home</button>
              <button onClick={() => scrollToSection("shop")}>Shop</button>
              <button onClick={() => scrollToSection("about")}>About</button>
              <button onClick={() => scrollToSection("reviews")}>Reviews</button>
              <button onClick={() => scrollToSection("order")}>Order</button>
            </nav>
            <a className="footer-email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <p className="footer-copy">© 2026 Jasminecancrochet - Crafted With Love</p>
          </div>

          {/* Right: small icons with "Follow us" underneath */}
          <div className="footer-social">
            <div className="socials">
              <a
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://www.tiktok.com/@${TIKTOK}`}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </div>
            <p className="follow-text">Follow us</p>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        className="float-btn"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Jasminecancrochet!")}`}
        target="_blank"
        rel="noreferrer"
      >
        💬 Message us
      </a>
    </div>
  );
}

export default App;