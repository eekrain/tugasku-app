# Tugasku App - A todo application - Ardian Eka Candra

Aplikasi **Tugasku** adalah aplikasi untuk pembayaran yang digunakan sebagai assignment Full Stack Programmer yang dibuat mengunakan Next.js 15. Akses form di-validasi dengan [zod validator](https://zod.dev/) dan di manage menggunakan [react-hook-form](https://react-hook-form.com/). Styling menggunakan [tailwind](https://v3.tailwindcss.com/docs/installation) untuk mempercepat pengerjaan. Semua code di tulis dengan type safe menggunakan Typescript.

# Development

Project ini menggunakan NodeJS dengan package manager PNPM. Pastikan Anda sudah menginstall [PNPM](https://pnpm.io/).

#### 1. Instalasi packages

```bash
pnpm install
```

#### 2. Setup environment variable .env

Pastikan anda membuat file .env, dan isi persis seperti di .example.env.

#### 3. Running dev mode

Setelah .env sudah di isi. Anda bisa run:

```bash
pnpm dev
```

#### 3. Bundling

Untuk mem-bundling app, anda bisa run:

```bash
pnpm build
```

Kemudian untuk memastikan hasil build bekerja dengan semestinya, check dengan run:

```bash
pnpm preview
```
