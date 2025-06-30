# Chat Widget Library

🚀 **A modern, customizable React chat widget with AI integration, floating mode, and TypeScript support**

[![npm version](https://badge.fury.io/js/@leonardovalverde%2Fchat-widget-lib.svg)](https://www.npmjs.com/package/@leonardovalverde/chat-widget-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Fully Customizable** - Colors, themes, branding, and typography
- 🤖 **AI Powered** - OpenAI GPT integration with intelligent responses
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎈 **Floating Mode** - Position anywhere on screen (bottom-right, bottom-left, top-right, top-left)
- 📦 **TypeScript Support** - Full type safety and IntelliSense
- 🎯 **Standalone Version** - Use without React (vanilla JavaScript with single script tag)
- ⚡ **Lightweight** - Minimal dependencies, optimized bundle size
- 🔧 **Service Status** - Built-in online/offline/maintenance mode indicators
- 💾 **Message Persistence** - Optional local storage for chat history
- 🎭 **Multiple Deployment Options** - Floating widget

## 🚀 Quick Start

### Before anything

- Leos AI Chat integrates with the OpenAI API, so you’ll need an OpenAI API key to receive real AI-generated responses.
- While all component props are optional, you must provide the API key to enable real responses. Otherwise, the widget will return mocked replies for testing purposes.

React:

```tsx
import { ChatWidget } from "@leonardovalverde/chat-widget-lib";

function App() {
  return (
    <ChatWidget
      openai={{
        apiKey: "your-openai-api-key",
      }}
    />
  );
}
```

Standalone:

```html
<script>
  openai: {
    apiKey: "your-openai-api-key",
  },
</script>
```

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
      defaultMinimized={true}
      branding={{
        botName: "Support Assistant",
        subtitle: "How can I help you?",
        logo: "🤖",
        colors: {
          primary: "#3b82f6",
          secondary: "#8b5cf6",
          headerBg: "linear-gradient(135deg, #f8fafc, #f0f9ff)",
          userMessageBg: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        },
      }}
      openai={{
        apiKey: "your-openai-api-key",
        systemPrompt: "You are a helpful support assistant.",
        maxTokens: 500,
      }}
      onSendMessage={(message) => console.log("User sent:", message)}
      onAIResponse={(response, userMessage) =>
        console.log("AI responded:", response)
      }
      persistMessages={true}
      maxStoredMessages={50}
    />
  );
}
```

### Standalone Usage (No React Required)

**Perfect for any website - just add one script tag! No React, no build process, no dependencies.**

#### Take care it's important to load widget CDN after configuration if you wanna cutomize it

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website</title>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>
      The chat widget will appear as a floating button in the bottom-right
      corner.
    </p>

    <!-- Step 1: Configure the widget -->
    <script>
      window.ChatWidgetConfig = {
        floatingPosition: "bottom-right",
        defaultMinimized: true,
        branding: {
          botName: "Support Bot",
          subtitle: "Ask me anything!",
          colors: {
            primary: "#3b82f6",
            secondary: "#8b5cf6",
            userMessageBg: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          },
        },
        openai: {
          systemPrompt: "You are a helpful customer support assistant.",
          maxTokens: 300,
          apiKey: "your-openai-api-key",
        },
        persistMessages: true,
        onSendMessage: (message) => {
          console.log("User sent:", message);
        },
        onAIResponse: (response, userMessage) => {
          console.log("AI responded:", response);
        },
      };
    </script>

    <!-- Step 2: Load the widget (jsDelivr CDN) -->
    <script src="https://cdn.jsdelivr.net/npm/@leonardovalverde/chat-widget-lib@latest/dist/widget.umd.js"></script>
  </body>
</html>
```

**That's it!** The widget automatically initializes and appears on your page.

#### Standalone Advanced Features

```html
<script>
  window.ChatWidgetConfig = {
    // ... basic config ...

    // Service status management
    serviceStatus: {
      isOnline: true,
      isMaintenanceMode: false,
      showDetailedStatus: true,
    },

    // Message persistence
    persistMessages: true,
    maxStoredMessages: 100,

    // Custom placeholder text
    placeholder: "Type your message here...",

    // Enable mock responses for testing (when no API key)
    enableMockResponses: true,

    // Error handling
    onAIError: (error, userMessage) => {
      console.error("AI Error:", error);
    },
  };

  // Manual control methods
  window.addEventListener("load", () => {
    // Show/hide widget programmatically
    window.ChatWidget.show();
    window.ChatWidget.hide();

    // Update configuration dynamically
    window.ChatWidget.update({
      branding: {
        botName: "Updated Bot",
        colors: { primary: "#10b981" },
      },
    });
  }):
</script>
```

## 📖 API Documentation

### React Component Props

```tsx
interface ChatWidgetProps {
  // Widget Positioning & Behavior
  floatingPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  defaultMinimized?: boolean;

  // Message Management
  persistMessages?: boolean;
  maxStoredMessages?: number;
  placeholder?: string;

  // AI Configuration
  openai?: {
    apiKey?: string;
    model?: string; // Default: "gpt-4o-mini"
    systemPrompt?: string;
    maxTokens?: number; // Default: 500
    temperature?: number; // Default: 0.7
  };

  // Alternative: Direct API key (for backward compatibility)
  apiKey?: string;

  // Branding & Customization
  branding?: {
    botName?: string; // Default: "Leo AI"
    subtitle?: string; // Default: "AI Assistant"
    logo?: string | ReactNode;
    colors?: {
      primary?: string;
      secondary?: string;
      headerBg?: string;
      headerText?: string;
      messagesBg?: string;
      containerBg?: string;
      inputAreaBg?: string;
      userMessageBg?: string;
      userMessageText?: string;
      botMessageBg?: string;
      botMessageText?: string;
      inputBg?: string;
      inputText?: string;
      borderColor?: string;
      textColor?: string;
      textSecondary?: string;
    };
    typography?: {
      fontFamily?: string;
      headerFontSize?: string;
      messageFontSize?: string;
      messageLineHeight?: string;
    };
  };

  // Service Status
  serviceStatus?: {
    isOnline?: boolean;
    isMaintenanceMode?: boolean;
    maintenanceMessage?: string;
    showDetailedStatus?: boolean;
  };

  // Styling & Customization
  className?: string;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  messageClassName?: string;
  userMessageClassName?: string;
  messageStyle?: React.CSSProperties;
  userMessageStyle?: React.CSSProperties;

  // Icons Customization
  icons?: {
    sendIcon?: string | ReactNode;
    minimizeIcon?: string | ReactNode;
    maximizeIcon?: string | ReactNode;
    closeIcon?: string | ReactNode;
    floatingIcon?: string | ReactNode;
    botIcon?: string | ReactNode;
  };

  // Event Callbacks
  onSendMessage?: (message: string) => void;
  onAIResponse?: (response: string, userMessage: string) => void;
  onAIError?: (error: Error, userMessage: string) => void;
  onToggleMinimize?: () => void;
  onClearHistory?: () => void;
  onExportHistory?: () => void;

  // Advanced Features
  enableMockResponses?: boolean;
  hasHistory?: boolean;
}
```

### Standalone Configuration

The standalone version accepts the same configuration as the React component:

```javascript
window.ChatWidgetConfig = {
  // All the same props as ChatWidgetProps above
  apiKey: "your-openai-api-key",
  floatingPosition: "bottom-right",
  defaultMinimized: true,
  branding: {
    botName: "My Bot",
    colors: {
      primary: "#3b82f6",
      userMessageBg: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    },
  },
  // ... any other props
};
```

### Global Methods (Standalone)

```javascript
// Widget control
window.ChatWidget.show(); // Show the floating widget
window.ChatWidget.hide(); // Hide the floating widget
window.ChatWidget.destroy(); // Completely remove the widget

// Dynamic updates
window.ChatWidget.update(config); // Update widget configuration
```

## 🎨 Customization Examples

### Corporate Theme

```tsx
<ChatWidget
  branding={{
    botName: "Corporate Assistant",
    subtitle: "Professional Support",
    colors: {
      primary: "#1e40af",
      secondary: "#3730a3",
      headerBg: "linear-gradient(135deg, #dbeafe, #e0e7ff)",
      userMessageBg: "linear-gradient(135deg, #1e40af, #3730a3)",
      botMessageBg: "#f8fafc",
    },
    typography: {
      fontFamily: "Inter, sans-serif",
      headerFontSize: "16px",
      messageFontSize: "14px",
    },
  }}
  serviceStatus={{
    isOnline: true,
    showDetailedStatus: true,
  }}
  openai={{
    systemPrompt:
      "You are a professional corporate assistant. Be formal and helpful.",
    maxTokens: 400,
  }}
/>
```

### Dark Mode Theme

```tsx
<ChatWidget
  branding={{
    botName: "Night Assistant",
    subtitle: "Dark Mode Active",
    colors: {
      primary: "#22c55e",
      secondary: "#16a34a",
      headerBg: "#1a1a1a",
      messagesBg: "#0a0a0a",
      inputAreaBg: "#1a1a1a",
      userMessageBg: "#22c55e",
      botMessageBg: "#262626",
      headerText: "#22c55e",
      botMessageText: "#22c55e",
      userMessageText: "#000000",
      inputBg: "#262626",
      inputText: "#22c55e",
      borderColor: "#404040",
    },
  }}
/>
```

### Maintenance Mode

```tsx
<ChatWidget
  serviceStatus={{
    isOnline: false,
    isMaintenanceMode: true,
    maintenanceMessage: "We're upgrading our systems. Back online soon!",
    showDetailedStatus: true,
  }}
  branding={{
    botName: "Support Bot",
    subtitle: "Currently under maintenance",
  }}
/>
```

## 📦 What's Included

### NPM Package Structure

```
@leonardovalverde/chat-widget-lib/
├── dist/
│   ├── chat-widget-lib.es.js      # ES Module (React component)
│   ├── chat-widget-lib.umd.js     # UMD Bundle (React component)
│   ├── widget.umd.js              # Standalone widget (no React needed)
│   ├── style.css                  # Styles (if needed)
│   └── index.d.ts                 # TypeScript definitions
├── README.md
├── LICENSE
└── package.json
```

### Bundle Information

- **React Component** (`chat-widget-lib.es.js`): ~45KB (gzipped)

  - Requires React 18+ as peer dependency
  - For use in React applications

- **Standalone Widget** (`widget.umd.js`): ~150KB (gzipped)
  - Includes React internally
  - **No external dependencies required**
  - Works in any HTML page with just a script tag

## 🌐 CDN Usage

### jsDelivr (Recommended)

```html
<!-- Latest version (auto-updates) -->
<script src="https://cdn.jsdelivr.net/npm/@leonardovalverde/chat-widget-lib@latest/dist/widget.umd.js"></script>

<!-- Specific version (recommended for production) -->
<script src="https://cdn.jsdelivr.net/npm/@leonardovalverde/chat-widget-lib@2.0.0/dist/widget.umd.js"></script>

<!-- With SRI for security -->
<script
  src="https://cdn.jsdelivr.net/npm/@leonardovalverde/chat-widget-lib@2.0.0/dist/widget.umd.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

**Why jsDelivr?**

- ✅ **Fast global CDN** with edge locations worldwide
- ✅ **Auto-minification** and compression
- ✅ **NPM sync** - new versions available within minutes
- ✅ **Version management** - use latest or pin to specific version
- ✅ **SRI support** for security
- ✅ **99.9% uptime** guarantee

## 🔧 System Requirements

### For React Usage

- **React**: 18.0.0 or higher
- **React-DOM**: 18.0.0 or higher
- **TypeScript**: 5.0+ (optional, for type support)
- **Modern bundler**: Vite, Webpack, Rollup, etc.

### For Standalone Usage

- **No framework dependencies** - works with vanilla JavaScript
- **Browser support**: Modern browsers with ES2015+ support
  - Chrome 60+
  - Firefox 60+
  - Safari 12+
  - Edge 79+
- **OpenAI API Key** (for AI features)

### Optional Dependencies

- **OpenAI API Key** - for AI-powered responses
- **Local Storage** - for message persistence (auto-detected)

## 🚀 Advanced Features

### Message History Management

```tsx
<ChatWidget
  persistMessages={true}
  maxStoredMessages={100}
  hasHistory={true}
  onClearHistory={() => console.log("History cleared")}
  onExportHistory={() => console.log("History exported")}
/>
```

### Custom Icons

```tsx
import { SendIcon, LeoAIIcon } from "@leonardovalverde/chat-widget-lib";

<ChatWidget
  icons={{
    sendIcon: <SendIcon />,
    botIcon: <LeoAIIcon size={32} />,
    floatingIcon: "💬",
    minimizeIcon: "➖",
  }}
/>;
```

### Multiple Widget Instances

```tsx
// Different widgets for different purposes
<ChatWidget
  floatingPosition="bottom-right"
  branding={{ botName: "Sales Bot" }}
  openai={{ systemPrompt: "You are a sales assistant." }}
/>

<ChatWidget
  floatingPosition="bottom-left"
  branding={{ botName: "Support Bot" }}
  openai={{ systemPrompt: "You are a technical support assistant." }}
/>
```

### Dynamic Configuration Updates

```javascript
// Standalone version
window.ChatWidget.update({
  branding: {
    botName: "Updated Assistant",
    colors: { primary: "#10b981" },
  },
  serviceStatus: {
    isOnline: true,
    isMaintenanceMode: false,
  },
});
```

## 📊 Bundle Sizes & Performance

| Bundle                | Uncompressed | Gzipped | Dependencies          |
| --------------------- | ------------ | ------- | --------------------- |
| React Component (ES)  | ~120KB       | ~45KB   | React 18+ (peer)      |
| React Component (UMD) | ~130KB       | ~48KB   | React 18+ (peer)      |
| Standalone Widget     | ~400KB       | ~150KB  | None (React included) |

**Performance Features:**

- 🚀 **Lazy loading** - Components load only when needed
- 🎯 **Tree shaking** - Only import what you use
- 💾 **Optimized bundles** - Minified and compressed
- ⚡ **Fast initialization** - Ready in milliseconds

## 📄 License

MIT © Leonardo Silva

---

## 🔗 Quick Links

- 📦 **NPM Package**: [`@leonardovalverde/chat-widget-lib`](https://www.npmjs.com/package/@leonardovalverde/chat-widget-lib)
- 🌐 **CDN**: `https://cdn.jsdelivr.net/npm/@leonardovalverde/chat-widget-lib@latest/dist/widget.umd.js`
- 📖 **Repository**: [GitHub](https://github.com/leonardo-silva/chat-widget-lib)
- 🏷️ **Latest Version**: Check [NPM](https://www.npmjs.com/package/@leonardovalverde/chat-widget-lib) for current version

### Installation Commands

```bash
# NPM
npm install @leonardovalverde/chat-widget-lib

# Yarn
yarn add @leonardovalverde/chat-widget-lib

# PNPM
pnpm add @leonardovalverde/chat-widget-lib
```
