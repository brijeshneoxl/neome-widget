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
      showStudio: true,
      allowPersonalChat: true,
      userCredentials: [
        {
          handle: "akash@neoxl.com",
          password: "Akash987"
        }
      ]
    });

    twoEmbedRef.current = loadNeome({
      id: "second",
      showAs: "embed",
      allowPersonalChat: true,
      filterEntId: "e-VtoZ838Pj6N2ug3Ol5hrgGIR3",
      selectGroupId: "g-9EcDmolqtOxs3mhvlo7nLWICQ",
      showStudio: true,
      demoFlag: true,
      userCredentials: [
        {
          handle: "brijesh@neoxl.com",
          password: "Brijesh@123"
        }
      ]
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
    <One2 />
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

function One2()
{
  return <div
    id={"second"}
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

