<template>
  <div class="combobox">
    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
    <span v-else class="text-xs font-semibold">
      Выберите автора или введите нового
    </span>
    <label for="combobox" class="relative">
      <input
        @focus="open = true"
        type="text"
        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-[#39B980] focus:outline-none focus:ring-1 focus:ring-[#39B980] sm:text-sm"
        :class="{ 'border-red-500': error }"
        id="combobox"
        v-model.trim="authorName"
        @input="onInput()"
        display-value="asdasd"
      />
      <button
        @click.prevent="open = !open"
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>

      <div
        v-if="filteredAuyhors.length > 0 && open"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <div
          v-for="person in filteredAuyhors"
          :key="person.id"
          :value="person"
          @click.prevent="selectAuthor(person)"
          :class="[
            'relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-[#39B980] hover:text-white',
          ]"
        >
          <span
            :class="[
              'block truncate',
              authorSelected?.id === person.id && 'font-semibold',
            ]"
          >
            {{ person.name }}
          </span>

          <span
            v-if="authorSelected?.id === person.id"
            :class="[
              'absolute inset-y-0 right-0 flex items-center pr-4 text-[#39B980]',
            ]"
          >
            <CheckIcon class="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

export default {
  components: {
    CheckIcon,
    ChevronUpDownIcon,
  },
  props: {
    authors: {
      type: Array,
    },
    authorSelected: {
      type: Object,
    },
    error: {
      type: String,
    },
  },
  data() {
    return {
      authorName: "",
      isInputted: false,
      open: false,
    };
  },

  methods: {
    selectAuthor(author) {
      this.updateAuthor(author);
      this.open = false;
      this.authorName = author.name;
      this.isInputted = false;
    },
    onInput() {
      this.open = true;
      this.isInputted = true;
      this.authorName !== this.authorSelected?.name
        ? this.updateAuthor({ name: this.authorName })
        : "";
    },
    updateAuthor(author) {
      this.$emit("update:authorSelected", author);
    },
  },
  watch: {
    authorSelected() {
      this.authorName = this.authorSelected.name;
    },
  },
  computed: {
    filteredAuyhors() {
      return this.authorName === "" || !this.isInputted
        ? this.authors
        : this.authors.filter((person) =>
            person.name.toLowerCase().includes(this.authorName.toLowerCase())
          );
    },
  },
};
</script>
