import React, { useState, useEffect } from "react";

// --- DATOS INICIALES ---
const INITIAL_MENU = [
  {
    id: 1,
    nombre: "1/4 Pollo a la Brasa Tradicional",
    categoria: "Pollos a la Brasa",
    precio: 28.90,
    descripcion: "Jugoso cuarto de pollo marinado con nuestra receta secreta de especias peruanas, servido con papas fritas crujientes y ensalada fresca.",
    imagen: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Pollo Entero Rústica con Ensalada y Papas",
    categoria: "Pollos a la Brasa",
    precio: 79.90,
    descripcion: "Pollo entero dorado a las brasas, papas nativas doradas, ensalada de la casa y nuestras salsas artesanales (Ají de la casa, mayonesa casera).",
    imagen: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80",
    disponible: true,
  },
  {
    id: 3,
    nombre: "Parrilla Familiar Rústica",
    categoria: "Parrillas",
    precio: 139.90,
    descripcion: "Para 4 personas. Bife de chorizo, chuletas de cerdo, anticuchos marinados, chorizos artesanos, choclo tierno y papas doradas.",
    imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    disponible: true,
  },
  {
    id: 4,
    nombre: "Anticuchos de Corazón Tradicionales",
    categoria: "Parrillas",
    precio: 36.90,
    descripcion: "3 palitos de jugosos anticuchos marinados en ají panca y chicha de jora, acompañados de papas doradas y choclo desgranado con crema de huancaína.",
    imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    disponible: true,
  },
  {
    id: 5,
    nombre: "Buffet Criollo Rústica (Por Persona)",
    categoria: "Buffet Criollo",
    precio: 59.90,
    descripcion: "Acceso ilimitado a nuestra barra criolla: Ají de Gallina, Seco de Res con Frijoles, Lomo Saltado, Causa Rellena, Arroz con Pollo y Carapulcra.",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    disponible: true,
  },
  {
    id: 6,
    nombre: "Pisco Sour Catedrático Quebranta",
    categoria: "Coctelería",
    precio: 26.00,
    descripcion: "Cóctel insignia peruano preparado con Pisco Quebranta selección, zumo de limón recién exprimido, jarabe de goma y clara de huevo.",
    imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    disponible: true,
  },
  {
    id: 7,
    nombre: "Chilcano de Pisco Artesanal",
    categoria: "Coctelería",
    precio: 24.00,
    descripcion: "Refrescante cóctel a base de Pisco Acholado, Ginger Ale fina, gotitas de amargo de angostura y abundante hielo.",
    imagen: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    disponible: true,
  },
  {
    id: 8,
    nombre: "Picarones Tradicionales con Miel de Chancaca",
    categoria: "Postres",
    precio: 18.90,
    descripcion: "Crujientes aros de camote y zapallo bañados con nuestra miel casera de chancaca, hoja de higo, clavo y canela.",
    imagen: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    disponible: true,
  }
];

const INITIAL_TABLES = [
  { id: "M1", zona: "Salón Principal", capacidad: 2, posicion: "Ventanal Exterior" },
  { id: "M2", zona: "Salón Principal", capacidad: 4, posicion: "Centro" },
  { id: "M3", zona: "Salón Principal", capacidad: 4, posicion: "Centro" },
  { id: "M4", zona: "Salón Principal", capacidad: 6, posicion: "Esquina Familiar" },
  { id: "M5", zona: "Terraza & Lounge", capacidad: 2, posicion: "Vista Abierta" },
  { id: "M6", zona: "Terraza & Lounge", capacidad: 4, posicion: "Frente al Escenario" },
  { id: "M7", zona: "Terraza & Lounge", capacidad: 8, posicion: "Zona Box Elevada" },
  { id: "M8", zona: "Zona VIP / Box", capacidad: 10, posicion: "Privado VIP 1" },
  { id: "M9", zona: "Zona VIP / Box", capacidad: 12, posicion: "Privado VIP Premium" },
  { id: "M10", zona: "Barra & Coctelería", capacidad: 2, posicion: "Frente a Barra" },
];

const INITIAL_SHIFTS = [
  "12:30 PM - 02:30 PM (Almuerzo A)",
  "02:30 PM - 04:30 PM (Almuerzo B)",
  "07:00 PM - 09:00 PM (Cena A)",
  "09:00 PM - 11:00 PM (Cena & Show B)",
  "11:00 PM - 02:00 AM (Night Life)"
];

const INITIAL_RESERVATIONS = [
  {
    id: "RES-8901",
    clienteNombre: "Carlos Mendoza",
    clienteDni: "45892103",
    clienteTelefono: "987654321",
    clienteEmail: "carlos.mendoza@gmail.com",
    fecha: "2026-10-30",
    turno: "07:00 PM - 09:00 PM (Cena A)",
    mesaId: "M6",
    metodoPago: "YAPE",
    montoPago: 50.00,
    numTransaccion: "YAP-8849102",
    estado: "Confirmado",
    fechaCreacion: "2026-10-25 14:30"
  },
  {
    id: "RES-8902",
    clienteNombre: "María Fernanda Ramos",
    clienteDni: "71209384",
    clienteTelefono: "912345678",
    clienteEmail: "mafer.ramos@outlook.com",
    fecha: "2026-10-31",
    turno: "09:00 PM - 11:00 PM (Cena & Show B)",
    mesaId: "M8",
    metodoPago: "PLIN",
    montoPago: 100.00,
    numTransaccion: "PLN-3392019",
    estado: "Confirmado",
    fechaCreacion: "2026-10-26 10:15"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  
  // Persistencia LocalStorage
  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem("rustica_menu_v1");
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem("rustica_reservas_v1");
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  const [shifts, setShifts] = useState(() => {
    const saved = localStorage.getItem("rustica_horarios_v1");
    return saved ? JSON.parse(saved) : INITIAL_SHIFTS;
  });

  useEffect(() => {
    localStorage.setItem("rustica_menu_v1", JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem("rustica_reservas_v1", JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem("rustica_horarios_v1", JSON.stringify(shifts));
  }, [shifts]);

  // Auth Estado
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [authError, setAuthError] = useState("");

  // Estado del Proceso de Reserva
  const [resFecha, setResFecha] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [resTurno, setResTurno] = useState(INITIAL_SHIFTS[0]);
  const [selectedMesa, setSelectedMesa] = useState(null);
  
  // Datos del Cliente
  const [clientData, setClientData] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    email: "",
    personas: 2,
    notas: ""
  });

  // Pasarela de Pago
  const [paymentMethod, setPaymentMethod] = useState("YAPE");
  const [transactionRef, setTransactionRef] = useState("");
  const [cardDetails, setCardDetails] = useState({
    numero: "",
    vencimiento: "",
    cvv: "",
    titular: ""
  });
  
  const [reservaExitosa, setReservaExitosa] = useState(null);
  const [searchDni, setSearchDni] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  // Filtros Menú
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [searchMenu, setSearchMenu] = useState("");

  // Modales Administrativos
  const [editingDish, setEditingDish] = useState(null);
  const [newDish, setNewDish] = useState({
    nombre: "",
    categoria: "Pollos a la Brasa",
    precio: "",
    descripcion: "",
    imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    disponible: true
  });
  const [isNewDishModalOpen, setIsNewDishModalOpen] = useState(false);
  const [editingRes, setEditingRes] = useState(null);

  // Comprobar disponibilidad de mesa
  const isMesaOccupied = (mesaId, fecha, turno) => {
    return reservations.some(
      (r) => r.mesaId === mesaId && r.fecha === fecha && r.turno === turno && r.estado !== "Cancelado"
    );
  };

  // Manejar creación de reserva
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedMesa) {
      alert("Por favor, selecciona una mesa en el mapa antes de continuar.");
      return;
    }

    if (isMesaOccupied(selectedMesa.id, resFecha, resTurno)) {
      alert("¡Lo sentimos! Esta mesa acaba de ser ocupada en la misma fecha y turno. Por favor selecciona otra mesa.");
      return;
    }

    if (!clientData.nombre || !clientData.dni || !clientData.telefono) {
      alert("Por favor completa tus datos personales obligatorios.");
      return;
    }

    if (paymentMethod === "CARD" && (!cardDetails.numero || !cardDetails.cvv)) {
      alert("Por favor completa los datos de la tarjeta bancaria.");
      return;
    }

    const newResCode = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservationObj = {
      id: newResCode,
      clienteNombre: clientData.nombre,
      clienteDni: clientData.dni,
      clienteTelefono: clientData.telefono,
      clienteEmail: clientData.email,
      personas: clientData.personas,
      notas: clientData.notas,
      fecha: resFecha,
      turno: resTurno,
      mesaId: selectedMesa.id,
      metodoPago: paymentMethod,
      montoPago: 50.00, // Adelanto o monto de reserva fija
      numTransaccion: paymentMethod === "CARD" ? `CARD-${Math.floor(100000 + Math.random() * 900000)}` : (transactionRef || `TRX-${Math.floor(100000 + Math.random() * 900000)}`),
      estado: "Confirmado",
      fechaCreacion: new Date().toLocaleString("es-PE")
    };

    setReservations((prev) => [newReservationObj, ...prev]);
    setReservaExitosa(newReservationObj);
    setSelectedMesa(null);
    setTransactionRef("");
    setClientData({ nombre: "", dni: "", telefono: "", email: "", personas: 2, notas: "" });
  };

  // Manejar Login Admin
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "rustica2026") {
      setIsAdminLoggedIn(true);
      setAuthError("");
    } else {
      setAuthError("Usuario o contraseña incorrectos. (Prueba admin / rustica2026)");
    }
  };

  // Eliminar Reserva
  const handleDeleteReservation = (id) => {
    if (window.confirm(`¿Estás seguro de cancelar e imborrablemente eliminar la reserva ${id}?`)) {
      setReservations((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Búsqueda de reservas por cliente
  const handleSearchByDni = (e) => {
    e.preventDefault();
    if (!searchDni.trim()) return;
    const res = reservations.filter((r) => r.clienteDni.includes(searchDni.trim()) || r.id.toLowerCase().includes(searchDni.trim().toLowerCase()));
    setSearchResults(res);
  };

  // Agregar nuevo plato
  const handleAddDish = (e) => {
    e.preventDefault();
    if (!newDish.nombre || !newDish.precio) return;
    const dishObj = {
      ...newDish,
      id: Date.now(),
      precio: parseFloat(newDish.precio)
    };
    setMenu((prev) => [...prev, dishObj]);
    setIsNewDishModalOpen(false);
    setNewDish({
      nombre: "",
      categoria: "Pollos a la Brasa",
      precio: "",
      descripcion: "",
      imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      disponible: true
    });
  };

  // Editar disponibilidad plato
  const toggleDishAvailability = (id) => {
    setMenu((prev) =>
      prev.map((item) => (item.id === id ? { ...item, disponible: !item.disponible } : item))
    );
  };

  // Eliminar plato
  const handleDeleteDish = (id) => {
    if (window.confirm("¿Eliminar este plato de la carta?")) {
      setMenu((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 flex flex-col font-sans">
      
      {/* --- HEADER PRINCIPAL / NAVEGACIÓN --- */}
      <header className="sticky top-0 z-50 bg-[#1a0f0d]/95 backdrop-blur-md border-b border-amber-900/40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Marca Rústica */}
            <div 
              onClick={() => setActiveTab("inicio")} 
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 via-red-700 to-amber-900 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/30 border border-amber-500/30 group-hover:scale-105 transition-transform">
                <i className="fa-solid fa-drumstick-bite text-2xl text-amber-300"></i>
              </div>
              <div>
                <span className="font-serif-rustica text-2xl font-black tracking-wider text-amber-500 block leading-none">
                  RÚSTICA
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-200/70 font-semibold">
                  RestoBar • Lima Perú
                </span>
              </div>
            </div>

            {/* Menú Navegación Escritorio */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {[
                { id: "inicio", label: "Inicio", icon: "fa-house" },
                { id: "carta", label: "La Carta", icon: "fa-utensils" },
                { id: "reservar", label: "Reservar Mesa", icon: "fa-calendar-check" },
                { id: "buscar", label: "Mi Reserva", icon: "fa-magnifying-glass" },
                { id: "contacto", label: "Contacto", icon: "fa-location-dot" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setReservaExitosa(null);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-amber-600 to-red-700 text-white shadow-md shadow-red-900/20"
                      : "text-gray-300 hover:text-amber-400 hover:bg-white/5"
                  }`}
                >
                  <i className={`fa-solid ${tab.icon} text-xs`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}

              <button
                onClick={() => setActiveTab("admin")}
                className={`ml-3 px-3 py-2 rounded-lg text-sm font-bold border transition-all flex items-center space-x-2 ${
                  activeTab === "admin"
                    ? "bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20"
                    : "border-amber-600/50 text-amber-400 hover:bg-amber-500 hover:text-black"
                }`}
              >
                <i className="fa-solid fa-user-shield"></i>
                <span>Admin</span>
              </button>
            </nav>

            {/* Acceso Móvil Botón Admin */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={() => setActiveTab("admin")}
                className="p-2 bg-amber-600 text-black font-bold rounded-lg text-xs flex items-center space-x-1"
              >
                <i className="fa-solid fa-user-shield"></i>
                <span>Admin</span>
              </button>
            </div>

          </div>

          {/* Menú de Navegación Móvil */}
          <div className="flex md:hidden overflow-x-auto py-2 border-t border-white/10 space-x-2 no-scrollbar">
            {[
              { id: "inicio", label: "Inicio" },
              { id: "carta", label: "Carta" },
              { id: "reservar", label: "Reservar" },
              { id: "buscar", label: "Mi Reserva" },
              { id: "contacto", label: "Contacto" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-white/5 text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </header>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* 1. SECCIÓN INICIO */}
        {activeTab === "inicio" && (
          <div className="space-y-12">
            
            {/* Banner Principal Hero */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-900/30 bg-gradient-to-r from-black via-[#1a0c0a] to-[#2c120e] p-8 sm:p-12 lg:p-16 flex flex-col justify-center min-h-[480px]">
              <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
              <div className="relative z-10 max-w-2xl space-y-6">
                <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full text-xs font-bold tracking-wider uppercase">
                  Sabor, Tradición & Diversión Peruana
                </span>
                <h1 className="font-serif-rustica text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  EL VERDADERO <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">SABOR PERUANO</span> EN UN SOLO LUGAR
                </h1>
                <p className="text-gray-300 text-base sm:text-lg">
                  Disfruta del mejor pollo a la brasa, jugosas parrillas, cócteles peruanos y nuestro legendario buffet criollo con show en vivo en Lima.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab("reservar")}
                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-extrabold rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 flex items-center space-x-2"
                  >
                    <i className="fa-solid fa-chair"></i>
                    <span>RESERVAR MESA AHORA</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("carta")}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-md flex items-center space-x-2"
                  >
                    <i className="fa-solid fa-book-open"></i>
                    <span>VER LA CARTA</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Características Destacadas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 hover:border-amber-500/50 transition-all">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 text-2xl mb-4">
                  <i className="fa-solid fa-fire-burner"></i>
                </div>
                <h3 className="font-serif-rustica text-xl font-bold text-amber-400 mb-2">Pollo a la Brasa & Parrillas</h3>
                <p className="text-gray-400 text-sm">
                  Cocinados a la leña con la sazón tradicional peruana. Crocantes, jugosos e irresistibles.
                </p>
              </div>

              <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 hover:border-amber-500/50 transition-all">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400 text-2xl mb-4">
                  <i className="fa-solid fa-[#lock]"></i>
                  <i className="fa-solid fa-lock"></i>
                </div>
                <h3 className="font-serif-rustica text-xl font-bold text-amber-400 mb-2">Reserva Garantizada</h3>
                <p className="text-gray-400 text-sm">
                  Bloqueo de mesa instantáneo. Al pagar tu reserva con YAPE, PLIN o tarjeta, nadie más podrá reservar esa mesa.
                </p>
              </div>

              <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 hover:border-amber-500/50 transition-all">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 text-2xl mb-4">
                  <i className="fa-solid fa-martini-glass-citrus"></i>
                </div>
                <h3 className="font-serif-rustica text-xl font-bold text-amber-400 mb-2">Coctelería & Show en Vivo</h3>
                <p className="text-gray-400 text-sm">
                  Pisco Sours catedrales, Chilcanos y el mejor ambiente nocturno de Lima con música y shows para toda la familia.
                </p>
              </div>
            </div>

            {/* Vista Previa de Platos */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="font-serif-rustica text-3xl font-black text-amber-400">Platos Favoritos</h2>
                  <p className="text-gray-400 text-sm">Los más pedidos por nuestros clientes en Lima</p>
                </div>
                <button
                  onClick={() => setActiveTab("carta")}
                  className="text-amber-400 hover:text-amber-300 font-bold text-sm flex items-center space-x-1"
                >
                  <span>Ver toda la carta</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {menu.slice(0, 4).map((dish) => (
                  <div key={dish.id} className="bg-[#1e1311] rounded-2xl overflow-hidden border border-amber-900/30 flex flex-col">
                    <img src={dish.imagen} alt={dish.nombre} className="h-48 w-full object-cover" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded">
                          {dish.categoria}
                        </span>
                        <h4 className="font-bold text-white text-base mt-2">{dish.nombre}</h4>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
                        <span className="text-amber-400 font-black text-lg">S/ {dish.precio.toFixed(2)}</span>
                        <span className="text-xs text-green-400 font-semibold bg-green-500/10 px-2 py-1 rounded">
                          Disponible
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. SECCIÓN LA CARTA */}
        {activeTab === "carta" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h1 className="font-serif-rustica text-4xl font-black text-amber-400">NUESTRA CARTA</h1>
              <p className="text-gray-400">Explora la rica gastronomía de Rústica Lima. Precios actualizados y platos preparados al instante.</p>
            </div>

            {/* Barra de Filtro y Búsqueda */}
            <div className="bg-[#1e1311] p-4 rounded-2xl border border-amber-900/30 flex flex-col md:flex-row gap-4 justify-between items-center">
              
              {/* Categorías */}
              <div className="flex overflow-x-auto space-x-2 w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                {["Todos", "Pollos a la Brasa", "Parrillas", "Buffet Criollo", "Coctelería", "Postres"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      categoryFilter === cat
                        ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Búsqueda */}
              <div className="relative w-full md:w-64">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  type="text"
                  placeholder="Buscar plato o bebida..."
                  value={searchMenu}
                  onChange={(e) => setSearchMenu(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Grid de Platos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu
                .filter((item) => categoryFilter === "Todos" || item.categoria === categoryFilter)
                .filter((item) => item.nombre.toLowerCase().includes(searchMenu.toLowerCase()) || item.descripcion.toLowerCase().includes(searchMenu.toLowerCase()))
                .map((dish) => (
                  <div key={dish.id} className="bg-[#1e1311] rounded-2xl overflow-hidden border border-amber-900/30 hover:border-amber-500/50 transition-all flex flex-col">
                    <div className="relative h-52">
                      <img src={dish.imagen} alt={dish.nombre} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 font-black text-amber-400 text-sm">
                        S/ {dish.precio.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-extrabold text-amber-400 tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md">
                          {dish.categoria}
                        </span>
                        <h3 className="font-bold text-white text-lg mt-2">{dish.nombre}</h3>
                        <p className="text-gray-400 text-xs mt-2 leading-relaxed">{dish.descripcion}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${dish.disponible ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                          {dish.disponible ? "Disponible hoy" : "Agotado"}
                        </span>
                        <button 
                          onClick={() => setActiveTab("reservar")}
                          className="text-amber-400 hover:text-amber-300 text-xs font-bold"
                        >
                          Reservar con este plato &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* 3. SECCIÓN RESERVAR MESA & PAGO INTEGRADO */}
        {activeTab === "reservar" && (
          <div>
            {reservaExitosa ? (
              /* PANTALLA CONFIRMACIÓN DE RESERVA */
              <div className="max-w-2xl mx-auto bg-[#1e1311] p-8 rounded-3xl border border-green-500/40 text-center space-y-6 shadow-2xl">
                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-4xl mx-auto border border-green-500/40">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <span className="text-xs text-green-400 font-bold uppercase tracking-widest">¡Mesa Bloqueada Exitosamente!</span>
                  <h2 className="font-serif-rustica text-3xl font-black text-white mt-1">RESERVA CONFIRMADA</h2>
                  <p className="text-gray-400 text-sm mt-1">Tu mesa ha quedado registrada de manera permanente en nuestro sistema.</p>
                </div>

                <div className="bg-black/50 p-6 rounded-2xl border border-white/10 text-left space-y-3">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-gray-400 text-xs uppercase">Código de Reserva</span>
                    <span className="text-amber-400 font-extrabold text-lg">{reservaExitosa.id}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Cliente</p>
                      <p className="font-bold text-white">{reservaExitosa.clienteNombre}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">DNI / Documento</p>
                      <p className="font-bold text-white">{reservaExitosa.clienteDni}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Fecha y Turno</p>
                      <p className="font-bold text-white">{reservaExitosa.fecha} | {reservaExitosa.turno}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Mesa Reservada</p>
                      <p className="font-bold text-amber-400">{reservaExitosa.mesaId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Método de Pago</p>
                      <p className="font-bold text-white">{reservaExitosa.metodoPago} (S/ {reservaExitosa.montoPago.toFixed(2)})</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">N° Operación</p>
                      <p className="font-bold text-gray-300">{reservaExitosa.numTransaccion}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs text-left">
                  <i className="fa-solid fa-circle-info mr-2"></i>
                  Nadie más podrá reservar la mesa <strong>{reservaExitosa.mesaId}</strong> para el turno del <strong>{reservaExitosa.fecha}</strong>. Solo la administración de Rústica puede modificar o cancelar esta reserva.
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setReservaExitosa(null)}
                    className="flex-1 py-3 bg-amber-500 text-black font-extrabold rounded-xl hover:bg-amber-400"
                  >
                    Hacer Otra Reserva
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl"
                  >
                    <i className="fa-solid fa-print mr-2"></i> Imprimir Comprobante
                  </button>
                </div>
              </div>
            ) : (
              /* FORMULARIO DE PASOS DE RESERVA */
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h1 className="font-serif-rustica text-4xl font-black text-amber-400">RESERVA DE MESA</h1>
                  <p className="text-gray-400">Selecciona fecha, turno y elige tu mesa en el mapa interactivo. Bloqueo seguro inmediato.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* COLUMNA IZQUIERDA: SELECCIÓN DE MESAS Y FECHA (8 COLS) */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Filtros de Fecha y Turno */}
                    <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 space-y-4">
                      <h3 className="font-serif-rustica text-lg font-bold text-amber-400 flex items-center space-x-2">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>1. Fecha y Horario de Atención</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Fecha de Visita</label>
                          <input
                            type="date"
                            value={resFecha}
                            onChange={(e) => {
                              setResFecha(e.target.value);
                              setSelectedMesa(null);
                            }}
                            className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Turno Disponible</label>
                          <select
                            value={resTurno}
                            onChange={(e) => {
                              setResTurno(e.target.value);
                              setSelectedMesa(null);
                            }}
                            className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-amber-500"
                          >
                            {shifts.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Leyenda y Croquis de Mesas */}
                    <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 space-y-4">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <h3 className="font-serif-rustica text-lg font-bold text-amber-400 flex items-center space-x-2">
                          <i className="fa-solid fa-[#map]"></i>
                          <i className="fa-solid fa-map"></i>
                          <span>2. Mapa de Mesas y Zonas</span>
                        </h3>
                        <div className="flex items-center space-x-3 text-xs">
                          <span className="flex items-center space-x-1">
                            <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span>
                            <span className="text-gray-300">Libre</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="w-3 h-3 bg-red-600 rounded-full inline-block"></span>
                            <span className="text-gray-300">Ocupada</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="w-3 h-3 bg-amber-400 rounded-full inline-block"></span>
                            <span className="text-gray-300">Tu Selección</span>
                          </span>
                        </div>
                      </div>

                      {/* Grid de Mesas */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                        {INITIAL_TABLES.map((mesa) => {
                          const occupied = isMesaOccupied(mesa.id, resFecha, resTurno);
                          const isSelected = selectedMesa?.id === mesa.id;

                          return (
                            <button
                              key={mesa.id}
                              disabled={occupied}
                              onClick={() => setSelectedMesa(mesa)}
                              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                                occupied
                                  ? "bg-red-950/30 border-red-800/50 cursor-not-allowed opacity-60"
                                  : isSelected
                                  ? "bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400"
                                  : "bg-black/40 border-white/10 hover:border-amber-500/50 hover:bg-white/5"
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <span className="font-serif-rustica text-xl font-black text-white">
                                  {mesa.id}
                                </span>
                                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                                  occupied ? "bg-red-600 text-white" : isSelected ? "bg-amber-400 text-black" : "bg-emerald-500/20 text-emerald-400"
                                }`}>
                                  {occupied ? "OCUPADO" : isSelected ? "SELECCIONADA" : "LIBRE"}
                                </span>
                              </div>
                              <div className="mt-3">
                                <p className="text-xs font-semibold text-gray-300">{mesa.zona}</p>
                                <p className="text-[11px] text-gray-400">{mesa.posicion} • Cap: {mesa.capacidad} personas</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* COLUMNA DERECHA: DATOS CLIENTE Y PAGO (5 COLS) */}
                  <div className="lg:col-span-5 space-y-6">
                    <form onSubmit={handleConfirmBooking} className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 space-y-6">
                      
                      {/* Datos Personales */}
                      <div>
                        <h3 className="font-serif-rustica text-lg font-bold text-amber-400 mb-4 flex items-center space-x-2">
                          <i className="fa-solid fa-user"></i>
                          <span>3. Datos del Titular</span>
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Nombre Completo *</label>
                            <input
                              type="text"
                              required
                              placeholder="Ej. Juan Pérez"
                              value={clientData.nombre}
                              onChange={(e) => setClientData({ ...clientData, nombre: e.target.value })}
                              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">DNI / Pasaporte *</label>
                              <input
                                type="text"
                                required
                                placeholder="8 dígitos"
                                value={clientData.dni}
                                onChange={(e) => setClientData({ ...clientData, dni: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Teléfono WhatsApp *</label>
                              <input
                                type="tel"
                                required
                                placeholder="9XX XXX XXX"
                                value={clientData.telefono}
                                onChange={(e) => setClientData({ ...clientData, telefono: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Correo Electrónico</label>
                            <input
                              type="email"
                              placeholder="correo@ejemplo.com"
                              value={clientData.email}
                              onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Métodos de Pago Peruano */}
                      <div className="border-t border-white/10 pt-4">
                        <h3 className="font-serif-rustica text-lg font-bold text-amber-400 mb-2 flex items-center space-x-2">
                          <i className="fa-solid fa-wallet"></i>
                          <span>4. Pago de Garantía (S/ 50.00)</span>
                        </h3>
                        <p className="text-xs text-gray-400 mb-4">Monto abonado computable en tu consumo final en mesa.</p>

                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {[
                            { id: "YAPE", label: "YAPE", color: "from-purple-600 to-indigo-700" },
                            { id: "PLIN", label: "PLIN", color: "from-cyan-500 to-blue-600" },
                            { id: "CARD", label: "Tarjeta", color: "from-amber-600 to-red-700" },
                          ].map((method) => (
                            <button
                              type="button"
                              key={method.id}
                              onClick={() => setPaymentMethod(method.id)}
                              className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all ${
                                paymentMethod === method.id
                                  ? `bg-gradient-to-r ${method.color} text-white border-white/40 shadow-md`
                                  : "bg-black/40 text-gray-400 border-white/10"
                              }`}
                            >
                              {method.label}
                            </button>
                          ))}
                        </div>

                        {/* Detalle YAPE */}
                        {paymentMethod === "YAPE" && (
                          <div className="bg-purple-950/40 border border-purple-800/50 p-4 rounded-xl text-center space-y-3">
                            <p className="text-xs font-bold text-purple-300">Escanea el QR o Yapea al número oficial Rústica</p>
                            <div className="w-32 h-32 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
                              {/* QR Simulado */}
                              <div className="w-full h-full bg-purple-900/10 border-2 border-dashed border-purple-600 rounded flex flex-col items-center justify-center p-2">
                                <i className="fa-solid fa-qrcode text-4xl text-purple-700"></i>
                                <span className="text-[9px] font-black text-purple-900 mt-1">YAPE RÚSTICA</span>
                              </div>
                            </div>
                            <p className="text-sm font-black text-amber-400">N° YAPE: 987 654 321</p>
                            <div>
                              <label className="block text-[11px] text-gray-300 mb-1">N° de Operación de Yape</label>
                              <input
                                type="text"
                                required
                                placeholder="Ej. 982341"
                                value={transactionRef}
                                onChange={(e) => setTransactionRef(e.target.value)}
                                className="w-full bg-black/60 border border-purple-500/40 rounded-lg px-3 py-1.5 text-xs text-center text-white"
                              />
                            </div>
                          </div>
                        )}

                        {/* Detalle PLIN */}
                        {paymentMethod === "PLIN" && (
                          <div className="bg-cyan-950/40 border border-cyan-800/50 p-4 rounded-xl text-center space-y-3">
                            <p className="text-xs font-bold text-cyan-300">Transfiere con PLIN al celular corporativo</p>
                            <p className="text-base font-black text-amber-400">PLIN: 987 654 321</p>
                            <p className="text-[11px] text-gray-400">Titular: RestoBar Rústica SAC</p>
                            <div>
                              <label className="block text-[11px] text-gray-300 mb-1">N° de Referencia PLIN</label>
                              <input
                                type="text"
                                required
                                placeholder="Ej. PLN-8849"
                                value={transactionRef}
                                onChange={(e) => setTransactionRef(e.target.value)}
                                className="w-full bg-black/60 border border-cyan-500/40 rounded-lg px-3 py-1.5 text-xs text-center text-white"
                              />
                            </div>
                          </div>
                        )}

                        {/* Detalle Tarjeta */}
                        {paymentMethod === "CARD" && (
                          <div className="bg-black/50 border border-white/10 p-4 rounded-xl space-y-3">
                            <div>
                              <label className="block text-[11px] text-gray-300 mb-1">Número de Tarjeta</label>
                              <input
                                type="text"
                                required
                                placeholder="4557 •••• •••• ••••"
                                value={cardDetails.numero}
                                onChange={(e) => setCardDetails({ ...cardDetails, numero: e.target.value })}
                                className="w-full bg-black border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">MM/AA</label>
                                <input
                                  type="text"
                                  placeholder="12/28"
                                  value={cardDetails.vencimiento}
                                  onChange={(e) => setCardDetails({ ...cardDetails, vencimiento: e.target.value })}
                                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-gray-300 mb-1">CVV</label>
                                <input
                                  type="password"
                                  maxLength={4}
                                  placeholder="123"
                                  value={cardDetails.cvv}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Resumen Final & Botón */}
                      <div className="border-t border-white/10 pt-4 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Mesa Seleccionada:</span>
                          <span className="font-extrabold text-amber-400">
                            {selectedMesa ? `${selectedMesa.id} (${selectedMesa.zona})` : "Ninguna"}
                          </span>
                        </div>
                        <button
                          type="submit"
                          disabled={!selectedMesa}
                          className={`w-full py-4 rounded-xl font-extrabold text-sm tracking-wider uppercase transition-all shadow-xl ${
                            selectedMesa
                              ? "bg-gradient-to-r from-amber-500 via-amber-400 to-red-600 hover:from-amber-400 hover:to-red-500 text-black shadow-amber-500/20"
                              : "bg-gray-800 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {selectedMesa ? "PAGAR S/ 50 Y BLOQUEAR MESA" : "SELECCIONA UNA MESA PRIMERO"}
                        </button>
                      </div>

                    </form>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. SECCIÓN BUSCADOR DE RESERVAS PARA CLIENTES */}
        {activeTab === "buscar" && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="font-serif-rustica text-3xl font-black text-amber-400">CONSULTA TU RESERVA</h1>
              <p className="text-gray-400 text-sm">Ingresa tu DNI o el código de reserva asignado para verificar el estado de tu mesa.</p>
            </div>

            <form onSubmit={handleSearchByDni} className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 flex gap-3">
              <input
                type="text"
                required
                placeholder="Ingresa DNI o Código (Ej. RES-8901)..."
                value={searchDni}
                onChange={(e) => setSearchDni(e.target.value)}
                className="flex-1 bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-sm"
              >
                Buscar
              </button>
            </form>

            {searchResults && (
              <div className="space-y-4">
                {searchResults.length === 0 ? (
                  <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 text-center text-gray-400">
                    No se encontraron reservas registradas para el dato ingresado.
                  </div>
                ) : (
                  searchResults.map((r) => (
                    <div key={r.id} className="bg-[#1e1311] p-6 rounded-2xl border border-amber-500/40 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="font-serif-rustica text-lg font-bold text-amber-400">{r.id}</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                          {r.estado}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-gray-400">Titular</p>
                          <p className="font-bold text-white">{r.clienteNombre}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Mesa</p>
                          <p className="font-bold text-amber-400">{r.mesaId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Fecha</p>
                          <p className="font-bold text-white">{r.fecha}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Turno</p>
                          <p className="font-bold text-white">{r.turno}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* 5. SECCIÓN CONTACTO */}
        {activeTab === "contacto" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="font-serif-rustica text-3xl font-black text-amber-400">NUESTROS LOCALES EN LIMA</h1>
              <p className="text-gray-400 text-sm">Ubícanos en las mejores zonas de la ciudad.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 space-y-3">
                <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-xl">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <h3 className="font-serif-rustica text-xl font-bold text-white">Rústica Miraflores</h3>
                <p className="text-gray-400 text-sm">Av. Arequipa 4500, Miraflores - Lima</p>
                <p className="text-amber-400 text-xs font-bold">Atención: Lunes a Domingo 12:00 PM - 02:00 AM</p>
              </div>

              <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 space-y-3">
                <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-xl">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <h3 className="font-serif-rustica text-xl font-bold text-white">Rústica Costa Verde</h3>
                <p className="text-gray-400 text-sm">Malecón Costa Verde, Barranco - Lima</p>
                <p className="text-amber-400 text-xs font-bold">Atención: Lunes a Domingo 12:00 PM - 03:00 AM</p>
              </div>
            </div>
          </div>
        )}

        {/* 6. PANEL DE ADMINISTRACIÓN PROTEGIDO */}
        {activeTab === "admin" && (
          <div>
            {!isAdminLoggedIn ? (
              /* LOGIN DE ADMINISTRADOR */
              <div className="max-w-md mx-auto bg-[#1e1311] p-8 rounded-3xl border border-amber-900/40 shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-amber-500/30">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <h2 className="font-serif-rustica text-2xl font-black text-white">ACCESO ADMINISTRATIVO</h2>
                  <p className="text-gray-400 text-xs">Ingresa tus credenciales para gestionar reservas y el menú.</p>
                </div>

                {authError && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-red-400 text-xs font-semibold text-center">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Usuario</label>
                    <input
                      type="text"
                      required
                      placeholder="admin"
                      value={adminUser}
                      onChange={(e) => setAdminUser(e.target.value)}
                      className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Contraseña</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20"
                  >
                    INGRESAR AL PANEL
                  </button>
                </form>

                <div className="text-center">
                  <span className="text-[11px] text-gray-500">Credenciales por defecto: admin / rustica2026</span>
                </div>
              </div>
            ) : (
              /* DASHBOARD DE ADMINISTRACIÓN COMPLETO */
              <div className="space-y-8">
                
                {/* Header Admin */}
                <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Panel de Control Rústica</span>
                    <h1 className="font-serif-rustica text-3xl font-black text-white">GESTIÓN GERENCIAL</h1>
                  </div>
                  <button
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold"
                  >
                    Cerrar Sesión
                  </button>
                </div>

                {/* DICCIONARIO DE PESTAÑAS ADMIN / RESERVAS Y MENÚ */}
                <div className="space-y-8">
                  
                  {/* SECCIÓN 1: GESTIÓN DE RESERVAS */}
                  <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 space-y-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div>
                        <h2 className="font-serif-rustica text-xl font-bold text-amber-400">RESERVAS REGISTRADAS ({reservations.length})</h2>
                        <p className="text-xs text-gray-400">Bloqueo manual permanente. Puedes eliminar o agregar de forma ilimitada.</p>
                      </div>
                    </div>

                    {/* Tabla de Reservas */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-black/60 text-amber-400 uppercase border-b border-white/10">
                            <th className="p-3">Código</th>
                            <th className="p-3">Cliente / DNI</th>
                            <th className="p-3">Mesa</th>
                            <th className="p-3">Fecha y Turno</th>
                            <th className="p-3">Pago / Ref</th>
                            <th className="p-3">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {reservations.map((r) => (
                            <tr key={r.id} className="hover:bg-white/5">
                              <td className="p-3 font-bold text-amber-400">{r.id}</td>
                              <td className="p-3">
                                <p className="font-bold text-white">{r.clienteNombre}</p>
                                <p className="text-[10px] text-gray-400">DNI: {r.clienteDni} | Tel: {r.clienteTelefono}</p>
                              </td>
                              <td className="p-3">
                                <span className="bg-amber-500/20 text-amber-300 font-extrabold px-2 py-1 rounded">
                                  {r.mesaId}
                                </span>
                              </td>
                              <td className="p-3">
                                <p className="font-semibold text-white">{r.fecha}</p>
                                <p className="text-[10px] text-gray-400">{r.turno}</p>
                              </td>
                              <td className="p-3">
                                <p className="font-bold text-green-400">{r.metodoPago} (S/ {r.montoPago.toFixed(2)})</p>
                                <p className="text-[10px] text-gray-400">{r.numTransaccion}</p>
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() => handleDeleteReservation(r.id)}
                                  className="p-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white rounded-lg transition-all"
                                  title="Eliminar permanentemente"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* SECCIÓN 2: GESTIÓN DE LA CARTA */}
                  <div className="bg-[#1e1311] p-6 rounded-2xl border border-amber-900/30 space-y-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div>
                        <h2 className="font-serif-rustica text-xl font-bold text-amber-400">GESTIÓN DE LA CARTA ({menu.length} Platos)</h2>
                        <p className="text-xs text-gray-400">Modifica precios, disponibilidad o añade nuevos platillos en tiempo real.</p>
                      </div>
                      <button
                        onClick={() => setIsNewDishModalOpen(true)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs flex items-center space-x-2"
                      >
                        <i className="fa-solid fa-plus"></i>
                        <span>Agregar Nuevo Plato</span>
                      </button>
                    </div>

                    {/* Grid de Edición de la Carta */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {menu.map((dish) => (
                        <div key={dish.id} className="bg-black/40 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                          <div className="space-y-1 pr-2">
                            <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                              {dish.categoria}
                            </span>
                            <h4 className="font-bold text-white text-sm">{dish.nombre}</h4>
                            <p className="text-amber-400 font-extrabold text-xs">S/ {dish.precio.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleDishAvailability(dish.id)}
                              className={`p-2 rounded-lg text-xs font-bold ${
                                dish.disponible ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                              }`}
                              title="Cambiar Disponibilidad"
                            >
                              {dish.disponible ? "Activo" : "Agotado"}
                            </button>
                            <button
                              onClick={() => handleDeleteDish(dish.id)}
                              className="p-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-all"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}
          </div>
        )}

      </main>

      {/* MODAL NUEVO PLATO (ADMIN) */}
      {isNewDishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e1311] border border-amber-500/40 p-6 rounded-3xl max-w-md w-full space-y-4">
            <h3 className="font-serif-rustica text-xl font-bold text-amber-400">Agregar Nuevo Plato a la Carta</h3>
            <form onSubmit={handleAddDish} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Nombre del Plato</label>
                <input
                  type="text"
                  required
                  value={newDish.nombre}
                  onChange={(e) => setNewDish({ ...newDish, nombre: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Categoría</label>
                  <select
                    value={newDish.categoria}
                    onChange={(e) => setNewDish({ ...newDish, categoria: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-white text-sm"
                  >
                    <option value="Pollos a la Brasa">Pollos a la Brasa</option>
                    <option value="Parrillas">Parrillas</option>
                    <option value="Buffet Criollo">Buffet Criollo</option>
                    <option value="Coctelería">Coctelería</option>
                    <option value="Postres">Postres</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Precio (S/)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newDish.precio}
                    onChange={(e) => setNewDish({ ...newDish, precio: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Descripción</label>
                <textarea
                  rows={2}
                  value={newDish.descripcion}
                  onChange={(e) => setNewDish({ ...newDish, descripcion: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-white text-sm"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewDishModalOpen(false)}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs"
                >
                  Guardar Plato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#100908] border-t border-amber-900/30 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500 space-y-2">
          <p className="font-serif-rustica text-amber-500 font-bold text-sm">RÚSTICA RESTOBAR - LIMA, PERÚ</p>
          <p>© 2026 Todos los derechos reservados. Pollo a la brasa, Parrillas y Coctelería Peruana.</p>
        </div>
      </footer>

    </div>
  );
}
