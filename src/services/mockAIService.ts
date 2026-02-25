/**
 * @file services/mockAIService.ts
 * @author leon.wang
 */

import { ChatMessage } from './aiService';

/**
 * Mock AI responses for different scenarios
 * 预设的 AI 回答库
 */
const MOCK_RESPONSES = {
  greetings: [
    '你好！我是 AI 助手，很高兴为您服务！有什么我可以帮助您的吗？',
    'Hi! 我在这里随时准备帮助您！请问有什么问题吗？',
    '您好！我是您的智能助手，随时为您效劳！',
  ],
  code: [
    '这段代码看起来不错！建议您可以考虑添加更多的错误处理逻辑，确保代码的健壮性。',
    '代码结构清晰！不过建议使用 TypeScript 来增强类型安全。可以考虑：\n1. 添加接口定义\n2. 使用泛型提高复用性\n3. 添加单元测试',
    '关于这段代码，我有几点建议：\n• 考虑使用函数式编程，减少副作用\n• 添加注释说明复杂逻辑\n• 注意性能优化，避免不必要的重复计算',
  ],
  react: [
    'React 是一个优秀的前端框架！建议您：\n1. 使用 Hooks 替代 Class 组件\n2. 合理使用 useMemo 和 useCallback 优化性能\n3. 遵循单一职责原则，保持组件简洁',
    '在 React 开发中，推荐使用函数组件 + Hooks。关键要点：\n• useState 管理状态\n• useEffect 处理副作用\n• useContext 共享全局状态\n• 自定义 Hooks 实现逻辑复用',
    'React 最佳实践：\n✓ 组件拆分要适度\n✓ Props 类型定义要清晰\n✓ 避免过度渲染\n✓ 使用 React.memo 优化组件',
  ],
  typescript: [
    'TypeScript 能大大提升代码质量！建议：\n• 充分利用类型推断\n• 使用接口定义数据结构\n• 善用联合类型和交叉类型\n• 避免使用 any',
    '关于 TypeScript，这里有些技巧：\n1. 使用 type 和 interface 定义类型\n2. 利用泛型提高代码复用性\n3. 使用 utility types 简化类型操作\n4. 配置严格模式提高类型检查',
  ],
  performance: [
    '性能优化建议：\n1. 使用 React.lazy 进行代码分割\n2. 实现虚拟滚动处理大列表\n3. 使用 Web Workers 处理密集计算\n4. 优化图片加载（懒加载、WebP 格式）',
    '提升应用性能的关键点：\n• 减少首屏加载时间\n• 使用缓存策略\n• 优化网络请求（合并、压缩）\n• 避免内存泄漏',
    '性能优化清单：\n✓ 代码分割和懒加载\n✓ Tree Shaking 去除无用代码\n✓ 图片优化\n✓ 使用 CDN\n✓ 启用 HTTP/2\n✓ 服务端渲染（SSR）',
  ],
  debugging: [
    '调试建议：\n1. 使用 console.log 打印关键变量\n2. 利用浏览器 DevTools 的断点功能\n3. 检查网络请求是否正常\n4. 查看 React DevTools 组件树',
    '遇到 Bug 时的排查步骤：\n• 复现问题\n• 隔离问题代码\n• 逐步注释代码定位\n• 使用断点调试\n• 查看控制台错误信息',
    '调试技巧：\n✓ 使用 debugger 语句\n✓ 善用浏览器开发工具\n✓ 启用 source maps\n✓ 使用 Error Boundary 捕获错误',
  ],
  css: [
    'CSS 最佳实践：\n• 使用 Flexbox 和 Grid 布局\n• 采用 BEM 命名规范\n• 使用 CSS 变量管理主题\n• 避免使用 !important',
    '现代 CSS 技巧：\n1. CSS Grid 强大的布局能力\n2. CSS 变量实现主题切换\n3. clamp() 函数实现响应式\n4. :has() 选择器（父级选择器）',
  ],
  api: [
    'API 设计建议：\n• 使用 RESTful 风格\n• 统一的错误处理\n• 添加请求限流\n• 实现接口版本控制\n• 完善的文档',
    '关于 API 集成：\n1. 使用 axios 进行请求封装\n2. 实现请求拦截器统一处理\n3. 添加请求重试机制\n4. 处理并发请求去重',
  ],
  general: [
    '这是个很好的问题！让我想想...\n这个话题确实值得深入探讨。建议您可以从以下几个方面考虑：\n1. 明确需求和目标\n2. 评估技术可行性\n3. 考虑维护成本\n4. 参考业界最佳实践',
    '非常好的想法！我的建议是：\n• 先制定详细的计划\n• 分阶段实施\n• 保持代码整洁\n• 注重测试覆盖\n• 及时重构优化',
    '关于这个问题，我觉得可以这样思考：\n📌 分析当前状况\n📌 明确目标\n📌 制定方案\n📌 实施验证\n📌 持续改进',
    '这确实是个值得关注的话题！建议您：\n✓ 多参考优秀的开源项目\n✓ 阅读官方文档\n✓ 实践中不断总结\n✓ 关注社区最新动态',
  ],
  questions: [
    '让我来帮您分析一下这个问题...\n根据您的描述，我建议从以下几个角度入手：',
    '这是个常见但重要的问题。我的理解是：',
    '关于您提到的这个问题，我有以下看法：',
  ],
  thanks: [
    '不客气！很高兴能帮到您！如果还有其他问题，随时欢迎提问！😊',
    '很高兴能为您效劳！祝您开发顺利！🚀',
    '不用谢！这是我应该做的。还有什么需要帮助的吗？',
  ],
  unknown: [
    '这个问题很有意思！虽然我对这个领域了解有限，但我建议您可以：\n• 查阅官方文档\n• 参考社区讨论\n• 尝试不同的解决方案\n• 向有经验的开发者请教',
    '抱歉，我可能需要更多信息才能给出准确的建议。能否提供更多细节？比如：\n- 具体的使用场景\n- 遇到的具体问题\n- 已经尝试过的方案',
    '这个话题确实比较专业！建议您：\n1. 阅读相关技术文档\n2. 查看示例代码\n3. 在开发社区提问\n4. 尝试实践验证',
  ],
};

/**
 * Mock AI Service
 * Simulates AI responses without requiring an API key
 */
export class MockAIService {
  /**
   * Detect question category based on keywords
   */
  private detectCategory(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (/^(hi|hello|你好|您好|hey|嗨)/i.test(message)) {
      return 'greetings';
    }

    // Thanks
    if (/(谢谢|感谢|thanks|thank you)/i.test(lowerMessage)) {
      return 'thanks';
    }

    // Code related
    if (/(代码|code|函数|function|bug|错误|error)/i.test(lowerMessage)) {
      return 'code';
    }

    // React related
    if (/(react|组件|component|hook|state|props)/i.test(lowerMessage)) {
      return 'react';
    }

    // TypeScript related
    if (/(typescript|ts|类型|type|interface|泛型)/i.test(lowerMessage)) {
      return 'typescript';
    }

    // Performance
    if (/(性能|优化|performance|慢|slow|卡顿)/i.test(lowerMessage)) {
      return 'performance';
    }

    // Debugging
    if (/(调试|debug|排查|问题|报错)/i.test(lowerMessage)) {
      return 'debugging';
    }

    // CSS
    if (/(css|样式|style|布局|layout|响应式)/i.test(lowerMessage)) {
      return 'css';
    }

    // API
    if (/(api|接口|请求|request|axios|fetch)/i.test(lowerMessage)) {
      return 'api';
    }

    // Questions
    if (/(怎么|如何|为什么|能不能|可以吗|how|why|can|what)/i.test(lowerMessage)) {
      return 'questions';
    }

    return 'general';
  }

  /**
   * Get random response from category
   */
  private getRandomResponse(category: string): string {
    const responses = MOCK_RESPONSES[category] || MOCK_RESPONSES.unknown;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  /**
   * Simulate typing delay
   */
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Send mock message with streaming effect
   */
  async sendMessage(
    messages: ChatMessage[],
    onProgress?: (text: string) => void
  ): Promise<string> {
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      throw new Error('No user message found');
    }

    // Detect category and get response
    const category = this.detectCategory(lastMessage.content);
    const response = this.getRandomResponse(category);

    // If streaming is enabled, simulate typing effect
    if (onProgress) {
      let currentText = '';
      const words = response.split('');

      for (let i = 0; i < words.length; i++) {
        currentText += words[i];
        onProgress(currentText);

        // Random delay between 20-50ms to simulate typing
        const delayTime = Math.random() * 30 + 20;
        await this.delay(delayTime);
      }

      return response;
    }

    // If no streaming, add a small delay to make it more realistic
    await this.delay(500 + Math.random() * 500);
    return response;
  }

  /**
   * Test connection (always succeeds for mock)
   */
  async testConnection(): Promise<boolean> {
    await this.delay(500);
    return true;
  }
}

export const mockAIService = new MockAIService();
