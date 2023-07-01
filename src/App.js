import { create } from "./zustand";
import "./styles.css";

const useCounterStore = create((set) => ({
  count: 0,
  increase: (count) => set((state) => ({ ...state, count })),
  decrease: (count) => set((state) => ({ ...state, count }))
}));

function Counter() {
  const state = useCounterStore((state) => state);
  const { count, increase, decrease } = state;

  return (
    <div>
      Counter:{count}
      <button onClick={() => increase(count + 1)}>+</button>
      <button onClick={() => decrease(count - 1)}>-</button>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}
