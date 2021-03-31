import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()


export const APPNAME = publicRuntimeConfig.APP_NAME;
export const API = publicRuntimeConfig.PRODUCTION ? 'https://post.sakibcsc.com/api' : 'http://localhost:8000/api'
export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.PRODUCTION_DOMAIN : publicRuntimeConfig.DEVELOPMENT_DOMAIN;
export const FBID = publicRuntimeConfig.FB_APP_ID;
export const SHORTNAME_DISQUS = 'multiuserblog'