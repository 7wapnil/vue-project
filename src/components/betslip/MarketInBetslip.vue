<template lang="pug">
    div
        h5
            ="USION.BET MASTERS: One vs Two"
        .my-4
            = "Match Winner"
            button.close(aria-label="Close")
                span(aria-hidden="true")
                    ="×"
        .row
            .m-2.col
                odd-button(:odd={name:"winner 1",value:"2.2"})
            .m-2.col
                odd-button(:odd={name:"draw",value:"1"})
        .row.mt-4.text-right
            .col-12
                .row.my-2
                    .col-8.text-nowrap.text-right
                        = "My Stake:"
                        br
                        button.btn.btn-sm.btn-outline-secondary.my-2
                            = "Place max bet"
                    .col-4
                        input.form-control(type='text', name='odd-value', value=0)
                .row.my-2
                    .col-8.text-nowrap.text-right
                        = "Potential Return:"
                    .col-4
                        = "NaN"
        hr
</template>

<script>
    import OddButton from '@/components/custom/OddButton.vue'

    export default {
        components: {
            OddButton
        }
    }
</script>
