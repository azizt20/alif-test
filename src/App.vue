<template>
  <div class="relative">
    <alert-message />
    <confirm-modal />
    <nav-bar />

    <router-view class="bd-amber" />
  </div>
</template>
<script>
import AlertMessage from "@/components/AlertMessage.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import NavBar from "@/components/NavBarComponent.vue";
export default {
  components: {
    NavBar,
    AlertMessage,
    ConfirmModal,
  },
};
</script>
<style lang="scss">
#app {
  background: #eef1fa;
  widows: 100vw;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 50px;
}
</style>
