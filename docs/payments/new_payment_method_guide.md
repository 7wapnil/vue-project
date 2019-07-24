## How to add new payment method

1) Create your withdrawal method component

2) Your component should:

    - accept property `method`;
     
    - have data `fields` with all payment method details;
    
    - include `formReset` mixin;
    
    ```vue
    # src/views/account/account-withdraw/withdrawal-methods/Custom.vue
 
    <script>
    import formReset from '@/mixins/formReset'
        
    export default {
      mixins: [formReset],
      props: {
        method: {
          type: Object,
          default: () => {}
        }
      },
      data () {
        return {
          fields: {
            field_1: this.method.details.field1,
            field_2: this.method.details.field2
          }
        }
      },
      created () {
        this.$emit('input', this.fields)
      }
    }
    </script>
    ```

3) If your payment method can be manually entered - provide respective details fields and trigger form updating on their change.
    
    ```vue
    # src/views/account/account-withdraw/withdrawal-methods/Custom.vue
 
    <template>
      <div>
        <b-row
          class="mb-4"
          no-gutters>
          <b-col class="text-md-right text-sm-left align-self-center">
            <label
              for="field1"
              class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
              Field 1:
            </label>
          </b-col>
          <b-col class="user-profile-form">
            <b-form-input
              id="field_1"
              v-model="fields.field_1"
              class="ml-4 text-left w-50"
              type="text"
              @input="onInput()"/>
          </b-col>
          <b-col/>
        </b-row>
      </div>
    </template>

    <script>
    export default {
      ...,
      data () {
        return {
          fields: {
            field_1: ''
          }
        }
      },
      methods: {
        onInput (e) {
          this.$emit('input', this.fields)
        }
      }
    }
    </script>
    ```
    
    If your payment method cannot be manually entered - fill respective details fields and trigger form updating on component creating.
    You can show information about payment method for customer - but that's for you own decision.
    
    ```vue
    # src/views/account/account-withdraw/withdrawal-methods/Custom.vue
 
    <template>
      <div>
        <b-row
          class="mb-4"
          no-gutters>
          <b-col class="text-md-right text-sm-left align-self-center">
            <label
              for="last_four_digits"
              class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
              {{ $t('account.withdraw.customField1') }}:
            </label>
          </b-col>
          <b-col class="user-profile-form">
            <div class="ml-4 text-left w-50">
              {{ method.details.field1 }}
            </div>
          </b-col>
          <b-col/>
        </b-row>
      </div>
    </template>
    
    <script>
    export default {
      ...,
      props: {
        method: {
          type: Object,
          default: () => {}
        }
      },
      data () {
        return {
          fields: {
            field_1: this.method.details.field1,
            field_2: this.method.details.field2
          }
        }
      },
      created () {
        this.$emit('input', this.fields)
      }
    }
    </script>
    ```
    
4) Add your component to withdrawal payment methods mapping
    
    ```vue
    # src/views/account/account-withdraw/WithdrawalForm.vue
    
    <script>
    import Custom from './withdrawal-methods/Custom'
    
    data () {
      return {
        components: {
          ...,
          'custom': Custom
        }
      }
    }
    </script>
    ```
    
5) Add your payment method icon below `src/assets/images/withdrawal-methods/custom.png`

6) Add your icon to payment icons mapping

    ```vue
    # src/components/PaymentMethodIcon.vue

    <script>
    import CustomIcon from '@/assets/images/withdrawal-methods/custom.png'
    
    export default {
      data () {
        return {
          icons: {
            ...,
            custom: CustomIcon
          }
        }
      }
    }
    </script>
    ```

7) Add your icon to deposit payment methods list
    
    ```vue
    # src/views/account/account-deposit/DepositMethods.vue
    
    <script>
    import Custom from '@/assets/images/withdrawal-methods/custom.png'
    
    export default {
      data () {
        return {
          depositMethods: [
            ...,
            Custom
          ]
        }
      }
    }
    </script>
    ```

8) **NB.** Pay your attention to `src/views/account/account-deposit/Page.vue#submitDeposit:359`.
Here there is a mock for bitcoin form, same form can be needed for your another crypto payment method.
Just be informed

9) Add your payment method to `src/libs/apollo/fragment-matcher.js`. 
This helps GraphQL to recognize your payment method as separate object.

    ```js
    // src/libs/apollo/fragment-matcher.js
 
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: [
            {
              kind: 'UNION',
              name: 'PaymentsWithdrawalsPaymentMethodDetails',
              possibleTypes: [
                ...,
                { name: 'PaymentMethodCustom' }
              ]
            }
          ]
        }
      }
    })
    ``` 
    
10) Add your payment method to GraphQL user query.
    ```js
    // src/graphql/user.js
    
    export const USER_WITHDRAWAL_METHODS_QUERY = gql`
      query {
        user {
          ...
          availableWithdrawalMethods {
            ...
            details {
              ...
              ... on PaymentMethodCustom {
                id
                title
                isEditable
                field1
                field2
              }
            }
          }
        }
      }
    `
    ```

11) You're a rockstar!
