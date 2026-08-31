export function validateId(req, res, next) {
    const { id } = req.params;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'El ID debe ser un entero positivo',
        });
    }

    next();
}
