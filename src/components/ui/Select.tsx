import { useId, type ReactNode } from 'react';

export interface SelectOption<T extends string> {
  value: T;
  label: ReactNode;
}

interface SelectProps<T extends string> {
  label: string;
  value: T;
  options: readonly SelectOption<T>[];
  disabled?: boolean;
  onChange: (value: T) => void;
}

export function Select<T extends string>({ label, value, options, disabled, onChange }: SelectProps<T>) {
  const id = useId();
  return (
    <span className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      <select
        id={id}
        className="select"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </span>
  );
}
