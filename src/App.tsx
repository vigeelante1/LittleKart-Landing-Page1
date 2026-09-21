import { useEffect, useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Apple,
  ArrowRight,
  BadgePercent,
  Banana,
  Carrot,
  ChevronRight,
  Clock3,
  Coffee,
  Cookie,
  Egg,
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
  icon: LucideIcon
}

interface CartItem {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  quantity: string
  icon?: LucideIcon
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
  { id: 'bananas', name: 'Bananas', category: 'fruits', price: 56, originalPrice: 72, quantity: '1 bunch', icon: Banana },
  { id: 'red-apples', name: 'Red Apples', category: 'fruits', price: 124, originalPrice: 149, quantity: '1 kg', icon: Apple },
  { id: 'tomato', name: 'Tomatoes', category: 'fruits', price: 42, originalPrice: 52, quantity: '1 kg', icon: Leaf },
  { id: 'spinach', name: 'Spinach', category: 'fruits', price: 30, originalPrice: 38, quantity: '200 g', icon: Leaf },
  { id: 'carrot', name: 'Carrots', category: 'fruits', price: 40, originalPrice: 48, quantity: '1 kg', icon: Carrot },
  { id: 'farm-milk', name: 'Farm Fresh Milk', category: 'dairy', price: 54, originalPrice: 66, quantity: '1 litre', icon: Milk },
  { id: 'paneer', name: 'Paneer Cubes', category: 'dairy', price: 110, originalPrice: 128, quantity: '200 g', icon: Milk },
  { id: 'plain-curd', name: 'Plain Curd', category: 'dairy', price: 58, originalPrice: 70, quantity: '500 g', icon: Milk },
  { id: 'eggs', name: 'Free Range Eggs', category: 'dairy', price: 82, originalPrice: 95, quantity: '6 pack', icon: Egg },
  { id: 'whole-wheat-bread', name: 'Whole Wheat Bread', category: 'bakery', price: 48, originalPrice: 58, quantity: '400 g', icon: Sandwich },
  { id: 'basmati-rice', name: 'Basmati Rice', category: 'staples', price: 182, originalPrice: 215, quantity: '1 kg', icon: Package },
  { id: 'chicken', name: 'Chicken Breast', category: 'meat', price: 214, originalPrice: 246, quantity: '500 g', icon: Package },
  { id: 'salmon', name: 'Salmon Fillet', category: 'meat', price: 320, originalPrice: 360, quantity: '250 g', icon: Fish },
]

const featureList = [
  { title: 'Fast delivery', description: 'Fresh groceries at your doorstep in 15–30 minutes.', icon: Truck },
  { title: 'Fresh products', description: 'Curated from trusted farms and local producers.', icon: Leaf },
  { title: 'Easy ordering', description: 'Quick search, one-tap add, and clear cart totals.', icon: Sparkles },
  { title: 'Secure payments', description: 'Cashless, protected, and simple checkout experience.', icon: ShieldCheck },
]

const deliveryThreshold = 499
const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`

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
  const Icon = product.icon

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <div className="product-visual" aria-label={product.name}>
          <div className="visual-backdrop" aria-hidden="true" />
          <Icon size={68} strokeWidth={1.8} />
        </div>
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
      if (!saved) return []

      const parsed = JSON.parse(saved) as Partial<CartItem>[]
      return parsed
        .map((item) => {
          const productMatch = products.find((product) => product.id === item.id)

          return {
            id: item.id ?? productMatch?.id ?? '',
            name: item.name ?? productMatch?.name ?? 'Product',
            category: item.category ?? productMatch?.category ?? 'fruits',
            price: item.price ?? productMatch?.price ?? 0,
            originalPrice: item.originalPrice ?? productMatch?.originalPrice,
            quantity: item.quantity ?? productMatch?.quantity ?? '',
            icon: item.icon ?? productMatch?.icon ?? Apple,
            quantityCount: item.quantityCount ?? 1,
          }
        })
        .filter((item) => item.id)
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
              <div className="hero-grocery hero-banana" aria-label="Bananas illustration">
                <Banana size={52} strokeWidth={1.7} />
              </div>
              <div className="hero-grocery hero-milk" aria-label="Milk illustration">
                <Milk size={42} strokeWidth={1.8} />
              </div>
              <div className="hero-grocery hero-tomato" aria-label="Tomato illustration">
                <Leaf size={46} strokeWidth={1.8} />
              </div>
              <div className="hero-grocery hero-leafy" aria-label="Leafy greens illustration">
                <Leaf size={54} strokeWidth={1.8} />
              </div>
              <div className="hero-grocery hero-bread" aria-label="Bread illustration">
                <Sandwich size={48} strokeWidth={1.8} />
              </div>

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
              {cart.map((item) => {
                const CartIcon = item.icon ?? Apple

                return (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-visual" aria-label={item.name}>
                      <CartIcon size={24} />
                    </div>
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
                        <button type="button" onClick={() => addToCart({ ...item, icon: item.icon ?? Apple })}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="cart-price">{formatCurrency(item.price * item.quantityCount)}</div>
                  </div>
                )
              })}
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
