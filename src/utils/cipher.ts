import { encrypt, decrypt } from 'crypto-js/aes'
import { parse } from 'crypto-js/enc-utf8'
import UTF8 from 'crypto-js/enc-utf8'
import PKCS7 from 'crypto-js/pad-pkcs7'
import ECB from 'crypto-js/mode-ecb'

export interface EncryptParams {
  key: string
  iv: string
}

export class AesEncrypt {
  private key
  private iv

  constructor(opt: Partial<EncryptParams> = {}) {
    const { key, iv } = opt
    if (key) {
      this.key = parse(key)
    }
    if (iv) {
      this.iv = parse(iv)
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: PKCS7,
      iv: this.iv
    }
  }

  encryptByAES(cipherText: string) {
    return encrypt(cipherText, this.key, this.getOptions).toString()
  }

  decryptByAES(cipherText: string) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8)
  }
}
