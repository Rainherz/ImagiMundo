import { z } from 'zod'

const StoryModel = z.object({
    id: z.uuid(),
    title: z.string().min(1).max(100),
    synopsis: z.string().min(1).max(500),
    imagen: z.string().url().optional(),
    size: z.number().min(3).max(10),
    scene_size: z.number().min(50).max(200),
}) 

export default StoryModel