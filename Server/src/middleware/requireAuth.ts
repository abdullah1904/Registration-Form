import { Request, Response, NextFunction } from "express";
import { JwtPayload, TokenExpiredError, verify } from "jsonwebtoken";

export interface decodedToken extends JwtPayload {
    id: string,
    email: string,
}

declare global {
    namespace Express {
        interface Request {
            token: decodedToken;
        }
    }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ "error": "Authorization token required" });
    }
    const token = authorization.replace('Bearer ', "");
    try {
        const decoded = await verify(token, process.env.SECRET_KEY!) as decodedToken;
        req.token = decoded;
        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res.status(401).send('Token Expired');
        }

        console.error(err);
        return res.status(401).json({ "error": "Request isn't authorized" });
    }
};
