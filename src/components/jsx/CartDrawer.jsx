import { useCart } from '../../context/CartContext.jsx'
import '../css/CartDrawer.css'

function CartDrawer({ open, onClose }) {
  const { items, removeFromCart, updateQty, cartTotal } = useCart()

  return (
    <>
      <div
        className={`cart-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-drawer-head">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Add a product to get started.</p>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{item.price}</p>
                    <div className="cart-qty">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>Rs.{cartTotal.toLocaleString()}</span>
              </div>
              <button className="cart-checkout">Checkout</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default CartDrawer
