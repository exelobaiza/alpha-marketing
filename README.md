# Alpha Marketing

Este es un proyecto construido con Next.js 15, Tailwind CSS y shadcn/ui.

## Requisitos

- Node.js 18.17 o superior
- npm 9.0.0 o superior

## Instalación

```bash
npm install
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Build

Para crear una versión de producción:

```bash
npm run build
```

Para iniciar la versión de producción:

```bash
npm run start
```

## Deploy

Este proyecto está optimizado para ser desplegado en Vercel. Para desplegar:

1. Sube tu código a un repositorio de GitHub
2. Ve a [Vercel](https://vercel.com)
3. Importa tu repositorio
4. ¡Listo! Vercel detectará automáticamente que es un proyecto Next.js y lo configurará correctamente

### Otras plataformas de deploy

También puedes desplegar en:
- Netlify
- Railway
- AWS (usando Elastic Beanstalk o EC2)
- Digital Ocean
- Cualquier servidor que soporte Node.js

## Variables de Entorno

Crea un archivo `.env.local` para desarrollo local con las siguientes variables:

```
# Agrega tus variables de entorno aquí
```

Para producción, asegúrate de configurar las mismas variables en tu plataforma de hosting. 