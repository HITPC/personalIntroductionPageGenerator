在 **React + Vite + TypeScript** 项目中使用 **GSAP（GreenSock Animation Platform）** 的步骤如下。以下是一个完整的指南，包含代码示例和注意事项：

---

### **1. 安装 GSAP**

首先，通过 npm 或 yarn 安装 GSAP：

```bash
npm install gsap
# 或
yarn add gsap
```

---

### **2. 创建 React 组件并引入 GSAP**

在 React 组件中使用 GSAP 的核心方法是通过 `useRef` 获取 DOM 元素的引用，并调用 GSAP 的动画方法。

#### **示例代码**

```tsx
// App.tsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const App: React.FC = () => {
  // 使用 useRef 获取 DOM 元素的引用
  const boxRef = useRef<HTMLDivElement>(null);

  // 在 useEffect 中触发动画
  useEffect(() => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        duration: 2,       // 动画持续时间
        x: 300,            // X 轴移动 300px
        rotation: 360,     // 旋转 360 度
        scale: 1.5,        // 缩放 1.5 倍
        ease: 'power2.inOut', // 缓动效果
      });
    }
  }, []); // 空依赖数组确保动画只在组件挂载时执行一次

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <div
        ref={boxRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#42b983',
          marginTop: '20px',
        }}
      />
    </div>
  );
};

export default App;
```

---

### **3. 使用 `useGSAP` 钩子（可选）**

如果希望更简洁地管理 GSAP 动画，可以使用 `@gsap/react` 提供的 `useGSAP` 钩子（需额外安装）。

#### **安装 `@gsap/react`**

```bash
npm install @gsap/react
# 或
yarn add @gsap/react
```

#### **示例代码**

```tsx
// App.tsx
import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const App: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        duration: 2,
        x: 300,
        rotation: 360,
        scale: 1.5,
        ease: 'power2.inOut',
      });
    }
  }, [containerRef]); // 依赖项确保动画在容器就绪后触发

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <div
        ref={containerRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#42b983',
          marginTop: '20px',
        }}
      />
    </div>
  );
};

export default App;
```

---

### **4. 使用 ScrollTrigger 插件（可选）**

如果需要实现滚动触发的动画，需要额外安装并注册 `ScrollTrigger` 插件。

#### **安装 ScrollTrigger**

```bash
npm install gsap
# 确保安装了 ScrollTrigger 插件
```

#### **注册并使用 ScrollTrigger**

```tsx
// App.tsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        x: 400,
        opacity: 1,
        duration: 3,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 90%', // 触发动画的滚动位置
        },
      });
    }
  }, []);

  return (
    <div style={{ height: '200vh' }}>
      <div style={{ height: '100vh' }}></div>
      <div
        ref={boxRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'red',
          opacity: 0,
          margin: '0 auto',
        }}
      />
    </div>
  );
};

export default App;
```

---

### **5. 注意事项**

1. **TypeScript 类型定义**：

   - 使用 `useRef` 时，确保为 DOM 元素指定正确的类型（如 `HTMLDivElement`）。
   - 如果遇到类型错误，可以安装 GSAP 的类型定义：
     ```bash
     npm install --save-dev @types/greensock
     ```
2. **避免在渲染函数中直接调用 GSAP**：

   - 动画逻辑应放在 `useEffect` 或 `useGSAP` 中，避免因组件频繁渲染导致性能问题。
3. **清理动画（可选）**：

   - 如果需要在组件卸载时清理动画，可以在 `useEffect` 中返回一个清理函数：
     ```tsx
     useEffect(() => {
       const ctx = gsap.context(() => {
         gsap.to(boxRef.current, { /* 动画配置 */ });
       });
       return () => ctx.revert(); // 清理动画
     }, []);
     ```

---

### **总结**

- **基础动画**：使用 `useRef` + `useEffect` 调用 `gsap.to()`。
- **高级管理**：使用 `@gsap/react` 的 `useGSAP` 钩子简化代码。
- **滚动动画**：结合 `ScrollTrigger` 插件实现滚动触发效果。
- **兼容性**：GSAP 兼容所有现代浏览器，且性能优于 CSS 动画。

通过以上步骤，你可以在 **React + Vite + TypeScript** 项目中高效地使用 GSAP 实现复杂的动画效果。
