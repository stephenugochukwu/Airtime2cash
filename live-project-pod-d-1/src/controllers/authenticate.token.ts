import { Request, Response, NextFunction } from "express";
import  Jwt  from "jsonwebtoken";


const authenticate: any = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
  if (!token) {
    res.send({
      success: false,
      statusCode: 401,
      message: 'no token or invalid token!!'
    })

  } else {
    const tokenSecret = 'my-token-secret'
    Jwt.verify(token.split(' ')[1], tokenSecret, (err: any, value: any) => {
      if (err) {
        res.send({
          success: false,
          statusCode: 401,
          message: 'invalid token!!'
        })

      } else {
        (<any>req).user = value.data
        console.log((<any>req).user);
        next()
      }
    })
  }
}

export default authenticate;
