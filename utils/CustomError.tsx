class CustomError extends Error {
    statusCode: number;
    errorType: string;
  
    constructor(message: string, statusCode: number = 500, errorType: string = "General") {
      super(message);
      this.statusCode = statusCode;
      this.errorType = errorType;
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      } 
  
      this.name = "CustomError";
      return this
    }
  }
  
  export default CustomError;
  