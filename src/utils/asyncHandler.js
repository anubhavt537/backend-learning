

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }











// const asyncHandler= (funct)=>async(req,res,next)=>{
// try {
//     await funct(req,res,next)
// } catch (error) {
//     res.status(error|| 500).json
//     success:false;
//     message:error.message
// }
// }


