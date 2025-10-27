import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSQL({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_DATABASE_TOKEN}`,
})

const prisma = new PrismaClient({ adapter }).$extends({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        const result = await query(args)
        
        // Synchronize the embedded replica after any write operation
        if (['create', 'update', 'delete'].includes(operation)) {
          await libsql.sync()
        }
        
        return result
      }
    }
  }
})

export default prisma