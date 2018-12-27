<template>
  <b-tabs
    card
    lazy
    class="category-tabs"
    nav-class="bg-transparent px-4 py-0"
    nav-wrapper-class="bg-arc-clr-soil-darker">
    <b-tab
      active
      title-link-class="category-tab px-4 py-3 bg-transparent">
      <template slot="title">
        <b-row no-gutters>
          <b-col class="d-flex justify-content-center align-items-center">
            <icon
              name="sidemenu-game-icon"
              size="18px"/>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <small>
              Football
            </small>
          </b-col>
        </b-row>
      </template>
      <slot/>
    </b-tab>

    <b-tab title-link-class="px-4 py-3 bg-transparent">
      <template slot="title">
        <b-row no-gutters>
          <b-col class="d-flex justify-content-center align-items-center">
            <icon
              name="sidemenu-game-icon"
              size="18px"/>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <small>
              Football
            </small>
          </b-col>
        </b-row>
      </template>
      <slot/>
    </b-tab>

    <div
      slot="empty"
      class="text-center text-muted">
      No tabs. Try to check your connection.
    </div>

  </b-tabs>
</template>
