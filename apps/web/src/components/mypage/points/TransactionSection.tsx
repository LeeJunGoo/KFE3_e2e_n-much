import SectionHeader from 'src/components/common/ui/SectionHeader';
import TransactionHistoryList from './TransactionHistoryList';
import type { Activity } from 'src/types/mypage';

interface TransactionSectionProps {
  activities: Activity[];
}

const TransactionSection = ({ activities }: TransactionSectionProps) => {
  return (
    <section className="mt-8">
      <SectionHeader className="mb-3">거래 내역</SectionHeader>
      <TransactionHistoryList activities={activities} />
    </section>
  );
};

export default TransactionSection;
