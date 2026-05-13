// prisma.config.ts
import { defineConfig } from '@prisma/config'

export default defineConfig({
  // @ts-ignore - Mengabaikan error tipe data sementara di Prisma 7
  migrate: {
    url: process.env.DATABASE_URL,
  }
} as any) // Tambahkan 'as any' di sini