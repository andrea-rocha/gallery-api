import { ErrorRequestHandler } from 'express';


class ValidationError extends Error {
    constructor(public errors: any) {
        super();
        this.name = 'ValidationError';
    }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({
            errors: err.errors.map((error: any) => ({
                field: error.property,
                message: Object.values(error.constraints),
            })),
        });
    }

    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
};

export { errorHandler, ValidationError };

