# ATA-WAY-FRONTEND

## Vercel

Framework:
- `Vite`

Build command:
- `npm run build`

Output directory:
- `dist`

Environment variables:
- `VITE_API_BASE_URL=https://your-backend-domain.com/api`

## Local run

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL` to the backend API URL before deploying to Vercel.
