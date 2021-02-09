import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()


export const APPNAME = publicRuntimeConfig.APP_NAME;
export const API = publicRuntimeConfig.PRODUCTION ? 'https://post.sakibcsc.com' : 'http://localhost:8000'

