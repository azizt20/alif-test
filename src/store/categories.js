import apiRequest from "@/apiRequest";

export default {
  namespaced: true,
  state: {
    categories: [],
    authorCategories: [],
    count: ''
  },
  getters: {
    getCategories: (state) => state.categories,
    getAuthorCategories: (state) => state.authorCategories,
    getCitationsCount: (state) => state.count,
  },
  mutations: {
    SET_CATEGORIES(state, data) {
      state.categories = data
    },
    SET_COUNT(state, data) {
      state.count = data
    },
    SET_AUTHOR_CATEGORIES(state, data) {
      state.authorCategories = data
    },
    ADD_CATEGORY(state, data) {
      state.categories.push(data) 
    },
    UPDATE_CATEGORY(state, data) {
      state.categories.forEach(el => el.id === data.id ? (el.name = data.name, el.description = data.description) : '')
    },
    DELETE_CATEGORY(state, id) {
      state.categories = state.categories.filter(el => el.id !== id)
    },
  },
  actions: {

    async fetchCategories({ commit }) {
      try {
        const response = await apiRequest.get(
          "/categories/"
        );
        commit("SET_CATEGORIES", response.data.results);
      } catch (err) {
        console.error(err);
      }
    },

    async fetchAuthorCategories({ commit }, id) {
      try {
        const response = await apiRequest.get(
          "/categories/?author=" + id
        );
        commit("SET_AUTHOR_CATEGORIES", response.data.results);
      } catch (err) {
        console.error(err);
      }
    },
    async fetchCitationsCount({ commit }, id) {
      try {
        const response = await apiRequest.get(
          `/citations/?category=${id}`
        );
        commit("SET_COUNT", response.data.count);
      } catch (err) {
        console.error(err);
      }
    },

    async addCategory({ commit }, data) {
      try {
        const response = await apiRequest.post(
          `/categories/`, { name: data.name, description: data.description }
        );
        console.log(response);
        commit("ADD_CATEGORY", response.data);
        return response.data
      } catch (err) {
        console.error(err);
      }
    },

    async editCategory({ commit }, data) {
      try {
        const response = await apiRequest.patch(
          `/categories/${data.id}/`, { name: data.name, description: data.description }
        );
        console.log(response);
        commit("UPDATE_CATEGORY", data);
        return response.data
      } catch (err) {
        console.error(err);
      }
    },

    async deleteCategory({ commit }, id) {
      try {
        const response = await apiRequest.delete(
          `/categories/${id}/`
        );
        console.log(response.data);
        commit("DELETE_CATEGORY", id);
      } catch (err) {
        console.error(err);
      }
    },
  },




};
