import {z} from "zod"

export const ProductSquema = z.object({
    Categoria: z.string().min(3),
    Descripcion: z.string().min(3),
    Precio: z.number().positive(),
    Stock: z.number().int().min(0),
    Nombre: z.string().min(3)
})
