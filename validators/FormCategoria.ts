import {z} from 'zod';

export const CategoriaSchema = z.object({
    id: z.string(),
    nome: z.string().nonempty({message: 'tatatsaas'})
})

