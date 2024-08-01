import { createStore } from 'vuex';
import loyalty, { LoyaltyState } from './modules/loyalty';
import market, { MarketState } from './modules/market';

export interface RootState {
  loyalty: LoyaltyState
  moduleB: MarketState;
}

const store = createStore<RootState>({
  modules: {
    loyalty,
    market,
  }
});

export default store;
