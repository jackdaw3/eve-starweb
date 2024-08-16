<template>
  <div>
    <el-config-provider :locale="elLocale">
      <Header :region-visible="true" header-type="loyalty"/>
      <div>
        <div :style="{ marginTop: getMarginTop() + 'px', marginLeft: '15px'}">
          <Config @exportRequest="handleExportExcelRequest" />
        </div>
        <Table class="table" ref="tableRef" />
        <Item />
        <Calculator />
      </div>
      <el-backtop :right="50" :bottom="50" />
    </el-config-provider>
  </div>
</template>

<script lang='ts' setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElConfigProvider } from 'element-plus';
import { elementPlusLocales } from '~/i18n/i18n';

import Header from '~/features/Header.vue';
import Config from '~/features/loyalty/Config.vue';
import Table from '~/features/loyalty/Table.vue';
import Calculator from '~/features/loyalty/Calculator.vue';
import Item from '~/features/Item.vue';

const { t,locale } = useI18n();
const elLocale = computed(() => { 
  return elementPlusLocales[locale.value] || elementPlusLocales.en; 
});
const tableRef = ref<any>()

onMounted(() => {
  document.title = "Starweb " + t('home.loyalty');
})

watch(locale, () => {
  document.title = "Starweb " + t('home.loyalty');
})

function handleExportExcelRequest(corporationName: string) {
  if (tableRef.value) {
    tableRef.value.exportExcel(corporationName)
  }
}

function getMarginTop() {
  return document.documentElement.clientHeight * 0.07
}
</script>

<style scoped>
.config {
  margin-left: 10px;
}

.table {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
