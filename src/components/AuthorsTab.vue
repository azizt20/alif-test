<template>
  <div class="grid sm:grid-cols-3 gap-20">
    <ul role="list" class="divide-y divide-gray-200">
      <li
        v-for="author in authors"
        :key="author.id"
        @click="clickAuthor(author)"
        class="flex py-4 cursor-pointer"
      >
        <div class="h-10 w-10">
          <div
            class="h-10 w-10 rounded-full bg-indigo-300 flex items-center justify-center font-bold text-white"
          >
            {{ firstLetter(author.name) }}
          </div>
        </div>

        <div class="ml-3 flex items-center justify-between w-full">
          <p class="text-sm font-medium text-gray-900">{{ author.name }}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 transition-all"
            :class="{ '-rotate-90 text-[#39B980]': current.id === author.id }"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </li>
    </ul>

    <div class="py-4" v-if="current.id">
      <h3 class="text-lg mb-4 font-semibold">Cписок жанров</h3>
      <div class="mt-4 sm:col-span-2 sm:mt-0">
        <div class="max-w-lg space-y-4" v-if="categories.length">
          <div
            v-for="cat in categories"
            :key="cat.id"
            class="relative flex items-start"
          >
            <div class="flex h-5 items-center">
              <input
                :value="cat.id"
                :id="'cat' + cat.id"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-[#39B980] focus:ring-[#39B980]"
              />
            </div>
            <div class="ml-3 text-sm">
              <label :for="'cat' + cat.id" class="font-medium text-gray-700">{{
                cat.name
              }}</label>
              <p class="text-gray-500">
                {{ cat.description }}
              </p>
            </div>
          </div>
        </div>
        <div v-else>Данных нет</div>
      </div>
    </div>

    <div class="py-4" v-if="current.id">
      <h3 class="text-lg mb-4 font-semibold">Редактировать данные автора</h3>

      <input
        :disabled="!edit"
        type="text"
        v-model="author"
        :class="{ 'border-[#39B980]': edit }"
        class="rounded focus:border-[#39B980] focus:ring-[#39B980] w-full disabled:cursor-not-allowed"
      />
      <span class="text-xs text-red-500" v-if="error.author">
        {{ error?.author }}
      </span>
      <div class="flex items-center justify-end mt-3 space-x-3">
        <button
          @click="deleteAuthor()"
          class="bg-red-500 hover:bg-red-600 rounded px-4 py-1 font-medium text-white"
        >
          Удалить
        </button>
        <button
          @click="clickButton()"
          class="bg-[#39B980] hover:bg-[#2aaf73] rounded px-4 py-1 font-medium text-white"
        >
          <template v-if="edit"> Сохранить </template>
          <template v-else> Редактировать </template>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      error: {},
      current: {},
      edit: false,
      author: "",
    };
  },
  mounted() {
    this.$store.dispatch("authors/fetchAuthors");
  },
  computed: {
    ...mapGetters({
      authors: "authors/getAuthors",
      categories: "categories/getAuthorCategories",
    }),
  },

  methods: {
    firstLetter(str) {
      return str.slice(0, 1);
    },

    objectLength(obj) {
      return obj ? Object.keys(obj).length : 0;
    },

    checkEditForm() {
      const reg_str = /^[a-zA-Zа-яА-ЯёЁ ]+$/;
      this.error = {};
      if (!this.author) {
        this.error.author = "Автор не должен быть пустым";
      } else if (!reg_str.test(this.author)) {
        this.error.author = "Не верный формат данных";
      }

      return this.objectLength(this.error);
    },
    deleteAuthor() {
      if (this.categories.length) {
        this.$store.commit("citations/SHOW_ALERT_MESSAGE", {
          type: "error",
          text: "К этому автору привязаны цитаты",
        });
      } else {
        confirm("Вы действительно хотите удалить этого автора")
          ? (this.$store.dispatch("authors/deleteAuthor", this.current.id),
            (this.current = {}))
          : "";
      }
    },
    clickButton() {
      this.edit && !this.checkEditForm()
        ? this.$store.dispatch("authors/editAuthor", {
            id: this.current.id,
            name: this.author,
          })
        : "";
      this.edit = !this.edit;
    },
    clickAuthor(author) {
      this.current = author;
      this.$store.dispatch("categories/fetchAuthorCategories", author.id);
      this.author = author.name;
      this.edit = false;
    },
  },
};
</script>
<style lang=""></style>
