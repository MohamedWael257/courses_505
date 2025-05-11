"use client";
import React from "react";
import AppModal from "./CustomModal/AppModal";

const ConnectionModal: React.FC<{ isVisible: boolean; onClose: () => void }> = ({
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <AppModal
      getContainer={false}
      isModalVisible={isVisible}
      closeIcon={false}
      centered
    >
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          <p>No internet connection. Please check your network.</p>
        </div>
      </div>
    </AppModal>
  );
};
export default ConnectionModal;
