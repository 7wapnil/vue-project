<template>
  <b-row
    class="mt-4 mr-auto ml-auto"
    no-gutters>
    <b-col
      lg="8"
      class="mr-auto ml-auto">
      <div class="progressbar">
        <button
          :class="{'active' : isCurrentStep(1) || isCurrentStep(2)}"
          class="step-one"
          block
          @click="previousStep">Personal Information
        </button>
        <button
          :class="{'active' : isCurrentStep(2)}"
          class="step-two"
          @click="nextStep">Contact
          Information
        </button>
      </div>
    </b-col>
  </b-row>
</template>
