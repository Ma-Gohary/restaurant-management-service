import * as crypto from "crypto";

class Encryption {
  static salt = process.env.PASSWORD_SALT;
  /**
   * Encrypt password
   *
   * @param {string} password
   * @return {string} Returns encrypted password
   */
  static encryptPassword(password: string): string {
    return crypto
      .pbkdf2Sync(password, this.salt, 10000, 16, "sha256")
      .toString("base64");
  }
}

export default Encryption;
