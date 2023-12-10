export const ErrorHandler=(message,statusCode)=>{
    const err=new Error(message)
    err.code=statusCode
    return err;
}