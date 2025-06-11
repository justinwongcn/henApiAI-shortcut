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
            key: 'apiKey',
            label: t('apiKeyLabel'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: t('apiKeyPlaceholder'),
                type: 'text',
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
                style: { display: 'block' }
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
        const { apiKey, customModel, inputField, prompt } = formItemParams;
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
            const apiEndpoints = {
                HenApi: 'https://www.henapi.top/v1/chat/completions'
            };
            /** 大模型名称 */
            const name = 'HenApi';
            // 修改这行，移除 customUrl 相关逻辑
            const apiUrl = apiEndpoints[name];
            const isReasonerModel = customModel === 'deepseek-reasoner';
            const requestBody = {
                model: customModel,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBNEc7QUFDNUcsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsYUFBYTtBQUNiLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLGdCQUFnQjtDQUNqQixDQUFDO0FBRUYsY0FBYztBQUNkLGtDQUFPLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXRDLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsVUFBVTtJQUNWLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxlQUFlLEVBQUUsT0FBTztnQkFDeEIsZ0JBQWdCLEVBQUUsUUFBUTtnQkFDMUIsYUFBYSxFQUFFLGFBQWE7Z0JBQzVCLG1CQUFtQixFQUFFLGtCQUFrQjtnQkFDdkMsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixtQkFBbUIsRUFBRSxPQUFPO2dCQUM1QixXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxXQUFXLEVBQUUsTUFBTTtnQkFDbkIsaUJBQWlCLEVBQUUsZ0JBQWdCO2dCQUNuQyxnQkFBZ0IsRUFBRSxjQUFjO2dCQUNoQyxpQkFBaUIsRUFBRSxjQUFjO2dCQUNqQyxvQkFBb0IsRUFBRSxZQUFZO2dCQUNsQyxjQUFjLEVBQUUsWUFBWTtnQkFDNUIsa0JBQWtCLEVBQUUsT0FBTztnQkFDM0Isd0JBQXdCLEVBQUUsU0FBUzthQUNwQztZQUNELE9BQU8sRUFBRTtnQkFDUCxlQUFlLEVBQUUsa0JBQWtCO2dCQUNuQyxnQkFBZ0IsRUFBRSxRQUFRO2dCQUMxQixhQUFhLEVBQUUsa0JBQWtCO2dCQUNqQyxtQkFBbUIsRUFBRSxvQ0FBb0M7Z0JBQ3pELFlBQVksRUFBRSxPQUFPO2dCQUNyQixhQUFhLEVBQUUsZUFBZTtnQkFDOUIsbUJBQW1C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