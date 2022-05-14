import React, { FC, useMemo, useState } from "react";
import "./App.css";
import {
  atom,
  RecoilRoot,
  RecoilState,
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

function App() {
  console.log("OUter redraw");
  return (
    <RecoilRoot>
      <div className="App">
        <main>
          <p>AAAA</p>
          <Inner />
          <Inner2Wrapper />
          <Inner2_2Wrapper />
          <Inner3Wrapper />
          <Inner3_2Wrapper />
          <Inner4Wrapper />
        </main>
      </div>
    </RecoilRoot>
  );
}

const Inner = () => {
  console.log("Inner redraw");
  const [state, setState] = useState(0);

  return (
    <div>
      <h3>Inner</h3>
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
      <h3>Inner2</h3>
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

const Inner2_2Wrapper = () => {
  console.log("Inner2_2Wrapper redraw");
  const [state, setState] = useState(0);

  return (
    <div>
      <Inner2_2 state={state} setState={setState} />
    </div>
  );
};

const Inner2_2: FC<{ state: number; setState: React.Dispatch<React.SetStateAction<number>> }> = ({
  state,
  setState,
}) => {
  console.log("Inner2_2 redraw");
  return (
    <div>
      <h3>Inner2_2</h3>
      <button onClick={() => setState((prev) => prev + 1)}>increment</button>
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
  const setState = useSetRecoilState(stateAtom);

  return <Inner3 setState={setState} stateAtom={stateAtom} />;
};

const Inner3: FC<{ setState: SetterOrUpdater<number>; stateAtom: RecoilState<number> }> = ({
  setState,
  stateAtom,
}) => {
  console.log("Inner3 redraw");
  const state = useRecoilValue(stateAtom);

  return (
    <div>
      <h3>Inner3</h3>
      <button onClick={() => setState((prev) => prev + 1)}>increment</button>
      <p>{state}</p>
    </div>
  );
};

const Inner3_2Wrapper = () => {
  console.log("Inner3_2Wrapper redraw");
  const stateAtom = useMemo(
    () =>
      atom({
        key: `${new Date()}/${Math.random()}`,
        default: 0,
      }),
    []
  );

  return <Inner3_2 stateAtom={stateAtom} />;
};

const Inner3_2: FC<{ stateAtom: RecoilState<number> }> = ({ stateAtom }) => {
  console.log("Inner3_2 redraw");
  const [state, setState] = useRecoilState(stateAtom);

  return (
    <div>
      <h3>Inner3_2</h3>
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
      <h3>Inner4</h3>
      <button onClick={() => setState((prev) => prev + 1)}>increment</button>
      <p>{state}</p>
    </div>
  );
};

export default App;
