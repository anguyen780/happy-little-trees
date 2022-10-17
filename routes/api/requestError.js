class StatusError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

// from https://github.com/Shengaero/tech-blog/blob/main/controllers/api/handleError.js
function handleError(err, res) {
    if(err instanceof StatusError) {
        res.status(err.status);
        res.json({ message: err.message });
    } else if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        res.status(400);
        const errors = err.errors;
        if(errors.length === 1) {
            res.json({ message: errors[0].message });
        } else {
            res.json({ message: errors.map(error => error.message) });
        }
    } else {
        console.log(err);
        res.sendStatus(500);
    }
}

function badRequest(message = 'Bad Request') {
    throw new StatusError(400, message)
}

module.exports = { StatusError, handleError, badRequest };
