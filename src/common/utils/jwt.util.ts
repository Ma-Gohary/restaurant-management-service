import * as Jwt from "jsonwebtoken";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import constants from "../consts/constants.constants";

namespace jwt {
  /**
   * Default Jwt payload
   */
  export interface IPermssions {
    permissions: {
      scopes: string[];
      rsid: string;
      rsname: string;
    }[];
  }

  export interface Permission {
    rsname: string;
    permissions: string[];
  }

  export class Payload implements JwtPayload {
    id?: number;
    phone?: string;
    azp?: string;
    realm_access?: string;
    resource_access?: string;
    name?: string;
    preferred_username?: string;
    locale?: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    attr_store_id?: number;
    authorization?: IPermssions;
  }

  /**
   * Collection of JsonWebToken's helper functions
   */
  export class Utils {
    /**
     * Generate a token
     *
     * @param {jwt.Payload} payload
     * @param {string | number | undefined} expiresIn
     * @return {string} a string of token
     */
    static generateToken(
      payload: jwt.Payload,
      expiresIn?: string | number
    ): string {
      const options: SignOptions = {
        algorithm: "HS256",
      };
      if (
        process.env.NODE_ENV === constants.env.PRODUCTION ||
        process.env.NODE_ENV === constants.env.STAGING
      ) {
        options.expiresIn = expiresIn || "60 days";
      }
      return Jwt.sign(payload, process.env.JWT_SECRET, options);
    }

    /**
     * Verify a token and return decoded Payload
     *
     * @param {string} token
     * @param {string} key
     * @param {string} options
     * @return {Promise<jwt.Payload>} decoded Payload
     */
    static verifyToken(
      token: string,
      key: string = process.env.JWT_SECRET,
      options?: Jwt.VerifyOptions
    ): Promise<jwt.Payload> {
      return new Promise<jwt.Payload>((resolve, reject) => {
        Jwt.verify(token, key, options, (error, decoded) => {
          if (error) {
            return reject(error);
          }
          resolve(decoded as jwt.Payload);
        });
      });
    }

    static async decodeToken(token: string): Promise<jwt.Payload> {
      return Jwt.decode(token);
    }
  }
}

export default jwt;
