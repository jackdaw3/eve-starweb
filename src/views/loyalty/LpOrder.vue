<template>
  <div>
    <el-config-provider :locale="elLocale">
      <Header :region-visible="false" header-type="loyalty"/>
      <OrderTitle :item-id="item.ItemId" :item-name="item.ItemName" :corporation-name="corporationName"
        :region-id="routeData.regionId" />
      <el-backtop :right="50" :bottom="50" />
      <div style="margin-top: -38px; padding: 0 15px;">
        <el-tabs type="card">
          <el-tab-pane :label="t('order.buyOrder')">
            <el-row :gutter="35">
              <el-col :span="12">
                <OrderTable :order-data="params" :buy-order="true"></OrderTable>
              </el-col>
              <el-col :span="12">
                <StatisTable :statis-data="params" :buy-order="true"></StatisTable>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="t('order.sellOrder')" lazy>
            <el-row :gutter="35">
              <el-col :span="12">
                <OrderTable :order-data="params" :buy-order="false"></OrderTable>
              </el-col>
              <el-col :span="12">
                <StatisTable :statis-data="params" :buy-order="false"></StatisTable>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="t('order.history')" lazy>
            <History :style="{ height: stockHeight }" :item-id="params.offerId" :region-id="params.regionId" type="lp"/>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-backtop :right="50" :bottom="50" />
    </el-config-provider>
  </div>
</template>

<script lang='ts' setup>
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { elementPlusLocales } from '~/i18n/i18n';
import { ElConfigProvider } from 'element-plus';
import { BACKEND_SERVER, ICON_SERVER } from '~/constants';
import axios from 'axios';

import Header from '~/features/Header.vue';
import OrderTitle from '~/features/loyalty/OrderTitle.vue';
import OrderTable from '~/features/loyalty/OrderTable.vue';
import StatisTable from '~/features/loyalty/StatisTable.vue';
import History from '~/features/History.vue';

const { t, locale } = useI18n();
const elLocale = computed(() => { return elementPlusLocales[locale.value] || elementPlusLocales.en; });
const route = useRoute();
const store = useStore();

const routeData = ref({
  regionId: route.params.regionId as string,
  corporationId: route.params.corporationId,
  offerId: route.params.offerId,
  materialPrice: route.query.material_price,
  weightedPrice: route.query.weighted_price,
  tax: route.query.tax
});

type Language = 'de' | 'en' | 'es' | 'fr' | 'ja' | 'ko' |'ru' | 'zh';

interface Item {
  ItemId: number
  ItemName: string
}

interface TableForm {
  highlight: string;
  layout: string;
}

const item = reactive<Item>({
  ItemId: 0,
  ItemName: ""
})

const corporationName = ref('')
const params = ({
  regionId: "",
  offerId: "",
  materialPrice: "",
  weightedPrice: "",
  tax: "",
})
const hasFetchedData = ref(false);

let tableForm = reactive<TableForm>({
  highlight: "false",
  layout: "auto",
});

onBeforeMount(() => {
  const storedLanguage = localStorage.getItem('language')
  if (storedLanguage) {
    locale.value = storedLanguage as Language;
  }
  const storedTableForm = localStorage.getItem('tableForm');
  if (storedTableForm) {
    tableForm = reactive<TableForm>(JSON.parse(storedTableForm));
    store.commit('loyalty/setTableForm', { ...tableForm });
  }
  setParams()
})

onMounted(() => {
  getItem()
  getCorporationName()
  hasFetchedData.value = true
});

watch(locale, () => {
  if (hasFetchedData.value) {
    getItem()
    getCorporationName()
    document.title = item.ItemName;
  }
})

const stockHeight = computed(() => {
  return `${window.screen.height * 0.688}px`;
});

function getItem() {
  axios.get(`${BACKEND_SERVER}lp/itembyoffer`, {
    params: {
      offerId: routeData.value.offerId,
      lang: locale.value,
    },
  })
    .then(response => {
      item.ItemId = response.data.ItemId
      item.ItemName = response.data.ItemName
      document.title = item.ItemName;
    })
    .catch(error => {
      console.error(error);
    })
}

function getCorporationName() {
  axios.get(`${BACKEND_SERVER}lp/corporation`, {
    params: {
      corporationId: routeData.value.corporationId,
      lang: locale.value,
    },
  })
    .then(response => {
      corporationName.value = response.data.CorporationName;
    })
    .catch(error => {
      console.error(error);
    })
}

function setParams() {
  params.regionId = routeData.value.regionId as string
  params.offerId = routeData.value.offerId as string
  params.materialPrice = routeData.value.materialPrice as string
  params.weightedPrice = routeData.value.weightedPrice as string
  params.tax = routeData.value.tax as string
}

</script>
<style></style>