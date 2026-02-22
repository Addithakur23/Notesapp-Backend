import bcrypt from "bcrypt"
import { decrypt } from "dotenv";

async function hashPassword() {
  const hashed = await bcrypt.hash("adi12",10);
  console.log(hashed);
}

hashPassword();