import {embed} from "@brijeshdobariya/widget";
import {render} from "preact";
import {useRef} from "preact/compat";
import {useEffect} from "preact/compat";

function App()
{
  const oneEmbedRef = useRef<() => void>(null);
  const twoEmbedRef = useRef<() => void>(null);

  useEffect(() =>
  {
    oneEmbedRef.current = embed({
      id: "one",
      showAs: "embed"
    });
  }, []);

  return <>
    <button
      onClick={() =>
      {
        oneEmbedRef.current();
      }}
    >
      Click
    </button>
    <One />
  </>;
}

function One()
{
  return <div
    id={"one"}
    style={{
      width: "500px",
      height: "600px",
      padding: "8px",
      background: "beige"
    }}
  ></div>;

}

function Two()
{

  return <div
    id={"two"}
    style={{
      width: "500px",
      height: "600px",
      padding: "8px",
      background: "red"
    }}
  ></div>;

}

render(<App />, document.getElementById("app")!);

