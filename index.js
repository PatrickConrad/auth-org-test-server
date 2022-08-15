const express = require('express');
const cors = require('cors');
const app = express();
// app.set('trust proxy', '127.0.0.1');
const qs = require('qs')
const axios = require('axios')
const path = require('path');

const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:8090', 'http://localhost:8091', 'http://localhost:8093'],
  methods: ['GET', 'POST'],
  allowHeaders: ["Cookie", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true,
}
// if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))
console.log("WORKING")

app.use(cors(corsOptions));
// app.enable('trust proxy');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

console.log("WORKING")
app.post('/auth', async (req, res, next)=>{
    try{
        console.log({code: req.query.code})
        const query = {
            secret: 'ADD_SECRET_HERE',
            orgId: '62f26c954b7b26b5d4efbeec',
            scopes: ['authorization'].join(' '),
            redirect: 'http://localhost:8093/auth'
        }
        const string = qs.stringify(query)
        console.log("string", string)
        const url = `http://localhost:8091/api/v1/auth/organization-authorization?${string}`
        console.log({url})
        const resp = await axios.post(url,{code: req.query.code})
        res.setHeader('Cookie', 'test=123')
        console.log({data: resp.data})
        res.cookie('test', '123', {domain: 'http://localhost:3001', sameSite: 'lax', httpOnly: false, maxAge: Date.now()+500000 })
        console.log(res)
        
        return res.status(200).json({
            success: true,
            url: 'http://localhost:3001'
        })
    }
    catch(err){
        console.log('error :', err.message)
    }
})

app.get('/testing', (req, res, next)=>{
    res.sendFile(path.join(__dirname,'/test.html'))
})
const port = process.env.PORT || 8093
const server = app.listen(port, async () => {
    console.log(`Ready on port ${port}`);
})
.on("error", (e)=> logger.error(e,"Error starting server."));

 process.on('SIGTERM'||"SIGINT", async ()=>{
    console.log("Server is shutting down")
    server.close();
    console.log("Database is closing")
    process.exit(0);
})