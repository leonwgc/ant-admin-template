/**
 * @file pages/AI/AISettings.tsx
 * @author leon.wang
 */
import React, { FC, useState, useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Card,
  Space,
  message,
  Alert,
  Divider,
} from '@derbysoft/neat-design';
import { useTranslation } from 'react-i18next';
import { aiService, AIConfig } from '~/services/aiService';
import './AISettings.scss';

const { TextArea } = Input;
const { Option } = Select;

/**
 * AI Assistant Settings Page
 * Configure API keys, model parameters, and behavior
 */
const AISettings: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    // Load current config
    const config = aiService.getConfig();
    form.setFieldsValue(config);
  }, [form]);

  const handleSave = async (values: AIConfig) => {
    setLoading(true);
    try {
      aiService.saveConfig(values);
      message.success(t('pages.ai:aiMsgSaveSuccess'));
    } catch (error) {
      const err = error as Error;
      message.error(err.message || t('pages.ai:aiMsgSaveError'));
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    setTestLoading(true);
    try {
      const values = form.getFieldsValue();
      aiService.saveConfig(values);
      const success = await aiService.testConnection();
      if (success) {
        message.success(t('pages.ai:aiMsgTestSuccess'));
      } else {
        message.error(t('pages.ai:aiMsgTestError'));
      }
    } catch (error) {
      const err = error as Error;
      message.error(err.message || t('pages.ai:aiMsgTestError'));
    } finally {
      setTestLoading(false);
    }
  };

  const handleReset = () => {
    aiService.resetConfig();
    const config = aiService.getConfig();
    form.setFieldsValue(config);
    message.success(t('pages.ai:aiMsgSaveSuccess'));
  };

  return (
    <div className="ai-settings">
      <div className="ai-settings__header">
        <h1 className="ai-settings__title">{t('pages.ai:aiSettingsTitle')}</h1>
        <p className="ai-settings__desc">{t('pages.ai:aiSettingsDesc')}</p>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={aiService.getConfig()}
        >
          {/* Enable/Disable */}
          <Form.Item
            name="enabled"
            label={t('pages.ai:aiSettingsFormEnabled')}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Divider />

          {/* API Key */}
          <Form.Item
            name="apiKey"
            label={t('pages.ai:aiSettingsFormApiKey')}
            rules={[{ required: true, message: t('pages.ai:aiMsgApiKeyRequired') }]}
            help={t('pages.ai:aiSettingsHelpApiKey')}
          >
            <Input.Password
              placeholder={t('pages.ai:aiSettingsFormApiKeyPh')}
              autoComplete="off"
            />
          </Form.Item>

          {/* Model */}
          <Form.Item
            name="model"
            label={t('pages.ai:aiSettingsFormModel')}
            rules={[{ required: true }]}
          >
            <Select placeholder={t('pages.ai:aiSettingsFormModelPh')}>
              <Option value="gpt-4">{t('pages.ai:aiModelGpt4')}</Option>
              <Option value="gpt-3.5-turbo">{t('pages.ai:aiModelGpt35')}</Option>
              <Option value="gpt-4o-mini">{t('pages.ai:aiModelGpt4Mini')}</Option>
            </Select>
          </Form.Item>

          <Divider />

          {/* Temperature */}
          <Form.Item
            name="temperature"
            label={t('pages.ai:aiSettingsFormTemperature')}
            help={t('pages.ai:aiSettingsHelpTemperature')}
          >
            <InputNumber
              min={0}
              max={2}
              step={0.1}
              style={{ width: '100%' }}
              placeholder={t('pages.ai:aiSettingsFormTemperaturePh')}
            />
          </Form.Item>

          {/* Max Tokens */}
          <Form.Item
            name="maxTokens"
            label={t('pages.ai:aiSettingsFormMaxTokens')}
            help={t('pages.ai:aiSettingsHelpMaxTokens')}
          >
            <InputNumber
              min={100}
              max={4000}
              step={100}
              style={{ width: '100%' }}
              placeholder={t('pages.ai:aiSettingsFormMaxTokensPh')}
            />
          </Form.Item>

          <Divider />

          {/* System Prompt */}
          <Form.Item
            name="systemPrompt"
            label={t('pages.ai:aiSettingsFormSystemPrompt')}
            help={t('pages.ai:aiSettingsHelpSystemPrompt')}
          >
            <TextArea
              rows={6}
              placeholder={t('pages.ai:aiSettingsFormSystemPromptPh')}
            />
          </Form.Item>

          <Alert
            message="提示"
            description="为了保护您的 API 密钥安全，所有配置信息仅保存在浏览器本地存储中，不会上传到服务器。"
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          {/* Actions */}
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {t('pages.ai:aiSettingsBtnSave')}
              </Button>
              <Button onClick={handleTest} loading={testLoading}>
                {t('pages.ai:aiSettingsBtnTest')}
              </Button>
              <Button onClick={handleReset}>{t('pages.ai:aiSettingsBtnReset')}</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card title="使用说明" style={{ marginTop: 24 }}>
        <div className="ai-settings__help">
          <h3>如何获取 OpenAI API 密钥？</h3>
          <ol>
            <li>访问 <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer">OpenAI 官网</a></li>
            <li>注册并登录账号</li>
            <li>进入 API Keys 页面创建新的密钥</li>
            <li>将密钥复制到上方表单中</li>
          </ol>

          <h3>模型选择建议</h3>
          <ul>
            <li><strong>GPT-4:</strong> 最强大的模型，适合复杂任务，但响应较慢且成本较高</li>
            <li><strong>GPT-3.5 Turbo:</strong> 平衡性能和成本，适合大多数场景</li>
            <li><strong>GPT-4 Mini:</strong> 快速响应，适合简单对话</li>
          </ul>

          <h3>参数说明</h3>
          <ul>
            <li><strong>温度 (Temperature):</strong> 0-2之间，越低越确定，越高越随机</li>
            <li><strong>最大令牌数:</strong> 控制回复长度，通常 100-2000 之间</li>
            <li><strong>系统提示词:</strong> 定义 AI 的角色和行为方式</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default AISettings;
