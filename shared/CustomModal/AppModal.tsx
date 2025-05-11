import React from "react";
import { Modal } from "antd";

interface AppModalProps {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  modalTitle?: string;
  isModalVisible?: boolean;
  onOk?: () => void;
  footer?: boolean;
  width?: number | string;
  centered?: boolean;
  closeIcon?: boolean;
  getContainer?: any;
  onCancel?: () => void;
}

const AppModal = ({
  children,
  className,
  wrapperClassName,
  modalTitle,
  isModalVisible,
  onOk,
  footer = false,
  width,
  centered,
  onCancel,
  closeIcon,
  getContainer = false
}: AppModalProps) => {
  return (
    <>
      <Modal
        zIndex={9999}
        className={className ? `createApp-Modal ${className}` : "createApp-Modal"}
        title={modalTitle ? modalTitle : false}
        open={isModalVisible}
        onOk={onOk}
        wrapClassName={wrapperClassName||""}
        onCancel={onCancel}
        footer={footer}
        width={width}
        centered={centered}
        closeIcon={closeIcon}
        getContainer={getContainer}
      >
        {children}
      </Modal>
    </>
  );
};

export default AppModal;
