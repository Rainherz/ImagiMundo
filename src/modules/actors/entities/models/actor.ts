import { z } from 'zod'

const ActorModel = z.object({
    id: z.uuid(),
    name: z.string(),
    description: z.string(),
}) 

export default ActorModel