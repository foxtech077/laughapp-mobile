export function maskMobileNumber(
  value: string | number | null | undefined,
  maskChar: string = "*",
  visibleCount: number = 4,
): string {
  if (value === null || value === undefined) return "";
  const digits = String(value).replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length <= visibleCount) return digits;
  const visible = digits.slice(-visibleCount);
  const masked = maskChar.repeat(digits.length - visibleCount);
  return `${masked}${visible}`;
}