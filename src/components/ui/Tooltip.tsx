import { useId, useState, type ReactNode } from 'react';

interface TooltipProps {
  label: string;
  children: ReactNode;
}

/**
 * Tooltip composable envuelve cualquier elemento hijo. 
 * Accesibilidad lo describe con ARIA, role="tooltip" y se muestra también con foco de teclado.
 */
export function Tooltip({ label, children }: TooltipProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="tooltip"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>
      <span
        role="tooltip"
        id={id}
        className="tooltip__bubble"
        data-visible={visible}
      >
        {label}
      </span>
    </span>
  );
}