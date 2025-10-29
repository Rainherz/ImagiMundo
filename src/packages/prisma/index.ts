// import prisma from "../../../prisma";

// export default prisma

import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { PrismaClient } from './generated/client'
// import { PrismaClient } from '@/generated/prisma/client'

const adapter = new PrismaLibSQL({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`
})

const prisma = new PrismaClient({ adapter })

// const prisma = new PrismaClient()
export default prisma
