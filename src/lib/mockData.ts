// Mock data initialization for admin panel

export const promocionesDataMock = [
  {
    id: "promo-1",
    titulo: "20% OFF Primera visita",
    descripcion: "Obtén 20% de descuento en tu primer servicio de lavado por encargo. Válido para nuevos clientes.",
    activa: true,
    fechaInicio: "2026-01-01",
    fechaFin: "2026-03-31",
    imagenes: {
      desktop: {
        url: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&h=675&fit=crop",
        nombre: "promo-20-off-desktop.jpg",
        tamaño: "2.3 MB",
        dimensiones: "1200x675"
      },
      mobile: {
        url: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=900&fit=crop",
        nombre: "promo-20-off-mobile.jpg",
        tamaño: "1.6 MB",
        dimensiones: "600x900"
      }
    },
    colorFondo: "linear-gradient(135deg, #0000FF 0%, #4B82DF 100%)",
    createdAt: "2026-01-05T10:00:00Z",
    updatedAt: "2026-01-05T10:00:00Z"
  },
  {
    id: "promo-2",
    titulo: "5x4 en Lavado por encargo",
    descripcion: "Trae 5 kilos de ropa y paga solo 4. Promoción válida de lunes a viernes antes de las 2:00 PM.",
    activa: true,
    fechaInicio: "2026-01-10",
    fechaFin: "2026-02-28",
    imagenes: {
      desktop: {
        url: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1200&h=675&fit=crop",
        nombre: "promo-5x4-desktop.jpg",
        tamaño: "2.1 MB",
        dimensiones: "1200x675"
      },
      mobile: {
        url: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&h=900&fit=crop",
        nombre: "promo-5x4-mobile.jpg",
        tamaño: "1.4 MB",
        dimensiones: "600x900"
      }
    },
    colorFondo: "#4B82DF",
    createdAt: "2026-01-05T10:15:00Z",
    updatedAt: "2026-01-05T10:15:00Z"
  },
  {
    id: "promo-3",
    titulo: "$50 BONUS por compra mayor a $300",
    descripcion: "Recibe un bono de $50 MXN para tu próxima visita al realizar una compra mayor a $300 en servicios.",
    activa: true,
    fechaInicio: "2026-01-15",
    fechaFin: "2026-04-15",
    imagenes: {
      desktop: {
        url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=675&fit=crop",
        nombre: "promo-bonus-desktop.jpg",
        tamaño: "2.5 MB",
        dimensiones: "1200x675"
      },
      mobile: {
        url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=900&fit=crop",
        nombre: "promo-bonus-mobile.jpg",
        tamaño: "1.7 MB",
        dimensiones: "600x900"
      }
    },
    colorFondo: "#0033a0",
    createdAt: "2026-01-05T10:30:00Z",
    updatedAt: "2026-01-05T10:30:00Z"
  },
  {
    id: "promo-4",
    titulo: "Listo en 2 HORAS - Servicio Express",
    descripcion: "¿Tienes prisa? Con nuestro servicio express tu ropa estará lista en solo 2 horas. Disponible de lunes a sábado.",
    activa: false,
    fechaInicio: "2025-12-01",
    fechaFin: "2025-12-31",
    imagenes: {
      desktop: {
        url: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=1200&h=675&fit=crop",
        nombre: "promo-express-desktop.jpg",
        tamaño: "2.2 MB",
        dimensiones: "1200x675"
      },
      mobile: {
        url: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&h=900&fit=crop",
        nombre: "promo-express-mobile.jpg",
        tamaño: "1.5 MB",
        dimensiones: "600x900"
      }
    },
    colorFondo: "linear-gradient(135deg, #4B82DF 0%, #0033a0 100%)",
    createdAt: "2025-11-20T10:00:00Z",
    updatedAt: "2025-12-31T23:59:00Z"
  }
];

export const sucursalesDataMock = [
  {
    id: "suc-1",
    nombre: "A LAVAR - Plaza Polígono",
    zona: "Francisco de Montejo",
    estado: "activa",
    direccion: "Calle 21 #299 x 50, Francisco de Montejo",
    ciudad: "Mérida, Yucatán",
    codigoPostal: "97203",
    horario: "Lunes a Domingo: 8:00 AM - 10:00 PM",
    telefono: "999 134 9225",
    linkMaps: "https://maps.google.com/?q=21.0034,-89.6198",
    coordenadas: { lat: 21.0034, lng: -89.6198 },
    imagen: {
      url: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&h=600&fit=crop",
      nombre: "sucursal-poligono.jpg",
      tamaño: "1.8 MB"
    },
    servicios: ["Autoservicio", "Lavado por encargo"],
    caracteristicas: [
      "Estacionamiento gratuito",
      "WiFi disponible",
      "Área de espera climatizada",
      "Máquinas de última generación"
    ],
    activa: true,
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2026-01-05T10:00:00Z"
  },
  {
    id: "suc-2",
    nombre: "A LAVAR - Altabrisa",
    zona: "Altabrisa",
    estado: "activa",
    direccion: "Calle 7 #451 x 20 y 22, Altabrisa",
    ciudad: "Mérida, Yucatán",
    codigoPostal: "97130",
    horario: "Lunes a Domingo: 7:00 AM - 11:00 PM",
    telefono: "999 134 9225",
    linkMaps: "https://maps.google.com/?q=21.0167,-89.6355",
    coordenadas: { lat: 21.0167, lng: -89.6355 },
    imagen: {
      url: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop",
      nombre: "sucursal-altabrisa.jpg",
      tamaño: "2.1 MB"
    },
    servicios: ["Autoservicio", "Lavado por encargo", "Productos por ciclo"],
    caracteristicas: [
      "Abierto hasta las 11 PM",
      "Zona comercial premium",
      "Seguridad 24/7",
      "App de reservación"
    ],
    activa: true,
    createdAt: "2025-12-15T10:00:00Z",
    updatedAt: "2026-01-05T10:00:00Z"
  },
  {
    id: "suc-3",
    nombre: "A LAVAR - Centro Histórico",
    zona: "Centro",
    estado: "proximamente",
    direccion: null,
    ciudad: "Mérida, Yucatán",
    codigoPostal: null,
    horario: null,
    telefono: null,
    linkMaps: null,
    coordenadas: null,
    imagen: {
      url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      nombre: "sucursal-centro-proximamente.jpg",
      tamaño: "1.5 MB"
    },
    servicios: [],
    caracteristicas: [],
    fechaAperturaEstimada: "2026-03-01",
    activa: false,
    createdAt: "2026-01-05T10:00:00Z",
    updatedAt: "2026-01-05T10:00:00Z"
  },
  {
    id: "suc-4",
    nombre: "A LAVAR - Gran Plaza",
    zona: "Norte",
    estado: "proximamente",
    direccion: null,
    ciudad: "Mérida, Yucatán",
    codigoPostal: null,
    horario: null,
    telefono: null,
    linkMaps: null,
    coordenadas: null,
    imagen: {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      nombre: "sucursal-granplaza-proximamente.jpg",
      tamaño: "1.6 MB"
    },
    servicios: [],
    caracteristicas: [],
    fechaAperturaEstimada: "2026-04-15",
    activa: false,
    createdAt: "2026-01-05T10:00:00Z",
    updatedAt: "2026-01-05T10:00:00Z"
  }
];

export const detallePreciosDataMock = {
  imagenDesktop: {
    url: "https://images.unsplash.com/photo-1554224311-beee4ece8964?w=1200&h=800&fit=crop",
    nombre: "detalle-precios-desktop.jpg",
    tamaño: "2.8 MB",
    dimensiones: "1200x800",
    fechaSubida: "2026-01-05T12:00:00Z"
  },
  imagenMobile: {
    url: "https://images.unsplash.com/photo-1554224311-beee4ece8964?w=600&h=900&fit=crop",
    nombre: "detalle-precios-mobile.jpg",
    tamaño: "1.9 MB",
    dimensiones: "600x900",
    fechaSubida: "2026-01-05T12:00:00Z"
  },
  activo: true,
  updatedAt: "2026-01-05T12:00:00Z"
};

export const serviciosDataMock = {
  autoservicio: {
    titulo: "Autoservicio",
    subtitulo: "Tú controlas tu tiempo",
    descripcion: "Equipos comerciales modernos a tu disposición. Rápido, autónomo y sin esperas innecesarias.",
    caracteristicas: [
      "Equipos comerciales modernos",
      "Proceso visible y entendible",
      "Sin filas, sin fricción",
      "Espacios limpios y ordenados",
      "Productos disponibles por ciclo"
    ],
    precios: {
      maquinasChicas: 80,
      maquinasGrandes: 125
    },
    tiempoCiclo: 80,
    productosDisponibles: {
      mostrarBanner: true,
      titulo: "¿Sin productos?",
      descripcion: "Vendemos detergente, blanqueador y suavizante por ciclo.",
      productos: ["Detergente", "Blanqueador", "Suavizante"]
    },
    activo: true
  },
  lavadoPorEncargo: {
    titulo: "Lavado por encargo",
    subtitulo: "Nosotros nos encargamos",
    descripcion: "La solución perfecta para gente ocupada. Delega sin culpa y recibe tu ropa impecable el mismo día.",
    caracteristicas: [
      "Precio claro: $30/kg",
      "Entrega el mismo día",
      "Lavado + secado + doblado",
      "Seguimiento por WhatsApp"
    ],
    precioBase: 30,
    preciosEspeciales: {
      min: 80,
      max: 175,
      etiqueta: "Edredones y Hamacas"
    },
    mostrarBadgePopular: true,
    activo: true
  }
};

export const usuariosDataMock = [
  {
    id: "user-1",
    nombre: "Carlos Mendoza",
    email: "carlos.mendoza@alavar.com",
    rol: "Administrador",
    permisos: ["Promociones", "Sucursales", "Usuarios", "Servicios", "Detalle de Precios"],
    estado: "activo",
    avatar: null,
    createdAt: "2025-10-01T10:00:00Z",
    updatedAt: "2026-01-05T10:00:00Z"
  },
  {
    id: "user-2",
    nombre: "Ana García",
    email: "ana.garcia@alavar.com",
    rol: "Editor",
    permisos: ["Promociones", "Sucursales"],
    estado: "activo",
    avatar: null,
    createdAt: "2025-11-15T10:00:00Z",
    updatedAt: "2026-01-05T10:00:00Z"
  },
  {
    id: "user-3",
    nombre: "Luis Pérez",
    email: "luis.perez@alavar.com",
    rol: "Visualizador",
    permisos: ["Solo vista"],
    estado: "inactivo",
    avatar: null,
    createdAt: "2025-12-01T10:00:00Z",
    updatedAt: "2025-12-20T10:00:00Z"
  }
];

export function initializeMockData() {
  // Only load if no existing data
  if (!localStorage.getItem('promocionesData')) {
    localStorage.setItem('promocionesData', JSON.stringify(promocionesDataMock));
    console.log('✓ Promociones mock cargadas');
  }

  if (!localStorage.getItem('sucursalesData')) {
    localStorage.setItem('sucursalesData', JSON.stringify(sucursalesDataMock));
    console.log('✓ Sucursales mock cargadas');
  }

  if (!localStorage.getItem('detallePreciosData')) {
    localStorage.setItem('detallePreciosData', JSON.stringify(detallePreciosDataMock));
    console.log('✓ Detalle de Precios mock cargado');
  }

  if (!localStorage.getItem('serviciosData')) {
    localStorage.setItem('serviciosData', JSON.stringify(serviciosDataMock));
    console.log('✓ Servicios mock cargados');
  }

  if (!localStorage.getItem('usuariosData')) {
    localStorage.setItem('usuariosData', JSON.stringify(usuariosDataMock));
    console.log('✓ Usuarios mock cargados');
  }

  console.log('🎉 Datos mock inicializados correctamente');
}

export function resetMockData() {
  localStorage.setItem('promocionesData', JSON.stringify(promocionesDataMock));
  localStorage.setItem('sucursalesData', JSON.stringify(sucursalesDataMock));
  localStorage.setItem('detallePreciosData', JSON.stringify(detallePreciosDataMock));
  localStorage.setItem('serviciosData', JSON.stringify(serviciosDataMock));
  localStorage.setItem('usuariosData', JSON.stringify(usuariosDataMock));
  console.log('🔄 Datos mock restablecidos');
}
