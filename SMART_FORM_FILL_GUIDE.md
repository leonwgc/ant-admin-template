# 智能表单填充技术详解

## 🎯 什么是智能表单填充？

**智能表单填充**（AI-Powered Form Auto-Fill）是利用 AI 技术自动分析和填充表单的功能，它能够：

- 🤖 理解表单字段含义
- 💡 根据上下文智能生成内容
- ⚡ 提高填表效率
- 🎯 减少人工错误
- 📝 学习用户习惯

---

## 🌟 应用场景

### 1. 用户信息表单
```typescript
// AI 根据姓名生成邮箱
输入: 姓名 "张三"
AI 填充:
  - 邮箱: zhangsan@company.com
  - 英文名: Zhang San
  - 用户名: zhangsan
```

### 2. 地址信息表单
```typescript
// AI 根据邮编补全地址
输入: 邮编 "100000"
AI 填充:
  - 国家: 中国
  - 省份: 北京市
  - 城市: 北京市
  - 时区: Asia/Shanghai
```

### 3. 职位申请表单
```typescript
// AI 根据简历生成表单内容
输入: 上传简历 PDF
AI 提取并填充:
  - 姓名、联系方式
  - 工作经验
  - 技能标签
  - 教育背景
```

### 4. 商品信息表单
```typescript
// AI 根据产品名称生成描述
输入: 产品名 "iPhone 15 Pro"
AI 填充:
  - 分类: 电子产品 > 手机
  - 品牌: Apple
  - 描述: 自动生成产品描述
  - 关键词: 智能手机, iOS, A17芯片
```

---

## 🏗️ 技术实现方案

### 方案一：基于 AI API 的智能填充

#### 1. 单字段智能建议

```typescript
/**
 * 智能表单填充 Hook
 */
import { useState } from 'react';
import { aiService } from '~/services/aiService';

interface SmartFillOptions {
  fieldName: string;      // 字段名
  fieldLabel: string;     // 字段标签
  context?: object;       // 上下文（其他字段值）
  suggestions?: number;   // 建议数量
}

export const useSmartFill = () => {
  const [loading, setLoading] = useState(false);

  /**
   * 获取字段智能填充建议
   */
  const getSuggestions = async (
    options: SmartFillOptions
  ): Promise<string[]> => {
    setLoading(true);

    try {
      // 构建提示词
      const prompt = `
        请为以下表单字段提供 ${options.suggestions || 3} 个合适的填充建议：

        字段名: ${options.fieldName}
        字段标签: ${options.fieldLabel}
        ${options.context ? `上下文信息: ${JSON.stringify(options.context, null, 2)}` : ''}

        要求：
        1. 建议要符合字段的语义和类型
        2. 考虑上下文信息的相关性
        3. 每个建议独立一行，不要编号
        4. 建议要实用且多样化
      `;

      const response = await aiService.sendMessage([
        { id: '1', role: 'user', content: prompt, timestamp: Date.now() }
      ]);

      // 解析 AI 返回的建议
      const suggestions = response
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.match(/^\d+\./));

      return suggestions.slice(0, options.suggestions || 3);

    } catch (error) {
      console.error('智能填充失败:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { getSuggestions, loading };
};
```

#### 2. 整个表单智能填充

```typescript
/**
 * 智能表单填充服务
 */
export class SmartFormFillService {
  /**
   * 根据部分信息自动填充整个表单
   */
  async autoFillForm(
    formSchema: FormSchema,
    partialData: Partial<FormValues>
  ): Promise<FormValues> {

    const prompt = `
      我有一个表单需要填写，已知的信息如下：
      ${JSON.stringify(partialData, null, 2)}

      表单结构：
      ${this.describeFormSchema(formSchema)}

      请根据已知信息，智能推测并填充其他字段。
      返回完整的 JSON 格式数据。
    `;

    const response = await aiService.sendMessage([
      { id: '1', role: 'user', content: prompt, timestamp: Date.now() }
    ]);

    // 解析 AI 返回的 JSON
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('AI 返回格式错误');
  }

  private describeFormSchema(schema: FormSchema): string {
    return schema.fields
      .map(field => `- ${field.name}: ${field.label} (${field.type})`)
      .join('\n');
  }
}
```

---

### 方案二：基于规则的智能填充

```typescript
/**
 * 规则引擎智能填充
 */
export class RuleBasedAutoFill {
  private rules: AutoFillRule[] = [];

  /**
   * 注册填充规则
   */
  registerRule(rule: AutoFillRule) {
    this.rules.push(rule);
  }

  /**
   * 执行填充
   */
  async fill(
    fieldName: string,
    currentValues: Record<string, any>
  ): Promise<any> {

    for (const rule of this.rules) {
      if (rule.matches(fieldName, currentValues)) {
        return await rule.fill(fieldName, currentValues);
      }
    }

    return null;
  }
}

/**
 * 示例规则：根据姓名生成邮箱
 */
class NameToEmailRule implements AutoFillRule {
  matches(field: string, values: any): boolean {
    return field === 'email' && values.firstName && values.lastName;
  }

  async fill(field: string, values: any): Promise<string> {
    const { firstName, lastName } = values;
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    return `${username}@company.com`;
  }
}

/**
 * 示例规则：根据邮编填充城市
 */
class ZipToCityRule implements AutoFillRule {
  private zipDatabase = {
    '100000': { city: '北京', province: '北京市', country: '中国' },
    '200000': { city: '上海', province: '上海市', country: '中国' },
    // ... 更多数据
  };

  matches(field: string, values: any): boolean {
    return ['city', 'province', 'country'].includes(field) && values.zipCode;
  }

  async fill(field: string, values: any): Promise<string> {
    const info = this.zipDatabase[values.zipCode];
    return info?.[field] || null;
  }
}
```

---

### 方案三：混合模式（推荐）

结合 AI 和规则引擎的优势：

```typescript
/**
 * 混合智能填充服务
 */
export class HybridSmartFillService {
  constructor(
    private aiService: AIService,
    private ruleEngine: RuleBasedAutoFill
  ) {}

  /**
   * 智能填充字段
   */
  async fillField(
    fieldName: string,
    currentValues: Record<string, any>
  ): Promise<any> {

    // 1. 优先使用规则引擎（快速、可靠）
    const ruleResult = await this.ruleEngine.fill(fieldName, currentValues);
    if (ruleResult !== null) {
      return ruleResult;
    }

    // 2. 规则不匹配时使用 AI（灵活、智能）
    const aiResult = await this.aiService.smartFill({
      fieldName,
      context: currentValues
    });

    return aiResult;
  }
}
```

---

## 🎨 React 组件实现

### 1. 智能输入框组件

```tsx
/**
 * @file components/SmartInput/SmartInput.tsx
 * 带智能建议的输入框
 */
import React, { FC, useState, useEffect } from 'react';
import { Input, Tooltip, Spin } from '@derbysoft/neat-design';
import { BulbOutlined } from '@ant-design/icons';
import { useSmartFill } from '~/hooks/useSmartFill';

interface SmartInputProps {
  value?: string;
  onChange?: (value: string) => void;
  fieldName: string;
  fieldLabel: string;
  context?: Record<string, any>;
  placeholder?: string;
}

export const SmartInput: FC<SmartInputProps> = ({
  value,
  onChange,
  fieldName,
  fieldLabel,
  context,
  placeholder,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { getSuggestions, loading } = useSmartFill();

  const handleSmartFill = async () => {
    const results = await getSuggestions({
      fieldName,
      fieldLabel,
      context,
    });
    setSuggestions(results);
    setShowSuggestions(true);
  };

  return (
    <div className="smart-input">
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        suffix={
          <Tooltip title="AI 智能建议">
            <BulbOutlined
              onClick={handleSmartFill}
              style={{
                cursor: 'pointer',
                color: loading ? '#1890ff' : '#999'
              }}
            />
          </Tooltip>
        }
      />

      {loading && <Spin size="small" />}

      {showSuggestions && suggestions.length > 0 && (
        <div className="smart-input__suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="smart-input__suggestion-item"
              onClick={() => {
                onChange?.(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

### 2. 智能表单组件

```tsx
/**
 * @file components/SmartForm/SmartForm.tsx
 * 支持智能填充的表单
 */
import React, { FC } from 'react';
import { Form, Button, message } from '@derbysoft/neat-design';
import { RobotOutlined } from '@ant-design/icons';
import { SmartFormFillService } from '~/services/smartFormFillService';

interface SmartFormProps {
  onFinish: (values: any) => void;
}

export const SmartForm: FC<SmartFormProps> = ({ onFinish }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  /**
   * AI 一键智能填充
   */
  const handleSmartFill = async () => {
    setLoading(true);
    try {
      // 获取当前已填写的值
      const currentValues = form.getFieldsValue();

      // 调用 AI 智能填充
      const smartFillService = new SmartFormFillService();
      const filledValues = await smartFillService.autoFillForm(
        formSchema,
        currentValues
      );

      // 设置表单值
      form.setFieldsValue(filledValues);
      message.success('AI 智能填充完成！');

    } catch (error) {
      message.error('智能填充失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      {/* 智能填充按钮 */}
      <Button
        icon={<RobotOutlined />}
        onClick={handleSmartFill}
        loading={loading}
        style={{ marginBottom: 16 }}
      >
        AI 智能填充
      </Button>

      {/* 表单字段 */}
      <Form.Item name="name" label="姓名">
        <SmartInput
          fieldName="name"
          fieldLabel="姓名"
          context={form.getFieldsValue()}
        />
      </Form.Item>

      <Form.Item name="email" label="邮箱">
        <SmartInput
          fieldName="email"
          fieldLabel="邮箱"
          context={form.getFieldsValue()}
        />
      </Form.Item>

      {/* 更多字段... */}

      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  );
};
```

---

## 💡 高级特性

### 1. 实时智能联动

```typescript
/**
 * 字段联动填充
 */
const SmartFormWithLinkage: FC = () => {
  const [form] = Form.useForm();

  // 监听字段变化，自动填充关联字段
  const handleFieldChange = async (changedFields: any) => {
    const fieldName = Object.keys(changedFields)[0];

    if (fieldName === 'firstName' || fieldName === 'lastName') {
      // 姓名变化 → 自动生成邮箱
      const { firstName, lastName } = form.getFieldsValue();
      if (firstName && lastName) {
        const email = `${firstName}.${lastName}@company.com`.toLowerCase();
        form.setFieldValue('email', email);
      }
    }

    if (fieldName === 'country') {
      // 国家变化 → 自动填充时区
      const country = form.getFieldValue('country');
      const timezone = await getTimezoneByCountry(country);
      form.setFieldValue('timezone', timezone);
    }
  };

  return (
    <Form form={form} onValuesChange={handleFieldChange}>
      {/* 表单字段 */}
    </Form>
  );
};
```

### 2. 历史记录学习

```typescript
/**
 * 基于历史填充记录的智能建议
 */
export class SmartFillHistory {
  private storage = new Map<string, string[]>();

  /**
   * 记录用户填充的值
   */
  record(fieldName: string, value: string) {
    if (!this.storage.has(fieldName)) {
      this.storage.set(fieldName, []);
    }

    const history = this.storage.get(fieldName)!;

    // 去重并添加
    if (!history.includes(value)) {
      history.unshift(value);

      // 只保留最近 10 条
      if (history.length > 10) {
        history.pop();
      }
    }
  }

  /**
   * 获取历史建议
   */
  getSuggestions(fieldName: string): string[] {
    return this.storage.get(fieldName) || [];
  }
}
```

### 3. OCR 图片识别填充

```typescript
/**
 * OCR 识别身份证/名片自动填充
 */
export class OCRAutoFill {
  async fillFromImage(
    imageFile: File,
    formType: 'idCard' | 'businessCard'
  ): Promise<Record<string, any>> {

    // 1. 上传图片到 OCR 服务
    const ocrResult = await this.ocrService.recognize(imageFile);

    // 2. 解析识别结果
    const extracted = this.parseOCRResult(ocrResult, formType);

    // 3. 返回结构化数据
    return extracted;
  }

  private parseOCRResult(result: any, type: string) {
    if (type === 'idCard') {
      return {
        name: result.name,
        idNumber: result.idNumber,
        address: result.address,
        // ...
      };
    }

    if (type === 'businessCard') {
      return {
        name: result.name,
        company: result.company,
        title: result.title,
        phone: result.phone,
        email: result.email,
        // ...
      };
    }
  }
}
```

---

## 🎯 完整示例：用户注册表单

```tsx
/**
 * @file pages/Form/SmartRegistrationForm.tsx
 * 智能用户注册表单完整示例
 */
import React, { FC, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Space,
  message,
  Upload,
} from '@derbysoft/neat-design';
import { RobotOutlined, UploadOutlined } from '@ant-design/icons';
import { SmartInput } from '~/components/SmartInput';
import { SmartFormFillService } from '~/services/smartFormFillService';
import { OCRAutoFill } from '~/services/ocrAutoFill';

const SmartRegistrationForm: FC = () => {
  const [form] = Form.useForm();
  const [aiLoading, setAiLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);

  /**
   * AI 智能填充整个表单
   */
  const handleAIFill = async () => {
    setAiLoading(true);
    try {
      const currentValues = form.getFieldsValue();
      const smartFillService = new SmartFormFillService();

      const filledValues = await smartFillService.autoFillForm(
        {
          fields: [
            { name: 'username', label: '用户名', type: 'string' },
            { name: 'email', label: '邮箱', type: 'email' },
            { name: 'phone', label: '手机号', type: 'phone' },
            { name: 'company', label: '公司', type: 'string' },
            { name: 'title', label: '职位', type: 'string' },
          ]
        },
        currentValues
      );

      form.setFieldsValue(filledValues);
      message.success('AI 智能填充完成！');
    } catch (error) {
      message.error('智能填充失败');
    } finally {
      setAiLoading(false);
    }
  };

  /**
   * OCR 识别名片自动填充
   */
  const handleOCRFill = async (file: File) => {
    setOcrLoading(true);
    try {
      const ocrService = new OCRAutoFill();
      const extracted = await ocrService.fillFromImage(file, 'businessCard');

      form.setFieldsValue(extracted);
      message.success('名片识别完成！');
    } catch (error) {
      message.error('识别失败');
    } finally {
      setOcrLoading(false);
    }
  };

  /**
   * 字段联动
   */
  const handleValuesChange = (changedValues: any, allValues: any) => {
    // 姓名变化 → 自动生成用户名和邮箱
    if (changedValues.name) {
      const username = changedValues.name.toLowerCase().replace(/\s+/g, '');
      form.setFieldValue('username', username);

      if (!allValues.email) {
        form.setFieldValue('email', `${username}@example.com`);
      }
    }

    // 公司变化 → 自动填充邮箱域名
    if (changedValues.company && allValues.username) {
      const domain = changedValues.company.toLowerCase().replace(/\s+/g, '');
      form.setFieldValue('email', `${allValues.username}@${domain}.com`);
    }
  };

  return (
    <Card title="智能用户注册" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<RobotOutlined />}
          onClick={handleAIFill}
          loading={aiLoading}
        >
          AI 智能填充
        </Button>

        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={(file) => {
            handleOCRFill(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />} loading={ocrLoading}>
            识别名片填充
          </Button>
        </Upload>
      </Space>

      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        onFinish={(values) => {
          console.log('提交:', values);
          message.success('注册成功！');
        }}
      >
        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <SmartInput
            fieldName="name"
            fieldLabel="姓名"
            placeholder="请输入姓名"
          />
        </Form.Item>

        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <SmartInput
            fieldName="username"
            fieldLabel="用户名"
            context={form.getFieldsValue()}
            placeholder="自动生成或手动输入"
          />
        </Form.Item>

        <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
          <SmartInput
            fieldName="email"
            fieldLabel="邮箱"
            context={form.getFieldsValue()}
            placeholder="自动生成或手动输入"
          />
        </Form.Item>

        <Form.Item name="phone" label="手机号">
          <SmartInput
            fieldName="phone"
            fieldLabel="手机号"
            placeholder="请输入手机号"
          />
        </Form.Item>

        <Form.Item name="company" label="公司">
          <SmartInput
            fieldName="company"
            fieldLabel="公司"
            placeholder="请输入公司名称"
          />
        </Form.Item>

        <Form.Item name="title" label="职位">
          <SmartInput
            fieldName="title"
            fieldLabel="职位"
            context={form.getFieldsValue()}
            placeholder="AI 可根据公司智能推荐"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            注册
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SmartRegistrationForm;
```

---

## 📊 性能优化

### 1. 防抖处理

```typescript
import { debounce } from 'lodash';

const debouncedSmartFill = debounce(async (fieldName, context) => {
  const suggestions = await getSuggestions({ fieldName, context });
  setSuggestions(suggestions);
}, 500);
```

### 2. 缓存策略

```typescript
const cache = new Map<string, any>();

async function getCachedSuggestions(key: string, fetcher: () => Promise<any>) {
  if (cache.has(key)) {
    return cache.get(key);
  }

  const result = await fetcher();
  cache.set(key, result);
  return result;
}
```

### 3. 批量处理

```typescript
// 一次 API 调用填充多个字段
async function batchFill(fields: string[]): Promise<Record<string, any>> {
  const prompt = `请一次性为以下字段提供建议：${fields.join(', ')}`;
  const response = await aiService.sendMessage([...]);
  return parseMultiFieldResponse(response);
}
```

---

## 🎓 总结

智能表单填充的核心要素：

1. **AI 理解** - 理解字段语义和上下文
2. **规则引擎** - 快速处理常见场景
3. **用户体验** - 非侵入式建议，用户可选择
4. **数据安全** - 本地处理敏感信息
5. **性能优化** - 缓存、防抖、批量处理

---

## 🚀 下一步

想要实现智能表单填充功能吗？我可以帮您：

1. ✅ 创建 `SmartInput` 智能输入组件
2. ✅ 实现 `useSmartFill` Hook
3. ✅ 集成到现有表单页面
4. ✅ 添加规则引擎支持
5. ✅ 实现 OCR 识别填充

需要我为您实现这些功能吗？
