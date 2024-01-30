const handledCodes = [404, 403, 409, 500, 400] as const
export type WalletErrorCode = (typeof handledCodes)[number]

class WalletError extends Error {
  code: WalletErrorCode
  constructor(code: WalletErrorCode, message: string) {
    super(message)
    this.code = code;
  }
}

export default WalletError