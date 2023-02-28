import apiRequest from "@/apiRequest";

export default {
    namespaced: true,
    state: {
        citations: [],
        authors: [],
        categories: [],
        authorCategories: [],
        message: {}
    },
    getters: {
        getAuthors: (state) => state.authors,
    },
    mutations: {
        SET_AUTHORS(state, data) {
            state.authors = data
        },
        ADD_AUTHOR(state, data) {
            state.authors.push(data)
        },
        UPDATE_AUTHOR(state, data) {
            state.authors.forEach(el => el.id === data.id ? el.name = data.name : '')
        },
        DELETE_AUTHOR(state, id) {
            state.authors = state.authors.filter(el => el.id !== id)
        },
    },
    actions: {

        async fetchAuthors({ commit }) {
            try {
                const response = await apiRequest.get(
                    "/authors/"
                );
                commit("SET_AUTHORS", response.data.results);
            } catch (err) {
                console.error(err);
            }
        },

        async addAuthor({ commit }, data) {
            try {
                const response = await apiRequest.post(
                    "/authors/", data
                );
                commit("ADD_AUTHOR", response.data);
                return response.data
            } catch (err) {
                console.error(err);
            }
        },

        async editAuthor({ commit }, data) {
            try {
                const response = await apiRequest.patch(
                    `/authors/${data.id}/`, { name: data.name }
                );
                console.log(response);
                commit("UPDATE_AUTHOR", data);
                return response.data
            } catch (err) {
                console.error(err);
            }
        },

        async deleteAuthor({ commit }, id) {
            try {
                const response = await apiRequest.delete(
                    `/authors/${id}/`
                );
                console.log(response.data);
                commit("DELETE_AUTHOR", id);
            } catch (err) {
                console.error(err);
            }
        },
    },
};
