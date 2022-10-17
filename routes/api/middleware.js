const requireBody = (req, res, next) => {
    if(!req.body) {
        res.status(400);
        req.json({ message: 'missing request body' });
    } else {
        next();
    }
};

module.exports = { requireBody };