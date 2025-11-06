# 🚀 快速启动指南

## 语言自动检测已成功部署！

您的网站现在可以**自动根据浏览器语言跳转到对应的语言版本**了！

---

## ⚡ 快速测试

### 1️⃣ 启动开发服务器
```bash
npm run dev
```

### 2️⃣ 或启动预览服务器（测试构建版本）
```bash
npm run build
npm run preview
```

### 3️⃣ 访问测试页面
打开浏览器访问：
```
http://localhost:4321/test-lang-detection.html
```

---

## 📋 测试场景

### 场景 1：首次访问（浏览器语言检测）
1. 清除浏览器 localStorage：按 F12，在控制台输入：
   ```javascript
   localStorage.clear()
   ```
2. 访问根路径：`http://localhost:4321/`
3. **预期结果**：自动跳转到您浏览器设置的语言版本

### 场景 2：手动切换语言
1. 访问测试页面：`http://localhost:4321/test-lang-detection.html`
2. 点击"切换到 English"或"切换到 中文"按钮
3. **预期结果**：页面重新加载，显示选择的语言版本

### 场景 3：语言偏好记忆
1. 手动切换到某个语言
2. 关闭浏览器
3. 重新打开并访问网站
4. **预期结果**：自动显示上次选择的语言版本

---

## 🎯 工作原理（简单版）

```
用户访问 → 检查 localStorage → 是否有语言偏好？
                                    ↓ 是              ↓ 否
                              使用保存的语言    使用浏览器语言
                                    ↓                  ↓
                              检查当前 URL 是否匹配？
                                    ↓ 是          ↓ 否
                              保持当前页面    自动重定向
```

**优先级**：
1. 🥇 用户手动选择（localStorage）
2. 🥈 浏览器语言设置（navigator.languages）
3. 🥉 默认语言（zh）

---

## 🔍 调试工具

### 方法 1：可视化调试面板
在任何页面添加这行代码即可显示调试面板：
```html
<script src="/lang-debug-panel.js"></script>
```

### 方法 2：浏览器控制台
按 F12 打开控制台，输入：
```javascript
// 查看当前状态
console.log('浏览器语言:', LangDetectCore.LangDetector.getBrowserLang());
console.log('存储的偏好:', LangDetectCore.LangDetector.getStoredLang());
console.log('目标语言:', LangDetectCore.LangDetector.getTargetLang());

// 测试语言切换
LangDetectCore.LangDetector.setStoredLang('en');
location.reload();
```

---

## 📝 常见问题

### Q: 为什么访问英文页面还是跳转到中文？
**A:** 您之前可能手动选择过中文。清除偏好：
```javascript
localStorage.removeItem('lang');
location.reload();
```

### Q: 如何修改默认语言？
**A:** 编辑 `public/lang-detect-core.js`：
```javascript
const CONFIG = {
  SUPPORTED_LANGS: ['en', 'zh'],
  DEFAULT_LANG: 'en',  // 改为 'en'
  STORAGE_KEY: 'lang',
};
```

### Q: 如何添加新语言支持？
**A:** 
1. 更新 `public/lang-detect-core.js` 中的 `SUPPORTED_LANGS`
2. 更新 `astro.config.mjs` 中的 `i18n.locales`
3. 创建对应的语言页面

---

## ✅ 验证清单

运行以下测试确保一切正常：

- [ ] ✅ 访问 `/` 自动重定向到语言版本
- [ ] ✅ 访问 `/zh/about` 保持中文页面
- [ ] ✅ 访问 `/en/about` 保持英文页面
- [ ] ✅ 清除 localStorage 后使用浏览器语言
- [ ] ✅ 手动切换语言后记住选择
- [ ] ✅ 在不同页面间跳转保持语言
- [ ] ✅ 浏览器返回/前进不触发重定向

---

## 📚 更多资源

- 📖 **完整文档**：`LANG_DETECTION_GUIDE.md`
- 📊 **实施总结**：`IMPLEMENTATION_SUMMARY.md`
- 🧪 **测试页面**：`http://localhost:4321/test-lang-detection.html`

---

## 🎉 恭喜！

您的语言自动检测系统已经**完全配置并运行**！

现在您可以：
- ✅ 让网站自动适配访客的语言偏好
- ✅ 提升国际用户的体验
- ✅ 保持 SEO 友好的多语言结构

**开始测试吧！** 🚀

---

**需要帮助？**
- 查看完整文档：`LANG_DETECTION_GUIDE.md`
- 使用测试页面调试：`/test-lang-detection.html`
- 打开浏览器控制台查看日志

