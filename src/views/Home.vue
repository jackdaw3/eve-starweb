<template>
    <div id="index" :style="{ backgroundImage: 'url(background.png)' }">
        <Menu/>
        <div class="content">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center mx-auto my-auto">
                    <h1 class="text-white">
                        EVE Starweb <span class="text-white" id="typed"></span>
                    </h1>
                    <h3 class="text-muted">
                        {{ t('home.desc') }}
                    </h3>
                    <div class="d-flex justify-content-center" style="width: 20%; margin: 2% auto 0;">
                        <el-row :gutter="10" class="button-grid">
                            <el-col :span="8">
                                <el-button size="large" @click="goToMarket" plain>{{ t('home.market') }}</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button size="large" @click="goToLpStore" plain>{{ t('home.loyalty') }}</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button size="large" @click="goToWiki" plain>{{ t('home.wiki') }}</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from 'vue-i18n';
import Typed from "typed.js";
import Menu from '~/features/home/Menu.vue';
import Footer from '~/features/home/Footer.vue';
import router from "~/router";
const { t, locale } = useI18n();
let typedStrings = computed(() => [
    t('home.market'),
    t('home.loyalty'),
    t('home.wiki'),
]);
let typedInstance: Typed | null = null;

onMounted(async () => {
    document.title = "EVE Starweb"
    createTypedInstance()
});

watch(locale, (newLocale) => {
    if (typedInstance) {
        typedInstance.destroy();

    }
    createTypedInstance();

})

function goToLpStore() {
    router.push('/lpstore');
}

function goToMarket() {
    router.push('/market');
}

function goToWiki() {
    const wikiUrl = "https://eve-starweb-wiki.gitbook.io";
    window.location.href = wikiUrl;
}

function createTypedInstance() {
    typedInstance = new Typed("#typed", {
        strings: typedStrings.value,
        typeSpeed: 90,
        backSpeed: 90,
        backDelay: 200,
        loop: true,
    });
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

.content {
    margin-top: -3%;
}

h1 {
    font-size: calc(1.5em + 1vw);
}

h3 {
    width: 45%;
    word-wrap: break-word;
    margin: 0 auto;
}

.button-grid .el-button {
    background-color: rgba(0, 0, 0, 0.2) !important;
    border-color: transparent !important;
    width: 100%;
    box-sizing: border-box;
}

.button-grid .el-button:hover {
    border-color: #409EFF !important;
}
</style>