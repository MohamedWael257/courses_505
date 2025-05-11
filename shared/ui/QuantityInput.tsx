import { SetStateAction } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';

interface Props {
  quantity: number;
  setQuantity: React.Dispatch<SetStateAction<number>>;
}
export default function QuantityInput({ quantity, setQuantity }: Props) {
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center font-extrabold text-xl *:font-Cairo">
      <button
        onClick={handleDecrease}
        className="w-12 h-12 flex items-center bg-[#ebf3f6] text-secondary justify-center rounded-full "
      >
        <FaMinus className="w-6 h-3" />
      </button>
      <p className="text-xl font-medium text-center min-w-8">{quantity}</p>
      <button
        onClick={handleIncrease}
        className="w-12 h-12 flex items-center bg-[#ebf3f6] text-secondary justify-center rounded-full "
      >
        <FaPlus size={20} />
      </button>
    </div>
  );
}
