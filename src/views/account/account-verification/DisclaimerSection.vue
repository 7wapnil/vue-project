<template>
    <div>
        <b-row no-gutters>
            <b-col class="mb-4">
                <p class="letter-spacing-2 text-arc-clr-iron">
                    In order to follow KYC procedures, we are required to verify
                    your identity before we are able to process any withdrawal requests.
                    Please upload the neccessary documents and we will verify your
                    account as soon as possible.
                </p>
            </b-col>
        </b-row>
        <b-row style="box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, .3)" no-gutters>
            <b-col class="d-flex align-items-center justify-content-center p-4 mb-4" cols="auto">
                <b-img :src="require('@/assets/images/account/account-verification/arc-caution.svg')"/>
            </b-col>
            <b-col>
                <p class="letter-spacing-2 text-arc-clr-iron mb-4 ml-3">
                    Do note that credit/debit card scans are required only for players
                    that have used a credit/debit card for their deposits.
                    In order to keep your payment details safe,
                    we encourage you to cover the middle 6 digits
                    of the card before uploading.
                </p>
            </b-col>
        </b-row>
    </div>
</template>
