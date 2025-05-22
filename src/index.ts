import { basekit, FieldType, field, FieldComponent, FieldCode } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

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
basekit.addDomainList(allowedDomains);

basekit.addField({
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
      component: FieldComponent.SingleSelect,
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
      component: FieldComponent.Input,
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
      component: FieldComponent.SingleSelect,
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
      component: FieldComponent.Input,
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
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text],
      },
      validator: {
        required: true,
      },
    },
    {
      key: 'prompt',
      label: t('promptLabel'),
      component: FieldComponent.Input,
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
    type: FieldType.Text,// 定义捷径的返回结果类型为多行文本字段
  },
  // 执行函数
  execute: async (formItemParams, context) => {
    const { apiKey, model, customModel, inputField, prompt, provider } = formItemParams;
    const { fetch } = context;

    /** 为方便查看日志，使用此方法替代console.log */
    function debugLog(arg: any) {
      // @ts-ignore
      console.log(JSON.stringify({
        formItemParams,
        context,
        arg
      }))
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
          code: FieldCode.Success,
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
      const name = provider?.value || 'deepseek'
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
        const errorText = responseText

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
            code: FieldCode.Success,
            data: `${name} API认证失败，请检查字段关联账号配置。 ${response.status} ${errorText}`,
          };
        } else if (response.status === 429) {
          // 错误原因明确。直接以success形式返回错误原因
          return {
            code: FieldCode.Success,
            data: `${name} 大模型接口限流，请到你所选模型的对应平台根据平台规则进行调整。 ${response.status} ${errorText}`
          };
        }
        return {
          code: FieldCode.Success,
          data: `接口返回异常，请到你所选模型的对应平台根据平台规则进行调整：${response.status} ${errorText}`
        };
      }

      let data;
      try {
        if (!responseText) {
          return {
            code: FieldCode.Success,
            data: "AI分析内容为空，请修改提示词重试～",
          };
        }

        data = JSON.parse(responseText);
      } catch (error) {
        debugLog({
          '===3 解析为JSON失败': {
            status: response.status,
            responseText,
          }
        });
        return {
          code: FieldCode.Success,
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
          code: FieldCode.Success,
          data: `${name} 大模型接口返回错误码 ${String(data.error)}，请到大模型平台查看错误原因`,
        };
      }


      return {
        code: FieldCode.Success,
        // data: data.choices[0].message.content.trim(),
        data: JSON.stringify({ data }), // 此处直接返回原始结果。需要根据具体接口/业务进行取值调整。
      };
    } catch (error) {

      debugLog({
        '===999 异常错误': String(error)
      });
      /** 返回非 Success 的错误码，将会在单元格上显示报错，请勿返回msg、message之类的字段，它们并不会起作用。
       * 对于未知错误，请直接返回 FieldCode.Error，然后通过查日志来排查错误原因，或者直接将错误以success返回。
       */
      return {
        code: FieldCode.Success,
        data: `异常错误：${String(error)}`
      }
    }
  },
});

export default basekit;