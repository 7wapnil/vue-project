<template lang="pug">
    .div
        .div.my-4
            = "Match Winner"
            button.close(aria-label="Close")
                span(aria-hidden="true")
                    ="×"   
        .row
            .m-2.col 
                odd-button(:odd={name:"winner 1",value:"2.2"})
            .m-2.col 
                odd-button(:odd={name:"draw",value:"1"})
            .m-2.col 
                odd-button(:odd={name:"winner w",value:"3.23"})
        .div.mt-4.text-right
            .row.my-2
                .col.text-nowrap.text-right
                    = "My Stake:"
                    br
                    button.btn.btn-sm.btn-outline-secondary.my-2             
                        = "Place max bet"
                .col-2
                    = "0"
            .row.my-2.text-nowrap
                .col.text-nowrap.text-right
                    = "Potential Return:"
                .col-2
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
