"use client";
import React, { useEffect, useMemo } from "react";
import OrderDate from "./components/OrderDate";
import OrderSteps from "./components/OrderSteps";
import OrderProducts from "./components/OrderProducts";
import OrderDeliverDetail from "./components/OrderDeliverDetail";
import OrderShippingDetail from "./components/OrderShippingDetail";
import OrderPayment from "./components/OrderPayment";
import OrderProvider from "./components/OrderProvider";
import OrderInvoice from "./components/OrderInvoice";
import OrderCancelButton from "./components/OrderCancelButton";
import OrderQuestionierButton from "./components/OrderQuestionierButton";
import OrderReturnButton from "./components/OrderReturnButton";
import OrderCancelReason from "./components/OrderCancelReason";
import OrderTop from "@/components/profile/orders/OrderTop";
import OrderReturnedProducts from "./components/OrderReturnedProducts";
import OrderReturnedDetails from "./components/OrderReturnedDetails";
import UseSession from "@/store/UseSession";
import { SessionType } from "@/components/Header";
import { useSocketContext } from "@/utils/providers/SocketProvider";
type Props = {
  data: any;
  refetch: any;
};

export default function OrderIndex({ data, refetch }: Props) {
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);
  const { subscribeToUserNotifications, unsubscribeFromUserNotifications } =
    useSocketContext();
  useEffect(() => {
    const userID = memoizedSession?.id;
    if (userID) {
      subscribeToUserNotifications(userID, (notification) => {
        console.log("Received new notificaton:", notification);

        if (notification?.type == "order") {
          console.log("Received new notificaton:", notification);
          setTimeout(() => {
            refetch();
          }, 500);
        }
      });
    }
    // Cleanup subscription when component unmounts
    return () => {
      if (userID) {
        unsubscribeFromUserNotifications(userID);
      }
    };
  }, [subscribeToUserNotifications, unsubscribeFromUserNotifications]);

  return (
    <>
      <OrderTop />
      <div className="grid lg:grid-cols-2 gap-x-4 gap-y-2">
        {/* right */}
        <div>
          <OrderDate
            status={data?.status}
            orderId={data?.uuid}
            orderDate={data?.tracking}
          />
          {data?.status !== "returned" && (
            <OrderSteps status={data?.status} steps={data?.tracking} />
          )}
          {data?.statue == "cancelled" && <OrderCancelReason />}
          {data?.status !== "returned" ? (
            <OrderProducts
              status={data?.status}
              vendor={data?.vendor}
              products={data?.items}
              orderId={data?.uuid}
              refetch={refetch}
            />
          ) : (
            <>
              <OrderReturnedProducts
                vendor={data?.vendor}
                products={data?.items}
              />
              <OrderReturnedDetails returnDetails={data?.returnDetails} />
            </>
          )}
          {/* {data?.status == "returned" && (
                   <>
                     <OrderReturnedProducts
                       vendor={data?.vendor}
                       products={data?.items}
                     />
                     <OrderReturnedDetails returnDetails={data?.returnDetails} />
                   </>
                 )} */}
        </div>
        {/* left */}
        <div>
          <OrderDeliverDetail deliverDetails={data} />
          <OrderShippingDetail
            status={data?.status}
            shippingDetails={data}
            orderId={data?.uuid}
          />
          <OrderPayment payment_method={data.payment_method} />
          <OrderProvider
            status={data?.status}
            vendor={data.vendor}
            orderId={data?.uuid}
            refetch={refetch}
          />
          <OrderInvoice invoice={data} />
          {(data?.status == "pending" || data?.status == "preparing") && (
            <OrderCancelButton refetch={refetch} orderId={data?.uuid} />
          )}
          {data?.status == "delivered_to_customer" && (
            <OrderReturnButton orderId={data?.uuid} refetch={refetch} />
          )}
          {(data?.status == "delivered_to_customer" ||
            data?.status == "cancelled") && (
            <OrderQuestionierButton refetch={refetch} />
          )}
        </div>
      </div>
    </>
  );
}
