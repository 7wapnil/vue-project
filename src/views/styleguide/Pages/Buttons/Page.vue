<template>
  <div>
    <h3 class="m-4">Buttons</h3>
     <b-row no-gutters>
         <b-col class="p-4">
             <spinner-button class="text-uppercase">
                 Placing bet
             </spinner-button>
             <arc-code codeText="<spinner-button>">Button with spinner inside</arc-code>
         </b-col>
         <b-col/>
     </b-row>
  </div>
</template>
<script>
    import SpinnerButton from '@/components/betslip/SpinnerButton'
    import ArcCode from "@/views/styleguide/Code/ArcCode";

    export default {
      components: {
        ArcCode,
        SpinnerButton
      }
    }
</script>
