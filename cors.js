
const corsSetup = function (req, res, next)  {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Methods", "GET, PATCH, DELETE, POST");
    return next();
}

const cors = {
    corsSetup
}
module.export = cors
