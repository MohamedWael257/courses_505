"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import SocketProvider from "./SocketProvider";

interface Props {
  children: React.ReactNode;
}

export default function ProviderStore({ children }: Props) {
  return (
    <Provider store={store}>
      <SocketProvider>{children}</SocketProvider>
    </Provider>
  );
}
