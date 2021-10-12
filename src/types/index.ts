export interface ITodoItem {
    id: string
    workFlowKey: string
    workFlowCode: string
    workFlowName: string
    formLable: string
    fromType: string
    nowActivity: string
    sendUser: string
    sendDateTime: number
    kind: string
    subkind: string
}

export type TOprType = 'send' | 'rollback' | 'transmit'