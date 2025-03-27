"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 配置允许的服务商域名
const allowedDomains = [
    'api.deepseek.com',
    'ark.cn-beijing.volces.com',
    'api.siliconflow.cn',
    'dashscope.aliyuncs.com',
    'api.hunyuan.cloud.tencent.com',
    'api.lkeap.cloud.tencent.com',
    'openrouter.ai'
];
// 添加服务商域名到白名单
block_basekit_server_api_1.basekit.addDomainList(allowedDomains);
block_basekit_server_api_1.basekit.addField({
    // 定义多语言支持
    i18n: {
        messages: {
            'zh-CN': {
                'providerLabel': '服务提供商',
                'providerDeepseek': 'DeepSeek 官方',
                'providerVolc': '火山方舟',
                'providerSilicon': '硅基流动',
                'providerAli': '阿里云',
                'providerTencent': '腾讯混元',
                'providerTencentCloud': '腾讯云',
                'providerOpenRouter': 'OpenRouter',
                'apiKeyLabel': '服务商 API Key',
                'apiKeyPlaceholder': '请输入您的服务商 API Key',
                'modelLabel': '模型',
                'modelNote': '(仅DeepSeek官方可用)',
                'inputFieldLabel': '输入字段',
                'promptLabel': '自定义指令',
                'promptPlaceholder': '请输入指令',
                'apiKeyTip': '请参考说明文档获取 DeepSeek API：',
                'apiKeyDoc': '说明文档',
                'errorAuthFailed': 'API Key 无效或已过期',
                'errorRateLimit': '请求过于频繁，请稍后再试',
                'errorApiRequest': '服务请求失败，请稍后重试',
                'errorInvalidFormat': 'API 返回格式异常',
                'errorUnknown': '服务异常，请稍后重试',
                'modelCustomLabel': '自定义模型',
                'modelCustomPlaceholder': '请输入模型名称',
            },
            'en-US': {
                'providerLabel': 'Service Provider',
                'providerDeepseek': 'DeepSeek Official',
                'providerVolc': 'Volcano Engine',
                'providerSilicon': 'Silicon Flow',
                'providerAli': 'Alibaba Cloud',
                'providerTencent': 'Tencent Hunyuan',
                'providerTencentCloud': 'Tencent Cloud',
                'providerOpenRouter': 'OpenRouter',
                'apiKeyLabel': 'Provider API Key',
                'apiKeyPlaceholder': 'Please enter your provider API Key',
                'modelLabel': 'Model',
                'modelNote': '(DeepSeek only)',
                'inputFieldLabel': 'Input Field',
                'promptLabel': 'Custom Prompt',
                'promptPlaceholder': 'Please enter prompt',
                'apiKeyTip': 'Please refer to the documentation to get DeepSeek API:',
                'apiKeyDoc': 'Documentation',
                'errorAuthFailed': 'Invalid or expired API Key',
                'errorRateLimit': 'Too many requests, please try again later',
                'errorApiRequest': 'Service request failed, please try again later',
                'errorInvalidFormat': 'API response format error',
                'errorUnknown': 'Service error, please try again later',
            },
            'ja-JP': {
                'providerLabel': 'サービスプロバイダー',
                'providerDeepseek': 'DeepSeek 公式',
                'providerVolc': '火山エンジン',
                'providerSilicon': 'シリコンフロー',
                'providerAli': 'アリババクラウド',
                'providerTencent': '腾讯混元',
                'providerTencentCloud': '腾讯クラウド',
                'providerOpenRouter': 'OpenRouter',
                'apiKeyLabel': 'プロバイダー API Key',
                'apiKeyPlaceholder': 'プロバイダーの API Keyを入力してください',
                'modelLabel': 'モデル',
                'modelNote': '(DeepSeek公式のみ)',
                'inputFieldLabel': '入力フィールド',
                'promptLabel': 'カスタム指示',
                'promptPlaceholder': '指示を入力してください',
                'apiKeyTip': 'DeepSeek APIの取得については、ドキュメントを参照してください：',
                'apiKeyDoc': 'ドキュメント',
                'errorAuthFailed': 'APIキーが無効または期限切れです',
                'errorRateLimit': 'リクエストが多すぎます。後でもう一度お試しください',
                'errorApiRequest': 'サービスリクエストが失敗しました。後でもう一度お試しください',
                'errorInvalidFormat': 'APIレスポンスのフォーマットエラー',
                'errorUnknown': 'サービスエラー。後でもう一度お試しください',
                'modelCustomLabel': 'カスタムモデル',
                'modelCustomPlaceholder': 'モデル名を入力してください',
            }
        }
    },
    formItems: [
        {
            key: 'provider',
            label: t('providerLabel'),
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                options: [
                    { label: t('providerDeepseek'), value: 'deepseek' },
                    { label: t('providerVolc'), value: 'volc' },
                    { label: t('providerSilicon'), value: 'silicon' },
                    { label: t('providerAli'), value: 'ali' },
                    { label: t('providerTencent'), value: 'tencent' },
                    { label: t('providerTencentCloud'), value: 'tencentCloud' },
                    { label: t('providerOpenRouter'), value: 'openRouter' },
                ],
                defaultValue: 'deepseek',
            },
            validator: {
                required: false,
            },
        },
        // 删除整个 customUrl 表单项
        // {
        //   key: 'customUrl',
        //   label: t('customUrlLabel'),
        //   component: FieldComponent.Input,
        //   props: {
        //     placeholder: t('customUrlPlaceholder'),
        //     type: 'text',
        //   },
        //   validator: {
        //     required: false,
        //   },
        // },
        {
            key: 'apiKey',
            label: t('apiKeyLabel'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: t('apiKeyPlaceholder'),
            },
            tooltips: [
                {
                    type: 'text',
                    content: t('apiKeyTip')
                },
                {
                    type: 'link',
                    text: t('apiKeyDoc'),
                    link: 'https://bytedance.larkoffice.com/docx/XvICd2i9woXlGOxp9xBcAmyNnXd'
                }
            ],
            validator: {
                required: true,
            },
        },
        {
            key: 'model',
            label: `${t('modelLabel')} ${t('modelNote')}`,
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                options: [
                    { label: 'deepseek-chat', value: 'deepseek-chat' },
                    { label: 'deepseek-reasoner', value: 'deepseek-reasoner' },
                ],
                defaultValue: 'deepseek-chat',
            },
            validator: {
                required: true,
            },
        },
        {
            key: 'customModel',
            label: t('modelCustomLabel'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: t('modelCustomPlaceholder'),
                type: 'text',
            },
            validator: {
                required: false,
            },
        },
        {
            key: 'inputField',
            label: t('inputFieldLabel'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: true,
            },
        },
        {
            key: 'prompt',
            label: t('promptLabel'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: t('promptPlaceholder'),
                type: 'textarea',
            },
            validator: {
                required: true,
            },
        },
    ],
    // 定义返回结果类型为文本
    resultType: {
        type: block_basekit_server_api_1.FieldType.Text, // 定义捷径的返回结果类型为多行文本字段
    },
    // 执行函数
    execute: async (formItemParams, context) => {
        const { apiKey, model, customModel, inputField, prompt, provider } = formItemParams;
        const { fetch } = context;
        try {
            // 修复：使用更可靠的方式处理输入字段
            let inputValue = '';
            // 检查输入字段是否为数组并包含文本内容
            if (Array.isArray(inputField) && inputField.length > 0) {
                // 遍历所有输入项，确保捕获所有文本内容
                for (const item of inputField) {
                    if (item.type === 'text' && item.text) {
                        inputValue += item.text;
                    }
                }
            }
            console.log("处理的输入文本:", inputValue); // 添加日志以便调试
            if (!inputValue) {
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: '',
                };
            }
            const apiEndpoints = {
                deepseek: 'https://api.deepseek.com/v1/chat/completions',
                volc: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
                silicon: 'https://api.siliconflow.cn/v1/chat/completions',
                ali: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
                tencent: 'https://api.hunyuan.cloud.tencent.com/v1/chat/completions',
                tencentCloud: 'https://api.lkeap.cloud.tencent.com/v1/chat/completions',
                openRouter: 'https://openrouter.ai/api/v1/chat/completions'
            };
            // 修改这行，移除 customUrl 相关逻辑
            const apiUrl = apiEndpoints[provider?.value || 'deepseek'];
            const isReasonerModel = (customModel || model.value) === 'deepseek-reasoner';
            const requestBody = {
                model: customModel || model.value,
                messages: [
                    {
                        role: 'user',
                        content: isReasonerModel ? `${prompt}\n${inputValue}` : inputValue
                    }
                ],
                stream: false,
                temperature: isReasonerModel ? 0 : undefined
            };
            if (!isReasonerModel) {
                requestBody.messages.unshift({ role: 'system', content: prompt });
            }
            console.log('Request Body:', JSON.stringify(requestBody, null, 2));
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.log('Error Response:', {
                    status: response.status,
                    headers: Object.fromEntries(response.headers.entries()),
                    body: errorText
                });
                if (response.status === 401) {
                    return {
                        code: block_basekit_server_api_1.FieldCode.AuthorizationError,
                        message: t('errorAuthFailed'),
                        msg: `===捷径代码主动返回错误: API认证失败 ${response.status} ${errorText}`,
                    };
                }
                else if (response.status === 429) {
                    return {
                        code: block_basekit_server_api_1.FieldCode.RateLimit,
                        message: t('errorRateLimit'),
                        msg: `===捷径代码主动返回错误: 触发限流 ${response.status} ${errorText}`,
                    };
                }
                return {
                    code: block_basekit_server_api_1.FieldCode.Error,
                    message: t('errorApiRequest'),
                    msg: `===捷径代码主动返回错误: API请求失败 ${response.status} ${errorText}`,
                };
            }
            let data;
            try {
                const responseText = await response.text();
                console.log('API Response Text:', responseText);
                if (!responseText) {
                    return {
                        code: block_basekit_server_api_1.FieldCode.Success,
                        data: "AI分析内容为空，请修改提示词重试～",
                        msg: "结果异常！"
                    };
                }
                data = JSON.parse(responseText);
            }
            catch (error) {
                console.log("🚀 ~ execute: ~ response解析错误:", error);
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: "AI分析内容为空，请修改提示词重试～",
                    msg: "结果异常！"
                };
            }
            // 检查API返回的错误码
            if (data.error) {
                console.log("🚀 ~ execute: ~ API返回错误:", data.error);
                if (data.error.code === 'rate_limit_exceeded' || data.error.type === 'rate_limit_exceeded') {
                    return {
                        code: block_basekit_server_api_1.FieldCode.RateLimit,
                        msg: "超过API调用QPS限制"
                    };
                }
                else if (data.error.code === 'insufficient_quota' || data.error.type === 'insufficient_quota') {
                    return {
                        code: block_basekit_server_api_1.FieldCode.QuotaExhausted,
                        msg: "quota耗尽"
                    };
                }
                else if (data.error.code === 'invalid_api_key' || data.error.type === 'invalid_api_key') {
                    return {
                        code: block_basekit_server_api_1.FieldCode.AuthorizationError,
                        msg: "服务未开通或API Key无效"
                    };
                }
                else {
                    return {
                        code: block_basekit_server_api_1.FieldCode.InvalidArgument,
                        msg: "输入参数错误"
                    };
                }
            }
            if (!data.choices?.[0]?.message?.content) {
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: "AI分析内容为空，请修改提示词重试～",
                    msg: "结果异常！"
                };
            }
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: data.choices[0].message.content.trim(),
            };
        }
        catch (error) {
            console.log("🚀 ~ execute: ~ 整体执行错误:", error);
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: "AI服务异常，请稍后重试～",
                msg: "服务异常！"
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBNEc7QUFDNUcsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsYUFBYTtBQUNiLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLGtCQUFrQjtJQUNsQiwyQkFBMkI7SUFDM0Isb0JBQW9CO0lBQ3BCLHdCQUF3QjtJQUN4QiwrQkFBK0I7SUFDL0IsNkJBQTZCO0lBQzdCLGVBQWU7Q0FDaEIsQ0FBQztBQUVGLGNBQWM7QUFDZCxrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUV0QyxrQ0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNmLFVBQVU7SUFDVixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsZUFBZSxFQUFFLE9BQU87Z0JBQ3hCLGtCQUFrQixFQUFFLGFBQWE7Z0JBQ2pDLGNBQWMsRUFBRSxNQUFNO2dCQUN0QixpQkFBaUIsRUFBRSxNQUFNO2dCQUN6QixhQUFhLEVBQUUsS0FBSztnQkFDcEIsaUJBQWlCLEVBQUUsTUFBTTtnQkFDekIsc0JBQXNCLEVBQUUsS0FBSztnQkFDN0Isb0JBQW9CLEVBQUUsWUFBWTtnQkFDbEMsYUFBYSxFQUFFLGFBQWE7Z0JBQzVCLG1CQUFtQixFQUFFLGtCQUFrQjtnQkFDdkMsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLGlCQUFpQixFQUFFLE1BQU07Z0JBQ3pCLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixtQkFBbUIsRUFBRSxPQUFPO2dCQUM1QixXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxXQUFXLEVBQUUsTUFBTTtnQkFDbkIsaUJBQWlCLEVBQUUsZ0JBQWdCO2dCQUNuQyxnQkFBZ0IsRUFBRSxjQUFjO2dCQUNoQyxpQkFBaUIsRUFBRSxjQUFjO2dCQUNq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