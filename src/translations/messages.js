const messages = {
  en: {
    generalTerms: {
      deposit: 'Deposit | Deposits',
      withdraw: 'Withdraw | Withdraws',
      bonus: 'Bonus | Bonuses',
      all: 'All',
      amount: 'Amount',
      paymentMethod: 'Payment Method | Payment Methods',
      status: 'Status',
      fee: 'Fee | Fees',
      date: 'Date',
      bonusCode: 'Bonus code',
      transaction: 'Transaction | Transactions'
    },
    homePage: {
      upcoming: 'Upcoming',
      live: 'Live now',
      esport: 'Esport',
      sport: 'Sport'
    },
    betslip: {
      betslipEmpty: 'Your betslip is currently empty.\n' +
        'Click on any odds to add them\n' +
        'to betslip.',
      tooltipMessages: {
        default: 'Please login to place a bet',
        defaultLoggedIn: 'Your betslip is empty',
        oddsNotConfirmed: 'Please confirm all odds changes',
        notEnoughMoney: 'Please check your available balance',
        inactiveMarkets: 'Please remove any inactive bets',
        betsBeingSubmitted: 'Bet placement in progress',
        invalidStakeAmount: 'Please make sure your stake is correct'
      },
      cta: {
        placeBet: 'Place Bet'
      }
    },
    wallet: {
      balance: 'Balance',
      crypto: 'Crypto'
    },
    account: {
      tabs: {
        account: 'Account info & settings',
        activity: 'Activity',
        depositFunds: 'Deposit funds',
        withdrawFunds: 'Withdraw funds',
        bonus: 'Bonus',
        accountVerification: 'Account verification',
        transactionHistory: 'Transaction history'
      },
      cta: {
        resetPassword: 'Reset password',
        changeWithdrawMethod: 'Change withdraw method',
        withdraw: 'Withdraw',
        deposit: 'Deposit',
        viewWallet: 'View my wallet',
        chooseFile: 'Choose file',
        uploadFiles: 'Upload files',
        logout: 'Logout'
      },
      accountInfo: {
        email: 'Email',
        username: 'Username',
        language: 'Language',
        currency: 'Currency',
        privateData: 'Private Data',
        lastName: 'Last Name',
        firstName: 'First Name',
        gender: 'Gender',
        dob: 'Birth Date',
        addressAndPhone: 'Address and Phone',
        country: 'Country',
        state: 'State or Province',
        city: 'City',
        address: 'Address',
        phone: 'Phone',
        changePassword: 'Change password',
        currentPassword: 'Current password',
        newPassword: 'New password',
        repeatPassword: 'Repeat new password'
      },
      activity: {
        noActivity: 'You don\'t have any activity'
      },
      deposit: {
        depositHeader: 'Deposit Funds',
        depositSummary: 'Deposit summary',
        total: 'Total to be added',
        moneyTransferInformation: 'The money will be transferred directly in to your Arcanebet account. When you have won some bets you can look forward to easy and fast withdrawals without fees!\n',
        depositPaymentMethodInformation: 'This is only a list of payment methods we support. You will select the one that suits you on the next page. We do not charge service fees.',
      },
      withdraw: {
        withdrawFunds: 'Withdraw funds',
        cardLastFourDigits: 'Card last four digits',
        cardHolderName: 'Card holder Name',
        arcanebetPassword: 'Arcanebet password',
        notAvailable: 'This is not available to you at the moment.',
        withdrawNoFeeInformation: 'Debit/Credit Card withdrawals come with a 0% withdrawal fee',
        warning: 'Please be aware that requesting a withdrawal while you have an active bonus will result in all of your bonus funds being confiscated. If you wish to check your bonus status, please navigate to the bonus tab on your profile or contact support for further assistance. Be aware that if you initiate a withdrawal and the bonus is confiscated this is NOT reversible.'
      }
    }
  }
}

export default messages
