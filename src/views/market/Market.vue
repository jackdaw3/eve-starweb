<template>
    <div>
        <el-config-provider :locale="elLocale">
            <Header :region-visible="true" header-type="market" />
            <el-button-group class="appraisal">
                <el-button plain v-if="false">我的订单</el-button>
                <el-button plain @click="goToAppraisal()">估价查询</el-button>
            </el-button-group>
            <div :style="{ marginTop: getMarginTop() + 'px', padding: '0 15px' }">
                <vue-splitter v-model:percent="limitedPercent" initial-percent="21">
                    <template #left-pane>
                        <MarketGroup />
                    </template>
                    <template #right-pane>
                        <MarketTitle />
                        <el-tabs type="card" style="margin-left: 1.5%">
                            <el-tab-pane :label="t('market.sellOrder')">
                                <MarketTable ref="sellMarketTable" :buy-order="false" />
                            </el-tab-pane>
                            <el-tab-pane :label="t('market.buyOrder')">
                                <MarketTable ref="buyMarketTable" :buy-order="true" />
                            </el-tab-pane>
                            <el-tab-pane :label="t('market.history')">
                                <History :style="{ height: stockHeight }" :region-id="regionId" :item-id="itemId"
                                    type="market" />
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </vue-splitter>
            </div>
            <Item />
        </el-config-provider>
    </div>
</template>

<script lang='ts' setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElConfigProvider } from 'element-plus';
import { elementPlusLocales } from '~/i18n/i18n';
import Header from '~/features/Header.vue';
import MarketGroup from '~/features/market/MarketGroup.vue';
import MarketTitle from '~/features/market/MarketTitle.vue';
import History from '~/features/History.vue';
import Item from '~/features/Item.vue';
import MarketTable from '~/features/market/MarketTable.vue';
import VueSplitter from '@rmp135/vue-splitter'
import { useStore } from 'vuex';
import router from '~/router';

type Language = 'de' | 'en' | 'es' | 'fr' | 'ja' | 'ko' | 'ru' | 'zh';
const { t, locale } = useI18n();
const store = useStore();
const elLocale = computed(() => {
    return elementPlusLocales[locale.value] || elementPlusLocales.en;
});
const percent = ref(21);
const limitedPercent = computed({
    get(): number {
        return Math.max(21, Math.min(40, percent.value));
    },
    set(newValue: number) {
        percent.value = newValue;
    }
});

const regionId = computed(() => {
    const rawRegionId = store.state.market.regionId;
    return rawRegionId === '-1' ? '10000002' : rawRegionId;
});
const itemId = computed(() => store.state.market.item.itemId.toString())
const refresh = computed(() => store.state.market.refresh)
const sellMarketTable = ref<InstanceType<typeof MarketTable> | null>(null);
const buyMarketTable = ref<InstanceType<typeof MarketTable> | null>(null);
const stockHeight = computed(() => {
    return `${document.documentElement.clientHeight * 0.777}px`;
});

onMounted(() => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
        locale.value = storedLanguage as Language;
    }
    document.title = "Starweb " + t('home.market');

    const splitter = document.querySelector('.vue-splitter .splitter') as HTMLElement;
    if (splitter) {
        splitter.addEventListener('mousemove', handleSplitterMouseMove);
    }
    splitter.style.height = `${window.screen.height * 0.774}px`;
});

watch(locale, () => {
    document.title = "Starweb " + t('home.market');
})

watch(refresh, async (newVal) => {
    if (newVal) {
        await Promise.all([
            sellMarketTable.value?.getOrders(),
            buyMarketTable.value?.getOrders(),
        ]);
        store.dispatch('market/setRefresh', false);
    }
});

function getMarginTop() {
    return document.documentElement.clientHeight * 0.07
}

function handleSplitterMouseMove(this: HTMLElement, event: MouseEvent) {
    const splitterRect = this.getBoundingClientRect();
    const yPercent = (event.clientY - splitterRect.top) / splitterRect.height;
    const lineHeight = 20;
    const lineTop = Math.max(0, yPercent * 100 - lineHeight / 2);

    this.style.setProperty('--line-top', `${lineTop}%`);
    this.style.setProperty('--line-height', `${lineHeight}%`);
}

function goToAppraisal() {
  window.open(router.resolve('/appraisal').href, '_blank');
}
</script>

<style>
.vue-splitter .splitter {
    background-color: rgba(76, 77, 79, 0.6);
    width: 2px !important;
    margin-left: -1px;
    position: relative;
    overflow: hidden;
}

.vue-splitter .splitter::before {
    content: '';
    position: absolute;
    top: var(--line-top);
    left: 0;
    width: 100%;
    height: var(--line-height);
    background: linear-gradient(to bottom, rgba(76, 77, 79, 0.6), #409EFF, rgba(76, 77, 79, 0.6));
    opacity: 0;
    transition: opacity 0.3s ease, height 0.3s ease;
}

.vue-splitter .splitter:hover::before {
    opacity: 1;
}

.appraisal {
    color: #CDD0D1;
    font-size: 13px;
    position: absolute;
    right: 15px;
    margin-top: -5px;
}
.appraisal .el-button {
    width: 30px;
    z-index: 1000;
}
</style>