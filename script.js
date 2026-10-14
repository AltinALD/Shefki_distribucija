const PRODUCTS = [
  { name: "Tepelena ujë 0.25L", category: "uje", image: "assets/products/01.jpg" },
  { name: "Tepelena ujë me gaz 0.25L", category: "uje", image: "assets/products/02.jpg" },
  { name: "Dea ujë plastik 0.33L / 0.5L", category: "uje", image: "assets/products/03.jpg" },
  { name: "Ujë Gorska 0.25L", category: "uje", image: "assets/products/04.jpg" },
  { name: "Gorska e gazuar xham 0.25L", category: "uje", image: "assets/products/05.jpg" },
  { name: "Gorska ujë gazuar 330ml", category: "uje", image: "assets/products/37.jpg" },
  { name: "FruttaVit Pjeshk Ice Tea 0.33L", category: "pije", image: "assets/products/09.jpg" },
  { name: "COCOX Çokolladë", category: "furnizime", image: "assets/products/11.jpg" },
  { name: "Jadran Politank", category: "furnizime", image: "assets/products/12.jpg" },
  { name: "Gotë letre", category: "furnizime", image: "assets/products/13.jpg" },
  { name: "Lugë kafe", category: "furnizime", image: "assets/products/14.jpg" },
  { name: "Pirun plastik për patate", category: "furnizime", image: "assets/products/39.jpg" },
  { name: "Gota plastike", category: "furnizime", image: "assets/products/15.jpg" },
  { name: "Sheqer fishek", category: "furnizime", image: "assets/products/16.jpg" },
  { name: "Faculeta set", category: "furnizime", image: "assets/products/17.jpg" },
  { name: "Folie alumini 800gr", category: "furnizime", image: "assets/products/18.jpg" },
  { name: "Kese 45", category: "furnizime", image: "assets/products/19.jpg" },
  { name: "Kese 49", category: "furnizime", image: "assets/products/20.jpg" },
  { name: "Kese të zeza", category: "furnizime", image: "assets/products/38.jpg" },
  { name: "Avşar Karadaut", category: "pije", image: "assets/products/21.jpg" },
  { name: "Avşar Orange", category: "pije", image: "assets/products/22.jpg" },
  { name: "Avşar Lime", category: "pije", image: "assets/products/23.jpg" },
  { name: "Avşar Mango / Ananas", category: "pije", image: "assets/products/24.jpg" },
  { name: "Kuti pica 30×30 / 25×25 cm", category: "furnizime", image: "assets/products/25.jpg" },
  { name: "Letër hamburger", category: "furnizime", image: "assets/products/40.jpg" },
  { name: "Avşar Dardhë–Bostan", category: "pije", image: "assets/products/26.jpg" },
  { name: "Avşar Lemon", category: "pije", image: "assets/products/27.jpg" },
  { name: "Avşar Gazoz", category: "pije", image: "assets/products/28.jpg" },
  { name: "Bion Multi Ace 0.2L", category: "pije", image: "assets/products/29.jpg" },
  { name: "Bion Pjeshk 0.2L", category: "pije", image: "assets/products/30.jpg" },
  { name: "Mollë gjelbërt 0.2L", category: "pije", image: "assets/products/31.jpg" },
  { name: "Coca-Cola 0.33L", category: "pije", image: "assets/products/32.jpg" },
  { name: "Fanta Orange 0.33L", category: "pije", image: "assets/products/33.jpg" },
  { name: "Fanta Exotic 0.2L", category: "pije", image: "assets/products/34.jpg" },
  { name: "Schweppes 0.2L", category: "pije", image: "assets/products/35.jpg" },
  { name: "Golden Eagle 250ml", category: "pije", image: "assets/products/36.jpg" },
];

const CATEGORY_LABELS = {
  uje: "Ujë",
  pije: "Pije",
  furnizime: "Furnizime",
};

const grid = document.getElementById("product-grid");
const filters = document.querySelectorAll(".filter");
const header = document.querySelector(".site-header");

function renderProducts(filter = "all") {
  grid.innerHTML = PRODUCTS.map((product, index) => {
    const hidden = filter !== "all" && product.category !== filter;
    return `
      <article
        class="product${hidden ? " is-hidden" : ""}"
        data-category="${product.category}"
        style="transition-delay: ${Math.min(index * 35, 280)}ms"
      >
        <div class="product-media">
          <img src="${product.image}" alt="${product.name}" loading="lazy" width="480" height="440" />
        </div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-cat">${CATEGORY_LABELS[product.category]}</p>
      </article>
    `;
  }).join("");

  requestAnimationFrame(observeProducts);
}

function observeProducts() {
  const cards = document.querySelectorAll(".product:not(.is-hidden)");
  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  cards.forEach((card) => observer.observe(card));
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderProducts(value);
  });
});

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  },
  { passive: true }
);

renderProducts();
