import { Response } from 'express';
import { config } from '../config';
import jwt, { JwtPayload } from "jsonwebtoken";

const EMAIL_TOKEN_EXPIRATION_MINUTE = 10;
const EMAIL_TOKEN_EXPIRATION_HOUR = 24;
export enum TransactionsType {
  "fund" = "fund",
  "transfer" = "transfer",
  "withdraw" = "withdraw"
}
interface DecodedToken extends JwtPayload {
  email: string;
  userId: string;
  // Add any other payload properties you expect
}

export const expirationMinute = () => {
  return new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTE * 60 * 1000
  );
};

export const expirationHour = () => {
  return new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_HOUR * 60 * 60 * 1000
  );
};

export const generateToken = (): string => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

export const generateRandom11DigitNumber = (): number => {
  const min = 1e10; // Minimum 11-digit number (10000000000)
  const max = 1e11 - 1; // Maximum 11-digit number (99999999999)
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
};

export const success = (res: Response, data:any) => {
  let resp = null;
  try {
    resp = JSON.parse(JSON.stringify(data));
  } catch (e) {
    resp = data;
  }
  return res.status(200).json(resp);
};

export const error = (
  res: any,
  status: number,
  eMsgTitle: string,
  message: string,
) => {
  console.log('req error ', res);
  return res.status(status).json({
    error: eMsgTitle,
    code: status,
    message,
    details: [
      {
        type_url: `${res.req.headers['x-forwarded-proto']}://${res.req.headers.host}`,
        value: res.req._parsedUrl.path,
        referer: res.req.headers.referer,
      },
    ],
  });
};

export const generateAuthToken = async (
  email: string,
  userId: string,
): Promise<{ access_token: string }> => {
  const payloadToken = { email, userId };
  const secretToken = config.secret;
  return {
    access_token: jwt.sign(payloadToken, secretToken, { expiresIn: '1h' }),
  };
};

export const generateOtp = () => {
  return Math.floor(Math.random() * (999999 - 111111) + 111111).toString();
}

export const verifyToken = async (token: string, secret: string): Promise<DecodedToken | null> => {
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    return decoded ?? null;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
