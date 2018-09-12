class BetslipSerializer {
  static serialize ({ bets, currencyCode }) {
    return bets.map((bet) => {
      return {
        amount: parseFloat(bet.stake),
        oddId: bet.odd.id,
        oddValue: bet.approvedOddValue,
        currencyCode: currencyCode
      }
    })
  }
}

export default BetslipSerializer
