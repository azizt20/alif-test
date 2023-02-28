<template>
  <form
    class="mx-auto max-w-7xl items-center px-6 mt-10 space-y-8 divide-y divide-gray-200"
  >
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <div>
          <h3 class="text-xl font-semibold leading-6 text-gray-900">
            Заполните информацию о цитате
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            <!-- Use a permanent address where you can receive mail. -->
          </p>
        </div>

        <citation-form />
      </div>
    </div>
  </form>
</template>
<script>
import CitationForm from "@/components/CitationForm.vue";

export default {
  components: {
    CitationForm,
  },
};
</script>
