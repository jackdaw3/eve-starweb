import { Module } from 'vuex';

export interface UserState {
    isLoggedIn: boolean;
}

const state: UserState = {
    isLoggedIn: false,
};

const user: Module<UserState, unknown> = {
  namespaced: true,
  state,
  mutations: {
    setIsLoggedIn(state, value: boolean) {
      state.isLoggedIn = value;
    },

  },
  actions: {
    setIsLoggedIn({ commit }, value: boolean) {
      commit("setIsLoggedIn", value);
    },
  },
};

export default user;
