type ChartBarProps = {
  index: number;
  value: number;
  getBarColor: (index: number) => string;
};

const ChartBar: React.FC<ChartBarProps> = ({ index, value, getBarColor }) => {
  return (
    <div
      key={index}
      className={`${getBarColor(index)} w-full transition-all duration-100`}
      style={{
        height: `${value}%`,
      }}
    ></div>
  );
};

export default ChartBar;
