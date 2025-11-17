import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export interface JWTPayload {
  email: string;
  isAdmin: boolean;
}

export function generateToken(email: string): string {
  const payload: JWTPayload = {
    email,
    isAdmin: true,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export async function verifyAdmin(request: NextRequest): Promise<{ valid: boolean; payload?: JWTPayload }> {
  const token = getTokenFromRequest(request);
  
  if (!token) {
    return { valid: false };
  }

  const payload = verifyToken(token);
  
  if (!payload || !payload.isAdmin || payload.email !== ADMIN_EMAIL) {
    return { valid: false };
  }

  return { valid: true, payload };
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

