
export async function IsAdmin(req,res,next) {
    if(!req.user)
        return res.status(500).json({ "error" : "Error al obtener los datos de las credenciles, no es posible validar el nivel de acceso"});
    
    if (req.user.rol.toLowerCase() !== "admin")
        return res.status(403).json({ error: "No tienes permisos suficientes para acceder a esta funcion" });

  next();
}