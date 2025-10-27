import { defineConfig } from "prisma/config";

import 'dotenv/config'

import path from 'node:path'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

// import your .env file

export default defineConfig({
  experimental: {
    adapter: true,
  },
  schema: path.join('src/packages/prisma', 'schema.prisma'),
  migrations: {
    path: path.join('src/packages/prisma', 'migrations'),
  },
  async adapter() {
    return new PrismaLibSQL({
      url: process.env.LIBSQL_DATABASE_URL || '',
      authToken: process.env.LIBSQL_DATABASE_TOKEN || '',
    })
  }
})