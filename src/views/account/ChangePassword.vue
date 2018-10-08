<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-group
          :label-cols="4"
          horizontal
          class="text-right"
          label-size="md"
          label="Current password:"
          label-for="current_password">
          <b-form-input
            id="current_password"
            size="md"/>
        </b-form-group>
        <b-form-group
          :label-cols="4"
          horizontal
          class="text-right"
          label-size="md"
          label="New password:"
          label-for="new_password">
          <b-form-input
            id="new_password"
            size="md"/>
        </b-form-group>
        <b-form-group
          :label-cols="4"
          horizontal
          class="text-right"
          label-size="md"
          label="Repeat new password:"
          label-for="repeat_password">
          <b-form-input
            id="repeat_password"
            size="md"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-right">
        <b-button variant="primary">
          Reset password
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
