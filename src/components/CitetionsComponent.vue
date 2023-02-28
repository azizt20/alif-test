<template>
  <div>
    <div class="grid lg:grid-cols-10 sm:grid-cols-4 gap-6">
      <label for="category" class="flex flex-col lg:col-span-3 col-span-2">
        Поиск по автору и тексту цитаты
        <input
          v-model="search"
          type="text"
          class="rounded  mt-1 focus:border-[#39B980] focus:ring-[#39B980]"
        />
      </label>

      <label for="category" class="flex flex-col col-span-2">
        Фильтр по авторам
        <select
          v-model="author"
          name="authors"
          id="authors"
          class="rounded mt-1 focus:border-[#39B980] focus:ring-[#39B980]"
        >
          <option disabled selected value="">Выберите автора</option>
          <option value="">Все авторы</option>
          <option v-for="author in authors" :key="author.id" :value="author.id">
            {{ author.name }}
          </option>
        </select>
      </label>

      <label for="category" class="flex flex-col col-span-2">
        Фильтр по жанрам
        <select
          v-model="category"
          name="category"
          id="category"
          class="rounded mt-1 focus:border-[#39B980] focus:ring-[#39B980]"
        >
          <option disabled selected value="">Выберите жанр</option>
          <option value="">Все жанры</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </label>

      <label for="sort" class="flex flex-col col-span-2">
        Сортировать по
        <select
          v-model="sort"
          name="sort"
          id="sort"
          class="rounded mt-1 focus:border-[#39B980] focus:ring-[#39B980]"
        >
          <option selected disabled value="">Сортировать по</option>
          <option value="created_at">время добавления</option>
          <option value="updated_at">время обновления</option>
        </select>
      </label>

     <div class="flex w-full h-full items-end lg:justify-center">
      <button
        class="mb-2 pr-2"
        title="Сбросить фильтры"
        @click="deleteFiltes()"
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
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
     </div>
    </div>
    <div
      name="list"
      class="mx-auto mt-10 max-w-2xl border-t border-[#39B980] pt-10 sm:pt-16 lg:mx-0 lg:max-w-none"
    >
      <transition-group
        name="list"
        tag="div"
        class="grid grid-cols-1 md:gap-y-8 gap-y-16 gap-x-8 lg:grid-cols-3"
      >
        <post-card
          v-for="citation in filteredCitations"
          :key="citation.id"
          :id="citation.id"
          :datetime="citation?.created_at"
          :date="citation?.created_at"
          :citation="citation?.citation"
          :author="citation?.author"
          :category="citation?.category"
          @click-category="(data) => (category = data)"
        />
      </transition-group>
    </div>
  </div>
</template>
<script>
import PostCard from "@/components/PostCard.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    PostCard,
  },
  data() {
    return {
      author: "",
      category: "",
      sort: "",
      search: "",
    };
  },
  mounted() {
    this.fetchCitations();
    this.$store.dispatch("categories/fetchCategories");
    this.$store.dispatch("authors/fetchAuthors");
  },
  methods: {
    fetchCitations() {
      this.$store.dispatch("citations/fetchCitations", {
        author: this.author,
        category: this.category,
        search: this.search,
      });
    },
    deleteFiltes() {
      this.author = "";
      this.category = "";
      this.sort = "";
      this.search = "";
    },
  },
  watch: {
    author() {
      this.fetchCitations();
    },
    category() {
      this.fetchCitations();
    },
    search() {
      this.fetchCitations();
    },
  },
  computed: {
    ...mapGetters({
      citations: "citations/getCitations",
      categories: "categories/getCategories",
      authors: "authors/getAuthors",
    }),

    filteredCitations() {
      let citationslist = this.citations;
      return this.sort
        ? citationslist.sort((a, b) => (a[this.sort] > b[this.sort] ? 1 : -1))
        : citationslist;
    },
  },
};
</script>
<style lang=""></style>
