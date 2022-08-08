import request from '@/utils/request'

export const searchHot = params => request({
    url: '/search/hot',
    params
})

export const searchHotResult = params => request({
    url: '/cloudsearch',
    params
})