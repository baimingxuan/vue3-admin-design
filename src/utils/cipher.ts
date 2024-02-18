import { decrypt as aesDecrypt, encrypt as aesEncrypt } from 'crypto-js/aes'
import { parse } from 'crypto-js/enc-utf8'
import UTF8 from 'crypto-js/enc-utf8'
import pkcs7 from 'crypto-js/pad-pkcs7'
import CTR from 'crypto-js/mode-ctr'

export interface Encryption {
  encrypt(plainText: string): string
  decrypt(cipherText: string): string
}

export interface EncryptionParams {
  key: string
  iv: string
}

class AesEncryption implements Encryption {
  private readonly key
  private readonly iv

  constructor({ key, iv }: EncryptionParams) {
    this.key = parse(key)
    this.iv = parse(iv)
  }

  get getOptions() {
    return {
      mode: CTR,
      padding: pkcs7,
      iv: this.iv
    }
  }

  encrypt(plainText: string) {
    return aesEncrypt(plainText, this.key, this.getOptions).toString()
  }

  decrypt(cipherText: string) {
    return aesDecrypt(cipherText, this.key, this.getOptions).toString(UTF8)
  }
}

export class EncryptionFactory {
  public static createAesEncryption(params: EncryptionParams): Encryption {
    return new AesEncryption(params)
  }
}
