<template>
  <div class="AppraisalTable">
    <el-table :data="appraisalTableData" :cell-style="tableFormat" style="width: 100%" v-loading="loading"
      :element-loading-spinner="SVG" element-loading-svg-view-box="-10, -10, 50, 50" :row-class-name="handelRowDetail"
      :summary-method="getSummaries" show-summary>
      <el-table-column prop="ItemName" :label="$t('appraisal.name')" min-width="31%">
        <template #default="scope">
          <el-image style="height: 22px; vertical-align: middle" :src="getIcon(scope.row.ItemId)" fit="contain" lazy>
            <template #placeholder>
              <div style="height: 22px; background-color: transparent;"></div>
            </template>
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
          <span>{{ scope.row.ItemName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Quantity" :label="$t('appraisal.quantity')" min-width="8%" :formatter="numberFormat"
        sortable />
      <el-table-column prop="Volume" :label="$t('appraisal.volume')" min-width="8%" :formatter="numberFormat"
        sortable />
      <el-table-column :label="$t('appraisal.sell')">
        <el-table-column prop="SellPrice" :label="$t('appraisal.price')" min-width="12%" :formatter="numberFormat"
          sortable />
        <el-table-column prop="SellTotal" :label="$t('appraisal.total')" min-width="13%" :formatter="numberFormat"
          sortable />
      </el-table-column>
      <el-table-column :label="$t('appraisal.buy')">
        <el-table-column prop="BuyPrice" :label="$t('appraisal.price')" min-width="12%" :formatter="numberFormat"
          sortable />
        <el-table-column prop="BuyTotal" :label="$t('appraisal.total')" min-width="13%" :formatter="numberFormat"
          sortable />
      </el-table-column>
      <el-table-column align="right" min-width="3%">
        <template #header>
          <div style="display: flex; justify-content: center; align-items: center;">
            <el-button :icon="DocumentCopy" plain style="width: 20px; border: none; padding: 0; flex-shrink: 0;"
              @click="copyToClipboard()" />
          </div>
        </template>
        <template #default="scope">
          <div style="display: flex; justify-content: center; align-items: center;">
            <el-button v-if='scope.row.ErrorMessage != ""' :icon="Warning" plain
              style="width: 20px; border: none; padding: 0; background-color: transparent; flex-shrink: 0;"
              @click="errorMessage(scope.row.ErrorMessage)" />
          </div>
        </template>
      </el-table-column>
      <template #empty>
        <div class="custom-empty">
          <el-empty :image-size="105" />
        </div>
      </template>
    </el-table>
    <el-divider />
    <div style="width: 60%; margin: 10px auto 0;">
      <el-row>
        <el-col :span="8">
          <el-statistic :title="$t('appraisal.volumeTotal')" :value="totalVolume" suffix="&thinsp;m&sup3;" />
        </el-col>
        <el-col :span="8">
          <el-statistic :title="$t('appraisal.sellTotal')" :value="totalSellTotal" />
        </el-col>
        <el-col :span="8">
          <el-statistic :title="$t('appraisal.buyTotal')" :value="totalBuyTotal" />
        </el-col>
      </el-row>
    </div>
    <el-divider />
  </div>
</template>

<script lang="ts" setup>
import { VNode, computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { ElMessage, ElTable, ElTableColumn, TableColumnCtx } from 'element-plus';
import { Warning, DocumentCopy, Picture as IconPicture } from '@element-plus/icons-vue'
import axios from 'axios';
import { BACKEND_SERVER, ICON_SERVER, SVG } from '~/constants';

const { t, locale } = useI18n();
const store = useStore();

interface Item {
  name: string;
  quantity: number;
}

interface Appraisal {
  ItemId: number
  ItemName: string
  Quantity: number
  Volume: number
  SellPrice: number
  SellTotal: number
  BuyPrice: number
  BuyTotal: number
  Error: boolean
  ErrorMessage: string
}

interface SummaryMethodProps<T = Appraisal> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

const regionId = computed(() => store.state.appraisal.regionId)
const items = computed(() => store.state.appraisal.items)
const isSubmitted = computed(() => store.state.appraisal.isSubmitted)
const appraisalTableData = ref<Appraisal[]>([])
const totalVolume = ref(0);
const totalSellTotal = ref(0);
const totalBuyTotal = ref(0);
let loading = ref(false)

watch(isSubmitted, (newVal) => {
  if (newVal) {
    getAppraisals(items.value)
  }
});

function numberFormat(row: any, column: any, cellValue: number) {
  if (cellValue % 1 !== 0) {
    return cellValue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  } else {
    return Math.floor(cellValue).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
}

function tableFormat() {
  return {
    padding: '0',
    fontSize: '14px',
  };
}

function handelRowDetail({ row, rowIndex }: { row: Appraisal; rowIndex: number }): string {
  let value = '';
  if (row.Error === true) {
    value = "warning-row";
  }
  return value.trim();
}

function getSummaries(param: SummaryMethodProps) {
  const { columns, data } = param;
  const sums: (string | VNode)[] = [];

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = t('appraisal.sum');
    } else if (index === 1 || index === 3 || index === 5 || index === 7) {
      sums[index] = '';
    } else {
      const values = data.map((item) => Number(item[column.property]));
      if (!values.every((value) => Number.isNaN(value))) {
        const sum = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);

        if (index === 2) { 
          sums[index] = `${Math.round(sum).toLocaleString()} m³`;
        } else { 
          const units = ['', 'K', 'M', 'B', 'T'];
          const magnitude = Math.floor(Math.log10(sum) / 3);
          const scaledValue = sum / Math.pow(1000, magnitude);
          sums[index] = `${scaledValue.toFixed(2)} ${units[magnitude]}`; 
        }
      } else {
        sums[index] = '';
      }
    }
  });

  return sums;
}
function getIcon(id: string): string {
  return `${ICON_SERVER}type/${id}_32.png`;
}

async function getAppraisals(inputString: string) {
  if (!inputString || inputString == "") {
    ElMessage({
      message: t('appraisal.empty'),
      type: 'warning',
      showClose: true,
      duration: 3000,
    });
    store.commit('appraisal/setIsSubmitted', false);
    return
  }
  const items = parseItems(inputString);
  if (!items) {
    store.commit('appraisal/setIsSubmitted', false);
    appraisalTableData.value = [];
    return
  }
  try {
    loading.value = true
    const response = await axios.post(`${BACKEND_SERVER}appraisal`, { items }, {
      params: {
        "regionId": regionId.value,
        "lang": locale.value,
      }
    });
    appraisalTableData.value = response.data
    calculateTotals(appraisalTableData.value)
  } catch (error) {
    console.error('Error sending items:', error);
    ElMessage({
      message: (error as Error).toString(),
      type: 'warning',
      showClose: true,
      duration: 3000,
    });
  } finally {
    store.commit('appraisal/setIsSubmitted', false);
    loading.value = false
  }
}

function parseItems(inputString: string) {
  try {
    const lines = inputString.trim().split('\n');
    const items: Item[] = [];
    for (const line of lines) {
      const parts = line.split('\t'); 
      const itemName = parts[0].replace(/\*/g, '').trim();
      const quantityStr = parts[1]?.trim().replace(/,/g, '') || ''; 
      const quantity = parseInt(quantityStr);
      if (isNaN(quantity)) {
        throw new Error(t('appraisal.invalid'));
      }
      items.push({ name: itemName, quantity });
    }
    return items;
  } catch (error) {
    console.error(error)
    ElMessage({
      message: t('appraisal.invalid'),
      type: 'warning',
      showClose: true,
      duration: 3000,
    });
  }
}

function calculateTotals(appraisals: Appraisal[]) {
  totalVolume.value = 0
  totalSellTotal.value = 0
  totalBuyTotal.value = 0
  for (const appraisal of appraisals) {
    totalVolume.value += appraisal.Volume;
    totalSellTotal.value += appraisal.SellTotal;
    totalBuyTotal.value += appraisal.BuyTotal;
  }
}

function errorMessage(errMessage: string) {
  var message = errMessage;
  message = message
    .replace(/failed to get buy price for <b>(.*?)<\/b>/g, t('table.err.productBuy'))
    .replace(/failed to get sell price for <b>(.*?)<\/b>/g, t('table.err.productSell'))
    .replace(/failed to get buy price for production material <b>(.*?)<\/b>/g, t('table.err.materialBuy'))
    .replace(/failed to get sell price for production material <b>(.*?)<\/b>/g, t('table.err.materialSell'))
    .replace(/failed to get buy price for requirement <b>(.*?)<\/b>/g, t('table.err.requirementBuy'))
    .replace(/failed to get sell price for requirement <b>(.*?)<\/b>/g, t('table.err.requirementSell'))
    .replace(/no buy order found in the market/g, t('table.err.buyOrder'))
    .replace(/no sell order found in the market/g, t('table.err.sellOrder'))
    .replace(/no order found in the market/g, t('table.err.order'))
    .replace(/failed to get buy price/g, t('table.err.buyPrice'))
    .replace(/failed to get sell price/g, t('table.err.sellPrice'));
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: message,
    type: "warning",
    showClose: true,
    duration: 6000,
  });
}

function copyToClipboard(): void {
  const formattedData = appraisalTableData.value.map(appraisal => {
    return [
      appraisal.ItemName,
      appraisal.Quantity,
      appraisal.Volume,
      appraisal.SellPrice,
      appraisal.SellTotal,
      appraisal.BuyPrice,
      appraisal.BuyTotal
    ].join('\t');
  }).join('\n');

  navigator.clipboard.writeText(formattedData).then(
    () => {
      ElMessage({
        message: t('appraisal.copySuccess'),
        type: "success",
        duration: 2000,
      });
    },
    (error) => {
      ElMessage({
        message: t('appraisal.copyFail'),
        type: "error",
        duration: 2000,
      });
      console.error(error);
    }
  );
}
</script>

<style scoped></style>