"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 配置允许的服务商域名
const allowedDomains = [
    'www.henapi.top'
];
// 添加服务商域名到白名单
block_basekit_server_api_1.basekit.addDomainList(allowedDomains);
block_basekit_server_api_1.basekit.addField({
    // 定义多语言支持
    i18n: {
        messages: {
            'zh-CN': {
                'providerLabel': '服务提供商',
                'providerHenApi': 'HenApi',
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
                'providerHenApi': 'HenApi',
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
                'providerHenApi': 'HenApi',
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
        // {
        //   key: 'provider',
        //   label: t('providerLabel'),
        //   component: FieldComponent.SingleSelect,
        //   props: {
        //     options: [
        //       { label: t('providerHenApi'), value: 'HenApi' }
        //     ],
        //     defaultValue: 'deepseek',
        //   },
        //   validator: {
        //     required: false,
        //   },
        // },
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
        const { apiKey, model, customModel, inputField, prompt } = formItemParams;
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
                HenApi: 'https://www.henapi.top/v1/chat/completions'
            };
            /** 大模型名称 */
            const name = 'HenApi';
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
                data: JSON.stringify({ data }), // 此处直接返回原始结果。需要根据具体接口/业务进行取值调整。
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBNEc7QUFDNUcsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsYUFBYTtBQUNiLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLGdCQUFnQjtDQUNqQixDQUFDO0FBRUYsY0FBYztBQUNkLGtDQUFPLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXRDLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsVUFBVTtJQUNWLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxlQUFlLEVBQUUsT0FBTztnQkFDeEIsZ0JBQWdCLEVBQUUsUUFBUTtnQkFDMUIsYUFBYSxFQUFFLGFBQWE7Z0JBQzVCLG1CQUFtQixFQUFFLGtCQUFrQjtnQkFDdkMsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLGlCQUFpQixFQUFFLE1BQU07Z0JBQ3pCLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixtQkFBbUIsRUFBRSxPQUFPO2dCQUM1QixXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxXQUFXLEVBQUUsTUFBTTtnQkFDbkIsaUJBQWlCLEVBQUUsZ0JBQWdCO2dCQUNuQyxnQkFBZ0IsRUFBRSxjQUFjO2dCQUNoQyxpQkFBaUIsRUFBRSxjQUFjO2dCQUNqQyxvQkFBb0IsRUFBRSxZQUFZO2dCQUNsQyxjQUFjLEVBQUUsWUFBWTtnQkFDNUIsa0JBQWtCLEVBQUUsT0FBTztnQkFDM0Isd0JBQXdCLEVBQUUsU0FBUzthQUNwQztZQUNELE9BQU8sRUFBRTtnQkFDUCxlQUFlLEVBQUUsa0JBQWtCO2dCQUNuQyxnQkFBZ0IsRUFBRSxRQUFRO2dCQUMxQixhQUFhLEVBQUUsa0JBQWtCO2dCQUNqQyxtQkFBbUIsRUFBRSxvQ0FBb0M7Z0JBQ3pELFlB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