

const ayncHandler=(requestHandler)=>(req,res,next)=>{
Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))

}












// const asyncHandler= (funct)=>async(req,res,next)=>{
// try {
//     await funct(req,res,next)
// } catch (error) {
//     res.status(error|| 500).json
//     success:false;
//     message:error.message
// }
// }


export {ayncHandler}