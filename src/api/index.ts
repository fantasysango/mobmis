import request from '@/utils/request'
import mockData from './mockData'

export function xhrGetTodoList(params: any) {
  return Promise.resolve(mockData.serverList)
}


export function xhrGetTodoDetail(params: any) {
  return Promise.resolve(mockData.serverDetail)
}
