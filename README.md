# Chat Widget Library

A modern, fully-featured React chat widget component with AI-like responses, floating mode, and extensive customization options.

## Features

- 🤖 **Interactive Chat** - Complete chat functionality with mock AI responses
- 🎈 **Floating Mode** - Position the chat widget anywhere on the screen
- 🎨 **Fully Customizable** - Style every element with CSS classes or inline styles
- 📱 **Responsive Design** - Works beautifully on all screen sizes
- ⚡ **TypeScript Support** - Complete type definitions included
- 🔔 **Notifications** - Unread message counter when minimized
- ✨ **Smooth Animations** - Elegant transitions and hover effects

## Installation

```bash
npm install chat-widget-lib
```

## Quick Start

```tsx
import { ChatWidget } from "chat-widget-lib";

function App() {
  return (
    <ChatWidget
      onSendMessage={(message) => console.log("User sent:", message)}
      placeholder="How can we help you?"
    />
  );
}
```

## Examples

### Basic Usage

```tsx
<ChatWidget onSendMessage={(message) => handleMessage(message)} />
```

### Floating Chat Widget

```tsx
<ChatWidget
  floatingPosition="bottom-right"
  defaultMinimized={true}
  placeholder="Need help? Chat with us!"
/>
```

### Custom Styling

```tsx
<ChatWidget
  containerClassName="!bg-blue-50 !border-blue-300"
  headerClassName="!bg-blue-600 !text-white"
  messageClassName="!bg-white !border-blue-200"
  userMessageClassName="!bg-blue-100"
  placeholder="Type your message..."
/>
```

### With Custom Messages

```tsx
<ChatWidget
  initialMessages={[
    {
      id: "1",
      content: "Welcome! How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]}
  onSendMessage={handleMessage}
/>
```

## API Reference

### Props

| Prop               | Type                                                           | Default                       | Description                          |
| ------------------ | -------------------------------------------------------------- | ----------------------------- | ------------------------------------ |
| `onSendMessage`    | `(message: string) => void`                                    | -                             | Callback when user sends a message   |
| `initialMessages`  | `Message[]`                                                    | `[]`                          | Initial messages to display          |
| `placeholder`      | `string`                                                       | `"Type your message here..."` | Input placeholder text               |
| `disabled`         | `boolean`                                                      | `false`                       | Whether the input is disabled        |
| `defaultMinimized` | `boolean`                                                      | `false`                       | Start minimized                      |
| `floatingPosition` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'`              | Position of floating widget          |
| `onToggleMinimize` | `(isMinimized: boolean) => void`                               | -                             | Callback when minimize state changes |

### Styling Props

| Prop                   | Type            | Description                      |
| ---------------------- | --------------- | -------------------------------- |
| `containerStyle`       | `CSSProperties` | Inline styles for main container |
| `headerStyle`          | `CSSProperties` | Inline styles for header         |
| `contentStyle`         | `CSSProperties` | Inline styles for content area   |
| `messageStyle`         | `CSSProperties` | Inline styles for bot messages   |
| `userMessageStyle`     | `CSSProperties` | Inline styles for user messages  |
| `inputStyle`           | `CSSProperties` | Inline styles for input field    |
| `containerClassName`   | `string`        | CSS classes for main container   |
| `headerClassName`      | `string`        | CSS classes for header           |
| `contentClassName`     | `string`        | CSS classes for content area     |
| `messageClassName`     | `string`        | CSS classes for bot messages     |
| `userMessageClassName` | `string`        | CSS classes for user messages    |
| `inputClassName`       | `string`        | CSS classes for input field      |

### Types

```tsx
interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}
```

## Customization

The chat widget is built with Tailwind CSS classes but can be customized with any CSS framework:

### Using Tailwind CSS

```tsx
<ChatWidget
  containerClassName="!bg-gradient-to-r !from-purple-400 !to-pink-400"
  headerClassName="!bg-black !text-white"
  inputClassName="!border-purple-300 focus:!ring-purple-500"
/>
```

### Using Custom CSS

```tsx
<ChatWidget
  containerStyle={{
    backgroundColor: "#f0f9ff",
    borderColor: "#0ea5e9",
    borderRadius: "16px",
  }}
  headerStyle={{
    backgroundColor: "#0ea5e9",
    color: "white",
  }}
/>
```

## License

MIT
