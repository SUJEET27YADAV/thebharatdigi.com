"use server";
import crypto from 'crypto';

export async function generateSecurePassword(length:number) {
  if (length < 10) {
    throw new Error('Password length must be at least 8 characters');
  }
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+[]{}<>?';
  const requiredCount = 2;

  function getRandomChars(charset:string, count:number) {
    let result = '';
    const randomBytes = crypto.randomBytes(count);
    for (let i = 0; i < count; i++) {
      result += charset[randomBytes[i] % charset.length];
    }
    return result;
  }

  let password:string|string[] = 
    getRandomChars(lowercase, requiredCount) +
    getRandomChars(uppercase, requiredCount) +
    getRandomChars(numbers, requiredCount) +
    getRandomChars(special, requiredCount);

  const allChars = lowercase + uppercase + numbers + special;
  const remainingLength = length - password.length;
  password += getRandomChars(allChars, remainingLength);
  password = password.split('');
  for (let i = password.length - 1; i > 0; i--) {
    const j = crypto.randomBytes(1)[0] % (i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }
  return password.join('');
}