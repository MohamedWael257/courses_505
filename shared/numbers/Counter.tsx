import { useEffect, useState, useRef } from "react";

interface CounterProps {
  goal: number;
  text: string;
}

const Counter: React.FC<CounterProps> = ({ goal, text }) => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let current = 0;
    const interval = 2000 / goal;

    const startCount = () => {
      intervalRef.current = setInterval(() => {
        current += 1;
        setCount(current);

        if (current === goal) {
          if (intervalRef.current) clearInterval(intervalRef.current);

          // Restart after 2 seconds
          //   setTimeout(() => {
          //     setCount(0);
          //     current = 0;
          //     startCount();
          //   }, 2000);
        }
      }, interval);
    };

    startCount();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goal]);

  return (
    <div className="grid justify-center">
      <h2 className="text-5xl font-bold   leading-10 text-center text-white mb-4">
        {count}
      </h2>
      <p className="text-2xl   leading-9 text-center font-medium text-border">
        {text}
      </p>
    </div>
  );
};

export default Counter;
