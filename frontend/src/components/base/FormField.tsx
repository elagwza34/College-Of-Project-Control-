import { useId } from 'react';
interface Props { name: string; label: string; type?: string; required?: boolean; autoComplete?: string; options?: string[]; multiline?: boolean; error?: string; help?: string; }
export default function FormField({ name, label, type = 'text', required, autoComplete, options, multiline, error, help }: Props) {
  const id = useId();
  const props = { id, name, required, 'aria-invalid': Boolean(error), 'aria-describedby': error ? `${id}-error` : help ? `${id}-help` : undefined, className: 'form-control' };
  return <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}{required ? ' (required)' : ' (optional)'}</label>
    {options ? <select {...props}><option value="">Select an option</option>{options.map(option => <option key={option}>{option}</option>)}</select>
      : multiline ? <textarea {...props} rows={4} maxLength={2000} /> : <input {...props} type={type} autoComplete={autoComplete} />}
    {help && <p id={`${id}-help`} className="mt-2 text-sm text-foreground-600">{help}</p>}
    {error && <p id={`${id}-error`} className="mt-2 text-sm text-red-700">{error}</p>}
  </div>;
}
