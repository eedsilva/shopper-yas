import { type RefObject, useEffect, useRef } from "react";

function useDialogFocus<T extends HTMLElement>(isActive: boolean, focusTarget: RefObject<T>): void {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const node = focusTarget.current;
    const frame = window.requestAnimationFrame(() => {
      node?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (previousFocusRef.current) {
        previousFocusRef.current.focus({ preventScroll: true });
      }
      previousFocusRef.current = null;
    };
  }, [focusTarget, isActive]);
}

export default useDialogFocus;
