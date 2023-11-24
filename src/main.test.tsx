import {render} from "preact";
import {useRef} from "preact/compat";
import {useEffect} from "preact/compat";
import {loadNeome} from "./index";

function App()
{
  const oneEmbedRef = useRef<(() => void) | null>(null);
  const twoEmbedRef = useRef<(() => void) | null>(null);

  useEffect(() =>
  {
    oneEmbedRef.current = loadNeome({
      id: "first",
      showAs: "embed",
      filterEntId: "e-N4NVnFrsiWNwiS3WdvTW3RR7c",
      selectGroupId: "g-mPj7qsudWbaCxlgPdArn3lZ7Z",
      demoFlag: false,
      showStudio: true,
      userCredentials: [
        {
          handle: "akash@neoxl.com",
          password: "Akash987"
        }
      ]
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
      Remove embed
    </button>

    <button
      className={"clickBtn"}
      onClick={() =>
      {
        twoEmbedRef.current && twoEmbedRef.current();
      }}
    >
      Remove floating
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
  return <div
    id={"second"}
    style={{
      position: "fixed",
      top: "32px",
      right: "32px"
    }}
  ></div>;
}

render(<App />, document.getElementById("app")!);

