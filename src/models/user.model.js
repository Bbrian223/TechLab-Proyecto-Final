import {z} from "zod"

export const UserSchema = z.object({
    Nombre : z.string().min(3),
    Email : z.string().min(3),
    Rol : z.string().min(3).default(`User`),
    Ubicacion : z.string().min(3).default(`desconocida`),
    Experiencia : z.number().min(0).default(0),
})

export const UserCreateSchema = UserSchema.extend({
  Pass: z.string().min(6)
});

