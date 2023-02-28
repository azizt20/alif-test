<template>
  <article
    class="flex max-w-xl flex-col items-start justify-between p-3 rounded-lg border bg-white shadow-lg"
  >
    <div class="flex items-center gap-x-4 text-xs">
      <time :datetime="datetime" class="text-gray-500">{{ formatedDate }}</time>
      <span
        v-for="cat in category"
        :key="cat.id"
        @click="$emit('clickCategory', cat.id)"
        class="cursor-pointer relative z-10 rounded-full bg-[#b3f3d6] py-1.5 px-3 font-medium text-gray-600 hover:text-gray-900 hover:bg-[#84f0bf]"
      >
        {{ cat.name }}
      </span>
    </div>
    <div class="group relative">
      <p class="mt-3 text-sm leading-6 text-gray-600 post-text">
        {{ citation }}
      </p>
    </div>
    <div class="relative mt-5 flex items-center gap-x-4">
      <div
        class="h-10 w-10 rounded-full bg-indigo-300 flex items-center justify-center font-bold text-white"
      >
        {{ firstLetter }}
      </div>
      <div class="text-sm leading-6">
        <p class="font-semibold text-gray-900">
          <a>
            <span class="absolute inset-0" />
            {{ author.name }}
          </a>
        </p>
      </div>
    </div>
    <hr />
    <div
      v-if="panelSiVisible"
      class="border-t pt-2 mt-2 w-full flex justify-end items-center space-x-3"
    >
      <router-link
        :to="{ name: 'citation', params: { id: id } }"
        title="Перейти к редактированию"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </router-link>

      <button @click="deleteCitation()" title="Удалить Цитату">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    citation: {
      type: String,
    },
    datetime: {
      type: String,
      default: function () {
        return new Date();
      },
    },
    category: {
      type: Object,
    },
    author: {
      type: Object,
    },
  },
  methods: {
    deleteCitation() {
      confirm("Вы действительно хотите удалить эту цитату")
        ? this.$store.dispatch("citations/deleteCitation", this.id)
        : "";
    },
  },
  computed: {
    formatedDate() {
      return this.datetime.split("T")[0];
    },
    firstLetter() {
      return this.author?.name?.slice(0, 1);
    },
    panelSiVisible() {
      return this.$route.fullPath === "/management";
    },
  },
};
</script>
<style lang="scss" scoped>
.post-text {
  font-family: "Times New Roman", Times, serif;
}
</style>
