// Your product list. To add a product, copy one block and change the details.
// Images are placeholders. Replace each "image" with your own photo link
// (or put photos in "public/images" and use "/images/photo-name.jpg").

export const products = [
  {
    id: 1,
    name: "Crochet Tote Bag",
    description: "Spacious handmade tote, perfect for markets, school or the beach.",
    price: 35000,
    category: "Bags",
    image: "/images/bucket-bag.jpeg",
  },
  {
    id: 2,
    name: "Crochet Shoulder Bag",
    description: "Stylish everyday shoulder bag with a soft, sturdy weave.",
    price: 35000,
    category: "Bags",
    image: "/images/tote-bag.jpeg",
  },
  {
    id: 3,
    name: "Crochet Beanie",
    description: "Warm, cozy beanie made with soft yarn in your favourite colour.",
    price: 15000,
    category: "Headwear",
    image: "/images/beanie.jpg",
  },
  {
    id: 4,
    name: "Crochet Scrunchie Set",
    description: "Set of 3 gentle hair scrunchies that won't tug or break your hair.",
    price: 5000,
    category: "Accessories",
    image: "/images/scrunchies.jpg",
  },
  {
    id: 5,
    name: "Crochet Earrings",
    description: "Lightweight, colourful handmade earrings to complete any outfit.",
    price: 2500,
    category: "Accessories",
    image: "/images/earrings.jpg",
  },
  {
    id: 6,
    name: "Crochet Bucket Hat",
    description: "Trendy bucket hat that keeps you cool and stylish in the sun.",
    price: 10000,
    category: "Headwear",
    image: "/images/headwear.jpg",
  },
];

// Pictures for the home page carousel.
// Replace each "src" with your own photo later (e.g. "/images/bag1.jpg")
export const heroImages = [
  { src: "/images/tote-bag.jpeg", alt: "Crochet tote bag" },
  { src: "/images/shoulder-bag.jpeg", alt: "Crochet shoulder bag" },
  { src: "/images/bucket-bag.jpeg", alt: "Crochet bucket bag" },
  { src: "/images/mini-bag.png", alt: "Crochet mini bag" },
];
// Wide photo for the "feature banner". Replace with your own photo.
export const bannerImage = "https://placehold.co/1400x600/C9A2E8/4A0E7A?text=Featured+Collection";

// Your photo for the About section. Replace with a picture of you or your work.
export const aboutImage = "/images/jasmine.jpg";

// Customer reviews. REPLACE these with real reviews, or delete the
// reviews section from App.jsx before you go live.
export const reviews = [
  { id: 1, name: "Customer name", text: "Add a real review from a happy customer here." },
  { id: 2, name: "Customer name", text: "Ask customers to screenshot their kind WhatsApp messages." },
  { id: 3, name: "Customer name", text: "Copy their words here, with their permission." },
];