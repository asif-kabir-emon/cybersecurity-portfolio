"use client";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
