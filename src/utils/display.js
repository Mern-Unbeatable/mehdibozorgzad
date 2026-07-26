/**
 * Safely turn API values into text for JSX.
 * The backend sometimes sends strings, sometimes objects like { id, name, createdAt }.
 */
export function displayLabel(value) {
  if (value == null || value === '') return '';

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (typeof value === 'object') {
    return value.name ?? value.label ?? value.title ?? value.email ?? '';
  }

  return String(value);
}
