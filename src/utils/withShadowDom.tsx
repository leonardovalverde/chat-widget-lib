import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { setup } from "goober";
import { createShadowRoot, insertGlobalStyles } from "./shadowDom";

export function withShadowDom<T extends object>(
  Component: React.ComponentType<T>
) {
  return (props: T) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const reactRootRef = useRef<ReturnType<typeof createRoot> | null>(null);

    useEffect(() => {
      if (!hostRef.current) return;

      // Cria shadowRoot
      const shadowRoot = createShadowRoot(hostRef.current);

      // Injeta estilos globais (reset, variáveis, etc)
      insertGlobalStyles(shadowRoot);

      // Configura o Goober para usar o shadowRoot
      setup(React.createElement, undefined, shadowRoot);

      // Cria container para React dentro do shadowRoot
      const reactContainer = document.createElement("div");
      shadowRoot.appendChild(reactContainer);

      // Renderiza o componente dentro do shadowRoot
      reactRootRef.current = createRoot(reactContainer);
      reactRootRef.current.render(<Component {...props} />);

      return () => {
        reactRootRef.current?.unmount();
        shadowRoot.removeChild(reactContainer);
      };
    }, []);

    return <div ref={hostRef} />;
  };
}
