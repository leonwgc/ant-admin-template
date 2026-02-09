/**
 * @file utils/errorMonitor.ts
 * @author leon.wang
 */

import { ErrorInfo } from 'react';

/**
 * 错误类型枚举
 */
export enum ErrorType {
  /** React 渲染错误 */
  REACT_ERROR = 'react_error',
  /** JavaScript 运行时错误 */
  JS_ERROR = 'js_error',
  /** Promise 未捕获的 rejection */
  PROMISE_ERROR = 'promise_error',
  /** 资源加载错误 */
  RESOURCE_ERROR = 'resource_error',
  /** 网络请求错误 */
  NETWORK_ERROR = 'network_error',
}

/**
 * 错误级别
 */
export enum ErrorLevel {
  /** 低级别 - 不影响核心功能 */
  INFO = 'info',
  /** 警告 - 可能影响部分功能 */
  WARNING = 'warning',
  /** 错误 - 影响功能使用 */
  ERROR = 'error',
  /** 严重 - 影响核心功能或导致崩溃 */
  FATAL = 'fatal',
}

/**
 * 错误信息接口
 */
export interface ErrorReport {
  /** 错误 ID */
  id: string;
  /** 错误类型 */
  type: ErrorType;
  /** 错误级别 */
  level: ErrorLevel;
  /** 错误消息 */
  message: string;
  /** 错误堆栈 */
  stack?: string;
  /** 组件堆栈（仅 React 错误） */
  componentStack?: string;
  /** 发生错误的页面 URL */
  url: string;
  /** 用户代理信息 */
  userAgent: string;
  /** 时间戳 */
  timestamp: number;
  /** 用户信息（如果有） */
  userId?: string;
  /** 额外的上下文信息 */
  extra?: Record<string, unknown>;
}

/**
 * 错误监控配置
 */
export interface ErrorMonitorConfig {
  /** 错误上报的 API 端点 */
  endpoint?: string;
  /** 是否启用错误上报 */
  enabled?: boolean;
  /** 是否在控制台打印错误 */
  logToConsole?: boolean;
  /** 最大存储错误数量 */
  maxErrors?: number;
  /** 错误采样率 (0-1) */
  sampleRate?: number;
}

class ErrorMonitor {
  private config: Required<ErrorMonitorConfig>;
  private errors: ErrorReport[] = [];

  constructor(config: ErrorMonitorConfig = {}) {
    this.config = {
      endpoint: config.endpoint || 'http://localhost:3003/api/errors/report',
      enabled: config.enabled !== false,
      logToConsole: config.logToConsole !== false,
      maxErrors: config.maxErrors || 100,
      sampleRate: config.sampleRate || 1,
    };

    // 监听全局错误
    if (this.config.enabled) {
      this.setupGlobalErrorHandlers();
    }
  }

  /**
   * 设置全局错误处理器
   */
  private setupGlobalErrorHandlers(): void {
    // 捕获 JavaScript 运行时错误
    window.addEventListener('error', (event) => {
      if (event.error) {
        this.reportError({
          type: ErrorType.JS_ERROR,
          level: ErrorLevel.ERROR,
          message: event.message,
          stack: event.error.stack,
          error: event.error,
        });
      } else if (event.target && (event.target as HTMLImageElement | HTMLScriptElement).src) {
        // 资源加载错误
        this.reportError({
          type: ErrorType.RESOURCE_ERROR,
          level: ErrorLevel.WARNING,
          message: `Failed to load resource: ${(event.target as HTMLImageElement | HTMLScriptElement).src}`,
          stack: '',
        });
      }
    });

    // 捕获 Promise rejection
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        type: ErrorType.PROMISE_ERROR,
        level: ErrorLevel.ERROR,
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        error: event.reason,
      });
    });
  }

  /**
   * 生成唯一 ID
   */
  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 判断是否应该上报错误（基于采样率）
   */
  private shouldReport(): boolean {
    return Math.random() < this.config.sampleRate;
  }

  /**
   * 上报 React 错误
   */
  reportReactError(
    error: Error,
    errorInfo: ErrorInfo,
    extra?: Record<string, unknown>
  ): void {
    this.reportError({
      type: ErrorType.REACT_ERROR,
      level: ErrorLevel.ERROR,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      error,
      extra,
    });
  }

  /**
   * 上报网络错误
   */
  reportNetworkError(
    message: string,
    extra?: Record<string, unknown>
  ): void {
    this.reportError({
      type: ErrorType.NETWORK_ERROR,
      level: ErrorLevel.WARNING,
      message,
      extra,
    });
  }

  /**
   * 上报错误的核心方法
   */
  reportError(options: {
    type: ErrorType;
    level: ErrorLevel;
    message: string;
    stack?: string;
    componentStack?: string;
    error?: Error;
    extra?: Record<string, unknown>;
  }): void {
    if (!this.config.enabled || !this.shouldReport()) {
      return;
    }

    const errorReport: ErrorReport = {
      id: this.generateId(),
      type: options.type,
      level: options.level,
      message: options.message,
      stack: options.stack,
      componentStack: options.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      extra: {
        ...options.extra,
        // 可以添加更多上下文信息
        screen: {
          width: window.screen.width,
          height: window.screen.height,
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
    };

    // 存储到内存
    this.errors.push(errorReport);
    if (this.errors.length > this.config.maxErrors) {
      this.errors.shift(); // 移除最早的错误
    }

    // 打印到控制台
    if (this.config.logToConsole && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.group(`🚨 [ErrorMonitor] ${options.type} - ${options.level}`);
      // eslint-disable-next-line no-console
      console.error('Message:', options.message);
      if (options.stack) {
        // eslint-disable-next-line no-console
        console.error('Stack:', options.stack);
      }
      if (options.componentStack) {
        // eslint-disable-next-line no-console
        console.error('Component Stack:', options.componentStack);
      }
      // eslint-disable-next-line no-console
      console.log('Report:', errorReport);
      // eslint-disable-next-line no-console
      console.groupEnd();
    }

    // 上报到服务器
    this.sendToServer(errorReport);
  }

  /**
   * 发送错误到服务器
   */
  private async sendToServer(errorReport: ErrorReport): Promise<void> {
    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport),
      });

      if (!response.ok) {
        throw new Error(`Failed to report error: ${response.statusText}`);
      }

      if (this.config.logToConsole && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('✅ Error reported successfully:', errorReport.id);
      }
    } catch (err) {
      // 上报失败，避免递归错误
      if (this.config.logToConsole && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ Failed to report error:', err);
      }
    }
  }

  /**
   * 获取所有错误日志
   */
  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  /**
   * 清除所有错误日志
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * 获取错误统计
   */
  getStatistics(): {
    total: number;
    byType: Record<ErrorType, number>;
    byLevel: Record<ErrorLevel, number>;
  } {
    const byType: Record<ErrorType, number> = {
      [ErrorType.REACT_ERROR]: 0,
      [ErrorType.JS_ERROR]: 0,
      [ErrorType.PROMISE_ERROR]: 0,
      [ErrorType.RESOURCE_ERROR]: 0,
      [ErrorType.NETWORK_ERROR]: 0,
    };

    const byLevel: Record<ErrorLevel, number> = {
      [ErrorLevel.INFO]: 0,
      [ErrorLevel.WARNING]: 0,
      [ErrorLevel.ERROR]: 0,
      [ErrorLevel.FATAL]: 0,
    };

    this.errors.forEach((error) => {
      byType[error.type]++;
      byLevel[error.level]++;
    });

    return {
      total: this.errors.length,
      byType,
      byLevel,
    };
  }

}

// 创建全局错误监控实例
export const errorMonitor = new ErrorMonitor({
  enabled: true,
  logToConsole: true,
  maxErrors: 100,
  sampleRate: 1, // 100% 采样（生产环境可以降低）
});

// 导出默认实例
export default errorMonitor;
