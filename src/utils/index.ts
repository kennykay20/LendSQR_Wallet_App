const EMAIL_TOKEN_EXPIRATION_MINUTE = 10;
const EMAIL_TOKEN_EXPIRATION_HOUR = 24;
export enum TransactionsType {
  "fund" = "fund",
  "transfer" = "transfer",
  "withdraw" = "withdraw"
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

export interface userDetails {
  email: string;
  fullName: string;
  username: string;
  imageUrl: string;
}
