const WA_NUMBER = "6281380131500";
const PRODUCT_NAME = "Nissa Abaya Anak";
const PRICE = 99000;

let selectedColor = "Hitam";
let selectedSize = "";

const productImage = document.getElementById("productImage");
const selectedColorEl = document.getElementById("selectedColor");

function buildWhatsAppUrl(source = "cta") {
  const sizeText = selectedSize ? ` ukuran ${selectedSize}` : "";
  const message =
`Halo, saya ingin pesan ${PRODUCT_NAME}.
Warna: ${selectedColor}
Ukuran:${sizeText || " belum dipilih"}
Harga: Rp99.000

Mohon info ketersediaan dan cara pesan.`;

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function trackAddToCart(source) {
  if (typeof fbq === "function") {
    fbq("track", "AddToCart", {
      content_name: PRODUCT_NAME,
      content_category: "Gamis Anak",
      content_type: "product",
      value: PRICE,
      currency: "IDR",
      source: source
    });
  }
}

document.querySelectorAll(".swatch").forEach((button) => {
  button.addEventListener("click", () => {
    selectedColor = button.dataset.color;

    document.querySelectorAll(".swatch").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productImage.style.opacity = "0.35";
    setTimeout(() => {
      productImage.src = button.dataset.image;
      productImage.alt = `${PRODUCT_NAME} warna ${selectedColor}`;
      selectedColorEl.textContent = selectedColor;
      productImage.style.opacity = "1";
    }, 100);
  });
});

document.querySelectorAll(".js-wa").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const source = button.dataset.cta || "cta";
    const url = buildWhatsAppUrl(source);

    // User requested the WhatsApp click to be tracked as Meta AddToCart.
    trackAddToCart(source);

    window.open(url, "_blank", "noopener,noreferrer");
  });
});

// Optional: if a future size selector is added, set selectedSize before building the WA URL.
