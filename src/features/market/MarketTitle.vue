<template>
    <div style="display: flex; align-items: center;margin-left: 1.5%;margin-top: -0.8%" v-if="item.visible">
        <el-image style="height: 48px; vertical-align: middle;cursor: pointer;" :src="getIcon()" fit="contain"
            @click="openItem()">
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
            </div>
        </el-image>
        &nbsp;
        &nbsp;
        <div>
            <div style="display: flex; align-items: center;">
                <h3 :style="{ color: '#CDD0D1', fontSize: '14px', textAlign: 'left' }">
                    <el-breadcrumb>
                        <el-breadcrumb-item v-for="(name) in item.parent" :key="name">
                            {{ name }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </h3>
            </div>
            <div style="display: flex">
                <h4 :style="{ color: '#CDD0D1', fontSize: '14px', textAlign: 'left', marginTop: '-5px' }">
                {{ item.itemName }}
            </h4>
            &thinsp;
            <el-button plain :icon="Refresh" style="width: 20px; border: none; padding: 0; margin-top: -12px" @click="refreshOrder()"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { BACKEND_SERVER, ICON_SERVER } from '~/constants';
import { Refresh } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import axios from 'axios';

const { t, locale } = useI18n();
const store = useStore();
const item = computed(() => store.state.market.item)

function openItem() {
    axios.get(`${BACKEND_SERVER}common/itemdetail`, {
        params: {
            itemId: item.value.itemId,
            lang: locale.value
        },
        timeout: 5000,
    })
        .then((response) => {
            let ItemName = response.data.ItemName;
            let Volume = response.data.Volume;
            Volume = Volume + "\u2009m³";
            let itemDetail = {
                ItemId: response.data.ItemId,
                ItemName: ItemName,
                Description: response.data.Description,
                Volume: Volume
            };
            store.commit('loyalty/setItemVisible', true);
            store.commit('loyalty/setItemDetail', itemDetail);
        })
        .catch(error => {
            let params = new URLSearchParams(error.config.params).toString()
            let fullUrl = error.config.url + (params ? `?${params}` : '');
            ElMessage({
                dangerouslyUseHTMLString: true,
                message: `${error.response.data}: ${fullUrl}`,
                type: "error",
                showClose: true,
                duration: 6000,
            });
        });
}

function refreshOrder() {
    store.commit('market/setRefresh', true);
}

function getIcon(): string {
    return `${ICON_SERVER}type/${item.value.itemId}_64.png`;
}
</script>
<style>
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    font-weight: bold;
}
</style>