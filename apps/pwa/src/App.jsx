import React, { useState, useEffect } from 'react';

// Catalogo Maestro de Hamburguesas
const INITIAL_PRODUCTS = [
  {
    id: 101,
    name: 'Rey de las hamburguesas a la parrilla',
    category: 'A la Parrilla',
    size: 'Doble XXL (350g)',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: 'Carne 100% Angus flameada a la leña de roble, queso cheddar añejo fundido, cebolla caramelizada al bourbon y panceta crocante.',
    badge: '🔥 Destacada'
  },
  {
    id: 102,
    name: 'Hamburguesa Real',
    category: 'Smash',
    size: 'Clásica Smash (220g)',
    price: 11.50,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    description: 'Doble medallón smash con costra caramelizada, queso americano fundido, pepinillos agridulces y aderezo imperial.',
    badge: '👑 Favorita'
  },
  {
    id: 103,
    name: 'Hamburguesa Royal Crispy',
    category: 'Crispy',
    size: 'Crispy Supreme (280g)',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    description: 'Pechuga marinada en suero de leche 24h y 11 especias, ensalada coleslaw fresca con manzana y emulsión honey mustard.',
    badge: '🍗 100% Pechuga'
  },
  {
    id: 104,
    name: 'HamburguesaDouble Whopper',
    category: 'Gigantes XXL',
    size: 'Gigante Monster (400g)',
    price: 15.50,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    description: 'Doble medallón gigante a la parrilla de carbón vivo, lechuga romana, tomate maduro, aros de cebolla morada y salsa tártara.',
    badge: '💥 Doble Carne'
  },
  {
    id: 201,
    name: 'Papas Rústicas Trufadas',
    category: 'Acompañamientos',
    size: 'Porción Grande (250g)',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
    description: 'Papas con piel crujientes por fuera, sazonadas con sal marina, aceite de trufa blanca y queso parmesano rallado.',
    badge: '🍟 Crunchy'
  },
  {
    id: 202,
    name: 'Refresco Artesanal del Bosque',
    category: 'Bebidas',
    size: 'Botella 500ml',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    description: 'Infusión espumosa de frutos rojos con toques de hierbabuena fresca y cítricos.',
    badge: '🥤 Helada'
  }
];

// Ofertas Exclusivas
const SPECIAL_OFFERS = [
  {
    id: 'off-1',
    title: 'Combo Rey Imperial',
    subtitle: 'El favorito de los verdaderos amantes del fuego',
    badge: '-25% OFF',
    regularPrice: 22.49,
    offerPrice: 16.99,
    items: ['Rey de las hamburguesas a la parrilla', 'Papas Rústicas Trufadas', 'Refresco Artesanal'],
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'off-2',
    title: '2x1 Smash Real Fest',
    subtitle: 'Dos clásicos Smash para compartir hoy',
    badge: '2x1 SMASH',
    regularPrice: 23.00,
    offerPrice: 15.90,
    items: ['Hamburguesa Real', 'Hamburguesa Real'],
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'off-3',
    title: 'Combo Royal Crispy Night',
    subtitle: 'Pechuga marinada + papas crocantes doradas',
    badge: 'POPULAR',
    regularPrice: 17.49,
    offerPrice: 13.50,
    items: ['Hamburguesa Royal Crispy', 'Papas Rústicas Trufadas'],
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&auto=format&fit=crop&q=80'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'ofertas' | 'ordenes' | 'perfil'
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBurger, setSelectedBurger] = useState(null);
  const [doneness, setDoneness] = useState('Término Medio');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [deliveryAddress, setDeliveryAddress] = useState('Av. Libertadores 104, Dpto 402');
  const [toastMessage, setToastMessage] = useState(null);

  // Simulated Orders state
  const [orders, setOrders] = useState([
    {
      id: 'NCR-9412',
      date: 'Hoy, 20:15',
      status: 'cocina', // 'cocina' | 'camino' | 'entregado'
      statusLabel: 'En la Parrilla a Fuego Vivo',
      eta: '12 min',
      items: [
        { name: 'Rey de las hamburguesas a la parrilla', qty: 1, price: 14.99, size: 'Doble XXL (350g)' },
        { name: 'Papas Rústicas Trufadas', qty: 1, price: 4.50, size: 'Porción Grande' }
      ],
      total: 19.49,
      payment: '💳 Tarjeta Visa •••• 4242',
      address: 'Av. Libertadores 104, Dpto 402'
    }
  ]);

  // Network & Install Prompt handling
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('Para instalar esta PWA: En tu navegador presiona el menú de opciones y selecciona "Instalar aplicación" o "Agregar a la pantalla principal".');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  // Cart operations
  const addToCart = (product, customExtras = [], customDoneness = null) => {
    const extraTotal = customExtras.reduce((sum, ex) => sum + ex.price, 0);
    const itemPrice = product.price + extraTotal;
    const cartItemId = `${product.id}-${customDoneness || 'std'}-${customExtras.map(e => e.name).sort().join(',')}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => item.cartItemId === cartItemId ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, {
        cartItemId,
        productId: product.id,
        name: product.name,
        price: itemPrice,
        basePrice: product.price,
        size: product.size,
        image: product.image,
        doneness: customDoneness,
        extras: customExtras,
        qty: 1
      }];
    });

    showToast(`🍔 ¡${product.name} agregada al carrito!`);
  };

  const addOfferToCart = (offer) => {
    setCart(prev => [
      ...prev,
      {
        cartItemId: `offer-${offer.id}-${Date.now()}`,
        productId: offer.id,
        name: offer.title,
        price: offer.offerPrice,
        basePrice: offer.regularPrice,
        size: 'Combo Completo',
        image: offer.image,
        extras: [],
        qty: 1,
        isCombo: true
      }
    ]);
    showToast(`🔥 ¡${offer.title} añadido en oferta!`);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeCartItem = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const applyCouponCode = () => {
    const code = coupon.trim().toUpperCase();
    if (code === 'RAPID20' || code === 'NEXTCOLLEGE') {
      setDiscountApplied(0.20);
      setCouponMessage('✅ ¡Cupón del 20% aplicado con éxito!');
    } else {
      setDiscountApplied(0);
      setCouponMessage('❌ Cupón inválido. Prueba con RAPID20');
    }
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discountAmount = cartSubtotal * discountApplied;
  const deliveryFee = cartSubtotal > 20 || cartSubtotal === 0 ? 0.00 : 2.50;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);
  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // Simulate checkout execution
  const simulateCheckout = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: `NCR-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Ahora mismo',
      status: 'cocina',
      statusLabel: 'En la Parrilla a Fuego Vivo',
      eta: '18 min',
      items: cart.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        size: item.size
      })),
      total: cartTotal,
      payment: paymentMethod === 'tarjeta' ? '💳 Tarjeta Crédito/Débito' : paymentMethod === 'apple' ? '📱 Apple / Google Pay' : '💵 Efectivo contra entrega',
      address: deliveryAddress
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCartOpen(false);
    setActiveTab('ordenes');
    showToast('🚀 ¡Simulación de compra completada! Tu orden está en parrilla.');
  };

  // Simulate order stage advancement
  const advanceOrderStatus = (orderId) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        if (ord.status === 'cocina') {
          return {
            ...ord,
            status: 'camino',
            statusLabel: 'Repartidor en Camino (Moto Rapid #42)',
            eta: '6 min'
          };
        } else if (ord.status === 'camino') {
          return {
            ...ord,
            status: 'entregado',
            statusLabel: '¡Entregado! Caliente y listo para comer',
            eta: 'Completado'
          };
        }
      }
      return ord;
    }));
  };

  // Filtered menu
  const filteredProducts = INITIAL_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '74px' }}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
          color: '#070b13',
          padding: '10px 18px',
          borderRadius: '24px',
          fontWeight: '800',
          fontSize: '0.85rem',
          zIndex: 1000,
          boxShadow: '0 10px 25px rgba(245, 158, 11, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          maxWidth: '90%'
        }} className="fade-in">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header style={{
        background: 'rgba(17, 24, 39, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1e293b',
        padding: '14px 18px',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)'
            }}>
              🔥
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.05rem', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                NextCollege Rapid
              </div>
              <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: '700' }}>
                PWA Mobile Store
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '0.72rem',
              padding: '3px 8px',
              borderRadius: '10px',
              fontWeight: '700',
              background: isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: isOnline ? '#10b981' : '#ef4444'
            }}>
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </span>

            {/* Cart Trigger Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                position: 'relative',
                background: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '10px',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '1.1rem'
              }}
              aria-label="Abrir Carrito"
            >
              🛒
              {totalCartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#f59e0b',
                  color: '#070b13',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  borderRadius: '10px',
                  minWidth: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px'
                }}>
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Delivery Address Bar */}
        <div style={{
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.78rem',
          color: '#94a3b8',
          background: '#0b111e',
          padding: '6px 10px',
          borderRadius: '8px',
          border: '1px solid #1e293b'
        }}>
          <span>📍</span>
          <span style={{ color: '#e2e8f0', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {deliveryAddress}
          </span>
          <span style={{ marginLeft: 'auto', color: '#f59e0b', fontSize: '0.7rem', fontWeight: '700' }}>Cambiar</span>
        </div>
      </header>

      {/* Main Content Area based on Active Tab */}
      <main style={{ flex: 1, padding: '16px' }} className="fade-in">
        
        {/* ============================================================== */}
        {/* TAB 1: MENÚ (Catálogo de Hamburguesas)                         */}
        {/* ============================================================== */}
        {activeTab === 'menu' && (
          <div>
            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar hamburguesa a la parrilla..."
                style={{
                  width: '100%',
                  background: '#111827',
                  border: '1px solid #1e293b',
                  borderRadius: '12px',
                  padding: '10px 14px 10px 38px',
                  color: '#f8fafc',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>🔍</span>
            </div>

            {/* Category Filter Chips */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
              {['Todos', 'A la Parrilla', 'Smash', 'Crispy', 'Gigantes XXL', 'Acompañamientos', 'Bebidas'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? '#f59e0b' : '#111827',
                    color: selectedCategory === cat ? '#070b13' : '#94a3b8',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#f59e0b' : '#1e293b',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Section Heading */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff' }}>
                Hamburguesas Destacadas
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {filteredProducts.length} opciones
              </span>
            </div>

            {/* Burgers Cards Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  style={{
                    background: '#111827',
                    border: '1px solid #1e293b',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    padding: '12px',
                    position: 'relative'
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setSelectedBurger(product);
                      setSelectedExtras([]);
                    }}
                    style={{
                      width: '105px',
                      height: '105px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      left: '4px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fbbf24',
                      fontSize: '0.65rem',
                      fontWeight: '800',
                      padding: '2px 5px',
                      borderRadius: '4px'
                    }}>
                      {product.badge}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                    <div>
                      {/* Badge de tamaño */}
                      <span style={{
                        display: 'inline-block',
                        background: 'rgba(56, 189, 248, 0.12)',
                        color: '#38bdf8',
                        fontSize: '0.68rem',
                        fontWeight: '700',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        marginBottom: '4px'
                      }}>
                        📏 {product.size}
                      </span>

                      <h3
                        onClick={() => {
                          setSelectedBurger(product);
                          setSelectedExtras([]);
                        }}
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: '800',
                          color: '#fff',
                          lineHeight: 1.25,
                          cursor: 'pointer',
                          marginBottom: '4px'
                        }}
                      >
                        {product.name}
                      </h3>

                      <p style={{
                        fontSize: '0.76rem',
                        color: '#94a3b8',
                        lineHeight: 1.35,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: '8px'
                      }}>
                        {product.description}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#fbbf24' }}>
                        ${product.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => addToCart(product)}
                        style={{
                          background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                          color: '#070b13',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '6px 14px',
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>+ Agregar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: OFERTAS (Promociones & Combos)                           */}
        {/* ============================================================== */}
        {activeTab === 'ofertas' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff' }}>
                🔥 Combos & Promociones
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Ahorra hasta un 30% en combos exclusivos de hamburguesas a la parrilla.
              </p>
            </div>

            {/* Coupon Welcome Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b, #131b2e)',
              border: '1px dashed #f59e0b',
              borderRadius: '16px',
              padding: '14px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: '800', textTransform: 'uppercase' }}>
                  Cupón para Alumnos & Demos
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff' }}>
                  20% OFF: <span style={{ color: '#fbbf24', letterSpacing: '1px' }}>RAPID20</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Aplica en el carrito antes de simular tu orden.
                </div>
              </div>
              <button
                onClick={() => {
                  setCoupon('RAPID20');
                  setDiscountApplied(0.20);
                  showToast('🎉 ¡Cupón RAPID20 precargado!');
                }}
                style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid #f59e0b',
                  color: '#fbbf24',
                  fontWeight: '800',
                  fontSize: '0.75rem',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Aplicar
              </button>
            </div>

            {/* Offers List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {SPECIAL_OFFERS.map(offer => (
                <div
                  key={offer.id}
                  style={{
                    background: '#111827',
                    border: '1px solid #1e293b',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'relative', height: '140px' }}>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {offer.badge}
                    </span>
                  </div>

                  <div style={{ padding: '14px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff', marginBottom: '2px' }}>
                      {offer.title}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '10px' }}>
                      {offer.subtitle}
                    </p>

                    <div style={{
                      background: '#090d16',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      fontSize: '0.75rem',
                      color: '#cbd5e1',
                      marginBottom: '12px'
                    }}>
                      <strong>Incluye:</strong> {offer.items.join(' + ')}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', textDecoration: 'line-through', marginRight: '6px' }}>
                          ${offer.regularPrice.toFixed(2)}
                        </span>
                        <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#fbbf24' }}>
                          ${offer.offerPrice.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => addOfferToCart(offer)}
                        style={{
                          background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                          color: '#070b13',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 16px',
                          fontSize: '0.82rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          boxShadow: '0 2px 10px rgba(245, 158, 11, 0.4)'
                        }}
                      >
                        Añadir Combo 🔥
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: ORDENES (Simulación y Seguimiento en Vivo)              */}
        {/* ============================================================== */}
        {activeTab === 'ordenes' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff' }}>
                📦 Tus Órdenes & Simulación
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Sigue la preparación en vivo en la parrilla y el trayecto del repartidor.
              </p>
            </div>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: '#64748b' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🍽️</div>
                <div style={{ fontWeight: '700', color: '#94a3b8' }}>No tienes órdenes activas</div>
                <p style={{ fontSize: '0.8rem', marginTop: '6px' }}>
                  Ve al menú, agrega tus hamburguesas y simula tu primera compra.
                </p>
                <button
                  onClick={() => setActiveTab('menu')}
                  style={{
                    marginTop: '16px',
                    background: '#f59e0b',
                    color: '#070b13',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Ir al Menú
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map((ord, idx) => {
                  const isFirst = idx === 0;
                  const stepIndex = ord.status === 'cocina' ? 1 : ord.status === 'camino' ? 2 : 3;

                  return (
                    <div
                      key={ord.id}
                      style={{
                        background: '#111827',
                        border: isFirst ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid #1e293b',
                        borderRadius: '16px',
                        padding: '16px',
                        boxShadow: isFirst ? '0 4px 20px rgba(245, 158, 11, 0.15)' : 'none'
                      }}
                    >
                      {/* Order Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#fff' }}>
                            Orden #{ord.id}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b', marginLeft: '6px' }}>
                            &bull; {ord.date}
                          </span>
                        </div>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: ord.status === 'entregado' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          color: ord.status === 'entregado' ? '#10b981' : '#fbbf24'
                        }}>
                          {ord.status === 'entregado' ? '✅ Entregado' : '🔥 En Proceso'}
                        </span>
                      </div>

                      {/* Timeline Progression */}
                      <div style={{ background: '#090d16', borderRadius: '12px', padding: '12px', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: '700' }}>
                            {ord.statusLabel}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: '800' }}>
                            ETA: {ord.eta}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: stepIndex === 1 ? '35%' : stepIndex === 2 ? '70%' : '100%',
                            background: stepIndex === 3 ? '#10b981' : 'linear-gradient(90deg, #f59e0b, #ef4444)',
                            transition: 'width 0.4s ease'
                          }} />
                        </div>

                        {/* Steps indicator */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.7rem', color: '#64748b' }}>
                          <span style={{ color: stepIndex >= 1 ? '#fbbf24' : '#64748b', fontWeight: stepIndex >= 1 ? '700' : '400' }}>
                            1. Parrilla 🔥
                          </span>
                          <span style={{ color: stepIndex >= 2 ? '#38bdf8' : '#64748b', fontWeight: stepIndex >= 2 ? '700' : '400' }}>
                            2. Repartidor 🛵
                          </span>
                          <span style={{ color: stepIndex === 3 ? '#10b981' : '#64748b', fontWeight: stepIndex === 3 ? '700' : '400' }}>
                            3. Entregado 🎁
                          </span>
                        </div>
                      </div>

                      {/* Items Summary */}
                      <div style={{ borderTop: '1px solid #1e293b', paddingTop: '10px', marginBottom: '12px' }}>
                        {ord.items.map((it, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>
                            <span>{it.qty}x {it.name} <small style={{ color: '#94a3b8' }}>({it.size})</small></span>
                            <span style={{ fontWeight: '700' }}>${(it.price * it.qty).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer & Actions */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', borderTop: '1px solid #1e293b' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Total Pagado ({ord.payment})</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#fbbf24' }}>
                            ${ord.total.toFixed(2)}
                          </div>
                        </div>

                        {ord.status !== 'entregado' && (
                          <button
                            onClick={() => advanceOrderStatus(ord.id)}
                            style={{
                              background: '#1e293b',
                              border: '1px solid #f59e0b',
                              color: '#fbbf24',
                              borderRadius: '8px',
                              padding: '6px 12px',
                              fontSize: '0.75rem',
                              fontWeight: '800',
                              cursor: 'pointer'
                            }}
                          >
                            ⚡ Avanzar Estado (Demo)
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: PERFIL (Fidelidad, Métricas de Consumo & Opciones)       */}
        {/* ============================================================== */}
        {activeTab === 'perfil' && (
          <div>
            {/* User Header */}
            <div style={{
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '18px',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                margin: '0 auto 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
              }}>
                🍔
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff' }}>
                Pablo Valdivia
              </h2>
              <span style={{
                display: 'inline-block',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#fbbf24',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '3px 10px',
                borderRadius: '12px',
                marginTop: '4px'
              }}>
                👑 Nivel: Diamond Grill Master VIP
              </span>
            </div>

            {/* Consumption Metrics for the User */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginBottom: '16px'
            }}>
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8' }}>14</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>Hamburguesas</div>
              </div>
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fbbf24' }}>850</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>Puntos Rapid</div>
              </div>
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#10b981' }}>$198</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>Consumo Total</div>
              </div>
            </div>

            {/* App Settings & Navigation */}
            <div style={{
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>
                Acciones de la Plataforma
              </div>

              {deferredPrompt && (
                <button
                  onClick={handleInstallClick}
                  style={{
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>📲 Instalar PWA en Teléfono</span>
                </button>
              )}

              <a
                href="/"
                style={{
                  background: '#1f2937',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid #374151'
                }}
              >
                <span>🌐 Ir a Landing E-commerce</span>
                <span>&rarr;</span>
              </a>

              <a
                href="/admin"
                style={{
                  background: '#1f2937',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid #374151'
                }}
              >
                <span>⚙️ Abrir Panel Administrativo</span>
                <span>&rarr;</span>
              </a>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '8px',
                borderTop: '1px solid #1e293b',
                fontSize: '0.8rem',
                color: '#94a3b8'
              }}>
                <span>Simulador Modo Offline:</span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  style={{
                    background: isOnline ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: isOnline ? '#ef4444' : '#10b981',
                    border: '1px solid',
                    borderColor: isOnline ? '#ef4444' : '#10b981',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  {isOnline ? 'Simular Offline' : 'Simular Online'}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748b' }}>
              NextCollege Rapid PWA v1.0.0 &bull; Dokploy CI/CD Live
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* FLOATING CART BAR (Shown when cart has items)                 */}
      {/* ============================================================== */}
      {cart.length > 0 && !isCartOpen && (
        <div style={{
          position: 'fixed',
          bottom: '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '448px',
          background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
          color: '#070b13',
          padding: '12px 18px',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 25px rgba(245, 158, 11, 0.5)',
          cursor: 'pointer',
          zIndex: 45
        }} onClick={() => setIsCartOpen(true)} className="slide-up">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#070b13',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: '800',
              borderRadius: '8px',
              padding: '2px 8px'
            }}>
              {totalCartCount}
            </span>
            <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>Ver Carrito</span>
          </div>
          <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>
            ${cartTotal.toFixed(2)} &rarr;
          </span>
        </div>
      )}

      {/* ============================================================== */}
      {/* BOTTOM TAB BAR (Pestañas Inferiores: Menú, Ofertas, Ordenes, Perfil) */}
      {/* ============================================================== */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        height: '66px',
        background: '#0a0f1d',
        borderTop: '1px solid #1e293b',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        alignItems: 'center',
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}>
        {[
          { key: 'menu', label: 'Menú', icon: '🍔' },
          { key: 'ofertas', label: 'Ofertas', icon: '🔥' },
          { key: 'ordenes', label: 'Ordenes', icon: '📦', badge: orders.filter(o => o.status !== 'entregado').length },
          { key: 'perfil', label: 'Perfil', icon: '👤' }
        ].map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: 'none',
                border: 'none',
                color: isActive ? '#f59e0b' : '#64748b',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                cursor: 'pointer',
                position: 'relative',
                height: '100%'
              }}
            >
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{tab.icon}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: isActive ? '800' : '600' }}>{tab.label}</span>
              {Boolean(tab.badge) && (
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '25%',
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ============================================================== */}
      {/* BURGER CUSTOMIZER MODAL                                        */}
      {/* ============================================================== */}
      {selectedBurger && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }} onClick={() => setSelectedBurger(null)}>
          <div
            style={{
              background: '#0f172a',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              border: '1px solid #1e293b',
              width: '100%',
              maxWidth: '480px',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '20px',
              color: '#fff'
            }}
            onClick={(e) => e.stopPropagation()}
            className="slide-up"
          >
            {/* Header image */}
            <div style={{ position: 'relative', height: '180px', borderRadius: '16px', overflow: 'hidden', marginBottom: '14px' }}>
              <img src={selectedBurger.image} alt={selectedBurger.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                onClick={() => setSelectedBurger(null)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '700'
                }}
              >
                &times;
              </button>
            </div>

            <span style={{
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              fontSize: '0.72rem',
              fontWeight: '700',
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              📏 {selectedBurger.size}
            </span>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '6px' }}>{selectedBurger.name}</h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px', lineHeight: 1.4 }}>{selectedBurger.description}</p>

            {/* Meat Temperature Selection */}
            {selectedBurger.category.includes('Parrilla') || selectedBurger.category.includes('Smash') || selectedBurger.category.includes('XXL') ? (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#fbbf24', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Punto de Cocción a la Parrilla:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {['Término Medio', 'Tres Cuartos', 'Bien Cocido'].map(t => (
                    <button
                      key={t}
                      onClick={() => setDoneness(t)}
                      style={{
                        background: doneness === t ? '#f59e0b' : '#1e293b',
                        color: doneness === t ? '#070b13' : '#94a3b8',
                        border: '1px solid',
                        borderColor: doneness === t ? '#f59e0b' : '#334155',
                        borderRadius: '8px',
                        padding: '8px 4px',
                        fontSize: '0.74rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Extras */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#fbbf24', textTransform: 'uppercase', marginBottom: '8px' }}>
                Personaliza con Extras Gourmet:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: '🧀 Queso Cheddar Fundido Extra', price: 1.50 },
                  { name: '🥓 Panceta Crocante Ahumada', price: 1.80 },
                  { name: '🧅 Cebolla Caramelizada al Bourbon', price: 1.20 },
                  { name: '🌶️ Salsa Secreta Chipotle Picante', price: 0.80 }
                ].map(ex => {
                  const isChecked = selectedExtras.some(e => e.name === ex.name);
                  return (
                    <div
                      key={ex.name}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedExtras(selectedExtras.filter(e => e.name !== ex.name));
                        } else {
                          setSelectedExtras([...selectedExtras, ex]);
                        }
                      }}
                      style={{
                        background: isChecked ? 'rgba(245, 158, 11, 0.1)' : '#1e293b',
                        border: isChecked ? '1px solid #f59e0b' : '1px solid #334155',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      <span>{ex.name}</span>
                      <span style={{ fontWeight: '800', color: '#fbbf24' }}>+${ex.price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => {
                  addToCart(selectedBurger, selectedExtras, doneness);
                  setSelectedBurger(null);
                }}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  color: '#070b13',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>Añadir al Carrito</span>
                <span>&bull;</span>
                <span>
                  ${(selectedBurger.price + selectedExtras.reduce((s, e) => s + e.price, 0)).toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SHOPPING CART & CHECKOUT SIMULATOR DRAWER                      */}
      {/* ============================================================== */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }} onClick={() => setIsCartOpen(false)}>
          <div
            style={{
              background: '#0d1322',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              border: '1px solid #1e293b',
              width: '100%',
              maxWidth: '480px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              color: '#fff'
            }}
            onClick={(e) => e.stopPropagation()}
            className="slide-up"
          >
            {/* Cart Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #1e293b',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Carrito de Compras</h3>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {totalCartCount} {totalCartCount === 1 ? 'producto' : 'productos'}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '1.4rem',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748b' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🛒</div>
                  <div style={{ fontWeight: '700', color: '#94a3b8' }}>Tu carrito está vacío</div>
                  <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Agrega una de nuestras hamburguesas a la parrilla.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cart.map(item => (
                    <div
                      key={item.cartItemId}
                      style={{
                        background: '#131b2e',
                        border: '1px solid #1e293b',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#fff', lineHeight: 1.2 }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>
                          {item.size} {item.doneness && `• ${item.doneness}`}
                        </div>
                        {item.extras && item.extras.length > 0 && (
                          <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>
                            +{item.extras.map(e => e.name.split(' ')[1] || e.name).join(', ')}
                          </div>
                        )}
                        <div style={{ fontSize: '0.85rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '6px',
                            background: '#1e293b',
                            border: '1px solid #334155',
                            color: '#fff',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', minWidth: '16px', textAlign: 'center' }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '6px',
                            background: '#1e293b',
                            border: '1px solid #334155',
                            color: '#fff',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeCartItem(item.cartItemId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '4px',
                            fontSize: '0.85rem'
                          }}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Coupon Section */}
              {cart.length > 0 && (
                <div style={{ marginTop: '16px', background: '#131b2e', padding: '10px 12px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Código cupón (ej: RAPID20)"
                      style={{
                        flex: 1,
                        background: '#090d16',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        color: '#fff',
                        fontSize: '0.78rem',
                        textTransform: 'uppercase'
                      }}
                    />
                    <button
                      onClick={applyCouponCode}
                      style={{
                        background: '#f59e0b',
                        color: '#070b13',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      Canjear
                    </button>
                  </div>
                  {couponMessage && (
                    <div style={{ fontSize: '0.72rem', marginTop: '6px', color: discountApplied > 0 ? '#10b981' : '#ef4444' }}>
                      {couponMessage}
                    </div>
                  )}
                </div>
              )}

              {/* Delivery Address & Payment Method Selector */}
              {cart.length > 0 && (
                <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>
                      Dirección de Entrega:
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#131b2e',
                        border: '1px solid #1e293b',
                        borderRadius: '8px',
                        padding: '7px 10px',
                        color: '#fff',
                        fontSize: '0.8rem',
                        marginTop: '4px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>
                      Método de Pago:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '4px' }}>
                      {[
                        { id: 'tarjeta', label: '💳 Tarjeta' },
                        { id: 'apple', label: '📱 ApplePay' },
                        { id: 'efectivo', label: '💵 Efectivo' }
                      ].map(pm => (
                        <button
                          key={pm.id}
                          onClick={() => setPaymentMethod(pm.id)}
                          style={{
                            background: paymentMethod === pm.id ? 'rgba(245, 158, 11, 0.2)' : '#131b2e',
                            color: paymentMethod === pm.id ? '#fbbf24' : '#94a3b8',
                            border: '1px solid',
                            borderColor: paymentMethod === pm.id ? '#f59e0b' : '#1e293b',
                            borderRadius: '8px',
                            padding: '6px 4px',
                            fontSize: '0.74rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          {pm.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Footer Calculation */}
            {cart.length > 0 && (
              <div style={{
                background: '#090d16',
                borderTop: '1px solid #1e293b',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span>Subtotal:</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>

                {discountApplied > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#10b981' }}>
                    <span>Descuento Promo (20%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span>Envío Express:</span>
                  <span>{deliveryFee === 0 ? <strong style={{ color: '#10b981' }}>GRATIS</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: '900',
                  color: '#fff',
                  borderTop: '1px solid #1e293b',
                  paddingTop: '8px',
                  marginTop: '4px'
                }}>
                  <span>Total:</span>
                  <span style={{ color: '#fbbf24' }}>${cartTotal.toFixed(2)}</span>
                </div>

                {/* Checkout simulation button */}
                <button
                  onClick={simulateCheckout}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    color: '#070b13',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px',
                    fontWeight: '900',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
                    marginTop: '6px'
                  }}
                >
                  🚀 Simular Compra y Enviar a Cocina
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
