interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

const SectionCard = ({ children, className = '' }: SectionCardProps) => {
  return (
    <section className={`bg-(--color-secondary) w-full rounded-2xl p-5 shadow-sm ${className}`}>{children}</section>
  );
};

export default SectionCard;
