export const errorMiddleware=(err,req,res,next)=>{
   
    err.message=err.message || "Something went wrong! Please try again after some time"
    err.code=err.code|| 500;

    return res.status(err.code).json({
        error:{
            success:false,
            message:err.message,
        }
    })
}