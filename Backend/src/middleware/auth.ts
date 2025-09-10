import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        name: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('Auth middleware - Headers:', req.headers.authorization);
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth middleware - Extracted token:', token ? 'Token present' : 'No token');

    if (!token) {
      console.log('Auth middleware - No token provided');
      res.status(401).json({
        success: false,
        error: 'No token provided, authorization denied',
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    console.log('Auth middleware - Decoded token:', { userId: decoded.userId, role: decoded.role });
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, name: true },
    });

    console.log('Auth middleware - Found user:', user ? { id: user.id, role: user.role } : 'User not found');

    if (!user) {
      console.log('Auth middleware - User not found in database');
      res.status(401).json({
        success: false,
        error: 'Token is not valid',
      });
      return;
    }

    req.user = user as any;
    console.log('Auth middleware - Success, user authenticated:', { id: user.id, role: user.role });
    next();
  } catch (error) {
    console.log('Auth middleware - Token verification error:', error);
    res.status(401).json({
      success: false,
      error: 'Token is not valid',
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log('Authorization middleware - User:', req.user ? { id: req.user.id, role: req.user.role } : 'No user');
    console.log('Authorization middleware - Required roles:', roles);
    
    if (!req.user) {
      console.log('Authorization middleware - User not authenticated');
      res.status(401).json({
        success: false,
        error: 'Not authenticated',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      console.log('Authorization middleware - User role not authorized:', req.user.role);
      res.status(403).json({
        success: false,
        error: 'Not authorized to access this resource',
      });
      return;
    }

    console.log('Authorization middleware - Access granted');
    next();
  };
};

