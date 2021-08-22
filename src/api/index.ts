import request from '@/utils/request'

export function xhrGetTodoList(params: any) {
    return Promise.resolve({
        code: 1,
        data: {
            timestamp: Date.now(),
            list: [
                {
                    id: '1',
                    title: '外包完工验收',
                    owner: '张三',
                    name: 'A项目完工验收单',
                    node: '施工管理验收',
                    time: Date.now() - Math.round(Math.random() * 100000)
                },
                {
                    id: '2',
                    title: '外包完工验收',
                    owner: '李四',
                    name: 'B项目完工验收单',
                    node: '施工中',
                    time: Date.now() - Math.round(Math.random() * 100000)
                },
                {
                    id: '3',
                    title: '外包完工验收',
                    owner: '王五',
                    name: 'C项目完工验收单',
                    node: '未开始',
                    time: Date.now() - Math.round(Math.random() * 100000)
                },
                {
                    id: '4',
                    title: '外包完工验收',
                    owner: '王五',
                    name: 'C项目完工验收单',
                    node: '未开始',
                    time: Date.now() - Math.round(Math.random() * 100000)
                },
                {
                    id: '5',
                    title: '外包完工验收',
                    owner: '王五',
                    name: 'C项目完工验收单',
                    node: '未开始',
                    time: Date.now() - Math.round(Math.random() * 100000)
                },
                {
                    id: '6',
                    title: '外包完工验收',
                    owner: '王五',
                    name: 'C项目完工验收单',
                    node: '未开始',
                    time: Date.now() - Math.round(Math.random() * 100000)
                },
            ]
        }
    })
}


export function xhrGetTodoDetail(params: any) {
    return Promise.resolve({
        code: 1,
        data: {
        }
    })
}
