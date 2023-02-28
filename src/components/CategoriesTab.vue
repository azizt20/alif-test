<template>
  <div class="grid grid-cols-3 gap-20">
    <ul role="list" class="divide-y divide-gray-200">
      <li
        v-for="cat in categories"
        :key="cat.id"
        @click="clickCat(cat)"
        class="flex py-4 cursor-pointer"
      >
        <div class="ml-3 flex items-center justify-between w-full">
          <div class="w-3/4">
            <p class="text-sm font-medium text-gray-900">{{ cat.name }}</p>
            <p class="text-sm text-gray-500">{{ cat.description }}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 transition-all"
            :class="{ '-rotate-90 text-[#39B980]': current.id === cat.id }"
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
    <div>
      <div class="py-4 space-y-3" v-if="current.id">
        <h3 class="text-lg mb-4 font-semibold">Редактировать жанр</h3>

        <input
          :disabled="!edit"
          type="text"
          v-model="name"
          placeholder="Название жанра"
          :class="{ 'border-[#39B980]': edit }"
          class="rounded focus:border-[#39B980] focus:ring-[#39B980] w-full disabled:cursor-not-allowed"
        />
        <span class="text-xs text-red-500" v-if="error.name">
          {{ error?.name }}
        </span>
        <input
          :disabled="!edit"
          type="text"
          v-model="description"
          placeholder="Описание жанра"
          :class="{ 'border-[#39B980]': edit }"
          class="rounded focus:border-[#39B980] focus:ring-[#39B980] w-full disabled:cursor-not-allowed"
        />
        <span class="text-xs text-red-500" v-if="error.description">
          {{ error?.description }}
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

    <div class="py-4 space-y-3">
      <h3 class="text-lg mb-4 font-semibold">Добавить жанр</h3>

      <input
        type="text"
        v-model="newName"
        placeholder="Название жанра"
        :class="{ 'border-[#39B980]': edit }"
        class="rounded focus:border-[#39B980] focus:ring-[#39B980] w-full disabled:cursor-not-allowed"
      />
      <span class="text-xs text-red-500" v-if="error.newName">
        {{ error?.newName }}
      </span>
      <input
        type="text"
        v-model="newDescription"
        placeholder="Описание жанра"
        :class="{ 'border-[#39B980]': edit }"
        class="rounded focus:border-[#39B980] focus:ring-[#39B980] w-full disabled:cursor-not-allowed"
      />
      <span class="text-xs text-red-500" v-if="error.newDescription">
        {{ error?.newDescription }}
      </span>
      <div class="flex items-center justify-end mt-3 space-x-3">
        <button
          @click="clear()"
          class="bg-red-500 hover:bg-red-600 rounded px-4 py-1 font-medium text-white"
        >
          Очистить
        </button>
        <button
          @click="saveCategory()"
          class="bg-[#39B980] hover:bg-[#2aaf73] rounded px-4 py-1 font-medium text-white"
        >
          Сохранить
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
      current: {},
      edit: false,
      name: "",
      description: "",
      newName: "",
      newDescription: "",
      error: {},
    };
  },
  mounted() {
    this.$store.dispatch("categories/fetchCategories");
  },
  computed: {
    ...mapGetters({
      categories: "categories/getCategories",
      count: "categories/getCitationsCount",
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
      if (!this.name) {
        this.error.name = "Жанр не должен быть пустым";
      } else if (!reg_str.test(this.name)) {
        this.error.name = "Не верный формат данных";
      }
      if (!this.description) {
        this.error.description = "Заполните описание";
      }
      return this.objectLength(this.error);
    },

    checkSaveForm() {
      const reg_str = /^[a-zA-Zа-яА-ЯёЁ ]+$/;
      this.error = {};
      if (!this.newName) {
        this.error.newName = "Жанр не должен быть пустым";
      } else if (!reg_str.test(this.newName)) {
        this.error.newName = "Не верный формат данных";
      }
      if (!this.newDescription) {
        this.error.newDescription = "Заполните описание";
      }
      return this.objectLength(this.error);
    },

    deleteAuthor() {
      if (this.count) {
        this.$store.commit("citations/SHOW_ALERT_MESSAGE", {
          type: "error",
          text: "К этому жанру привязаны цитаты",
        });
      } else {
        confirm("Вы действительно хотите удалить этот жанр")
          ? (this.$store.dispatch("categories/deleteCategory", this.current.id),
            (this.current = {}))
          : "";
      }
    },

    clickButton() {
      if (this.edit && !this.checkEditForm()) {
        this.$store.dispatch("categories/editCategory", {
          id: this.current.id,
          name: this.name,
          description: this.description,
        });
        this.current = {};
      }

      this.edit = !this.edit;
    },
    clickCat(cat) {
      this.$store.dispatch("categories/fetchCitationsCount", cat.id);
      this.current = cat;
      this.name = cat.name;
      this.description = cat.description;
      this.edit = false;
      this.error = {};
    },
    clear() {
      this.newName = "";
      this.newDescription = "";
    },
    saveCategory() {
      if (!this.checkSaveForm()) {
        this.$store.dispatch("categories/addCategory", {
          name: this.newName,
          description: this.newDescription,
        });
        this.clear();
      }
    },
  },
};
</script>
<style lang=""></style>
