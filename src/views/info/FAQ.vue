<template>
    <div id="index" :style="{ backgroundImage: 'url(background.png)' }">
        <Menu />
        <div style="width: 85%; text-align: left; margin-top: 3%;">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <h2>{{$t('faq.faq')}}</h2>
                    </div>
                </template>
                <h4 style="margin-top: 0;">{{$t('faq.q1')}}</h4>
                <p v-html="$t('faq.q1Content')"></p>
                <h4 style="margin-top: 0;">{{$t('faq.q2')}}</h4>
                <p v-html="$t('faq.q2Content')"></p>
                <h4 style="margin-top: 0;">{{$t('faq.q3')}}</h4>
                <p v-html="$t('faq.q3Content')"></p>
                <h4 style="margin-top: 0;">{{$t('faq.q4')}}</h4>
                <p v-html="$t('faq.q4Content')"></p>
                <h4 style="margin-top: 0;">{{$t('faq.q5')}}</h4>
                <p v-html="$t('faq.q5Content')"></p>
                <br>
                <p v-html="$t('faq.contact')"></p>
                <template #footer>
                    <div style="display: flex; align-items: center;">
                        <ArrowLeft style="width: 1em; height: 1em; margin-right: 8px" />
                        <el-button @click="goToHome" plain style="background-color: rgba(32, 33, 36, 0.2)">{{$t('faq.returnHome')}}</el-button>
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