import React, { useState } from "react";

import { type BrandingConfig } from "./types/branding";
import { type ServiceStatus } from "./types/theme";
import { ChatWidget } from "./components/ChatWidget";

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("default");
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>({
    isOnline: true,
    isMaintenanceMode: false,
    showDetailedStatus: true,
  });

  // ====================================================
  // CUSTOMIZATION EXAMPLES - NOT DEFAULT THEMES
  // ====================================================
  // These are examples of how you can customize
  // colors, texts and appearance of the chat widget.
  // You can create your own configurations!
  // ====================================================

  const customizationExamples: Record<string, BrandingConfig> = {
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
      logo: "🌱",
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
      logo: "💜",
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
      logo: "🔥",
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

  const setOnlineStatus = () => {
    setServiceStatus({
      isOnline: true,
      isMaintenanceMode: false,
      showDetailedStatus: true,
    });
  };

  const setOfflineStatus = () => {
    setServiceStatus({
      isOnline: false,
      isMaintenanceMode: false,
      showDetailedStatus: true,
    });
  };

  const setMaintenanceStatus = () => {
    setServiceStatus({
      isOnline: false,
      isMaintenanceMode: true,
      maintenanceMessage: "System under maintenance. Please try again later.",
      showDetailedStatus: true,
    });
  };

  const getStatusText = () => {
    if (serviceStatus.isMaintenanceMode) return "🔧 Maintenance";
    if (!serviceStatus.isOnline) return "⚠️ Offline";
    return "✅ Online";
  };

  const getSystemPrompt = () => {
    const baseName = customizationExamples[currentTheme].botName;

    if (serviceStatus.isMaintenanceMode) {
      return `You are ${baseName} but the system is under maintenance. Explain that you're temporarily unavailable for full responses but can provide basic help.`;
    }

    if (!serviceStatus.isOnline) {
      return `You are ${baseName} but the service is currently offline. You should not be able to respond normally.`;
    }

    return `You are ${baseName} in floating mode! Test the different positions and minimizing. The service is fully online and operational.`;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h1>🚀 Chat Widget - Floating Mode Demo</h1>

        <div style={{ marginBottom: "20px" }}>
          <h3>🎨 Customization Examples (Not Default Themes):</h3>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
            These are examples showing how you can customize the widget's
            appearance. Create your own colors, logos, and styling!
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {Object.keys(customizationExamples).map((theme) => (
              <button
                key={theme}
                onClick={() => setCurrentTheme(theme)}
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    currentTheme === theme ? "#3b82f6" : "#f3f4f6",
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
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>🔧 Service Status Testing:</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={setOnlineStatus}
              style={{
                padding: "8px 16px",
                backgroundColor:
                  serviceStatus.isOnline && !serviceStatus.isMaintenanceMode
                    ? "#10b981"
                    : "#f3f4f6",
                color:
                  serviceStatus.isOnline && !serviceStatus.isMaintenanceMode
                    ? "white"
                    : "black",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ✅ Online
            </button>
            <button
              onClick={setOfflineStatus}
              style={{
                padding: "8px 16px",
                backgroundColor:
                  !serviceStatus.isOnline && !serviceStatus.isMaintenanceMode
                    ? "#ef4444"
                    : "#f3f4f6",
                color:
                  !serviceStatus.isOnline && !serviceStatus.isMaintenanceMode
                    ? "white"
                    : "black",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ⚠️ Offline
            </button>
            <button
              onClick={setMaintenanceStatus}
              style={{
                padding: "8px 16px",
                backgroundColor: serviceStatus.isMaintenanceMode
                  ? "#f59e0b"
                  : "#f3f4f6",
                color: serviceStatus.isMaintenanceMode ? "white" : "black",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🔧 Maintenance
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            border: "2px dashed #ccc",
            padding: "40px",
            borderRadius: "12px",
            background: "#f8f9fa",
          }}
        >
          <h2>🎈 Floating Chat Widget Demo</h2>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>
            The floating widget appears fixed in the bottom-right corner of the
            screen
          </p>
          <p style={{ fontSize: "16px", color: "#888" }}>
            🎯 It doesn't take up space here - it's always on top of all
            elements!
          </p>
          <p style={{ fontSize: "16px", color: "#888" }}>
            🎨 Use the buttons above to test different customization examples
            and service status
          </p>
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: serviceStatus.isMaintenanceMode
                ? "#fef3c7"
                : !serviceStatus.isOnline
                ? "#fee2e2"
                : "#d1fae5",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Current Status: {getStatusText()}
          </div>
        </div>
      </div>

      {/* Widget Floating - RENDERED OUTSIDE ANY CONTAINER */}
      <ChatWidget
        persistMessages
        maxStoredMessages={100}
        floatingPosition="bottom-right"
        defaultMinimized={true}
        branding={customizationExamples[currentTheme]}
        serviceStatus={serviceStatus}
        placeholder="Test floating mode..."
        onSendMessage={(msg) => console.log("Floating sent:", msg)}
        onAIResponse={(response, userMsg) =>
          console.log("Floating AI:", response)
        }
        openai={{
          systemPrompt: getSystemPrompt(),
          maxTokens: 300,
          apiKey:
            "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",
        }}
      />

      <div
        style={{ marginTop: "40px", maxWidth: "800px", margin: "40px auto" }}
      >
        <h3>🧪 Test Features</h3>
        <ul style={{ textAlign: "left" }}>
          <li>✅ Switch customization examples to test styling and logos</li>
          <li>✅ Test different service status (Online/Offline/Maintenance)</li>
          <li>✅ Test floating widget minimize/maximize</li>
          <li>✅ Send messages and test AI responses</li>
          <li>✅ Check responsive behavior</li>
          <li>✅ Test different logo styles per customization</li>
          <li>✅ Verify consistent logo between button and header</li>
          <li>✅ Test input disabled states based on service status</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f9fafb",
          borderRadius: "12px",
          maxWidth: "800px",
          margin: "20px auto",
        }}
      >
        <h4>📝 Development Notes</h4>
        <p>
          <strong>Current Customization:</strong> {currentTheme}
        </p>
        <p>
          <strong>Bot Name:</strong>{" "}
          {customizationExamples[currentTheme].botName}
        </p>
        <p>
          <strong>Logo:</strong> {customizationExamples[currentTheme].logo}
        </p>
        <p>
          <strong>Service Status:</strong> {getStatusText()}
        </p>
        <p>
          <strong>Check Console:</strong> All events are logged to browser
          console
        </p>
        <p>
          <strong>Hot Reload:</strong> Changes in source files will update
          automatically
        </p>
        <p>
          <strong>Floating Widget:</strong> Always appears fixed in the
          bottom-right corner, on top of all page elements
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e5e7eb",
            borderRadius: "8px",
          }}
        >
          <h5>🎛️ Status Testing Guide:</h5>
          <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
            <li>
              <strong>Online:</strong> Full functionality, AI responses enabled,
              input active
            </li>
            <li>
              <strong>Offline:</strong> Input disabled, "Service currently
              offline..." placeholder
            </li>
            <li>
              <strong>Maintenance:</strong> Input disabled, maintenance banner
              shown, special placeholder
            </li>
          </ul>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#dbeafe",
            borderRadius: "8px",
          }}
        >
          <h5>💡 Customization Info:</h5>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            The examples above are <strong>not built-in themes</strong> - they
            demonstrate how you can customize the widget's appearance using the{" "}
            <code>branding</code> prop.
          </p>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            You can create unlimited custom styles by configuring colors, fonts,
            logos, and text to match your brand perfectly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
