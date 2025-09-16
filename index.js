const express=require('express');
require("dotenv").config();
const {connectmongoose} =require("./connect");

const urlRoutes=require("./routes/url");
const Url = require("./models/url");
const staticRouter=require("./routes/staticRouter")
const userRoute=require("./routes/user")


const path=require("path")
const app=express();

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use("/",staticRouter);
app.use("/user",userRoute)
app.use("/url",urlRoutes);

connectmongoose(process.env.MONGO_URL,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
})
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
    if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }
    res.redirect(entry.redirectUrl);

})
app.listen(process.env.PORT,()=>{
    console.log(`Server started at PORT : ${process.env.PORT}`)
});