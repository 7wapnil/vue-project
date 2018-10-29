<template>
    <modal id="authModal"
           title="Welcome to ArcaneBet">
        <b-tabs>
            <b-tab title="Login" active>
                <login/>
            </b-tab>
            <b-tab title="Sign up">
                <sign-up/>
            </b-tab>
        </b-tabs>
    </modal>
</template>

<script>
  import Login from './Login'
  import SignUp from './SignUp'

  export default {
    components: {
      SignUp,
      Login
    }
  }
</script>
