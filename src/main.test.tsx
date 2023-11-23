import {render} from "preact";
import {useRef} from "preact/compat";
import {useEffect} from "preact/compat";

function App()
{
  const oneEmbedRef = useRef<() => void>(null);
  const twoEmbedRef = useRef<() => void>(null);

  useEffect(() =>
  {
    // oneEmbedRef.current = loadNeome({
    //   id: "one",
    //   showAs: "embed",
    //   userEmailId:"brijesh@neoxl.com",
    //   userPassword:"Brijesh@123",
    //   filterEntId:"e-nux8M5a8YWymoZrPWqmBcOWGK",
    //   showStudio:true,
    // });
  }, []);

  return <>
    <button
      onClick={() =>
      {
        // oneEmbedRef.current();
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

