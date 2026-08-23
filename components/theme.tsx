"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "@/components/icons";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "theme";

/**
 * Runs before paint to apply the stored (or system) theme and mark the
 * document as JS-enabled. Inlined in <head> so there's no flash of the
 * wrong theme and no flash of hidden scroll-reveal content.
 */
export const themeScript = `
(function(){
  try {
    var d = document.documentElement;
    d.classList.add('js');
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    d.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

/**
 * The `dark` class on <html> is the single source of truth, so the toggle
 * subscribes to it rather than mirroring it into React state. This keeps the
 * inline head script, the OS preference listener, and the button in agreement.
 */
function subscribeToHtmlClass(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle({ onDark = false }: { onDark?: boolean }) {
  const dark = useSyncExternalStore(
    subscribeToHtmlClass,
    () => document.documentElement.classList.contains("dark"),
    () => false, // Server render assumes light; corrected right after hydration.
  );

  // Follow the OS until the user makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      document.documentElement.classList.toggle("dark", e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      aria-pressed={dark}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300",
        onDark
          ? "border-white/20 text-espresso-ink hover:border-white/50"
          : "border-line-strong text-ink hover:border-accent hover:text-accent",
      )}
    >
      <span className="relative block h-[18px] w-[18px]">
        <Sun
          className={cn(
            "absolute inset-0 h-[18px] w-[18px] transition-all duration-500",
            dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
          )}
        />
        <Moon
          className={cn(
            "absolute inset-0 h-[18px] w-[18px] transition-all duration-500",
            dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
          )}
        />
      </span>
    </button>
  );
}
