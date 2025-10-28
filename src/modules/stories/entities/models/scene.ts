import { z } from 'zod'
import ChoiceModel from './choice'

const SceneModel = z.object({
    id: z.uuid(),
    text: z.string(),
    image: z.string().optional(),
    choices : z.array(ChoiceModel),
    chosenChoise: ChoiceModel.optional(),
}) 

export default SceneModel