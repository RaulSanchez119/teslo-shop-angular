# 🛍️ Teslo Shop — Angular 21

> Tienda online de ropa Tesla desarrollada con Angular 21. Permite explorar el catálogo de productos por categoría sin necesidad de registro, e incluye un panel de administración completo para gestionar el inventario.

---

## 🚀 Demo

🌐 **App:** [teslo-shop.netlify.app](https://tienda-teslo-angular.netlify.app)
🔗 **API:** [teslo-shop.onrender.com](https://nest-tienda-teslo.onrender.com/api)

---

## ✨ ¿Qué puedes hacer?

### Zona pública
- Explorar el catálogo completo de productos
- Filtrar por categoría: hombre, mujer y niño
- Ver el detalle de cada producto con carrusel de imágenes, tallas, precio, stock y tags

### Zona privada — Panel de administración
- Acceso exclusivo para administradores
- Listado completo de productos con paginación
- Crear nuevos productos con imágenes
- Editar productos existentes

---

## 🧱 Tecnologías

| Tecnología | Uso |
|---|---|
| Angular 21 | Framework principal |
| TypeScript | Lenguaje base |
| TailwindCSS 4 | Estilos |
| DaisyUI 5 | Componentes UI |
| Angular Router | Navegación, guards y lazy loading |
| HttpClient | Comunicación con la API |
| Signals + RxResource | Gestión reactiva del estado |
| Reactive Forms | Formularios de creación y edición |
| Swiper | Carrusel de imágenes |
| Netlify | Despliegue del frontend |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── admin-dashboard/              # Módulo de administración (protegido)
│   │   ├── components/
│   │   │   └── admin-dashboard-layout/
│   │   ├── pages/
│   │   │   ├── dashboard-page/       # Panel principal
│   │   │   ├── product-admin-page/   # Crear / editar producto
│   │   │   └── products-admin-page/  # Listado de productos
│   │   └── admin-dashboard.routes.ts
│   ├── auth/                         # Módulo de autenticación
│   │   ├── layout/
│   │   ├── pages/                    # Página de login
│   │   ├── services/                 # Servicio JWT
│   │   ├── shared/
│   │   └── auth.routes.ts
│   ├── products/                     # Módulo de productos
│   │   ├── components/
│   │   │   ├── product-card/
│   │   │   ├── product-carousel/
│   │   │   └── product-table/
│   │   ├── interfaces/               # Interfaces y enums
│   │   ├── pipes/                    # Pipe productImage
│   │   └── services/                 # Servicio + caché
│   ├── store-front/                  # Tienda pública
│   │   ├── components/
│   │   │   └── front-navbar/
│   │   ├── layouts/
│   │   └── pages/
│   │       ├── gender-page/          # Productos por género
│   │       ├── home-page/
│   │       ├── not-found-page/
│   │       └── product-page/         # Detalle de producto
│   ├── shared/                       # Elementos globales reutilizables
│   ├── utils/                        # Utilidades de formularios
│   ├── app.routes.ts
│   └── app.config.ts
└── environments/
    ├── environment.ts                # Producción
    └── environment.development.ts    # Desarrollo
```
