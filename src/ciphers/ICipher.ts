export interface IEncryptionParams {
  text: string;
  key: string;
}

export interface ICipher {
  encrypt(params: IEncryptionParams): string;
  decrypt(params: IEncryptionParams): string;
}
