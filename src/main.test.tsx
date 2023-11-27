import {render} from "preact";
import {useCallback} from "preact/compat";
import {useRef} from "preact/compat";
import {floating} from "./index";
import {NeomeWidgetFloating} from "./index";
import {NeomeWidgetEmbed} from "./index";
import {embed} from "./index";

function App()
{
  return <>
    <div style={{display: "flex", justifyContent: "space-evenly"}}>
      <Neome
        id={"one"}
        config={{
          id: "first",
          filterEntId: "e-b4HYFuwnVHShF72tVbdytYVYD",
          selectGroupId: "g-jtufQNktm1VHwSqtIMnSgoeTN",
          showStudio: true,
          showTerminal: true,
          userCredentials: [
            {
              handle: "akash@neoxl.com",
              password: "Akash987"
            }
          ]
        }}
        showAs={"embed"}
      />
      <Neome
        id={"second"}
        config={{
          id: "second",
          filterEntId: "e-0b1hiotFKBW8qsCS3tzhyRhZf",
          allowPersonalChat: true,
          selectGroupId: "g-zmI4Fa6QYtHIBIWrCyUifWhBt",
          showStudio: true,
          demoFlag: true,
          userCredentials: [
            {
              handle: "brijesh@neoxl.com",
              password: "Brijesh@123"
            }
          ]
        }}
        showAs={"embed"}
      />
    </div>
  </>;
}

function Neome(props: {
  showAs: "embed" | "floating"
  config: NeomeWidgetEmbed | NeomeWidgetFloating,
  id: string
})
{
  const neomeRef = useRef<(() => void) | null>(null);

  const load = useCallback(() =>
  {
    if(props.showAs === "embed")
    {
      neomeRef.current = embed(props.config);
    }
    else if(props.showAs === "floating")
    {
      neomeRef.current = floating(props.config);
    }
  }, [props]);

  const remove = useCallback(() =>
  {
    if(neomeRef.current)
    {
      neomeRef.current();
    }
  }, []);

  return (
    <>
      <div
        id={props.config.id}
        style={{
          width: "500px",
          height: "600px",
          borderRadius: "8px",
          border: "8px solid black",
          background: "#d3f0ff"
        }}
      >
      </div>

      <button onClick={load}>Load</button>
      <button onClick={remove}>Remove</button>
    </>
  );
}

render(<App />, document.getElementById("app")!);

