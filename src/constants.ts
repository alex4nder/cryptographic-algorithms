import { LiteralType } from "./utils/type.util";

export const ALPHABET_RU = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
export const ALPHABET_EN = "abcdefghijklmnopqrstuvwxyz";

export enum SUPPORTED_CIPHERS {
  CAESAR = "caesar",
  VIGENERE = "vigenere",
}

export type CIPHER_METHOD = LiteralType<SUPPORTED_CIPHERS>;
