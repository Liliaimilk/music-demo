import { recommendMusic, newMusic } from "./home";
import { searchHot, searchHotResult } from './search'
import { getLyricById, getSongById } from './Play'

export const recommendMusicApi = recommendMusic//导出请求歌单

export const newMusicApi = newMusic

export const searchHotApi = searchHot
export const searchHotResultApi = searchHotResult

export const getSongByIdApi = getSongById
export const getLyricByIdApi = getLyricById