import { Module } from 'vuex';

export interface LoyaltyState {
    regionId: string,
    form: {
        materialPrice: string;
        productPrice: string;
        days: string;
        scope: string;
        tax: number;
    };
    tableForm: {
        calculator: string;
        layout: string;
        highlight: string;
    };
    corporationId: number;
    itemVisible: boolean;
    itemDetail: any[];
    calculatorVisible: boolean;
    selectedItems: any[];
}

const state: LoyaltyState = {
    regionId: "10000002",
    form: {
        materialPrice: "sell",
        productPrice: "buy",
        days: "7",
        scope: "0.05",
        tax: 0
    },
    tableForm: {
        calculator: "false",
        layout: "auto",
        highlight: "false",
    },
    corporationId: 0,
    itemVisible: false,
    itemDetail: [],
    calculatorVisible: false,
    selectedItems: [],
};

const loyalty: Module<LoyaltyState, unknown> = {
  namespaced: true,
  state,
  mutations: {
    setRegionId(state, value: string) {
        state.regionId = value;
    },
    setForm(state, value: LoyaltyState['form']) {
      state.form = value;
    },
    setTableForm(state, value: LoyaltyState['tableForm']) {
      state.tableForm = value;
    },
    setCorporationId(state, value: number) {
      state.corporationId = value;
    },
    setItemVisible(state, value: boolean) {
      state.itemVisible = value;
    },
    setItemDetail(state, value: any[]) {
      state.itemDetail = value;
    },
    setCalculatorVisible(state, value: boolean) {
      state.calculatorVisible = value;
    },
    setSelectedItems(state, value: any[]) {
      state.selectedItems = value;
    },
  },
  actions: {
    setRegionId({ commit }, value: string) {
        commit("setRegionId", value);
    },
    setForm({ commit }, value: LoyaltyState['form']) {
      commit("setForm", value);
    },
    setTableForm({ commit }, value: LoyaltyState['tableForm']) {
      commit("setTableForm", value);
    },
    setCorporationId({ commit }, value: string) {
      commit("setCorporationId", value);
    },
    setQuickBarSelected({ commit }, value: any[]) {
      commit("setQuickBarSelected", value);
    },
    setItemVisible({ commit }, value: boolean) {
      commit("setItemVisible", value);
    },
    setItemDetail({ commit }, value: any[]) {
      commit("setItemDetail", value);
    },
    setCalculatorVisible({ commit }, value: boolean) {
      commit("setCalculatorVisible", value);
    },
    setSelectedItems({ commit }, value: any[]) {
      commit("setSelectedItems", value);
    },
  },
};

export default loyalty;
