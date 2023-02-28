<template>
  <div class="space-y-6 sm:space-y-5">
    <div
      class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="last-name"
        class="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
        :class="{ '!text-red-500': error.author }"
      >
        Автор цитаты
      </label>
      <div class="mt-1 sm:col-span-2 sm:mt-0">
        <custom-combobox
          v-if="authors"
          :authors="authors"
          v-model:authorSelected="author"
          :error="error.author"
          class="max-w-lg"
        />
      </div>
    </div>

    <div
      class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="citation"
        class="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
        :class="{ '!text-red-500': error.text }"
      >
        Текст цитаты
      </label>
      <div class="mt-1 sm:col-span-2 sm:mt-0">
        <textarea
          id="citation"
          name="citation"
          v-model="text"
          rows="5"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#39B980] focus:ring-[#39B980] sm:text-sm"
          :class="{ '!border-red-500': error.text }"
        />
        <p v-if="error.text" class="mt-2 text-sm text-red-500">
          {{ error.text }}
        </p>
        <p v-else class="mt-2 text-sm text-gray-500">Введите текст цитаты.</p>
      </div>
    </div>

    <div
      class="sm:grid sm:grid-cols-3 sm:items-baseline sm:border-t sm:border-gray-200 sm:gap-4 sm:pt-5"
    >
      <div>
        <div
          class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
          :class="{ '!text-red-500': error.category }"
          id="label-email"
        >
          Жарн цитаты
        </div>
      </div>
      <div class="mt-4 sm:col-span-2 sm:mt-0">
        <div class="max-w-lg space-y-4">
          <div
            v-for="cat in categories"
            :key="cat.id"
            class="relative flex items-start"
          >
            <div class="flex h-5 items-center">
              <input
                :value="cat.id"
                v-model="category"
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

        <p v-if="error.category" class="mt-2 text-sm text-red-500">
          {{ error.category }}
        </p>
      </div>
    </div>

    <div class="pt-5 sm:border-t sm:border-gray-200">
      <div class="flex justify-end">
        <button
          @click.prevent="saveData"
          type="submit"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-[#39B980] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#319e6d] focus:outline-none focus:ring-2 focus:ring-[#39B980] focus:ring-offset-2"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CustomCombobox from "@/components/CustomCombobox.vue";
export default {
  components: {
    CustomCombobox,
  },
  props: {
    id: {
      type: Number,
      default: undefined,
    },
    citation: {
      type: String,
      default: null,
    },
    currentAuthor: {
      type: Object,
      default: null,
    },
    currentCategories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      text: "",
      author: null,
      category: [],
      error: {},
    };
  },
  methods: {
    checkForm() {
      const reg_str = /^[a-zA-Zа-яА-ЯёЁ ]+$/;
      this.error = {};
      if (!this.text) {
        this.error.text = "Цитата не должна быть пустой";
      }
      if (!this.category.length) {
        this.error.category = "Выберите хотя бы один жанр";
      }
      if (!this.objectLength(this.author)) {
        this.error.author = "Выберите автора или введите нового";
      } else {
        if (!reg_str.test(this.author.name)) {
          this.error.author =
            "Не верный формат данных (только буквы - латиница или кириллица)";
        }
      }
      return this.objectLength(this.error);
    },
    async saveData() {
      if (!this.checkForm()) {
        if (this.author?.id) {
          this.id ? this.editData() : this.postData();
        } else {
          this.author = await this.$store.dispatch("authors/addAuthor", {
            name: this.author.name,
          });
          this.id ? this.editData() : this.postData();
        }
      }
    },
    postData() {
      this.$store.dispatch("citations/addCitation", {
        citation: this.text,
        author: this.author.id,
        category: this.category,
      });
      this.text = "";
      this.author = {};
      this.category = [];
    },
    editData() {
      this.$store.dispatch("citations/editCitation", {
        id: this.id,
        citation: this.text,
        author: this.author.id,
        category: this.category,
      });
    },
    objectLength(obj) {
      return obj ? Object.keys(obj).length : 0;
    },
    getIdList(list) {
      let res = [];
      list.forEach((el) => res.push(el.id));
      return res;
    },
  },

  mounted() {
    this.$store.dispatch("categories/fetchCategories");
    this.$store.dispatch("authors/fetchAuthors");
  },
  watch: {
    id() {
      this.text = this.citation;
      this.author = this.currentAuthor;
      this.category = this.getIdList(this.currentCategories);
    },
  },
  computed: {
    ...mapGetters({
      categories: "categories/getCategories",
      authors: "authors/getAuthors",
    }),
  },
};
</script>

<style lang=""></style>
