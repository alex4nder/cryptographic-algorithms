import { ICipher, IEncryptionParams } from "./ICipher";
import { ALPHABET_RU, ALPHABET_EN } from "../constants";

export class CaesarCipher implements ICipher {
  private mod(n: number, m: number): number {
    return ((n % m) + m) % m;
  }

  public encrypt({ text, key }: IEncryptionParams): string {
    return this.cipher(text, parseInt(key));
  }

  public decrypt({ text, key }: IEncryptionParams): string {
    return this.cipher(text, -parseInt(key));
  }

  cipher(text: string, key: number): string {
    let result = "";

    for (let char of text) {
      if (ALPHABET_RU.includes(char.toUpperCase())) {
        let index = this.mod(
          ALPHABET_RU.indexOf(char.toUpperCase()) + key,
          ALPHABET_RU.length
        );
        result += ALPHABET_RU[index];
      } else if (ALPHABET_EN.includes(char.toLowerCase())) {
        let index = this.mod(
          ALPHABET_EN.indexOf(char.toLowerCase()) + key,
          ALPHABET_EN.length
        );
        result += ALPHABET_EN[index];
      } else {
        result += char;
      }
    }

    return result.toLowerCase();
  }
}
