const withAuth = (req, res, next) => {
    if(req.session.loggedIn) {
        res.redirect('/');
    } else {
        next();
    }
};

const requireAuth = (req, res, next) => {
    if(!req.session.loggedIn) {
        res.status(401);
        res.json({ message: 'Not Authorized' });
    } else {
        next();
    }
};

module.exports = { withAuth, requireAuth };
