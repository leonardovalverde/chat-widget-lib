# Chat Widget Library

🚀 **A modern, customizable React chat widget with AI integration, floating mode, and TypeScript support**

[![npm version](https://badge.fury.io/js/@leonardovalverde%2Fchat-widget-lib.svg)](https://www.npmjs.com/package/@leonardovalverde/chat-widget-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Fully Customizable** - Colors, themes, and branding
- 🤖 **AI Powered** - OpenAI integration with streaming responses
- 📱 **Responsive** - Works on desktop and mobile
- 🎈 **Floating Mode** - Position anywhere on screen
- 📦 **TypeScript** - Full type safety
- 🎯 **Standalone** - Use without React (script tag)
- ⚡ **Lightweight** - Minimal dependencies

## 🚀 Quick Start

### React Installation

```bash
npm install @leonardovalverde/chat-widget-lib
```

```tsx
import { ChatWidget } from "@leonardovalverde/chat-widget-lib";

function App() {
  return (
    <ChatWidget
      floatingPosition="bottom-right"
      branding={{
        botName: "Support Bot",
        subtitle: "How can I help?",
        logo: "🤖",
      }}
      apiKey="your-openai-api-key"
      onSendMessage={(message) => console.log("User:", message)}
    />
  );
}
```

### Standalone Usage (No React)

**Option 1: jsDelivr CDN (Recommended)**

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>My Website</h1>

    <!-- Include via jsDelivr -->
    <script src="https://cdn.jsdelivr.net/npm/@leonardovalverde/chat-widget-lib@latest/dist/widget.umd.js"></script>

    <script>
      window.ChatWidgetConfig = {
        apiKey: "your-openai-api-key",
        branding: {
          botName: "My Bot",
          colors: { primary: "#3b82f6" },
        },
      };

      window.ChatWidget.init();
    </script>
  </body>
</html>
```

**Option 2: unpkg CDN**

```html
<script src="https://unpkg.com/@leonardovalverde/chat-widget-lib@latest/dist/widget.umd.js"></script>
```

**Option 3: Specific Version (Recommended for production)**

```html
<!-- Replace 1.0.0 with your desired version -->
<script src="https://cdn.jsdelivr.net/npm/@leonardovalverde/chat-widget-lib@1.0.0/dist/widget.umd.js"></script>
```

## 📖 API Documentation

### React Component Props

```tsx
interface ChatWidgetProps {
  // Widget behavior
  floatingPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  defaultMinimized?: boolean;

  // Branding & customization
  branding?: {
    botName?: string;
    subtitle?: string;
    logo?: string;
    colors?: {
      primary?: string;
      secondary?: string;
      headerBg?: string;
      messagesBg?: string;
      userMessageBg?: string;
      botMessageBg?: string;
      // ... more color options
    };
  };

  // Service status
  serviceStatus?: {
    isOnline?: boolean;
    isMaintenanceMode?: boolean;
    maintenanceMessage?: string;
  };

  // Callbacks
  onSendMessage?: (message: string) => void;
  onAIResponse?: (response: string, userMessage: string) => void;

  // OpenAI configuration
  openai?: {
    model?: string;
    systemPrompt?: string;
    maxTokens?: number;
    temperature?: number;
    apiKey?: string;
  };
}
```

### Standalone Configuration

```javascript
window.ChatWidgetConfig = {
  // Same props as React component
  openia: {
  apiKey: "your-openai-api-key",
  }
  floatingPosition: "bottom-right",
  branding: {
    botName: "Support Bot",
    colors: {
      primary: "#3b82f6",
    },
  },
};

// Initialize the widget
window.ChatWidget.init();
```

## 🎨 Customization Examples

### Dark Theme

```tsx
<ChatWidget
  branding={{
    botName: "Dark Bot",
    colors: {
      primary: "#22c55e",
      headerBg: "#1a1a1a",
      messagesBg: "#0a0a0a",
      botMessageBg: "#262626",
      headerText: "#22c55e",
      botMessageText: "#22c55e",
    },
  }}
/>
```

### Brand Colors

```tsx
<ChatWidget
  branding={{
    botName: "Brand Bot",
    logo: "🎯",
    colors: {
      primary: "#10b981",
      secondary: "#059669",
      headerBg: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
      userMessageBg: "linear-gradient(135deg, #10b981, #059669)",
    },
  }}
/>
```

## 📦 What's Included

When you install via NPM or CDN, you get:

- **React Component** - `dist/chat-widget-lib.es.js` (ES Module)
- **UMD Bundle** - `dist/chat-widget-lib.umd.js` (React component)
- **Standalone Widget** - `dist/widget.umd.js` (No React required)
- **TypeScript Types** - `dist/index.d.ts`

## 🌐 CDN Information

### jsDelivr (Recommended)

- ✅ **Fast global CDN**
- ✅ **Auto-minification**
- ✅ **Version management**
- ✅ **NPM sync within minutes**

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/@leonardovalverde/chat-widget-lib@latest/dist/widget.umd.js"></script>

<!-- Specific version (production) -->
<script src="https://cdn.jsdelivr.net/npm/@leonardovalverde/chat-widget-lib@1.0.0/dist/widget.umd.js"></script>
```

### unpkg

```html
<script src="https://unpkg.com/@leonardovalverde/chat-widget-lib@latest/dist/widget.umd.js"></script>
```

## 🔧 Requirements

- **For React usage**: React 18+
- **For standalone**: Modern browser with ES2015+ support
- **For AI features**: OpenAI API key

## 📊 Bundle Sizes

- **React Component**: ~45KB (gzipped)
- **Standalone Widget**: ~150KB (includes React, gzipped)

## 🎮 Live Demo

- 🌐 **[Live Demo](https://leonardo-silva.github.io/chat-widget-lib)**
- 📚 **[Documentation](https://github.com/leonardo-silva/chat-widget-lib)**
- 🎨 **[Customization Examples](https://leonardo-silva.github.io/chat-widget-lib)**

## 📄 License

MIT © Leonardo Silva

## 🐛 Support

- 📝 **[GitHub Issues](https://github.com/leonardo-silva/chat-widget-lib/issues)**
- 📧 **[NPM Package](https://www.npmjs.com/package/@leonardovalverde/chat-widget-lib)**

---

### Quick Links

- 📦 **NPM**: `npm install @leonardovalverde/chat-widget-lib`
- 🌐 **CDN**: `https://cdn.jsdelivr.net/npm/@leonardovalverde/chat-widget-lib@latest/dist/widget.umd.js`
- 📖 **Docs**: [GitHub Repository](https://github.com/leonardo-silva/chat-widget-lib)
