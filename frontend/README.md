# Frontend - Publitron

## Arquitectura General

El frontend de Publitron está construido como una **Single Page Application (SPA)** utilizando **JavaScript vanilla** sin frameworks, siguiendo un patrón modular y organizado.

## Estructura del Proyecto

```
frontend/
├── index.html                 # Punto de entrada HTML
├── styles/
│   ├── globals.css           # Estilos globales y variables CSS
│   └── components.css        # Estilos específicos de componentes (vacío)
└── src/
    ├── index.js              # Punto de entrada JavaScript
    ├── components/
    │   ├── App.js            # Componente raíz principal
    │   ├── router.js         # Router basado en hash
    │   ├── layout/
    │   │   ├── Navbar.js     # Barra de navegación funcional
    │   │   ├── Sidebar.js    # Barra lateral (archivo vacío)
    │   │   └── Modal.js      # Componente modal (archivo vacío)
    │   └── views/            # Páginas/Vistas de la aplicación
    │       ├── Login.js      # Página de inicio de sesión completa
    │       ├── Register.js   # Página de registro completa
    │       ├── Dashboard.js  # Panel principal (placeholder básico)
    │       ├── Generator.js  # Generador de contenido completo
    │       ├── Products.js   # Gestión de productos completa
    │       ├── Calendar.js   # Calendario completo
    │       ├── Settings.js   # Configuraciones (archivo vacío)
    │       └── Home.js       # Página de inicio (archivo vacío)
    ├── api/                  # Servicios de API
    │   ├── api.js           # Cliente HTTP genérico
    │   ├── authService.js   # Servicios de autenticación
    │   ├── calendarService.js # Servicios del calendario
    │   ├── generatorService.js # Servicios del generador
    │   └── productsService.js # Servicios de productos
    └── utils/               # Utilidades
        ├── helpers.js       # Funciones auxiliares
        ├── localStorage.js  # Gestión del almacenamiento local
        └── validation.js    # Validaciones (archivo vacío)
```

## Características Técnicas

### 🎯 **Arquitectura**
- **SPA (Single Page Application)**: Navegación sin recargas de página
- **Router basado en hash**: Usa `#/ruta` para navegación
- **Componentes modulares**: Cada vista es un módulo independiente
- **Sin frameworks**: JavaScript vanilla para máxima simplicidad

### 🔐 **Autenticación**
- **Sistema de rutas protegidas**: Algunas rutas requieren autenticación
- **Guard de rutas**: Redirección automática a login si no hay token
- **Almacenamiento local**: Token y datos de usuario en localStorage
- **Logout automático**: Limpieza de datos al cerrar sesión

### 🎨 **Estilos**
- **CSS Variables**: Sistema de colores centralizado
- **Tema oscuro**: Paleta de colores oscura por defecto
- **Diseño responsivo**: Uso de CSS Grid y Flexbox
- **Componentes reutilizables**: Clases CSS para botones, inputs, cards

### 📡 **Comunicación con Backend**
- **API REST**: Cliente HTTP genérico en `api.js`
- **Base URL configurable**: `http://localhost:8000` por defecto
- **Autenticación automática**: Token incluido en headers
- **Manejo de errores**: Gestión centralizada de errores HTTP

## Rutas Disponibles

| Ruta | Componente | Privada | Estado | Descripción |
|------|------------|---------|--------|-------------|
| `/login` | Login.js | ❌ | ✅ Completo | Página de inicio de sesión funcional |
| `/register` | Register.js | ❌ | ✅ Completo | Página de registro funcional |
| `/dashboard` | Dashboard.js | ✅ | ⚠️ Básico | Panel principal (placeholder) |
| `/generator` | Generator.js | ✅ | ✅ Completo | Generador de contenido con IA |
| `/products` | Products.js | ✅ | ✅ Completo | CRUD completo de productos |
| `/calendar` | Calendar.js | ✅ | ✅ Completo | Calendario de eventos completo |
| `/settings` | Settings.js | ✅ | ❌ Vacío | Configuraciones (sin implementar) |
| `/home` | Home.js | ✅ | ❌ Vacío | Página de inicio (sin implementar) |

## Funcionalidades Implementadas

### ✅ **Completamente Funcionales**

#### **🔐 Autenticación**
- Login y registro con validación
- Gestión de tokens JWT
- Protección de rutas
- Logout automático

#### **🎨 Generador de Contenido**
- Formulario completo con opciones de plataforma, tono y estilo
- Generación de texto e imágenes con IA
- Copiado al portapapeles
- Descarga de imágenes generadas
- Manejo de errores y estados de carga

#### **📦 Gestión de Productos**
- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Filtros por nombre y categoría
- Formulario de creación/edición
- Tabla con acciones de editar/eliminar
- Soporte para imágenes de productos

#### **📅 Calendario**
- Vista semanal completa
- Navegación entre semanas
- Creación y edición de eventos
- Filtros por plataforma social
- Interfaz intuitiva con grid de días

### ⚠️ **Parcialmente Implementadas**

#### **📊 Dashboard**
- Solo placeholder básico
- Mensaje de bienvenida
- Sin funcionalidades específicas

### ❌ **Sin Implementar**

#### **⚙️ Configuraciones (Settings.js)**
- Archivo completamente vacío
- Sin funcionalidades

#### **🏠 Página de Inicio (Home.js)**
- Archivo completamente vacío
- Sin funcionalidades

#### **📋 Validaciones (validation.js)**
- Archivo completamente vacío
- Sin sistema de validación

#### **🎨 Estilos de Componentes (components.css)**
- Archivo completamente vacío
- Sin estilos específicos

#### **📱 Componentes de Layout**
- **Sidebar.js**: Archivo vacío
- **Modal.js**: Archivo vacío

## Flujo de la Aplicación

1. **Inicio**: `index.html` carga `src/index.js`
2. **Montaje**: `App.js` inicializa el layout y router
3. **Autenticación**: Verificación de token en localStorage
4. **Navegación**: Router renderiza el componente correspondiente
5. **Interacción**: Componentes manejan eventos y llamadas a API

## Servicios de API

- **authService.js**: Login, registro, gestión de tokens
- **calendarService.js**: CRUD de eventos del calendario
- **generatorService.js**: Generación de contenido con IA
- **productsService.js**: CRUD completo de productos

## Utilidades

- **localStorage.js**: Gestión de persistencia local
- **helpers.js**: Funciones auxiliares (copyToClipboard, downloadFromUrl)
- **validation.js**: Validaciones de formularios (pendiente)

## Estado Actual del Desarrollo

### ✅ **Completado (70%)**
- Estructura base de la aplicación
- Sistema de autenticación completo
- Router funcional
- Estilos básicos
- 4 módulos principales completamente funcionales
- Servicios de API principales

### ⚠️ **Pendiente (30%)**
- Dashboard funcional (solo placeholder)
- Componentes Settings.js y Home.js (archivos vacíos)
- Componentes Sidebar.js y Modal.js (archivos vacíos)
- Estilos específicos en components.css
- Validaciones en validation.js
- Mejoras en la UI/UX del Dashboard

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos y variables CSS
- **JavaScript ES6+**: Módulos, async/await, arrow functions
- **Fetch API**: Comunicación HTTP
- **LocalStorage**: Persistencia de datos
- **FormData**: Manejo de formularios
- **CSS Grid/Flexbox**: Layout responsivo
