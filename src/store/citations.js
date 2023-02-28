import apiRequest from "@/apiRequest";

export default {
  namespaced: true,
  state: {
    citations: [],
    citation: {},
    message: {}
  },
  getters: {
    getCitations: (state) => state.citations,
    getCitation: (state) => state.citation,
    getAlertMessage: (state) => state.message,
  },
  mutations: {
    SET_CITATIONS(state, data) {
      state.citations = data
    },

    SET_CITATION(state, data) {
      state.citation = data
    },
    DELETE_CITATION(state, id) {
      state.citations = state.citations.filter(el => el.id !== id)
    },
    SHOW_ALERT_MESSAGE(state, data) {
      state.message.visible = true;
      state.message.text = data.text;
      state.message.type = data.type;
      setTimeout(() => {
        state.message.visible = false;
      }, 3000);
    },
  },
  actions: {

    async fetchCitations({ commit }, data) {
      try {
        const response = await apiRequest.get(
          `/citations/?${data.category ? 'category=' + data.category : ''}${data.author ? '&author=' + data.author : ''}${data.search ? '&search=' + data.search : ''}`
        );
        commit("SET_CITATIONS", response.data.results);
      } catch (err) {
        console.error(err);
      }
    },

    async fetchCitation({ commit }, id) {
      try {
        const response = await apiRequest.get(
          `/citations/${id}/`
        );
        commit("SET_CITATION", response.data);
      } catch (err) {
        console.error(err);
      }
    },

    async addCitation({ commit }, data) {
      try {
        const response = await apiRequest.post(
          "/citations/", data
        );
        commit("SHOW_ALERT_MESSAGE", { type: "success", text: "Цитата успешно добавлена" })
        return response.data
      } catch (err) {
        console.error(err);
      }
    },

    async editCitation({ commit }, data) {
      console.log('editCitation');
      try {
        const response = await apiRequest.put(
          `/citations/${data.id}/`, data
        );
        commit("SHOW_ALERT_MESSAGE", { type: "success", text: "Цитата успешно мзменена" })
        commit("SHOW_ALERT_MESSAGE", { type: "success", text: "Цитата успешно мзменена" })
        return response.data
      } catch (err) {
        console.error(err);
      }
    },

    async deleteCitation({ commit }, id) {
      try {
        const response = await apiRequest.delete(
          `/citations/${id}/`
        );
        console.log(response.data);
        commit("DELETE_CITATION", id);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
