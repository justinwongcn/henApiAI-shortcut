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
        /** 为方便查看日志，使用此方法替代console.log */
        function debugLog(arg) {
            // @ts-ignore
            console.log(JSON.stringify({
                formItemParams,
                context,
                arg
            }));
        }
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
            if (!inputValue) {
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: '输入为空',
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
            /** 大模型名称 */
            const name = provider?.value || 'deepseek';
            // 修改这行，移除 customUrl 相关逻辑
            const apiUrl = apiEndpoints[name];
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
            debugLog({ '===0 Request Body:': JSON.stringify(requestBody, null, 2) });
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify(requestBody)
            });
            const responseText = await response.text();
            // 请避免使用 debugLog(res) 这类方式输出日志，因为所查到的日志是没有顺序的，为方便排查错误，对每个log进行手动标记顺序
            debugLog({
                '===1 接口返回结果': {
                    responseText,
                    status: response.status,
                }
            });
            if (!response.ok) {
                const errorText = responseText;
                debugLog({
                    '===2 !ok 接口返回结果': {
                        status: response.status,
                        headers: Object.fromEntries(response.headers.entries()),
                        body: errorText
                    }
                });
                if (response.status === 401) {
                    // 错误原因明确。直接以success形式返回错误原因
                    return {
                        code: block_basekit_server_api_1.FieldCode.Success,
                        data: `${name} API认证失败，请检查字段关联账号配置。 ${response.status} ${errorText}`,
                    };
                }
                else if (response.status === 429) {
                    // 错误原因明确。直接以success形式返回错误原因
                    return {
                        code: block_basekit_server_api_1.FieldCode.Success,
                        data: `${name} 大模型接口限流，请到你所选模型的对应平台根据平台规则进行调整。 ${response.status} ${errorText}`
                    };
                }
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: `接口返回异常，请到你所选模型的对应平台根据平台规则进行调整：${response.status} ${errorText}`
                };
            }
            let data;
            try {
                if (!responseText) {
                    return {
                        code: block_basekit_server_api_1.FieldCode.Success,
                        data: "AI分析内容为空，请修改提示词重试～",
                    };
                }
                data = JSON.parse(responseText);
            }
            catch (error) {
                debugLog({
                    '===3 解析为JSON失败': {
                        status: response.status,
                        responseText,
                    }
                });
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: `返回结果异常，解析为JSON时失败：${responseText}`,
                };
            }
            // 检查API返回的错误码
            if (data.error) {
                debugLog({
                    '===4 接口返回错误码': {
                        status: response.status,
                        responseText,
                    }
                });
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: `${name} 大模型接口返回错误码 ${String(data.error)}，请到大模型平台查看错误原因`,
                };
            }
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                // data: data.choices[0].message.content.trim(),
                data: JSON.stringify({ data }), // 需要根据所选api对应结构进行取值。此处直接返回原始结果
            };
        }
        catch (error) {
            debugLog({
                '===999 异常错误': String(error)
            });
            /** 返回非 Success 的错误码，将会在单元格上显示报错，请勿返回msg、message之类的字段，它们并不会起作用。
             * 对于未知错误，请直接返回 FieldCode.Error，然后通过查日志来排查错误原因，或者直接将错误以success返回。
             */
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: `异常错误：${String(error)}`
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBNEc7QUFDNUcsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsYUFBYTtBQUNiLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLGtCQUFrQjtJQUNsQiwyQkFBMkI7SUFDM0Isb0JBQW9CO0lBQ3BCLHdCQUF3QjtJQUN4QiwrQkFBK0I7SUFDL0IsNkJBQTZCO0lBQzdCLGVBQWU7Q0FDaEIsQ0FBQztBQUVGLGNBQWM7QUFDZCxrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUV0QyxrQ0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNmLFVBQVU7SUFDVixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsZUFBZSxFQUFFLE9BQU87Z0JBQ3hCLGtCQUFrQixFQUFFLGFBQWE7Z0JBQ2pDLGNBQWMsRUFBRSxNQUFNO2dCQUN0QixpQkFBaUIsRUFBRSxNQUFNO2dCQUN6QixhQUFhLEVBQUUsS0FBSztnQkFDcEIsaUJBQWlCLEVBQUUsTUFBTTtnQkFDekIsc0JBQXNCLEVBQUUsS0FBSztnQkFDN0Isb0JBQW9CLEVBQUUsWUFBWTtnQkFDbEMsYUFBYSxFQUFFLGFBQWE7Z0JBQzVCLG1CQUFtQixFQUFFLGtCQUFrQjtnQkFDdkMsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLGlCQUFpQixFQUFFLE1BQU07Z0JBQ3pCLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixtQkFBbUIsRUFBRSxPQUFPO2dCQUM1QixXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxXQUFXLEVBQUUsTUFBTTtnQkFDbkIsaUJBQWlCLEVBQUUsZ0JBQWdCO2dCQUNuQyxnQkFBZ0IsRUFBRSxjQUFjO2dCQUNoQyxpQkFBaUIsRUFBRSxjQUFjO2dCQUNq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