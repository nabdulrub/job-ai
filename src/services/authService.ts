import bcrypt from "bcrypt"

export default function authService() {
  function encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10)
  }

  function comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword)
  }

  return { encryptPassword, comparePassword }
}
