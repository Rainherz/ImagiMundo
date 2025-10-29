import { z } from 'zod'

const ChoiceModel = z.object({
    key: z.string(),
    text: z.string(),
}) 

export default ChoiceModel