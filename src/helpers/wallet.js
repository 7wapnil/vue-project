import { EUR, mBTC, mTBTC } from '@/constants/currencies'
import { FIAT, CRYPTO } from '@/constants/currency-kinds'

export const getBalanceWithBonus = (wallet, lobby) => {
  const bonus = wallet.userBonus &&
    wallet.userBonus[lobby]
    ? wallet.bonusBalance : 0
  return Number(wallet.realMoneyBalance + bonus).toFixed(2)
}

export const getCurrencyOptions = (wallets) => {
  const currencies = wallets.map(wallet => ({
    value: wallet.currency.code,
    text: wallet.currency.code
  }))
  if (currencies.length === 1) {
    if (currencies[0].value === mBTC) currencies.push({ value: EUR, text: EUR })
    else {
      if (process.env.NODE_ENV === 'production') currencies.push({ value: mBTC, text: mBTC })
      else currencies.push({ value: mTBTC, text: mTBTC })
    }
  }
  return currencies
}

export const getCurrencyKind = code => {
  switch (code) {
    case mBTC: return CRYPTO
    case mTBTC: return CRYPTO
    default: return FIAT
  }
}
