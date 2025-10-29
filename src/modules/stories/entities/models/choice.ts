import { z } from 'zod'

const ChoiceModel = z.object({
  id: z.string().uuid().optional(),
  text: z.string().min(1),
})

export default ChoiceModel
