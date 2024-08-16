<template>
  <div class="header">
    <el-menu class="menu" mode="horizontal" :ellipsis="false">
      <el-menu-item index="0" style="margin-right: -2.3%;" @click="goToHome">
        <img style="width: 26px; vertical-align: middle; margin-left: 25px;margin-top: -2px;" src="/icon.png"
          class="logo" />
      </el-menu-item>

      <el-menu-item index="1" class="icon" style="margin-left: 1%;">
        <span style="font-family: 'Microsoft YaHei'; font-size: 20px; margin-right: 10px;">Starweb {{ headerTitle
          }}</span>
      </el-menu-item>

      <el-menu-item index="2" class="icon" style="margin-left: -1%; margin-top: 0.11%;">
        <img style="height: 21px;" src="/partner.png" />
      </el-menu-item>
      <div class="flex-grow" />

      <el-menu-item index="3" style="margin-right: -25px;" v-if="regionVisible">
        <el-dropdown @command="regionChange">
          <span class="el-dropdown-link">
            {{ regionLabel }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-scrollbar height="200px" style="margin-top: 3px;">
                <el-dropdown-item v-for="region in regionData" :command="region">
                  {{ region.RegionName }}
                </el-dropdown-item>
              </el-scrollbar>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu-item>

      <el-menu-item index="4" :style="{ marginRight: userInfo.isLoggedIn ? '-25px' : '-15px' }">
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

      <el-menu-item index="5" v-show="userInfo.isLoggedIn">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="24" :src="userInfo.userAvatarUrl" />
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">{{ $t('user.logout') }}</el-dropdown-item>
              <el-dropdown-item @click="deleteAccount">{{ $t('user.delete') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, watch, computed, onBeforeMount, reactive, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';
import { BACKEND_SERVER } from '~/constants';
import axios from 'axios';

type Language = 'de' | 'en' | 'es' | 'fr' | 'ja' | 'ko' | 'ru' | 'zh';
interface Region {
  RegionId: number;
  RegionName: string;
}
interface UserInfo {
  CharacterID: string;
  CharacterName: string;
  Location: string;
  userAvatarUrl: string;
  isLoggedIn: boolean;
}

const { t, locale } = useI18n()
const store = useStore();
const router = useRouter();
const { $getUserInfo } = getCurrentInstance()!.appContext.config.globalProperties;
const priorityIds = [10000002, 10000043, 10000032, 10000042, 10000030];
const languageLabel = ref('')
const serverLabel = ref('')
const regionLabel = ref('')
const marketLabel = "market"
const hasFetchedRegions = ref(false);
const regionId = ref('10000002')
let regionData = reactive<Region[]>([])

const props = defineProps<{
  regionVisible: boolean;
  headerType: string;
}>();

const headerTitle = computed(() => {
  return t(`home.${props.headerType}`);
});

const allRegions = computed<Region>(() => ({
  RegionId: -1,
  RegionName: t('header.allRegions'),
}));

const userInfo = ref<UserInfo>({
  CharacterID: '',
  CharacterName: '',
  Location: '',
  userAvatarUrl: '',
  isLoggedIn: false,
});

onBeforeMount(() => {
  const storedLanguage = localStorage.getItem('language')
  if (storedLanguage) {
    locale.value = storedLanguage as Language;
  }
  languageLabel.value = langLabel(locale.value as Language);
  serverLabel.value = (t('header.server.Tranquility'))
})

onMounted(async () => {
  if (props.regionVisible) {
    getRegions().then(() => {
      hasFetchedRegions.value = true;
      if (props.headerType == marketLabel) {
        const storedMarketRegionId = localStorage.getItem('marketRegionId');
        if (storedMarketRegionId) {
          regionId.value = storedMarketRegionId
          store.commit(`market/setRegionId`, regionId.value);
        } else {
          regionId.value = "-1"
        }
      }
      regionLabel.value = regionName(Number(regionId.value));
    });
  }
  userInfo.value = await $getUserInfo();
  store.commit(`user/setIsLoggedIn`, userInfo.value.isLoggedIn);
});

watch(locale, (newLocale) => {
  languageLabel.value = langLabel(newLocale as Language);
  localStorage.setItem('language', newLocale);
  serverLabel.value = (t('header.server.Tranquility'))

  if (hasFetchedRegions.value) {
    getRegions().then(() => {
      hasFetchedRegions.value = true;
      regionLabel.value = regionName(Number(regionId.value));
    });
  }
})

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

function langChange(lang: Language) {
  locale.value = lang;
}

function regionChange(region: any) {
  regionId.value = region.RegionId.toString();
  regionLabel.value = region.RegionName;
  store.commit(`${props.headerType}/setRegionId`, regionId.value);
  if (props.headerType == marketLabel) {
    localStorage.setItem('marketRegionId', regionId.value);
  }
}

async function getRegions() {
  try {
    const response = await axios.get(BACKEND_SERVER + "common/region", {
      params: {
        lang: locale.value,
      },
    });
    sortByPriority(response.data)
    regionData.splice(0, regionData.length, ...response.data);
    if (props.headerType == marketLabel) {
      regionData.splice(0, 0, allRegions.value)
    }
  } catch (error) {
    console.error(error);
  }
}

function regionName(regionId: number): string {
  const region = regionData.find(item => item.RegionId === regionId);
  return region ? region.RegionName : "";
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

async function logout() {
  try {
    await axios.get(`${BACKEND_SERVER}user/logout`);
    localStorage.removeItem('userInfo');
    userInfo.value.isLoggedIn = false
    store.commit(`user/setIsLoggedIn`, userInfo.value.isLoggedIn);
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
    store.commit(`user/setIsLoggedIn`, userInfo.value.isLoggedIn);
  } catch (error) {
    console.error(error);
  }
}

function goToHome() {
  router.push('/');
}

</script>

<style>
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
  background-color: transparent !important;
}

.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none;
}

.el-menu--horizontal.el-menu {
  border-bottom: none;
  background-image: linear-gradient(to right, var(--el-menu-border-color), var(--el-menu-border-color));
  background-size: calc(100% - 30px) 1px;
  background-position: 15px bottom;
  background-repeat: no-repeat;
}

.el-menu--horizontal>.el-menu-item {
  border-bottom: none;
}

.icon {
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.el-dropdown__popper {
  margin-right: 5%;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.el-menu-item:focus,
.el-dropdown-link:focus {
  border: none;
  outline: none;
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(2px);
  height: 5%;
  background-color: rgba(32, 33, 36, 0.36);
}

.el-menu-item:focus {
  outline: none;
  border: none;
}

.el-menu-item .is-active {
  outline: none !important;
  border: none !important;
}

.flex-grow {
  caret-color: transparent !important;
}

.search-input {
  color: #fff;
  background-color: #202124;
  border: 1px solid #4C4D4F;
  border-radius: 4px;
  outline: 0;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  position: relative;
}

.search-input:focus {
  border-color: var(--el-color-primary);
}

.search-input::placeholder {
  color: #cfd3dc;
  font-size: 12px;
}

.input-with-icon {
  display: flex;
  align-items: center;
}

</style>
