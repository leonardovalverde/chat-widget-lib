/**
 * Mock AI responses for demonstration purposes
 */
const MOCK_RESPONSES = [
  "I understand! Let me help you with that.",
  "That's a great question. Here's what I can do for you...",
  "I'm here to assist you. Let me check the details.",
  "Thanks for that information. I'll process this for you.",
  "Perfect! I've noted that down. What else can I help with?",
  "I see what you mean. Let me provide you with the best solution.",
  "Excellent! I'm working on that for you right now.",
  "That makes sense. I have a few options for you to consider.",
];

/**
 * Generates a contextual AI response based on user input
 */
export const generateMockResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! How can I assist you today?";
  }
  if (lowerMessage.includes("help")) {
    return "I'm here to help! What do you need assistance with?";
  }
  if (lowerMessage.includes("thank")) {
    return "You're very welcome! Is there anything else I can help you with?";
  }
  if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
    return "Goodbye! Have a great day and feel free to reach out if you need anything else.";
  }

  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
};

/**
 * Simulates AI thinking time
 */
export const simulateThinkingDelay = (): Promise<void> => {
  const delay = Math.random() * 1500 + 500;
  return new Promise((resolve) => setTimeout(resolve, delay));
};
