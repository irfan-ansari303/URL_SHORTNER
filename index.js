const express=require('express');
const urlRoutes=require("./routes/url");
const {connectmongoose} =require("./connect");
const Url = require("./models/url");
const staticRouter=require("./routes/staticRouter")
const path=require("path")
const app=express();
const PORT=8000;

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use("/",staticRouter);

app.use("/url",urlRoutes);
connectmongoose("mongodb://localhost:27017/urlShortner")
.then(()=>{
    console.log("Connectd to MongoDb");
})
.catch((err)=>{
    console.log("Error connecting to MongoDb",err);
})
app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry= await Url.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        }
    }})
    res.redirect(entry.redirectUrl);

})
app.listen(PORT,()=>{
    console.log(`Server started at PORT : ${PORT}`)
});