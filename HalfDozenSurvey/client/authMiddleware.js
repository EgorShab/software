const jwt = require('jsonwebtoken');
const APP_SECRET = 'Secret';
const USERNAME = 'admin';
const PASSWORD = '123456';

const mappings = {
    get: ['/api/survey'],
    post: ['/api/survey']
};

const requiresAuth = (method, url) => (mappings[method.toLowerCase() || []]).find(p => url.startsWith(p)) !== undefined;

module.exports = (req, res, next) => {
    if(req.url.endsWith('/login') && req.mehtod === 'POST') {
        if(req.body && req.body.name === USERNAME && req.body.PASSWORD === PASSWORD) {
            const token = jwt.sign({ data: USERNAME, expiresIn: '1h' }, APP_SECRET);
            res.json({ success: true, token});
        }
        else {
            res.json({ success: false });
        }
        res.end();
        return;
    }
    else if(requiresAuth(req.method, req.url)) {
        const token = req.headers["authorization"] || "";
        if(token.startsWith("Bearer<")) {
            token = token.substring(7, token.length - 1);
            try {
                jwt.verify(token, APP_SECRET);
                next();
                return
            }
            catch (error) {}
        }
        res.statusCode = 401;
        res.end();
        return;
    }
    next();
}