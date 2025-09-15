const {nanoid} = require("nanoid")

const Url=require("../models/url")
async function gereratenewshorturl(req,res){
   console.log("Body recieved",req.body);
    const body=req.body;
    if(!body.url) return res.status(400).json({error :"url is required"});
     const shortId=nanoid(8);
     await Url.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[],
     });
     return res.render("Home",{id:shortId,
     });
   // return res.redirect("/");
   //   return res.json({id:shortId});
};

async function handleGetAnalytics(req,res){
   const shortId=req.params.shortId;
   const result=await Url.findOne({shortId});
   return res.json({
      totalClicks:result.visitHistory.length,
      analytics:result.visitHistory,
   })
}
module.exports={gereratenewshorturl,handleGetAnalytics};