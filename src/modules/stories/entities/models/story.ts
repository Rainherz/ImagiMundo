import { z } from 'zod'
import SceneModel from './scene'

const StoryModel = z.object({
    id: z.uuid(),
    title: z.string().min(1).max(100),
    synopsis: z.string().min(1).max(500),
    imagen: z.string().url().optional(),
    size: z.number().min(3).max(10),
    sceneSize: z.number().min(50).max(200),
    scenes: z.array(SceneModel)
}) 

export default StoryModel