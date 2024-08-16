<template>
    <div style="display: flex; justify-content: center; align-items: center;margin-top: 4%;">
        <el-image style="height: 48px; vertical-align: middle; margin-top: -22px;" :src="getIcon()" fit="contain" lazy>
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
            </div>
        </el-image>
        &nbsp;
        &nbsp;
        <div>
            <h3 :style="{ color: '#CDD0D1', fontSize: '14px', textAlign: 'center', marginTop: '-5px' }">
                {{ props.itemName }}
            </h3>

            <div style="display: flex; align-items: center; justify-content: center;">
                <h4 :style="{ color: '#CDD0D1', fontSize: '14px', textAlign: 'center', marginTop: '-5px' }">
                    {{ regionName }}
                </h4>
                &thinsp;
                <h4 :style="{ color: '#CDD0D1', fontSize: '14px', textAlign: 'center', marginTop: '-5px' }">
                    / {{ props.corporationName }}
                </h4>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { BACKEND_SERVER, ICON_SERVER } from '~/constants';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

const { locale } = useI18n();
const props = defineProps<{
    itemId: number,
    itemName: string,
    corporationName: string,
    regionId: string,
}>();
let regionName = ref('')
const hasFetchedRegion = ref(false);

onMounted(() => {
    getRegionName()
    hasFetchedRegion.value = true
})

watch(locale, () => {
    if (hasFetchedRegion.value) {
        getRegionName()
    }
})

function getIcon(): string {
    return `${ICON_SERVER}type/${props.itemId}_64.png`;
}

function getRegionName() {
    axios.get(`${BACKEND_SERVER}common/regiondetail`, {
        params: {
            regionId: props.regionId,
            lang: locale.value,
        },
    })
        .then(response => {
            regionName.value = response.data.RegionName;
        })
        .catch(error => {
            console.error(error);
        })
}

</script>