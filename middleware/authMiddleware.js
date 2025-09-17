const  jwt=require("jsonwebtoken");

function authMiddleware(req,res,next){
    const token=req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.redirect("/user/login");
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded; //{id,email}
        next();
    }catch(err){
        return res.redirect("/user/login");
    }
}

module.exports=authMiddleware;