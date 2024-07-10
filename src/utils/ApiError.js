class ApiError extends error{
    constructor(
        statusCode,
        message='something is wrong',
        errors=[],
        stack=''

    ){
super(message)
        this.statusCode=statusCode,
        this.message=message,
        this.data=null,
        this.success=false,
        this.errors=errors
    }
}

export {ApiError}