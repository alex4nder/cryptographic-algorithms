import { ICipher, IEncryptionParams } from "./ICipher";
import { ALPHABET_RU, ALPHABET_EN } from "../constants";

export class VigenereCipher implements ICipher {
  private mod(n: number, m: number): number {
    return ((n % m) + m) % m;
  }

  encrypt({ text, key }: IEncryptionParams): string {
    let result = "";
    let keywordIndex = 0;

    for (let char of text) {
      let alphabet: string;

      if (ALPHABET_RU.includes(char)) {
        alphabet = ALPHABET_RU;
      } else if (ALPHABET_EN.includes(char)) {
        alphabet = ALPHABET_EN;
      } else {
        result += char; // Неподдерживаемый символ
        continue;
      }

      const shift = alphabet.includes(key[keywordIndex])
        ? alphabet.indexOf(key[keywordIndex])
        : 0;

      const index = this.mod(alphabet.indexOf(char) + shift, alphabet.length);

      result += alphabet[index];
      keywordIndex = (keywordIndex + 1) % key.length;
    }

    return result;
  }

  decrypt({ text, key }: IEncryptionParams): string {
    let result = "";
    let keywordIndex = 0;

    for (let char of text) {
      let alphabet: string;
      if (ALPHABET_RU.includes(char)) {
        alphabet = ALPHABET_RU;
      } else if (ALPHABET_EN.includes(char)) {
        alphabet = ALPHABET_EN;
      } else {
        result += char; // Неподдерживаемый символ
        continue;
      }

      const shift = alphabet.includes(key[keywordIndex])
        ? alphabet.indexOf(key[keywordIndex])
        : 0;
      const index = this.mod(alphabet.indexOf(char) - shift, alphabet.length);

      result += alphabet[index];
      keywordIndex = (keywordIndex + 1) % key.length;
    }

    return result;
  }
}
