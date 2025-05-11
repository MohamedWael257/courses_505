import { Steps } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  steps: any;
  status: any;
};

export default function OrderSteps({ steps, status }: Props) {
  const t = useTranslations();
  const pendingsteps = {
    prepare_at: steps?.prepare_at,
    delivered_for_shipment_at: steps?.delivered_for_shipment_at,
    shipped_at: steps?.shipped_at,
    delivered_to_customer_at: steps?.delivered_to_customer_at,
  };
  const pendingSteps = Object.entries(pendingsteps).map(([key, value]) => ({
    completed: value ? true : false,
  }));
  const pendingCompletedSteps = pendingSteps.filter(
    (step: any) => step.completed
  ).length;

  const cancelSteps = Object.entries(steps).map(([key, value]) => ({
    title: key.replace("_at", ""),
    description: value,
    // completed: value ? true : false,
  }));
  cancelSteps.shift();
  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4 text-start text-text">
        {t("Text.follow_your_order")}
      </h2>

      {status == "cancelled" ? (
        <>
          <Steps
            className="order-steps"
            direction="vertical"
            current={cancelSteps.length - 1}
            status="error"
            items={cancelSteps.map((step: any) => ({
              title: t(`status.${step.title}`),
              description: step.description,
            }))}
          />
        </>
      ) : (
        <Steps
          className="order-steps"
          direction="vertical"
          current={
            status == "delivered_to_customer" ? 3 : pendingCompletedSteps - 1
          }
          // status="error"
          items={[
            {
              title: t("status.prepare"),
              description: steps?.prepare_at,
            },
            {
              title: t("status.delivered_for_shipment"),
              description: steps?.delivered_for_shipment_at,
            },
            {
              title: t("status.shipped"),
              description: steps?.shipped_at,
            },
            {
              title: t("status.delivered_to_customer"),
              description: steps?.delivered_to_customer_at,
            },
          ]}
        />
      )}

      {/* <div className="space-y-4 relative">
        <div className="absolute z-1 h-[85%] w-[6px] top-[10px] start-[5px] bg-greynormal">
          <div
            className="absolute w-full bg-success"
            style={{
              height: `${completionPercentage}%`,
            }}
          ></div>
        </div>

        {steps.map((step: any, index: number) => (
          <div key={index} className="flex items-start">
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full me-3 mt-[8px] relative z-3 ${
                  step.completed ? "bg-success" : "bg-greynormal"
                }`}
              ></div>
              {index < steps.length - 1 && (
                <div
                  className={`w-1 flex-1 me-3 relative z-3 ${
                    step.completed ? "bg-success" : "bg-greynormal"
                  }`}
                ></div>
              )}
            </div>
            <div className="flex-1 pl-4">
              <h3 className="text-start text-lg font-medium text-text">
                {step.title}
              </h3>
              <p className="text-start font-normal text-sm text-secondrydark">
                {step?.created_at}
              </p>
            </div>
          </div>
        ))}
      </div> */}

      {/* <div className="absolute z-1 h-[85%] w-[4px] top-[8px] start-[6px] bg-greynormal">
        {status == "pending" || status == "completed" ? (
          <div
            className="absolute w-full bg-success"
            style={{
              height: `${completionPercentage}%`,
            }}
          ></div>
        ) : (
          <>
            <div
              className="absolute w-full bg-success"
              style={{
                height: `50%`,
              }}
            ></div>
            <div
              className="absolute w-full bg-success"
              style={{
                height: `50%`,
              }}
            ></div>
          </>
        )}
      </div>
      {steps.map((step: any, index: number) => (
        <div key={index} className="flex items-start">
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full me-3 mt-[8px] relative z-3 ${
                step.completed ? "bg-success" : "bg-greynormal"
              }`}
            ></div>

            {index < steps.length - 1 &&
            (status == "pending" || status == "completed") ? (
              <div
                className={`w-1 flex-1 me-3 relative z-3 ${
                  step.completed ? "bg-success" : "bg-greynormal"
                }`}
              ></div>
            ) : (
              <div
                className={`w-1 flex-1 me-3 relative z-3 ${
                  step.completed ? "bg-error/90" : "bg-greynormal"
                }`}
              ></div>
            )}
          </div>
          <div className="flex-1 pl-4">
            <h3 className="text-start text-lg font-medium text-text">
              {step.title}
            </h3>
            <p className="text-start font-normal text-sm text-secondrydark">
              {step?.created_at}
            </p>
          </div>
        </div>
      ))} */}
    </div>
  );
}
