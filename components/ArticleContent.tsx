"use client";

import { useEffect, useRef } from "react";

export default function ArticleContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Wrap tables in a scrollable container
    const tables = ref.current.querySelectorAll<HTMLElement>("table");
    tables.forEach((table) => {
      if (table.parentElement?.classList.contains("table-wrapper")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "table-wrapper";
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    const windows = ref.current.querySelectorAll<HTMLElement>(".code-window");

    windows.forEach((win) => {
      // Avoid duplicates on re-renders
      if (win.querySelector(".copy-btn")) return;

      const titlebar = win.querySelector<HTMLElement>(".code-titlebar");
      const code = win.querySelector("code");
      if (!titlebar || !code) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copiar";
      btn.setAttribute("aria-label", "Copiar código");

      btn.addEventListener("click", async () => {
        const text = code.innerText;
        let success = false;

        // Secure context (HTTPS / localhost)
        if (navigator.clipboard && window.isSecureContext) {
          try {
            await navigator.clipboard.writeText(text);
            success = true;
          } catch { /* fall through */ }
        }

        // Fallback: textarea + execCommand (works over plain HTTP)
        if (!success) {
          try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            success = document.execCommand("copy");
            document.body.removeChild(ta);
          } catch { /* ignored */ }
        }

        if (success) {
          btn.textContent = "✓ Copiado";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "Copiar";
            btn.classList.remove("copied");
          }, 2000);
        } else {
          btn.textContent = "✗ Error";
          setTimeout(() => { btn.textContent = "Copiar"; }, 2000);
        }
      });

      // Append inside the titlebar (right side, after the lang label)
      titlebar.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="prose-neo"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
