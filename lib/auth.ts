import bcrypt from "bcryptjs";

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  const isValid = await bcrypt.compare(plainPassword, hashedPassword);
  return isValid;
}
