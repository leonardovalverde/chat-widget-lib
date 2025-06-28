// src/dev/App.tsx
import React, { useState } from "react";

import { type BrandingConfig } from "./types/branding";
import { ChatWidget } from "./components/ChatWidget";

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("default");

  const themes: Record<string, BrandingConfig> = {
    default: {
      botName: "Leo AI",
      subtitle: "Development Mode",
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6",
        headerBg: "linear-gradient(135deg, #f8fafc, #f0f9ff)",
        userMessageBg: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        botMessageBg: "#ffffff",
      },
    },
    green: {
      botName: "EcoBot",
      subtitle: "Green Theme",
      colors: {
        primary: "#10b981",
        secondary: "#059669",
        headerBg: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
        userMessageBg: "linear-gradient(135deg, #10b981, #059669)",
        botMessageBg: "#f0fdf4",
      },
    },
    purple: {
      botName: "PurpleBot",
      subtitle: "Purple Vibes",
      colors: {
        primary: "#d946ef",
        secondary: "#c026d3",
        headerBg: "linear-gradient(135deg, #fdf2f8, #fae8ff)",
        userMessageBg: "linear-gradient(135deg, #d946ef, #c026d3)",
        botMessageBg: "#fdf4ff",
      },
    },
    dark: {
      botName: "DarkBot",
      subtitle: "Dark Mode",
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
    },
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🚀 Chat Widget - Development Mode</h1>

      <div style={{ marginBottom: "20px" }}>
        <h3>Theme Selector:</h3>
        {Object.keys(themes).map((theme) => (
          <button
            key={theme}
            onClick={() => setCurrentTheme(theme)}
            style={{
              margin: "5px",
              padding: "8px 16px",
              backgroundColor: currentTheme === theme ? "#3b82f6" : "#f3f4f6",
              color: currentTheme === theme ? "white" : "black",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Widget Inline */}
        <div>
          <h3>📱 Inline Widget</h3>
          <div
            style={{
              border: "2px dashed #ccc",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <ChatWidget
              branding={themes[currentTheme]}
              placeholder="Test inline mode..."
              onSendMessage={(msg) => console.log("Inline sent:", msg)}
              onAIResponse={(response, userMsg) =>
                console.log("Inline AI:", response)
              }
              apiKey="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"
              openai={{
                systemPrompt: `You are ${themes[currentTheme].botName}, testing in development mode. Be helpful and mention the current theme!`,
                maxTokens: 300,
              }}
            />
          </div>
        </div>

        {/* Widget Floating */}
        <div>
          <h3>🎈 Floating Widget</h3>
          <div
            style={{
              border: "2px dashed #ccc",
              padding: "20px",
              borderRadius: "12px",
              position: "relative",
              height: "400px",
            }}
          >
            <ChatWidget
              isFloating={true}
              floatingPosition="bottom-right"
              defaultMinimized={false}
              branding={themes[currentTheme]}
              placeholder="Test floating mode..."
              onSendMessage={(msg) => console.log("Floating sent:", msg)}
              onAIResponse={(response, userMsg) =>
                console.log("Floating AI:", response)
              }
              apiKey="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"
              openai={{
                systemPrompt: `You are ${themes[currentTheme].botName} in floating mode! Test the different positions and minimizing.`,
                maxTokens: 300,
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3>🧪 Test Features</h3>
        <ul>
          <li>✅ Switch themes to test styling</li>
          <li>✅ Test both inline and floating modes</li>
          <li>✅ Send messages and test AI responses</li>
          <li>✅ Test minimize/maximize in floating mode</li>
          <li>✅ Check responsive behavior</li>
          <li>✅ Test error handling (invalid API key)</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f9fafb",
          borderRadius: "12px",
        }}
      >
        <h4>📝 Development Notes</h4>
        <p>
          <strong>Current Theme:</strong> {currentTheme}
        </p>
        <p>
          <strong>Bot Name:</strong> {themes[currentTheme].botName}
        </p>
        <p>
          <strong>Check Console:</strong> All events are logged to browser
          console
        </p>
        <p>
          <strong>Hot Reload:</strong> Changes in source files will update
          automatically
        </p>
      </div>
    </div>
  );
};

export default App;
