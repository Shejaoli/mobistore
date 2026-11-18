import { useMemo, useRef, useState } from "react";
import {
  Search,
  Heart,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
const asset = (path: string) => `${base}${path.replace(/^\//, "")}`;
const men = "https://www.uniqlo.com/us/en/men";

type Category = { label: string; href: string; image: string };
const categories: Category[] = [
  { label: "Outerwear", href: "/men/outerwear-and-blazers", image: "f665ab73af35.jpg" },
  { label: "Down", href: "/men/outerwear-and-blazers/down-jackets-and-coats", image: "bb144ce1bae3.jpg" },
  { label: "T-Shirts, Sweats & Fleece", href: "/men/tops", image: "64182a17339d.jpg" },
  { label: "Fleece", href: "/men/tops/fleece", image: "9cb1f4e566c7.png" },
  { label: "Sweaters & Knitwear", href: "/men/sweaters", image: "1641dce93aac.png" },
  { label: "Sweatshirts & Hoodies", href: "/men/tops/sweatshirts-and-hoodies", image: "4dc159fcd9b5.png" },
  { label: "Shirts", href: "/men/shirts-and-polos", image: "b6a78bbb0c79.jpg" },
  { label: "Bottoms", href: "/men/bottoms", image: "8dcc0f8ea907.jpg" },
  { label: "Jeans", href: "/men/bottoms/jeans", image: "84df7dab6457.png" },
  { label: "Innerwear & Underwear", href: "/men/innerwear", image: "68e82126999f.png" },
  { label: "Loungewear & Home", href: "/men/loungewear-and-home", image: "44fa6eaac7da.png" },
  { label: "HEATTECH", href: "/men/heattech", image: "043d30ea7201.png" },
];
const featuredCategories: Category[] = [
  { label: "Special Collaborations", href: "/men/special-collaboration", image: "fa77fe8b9391.png" },
  { label: "UT: Graphic Tees", href: "/special-feature/ut/lineup", image: "296679a2d476.png" },
  { label: "New Arrivals", href: "/feature/new/men", image: "623e7b535527.png" },
  { label: "Limited-Time Offers", href: "/feature/limited-offers/men", image: "cc7058abd04e.png" },
  { label: "Sale", href: "/feature/sale/men", image: "cb19735dd043.png" },
  { label: "GU", href: "https://www.gu-global.com/us/en/men/", image: "a057b6db5252.png" },
];
const categoryUrl = (href: string) =>
  href.startsWith("http") ? href : `https://www.uniqlo.com/us/en${href}`;

type Product = { name: string; price: string; image: string; badge?: string; href?: string };

const outerwear: Product[] = [
  { name: "Harrington Jacket", price: "$59.90", image: "5af84d0bbbc4.jpg", href: "https://www.uniqlo.com/us/en/products/E484610-000/00?colorDisplayCode=32", badge: "Limited-Time Offer until 11/18" },
  { name: "Single Collar Short Blouson", price: "$89.90", image: "e93a6935ab60.jpg", href: "https://www.uniqlo.com/us/en/products/E487326-000/00?colorDisplayCode=34", badge: "Bestseller" },
  { name: "Zip-Up Blouson", price: "$59.90", image: "7d13f4cfbc01.jpg", href: "https://www.uniqlo.com/us/en/products/E491096-000/00?colorDisplayCode=57" },
  { name: "Seamless Down Parka", price: "$179.90", image: "1987fbf6624f.jpg", href: "https://www.uniqlo.com/us/en/products/E486176-000/00?colorDisplayCode=05", badge: "Bestseller" },
];
const knitwear: Product[] = [
  { name: "Cashmere Sweater", price: "$99.90", image: "ab3590107997.jpg", href: "https://www.uniqlo.com/us/en/products/E450543-000/00?colorDisplayCode=08", badge: "Bestseller" },
  { name: "Cashmere Quarter-Zip Sweater", price: "$129.90", image: "11c487a15029.jpg", href: "https://www.uniqlo.com/us/en/products/E474146-000/00?colorDisplayCode=03" },
  { name: "Washable Milano Ribbed Sweater", price: "$49.90", image: "54e68d759d40.jpg", href: "https://www.uniqlo.com/us/en/products/E453754-000/00?colorDisplayCode=03" },
  { name: "Washable Milano Ribbed Skipper Polo Sweater", price: "$49.90", image: "339864e7179e.jpg", href: "https://www.uniqlo.com/us/en/products/E482325-000/00?colorDisplayCode=39" },
];
const heattech: Product[] = [
  { name: "HEATTECH T-Shirt | Short Sleeve", price: "$14.90", image: "e304416fd9cc.jpg", href: "https://www.uniqlo.com/us/en/products/E461001-000/00?colorDisplayCode=00", badge: "Limited-Time Offer until 11/18" },
  { name: "HEATTECH Tights", price: "$14.90", image: "c0d016600dc8.jpg", href: "https://www.uniqlo.com/us/en/products/E461013-000/00?colorDisplayCode=09", badge: "Limited-Time Offer until 11/18" },
  { name: "HEATTECH Extra Warm Cashmere Blend T-Shirt", price: "$29.90", image: "17405578698b.jpg", href: "https://www.uniqlo.com/us/en/products/E481441-000/00?colorDisplayCode=07" },
  { name: "HEATTECH Ultra Warm T-Shirt", price: "$34.90", image: "022933456012.jpg", href: "https://www.uniqlo.com/us/en/products/E479525-000/00?colorDisplayCode=58", badge: "Bestseller" },
];
const bottoms: Product[] = [
  { name: "Wide Sweatpants", price: "$39.90", image: "1c06103ac675.jpg", href: "https://www.uniqlo.com/us/en/products/E471809-000/00?colorDisplayCode=09", badge: "Bestseller" },
  { name: "Straight Jeans", price: "$49.90", image: "7dde7ff53abc.jpg", href: "https://www.uniqlo.com/us/en/products/E487206-000/00?colorDisplayCode=03", badge: "Limited-Time Offer until 11/18" },
  { name: "Barrel Pants", price: "$49.90", image: "cd1e96641d8d.jpg", href: "https://www.uniqlo.com/us/en/products/E484875-000/00?colorDisplayCode=34", badge: "Limited-Time Offer until 11/18" },
  { name: "Barrel Jeans", price: "$49.90", image: "2dcef1aa138e.jpg", href: "https://www.uniqlo.com/us/en/products/E488743-000/00?colorDisplayCode=09", badge: "Limited-Time Offer until 11/18" },
];

const campaignImages = {
  limited: "1c8bdfb617f7.jpg",
  outerwear: "4bbc1729277b.jpg",
  pufftech: "5bd2af808b74.png",
  thanks: "52e589c2ba7f.jpg",
  knitwear: "ab494bc3b626.jpg",
  gifts: "c81a36255d8c.png",
  heattech: "49221995537d.jpg",
  heattechMark: "1d198d6bc402.png",
  fleece: "dd03b271c3d4.jpg",
  magazine: "2a46ae9ae88e.png",
  bottoms: "c03284a33f5c.jpg",
  tees: "bef09dd25149.jpg",
  gu: "5104ec46c9ce.png",
};

function ProductCard({ product, index, onToggle, saved }: {
  product: Product;
  index: number;
  onToggle: (name: string) => void;
  saved: boolean;
}) {
  return (
    <article className="product-card" data-testid={`card-product-${index}`}>
      <div className="product-photo">
        <a href={product.href ?? `${men}/outerwear`} aria-label={product.name}>
          <img src={asset(`/images/${product.image}`)} alt={product.name} loading="eager" />
        </a>
        <button
          className={`wish-button${saved ? " is-saved" : ""}`}
          type="button"
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={saved}
          data-testid={`button-wishlist-${index}`}
          onClick={() => onToggle(product.name)}
        >
          <Heart />
        </button>
      </div>
      <p className="product-name">{product.name}</p>
      <div className="product-price">{product.price}</div>
      {product.badge && <div className="product-badge">{product.badge}</div>}
    </article>
  );
}

function ProductSection({
  title, description, products, saved, onToggle, id,
}: {
  title: string;
  description: string;
  products: Product[];
  saved: string[];
  onToggle: (name: string) => void;
  id: string;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => rail.current?.scrollBy({ left: direction * (rail.current.clientWidth * 0.78), behavior: "smooth" });
  return (
    <section className="product-section content-wrap" id={id}>
      <div className="product-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="rail-controls" aria-label={`${title} products`}>
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll products left" data-testid={`button-scroll-left-${id}`}><ChevronLeft /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll products right" data-testid={`button-scroll-right-${id}`}><ChevronRight /></button>
        </div>
      </div>
      <div className="product-rail" ref={rail}>
        {products.map((product, index) => (
          <ProductCard
            key={product.name}
            product={product}
            index={index}
            saved={saved.includes(product.name)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}

function App() {
  const [offerVisible, setOfferVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const allProducts = useMemo(() => [...outerwear, ...knitwear, ...heattech, ...bottoms], []);
  const results = allProducts.filter((product) => product.name.toLowerCase().includes(query.trim().toLowerCase()));
  const toggleSaved = (name: string) => setSaved((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand-logo" href="https://www.uniqlo.com/us/en/" aria-label="UNIQLO home" data-testid="link-home">
            <img src={asset("/uniqlo-logo.svg")} alt="UNIQLO" />
          </a>
          <nav className="gender-nav" aria-label="Departments">
            <a href="https://www.uniqlo.com/us/en/" data-testid="link-women">WOMEN</a>
            <a className="active" href={men} aria-current="page" data-testid="link-men">MEN</a>
            <a href="https://www.uniqlo.com/us/en/kids" data-testid="link-kids">KIDS</a>
            <a href="https://www.uniqlo.com/us/en/baby" data-testid="link-baby">BABY</a>
          </nav>
          <div className="header-tools">
            <button className="search-open" type="button" onClick={() => setSearchOpen(true)} aria-label="Open product search field" data-testid="button-open-search">
              <span>Search</span><Search />
            </button>
            <a className="icon-button" href="https://www.uniqlo.com/us/en/wishlist" aria-label="Wishlist" data-testid="link-wishlist"><Heart /></a>
            <a className="icon-button" href="https://www.uniqlo.com/us/en/member" aria-label="Membership / Purchase history" data-testid="link-account"><UserRound /></a>
            <a className="icon-button" href="https://www.uniqlo.com/us/en/cart" aria-label="Cart" data-testid="link-cart"><ShoppingBag /></a>
            <button className="icon-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open categories" data-testid="button-open-menu"><Menu /></button>
          </div>
        </div>
      </header>

      <main>
        {offerVisible && (
          <div className="offer-chip" role="status">
            <span>Shop Early with Extended Holiday Returns! | <a href="https://faq-us.uniqlo.com/articles/en_US/Knowledge/Holiday-Shopping-Guide-2026/">Learn More</a></span>
            <button type="button" onClick={() => setOfferVisible(false)} aria-label="Dismiss offer" data-testid="button-dismiss-offer"><X size={13} /></button>
          </div>
        )}

        <section className="hero" aria-label="UNIQLO : C">
          <img className="hero-image" src={asset("/images/24456c79f0d0.jpg")} alt="UNIQLO : C seasonal sweats" />
          <div className="hero-copy">
            <img className="collab-mark" src={asset("/images/fd94b26e51d5.png")} alt="UNIQLO : C" />
            <h1>Save on Sweats</h1>
            <p>Crafted for coziness and designed with careful details, these sweats offer refined comfort.</p>
            <div className="hero-product">Wide Sweatpants</div>
            <div className="hero-price">$39.90</div>
            <div className="hero-old-price">$49.90</div>
            <div className="hero-offer">Limited-Time Offer until 11/18</div>
          </div>
        </section>

        <section className="category-section content-wrap" id="shop-by-category">
          <h2 className="section-kicker">Search by category</h2>
          <nav className="category-list" aria-label="Shop by category">
            {[...categories, ...featuredCategories].map((category, index) => (
              <a
                className="category-link"
                href={categoryUrl(category.href)}
                key={category.label}
                data-testid={`link-category-${index}`}
              >
                <img src={asset(`/images/${category.image}`)} alt="" loading="lazy" />
                <span>{category.label}</span>
              </a>
            ))}
          </nav>
        </section>

        <section className="campaign-grid" aria-label="Men's seasonal campaigns">
          <article className="campaign-tile wide">
            <a className="campaign-link" href="https://www.uniqlo.com/us/en/feature/limited-offers/men" aria-label="Limited Time Offers" />
            <img src={asset(`/images/${campaignImages.limited}`)} alt="Limited Time Offers" loading="lazy" />
            <div className="campaign-overlay">
              <h2>Shop Before They're Gone:</h2>
              <div className="countdown" aria-label="Limited-time offer countdown">
                <span>1<small>day</small></span><span>3<small>hours</small></span>
                <span>44<small>minutes</small></span><span>57<small>seconds</small></span>
              </div>
            </div>
          </article>
        </section>

        <section className="campaign-grid">
          <article className="campaign-tile wide">
            <a className="campaign-link" href={`${men}/outerwear-and-blazers`} aria-label="Outerwear Collection" />
            <img src={asset(`/images/${campaignImages.outerwear}`)} alt="Outerwear Collection" loading="lazy" />
            <img className="campaign-mark" src={asset(`/images/${campaignImages.pufftech}`)} alt="PUFFTECH" />
            <div className="campaign-overlay">
              <h2>Outerwear Collection</h2>
              <p>Save now on coats and jackets like PUFFTECH outerwear designed for warmth without the weight.</p>
              <div className="campaign-product"><strong>PUFFTECH Jacket</strong><b>$59.90</b><del>$79.90</del><small>Limited-Time Offer until 11/18</small></div>
            </div>
          </article>
        </section>
        <ProductSection
          title="Outerwear Collection"
          description="Save now on coats and jackets like PUFFTECH outerwear designed for warmth without the weight."
          products={outerwear}
          saved={saved}
          onToggle={toggleSaved}
          id="outerwear"
        />

        <section className="centered-campaign">
          <a href="https://www.uniqlo.com/us/en/feature/thank-you-event">
            <img src={asset(`/images/${campaignImages.thanks}`)} alt="Thank You Event" loading="lazy" />
            <div className="campaign-overlay"><h2>Thank You Event</h2></div>
            <div className="timer-title">Thank You Event Starts In:</div>
          </a>
        </section>

        <section className="campaign-grid">
          <article className="campaign-tile wide">
            <a className="campaign-link" href={`${men}/sweaters/sweaters-and-cardigans`} aria-label="Knitwear Collection" />
            <img src={asset(`/images/${campaignImages.knitwear}`)} alt="Men's Sweaters & Cardigans" loading="lazy" />
            <div className="campaign-overlay">
              <h2>Knitwear Collection</h2>
              <p>Find easy-care, easy-wear sweaters in seasonal colors like our hand-washable Merino wool knits.</p>
              <div className="campaign-product"><strong>Merino Sweater</strong><b>$39.90</b><del>$49.90</del><small>Limited-Time Offer until 11/18</small></div>
            </div>
          </article>
        </section>
        <ProductSection
          title="Knitwear Collection"
          description="Find easy-care, easy-wear sweaters in seasonal colors like our hand-washable Merino wool knits."
          products={knitwear}
          saved={saved}
          onToggle={toggleSaved}
          id="knitwear"
        />

        <section className="campaign-grid">
          <article className="campaign-tile side">
            <a className="campaign-link" href="https://www.uniqlo.com/us/en/special-feature/gift/gift-guide/holiday" aria-label="Holiday Gift Guide is Here" />
            <img src={asset(`/images/${campaignImages.gifts}`)} alt="Holiday Gift Guide is Here" loading="lazy" />
            <div className="campaign-overlay"><h2>Holiday Gift Guide is Here</h2><p>Gifts they want, gifts they need, and gifts they'll love.</p></div>
          </article>
          <article className="campaign-tile wide">
            <a className="campaign-link" href="https://www.uniqlo.com/us/en/men/heattech" aria-label="HEATTECH T-Shirt" />
            <img src={asset(`/images/${campaignImages.heattech}`)} alt="HEATTECH T-Shirt" loading="lazy" />
            <img className="campaign-mark" src={asset(`/images/${campaignImages.heattechMark}`)} alt="HEATTECH" />
            <div className="campaign-overlay">
              <h2>HEATTECH T-Shirt</h2>
              <p>Lightweight, warm, and easy to layer or wear by itself.</p>
              <div className="campaign-product"><b>$14.90</b><del>$19.90</del><small>Limited-Time Offer until 11/18</small></div>
            </div>
          </article>
        </section>
        <ProductSection
          title="HEATTECH"
          description=""
          products={heattech}
          saved={saved}
          onToggle={toggleSaved}
          id="heattech"
        />

        <section className="campaign-grid">
          <article className="campaign-tile side">
            <a className="campaign-link" href={`${men}/tops/fleece`} aria-label="Men's Fleece" />
            <img src={asset(`/images/${campaignImages.fleece}`)} alt="Men's Fleece" loading="lazy" />
            <div className="campaign-overlay"><h2>Fleece Essentials</h2><p>Comfortable, lightweight fleece for easy warmth all season long.</p></div>
          </article>
          <article className="campaign-tile side text-dark">
            <a className="campaign-link" href="https://www.uniqlo.com/us/en/lifewear-magazine" aria-label="LifeWear Magazine" />
            <img src={asset(`/images/${campaignImages.magazine}`)} alt="LifeWear Magazine" loading="lazy" />
            <div className="campaign-overlay"><h2>LifeWear Magazine</h2></div>
          </article>
        </section>

        <section className="campaign-grid">
          <article className="campaign-tile wide">
            <a className="campaign-link" href={`${men}/bottoms`} aria-label="Men's Bottoms" />
            <img src={asset(`/images/${campaignImages.bottoms}`)} alt="Men's Bottoms" loading="lazy" />
            <div className="campaign-overlay">
              <h2>Bottoms Collection</h2>
              <p>Versatile pants in a range of fits to dress up or down, including jeans now for less for a limited time.</p>
              <div className="campaign-product"><strong>Barrel Jeans</strong><b>$49.90</b><del>$59.90</del><small>Limited-Time until 11/18</small></div>
            </div>
          </article>
        </section>
        <ProductSection
          title="Men's Bottoms"
          description=""
          products={bottoms}
          saved={saved}
          onToggle={toggleSaved}
          id="bottoms"
        />

        <section className="centered-campaign">
          <a href="https://www.uniqlo.com/us/en/men/tops/t-shirts">
            <img src={asset(`/images/${campaignImages.tees}`)} alt="Men's T-Shirts" loading="lazy" />
            <div className="campaign-overlay"><h2>Quality T-Shirts</h2><p>From modern cuts to classic fits, these versatile T-shirts are crafted for long-lasting wear and comfort.</p></div>
          </a>
        </section>
        <section className="campaign-grid">
          <article className="campaign-tile side">
            <a className="campaign-link" href="https://www.gu-global.com/us/en/" aria-label="Meet GU" />
            <img src={asset(`/images/${campaignImages.gu}`)} alt="Meet GU" loading="lazy" />
          </article>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="https://www.uniqlo.com/us/en/" aria-label="UNIQLO home">
            <img src={asset("/uniqlo-logo.svg")} alt="UNIQLO" />
          </a>
          <nav className="footer-links" aria-label="Customer resources">
            <a href="https://www.uniqlo.com/us/en/image-search">Image Search</a>
            <a href="https://map.uniqlo.com/us/en">Store</a>
            <a href="https://faq-us.uniqlo.com/">FAQ</a>
            <a href="https://www.uniqlo.com/us/en/contact">IQ Chat</a>
          </nav>
        </div>
        <p className="footer-note">Can’t find what you’re looking for? Search by category.</p>
      </footer>

      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
      <aside className={`drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen} aria-label="Categories">
        <div className="drawer-head"><h2>MEN</h2><button className="drawer-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close categories" data-testid="button-close-menu"><X /></button></div>
        <nav className="drawer-categories">
          {[...categories, ...featuredCategories].map((category) => (
            <a onClick={() => setMenuOpen(false)} href={categoryUrl(category.href)} key={category.label}>{category.label}</a>
          ))}
        </nav>
        <nav className="drawer-features">
          <a onClick={() => setMenuOpen(false)} href="https://www.uniqlo.com/us/en/feature/limited-offers/men">Limited-Time Offers</a>
          <a onClick={() => setMenuOpen(false)} href="https://www.uniqlo.com/us/en/feature/new/men">New Arrivals</a>
          <a onClick={() => setMenuOpen(false)} href="https://www.uniqlo.com/us/en/special-feature/holiday-returns">Shop Early with Extended Holiday Returns!</a>
        </nav>
      </aside>

      {searchOpen && (
        <section className="search-panel" aria-label="Product search">
          <div className="search-top">
            <Search size={21} />
            <input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search products" data-testid="input-product-search" />
            <button type="button" className="search-close" onClick={() => { setSearchOpen(false); setQuery(""); }} aria-label="Close search" data-testid="button-close-search"><X /></button>
          </div>
          {query.trim() ? (
            <>
              <p className="search-results-title">Search results</p>
              {results.length ? <div className="search-results">{results.map((product, index) => <ProductCard key={product.name} product={product} index={index + 10} saved={saved.includes(product.name)} onToggle={toggleSaved} />)}</div> : <p className="empty-search">No results found.</p>}
            </>
          ) : <p className="search-results-title">Search</p>}
        </section>
      )}
    </>
  );
}

export default App;
