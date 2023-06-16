export default function isEmpty<T>(value: T) {
  if (value === "" || value === null || value === undefined) return true;
  return false;
}
