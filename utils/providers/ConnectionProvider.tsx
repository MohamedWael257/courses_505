// components/ConnectionProvider.tsx
"use client";
import ConnectionModal from "@/shared/ConnectinModal";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Modal context
interface ModalContextType {
  isVisible: boolean;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ConnectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  useEffect(() => {
    const handleOnline = () => hideModal();
    const handleOffline = () => showModal();

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    if (!navigator.onLine) {
      showModal();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <ModalContext.Provider value={{ isVisible, hideModal }}>
      <ConnectionModal isVisible={isVisible} onClose={hideModal} />
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal context
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ConnectionProvider");
  }
  return context;
};

// CSS styles (optional, can be moved to a separate CSS file)
if (typeof window !== "undefined") {
  const styles = `
        .modal {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }
        .modal-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
        }
        .close-button {
            cursor: pointer;
            font-size: 20px;
        }
    `;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
