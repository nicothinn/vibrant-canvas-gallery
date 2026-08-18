# CARURA - Portafolio de Arte y Murales

Sitio web portafolio para la artista Carura, especializada en murales y decoración interior. Permite展示 proyectos, recibir mensajes de contacto y gestionar el contenido desde un panel de administración.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Estilos:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (Auth, Database, Storage)
- **Routing:** React Router DOM
- **Deploy:** GitHub Pages

## Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.tsx          # Barra de navegación con botón "Iniciar Sesión"
│   ├── Hero.tsx            # Sección principal/banner
│   ├── About.tsx           # Sobre la artista
│   ├── Projects.tsx        # Galería de proyectos (lee de localStorage + Supabase)
│   ├── Testimonials.tsx    # Testimonios de clientes
│   ├── Contact.tsx         # Formulario de contacto → guarda en Supabase
│   ├── Footer.tsx          # Pie de página
│   ├── admin/
│   │   ├── MessagesList.tsx    # Lista de mensajes (lee de Supabase)
│   │   └── ProjectsManager.tsx # CRUD de proyectos + subida de imágenes
│   └── ui/                 # Componentes shadcn/ui (botones, cards, etc.)
├── pages/
│   ├── Index.tsx           # Página principal
│   ├── Admin.tsx           # Panel de administración (login con Supabase Auth)
│   └── NotFound.tsx        # Página 404
├── lib/
│   ├── supabase.ts         # Cliente de Supabase
│   └── utils.ts            # Utilidades (cn para Tailwind)
├── data/
│   └── projectsData.ts     # Datos de proyectos (no se usa, legacy)
└── hooks/
    ├── use-mobile.tsx      # Detecta si es móvil
    └── use-toast.ts        # Hook de notificaciones
```

## Integración con Supabase

### Configuración

El cliente de Supabase está en `src/lib/supabase.ts`:

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qavumxdxhfczrzrtojtq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Tablas

**contact_messages** — Mensajes del formulario de contacto:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | ID único (auto-generado) |
| name | text | Nombre del remitente |
| email | text | Correo de contacto |
| subject | text | Asunto del mensaje |
| message | text | Contenido del mensaje |
| created_at | timestamp | Fecha de creación |

SQL para crear la tabla:

```sql
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table contact_messages enable row level security;

create policy "Anyone can insert messages"
  on contact_messages for insert with check (true);

create policy "Authenticated users can read messages"
  on contact_messages for select using (auth.role() = 'authenticated');

create policy "Authenticated users can delete messages"
  on contact_messages for delete using (auth.role() = 'authenticated');
```

### Storage

**project-images** — Bucket público para imágenes de proyectos:

- Nombre: `project-images`
- Acceso: público
- Estructura: `projects/{timestamp}-{random}.{ext}`

### Autenticación

- Login con email + contraseña (Supabase Auth)
- Solo usuarios autenticados pueden acceder a `/admin`
- Los mensajes de contacto solo son visibles para usuarios autenticados

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/nicothinn/vibrant-canvas-gallery.git
cd vibrant-canvas-gallery

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor corre en `http://localhost:5173` (o el siguiente puerto disponible).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm run deploy` | Deploy a GitHub Pages |

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal (portafolio) |
| `/admin` | Panel de administración (requiere login) |

## Funcionalidades

### Página Principal
- Galería de proyectos con filtro por categoría
- Modal de detalle con carrusel de imágenes
- Formulario de contacto (guarda en Supabase)
- Secciones: Hero, Proyectos, Sobre mí, Testimonios, Contacto

### Panel Admin
- Login con Supabase Auth (email + contraseña)
- Gestión de mensajes de contacto (leer/eliminar)
- Gestión de proyectos (crear/editar/eliminar)
- Subida de imágenes directa a Supabase Storage

## Deploy

### GitHub Pages

```bash
npm run deploy
```

Esto ejecuta `vite build` y sube la carpeta `dist/` a la rama `gh-pages`.

URL: https://nicothinn.github.io/vibrant-canvas-gallery

### Variables de Entorno

No se requieren variables de entorno. Las credenciales de Supabase están hardcodeadas en `src/lib/supabase.ts` (es una app pública con RLS).
