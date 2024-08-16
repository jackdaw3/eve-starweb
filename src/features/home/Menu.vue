<template>
    <div class="top-menu">
        <el-menu style="margin-right: -20px;" mode="horizontal" :ellipsis="false">
            <el-menu-item index="1" @click="goToMarket">{{ t('home.market') }}</el-menu-item>
            <el-menu-item index="2" @click="goToLpStore">{{ t('home.loyalty') }}</el-menu-item>
            <el-menu-item index="3" @click="goToWiki">{{ t('home.wiki') }}</el-menu-item>
            <el-menu-item index="4" style="margin-right: -20px;">
                <el-dropdown @command="langChange" >
                    <span class="el-dropdown-link">
                        {{ languageLabel }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu aria-modal="true">
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

            <el-menu-item index="6" style="margin-right: -10px;">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-avatar :size="24" :src="userInfo.isLoggedIn ? userInfo.userAvatarUrl : userSrc"/>
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu v-show="!userInfo.isLoggedIn">
                            <el-dropdown-item  @click="login">{{ $t('user.login') }}</el-dropdown-item>
                        </el-dropdown-menu>
                        <el-dropdown-menu v-show="userInfo.isLoggedIn">
                            <el-dropdown-item  @click="logout">{{ $t('user.logout') }}</el-dropdown-item>
                            <el-dropdown-item @click="deleteAccount">{{ $t('user.delete') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-menu-item>

        </el-menu>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { BACKEND_SERVER } from '~/constants';

interface UserInfo {
  CharacterID: string;
  CharacterName: string;
  Location: string;
  userAvatarUrl: string;
  isLoggedIn: boolean;
}

type Language = 'de' | 'en' | 'es' | 'fr' | 'ja' | 'ko' | 'ru' | 'zh';

const router = useRouter();
const { t, locale } = useI18n();
const { $getUserInfo} = getCurrentInstance()!.appContext.config.globalProperties;
const numbers = ref(0)
const userSrc = computed(() => {
    return '/user.png';
})
const languageLabel = ref('English')
const userInfo = ref<UserInfo>({
  CharacterID: '',
  CharacterName: '',
  Location: '',
  userAvatarUrl: '',
  isLoggedIn: false,
});

onMounted(async () => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
        locale.value = storedLanguage as Language;
    }
    languageLabel.value = langLabel(locale.value as Language);
    await getServerStatus()
    
    userInfo.value = await $getUserInfo();
});

watch(locale, (newLocale) => {
    languageLabel.value = langLabel(newLocale as Language);
    localStorage.setItem('language', newLocale);
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
    const serenityUrl = "https://eve.starweb.cc/serenity";
    window.location.href = serenityUrl;
}

async function getServerStatus() {
    try {
        const response = await axios.get(BACKEND_SERVER + "common/serverstatus");
        numbers.value = response.data.Number;
    } catch (error) {
        console.error(error);
    }
}

function login() {
    window.location.href = `${BACKEND_SERVER}user/login`;
}

async function logout() {
    try {
        await axios.get(`${BACKEND_SERVER}user/logout`);
        localStorage.removeItem('userInfo');
        userInfo.value.isLoggedIn = false
    } catch (error) {
        console.error(error);
    }
}

async function deleteAccount() {
  if (!window.confirm(t('user.deleteConfirm'))) {
    return;
  }

  try {
    await axios.get(`${BACKEND_SERVER}user/delete`);
    localStorage.removeItem('userInfo');
    userInfo.value.isLoggedIn = false
  } catch (error) {
    console.error(error);
  }
}

</script>
<style scoped>
.top-menu {
    position: fixed;
    top: 5%;
    right: 5%;
    z-index: 1000;
}

.el-dropdown-menu {
    background-color: #1e262e;
}

.el-dropdown-link {
    font-size: 14px;
}
</style>