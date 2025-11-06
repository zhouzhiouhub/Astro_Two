# Language Auto-Detection System

## 📋 概述

这是一个高性能、模块化的浏览器语言自动检测和重定向系统，遵循 SOLID、DRY、SRP 设计原则。

## 🏗️ 架构

### 核心模块 (`lang-detect-core.js`)

**职责分离**：
- **LangDetector**: 语言检测逻辑
- **URLService**: URL 操作和导航
- **Logger**: 调试日志

**优势**：
- ✅ 单一职责（SRP）
- ✅ 高内聚低耦合
- ✅ 可测试和可维护
- ✅ 可复用的核心逻辑

### 自动重定向 (`lang-auto-redirect.js`)

**功能**：
- 检测浏览器语言
- 自动跳转到对应语言版本
- 避免破坏浏览器历史记录

**优先级**：
1. 用户手动选择（localStorage）
2. 浏览器语言设置
3. 默认语言（zh）

### 调试面板 (`lang-debug-panel.js`)

**功能**：
- 显示语言检测信息
- 帮助开发和调试
- 美观的 UI 设计

## 🚀 使用方法

### 1. 基本集成

在 `BaseLayout.astro` 中已自动集成：

```html
<head>
  <!-- 核心模块必须首先加载 -->
  <script is:inline src="/lang-detect-core.js"></script>
  
  <!-- 自动重定向 -->
  <script is:inline src="/lang-auto-redirect.js"></script>
</head>
```

### 2. 启用调试模式

在任何页面添加调试面板脚本：

```html
<script is:inline src="/lang-debug-panel.js"></script>
```

### 3. 手动语言切换

在语言切换组件中保存用户选择：

```javascript
// 保存用户选择的语言
LangDetectCore.LangDetector.setStoredLang('zh');

// 重定向到新语言版本
const newPath = LangDetectCore.URLService.buildPathWithLang('zh');
window.location.href = newPath;
```

## 🔧 配置

修改 `lang-detect-core.js` 中的配置：

```javascript
const CONFIG = {
  SUPPORTED_LANGS: ['en', 'zh'],  // 支持的语言
  DEFAULT_LANG: 'en',             // 默认语言
  STORAGE_KEY: 'lang',            // localStorage 键名
};
```

## 📊 工作流程

```
用户访问网站
    ↓
检查 localStorage 是否有语言偏好？
    ↓ 是
    返回存储的语言
    ↓ 否
检查浏览器语言设置
    ↓
在支持的语言中匹配？
    ↓ 是
    返回匹配的语言
    ↓ 否
    返回默认语言（zh）
    ↓
检查当前 URL 语言是否匹配？
    ↓ 否
    重定向到目标语言版本
    ↓ 是
    保持当前页面
```

## 🎯 性能优化

1. **最小化阻塞**：脚本使用 `is:inline` 内联加载
2. **早期执行**：在 `<head>` 中尽早执行
3. **避免闪烁**：在页面渲染前完成重定向
4. **缓存友好**：使用 `window.location.replace()` 避免历史记录

## 🧪 测试方法

### 方法 1：手动测试

1. 打开浏览器开发者工具
2. 清除 localStorage: `localStorage.clear()`
3. 修改浏览器语言设置
4. 访问网站并观察重定向

### 方法 2：调试面板

1. 添加 `lang-debug-panel.js` 到页面
2. 查看右上角调试面板
3. 检查所有检测信息

### 方法 3：控制台测试

```javascript
// 查看检测结果
console.log('Browser lang:', LangDetectCore.LangDetector.getBrowserLang());
console.log('Stored lang:', LangDetectCore.LangDetector.getStoredLang());
console.log('Target lang:', LangDetectCore.LangDetector.getTargetLang());

// 测试语言切换
LangDetectCore.LangDetector.setStoredLang('en');
location.reload();
```

## 📝 API 参考

### LangDetector

| 方法 | 描述 | 返回值 |
|------|------|--------|
| `extractPrimaryLang(lang)` | 提取主语言代码 | `string \| null` |
| `getBrowserLang()` | 获取浏览器语言 | `string \| null` |
| `getStoredLang()` | 获取存储的语言偏好 | `string \| null` |
| `setStoredLang(lang)` | 设置语言偏好 | `void` |
| `getLangFromPath(pathname)` | 从路径提取语言 | `string \| null` |
| `getTargetLang()` | 获取目标语言 | `string` |

### URLService

| 方法 | 描述 | 返回值 |
|------|------|--------|
| `buildPathWithLang(lang, path)` | 构建带语言前缀的路径 | `string` |
| `redirect(path)` | 执行重定向 | `void` |
| `shouldRedirect(targetLang)` | 检查是否需要重定向 | `boolean` |

## 🔍 故障排查

### 问题：重定向循环

**原因**：配置不一致
**解决**：确保 `astro.config.mjs` 和 `lang-detect-core.js` 中的语言配置一致

### 问题：重定向不工作

**原因**：脚本加载顺序错误
**解决**：确保 `lang-detect-core.js` 在其他脚本之前加载

### 问题：无法保存语言偏好

**原因**：localStorage 被禁用
**解决**：检查浏览器隐私设置，或使用 cookie 作为备选

## 🌟 最佳实践

1. **始终加载核心模块**：在所有页面的 `<head>` 中加载
2. **尽早执行重定向**：避免页面内容闪烁
3. **提供用户控制**：允许手动切换语言
4. **优雅降级**：提供 JavaScript 禁用时的备选方案
5. **测试所有场景**：不同浏览器、语言设置、用户偏好

## 📦 文件结构

```
public/
├── lang-detect-core.js      # 核心模块（必需）
├── lang-auto-redirect.js    # 自动重定向（推荐）
└── lang-debug-panel.js      # 调试面板（开发用）

src/
├── layouts/
│   └── BaseLayout.astro     # 已集成核心和重定向
└── pages/
    └── index.astro          # 根路径重定向
```

## 🔄 迁移指南

从旧脚本迁移：

1. ✅ 已创建新的模块化脚本
2. ✅ 已集成到 BaseLayout
3. ✅ 已优化根路径重定向
4. ⚠️ 可以删除旧的 `browser-lang-redirect.js` 和 `browser-lang-debug.js`

## 📚 技术栈

- **原生 JavaScript**：无依赖，轻量级
- **IIFE 模式**：避免全局污染
- **模块化设计**：遵循 SOLID 原则
- **性能优先**：最小化执行时间

## 🤝 贡献

欢迎提出改进建议！

---

**版本**: 2.0.0  
**更新日期**: 2025-11-06  
**作者**: Astro Two Team

