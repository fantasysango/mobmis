// 1、审批中心列表
// http://localhost:44389/API/AppvoalCenterAPI/GetWFListByPage
// 参数：
parames = {
    "empCode": 10101887,
    "pageIndex": 1,
    "pageSize": 10,
    "start": "2019-01-01",
    "end": "2021-01-01"
};

// 参数说明：empCode 用户编码，pageIndex 页码，pageSize 每页条数，start 查询开始日期，end 结束日期
// 返回值：
res = {
    "Data": [
        { "ID": 1230480, "WorkFlowKey": "baldr_2_2166_3921_164854_2835345_2012_10101887", "WorkFlowName": "外包项目完工验收流程", "WorkFlowCode": "WBYS", "FormLable": "外包完工验收单", "NowActivity": "完工申请", "FromType": "发送", "SendUser": "杨震", "SendDateTime": "2019-05-17", "Kind": "中电华创", "Subkind": null },
        { "ID": 1230479, "WorkFlowKey": "baldr_2_2166_3921_164853_2835338_2011_10101887", "WorkFlowName": "外包项目完工验收流程", "WorkFlowCode": "WBYS", "FormLable": "外包完工验收单", "NowActivity": "完工申请", "FromType": "发送", "SendUser": "杨震", "SendDateTime": "2019-05-17", "Kind": "中电华创", "Subkind": null },
        { "ID": 1230470, "WorkFlowKey": "baldr_2_2166_3927_164838_2834831_2009_10101887", "WorkFlowName": "外包项目完工验收流程", "WorkFlowCode": "WBYS", "FormLable": "外包完工验收单", "NowActivity": "财务经营部领导审批", "FromType": "发送", "SendUser": "田亮", "SendDateTime": "2019-05-17", "Kind": "中电华创", "Subkind": null },
        { "ID": 1230125, "WorkFlowKey": "baldr_2_2166_3921_164813_2833532_2007_10101887", "WorkFlowName": "外包项目完工验收流程", "WorkFlowCode": "WBYS", "FormLable": "外包完工验收单", "NowActivity": "完工申请", "FromType": "发送", "SendUser": "杨震", "SendDateTime": "2019-02-19", "Kind": "中电华创", "Subkind": null },
        { "ID": 1225953, "WorkFlowKey": "baldr_2_2166_3931_160779_2823462_1007_10101887", "WorkFlowName": "外包项目完工验收流程", "WorkFlowCode": "WBYS", "FormLable": "外包完工验收单", "NowActivity": "档案验收", "FromType": "发送", "SendUser": "孙晔", "SendDateTime": "2019-01-04", "Kind": "中电华创", "Subkind": null }
    ],
    "Total": 5
}
// 返回值说明：Data 数据集合，Total 本页条数
// ID 单据ID（详情接口用作入参），WorkFlowName 流程名称，WorkFlowCode 流程编码（详情接口用作入参），FormLable 单据名称，NowActivity 当前节点，FromType表单流转方向（列表展示按钮），SendUser 发送人，SendDateTime 发送时间，Kind 公司
// 2、单据详情
// http://localhost:44389/API/AppvoalCenterAPI/GetRTFormInfos?WorkFlowCode=WBYS&ID=4204
// 参数：WorkFlowCode 流程编码（本次外包完工验收申请流程编码为WBYS）
// ID(业务单据ID（取自列表接口返回的WorkFlowKey，例如baldr_2_2166_3931_160779_2823462_1007_10101887，则单据ID为1007）)
// 返回值：
res = {
    "flag": 1,
    "msg": "success",
    "data": {
        "formData": {
            "djbh": "WBPMWGYS_202011_031",
            "cwxm": "True",
            "xmmc": "WBPM_201910_012|4x330MW发电机组除灰运行维护（2020.02.01-2022.01.31）",
            "cbs": "常熟市先行电力综合服务有限公司",
            "jxsx": "其他",
            "zy": "燃灰",
            "sgglbm": "发电部",
            "sgglbz": "辅控1班",
            "htkgrq": null,
            "htjgrq": null,
            "htdaycount": null,
            "sjkgrq": "2020/2/1 0:00:00",
            "sjjgrq": null,
            "sjdaycount": null,
            "jdkgrq": "2020/8/1 0:00:00",
            "jdjgrq": "2020/10/31 0:00:00",
            "jddaycount": "91",
            "zjzldj": "2",
            "yszldj": "2",
            "zbq": "6",
            "gcdd": "江苏省常熟经济技术开发区兴港路28号",
            "zzjs": "False",
            "zywgnr": "1.4x330MW发电机组除灰运行维护；\r\n2.按技术协议规定的工作范围；",
            "yssm": "已按合同要求完成工作计划，疫情期间对承揽项目无影响，验收合格，无资料移交。八月份绩效94分，九月份绩效93分，十月份绩效95分。",
            "yqjkhsm": "无",
            "jxkhsm": "无",
            "ylwt": "无",
            "sqr": "张建军",
            "sqsj": "2020/11/10 15:41:00"
        },
        "ftpAttachment": [
            {
                "ftpCode": null,
                "fileName": null,
                "fileExt": null,
                "fileFullName": "除灰8-10月季度结算工程量签证单.pdf",
                "fileNameOnFTP": null,
                "fileAddress": "外包项目完工验收/WBPMWGYS_202011_031/50579816-450f-48bd-b36c-facee32654d9.pdf"
            },
            {
                "ftpCode": null,
                "fileName": null,
                "fileExt": null,
                "fileFullName": "除灰8-10月季度结算完工验收报告.pdf",
                "fileNameOnFTP": null,
                "fileAddress": "外包项目完工验收/WBPMWGYS_202011_031/40211ca2-a011-4c7a-9dcd-755d2f160d59.pdf"
            }
        ],
        "suggestions": [
            {
                "id": null,
                "rtKey": null,
                "suggestionContent": "2020/11/10 16:06:00",
                "suggestionTime": "2020-11-10T16:06:00",
                "isDel": null,
                "uid": null,
                "uName": "张建军"
            },
            {
                "id": null,
                "rtKey": null,
                "suggestionContent": "同意",
                "suggestionTime": "2020-11-11T11:23:00",
                "isDel": null,
                "uid": null,
                "uName": "陈祥东"
            }
        ],
        "isApprove": 0,
        "isSend": 0,
        "isRefuse": 0,
        "isTransmit": 0,
        "isCompliance": 0,
        "isRunning": 1,
        "isSuggestion": 0,
        "isExpandSuggestion": 1,
        "isExpandWFHistory": 0,
        "isExpandFile": 0,
        "isReadOnly": 0
    }
}

// 说明：data: formData 表单数据，ftpAttachment 附件列表，suggestions 审批历史
res = {
    formData: {
        "djbh": 单据编号,
        "cwxm": 常维项目,
        "xmmc": 项目名称,
        "cbs": 承包商,
        "jxsx": 检修属性,
        "zy": 专业,
        "sgglbm": 施工管理部门,
        "sgglbz": 施工管理班组,
        "htkgrq": 合同开工日期,
        "htjgrq": 合同竣工日期,
        "htdaycount": 合同工期,
        "sjkgrq": 实际开工日期,
        "sjjgrq": 实际竣工日期,
        "sjdaycount": 实际工期,
        "jdkgrq": 阶段性开工日期,
        "jdjgrq": 阶段性竣工日期,
        "jddaycount": 实际天数,
        "zjzldj": 自检质量等级,
        "yszldj": 验收质量等级,
        "zbq": 质保期,
        "gcdd": 工程地点,
        "zzjs": 最终结算,
        "zywgnr": 主要完工内容及情况说明,
        "yssm": 验收说明,
        "yqjkhsm": 延期及考核说明,
        绩效考核情况说明: "无",
        遗留问题: "无",
        "sqr": 申请人,
        "sqsj": 申请时间
    },
    ftpAttachment: {
        "fileFullName": 文件名,
        "fileAddress": 地址
    },
    suggestions: {
        "suggestionContent": 审批意见,
        "suggestionTime": 审批时间,
        "uName": 审批人
    }
}