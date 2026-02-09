# 错误监控 API 服务器

模拟的错误上报服务器，用于开发环境测试错误监控功能。

## 启动服务器

```bash
cd api-server
npm install
npm start
```

服务器将在 `http://localhost:3003` 启动。

## API 接口

### 1. 上报错误

```
POST /api/errors/report
Content-Type: application/json

{
  "id": "string",
  "type": "react_error | js_error | promise_error | resource_error | network_error",
  "level": "info | warning | error | fatal",
  "message": "string",
  "stack": "string",
  "url": "string",
  "timestamp": 1234567890,
  ...
}
```

### 2. 获取统计信息

```
GET /api/errors/statistics
```

返回错误统计数据。

### 3. 获取错误日志

```
GET /api/errors/logs?date=2024-01-01&limit=100
```

参数：
- `date`: 可选，指定日期（YYYY-MM-DD）
- `limit`: 可选，限制返回数量（默认100）

### 4. 清除所有日志

```
DELETE /api/errors/logs
```

### 5. 健康检查

```
GET /health
```

## 日志存储

错误日志按日期存储在 `api-server/error-logs/` 目录：
- `errors-2024-01-01.json`
- `errors-2024-01-02.json`
- ...

每个文件包含当天的所有错误报告。
