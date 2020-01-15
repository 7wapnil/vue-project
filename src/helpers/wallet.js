export const getBalanceWithBonus = (wallet, lobby) => {
  const bonus = wallet.userBonus &&
    wallet.userBonus[lobby]
    ? wallet.bonusBalance : 0
  return Number(wallet.realMoneyBalance + bonus).toFixed(2)
}
