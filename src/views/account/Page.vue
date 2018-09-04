<template>
   <main-layout>
       <div class="row">
           <div class="col-xs-12 col-lg-3">
               <b-card class="mt-4" header="Menu">
                   <b-nav vertical class="nav-pills">
                       <b-nav-item disabled>Account Info</b-nav-item>
                       <b-nav-item disabled>Activity</b-nav-item>
                       <b-nav-item disabled>Deposit Funds</b-nav-item>
                       <b-nav-item disabled>Withdraw Funds</b-nav-item>
                       <b-nav-item active>Account Verification</b-nav-item>
                   </b-nav>
               </b-card>
           </div>
           <div class="col-xs-12 col-lg-9">
               <b-card class="mt-4" header="Account">
                    <upload-form></upload-form>
               </b-card>
           </div>
       </div>
   </main-layout>
</template>

<script>
  import UploadForm from '@/components/custom/UploadForm.vue'

  export default {
    components: {
      UploadForm
    },
    data() {
      return {}
    }
  }
</script>
