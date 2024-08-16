// user.js
import { ref } from 'vue';
import axios from 'axios';
import { BACKEND_SERVER } from '~/constants';

interface UserInfo {
  CharacterID: string;
  CharacterName: string;
  Location: string;
  userAvatarUrl: string;
  isLoggedIn: boolean;
}

export let userInfo = ref<UserInfo>({
  CharacterID: '',
  CharacterName: '',
  Location: '',
  userAvatarUrl: '',
  isLoggedIn: false,
});

export async function getUserInfo(): Promise<UserInfo> {
  const storedData = localStorage.getItem('userInfo');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const now = Date.now();
    if(now < parsedData.expiry && parsedData.userInfo.isLoggedIn){
      return parsedData.userInfo;
    }
    localStorage.removeItem('userInfo');
  }
  return await fetchUserInfo();
}

async function fetchUserInfo(): Promise<UserInfo> {
  try {
    const response = await axios.get(`${BACKEND_SERVER}user/userinfo`);
    if (!response.data) {
      userInfo.value.isLoggedIn = false;
    } else {
      userInfo.value = {
        ...response.data,
        isLoggedIn: true,
        isExpired: false,
        userAvatarUrl: `https://images.evetech.net/characters/${response.data.CharacterID}/portrait?size=64`,
      };
    }
    if(userInfo.value.isLoggedIn){
      storeUserInfoWithTTL(userInfo.value)
    }
    return userInfo.value;
  } catch (error) {
    console.error(error);
    userInfo.value.isLoggedIn = false;
    return userInfo.value;
  }
}

function storeUserInfoWithTTL(userInfo: UserInfo) {
  const ttl = 6 * 60 * 60 * 1000;
  const expirationTime = Date.now() + ttl;

  const dataToStore = {
    userInfo: userInfo,
    expiry: expirationTime
  };

  localStorage.setItem('userInfo', JSON.stringify(dataToStore));
}