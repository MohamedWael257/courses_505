// export default CartProductQuantity;
import { useTranslations } from "next-intl";
import classes from "../components/books/components/product-details.module.css";
import MinusSign from "../assets/icons/MinusSign";
import PlusSign from "../assets/icons/PlusSign";
import Image from "next/image";
import { Loader, Loader2 } from "lucide-react";
import { BiTrash } from "react-icons/bi";
import { Delete } from "./Icons";
import { useState } from "react";
import ShowAlertMixin from "./ShowAlertMixin";

interface CartProductQuantity {
  [x: string]: any;
}

const CartProductQuantity: React.FC<CartProductQuantity> = ({
  quantity,
  decrease,
  AddToCart,
  loading,
  className,
}) => {
  const t = useTranslations("");

  return (
    <div
      className={`${className}  border-solid border !bg-secprimary !border-primary py-2 px-4 w-max rounded-full overflow-hidden flex rtl:flex-row-reverse items-center  ${classes["product-details-button-control"]}`}
      id="count"
      // onBlur={edit ? UpdateCart : notEdit}
    >
      <button
        type="button"
        onClick={decrease}
        disabled={loading}
        className="w-max h-full hover:bg-slate-50 transition-colors text-primary"
      >
        {quantity <= 1 ? (
          <Delete color={"#4f008c"} className="size-5" />
        ) : (
          <MinusSign disabled={true} />
        )}
      </button>
      <div className="sm:max-w-48 px-4">
        {loading ? (
          <Loader className="text-primary w-[18px] h-[30px] animate-spin" />
        ) : (
          <span className="min-w-[50px]">
            {quantity.toString().padStart(2, "0")}
          </span>
        )}
      </div>
      <button
        disabled={loading}
        type="button"
        onClick={AddToCart}
        className=" w-max h-full hover:bg-slate-50 transition-colors text-primary"
      >
        <PlusSign disabled={true} />
      </button>
    </div>
  );
};

export default CartProductQuantity;
