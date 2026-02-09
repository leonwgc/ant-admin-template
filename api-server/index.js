/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * @file api-server/index.js
 * @author leon.wang
 *
 * 模拟错误上报服务器
 * 用于接收和存储前端错误日志
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3003;

// 错误日志存储目录
const ERROR_LOGS_DIR = path.join(__dirname, 'error-logs');

// 确保错误日志目录存在
if (!fs.existsSync(ERROR_LOGS_DIR)) {
  fs.mkdirSync(ERROR_LOGS_DIR, { recursive: true });
}

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 记录请求日志
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/**
 * 错误上报接口
 */
app.post('/api/errors/report', (req, res) => {
  try {
    const errorReport = req.body;

    console.log('\n🚨 收到错误上报:');
    console.log('- ID:', errorReport.id);
    console.log('- 类型:', errorReport.type);
    console.log('- 级别:', errorReport.level);
    console.log('- 消息:', errorReport.message);
    console.log('- URL:', errorReport.url);
    console.log('- 时间:', new Date(errorReport.timestamp).toLocaleString('zh-CN'));

    // 保存到文件
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(ERROR_LOGS_DIR, `errors-${date}.json`);

    let logs = [];
    if (fs.existsSync(logFile)) {
      const content = fs.readFileSync(logFile, 'utf-8');
      logs = JSON.parse(content);
    }

    logs.push({
      ...errorReport,
      receivedAt: new Date().toISOString(),
    });

    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2), 'utf-8');

    console.log('✅ 错误已记录到:', logFile);

    res.json({
      success: true,
      message: 'Error reported successfully',
      id: errorReport.id,
    });
  } catch (error) {
    console.error('❌ 处理错误上报失败:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to report error',
      error: error.message,
    });
  }
});

/**
 * 获取错误统计
 */
app.get('/api/errors/statistics', (req, res) => {
  try {
    const files = fs.readdirSync(ERROR_LOGS_DIR);
    const errorFiles = files.filter(f => f.startsWith('errors-') && f.endsWith('.json'));

    let totalErrors = 0;
    const byType = {};
    const byLevel = {};

    errorFiles.forEach(file => {
      const content = fs.readFileSync(path.join(ERROR_LOGS_DIR, file), 'utf-8');
      const logs = JSON.parse(content);

      totalErrors += logs.length;

      logs.forEach(log => {
        byType[log.type] = (byType[log.type] || 0) + 1;
        byLevel[log.level] = (byLevel[log.level] || 0) + 1;
      });
    });

    res.json({
      success: true,
      data: {
        total: totalErrors,
        byType,
        byLevel,
        fileCount: errorFiles.length,
      },
    });
  } catch (error) {
    console.error('❌ 获取统计数据失败:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics',
      error: error.message,
    });
  }
});

/**
 * 获取错误日志列表
 */
app.get('/api/errors/logs', (req, res) => {
  try {
    const { date, limit = 100 } = req.query;

    let logs = [];

    if (date) {
      // 获取指定日期的日志
      const logFile = path.join(ERROR_LOGS_DIR, `errors-${date}.json`);
      if (fs.existsSync(logFile)) {
        const content = fs.readFileSync(logFile, 'utf-8');
        logs = JSON.parse(content);
      }
    } else {
      // 获取所有日志
      const files = fs.readdirSync(ERROR_LOGS_DIR);
      const errorFiles = files.filter(f => f.startsWith('errors-') && f.endsWith('.json'));

      errorFiles.forEach(file => {
        const content = fs.readFileSync(path.join(ERROR_LOGS_DIR, file), 'utf-8');
        const fileLogs = JSON.parse(content);
        logs = logs.concat(fileLogs);
      });
    }

    // 按时间倒序排序
    logs.sort((a, b) => b.timestamp - a.timestamp);

    // 限制返回数量
    logs = logs.slice(0, parseInt(limit));

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error('❌ 获取错误日志失败:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get error logs',
      error: error.message,
    });
  }
});

/**
 * 清除错误日志
 */
app.delete('/api/errors/logs', (req, res) => {
  try {
    const files = fs.readdirSync(ERROR_LOGS_DIR);
    const errorFiles = files.filter(f => f.startsWith('errors-') && f.endsWith('.json'));

    errorFiles.forEach(file => {
      fs.unlinkSync(path.join(ERROR_LOGS_DIR, file));
    });

    console.log('🗑️  已清除所有错误日志');

    res.json({
      success: true,
      message: 'All error logs cleared',
      count: errorFiles.length,
    });
  } catch (error) {
    console.error('❌ 清除错误日志失败:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear error logs',
      error: error.message,
    });
  }
});

/**
 * 健康检查
 */
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Error monitor server is running',
    timestamp: new Date().toISOString(),
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log('\n📊 错误监控服务器已启动');
  console.log(`🌐 监听端口: http://localhost:${PORT}`);
  console.log(`📁 日志目录: ${ERROR_LOGS_DIR}`);
  console.log('\n可用接口:');
  console.log('  POST   /api/errors/report      - 上报错误');
  console.log('  GET    /api/errors/statistics  - 获取统计');
  console.log('  GET    /api/errors/logs        - 获取日志列表');
  console.log('  DELETE /api/errors/logs        - 清除所有日志');
  console.log('  GET    /health                 - 健康检查');
  console.log('\n');
});
