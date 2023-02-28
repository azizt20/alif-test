import { createStore } from 'vuex'
import citations from './store/citations'
import categories from './store/categories'
import authors from './store/authors'


export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    citations,
    authors,
    categories
  }
})
