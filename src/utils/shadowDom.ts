import "../styles/goober-setup";

export const createShadowRoot = (element: HTMLElement): ShadowRoot => {
  if (element.shadowRoot) {
    return element.shadowRoot;
  }

  return element.attachShadow({ mode: "open" });
};

export const insertGlobalStyles = (shadowRoot: ShadowRoot) => {
  const style = document.createElement("style");
  style.textContent = `
    /* Reset básico dentro do Shadow DOM */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    /* Font family padrão */
    * {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
                   "Helvetica Neue", Arial, sans-serif;
    }
    
    /* Scroll personalizado */
    ::-webkit-scrollbar {
      width: 4px;
    }
    
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    
    ::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 2px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background-color: #94a3b8;
    }
    
    /* Keyframes globais */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `;

  shadowRoot.appendChild(style);
};
