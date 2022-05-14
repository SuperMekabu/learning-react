import React, { FC, useMemo, useState } from "react";
import "./App.css";
import { atom, RecoilRoot, RecoilState, useRecoilState } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <main>
          <p>AAAA</p>
          <Inner />
          <Inner2Wrapper />
          <Inner3Wrapper />
          <Inner4Wrapper />
        </main>
      </div>
    </RecoilRoot>
  );
}

const Inner = () => {
  console.log("redraw");
  const [state, setState] = useState(0);

  return (
    <div>
      <button onClick={() => setState((prev) => prev + 1)}>increment</button>
      <p>{state}</p>
    </div>
  );
};

const Inner2Wrapper = () => {
  console.log("Inner2Wrapper redraw");
  const [state, setState] = useState(0);

  return (
    <div>
      <button onClick={() => setState((prev) => prev + 1)}>increment</button>
      <Inner2 state={state} />
    </div>
  );
};

const Inner2: FC<{ state: number }> = ({ state }) => {
  console.log("Inner2 redraw");
  return (
    <div>
      <p>{state}</p>
    </div>
  );
};

const Inner3Wrapper = () => {
  console.log("Inner3Wrapper redraw");
  const stateAtom = useMemo(
    () =>
      atom({
        key: `${new Date()}/${Math.random()}`,
        default: 0,
      }),
    []
  );

  return <Inner3 stateAtom={stateAtom} />;
};

const Inner3: FC<{ stateAtom: RecoilState<number> }> = ({ stateAtom }) => {
  console.log("Inner3 redraw");
  const [state, setState] = useRecoilState(stateAtom);

  return (
    <div>
      <button onClick={() => setState((prev) => prev + 1)}>increment</button>
      <p>{state}</p>
    </div>
  );
};

const IndependentAtom = atom({
  key: `independent/${Math.random()}`,
  default: 0,
});

const Inner4Wrapper = () => {
  console.log("Inner4Wrapper redraw");
  return <Inner4 />;
};

const Inner4 = () => {
  console.log("Inner4 redraw");
  const [state, setState] = useRecoilState(IndependentAtom);
  return (
    <div>
      <button onClick={() => setState((prev) => prev + 1)}>increment</button>
      <p>{state}</p>
    </div>
  );
};

export default App;
