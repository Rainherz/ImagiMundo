import { z } from 'zod'

import { ActorSchema } from '@/modules/actors/entities/models/actor'

import TopicModel from '../../../topics/entities/topic'

const StoryConfigModel = z.object({
    id: z.uuid(),
    titulo: z.string().min(1).max(100),
    synopsis: z.string().min(1).max(500),
    image: z.url(),
    size: z.number().min(3).max(10),
    sceneSize: z.number().min(50).max(200),
    actors: z.array(ActorSchema).optional(),
    topics: z.array(TopicModel).optional(),
}) 

export default StoryConfigModel