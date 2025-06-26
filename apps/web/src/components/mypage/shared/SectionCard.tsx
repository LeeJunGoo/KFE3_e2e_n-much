interface SectionCardProps {
  children: React.ReactNode;
}

const SectionCard = ({ children }: SectionCardProps) => {
  return <section className="w-full rounded-2xl bg-(--color-secondary) p-5 shadow-xs">{children}</section>;
};

export default SectionCard;
