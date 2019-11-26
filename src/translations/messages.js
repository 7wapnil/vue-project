const messages = {
  en: {
    auth: {
      impersonate: {
        success: "You successfully logged in as '{username}'."
      }
    },
    meta: {
      defaultTags: {
        title: 'arcanebet - Esports Betting, Sports Betting, Casino, Live Casino',
        description: 'Bet on esports live and pre-game at arcanebet. The best esports betting odds for CSGO, Dota 2, League of Legends(LoL) and more. Get up to €100 first deposit bonus.'
      },
      esports: {
        title: 'arcanebet - Esports Betting Odds for CSGO, Dota 2, LoL',
        description: 'Bet on esports live and pre-game at arcanebet. The best esports betting odds for CSGO, Dota 2, League of Legends(LoL) and more. Get up to €100 first deposit bonus.'
      },
      sports: {
        title: 'arcanebet - Sports Betting With Pre-Game and Live Odds',
        description: 'Bet on all your favourite Sports at arcanebet. Find popular sports markets for Football to Tennis, Basketball to Cricket. We have the sports betting odds for you.'
      },
      support: {
        contact: {
          title: 'arcanebet - Contact us | Support',
          description: 'Do you need us to answer a question or are you having issues? Whatever it might be, reach out to our live support or send us an email and we will be happy to help.'
        },
        terms: {
          title: 'arcanebet - Terms and Conditions | Support',
          description: 'These general terms and conditions apply to any customers that register an account on arcanebet ' +
            'or make use of our services as laid out in these terms. For any information please contact support (28 too ' +
            'many characters. Most places are auto indexed by Google and the first 165 characters are shown)'
        },
        bettingRules: {
          title: 'arcanebet - Sports Betting Rules | Support',
          description: 'To help with troubleshooting information for our sports betting markets we have put together our betting rules for your convenience.'
        },
        paymentMethods: {
          title: 'arcanebet - Payment Methods | Support',
          description: 'To help with deposits and withdrawals we have put together a list of all available payment methods that we support throughout the world.'
        },
        privacyPolicy: {
          title: 'arcanebet - Privacy Policy | Support',
          description: 'This Privacy Policy describes the way in which arcanebet deals with the information and data you provide to us to enable us to manage your relationship with us.'
        },
        cookiePolicy: {
          title: 'arcanebet - Cookie Policy | Support',
          description: 'This Cookie Policy describes what cookies are, how we use them and what you can do if you don\'t want to use them.'
        },
        faq: {
          title: 'arcanebet - Frequently Asked Questions | Support',
          description: 'Have an issue but don\'t feel like talking with our support team? This FAQ page will help answer any simple or, you guessed it, frequently asked questions you have.'
        }
      },
      promotions: {
        main: {
          title: 'arcanebet - Promotional information',
          description: 'From deposit bonuses to rewards throughout your time on the website. Find your welcome offer terms and conditions here. For more details please log into your account.'
        },
        bonusRules: {
          title: 'arcanebet - Bonus Rules | Promotions',
          description: 'Detailed bonus rules that apply to all bonus and promotional offers. These rules are intended to be used alongside specific bonus rules.'
        }
      },
      responsibleGaming: {
        introduction: {
          title: 'arcanebet - Introduction | Responsible gaming',
          description: 'arcanebet is dedicated to providing a safe, secure and responsible environment for all of our customers. This is a brief introduction to our responsible gaming policies.'
        },
        selfAssessment: {
          title: 'arcanebet - Self Assessment Test | Responsible gaming',
          description: 'If you feel like you might have a gambling problem or if you just want to see where you stand, please make use of our self-assessment test for simple results.'
        },
        limits: {
          title: 'arcanebet - Limits | Responsible gaming',
          description: 'If you feel like you might have a gambling problem or if you just want to see where you stand, please make use of our self-assessment test to see where you stand.'
        }
      }
    },
    generalTerms: {
      deposit: 'Deposit | Deposits',
      withdraw: 'Withdraw | Withdraws',
      upcoming: 'Upcoming',
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
    userModal: {
      forgotPasswordCta: 'Forgot your password? Recover it here',
      back: 'Back',
      backToPasswordRequestForm: 'Back to password request form',
      resetPasswordHeader: 'Reset your password',
      passwordChangeSuccess: 'Your password has been successfully changed.',
      passwordChangeFail: 'Something went wrong, please check entered details',
      resetEmailSuccess1: 'Password reset email successfully sent to:',
      resetEmailSuccess2: 'Click the link in the email to reset your password. If you didn\'t receive an email please contact live support. '
    },
    pageLeaveModal: {
      header: 'Event is over',
      description: 'Unfortunately, this event is over, try your luck in another one! You will be automatically redirected in 5 sec'
    },
    cookies: {
      header: 'We value your privacy',
      description: 'This website uses cookies. Please see our',
      policy: 'Cookie Policy',
      accept: 'I Accept'
    },
    offlineModal: {
      recconect: 'Reconnect',
      establishingConnection: 'Establishing <br> connection'
    },
    homePage: {
      upcoming: 'Upcoming 6h',
      upcomingCommon: 'Upcoming',
      live: 'Live now',
      esport: 'Esports',
      sport: 'Sports'
    },
    noFoundPage: {
      header: 'Oops, the page you are looking for doesn\'t seem to exist ',
      description: 'We\'re sorry but the page you are looking for cannot be found. It may\n' +
      '          have been removed, had its name changed, or is temporarily unavailable.\n' +
      '          If this is a problem from our end, please be assured we\'re doing all we\n' +
      '          can to resolve the situation.',
      esportButton: 'Esport home',
      sportButton: 'Sport home'
    },
    eventPage: {
      minute: 'minute'
    },
    tournamentPage: {
      description: {
        time: 'time',
        score: 'score',
        starts: 'starts',
        status: 'status'
      }
    },
    betslip: {
      generic: 'Bet placement unsuccessful. Please try again or contact support.',
      betslipEmpty: 'Your betslip is currently empty.\n' +
        'Click on any odds to add them\n' +
        'to betslip.',
      acceptAllCheckbox: 'Accept all odds changes',
      tooltipMessages: {
        default: 'Please login to place a bet',
        defaultLoggedIn: 'Your betslip is empty',
        oddsNotConfirmed: 'Please confirm all odds changes',
        notEnoughMoney: 'Please check your available balance',
        inactiveMarkets: 'Please remove any inactive bets',
        unacceptableBets: 'Please remove any inactive bets',
        betsBeingSubmitted: 'Bet placement in progress',
        invalidStakeAmount: 'Please make sure your stake is correct'
      },
      cta: {
        placeBet: 'Place Bet',
        clearAll: 'Clear all'
      },
      mobileButton: 'Betslip'
    },
    betslipItem: {
      oddsChanged: 'Odds Changed'
    },
    wallet: {
      balance: 'Balance',
      secondWallet: '2nd Wallet',
      switch: 'switch'
    },
    sidemenu: {
      settings: {
        livechat: 'livechat'
      }
    },
    account: {
      tabs: {
        account: 'Account info & settings',
        activity: 'Activity',
        depositFunds: 'Deposit funds',
        withdrawFunds: 'Withdraw funds',
        bonus: 'Bonus',
        accountVerification: 'Account verification',
        accountStatus: 'Account status',
        transactionHistory: 'Transaction history',
        livechat: {
          open: 'Open live chat',
          close: 'Remove live chat'
        }
      },
      cta: {
        resetPassword: 'Reset password',
        changeWithdrawalMethod: 'Change withdrawal method',
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
        paymentMethodsPlaceholder: 'Deposit methods',
        depositHeader: 'Deposit Funds',
        depositSummary: 'Deposit summary',
        total: 'Total to be added',
        moneyTransferInformation: 'The money will be transferred directly in to your arcanebet account. When you have won some bets you can look forward to easy and fast withdrawals without fees!\n',
        depositPaymentMethodInformation: 'This is only a list of payment methods we support. You will select the one that suits you on the next page. We do not charge service fees.',
        crypto: {
          howTo: "You can send money from your wallet to provided crypto address. Our service will process the payment and fill your balance automatically.</br> <b>Reminder.</b> In case if you want to send another sum of money, applied bonus code could be ignored. If you're experiencing some issues with crypto payment, feel free to contact our support team. We're always glad to help you!",
          copyAddress: 'Copy address:',
          addressCopied: 'Address was copied to clipboard',
          scanQRCode: 'or scan QR code:'
        },
        serviceFees: 'We do not charge service fees.',
        paymentMethodsSupport: 'This is only a list of payment methods we support. You will select the one that suits you on the next page.',
        bonusDescription: 'Bonus code description'
      },
      withdraw: {
        withdrawFunds: 'Withdraw funds',
        cardLastFourDigits: 'Card last four digits',
        cardHolderName: 'Card holder name',
        skrillAddress: 'Skrill address',
        nettelerAddress: 'Neteller address',
        arcanebetPassword: 'Arcanebet password',
        notAvailable: 'The withdrawal page will only be available once you\'ve made a successful deposit and your account has been verified.<br/><br/>Please make a deposit using your preferred method and upload your documents via our verification tab to unlock this page.',
        withdrawNoFeeInformation: 'Debit/Credit Card withdrawals come with a 0% withdrawal fee',
        warning: 'Please be aware that requesting a withdrawal while you have an active bonus will result in all of your bonus funds being confiscated. If you wish to check your bonus status, please navigate to the bonus tab on your profile or contact support for further assistance. Be aware that if you initiate a withdrawal and the bonus is confiscated this is NOT reversible.'
      },
      bonus: {
        bonusName: 'Bonus name',
        bonusAwarded: 'Bonus awarded',
        rolloverRequired: 'Rollover required',
        minimumOdds: 'Minimum odds',
        maximumRolloverPerBet: 'Maximum rollover per bet',
        expiryDate: 'Expiry date',
        bonusAchieved: 'Rollover achieved',
        noBonus: 'It seems you have no active bonus at the moment. Please make a deposit and enter a bonus code to claim one.',
        longTerms: {
          header: 'Bonus rules for code:',
          awarded: 'Awarded:',
          paragraph: {
            main: 'These rules are in addition to the general bonus rules and applicable terms and conditions; these can be found on our terms and conditions page or by clicking ',
            link: 'here'
          },
          list: {
            list1: 'To convert this bonus into cash you need to reach the rollover of ',
            list2: 'Total bonus awarded for this offer is ',
            list3: 'This offer is available to claim until ',
            list4: 'Once claimed you have ',
            list4Days: '{n} day | {n} days',
            list4Part2: ' to reach the rollover before the bonus expires.',
            list5: 'Only settled bets will count towards rollover. If a selection that is settled is later re-settled to a void, the rollover achieved will be recalculated accordingly',
            list6: 'You may only have one active bonus at a time',
            list7: 'You may withdraw at any point, if you do this will confiscate your entire bonus balance if you have not reached the rollover yet',
            list8: 'You may only use this code once per household per real account. If it is found that there is any attempt to avoid this limitation, we reserve the right to void all bets and confiscate all funds',
          }
        },
      },
      accountVerification: {
        status: {
          verified: 'Verified',
          notVerified: 'Not Verified'
        },
        disclaimers: {
          description: 'In order to follow KYC procedures, we are required to verify your identity before we are able to process any withdrawal requests. Please upload the neccessary documents and we will verify your account as soon as possible.',
          cardWarning: 'Do note that credit/debit card scans are required only for players that have used a credit/debit card for their deposits. In order to keep your payment details safe, we encourage you to cover the middle 6 digits of the card before uploading.'
        },
        cta: {
          chooseFile: 'Choose file',
          uploadFiles: 'Upload Files',
          remove: 'Remove'
        },
        information: {
          upload: 'You don’t have any files chosen.<br> Please choose files to upload',
          waiting: 'Waiting for upload'
        },
        kinds: {
          passport: 'Passport or Identity card',
          bill: 'Utility Bill',
          bank: 'Bank statement',
          card: 'Credit/Debit card',
          other: 'Other'
        },
        activated: 'Your account has been successfully activated'
      }
    },
    common: {
      noEventsFound: 'No events found'
    }
  }
}

export default messages
