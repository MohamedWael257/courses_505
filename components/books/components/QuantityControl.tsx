import { useTranslations } from "next-intl";
import { Dispatch } from "react";
import classes from "./product-details.module.css";
import PlusSign from "@/assets/icons/PlusSign";
import MinusSign from "@/assets/icons/MinusSign";

import ShowAlertMixin from "@/shared/ShowAlertMixin";

interface QuantityControl {
  [x: string]: any;
  count?: any;
  setCount?: Dispatch<any>;
  initialCount?: any;
  label?: string | undefined;
}

const QuantityControl: React.FC<QuantityControl> = ({
  count,
  initialCount,
  setInitialCount,
  setValue,
  label,
  className,
}) => {
  const t = useTranslations("");

  const increment = () => {
    if (initialCount < count) {
      setInitialCount((prevCount: number) => prevCount + 1);
      setValue("quantity", initialCount + 1);
    } else {
      if (count > 0) {
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: t("validations.Only nubmer left in stock", {
            number: initialCount,
          }),
        });
      }
    }
  };

  const decrement = () => {
    if (initialCount > 1) {
      setInitialCount((prevCount: number) => prevCount - 1);
      setValue("quantity", initialCount - 1);
    }
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    const newValue = parseInt(e.target.value, 10);

    if (!isNaN(newValue) && newValue <= count) {
      setInitialCount(newValue);
      setValue("quantity", newValue);
    }
  };

  return (
    <div
      className={`${className} bg-white border-solid border-[1px] bg-[#F5EBF64D] border-[#FEF0E1] py-3 px-4 w-max rounded-lg overflow-hidden flex rtl:flex-row-reverse items-center  ${classes["product-details-button-control"]}`}
      id="count"
    >
      <button
        type="button"
        onClick={decrement}
        className="w-max h-full hover:bg-slate-50 transition-colors text-primary"
      >
        <MinusSign disabled={initialCount <= 1} />
      </button>
      <div className="sm:max-w-48 px-4">
        <input
          name="quantity"
          value={initialCount}
          onChange={handleInputChange}
          className="text-center bg-transparent w-full"
          max={count}
          maxLength={count}
        />
      </div>

      <button
        type="button"
        onClick={increment}
        className=" w-max h-full hover:bg-slate-50 transition-colors text-primary"
      >
        <PlusSign disabled={initialCount >= count} />
      </button>
    </div>
  );
};

export default QuantityControl;
