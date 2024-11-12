module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ error: 'Please log in to view this resource' });
    },
    forwardAuthenticated: function(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        res.status(403).json({ error: 'You are already logged in' });
    } 
};