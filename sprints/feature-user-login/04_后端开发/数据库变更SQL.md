# 数据库变更 SQL — 用户登录

> 迭代：feature-user-login
> 说明：user 表本身**不新增字段**，仅新增会话与登录失败记录两张表。

---

## 1. 会话表 `user_login_session`

用于记录活跃会话、过期时间、设备信息（Session 方案使用；JWT 方案可用来维护黑名单）。

```sql
CREATE TABLE `user_login_session` (
  `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id`       BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
  `session_id`    VARCHAR(128)    NOT NULL COMMENT 'session ID 或 token id',
  `device_info`   VARCHAR(255)    DEFAULT NULL COMMENT '设备/UA信息（可选）',
  `ip`            VARCHAR(64)     DEFAULT NULL COMMENT '登录IP',
  `remember`      TINYINT(1)      NOT NULL DEFAULT 0 COMMENT '是否记住我',
  `expires_at`    DATETIME        NOT NULL COMMENT '过期时间',
  `created_at`    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `revoked_at`    DATETIME        DEFAULT NULL COMMENT '主动注销时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_session_id` (`session_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_expires_at` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户登录会话';
```

---

## 2. 登录失败记录表 `login_failed_record`

用于登录失败计数、暴力破解锁定判断。

```sql
CREATE TABLE `login_failed_record` (
  `id`           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `account`      VARCHAR(64)     NOT NULL COMMENT '登录账号（手机号/用户名）',
  `ip`           VARCHAR(64)     DEFAULT NULL,
  `fail_count`   INT             NOT NULL DEFAULT 0 COMMENT '连续失败次数',
  `locked_until` DATETIME        DEFAULT NULL COMMENT '锁定截止时间',
  `updated_at`   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='登录失败计数';
```

> 也可以将 `fail_count` / `locked_until` 全部放到 Redis（推荐），SQL 表仅作为审计留档。

---

## 3. user 表检查

无需变更，但请**确认**：
- `password` 字段存储的是 bcrypt / argon2 哈希，**不是明文**
- 若历史遗留明文，需迁移方案（用户下次登录时透明升级为哈希）

---

## 4. 回滚脚本

```sql
DROP TABLE IF EXISTS `user_login_session`;
DROP TABLE IF EXISTS `login_failed_record`;
```
