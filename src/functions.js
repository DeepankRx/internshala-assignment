export function formatFieldName(fieldName) {
  return (
    fieldName.charAt(0).toUpperCase() +
    fieldName.slice(1).replace(/([A-Z])(?=[a-z])/g, " $1")
  );
}
