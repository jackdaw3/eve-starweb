import { Module } from 'vuex';

export interface MarketState {
  regionId: string,
  item: {
    itemId: number
    itemName: string
    parent: string[]
    visible: boolean
  }
  refresh: boolean
}

const state: MarketState = {
  regionId: "-1",
  item: {
    itemId: 0,
    itemName: "",
    parent: [],
    visible: false,
  },
  refresh: false,
};

const market: Module<MarketState, unknown> = {
  namespaced: true,
  state,
  mutations: {
    setRegionId(state, value: string) {
      state.regionId = value;
    },
    setItem(state, value: MarketState['item']) {
      state.item = value;
    },
    setRefresh(state, value: boolean) {
      state.refresh = value;
    }
  },
  actions: {
    setRegionId({ commit }, value: string) {
      commit("setRegionId", value);
    },
    setItem({ commit }, value: MarketState['item']) {
      commit('setItem', value);
    },
    setRefresh({ commit },  value: boolean) {
      commit('setRefresh', value);
    }
  },
};

export default market;
