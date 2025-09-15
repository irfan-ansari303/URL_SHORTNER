const express=require("express");
const { gereratenewshorturl,handleGetAnalytics }= require("../controllers/url")

const router=express.Router();
router.post("/",gereratenewshorturl);
router.get("/analytics/:shortId",handleGetAnalytics);
module.exports=router;