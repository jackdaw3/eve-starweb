<template>
    <div>
        <el-config-provider :locale="elLocale">
            <Header :region-visible="false" header-type="appraisal" /> 
            <div :style="{ marginTop: getMarginTop() + 'px', padding: '0 15px' }">
                <vue-splitter v-model:percent="limitedPercent" initial-percent="30">
                    <template #left-pane>
                        <InputBox style="margin-right: 3.5%"/>
                    </template>
                    <template #right-pane>
                        <AppraisalTable style="margin-left: 1.5%"/>
                    </template>
                </vue-splitter>

            </div>
        </el-config-provider>
    </div>
</template>

<script lang='ts' setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElConfigProvider } from 'element-plus';
import { elementPlusLocales } from '~/i18n/i18n';
import { useStore } from 'vuex';
import VueSplitter from '@rmp135/vue-splitter'

import Header from '~/features/Header.vue';
import InputBox from '~/features/appraisal/InputBox.vue';
import AppraisalTable from '~/features/appraisal/AppraisalTable.vue';



type Language = 'de' | 'en' | 'es' | 'fr' | 'ja' | 'ko' | 'ru' | 'zh';
const { t, locale } = useI18n();
const store = useStore();
const elLocale = computed(() => {
    return elementPlusLocales[locale.value] || elementPlusLocales.en;
});
const percent = ref(30);
const limitedPercent = computed({
    get(): number {
        return Math.max(30, Math.min(45, percent.value));
    },
    set(newValue: number) {
        percent.value = newValue;
    }
});

onMounted(() => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
        locale.value = storedLanguage as Language;
    }
    document.title = "Starweb " + t('home.appraisal');

    const splitter = document.querySelector('.vue-splitter .splitter') as HTMLElement;
    if (splitter) {
        splitter.addEventListener('mousemove', handleSplitterMouseMove);
    }
    splitter.style.height = `${window.screen.height * 0.762}px`;
});

watch(locale, () => {
    document.title = "Starweb " + t('home.appraisal');
})

function handleSplitterMouseMove(this: HTMLElement, event: MouseEvent) {
    const splitterRect = this.getBoundingClientRect();
    const yPercent = (event.clientY - splitterRect.top) / splitterRect.height;
    const lineHeight = 20;
    const lineTop = Math.max(0, yPercent * 100 - lineHeight / 2);

    this.style.setProperty('--line-top', `${lineTop}%`);
    this.style.setProperty('--line-height', `${lineHeight}%`);
}

function getMarginTop() {
    return document.documentElement.clientHeight * 0.085
}


</script>

<style scoped>
</style>