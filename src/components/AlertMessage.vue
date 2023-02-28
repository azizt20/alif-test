<template>
  <transition
    enter-active-class="transition duration-1200 linear"
    enter-from-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition duration-1200 linear"
    leave-from-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="massage?.visible"
      class="notification fixed right-4 top-4 px-4 h-16 flex items-center justify-center rounded-lg"
      :style="{ 'background-color': color, 'z-index': 100 }"
    >
      <div class="w-10 pl-2">
        <svg
          v-if="massage?.type == 'error'"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          :style="`fill: #ffffff; transform: ; msfilter: `"
        >
          <path
            d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"
          ></path>
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
        >
          <path
            d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"
          ></path>
        </svg>
      </div>

      <h1 class="ml-3 text-white text-xl">
        {{ massage?.text }}
      </h1>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      timer: undefined,
    };
  },

  watch: {},

  computed: {
    massage() {
      return this.$store.getters["citations/getAlertMessage"];
    },

    color() {
      if (this.massage?.type == "error") {
        return "rgba(239, 68, 68, 1)";
      } else {
        return "rgba(34, 197, 94, 1)";
      }
    },
  },
};
</script>

<style></style>
