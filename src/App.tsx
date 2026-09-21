import { useEffect, useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Apple,
  ArrowRight,
  BadgePercent,
  ChevronRight,
  Clock3,
  Coffee,
  Cookie,
  Fish,
  Home,
  Leaf,
  MapPin,
  Milk,
  Minus,
  Package,
  Plus,
  Sandwich,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  UserRound,
  X,
} from 'lucide-react'
import './App.css'

interface Category {
  id: string
  name: string
  icon: LucideIcon
}

interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  quantity: string
  image: string
  tag?: string
}

interface CartItem extends Product {
  quantityCount: number
}

const categories: Category[] = [
  { id: 'all', name: 'All', icon: Sparkles },
  { id: 'fruits', name: 'Fruits & Vegetables', icon: Apple },
  { id: 'dairy', name: 'Dairy & Eggs', icon: Milk },
  { id: 'snacks', name: 'Snacks', icon: Cookie },
  { id: 'beverages', name: 'Beverages', icon: Coffee },
  { id: 'bakery', name: 'Bakery', icon: Sandwich },
  { id: 'staples', name: 'Staples', icon: Package },
  { id: 'personal-care', name: 'Personal Care', icon: ShieldCheck },
  { id: 'household', name: 'Household', icon: Home },
  { id: 'meat', name: 'Meat & Seafood', icon: Fish },
]

const products: Product[] = [
  {
    id: 'bananas',
    name: 'Bananas',
    category: 'fruits',
    price: 56,
    originalPrice: 72,
    quantity: '1 bunch',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'red-apples',
    name: 'Red Apples',
    category: 'fruits',
    price: 124,
    originalPrice: 149,
    quantity: '1 kg',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'oranges',
    name: 'Oranges',
    category: 'fruits',
    price: 118,
    originalPrice: 138,
    quantity: '1 kg',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'mangoes',
    name: 'Mangoes',
    category: 'fruits',
    price: 135,
    originalPrice: 160,
    quantity: '1 kg',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'fruits',
    price: 42,
    originalPrice: 52,
    quantity: '1 kg',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'fruits',
    price: 36,
    originalPrice: 44,
    quantity: '1 kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'onion',
    name: 'Onion',
    category: 'fruits',
    price: 38,
    originalPrice: 46,
    quantity: '1 kg',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'fruits',
    price: 30,
    originalPrice: 38,
    quantity: '200 g',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'farm-milk',
    name: 'Farm Fresh Milk',
    category: 'dairy',
    price: 54,
    originalPrice: 66,
    quantity: '1 litre',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'paneer',
    name: 'Paneer Cubes',
    category: 'dairy',
    price: 110,
    originalPrice: 128,
    quantity: '200 g',
    image: 'https://images.unsplash.com/photo-1604908553252-944e3d1d3127?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'plain-curd',
    name: 'Plain Curd',
    category: 'dairy',
    price: 58,
    originalPrice: 70,
    quantity: '500 g',
    image: 'https://images.unsplash.com/photo-1570587193867-0c0c0788f263?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'butter',
    name: 'Farm Butter',
    category: 'dairy',
    price: 99,
    originalPrice: 118,
    quantity: '200 g',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'eggs',
    name: 'Free Range Eggs',
    category: 'dairy',
    price: 82,
    originalPrice: 95,
    quantity: '6 pack',
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'whole-wheat-bread',
    name: 'Whole Wheat Bread',
    category: 'bakery',
    price: 48,
    originalPrice: 58,
    quantity: '400 g',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'multigrain-bread',
    name: 'Multigrain Bread',
    category: 'bakery',
    price: 62,
    originalPrice: 74,
    quantity: '400 g',
    image: 'https://images.unsplash.com/photo-1549931314-a545dcf3bc73?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'classic-salted-chips',
    name: 'Classic Salted Chips',
    category: 'snacks',
    price: 32,
    originalPrice: 40,
    quantity: '55 g',
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'biscuits',
    name: 'Butter Biscuits',
    category: 'snacks',
    price: 54,
    originalPrice: 66,
    quantity: '200 g',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'namkeen',
    name: 'Namkeen Mix',
    category: 'snacks',
    price: 60,
    originalPrice: 72,
    quantity: '250 g',
    image: 'https://images.unsplash.com/photo-1599490650514-4f7f5d9a17a4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'citrus-soda',
    name: 'Citrus Soda',
    category: 'beverages',
    price: 68,
    originalPrice: 78,
    quantity: '250 ml',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'orange-juice',
    name: 'Orange Juice',
    category: 'beverages',
    price: 96,
    originalPrice: 116,
    quantity: '1 litre',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'mineral-water',
    name: 'Mineral Water',
    category: 'beverages',
    price: 28,
    originalPrice: 35,
    quantity: '1 litre',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f2b0a3d9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'basmati-rice',
    name: 'Basmati Rice',
    category: 'staples',
    price: 182,
    originalPrice: 215,
    quantity: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'wheat-flour',
    name: 'Wheat Flour',
    category: 'staples',
    price: 134,
    originalPrice: 152,
    quantity: '5 kg',
    image: 'https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'cooking-oil',
    name: 'Cooking Oil',
    category: 'staples',
    price: 178,
    originalPrice: 210,
    quantity: '1 litre',
    image: 'https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sugar',
    name: 'Sugar',
    category: 'staples',
    price: 58,
    originalPrice: 68,
    quantity: '1 kg',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'chicken',
    name: 'Chicken Breast',
    category: 'meat',
    price: 214,
    originalPrice: 246,
    quantity: '500 g',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1d6f6b4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'salmon',
    name: 'Salmon Fillet',
    category: 'meat',
    price: 320,
    originalPrice: 360,
    quantity: '250 g',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
  },
]

const featureList = [
  { title: 'Fast delivery', description: 'Fresh groceries at your doorstep in 15–30 minutes.', icon: Truck },
  { title: 'Fresh products', description: 'Curated from trusted farms and local producers.', icon: Leaf },
  { title: 'Easy ordering', description: 'Quick search, one-tap add, and clear cart totals.', icon: Sparkles },
  { title: 'Secure payments', description: 'Cashless, protected, and simple checkout experience.', icon: ShieldCheck },
]

const deliveryThreshold = 499
const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`

const createProductFallback = (productName: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#edf9ef"/>
          <stop offset="100%" stop-color="#e6f0ea"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#g)"/>
      <circle cx="400" cy="230" r="120" fill="#d9efdd"/>
      <path d="M355 185 C385 145, 465 145, 495 185 L495 240 C495 285, 455 325, 400 325 C345 325, 305 285, 305 240 Z" fill="#8ec99e"/>
      <path d="M290 282 L510 282" stroke="#3a8f5b" stroke-width="26" stroke-linecap="round"/>
      <path d="M345 282 L345 415" stroke="#3a8f5b" stroke-width="22" stroke-linecap="round"/>
      <path d="M455 282 L455 415" stroke="#3a8f5b" stroke-width="22" stroke-linecap="round"/>
      <rect x="160" y="420" width="480" height="76" rx="20" fill="rgba(255,255,255,0.74)"/>
      <text x="400" y="470" text-anchor="middle" font-size="42" font-family="Arial, sans-serif" fill="#1b6f35" font-weight="700">${productName}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function ProductCard({
  product,
  quantityInCart,
  onAdd,
  onDecrease,
}: {
  product: Product
  quantityInCart: number
  onAdd: (product: Product) => void
  onDecrease: (productId: string) => void
}) {
  const [imageSrc, setImageSrc] = useState(product.image)

  useEffect(() => {
    setImageSrc(product.image)
  }, [product.image])

  const hasBadge = Boolean(product.tag && product.tag.trim())

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {hasBadge && <span className="product-tag">{product.tag}</span>}
        <img
          src={imageSrc}
          alt={product.name}
          onError={() => {
            setImageSrc(createProductFallback(product.name))
          }}
        />
      </div>

      <div className="product-body">
        <h3>{product.name}</h3>
        <p>{product.quantity}</p>

        <div className="price-row">
          <div className="price-stack">
            <strong>{formatCurrency(product.price)}</strong>
            {product.originalPrice && <span>{formatCurrency(product.originalPrice)}</span>}
          </div>

          {quantityInCart > 0 ? (
            <div className="counter-control">
              <button
                type="button"
                aria-label={`Decrease quantity for ${product.name}`}
                onClick={() => onDecrease(product.id)}
              >
                <Minus size={14} />
              </button>
              <span>{quantityInCart}</span>
              <button
                type="button"
                aria-label={`Increase quantity for ${product.name}`}
                onClick={() => onAdd(product)}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button type="button" className="add-button" onClick={() => onAdd(product)}>
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []

    try {
      const saved = window.localStorage.getItem('little-kart-cart')
      return saved ? (JSON.parse(saved) as CartItem[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem('little-kart-cart', JSON.stringify(cart))
  }, [cart])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = normalizedSearch.length === 0 || product.name.toLowerCase().includes(normalizedSearch)
      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  const cartCount = cart.reduce((count, item) => count + item.quantityCount, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantityCount, 0)
  const deliveryFee = subtotal === 0 || subtotal >= deliveryThreshold ? 0 : 29
  const total = subtotal + deliveryFee

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id)

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantityCount: item.quantityCount + 1 } : item,
        )
      }

      return [...currentCart, { ...product, quantityCount: 1 }]
    })
  }

  const updateQuantity = (productId: string, change: number) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === productId)
      if (!existing) return currentCart

      const nextCount = existing.quantityCount + change
      if (nextCount <= 0) {
        return currentCart.filter((item) => item.id !== productId)
      }

      return currentCart.map((item) =>
        item.id === productId ? { ...item, quantityCount: nextCount } : item,
      )
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand-wrap" aria-label="Little Kart home">
            <div className="brand-logo" aria-label="Little Kart logo">
              <span className="little-word">little</span>
              <span className="kart-word">kart</span>
            </div>
          </div>

          <button type="button" className="location-pill">
            <MapPin size={16} />
            <span>
              Delivering to <strong>Koramangala</strong>
            </span>
          </button>

          <div className="search-wrap" aria-label="Search products">
            <Search size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search groceries"
              aria-label="Search grocery items"
            />
          </div>

          <div className="header-actions">
            <button
              type="button"
              className={`icon-button cart-button ${cartCount > 0 ? 'has-items' : ''}`}
              aria-label="Open cart"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button type="button" className="icon-button account-button" aria-label="Account">
              <UserRound size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="container page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <span className="eyebrow-badge">
                <Clock3 size={16} />
                15 min delivery
              </span>
            </div>
            <h1>Groceries at your doorstep, in minutes.</h1>
            <p>
              From fresh produce to daily essentials, get everything you need without the
              usual store run.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary-button">
                Shop Groceries <ArrowRight size={18} />
              </button>
              <button type="button" className="secondary-button">
                Explore Categories
              </button>
            </div>
            <div className="rating-row">
              <div className="rating-block">
                <Star size={16} fill="currentColor" />
                <span>4.8/5 rated</span>
              </div>
              <div className="rating-block muted">
                <BadgePercent size={16} />
                <span>Free delivery over ₹499</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Fresh groceries visual">
            <div className="basket-scene">
              <img
                className="hero-grocery hero-banana"
                src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80"
                alt="Bananas"
              />
              <img
                className="hero-grocery hero-milk"
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"
                alt="Milk bottle"
              />
              <img
                className="hero-grocery hero-tomato"
                src="https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=80"
                alt="Tomatoes"
              />
              <img
                className="hero-grocery hero-leafy"
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
                alt="Leafy greens"
              />
              <img
                className="hero-grocery hero-bread"
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                alt="Bread"
              />

              <div className="basket-card">
                <div className="basket-header">
                  <span>Your basket</span>
                  <strong>{formatCurrency(subtotal || 289)}</strong>
                </div>

                <div className="basket-list">
                  <div className="basket-row">
                    <span className="basket-name">Bananas</span>
                    <span className="basket-price">{formatCurrency(56)}</span>
                  </div>
                  <div className="basket-row">
                    <span className="basket-name">Milk</span>
                    <span className="basket-price">{formatCurrency(54)}</span>
                  </div>
                  <div className="basket-row">
                    <span className="basket-name">Tomato</span>
                    <span className="basket-price">{formatCurrency(42)}</span>
                  </div>
                  <div className="basket-row">
                    <span className="basket-name">Paneer</span>
                    <span className="basket-price">{formatCurrency(110)}</span>
                  </div>
                </div>

                <div className="basket-meta">
                  <span>Fresh & local</span>
                  <span>Ready in 15 min</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="promo-grid">
          <article className="promo-card primary-promo">
            <div>
              <p className="promo-label">Fresh picks</p>
              <h3>Fresh picks. Better prices.</h3>
            </div>
            <button type="button" className="mini-button">
              Shop now
            </button>
          </article>

          <article className="promo-card secondary-promo">
            <div>
              <p className="promo-label">First order</p>
              <h3>Free delivery on your first order.</h3>
            </div>
            <button type="button" className="mini-button light-button">
              Claim offer
            </button>
          </article>
        </section>

        <section className="category-section">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">Browse</p>
              <h2>Popular categories</h2>
            </div>
            <button type="button" className="ghost-link">
              See all <ChevronRight size={16} />
            </button>
          </div>

          <div className="category-grid">
            {categories.map((category) => {
              const Icon = category.icon

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">
                    <Icon size={18} />
                  </span>
                  <span className="category-name">{category.name}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="products-section">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">Top picks</p>
              <h2>Popular today</h2>
            </div>
            <div className="results-info">{filteredProducts.length} items</div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-results">
              <p>No groceries found</p>
              <span>Try another search or select a different category.</span>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const quantityInCart = cart.find((item) => item.id === product.id)?.quantityCount ?? 0

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantityInCart={quantityInCart}
                    onAdd={addToCart}
                    onDecrease={(productId) => updateQuantity(productId, -1)}
                  />
                )
              })}
            </div>
          )}
        </section>

        <section className="features-section">
          <div className="section-heading-row center-heading">
            <div>
              <p className="section-kicker">Why choose us</p>
              <h2>Healthy groceries, easy living</h2>
            </div>
          </div>

          <div className="feature-grid">
            {featureList.map(({ title, description, icon: Icon }) => (
              <article key={title} className="feature-card">
                <div className="feature-icon">
                  <Icon size={22} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <div className="brand-logo brand-logo-footer" aria-label="Little Kart footer logo">
              <span className="little-word">little</span>
              <span className="kart-word">kart</span>
            </div>
            <p>Fresh groceries for busy everyday life.</p>
          </div>

          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Help</a>
            </div>
            <div>
              <h4>Legal</h4>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Refunds</a>
            </div>
          </div>

          <div className="footer-socials">
            <h4>Follow us</h4>
            <div className="social-icons">
              <a href="#" aria-label="Instagram">
                <Sparkles size={18} />
              </a>
              <a href="#" aria-label="Facebook">
                <Star size={18} />
              </a>
              <a href="#" aria-label="Twitter">
                <Leaf size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Little Kart</span>
          <span>Made for everyday essentials</span>
        </div>
      </footer>

      <div
        className={`cart-overlay ${isCartOpen ? 'visible' : ''}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden={!isCartOpen}
      />

      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div>
            <p className="section-kicker">Your cart</p>
            <h3>{cartCount} items</h3>
          </div>
          <button type="button" className="close-cart" aria-label="Close cart" onClick={() => setIsCartOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={28} />
            <p>Your cart is empty.</p>
            <button type="button" className="primary-button" onClick={() => setIsCartOpen(false)}>
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-meta">
                    <div className="cart-item-header">
                      <h4>{item.name}</h4>
                      <button type="button" className="cart-remove" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                    <p>{item.quantity}</p>
                    <div className="cart-controls">
                      <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantityCount}</span>
                      <button type="button" onClick={() => addToCart(item)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="cart-price">{formatCurrency(item.price * item.quantityCount)}</div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="delivery-message">
                {subtotal >= deliveryThreshold ? (
                  <span>Free delivery unlocked</span>
                ) : (
                  <span>Add {formatCurrency(deliveryThreshold - subtotal)} more for free delivery</span>
                )}
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <strong>{deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}</strong>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
              <button type="button" className="primary-button checkout-btn">
                Checkout • {formatCurrency(total)}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default App
