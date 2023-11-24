import {loadNeome} from "@brijeshdobariya/widget";
import {render} from "preact";
import {useRef} from "preact/compat";
import {useEffect} from "preact/compat";

function App()
{
  const oneEmbedRef = useRef<(() => void) | null>(null);
  const twoEmbedRef = useRef<(() => void) | null>(null);

  useEffect(() =>
  {
    oneEmbedRef.current = loadNeome({
      id: "first",
      showAs: "embed",
      filterEntId: "e-nux8M5a8YWymoZrPWqmBcOWGK",
      selectGroupId: "g-v2ya1OnmgJHmHNFQHdSWZl8er",
      showStudio: true
    });

    twoEmbedRef.current = loadNeome({
      id: "second",
      showAs: "floating"
    });
  }, []);

  return <>
    <button
      className={"clickBtn"}
      onClick={() =>
      {
        oneEmbedRef.current && oneEmbedRef.current();
      }}
    >
      embed
    </button>

    <button
      className={"clickBtn"}
      onClick={() =>
      {
        twoEmbedRef.current && twoEmbedRef.current();
      }}
    >
      floating
    </button>
    <One />
    <Two />
  </>;
}

function One()
{
  return <div
    id={"first"}
    style={{
      width: "500px",
      height: "600px",
      padding: "8px",
      background: "beige"
    }}
  >
  </div>;
}

function Two()
{
  return <div id={"second"}></div>;
}

render(<App />, document.getElementById("app")!);

