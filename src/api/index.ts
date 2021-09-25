import request from '@/utils/request'
import mockData from './mock'

const ENABLE_MOCK = process.env.NODE_ENV === 'development'

/**
 * 审批中心列表
 * @param params {empCode 用户编码，pageIndex 页码，pageSize 每页条数，start 查询开始日期，end 结束日期}
 */
export function xhrGetTodoList(params: any) {
  if (ENABLE_MOCK) return Promise.resolve(mockData.serverList)
  return request({
    url: '/API/AppvoalCenterAPI/GetWFListByPage',
    method: 'get',
    params,
  })
}

/**
 * 单据详情
 * @param params {
            WorkFlowCode 流程编码（本次外包完工验收申请流程编码为WBYS）
            ID 业务单据ID（取自列表接口返回的WorkFlowKey，例如baldr_2_2166_3931_160779_2823462_1007_10101887，则单据ID为1007）)}
          }
 */
export function xhrGetTodoDetail(params: any) {
  if (ENABLE_MOCK) return Promise.resolve(mockData.serverDetail)
  return request({
    url: '/API/AppvoalCenterAPI/GetRTFormInfos',
    method: 'get',
    params,
  })
}

/**
 * 发送前（点击详情页面的发送按钮调用）
 * @param params {
            UID:当前用户ID（工号）
            UNAME:当前用户名
            RTKey:（取自列表接口返回的WorkFlowKey）)
            WorkFlowCode 流程编码（本次外包完工验收申请流程编码为WBYS）
            JudgmentCondition：点击发送按钮时需先判断是否有弹出框，根据弹出框内容选择之后将选项（“true”或“false”赋值此参数，string类型） 当前外包完工验收流程有三个节点需要，1验收申请-->联合验收，2归口专责验收--专业会审3部门验收-运行验收
          }
 */
export function xhGetValidateInfo(params: any) {
  if (ENABLE_MOCK) return Promise.resolve(mockData.validateInfo)
  return request({
    url: '/API/WFConfig/WFSendNextBefore',
    method: 'get',
    params,
  })
}

/**
 * 发送
 * @param params 
 */
export function xhSendValidateInfo(params: any) {
  if (ENABLE_MOCK) return Promise.resolve(mockData.sendInfo)
  return request({
    url: '/API/WFConfig/WFSendNext',
    method: 'post',
    data: params,
  })
}
