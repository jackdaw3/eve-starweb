import { Module } from 'vuex';

export interface AppraisalState {
  isSubmitted: boolean;
  items: string,
  regionId: string,
}

const state: AppraisalState = {
  isSubmitted: false,
  items: `Tritanium	50000
  Pyerite	10000
  Mexallon	5000
  Isogen	1000
  Nocxium	100
  Zydrine	50
  Megacyte	10`,
  regionId: "10000002",
};

const appraisal: Module<AppraisalState, unknown> = {
  namespaced: true,
  state,
  mutations: {
    setIsSubmitted(state, value: boolean) {
      state.isSubmitted = value;
    },
    setItems(state, value: string) {
      state.items = value;
    },
    setRegionId(state, value: string) {
      state.regionId = value;
    },
  },
  actions: {
    setIsSubmitted({ commit }, value: boolean) {
      commit("setIsSubmitted", value);
    },
    setItems({ commit }, value: string) {
      commit("setItems", value);
    },
    setRegionId({ commit }, value: string) {
      commit("setRegionId", value);
    },
  },
};

export default appraisal;
