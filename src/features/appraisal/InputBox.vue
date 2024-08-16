<template>
    <div>
        <div style="display: flex; justify-content: space-between;align-items: center;">
            <el-button :icon="CopyDocument" plain style="width: 20px; border: none; padding: 0;" @click="paste"/>
         
            <el-select v-model="regionId" placeholder="Select" style="width: 45%" size="small">
                    <el-option v-for="region in regionData" :key="region.RegionName" :label="region.RegionName"
                        :value="region.RegionId" />
            </el-select>
  
            <el-button :icon="Delete" plain style="width: 20px; border: none; padding: 0;" @click="clear"/>
        </div>
        <el-input v-model="items" style="width: 100%;margin-top: 6px;" type="textarea"
            :placeholder="$t('appraisal.placeholder')"
            :autosize="{ minRows: 15, maxRows: 35 }" />
        <div style="display: flex; justify-content: flex-end;margin-top: 10px;">
            <el-button plain @click="submit">{{ $t('appraisal.submit') }}</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { CopyDocument, Delete } from '@element-plus/icons-vue'
import axios from 'axios';
import { BACKEND_SERVER } from '~/constants';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
const store = useStore();
interface Region {
    RegionId: number;
    RegionName: string;
}

const { t, locale } = useI18n()
const items = ref('')
const regionId = ref(10000002)
const priorityIds = [10000002, 10000043, 10000032, 10000042, 10000030];
const hasFetchedRegions = ref(false);
let regionData = reactive<Region[]>([])

onMounted(async () => {
    await getRegions()
})

watch(locale, async () => {
    if (hasFetchedRegions.value) {
        await getRegions()
    }
})

watch(regionId, (newRegionId) => {
  store.commit('appraisal/setRegionId', newRegionId);
});

watch(items, (newItems) => {
    store.commit('appraisal/setItems', newItems);
});

async function getRegions() {
    try {
        const response = await axios.get(BACKEND_SERVER + "common/region", {
            params: {
                lang: locale.value,
            },
        });
        sortByPriority(response.data)
        regionData.splice(0, regionData.length, ...response.data);
        hasFetchedRegions.value = true;
    } catch (error) {
        console.error(error);
    }
}

function sortByPriority(data: Region[]): Region[] {
    return data.sort((a, b) => {
        const priorityIndexA = priorityIds.findIndex(id => id === a.RegionId);
        const priorityIndexB = priorityIds.findIndex(id => id === b.RegionId);

        if (priorityIndexA !== -1 && priorityIndexB === -1) {
            return -1;
        } else if (priorityIndexA === -1 && priorityIndexB !== -1) {
            return 1;
        } else if (priorityIndexA !== -1 && priorityIndexB !== -1) {
            return priorityIndexA - priorityIndexB;
        } else {
            return a.RegionName.localeCompare(b.RegionName, locale.value);
        }
    });
}

async function paste() {
  try {
    const text = await navigator.clipboard.readText();
    items.value = text;
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}

async function clear() {
    items.value = "";
    store.commit('appraisal/setItems', "");
}

function submit(){
    store.commit('appraisal/setIsSubmitted', true);
} 

</script>
<style>
.el-textarea__placeholder {
    white-space: pre-line;
}
</style>