<template>
  <div class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center pt-20">
    <div class="block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.name"
            @click="clickTab(tab.name)"
            :class="[
              tab.current
                ? 'border-[#39B980] text-[#39B980]'
                : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>
    <div class="mt-20 flex justify-start w-full">
      <keep-alive>
        <component class="w-full" :is="currentComponent.component"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CitationsTab from "@/components/CitationsTab.vue";
import CategoriesTab from "@/components/CategoriesTab.vue";
import AuthorsTab from "@/components/AuthorsTab.vue";
export default {
  components: {
    AuthorsTab,
    CategoriesTab,
    CitationsTab,
  },
  data() {
    return {
      tabs: [
        { name: "Цитаты", component: "CitationsTab", current: true },
        { name: "Авторы", component: "AuthorsTab", current: false },
        { name: "Жанры", component: "CategoriesTab", current: false },
      ],
    };
  },
  computed: {
    currentComponent() {
      return this.tabs.find((el) => el.current === true);
    },
  },
  methods: {
    clickTab(name) {
      this.tabs.forEach((el) =>
        el.name === name ? (el.current = true) : (el.current = false)
      );
    },
  },
};
</script>
