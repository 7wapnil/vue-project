class BetslipSerializer {
  static serialize({ bets, currencyCode }) {
    return bets.map((bet) => {
      return {
        amount: parseFloat(bet.stake),
        oddId: bet.odd.id,
        oddValue: bet.approvedValue,
        currencyCode: currencyCode
      }
    })
  }
}

export default BetslipSerializer
