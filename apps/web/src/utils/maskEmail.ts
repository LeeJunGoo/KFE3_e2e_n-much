export const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@');
  const visible = local!.slice(0, 5);
  return `${visible}***@${domain}`;
};
