const ratelimtter = require('express-rate-limit');
const logninRateLimitMiddleware = ratelimtter({
    windowMs:4*1000, // 10 minutes
    max:1,
    message: 'Too many requests from this IP, please try again after 10 minutes',
    keyGenerator:(req)=>{
        return req.body.userMail;
    }
});
module.exports = {logninRateLimitMiddleware};