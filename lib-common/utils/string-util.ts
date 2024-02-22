export const booleanify = (value: string): boolean => {
  const truthy: string[] = ['true', '1'];
  return truthy.includes(value.trim().toLowerCase());
};
