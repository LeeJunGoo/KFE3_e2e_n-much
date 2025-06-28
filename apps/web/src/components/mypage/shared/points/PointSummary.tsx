type PointSummaryProps = {
  amount: number;
  balance: number;
};

const PointSummary = ({ amount, balance }: PointSummaryProps) => {
  const pointColor = amount > 0 ? 'text-(--color-accent)' : 'text-(--color-red)';

  return (
    <div>
      <p className="flex flex-col items-end text-xs">
        <span className={`text-lg font-medium ${pointColor}`}>{amount > 0 ? `+${amount}P` : `${amount}P`}</span>
        <span className="text-(--color-warm-gray)">잔액: {balance}P</span>
      </p>
    </div>
  );
};

export default PointSummary;
