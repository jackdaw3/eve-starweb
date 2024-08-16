<template>
    <div id="index" :style="{ backgroundImage: 'url(background.png)' }">
        <Menu />
        <div style="width: 85%; text-align: left; margin-top: 3%;">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <h2>{{$t('privacy.privacy')}}</h2>
                    </div>
                </template>
                <h4 style="margin-top: 0;">{{$t('privacy.intro')}}</h4>
                <p v-html="$t('privacy.introContent')"></p>
                <h4>{{$t('privacy.local')}}</h4>
                <p v-html="$t('privacy.localContent')"></p>
                <h4>{{$t('privacy.auth')}}</h4>
                <p v-html="$t('privacy.authContent')"></p>
                <h4>{{$t('privacy.ga')}}</h4>
                <p v-html="$t('privacy.gaContent')"></p>
                <template #footer>
                    <div style="display: flex; align-items: center;">
                        <ArrowLeft style="width: 1em; height: 1em; margin-right: 8px" />
                        <el-button @click="goToHome" plain style="background-color: rgba(32, 33, 36, 0.2)">{{$t('privacy.returnHome')}}</el-button>
                    </div>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { onMounted } from "vue";
import { ArrowLeft } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n';
import Menu from '~/features/home/Menu.vue';
import router from "~/router";
useI18n();

onMounted(async () => {
    document.title = "EVE Starweb"
});

function goToHome() {
    router.push("/")
}
</script>

<style scoped>
#index {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

html.dark .el-card {
    --el-card-bg-color: rgba(32, 33, 36, 0.35);
    border: 0px;
}
</style>