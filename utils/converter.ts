export const convertLibphonenumberToMask = (value: string): string => value
  .replace('x', '+')
  .replaceAll('x', '0')
