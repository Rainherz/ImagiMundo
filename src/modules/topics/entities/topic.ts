import { z } from 'zod'

const TopicModel = z.object({
    id: z.uuid(),
    label: z.string(),
    description: z.string(),
}) 

export default TopicModel