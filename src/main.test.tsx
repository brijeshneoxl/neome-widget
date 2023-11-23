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
      userEmailId: "brijesh@neoxl.com",
      userPassword: "Brijesh@123",
      filterEntId: "e-nux8M5a8YWymoZrPWqmBcOWGK",
      showStudio: true
    });

    twoEmbedRef.current = loadNeome({
      id: "second",
      showAs: "floating"
    });
  }, []);

  return <>
    <button
      onClick={() =>
      {
        oneEmbedRef.current && oneEmbedRef.current();
      }}
    >
      embed
    </button>

    <button
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

