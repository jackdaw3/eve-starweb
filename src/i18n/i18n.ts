import { createI18n } from 'vue-i18n';

import elementde from 'element-plus/es/locale/lang/de';
import elementEn from 'element-plus/es/locale/lang/en';
import elementEs from 'element-plus/es/locale/lang/es';
import elementFr from 'element-plus/es/locale/lang/fr';
import elementJa from 'element-plus/es/locale/lang/ja';
import elementKo from 'element-plus/es/locale/lang/ko';
import elementRu from 'element-plus/es/locale/lang/ru';
import elementZh from 'element-plus/es/locale/lang/zh-cn';

import de from './lang/de';
import en from './lang/en';
import es from './lang/es';
import fr from './lang/fr';
import ja from './lang/ja';
import ko from './lang/ko';
import ru from './lang/ru';
import zh from './lang/zh';

type ElementPlusLocaleConfig = {
  [key: string]: any;
};

export const elementPlusLocales: ElementPlusLocaleConfig = {
  en: elementEn,
  zh: elementZh,
};

type MessageSchema = typeof en; 


const i18n = createI18n<[MessageSchema], 'de' | 'en' | 'es' |'fr' | 'ja' | 'ko' | 'ru' | 'zh'>({
  locale: 'en', 
  messages: {
    'de': { ...elementde, ...de }, 
    'en': { ...elementEn, ...en }, 
    'es': { ...elementEs, ...es }, 
    'fr': { ...elementFr, ...fr }, 
    'ja': { ...elementJa, ...ja }, 
    'ko': { ...elementKo, ...ko }, 
    'ru': { ...elementRu, ...ru }, 
    'zh': { ...elementZh, ...zh }, 
  },
});

export default i18n;
