import { createContext, ReactNode, useContext, useState } from "react";

interface CounterContextInterface {
  count: number;
  setCount: (count: number) => void;
  increment: () => void;
  decrement: () => void;
}

export const CounterContext = createContext<
  CounterContextInterface | undefined
>(undefined);

interface CounterProviderProps {
  children: ReactNode;
}

export const CounterProvider = ({ children }: CounterProviderProps) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);

  const value = {
    count,
    setCount,
    increment,
    decrement,
  };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }

  return context;
};
