# NAVOIY-KIYIMDOKON-BACKEND

Bu papka sklad uchun alohida backend.

Struktura:
- `config`
- `controllers`
- `middleware`
- `models`
- `routes`
- `utils`
- `server.js`

Asosiy modullar:
- auth
- categories
- suppliers
- products
- purchases
- dashboard

Ishga tushirish:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Production uchun:

- `HOST=0.0.0.0` qilib qo'ying
- `MONGO_URI` ni VPS yoki MongoDB Atlas manziliga ulang
- Bo'sh va alohida baza uchun URI oxirida `navoiy_kiyim_dokon` database nomini ishlating
- `CORS_ORIGIN` ga frontend Vercel domenini yozing
- `JWT_SECRET` ni kuchli maxfiy qiymatga almashtiring

Default login:

```text
admin / 0000
```
