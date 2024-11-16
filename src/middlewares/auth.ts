import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"; // Import specific error types
import config from "../config/jwt/jwt";
import { HttpStatus } from "../utils/httpStatus";

// Extending Express Request interface to include bearerToken and tokenInfo
declare global {
  namespace Express {
    interface Request {
      bearerToken?: string;  // Token extracted from Authorization header
      tokenInfo?: {  // Decoded JWT token information
        _id: string;  // User ID from the token
        role: string;  // Role of the user from the token
      };
    }
  }
}

/**
 * @description Checks if the user's role is authorized to access the given path.
 * @param {string} role - The user's role.
 * @param {string} path - The path the user is attempting to access.
 * @returns {boolean} Returns true if the user is authorized for the path, false otherwise.
 */
function checkAccess(role: string, path: string): boolean {
  // TODO: Implement logic to check user's role and authorization for the given path
  return true; // Placeholder for role-based access control
}

/**
 * @description Middleware to authenticate and authorize a user based on the JWT token in the Authorization header.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function to call if the request is valid.
 * @returns {Promise<void>} Returns a promise that resolves when the token is successfully verified, or rejects with an error response.
 */
export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader) {
    res.status(HttpStatus.UNAUTHORIZED.code).json({
      statusCode: HttpStatus.UNAUTHORIZED.code.toString(),
      message: "No token provided",  // No token in the Authorization header
    });
    return;  // Ensure no further code executes after sending response
  }

  const arrayAuth = authHeader.split(" ");
  
  // Validate the format of the Authorization header
  if (arrayAuth.length !== 2 || arrayAuth[0] !== "Bearer") {
    res.status(HttpStatus.UNAUTHORIZED.code).json({
      statusCode: HttpStatus.UNAUTHORIZED.code.toString(),
      message: "The provided token is invalid",  // Invalid token format
    });
    return;  // Ensure no further code executes after sending response
  }

  const token = arrayAuth[1];
  req.bearerToken = token;  // Assign the token to the request object

  try {
    // Verify the JWT token using the secret key
    const decoded: any = jwt.verify(token, config.jwtSecretKey);
    
    // Check if the user's role has access to the requested path
    if (!checkAccess(decoded.role, req.path)) {
      res.status(HttpStatus.UNAUTHORIZED.code).json({
        statusCode: HttpStatus.UNAUTHORIZED.code.toString(),
        message: HttpStatus.UNAUTHORIZED.description,  // Unauthorized if access is not granted
      });
      return;  // Ensure no further code executes after sending response
    }

    // Assign decoded token information (user ID and role) to the request object
    req.tokenInfo = {
      _id: decoded._id,
      role: decoded.role,
    };

    next();  // Proceed to the next middleware if token is valid and access is granted
  } catch (err) {
    // Handle errors related to token verification
    console.log(err);
    let error: string;
    
    if (err instanceof TokenExpiredError) {
      error = "Expired token";  // Token has expired
    } else if (err instanceof JsonWebTokenError) {
      error = "Invalid token";  // Invalid token
    } else {
      error = "Unknown error";  // Handle other errors (if any)
    }

    // Respond with an unauthorized status if token verification fails
    res.status(HttpStatus.UNAUTHORIZED.code).json({
      statusCode: HttpStatus.UNAUTHORIZED.code.toString(),
      message: error,  // Send appropriate error message
    });
  }
};
