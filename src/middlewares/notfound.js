export const NotFound = (req,res,next) => {
    res.status(404).json({
    error: "Recurso no encontrado o ruta inválida",
    path: req.originalUrl
  });
};