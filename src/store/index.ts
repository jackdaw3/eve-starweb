import { createStore } from 'vuex';
import loyalty, { LoyaltyState } from './modules/loyalty';
import market, { MarketState } from './modules/market';
import user, { UserState } from './modules/user';
import appraisal, { AppraisalState } from './modules/appraisal';

export interface RootState {
  loyalty: LoyaltyState
  Market: MarketState
  User: UserState
  Appraisal: AppraisalState
}

const store = createStore<RootState>({
  modules: {
    loyalty,
    market,
    user,
    appraisal,
  }
});

export default store;
