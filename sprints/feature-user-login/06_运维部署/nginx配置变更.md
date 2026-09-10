# Nginx 配置变更 — 用户登录

> 迭代：feature-user-login

---

## 一、强制 HTTPS

```nginx
# HTTP 全部 301 到 HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$host$request_uri;
}
```

---

## 二、HTTPS 主站点

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate     /etc/nginx/certs/your-domain.crt;
    ssl_certificate_key /etc/nginx/certs/your-domain.key;

    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 安全响应头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options    "nosniff" always;
    add_header X-Frame-Options           "SAMEORIGIN" always;
    add_header Referrer-Policy           "strict-origin-when-cross-origin" always;

    # 前端静态资源
    root /var/www/ant-admin-template/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 反向代理
    location /api/ {
        proxy_pass         http://backend_upstream;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;

        # Cookie 属性由后端 Set-Cookie 决定（HttpOnly / Secure / SameSite）
        proxy_read_timeout 30s;
    }
}
```

---

## 三、限流（可选，进一步防暴力破解）

在 http 段：
```nginx
limit_req_zone $binary_remote_addr zone=login_limit:10m rate=10r/m;
```

登录接口单独限流：
```nginx
location = /api/auth/login {
    limit_req zone=login_limit burst=5 nodelay;
    proxy_pass http://backend_upstream;
}
```

含义：单 IP 平均每分钟 10 次，突发 5 次；超出返回 503。

---

## 四、Cookie 相关注意
- Cookie 的 `HttpOnly` / `Secure` / `SameSite` 由**后端**设置，Nginx 不主动改写
- 若前后端跨域，需要在后端设置 `SameSite=None; Secure`，并在 Nginx 层保证 HTTPS

---

## 五、上线校验
- [ ] `curl -I http://your-domain.com` 返回 301 → HTTPS
- [ ] `curl -I https://your-domain.com` 返回 200，含 HSTS 头
- [ ] 登录接口在浏览器抓包 Cookie 含 `HttpOnly`、`Secure`
- [ ] 连续访问登录接口触发限流返回 503
