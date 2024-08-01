<template>
    <div id="index" :style="{ backgroundImage: 'url(background.png)' }">
        <div class="top-menu">
            <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
                <el-menu-item index="1" @click="goToMarket">{{ t('home.market') }}</el-menu-item>
                <el-menu-item index="2" @click="goToLpStore">{{ t('home.loyalty') }}</el-menu-item>
                <el-menu-item index="3" @click="goToWiki">{{ t('home.wiki') }}</el-menu-item>
                <el-menu-item index="4" style="margin-right: -20px;">
                    <el-dropdown @command="langChange">
                        <span class="el-dropdown-link">
                            {{ languageLabel }}
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="de">Deutsch</el-dropdown-item>
                                <el-dropdown-item command="en">English</el-dropdown-item>
                                <el-dropdown-item command="es">Español</el-dropdown-item>
                                <el-dropdown-item command="fr">Français</el-dropdown-item>
                                <el-dropdown-item command="ja">日本語</el-dropdown-item>
                                <el-dropdown-item command="ko">한국어</el-dropdown-item>
                                <el-dropdown-item command="ru">Pусский</el-dropdown-item>
                                <el-dropdown-item command="zh">中文</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-menu-item>

                <el-menu-item index="5" style="margin-right: -25px;">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{ t('home.server') }}:&nbsp;{{ numbers }}
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="goToHome">{{ $t('header.server.Tranquility')
                                    }}</el-dropdown-item>
                                <el-dropdown-item @click="goToSerenity">{{ $t('header.server.Serenity')
                                    }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-menu-item>

                <el-menu-item index="6">
                    <img style="width: 18px; vertical-align: middle;" :src="iconSrc" @click="goToGithub" />
                </el-menu-item>
            </el-menu>
        </div>
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

                    <footer class="footer">
                        <h6 class="text-muted" style="opacity: 0.6; font-style: italic;">
                            EVE Online and the EVE logo are the registered trademarks of CCP
                            hf. All rights are reserved worldwide. All other trademarks are the property of their
                            respective
                            owners. EVE Online, the EVE logo, EVE and all associated logos and designs are the
                            intellectual
                            property of CCP hf. All artwork, screenshots, characters, vehicles, storylines, world facts
                            or
                            other recognizable features of the intellectual property relating to these trademarks are
                            likewise the intellectual property of CCP hf.
                        </h6>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
import { computed, onMounted, ref, watch } from "vue";
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import Typed from "typed.js";
import axios from "axios";
import { BACKEND_SERVER } from "~/constants";

type Language = 'de' | 'en' | 'es' | 'fr' | 'ja' | 'ko' | 'ru' | 'zh';
const router = useRouter();
const { t, locale } = useI18n();
const languageLabel = ref('English')
const numbers = ref(0)
const iconSrc = computed(() => {
    return '/github-dark.png';
})
let typedStrings = computed(() => [
    t('home.market'),
    t('home.loyalty'),
    t('home.wiki'),
]);
let typedInstance: Typed | null = null;

onMounted(async () => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
        locale.value = storedLanguage as Language;
    }
    languageLabel.value = langLabel(locale.value as Language);
    document.title = "EVE Starweb"
    createTypedInstance()
    await getServerStatus()
});

watch(locale, (newLocale) => {
    languageLabel.value = langLabel(newLocale as Language);
    localStorage.setItem('language', newLocale);

    if (typedInstance) {
        typedInstance.destroy();

    }
    createTypedInstance();

})

function langChange(lang: Language) {
    locale.value = lang;
}

function langLabel(lang: Language): string {
    switch (lang) {
        case 'de':
            return 'Deutsch';
        case 'en':
            return 'English';
        case 'es':
            return 'Español';
        case 'fr':
            return 'Français';
        case 'ja':
            return '日本語';
        case 'ko':
            return '한국어';
        case 'ru':
            return 'Pусский';
        case 'zh':
            return '中文';
    }
}

function createTypedInstance() {
    typedInstance = new Typed("#typed", {
        strings: typedStrings.value,
        typeSpeed: 90,
        backSpeed: 90,
        backDelay: 200,
        startDelay: 500,
        loop: true,
    });
}

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

function goToHome() {
    router.push('/');
}

function goToSerenity() {
    const wikiUrl = "https://eve.starweb.cc/serenity";
    window.location.href = wikiUrl;
}

function goToGithub() {
    window.open("https://github.com/jackjaw/eve-lp", '_blank')
}

async function getServerStatus() {
    try {
        const response = await axios.get(BACKEND_SERVER + "common/serverstatus");
        numbers.value = response.data.Number;
    } catch (error) {
        console.error(error);
    }
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

.footer {
    position: fixed;
    bottom: 0;
    left: 4%;
    width: 92%;
    padding: 1rem;
    text-align: left;
}

.top-menu {
    position: fixed;
    top: 5%;
    right: 5%;
    z-index: 1000;
}

.el-dropdown-menu {
    background-color: #1e262e;
}
.el-dropdown-link{
    font-size: 14px;
}
</style>