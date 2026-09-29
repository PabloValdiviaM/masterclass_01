import React, { useState, useEffect } from 'react';

// Lista inicial de hamburguesas
const INITIAL_BURGER_LIST = [
  {
    id: 101,
    name: 'Rey de las hamburguesas a la parrilla',
    category: 'A la Parrilla',
    size: 'Doble XXL (350g)',
    price: 14.99,
    stock: 45,
    salesCount: 742,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
    description: 'Carne 100% Angus flameada a la leña de roble, queso cheddar añejo, cebolla al bourbon y panceta crocante.'
  },
  {
    id: 102,
    name: 'Hamburguesa Real',
    category: 'Smash',
    size: 'Clásica Smash (220g)',
    price: 11.50,
    stock: 60,
    salesCount: 512,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop&q=80',
    description: 'Doble medallón smash caramelizado, queso americano fundido, pepinillos agridulces y aderezo imperial.'
  },
  {
    id: 103,
    name: 'Hamburguesa Royal Crispy',
    category: 'Crispy',
    size: 'Crispy Supreme (280g)',
    price: 12.99,
    stock: 35,
    salesCount: 388,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&auto=format&fit=crop&q=80',
    description: 'Pechuga marinada 24h en suero de leche y 11 especias, ensalada coleslaw fresca y honey mustard.'
  },
  {
    id: 104,
    name: 'HamburguesaDouble Whopper',
    category: 'Gigantes XXL',
    size: 'Gigante Monster (400g)',
    price: 15.50,
    stock: 28,
    salesCount: 460,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80',
    description: 'Doble medallón gigante a la parrilla de carbón vivo, lechuga romana, tomate y salsa tártara casera.'
  }
];

// Datos de Consumidores / Clientes según nivel de consumo
const CONSUMERS_DATA = [
  {
    id: 'cli-01',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    avatar: '👨‍💼',
    tier: 'VIP',
    tierBadge: '👑 VIP Gold',
    totalSpent: 342.50,
    ordersCount: 18,
    favoriteBurger: 'Rey de las hamburguesas a la parrilla',
    lastOrder: 'Hoy, 19:40',
    status: 'Activo'
  },
  {
    id: 'cli-02',
    name: 'María Fernández',
    email: 'maria.f@email.com',
    avatar: '👩‍💻',
    tier: 'VIP',
    tierBadge: '👑 VIP Gold',
    totalSpent: 289.00,
    ordersCount: 15,
    favoriteBurger: 'HamburguesaDouble Whopper',
    lastOrder: 'Ayer, 21:15',
    status: 'Activo'
  },
  {
    id: 'cli-03',
    name: 'Sebastián Silva',
    email: 'seba.silva@email.com',
    avatar: '👨‍🍳',
    tier: 'VIP',
    tierBadge: '👑 VIP Gold',
    totalSpent: 215.20,
    ordersCount: 11,
    favoriteBurger: 'Rey de las hamburguesas a la parrilla',
    lastOrder: 'Hace 2 días',
    status: 'Activo'
  },
  {
    id: 'cli-04',
    name: 'Lucía Torres',
    email: 'lucia.t@email.com',
    avatar: '👩‍🎨',
    tier: 'Frecuente',
    tierBadge: '🍔 Frecuente',
    totalSpent: 94.50,
    ordersCount: 6,
    favoriteBurger: 'Hamburguesa Real',
    lastOrder: 'Hace 3 días',
    status: 'Activo'
  },
  {
    id: 'cli-05',
    name: 'Diego Ramírez',
    email: 'diego.r@email.com',
    avatar: '👨‍🔧',
    tier: 'Frecuente',
    tierBadge: '🍔 Frecuente',
    totalSpent: 82.00,
    ordersCount: 5,
    favoriteBurger: 'Hamburguesa Royal Crispy',
    lastOrder: 'Hace 5 días',
    status: 'Activo'
  },
  {
    id: 'cli-06',
    name: 'Camila Rojas',
    email: 'camila.rojas@email.com',
    avatar: '👩‍⚕️',
    tier: 'Frecuente',
    tierBadge: '🍔 Frecuente',
    totalSpent: 68.90,
    ordersCount: 4,
    favoriteBurger: 'Hamburguesa Real',
    lastOrder: 'Hace 1 semana',
    status: 'Activo'
  },
  {
    id: 'cli-07',
    name: 'Mateo Ortiz',
    email: 'mateo.o@email.com',
    avatar: '🏃‍♂️',
    tier: 'Ocasional',
    tierBadge: '⚡ Ocasional',
    totalSpent: 30.50,
    ordersCount: 2,
    favoriteBurger: 'Hamburguesa Royal Crispy',
    lastOrder: 'Hace 2 semanas',
    status: 'Esporádico'
  },
  {
    id: 'cli-08',
    name: 'Valeria Castro',
    email: 'valeria.c@email.com',
    avatar: '🎓',
    tier: 'Ocasional',
    tierBadge: '⚡ Ocasional',
    totalSpent: 15.50,
    ordersCount: 1,
    favoriteBurger: 'HamburguesaDouble Whopper',
    lastOrder: 'Hace 3 semanas',
    status: 'Nuevo'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'burgers' | 'consumers' | 'database'
  const [serverHealth, setServerHealth] = useState(null);
  const [isHealthLoading, setIsHealthLoading] = useState(false);
  const [burgers, setBurgers] = useState(INITIAL_BURGER_LIST);
  const [searchBurger, setSearchBurger] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [consumerFilterTier, setConsumerFilterTier] = useState('Todos');
  const [searchConsumer, setSearchConsumer] = useState('');
  
  // New burger modal form
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBurger, setNewBurger] = useState({
    name: '',
    category: 'A la Parrilla',
    size: 'Doble XXL (350g)',
    price: '',
    stock: '',
    image: '',
    description: ''
  });

  // Fetch health check on mount
  const checkHealth = () => {
    setIsHealthLoading(true);
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setServerHealth(data);
        setIsHealthLoading(false);
      })
      .catch(err => {
        console.error('Error fetching health check:', err);
        setIsHealthLoading(false);
      });
  };

  useEffect(() => {
    checkHealth();

    // Attempt to load products from backend API if available
    fetch('/api/products')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
          // Merge or prioritize backend hamburgers
          const backendBurgers = resData.data.filter(p => 
            p.category?.includes('Parrilla') || 
            p.category?.includes('Crispy') || 
            p.category?.includes('Gigantes') || 
            p.category?.includes('Smash') ||
            p.name?.toLowerCase().includes('hamburguesa') ||
            p.name?.toLowerCase().includes('rey')
          );

          if (backendBurgers.length > 0) {
            const mapped = backendBurgers.map(b => ({
              id: b.id,
              name: b.name,
              category: b.category || 'A la Parrilla',
              size: b.size || (b.name.includes('Rey') ? 'Doble XXL (350g)' : b.name.includes('Real') ? 'Clásica Smash (220g)' : b.name.includes('Royal') ? 'Crispy Supreme (280g)' : 'Gigante Monster (400g)'),
              price: parseFloat(b.price) || 12.99,
              stock: parseInt(b.stock, 10) || 40,
              salesCount: Math.floor(200 + Math.random() * 500),
              isAvailable: true,
              image: b.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
              description: b.description || 'Hamburguesa gourmet a la parrilla de roble.'
            }));
            setBurgers(mapped);
          }
        }
      })
      .catch(() => {
        // Fallback to INITIAL_BURGER_LIST
      });
  }, []);

  // Burger actions
  const toggleBurgerAvailability = (id) => {
    setBurgers(prev => prev.map(b => b.id === id ? { ...b, isAvailable: !b.isAvailable } : b));
  };

  const adjustStock = (id, delta) => {
    setBurgers(prev => prev.map(b => {
      if (b.id === id) {
        const newStock = Math.max(0, b.stock + delta);
        return { ...b, stock: newStock };
      }
      return b;
    }));
  };

  const handleAddBurgerSubmit = async (e) => {
    e.preventDefault();
    if (!newBurger.name || !newBurger.price) return;

    const createdBurger = {
      id: Date.now(),
      name: newBurger.name,
      category: newBurger.category,
      size: newBurger.size || 'Estándar Gourmet (300g)',
      price: parseFloat(newBurger.price) || 12.00,
      stock: parseInt(newBurger.stock, 10) || 30,
      salesCount: 0,
      isAvailable: true,
      image: newBurger.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
      description: newBurger.description || 'Nueva especialidad agregada desde el panel administrativo.'
    };

    setBurgers([createdBurger, ...burgers]);
    setIsAddModalOpen(false);

    // Try posting to API
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: createdBurger.name,
          category: createdBurger.category,
          price: createdBurger.price,
          stock: createdBurger.stock,
          image: createdBurger.image,
          description: createdBurger.description
        })
      });
    } catch (err) {
      console.log('Product added locally to state.');
    }

    setNewBurger({
      name: '',
      category: 'A la Parrilla',
      size: 'Doble XXL (350g)',
      price: '',
      stock: '',
      image: '',
      description: ''
    });
  };

  // Filtered Burgers
  const filteredBurgers = burgers.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchBurger.toLowerCase()) ||
                          b.category.toLowerCase().includes(searchBurger.toLowerCase());
    const matchesCat = filterCategory === 'Todas' || b.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  // Filtered Consumers
  const filteredConsumers = CONSUMERS_DATA.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchConsumer.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchConsumer.toLowerCase()) ||
                          c.favoriteBurger.toLowerCase().includes(searchConsumer.toLowerCase());
    const matchesTier = consumerFilterTier === 'Todos' || c.tier === consumerFilterTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#070b13', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <header style={{
        background: '#0c1220',
        borderBottom: '1px solid #1e293b',
        padding: '14px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
            }}>
              ⚙️
            </div>
            <div>
              <div style={{ fontWeight: '900', fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                NextCollege Rapid
              </div>
              <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: '800', letterSpacing: '0.05em' }}>
                ADMIN DASHBOARD &bull; OPERACIONES & MÉTRICAS
              </div>
            </div>
          </div>

          {/* Nav Links to Other Layers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="/"
              style={{
                background: '#131b2e',
                border: '1px solid #1e293b',
                color: '#38bdf8',
                textDecoration: 'none',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>🌐</span>
              <span>E-commerce</span>
            </a>

            <a
              href="/app"
              style={{
                background: '#131b2e',
                border: '1px solid #1e293b',
                color: '#fbbf24',
                textDecoration: 'none',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>📱</span>
              <span>PWA Mobile</span>
            </a>

            <button
              onClick={checkHealth}
              disabled={isHealthLoading}
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#10b981',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{isHealthLoading ? '⏳' : '🔄'}</span>
              <span>Sincronizar DB</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px', width: '100%', flex: 1 }}>
        
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          borderBottom: '1px solid #1e293b',
          paddingBottom: '12px',
          marginBottom: '24px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: '📊 Visión General & Métricas', icon: '📊' },
            { id: 'burgers', label: `🍔 Catálogo de Hamburguesas (${burgers.length})`, icon: '🍔' },
            { id: 'consumers', label: '👥 Consumidores por Consumo', icon: '👥' },
            { id: 'database', label: '🐬 Estado de la Base de Datos', icon: '🐬' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'linear-gradient(135deg, #f59e0b, #ea580c)' : '#111827',
                color: activeTab === tab.id ? '#070b13' : '#94a3b8',
                border: '1px solid',
                borderColor: activeTab === tab.id ? '#f59e0b' : '#1e293b',
                padding: '8px 18px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: '800',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: VISIÓN GENERAL & KPIS                                   */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="fade-in">
            {/* Top KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              
              {/* Metric 1 */}
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase' }}>
                  <span>Ventas Totales</span>
                  <span>💵</span>
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: '900', color: '#fbbf24', marginTop: '6px' }}>
                  $28,450.00
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px', fontWeight: '700' }}>
                  ↑ +18.4% vs mes anterior
                </div>
              </div>

              {/* Metric 2 */}
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase' }}>
                  <span>Consumidores Activos</span>
                  <span>👥</span>
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: '900', color: '#38bdf8', marginTop: '6px' }}>
                  1,420
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px', fontWeight: '700' }}>
                  ↑ +140 nuevos esta semana
                </div>
              </div>

              {/* Metric 3 */}
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase' }}>
                  <span>Hamburguesa Estrella</span>
                  <span>🔥</span>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#fff', marginTop: '8px', lineHeight: 1.2 }}>
                  Rey de las hamburguesas
                </div>
                <div style={{ fontSize: '0.75rem', color: '#f59e0b', marginTop: '4px', fontWeight: '700' }}>
                  742 unidades vendidas (46% volumen)
                </div>
              </div>

              {/* Metric 4 */}
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase' }}>
                  <span>Estado Base de Datos</span>
                  <span>🐬</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: serverHealth?.database?.connected ? '#10b981' : '#f59e0b', marginTop: '8px' }}>
                  {serverHealth?.database?.mode === 'mysql' ? 'MySQL 8.0 Activo' : 'Modo In-Memory'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                  Host: {serverHealth?.database?.host || 'Auto-detect'}
                </div>
              </div>
            </div>

            {/* Segmentation & Breakdown Banner */}
            <div style={{
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff' }}>
                    Segmentación de Consumidores según Volumen de Consumo
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    Análisis de facturación, frecuencia de compra y ticket promedio por nivel de fidelidad.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('consumers')}
                  style={{
                    background: '#1f2937',
                    border: '1px solid #374151',
                    color: '#fbbf24',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  Ver Lista Completa &rarr;
                </button>
              </div>

              {/* Tier Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                
                {/* VIP */}
                <div style={{ background: '#090d16', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontSize: '0.75rem', fontWeight: '800', padding: '3px 8px', borderRadius: '6px' }}>
                      👑 VIP Gold (&gt; $100)
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700' }}>380 Clientes (27%)</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24' }}>
                    $12,840.00 <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>facturados (45%)</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '6px' }}>
                    &bull; Ticket Promedio: <strong>$33.80</strong> / orden<br/>
                    &bull; Hamburguesa Favorita: <strong>Rey de las hamburguesas a la parrilla</strong>
                  </div>
                </div>

                {/* Frecuente */}
                <div style={{ background: '#090d16', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: '800', padding: '3px 8px', borderRadius: '6px' }}>
                      🍔 Frecuentes ($40 - $100)
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700' }}>620 Clientes (44%)</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8' }}>
                    $10,540.00 <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>facturados (37%)</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '6px' }}>
                    &bull; Ticket Promedio: <strong>$22.50</strong> / orden<br/>
                    &bull; Hamburguesa Favorita: <strong>Hamburguesa Real (Smash)</strong>
                  </div>
                </div>

                {/* Ocasional */}
                <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ background: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', fontSize: '0.75rem', fontWeight: '800', padding: '3px 8px', borderRadius: '6px' }}>
                      ⚡ Ocasionales (&lt; $40)
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700' }}>420 Clientes (29%)</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#94a3b8' }}>
                    $5,070.00 <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>facturados (18%)</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '6px' }}>
                    &bull; Ticket Promedio: <strong>$14.90</strong> / orden<br/>
                    &bull; Hamburguesa Favorita: <strong>Hamburguesa Royal Crispy</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Available Hamburgers Summary */}
            <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '20px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff' }}>
                  Hamburguesas Disponibles en Cocina
                </h2>
                <button
                  onClick={() => setActiveTab('burgers')}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    border: 'none',
                    color: '#070b13',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  Gestionar Catálogo &rarr;
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {burgers.map(b => (
                  <div
                    key={b.id}
                    style={{
                      background: '#090d16',
                      border: b.isAvailable ? '1px solid #1e293b' : '1px solid #ef4444',
                      borderRadius: '14px',
                      padding: '14px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}
                  >
                    <img src={b.image} alt={b.name} style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '700' }}>{b.size}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#fff', lineHeight: 1.2 }}>{b.name}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>
                        ${b.price.toFixed(2)} &bull; <span style={{ color: b.stock > 10 ? '#10b981' : '#ef4444', fontSize: '0.75rem' }}>Stock: {b.stock}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: CATÁLOGO DE HAMBURGUESAS (Requisito 3)                   */}
        {/* ============================================================== */}
        {activeTab === 'burgers' && (
          <div className="fade-in">
            {/* Header & Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
              marginBottom: '20px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>
                  Catálogo de Hamburguesas Disponibles
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Administra disponibilidad, stock en parrilla y especificaciones comerciales.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Buscar hamburguesa..."
                  value={searchBurger}
                  onChange={(e) => setSearchBurger(e.target.value)}
                  style={{
                    background: '#111827',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{
                    background: '#111827',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                >
                  <option value="Todas">Todas las categorías</option>
                  <option value="A la Parrilla">A la Parrilla</option>
                  <option value="Smash">Smash</option>
                  <option value="Crispy">Crispy</option>
                  <option value="Gigantes XXL">Gigantes XXL</option>
                </select>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    color: '#070b13',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>+ Agregar Hamburguesa</span>
                </button>
              </div>
            </div>

            {/* Burgers Table */}
            <div style={{
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#090d16', borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Hamburguesa</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Tamaño / Gramaje</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Categoría</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Precio</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Stock en Parrilla</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Ventas</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Estado</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBurgers.map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid #1e293b' }}>
                        
                        {/* Name & Photo */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={b.image}
                              alt={b.name}
                              style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: '800', color: '#fff', fontSize: '0.92rem' }}>{b.name}</div>
                              <div style={{ color: '#94a3b8', fontSize: '0.75rem', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {b.description}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Size Badge */}
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            background: 'rgba(56, 189, 248, 0.15)',
                            color: '#38bdf8',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontWeight: '700',
                            fontSize: '0.75rem',
                            whiteSpace: 'nowrap'
                          }}>
                            📏 {b.size}
                          </span>
                        </td>

                        {/* Category */}
                        <td style={{ padding: '14px 18px', color: '#cbd5e1', fontWeight: '600' }}>
                          {b.category}
                        </td>

                        {/* Price */}
                        <td style={{ padding: '14px 18px', fontWeight: '900', color: '#fbbf24', fontSize: '1rem' }}>
                          ${b.price.toFixed(2)}
                        </td>

                        {/* Stock Controls */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              onClick={() => adjustStock(b.id, -5)}
                              style={{
                                background: '#1e293b',
                                border: '1px solid #334155',
                                color: '#fff',
                                width: '24px',
                                height: '24px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: '800'
                              }}
                            >
                              -
                            </button>
                            <span style={{
                              fontWeight: '800',
                              minWidth: '28px',
                              textAlign: 'center',
                              color: b.stock > 10 ? '#10b981' : '#ef4444'
                            }}>
                              {b.stock}
                            </span>
                            <button
                              onClick={() => adjustStock(b.id, 5)}
                              style={{
                                background: '#1e293b',
                                border: '1px solid #334155',
                                color: '#fff',
                                width: '24px',
                                height: '24px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: '800'
                              }}
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Sales */}
                        <td style={{ padding: '14px 18px', color: '#94a3b8', fontWeight: '600' }}>
                          {b.salesCount} pedidas
                        </td>

                        {/* Status */}
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            display: 'inline-block',
                            background: b.isAvailable ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: b.isAvailable ? '#10b981' : '#ef4444',
                            border: '1px solid',
                            borderColor: b.isAvailable ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontWeight: '800',
                            fontSize: '0.72rem'
                          }}>
                            {b.isAvailable ? '🟢 Disponible' : '🔴 Agotado'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => toggleBurgerAvailability(b.id)}
                            style={{
                              background: b.isAvailable ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                              color: b.isAvailable ? '#ef4444' : '#10b981',
                              border: '1px solid',
                              borderColor: b.isAvailable ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)',
                              borderRadius: '6px',
                              padding: '5px 10px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            {b.isAvailable ? 'Pausar' : 'Activar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CONSUMIDORES POR CONSUMO (Requisito 3)                   */}
        {/* ============================================================== */}
        {activeTab === 'consumers' && (
          <div className="fade-in">
            {/* Header & Filter Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
              marginBottom: '20px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>
                  Métricas de Consumidores / Clientes según Consumo
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Listado clasificado de clientes por volumen de compra, órdenes completadas y lealtad.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  value={searchConsumer}
                  onChange={(e) => setSearchConsumer(e.target.value)}
                  style={{
                    background: '#111827',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />

                <div style={{ display: 'flex', gap: '6px' }}>
                  {['Todos', 'VIP', 'Frecuente', 'Ocasional'].map(tier => (
                    <button
                      key={tier}
                      onClick={() => setConsumerFilterTier(tier)}
                      style={{
                        background: consumerFilterTier === tier ? '#f59e0b' : '#111827',
                        color: consumerFilterTier === tier ? '#070b13' : '#94a3b8',
                        border: '1px solid',
                        borderColor: consumerFilterTier === tier ? '#f59e0b' : '#1e293b',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Consumers Table */}
            <div style={{
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#090d16', borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Consumidor / Cliente</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Nivel de Consumo</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Total Gastado</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Órdenes Totales</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Hamburguesa Favorita</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800' }}>Última Compra</th>
                      <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConsumers.map((c) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #1e293b' }}>
                        
                        {/* Avatar & Name */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              background: '#1e293b',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.2rem'
                            }}>
                              {c.avatar}
                            </div>
                            <div>
                              <div style={{ fontWeight: '800', color: '#fff' }}>{c.name}</div>
                              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{c.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Tier Badge */}
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            display: 'inline-block',
                            background: c.tier === 'VIP' ? 'rgba(245, 158, 11, 0.15)' : c.tier === 'Frecuente' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                            color: c.tier === 'VIP' ? '#fbbf24' : c.tier === 'Frecuente' ? '#38bdf8' : '#94a3b8',
                            border: '1px solid',
                            borderColor: c.tier === 'VIP' ? 'rgba(245, 158, 11, 0.4)' : c.tier === 'Frecuente' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(148, 163, 184, 0.3)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontWeight: '800',
                            fontSize: '0.72rem'
                          }}>
                            {c.tierBadge}
                          </span>
                        </td>

                        {/* Total Spent */}
                        <td style={{ padding: '14px 18px', fontWeight: '900', color: '#fbbf24', fontSize: '1.05rem' }}>
                          ${c.totalSpent.toFixed(2)}
                        </td>

                        {/* Orders count */}
                        <td style={{ padding: '14px 18px', color: '#cbd5e1', fontWeight: '700' }}>
                          {c.ordersCount} compras
                        </td>

                        {/* Favorite Burger */}
                        <td style={{ padding: '14px 18px', color: '#f8fafc', fontWeight: '600' }}>
                          🍔 {c.favoriteBurger}
                        </td>

                        {/* Last Order */}
                        <td style={{ padding: '14px 18px', color: '#94a3b8' }}>
                          {c.lastOrder}
                        </td>

                        {/* Status */}
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <span style={{
                            background: c.status === 'Activo' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                            color: c.status === 'Activo' ? '#10b981' : '#f59e0b',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontWeight: '800',
                            fontSize: '0.72rem'
                          }}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: ESTADO DE LA BASE DE DATOS (Requisito 3)                */}
        {/* ============================================================== */}
        {activeTab === 'database' && (
          <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700' }}>
                  <span>🐬</span>
                  <span>MONITOR DE INFRAESTRUCTURA Y CONEXIÓN</span>
                </div>
                <button
                  onClick={checkHealth}
                  style={{
                    background: '#1f2937',
                    border: '1px solid #374151',
                    color: '#fbbf24',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {isHealthLoading ? 'Pingeando...' : 'Re-test Conexión'}
                </button>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '8px' }}>
                Estado de la Base de Datos
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '24px' }}>
                Monitoreo en tiempo real del pool de conexiones MySQL y fallback resiliente en memoria para Dokploy CI/CD.
              </p>

              {/* Status Banner */}
              <div style={{
                background: serverHealth?.database?.connected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                border: '1px solid',
                borderColor: serverHealth?.database?.connected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                borderRadius: '14px',
                padding: '18px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{ fontSize: '2rem' }}>
                  {serverHealth?.database?.connected ? '🐬' : '⚡'}
                </div>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: serverHealth?.database?.connected ? '#10b981' : '#fbbf24' }}>
                    {serverHealth?.database?.mode === 'mysql' ? 'Conexión Activa y Saludable a MySQL' : 'Operando en Modo In-Memory Resiliente'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                    {serverHealth?.database?.connected
                      ? 'Las transacciones y pedidos se persisten en las tablas relacionales de MySQL.'
                      : 'El backend mantiene los datos en memoria para garantizar Zero Downtime si MySQL no responde.'}
                  </div>
                </div>
              </div>

              {/* Technical Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '24px' }}>
                <div style={{ background: '#090d16', padding: '14px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Host / Dirección IP</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
                    {serverHealth?.database?.host || '172.18.0.1 (Docker Host)'}
                  </div>
                </div>

                <div style={{ background: '#090d16', padding: '14px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Nombre de la Base de Datos</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
                    {serverHealth?.database?.database || 'demo'}
                  </div>
                </div>

                <div style={{ background: '#090d16', padding: '14px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Uptime del Servidor</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>
                    {serverHealth?.uptime ? `${Math.floor(serverHealth.uptime)} segundos` : 'En línea'}
                  </div>
                </div>

                <div style={{ background: '#090d16', padding: '14px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Latencia Ping / Health</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#38bdf8', marginTop: '4px' }}>
                    12ms &bull; OK
                  </div>
                </div>
              </div>

              {/* Direct API Links */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href="/api/health"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#1f2937',
                    color: '#38bdf8',
                    textDecoration: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    border: '1px solid #374151'
                  }}
                >
                  🩺 Abrir JSON /api/health
                </a>
                <a
                  href="/api/products"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#1f2937',
                    color: '#fbbf24',
                    textDecoration: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    border: '1px solid #374151'
                  }}
                >
                  📦 Abrir JSON /api/products
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* MODAL: AGREGAR NUEVA HAMBURGUESA                               */}
      {/* ============================================================== */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setIsAddModalOpen(false)}>
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              padding: '24px',
              color: '#fff'
            }}
            onClick={(e) => e.stopPropagation()}
            className="fade-in"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>+ Agregar Hamburguesa al Catálogo</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddBurgerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>Nombre de la Hamburguesa:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Hamburguesa Trufada Imperial"
                  value={newBurger.name}
                  onChange={(e) => setNewBurger({ ...newBurger, name: e.target.value })}
                  style={{ width: '100%', background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.85rem', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>Categoría:</label>
                  <select
                    value={newBurger.category}
                    onChange={(e) => setNewBurger({ ...newBurger, category: e.target.value })}
                    style={{ width: '100%', background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.85rem', marginTop: '4px' }}
                  >
                    <option value="A la Parrilla">A la Parrilla</option>
                    <option value="Smash">Smash</option>
                    <option value="Crispy">Crispy</option>
                    <option value="Gigantes XXL">Gigantes XXL</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>Tamaño / Gramaje:</label>
                  <input
                    type="text"
                    placeholder="Ej: Doble XXL (350g)"
                    value={newBurger.size}
                    onChange={(e) => setNewBurger({ ...newBurger, size: e.target.value })}
                    style={{ width: '100%', background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.85rem', marginTop: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>Precio ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="14.99"
                    value={newBurger.price}
                    onChange={(e) => setNewBurger({ ...newBurger, price: e.target.value })}
                    style={{ width: '100%', background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.85rem', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>Stock Inicial:</label>
                  <input
                    type="number"
                    required
                    placeholder="50"
                    value={newBurger.stock}
                    onChange={(e) => setNewBurger({ ...newBurger, stock: e.target.value })}
                    style={{ width: '100%', background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.85rem', marginTop: '4px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>URL de Imagen:</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newBurger.image}
                  onChange={(e) => setNewBurger({ ...newBurger, image: e.target.value })}
                  style={{ width: '100%', background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.85rem', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>Descripción:</label>
                <textarea
                  rows="2"
                  placeholder="Ingredientes clave, tipo de carne y aderezo..."
                  value={newBurger.description}
                  onChange={(e) => setNewBurger({ ...newBurger, description: e.target.value })}
                  style={{ width: '100%', background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.85rem', marginTop: '4px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    color: '#070b13',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Guardar Hamburguesa
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    background: '#1e293b',
                    color: '#fff',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', padding: '18px 24px', textAlign: 'center', fontSize: '0.78rem', color: '#64748b' }}>
        NextCollege Rapid Admin &bull; Control Operativo en Tiempo Real &bull; Dokploy CI/CD Architecture
      </footer>
    </div>
  );
}
