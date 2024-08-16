<template>
  <div class="tableclass" :style="{ height: tableHeight + 'px' }">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2 :columns="columns" :data="sortedTableData" :width="width" :height="height" :row-height="27"
          v-loading="loading" :sort-by="sortState" @column-sort="onSort" :element-loading-spinner="SVG"
          element-loading-svg-view-box="-10, -10, 50, 50" :row-event-handlers="isLoggedIn ? {
            onContextmenu: (param: any) => {
              param.event.preventDefault();
              onRowContextMenu(param);
            }
          } : {}">
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </div>
</template>

<script lang="tsx" setup>
import axios from 'axios';
import { computed, h, onMounted, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { BACKEND_SERVER, SVG } from '~/constants';
import { ElButton, ElButtonGroup, ElCheckbox, ElCheckboxGroup, ElIcon, ElMessage, ElPopover, ElScrollbar, ElText, TableV2SortOrder } from 'element-plus'
import type { Column, SortBy } from 'element-plus'
import { Filter } from '@element-plus/icons-vue'
import { HeaderCellRendererParams } from 'element-plus/es/components/table-v2/src/types';
import ContextMenu from '@imengyu/vue3-context-menu'

const { t, locale } = useI18n();
const store = useStore();
const props = defineProps<{
  buyOrder: boolean
}>();

interface Order {
  RegionId: number;
  RegionName: string;
  VolumeRemain: number;
  Price: number;
  Security: number;
  LocationName: string;
  Expiration: string;
  LastUpdated: string;
}

let orderTableData = reactive<Order[]>([])
let sortedTableData = reactive<Order[]>([])
let loading = ref(false)

const regionId = computed(() => store.state.market.regionId)
const item = computed(() => store.state.market.item)
const priorityIds = [10000002, 10000043, 10000032, 10000042, 10000030];
const tableHeight = computed(() => {
  return Math.round(document.documentElement.clientHeight * 0.762);
});
const selectedRegions = ref<string[]>([]);
const popoverRef = ref();
const isLoggedIn = computed(() => store.state.user.isLoggedIn)

const columns = reactive<Column<any>[]>([
  {
    key: 'RegionName',
    dataKey: 'RegionName',
    title: t('market.regionName'),
    width: getColumnWidth(0.12),
  },
  {
    key: 'VolumeRemain',
    dataKey: 'VolumeRemain',
    title: t('market.volumeRemain'),
    width: getColumnWidth(0.1),
    cellRenderer: ({ rowData }) => (
      <ElText>{numberFormat(rowData.VolumeRemain)}</ElText>
    ),
  },
  {
    key: 'Price',
    dataKey: 'Price',
    title: t('market.price'),
    width: getColumnWidth(0.12),
    sortable: true,
    cellRenderer: ({ rowData }) => (
      <ElText>{numberFormat(rowData.Price)}</ElText>
    ),
  },
  {
    key: 'LocationName',
    dataKey: 'LocationName',
    title: t('market.locationName'),
    width: getColumnWidth(0.42),
    cellRenderer: ({ rowData }) => locationSecurityFormatter(rowData),
  },
  {
    key: 'Jump',
    dataKey: 'Jump',
    title: t('market.jump'),
    width: getColumnWidth(0.05),
    hidden: true,
  },
  {
    key: 'Expiration',
    dataKey: 'Expiration',
    title: t('market.expiration'),
    width: getColumnWidth(0.15),
  },
  {
    key: 'LastUpdated',
    dataKey: 'LastUpdated',
    title: t('market.lastUpdated'),
    width: getColumnWidth(0.09),
  },
]);

onMounted(async () => {
  if (item.value.itemId != 0) {
    getOrders();
  }
  if (props.buyOrder) {
    sortState.value.order = TableV2SortOrder.DESC
  }
  columns.find(column => column.key === 'Jump')!.hidden = !isLoggedIn.value;
});

const sortState = ref<SortBy>({
  key: 'Price',
  order: TableV2SortOrder.ASC,
})

const onSort = (sortBy: SortBy) => {
  sortedTableData = sortedTableData.reverse()
  sortState.value = sortBy
}

const regionFilters = computed(() => {
  const regionMap = new Map<string, number>();
  orderTableData.forEach(item => regionMap.set(item.RegionName, item.RegionId));

  const regions = new Set<string>();
  orderTableData.forEach(item => regions.add(item.RegionName));

  return Array.from(regions)
    .sort((a, b) => {
      const priorityA = getPriority(regionMap.get(a)!);
      const priorityB = getPriority(regionMap.get(b)!);
      return priorityA === priorityB ? a.localeCompare(b, locale.value) : priorityA - priorityB;
    })
    .map(region => ({ text: region, value: region }));
});

watch([item, regionId], () => {
  if (item.value.itemId != 0) {
    getOrders();
  }
  selectedRegions.value = [];
});

watch(locale, () => {
  if (item.value.itemId != 0) {
    getOrders();
  }
  selectedRegions.value = [];
  for (const column of columns) {
    const lowerCaseKey = column.key.charAt(0).toLowerCase() + column.key.slice(1);
    column.title = t(`market.${lowerCaseKey}`);
  }
})

watch(isLoggedIn, (newValue) => {
  columns.find(column => column.key === 'Jump')!.hidden = !newValue;
});

function numberFormat(cellValue: number) {
  if (cellValue % 1 !== 0) {
    return cellValue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  } else {
    return Math.floor(cellValue).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
}

async function getOrders() {
  try {
    loading.value = true
    const response = await axios.get(BACKEND_SERVER + "market/order", {
      params: {
        regionId: regionId.value,
        itemId: item.value.itemId,
        isBuyOrder: props.buyOrder,
        lang: locale.value,
      },
    });
    orderTableData.splice(0, orderTableData.length, ...response.data);
    sortedTableData.splice(0, sortedTableData.length, ...response.data);
    if (selectedRegions.value.length != 0) {
      onFilter()
    }
  } catch (error: any) {
    console.log(error)
    orderTableData.splice(0, orderTableData.length);
    sortedTableData.splice(0, sortedTableData.length);
  }
  finally {
    loading.value = false
  }
}

function getColumnWidth(radio: number) {
  return document.documentElement.clientWidth * radio
}

function locationSecurityFormatter(rowData: any) {
  const securityValue = rowData.Security.toFixed(1);
  const locationName = rowData.LocationName;

  let color = '';
  switch (true) {
    case securityValue <= 0:
      color = `#f00000`;
      break;
    case securityValue == 0.1:
      color = `#dc3201`;
      break;
    case securityValue == 0.2:
      color = `#eb4903`;
      break;
    case securityValue == 0.3:
      color = `#f66301`;
      break;
    case securityValue == 0.4:
      color = `#e58000`;
      break;
    case securityValue == 0.5:
      color = `#efef00`;
      break;
    case securityValue == 0.6:
      color = `#8fef2f`;
      break;
    case securityValue == 0.7:
      color = `#00f000`;
      break;
    case securityValue == 0.8:
      color = `#00ef47`;
      break;
    case securityValue == 0.9:
      color = `#48f0c0`;
      break;
    case securityValue == 1.0:
      color = `#2fefef`;
      break;
    default:
      color = `white`;
  }

  return h('div', { class: 'security-cell' }, [
    h('span', { style: `color: ${color}; margin-right: 8px;` }, securityValue),
    h('span', { style: `color: #cfd3dc` }, locationName)
  ]);
}

function getPriority(id: number): number {
  const index = priorityIds.indexOf(id);
  return index === -1 ? Infinity : index;
}

function onFilter() {
  const filteredData = selectedRegions.value.length === 0
    ? orderTableData
    : orderTableData.filter(item => selectedRegions.value.includes(item.RegionName));

  sortedTableData.length = 0;
  sortedTableData.push(...filteredData);
  if (popoverRef.value) {
    popoverRef.value.hide();
  }
}

function onReset() {
  selectedRegions.value = [];
  onFilter();
}

function onRowContextMenu(param: any) {
  ContextMenu.showContextMenu({
    customClass: "mac dark",
    x: param.event.x,
    y: param.event.y,
    items: [
      {
        label: t('user.setDestination'),
        divided: true,
        onClick: () => {
          autopilot(false, true, param.rowData.LocationId)
        }
      }, {
        label: t('user.addWaypoint'),
        onClick: () => {
          autopilot(false, false, param.rowData.LocationId)
        }
      },
    ],
  });
}

function autopilot(addToBeginning: boolean, clearOtherWaypoints: boolean, locationId: number) {
  axios.get(`${BACKEND_SERVER}user/autopilot`, {
    params: {
      addToBeginning: addToBeginning,
      clearOtherWaypoints: clearOtherWaypoints,
      locationId: locationId,
    },
  })
    .then(response => {
      if (response.status === 200) {
        ElMessage({
          message: t('user.autopilotSuccess'),
          type: 'success',
          plain: true,
          showClose: true,
          duration: 3000,
        })
      } else {
        ElMessage({
          message: t('user.autopilotFail'),
          type: 'warning',
          plain: true,
          showClose: true,
          duration: 3000,
        })
      }
    })
    .catch(error => {
      console.error(error);
      ElMessage({
        message: t('user.autopilotFail'),
        type: 'warning',
        plain: true,
        showClose: true,
        duration: 3000,
      })
    })
}

columns[0].headerCellRenderer = (params: HeaderCellRendererParams<Order>) => {
  return (
    <div class="flex items-center justify-center">
      <span>{params.column.title}</span>&thinsp;
      <ElPopover ref={popoverRef} trigger="click" placement="bottom-start"  {...{ width: 150 }}>
        {{
          default: () => (
            <div class="filter-wrapper">
              <ElScrollbar height="200px">
                <div class="checkbox-list">
                  <ElCheckboxGroup v-model={selectedRegions.value}>
                    {regionFilters.value.map(region => (
                      <ElCheckbox
                        key={region.value}
                        value={region.value}
                      >
                        {region.text}
                      </ElCheckbox>
                    ))}
                  </ElCheckboxGroup>
                </div>
              </ElScrollbar>
              <div class="button-group" >
                <ElButtonGroup>
                  <ElButton plain onClick={onFilter}>{t('market.confirm')}</ElButton>
                  <ElButton plain onClick={onReset}>{t('market.reset')}</ElButton>
                </ElButtonGroup>
              </div>
            </div>
          ),
          reference: () => (
            <ElIcon class="cursor-pointer">
              <Filter />
            </ElIcon>
          ),
        }}
      </ElPopover>
    </div>
  );
};

defineExpose({
  getOrders,
});
</script>
<style>
.el-virtual-scrollbar.el-vl__horizontal .el-scrollbar__thumb {
  display: none;
}

.el-table-v2__header-cell {
  color: #CDD0D1;
}

.el-table-v2__cell-text {
  color: #cfd3dc;
}

.el-text {
  color: #cfd3dc;
}

.filter-wrapper .checkbox-list {
  max-height: 200px;
}

.filter-wrapper .checkbox-list .el-checkbox {
  margin-bottom: -5px !important;
}

.button-group {
  border-top: var(--el-border);
  height: 40px;
  margin: 12px -12px -13px;
  display: flex;
  justify-content: center;
}

.button-group .el-button {
  width: 20px;
  max-width: 20px;
  background-color: transparent;
  padding: 8px 42.5px;
  border: none;
}

.button-group .el-button:first-child {
  border-right: var(--el-border);
}
</style>
