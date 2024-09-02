import { CIPHER_METHOD, SUPPORTED_CIPHERS } from "../constants";

import { CaesarCipher } from "./CaesarCipher";
import { VigenereCipher } from "./VigenereCipher";
import { ICipher } from "./ICipher";

export class EncryptionFactory {
  public static createEncryptionMethod(method: CIPHER_METHOD): ICipher {
    switch (method) {
      case SUPPORTED_CIPHERS.CAESAR:
        return new CaesarCipher();
      case SUPPORTED_CIPHERS.VIGENERE:
        return new VigenereCipher();
      default:
        throw new Error("Unsupported encryption method");
    }
  }
}
