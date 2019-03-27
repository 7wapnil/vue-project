<template>
    <b-row no-gutters>
        <b-col>
            <b-alert
                    :show="!!depositState"
                    :variant="mapDepositState">
                {{ getMessage }}
            </b-alert>
            <b-alert
                    :show="!!bonusError"
                    variant="warning">
                {{ bonusError }}
            </b-alert>
        </b-col>
    </b-row>
</template>
<script>
    export default {
      props: {
        depositState: {

        },
        bonusError: {

        },
      }
    }
</script>
