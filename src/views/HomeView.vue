<template>
  <div class="pt-12 sm:pt-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Цитаты великих и не очень
        </h2>
        <p class="mt-10 text-lg leading-8 text-gray-600"></p>
      </div>
      <citetions-component />
    </div>
  </div>
</template>

<script>
import CitetionsComponent from "@/components/CitetionsComponent.vue";
export default {
  components: {
    CitetionsComponent,
  },
};
</script>
<style lang="scss" scoped>
.post-text {
  font-family: "Times New Roman", Times, serif;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(500px);
}
</style>
