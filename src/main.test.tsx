import {render} from "preact";
import {useCallback} from "preact/compat";
import {useRef} from "preact/compat";
import {useEffect} from "preact/compat";
import {floating} from "./index";
import {embedDeeplink} from "./index";
import {NeomeWidgetFloating} from "./index";
import {NeomeWidgetEmbed} from "./index";
import {embed} from "./index";

function App()
{
  return <>
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <div style={{display: "flex", justifyContent: "space-evenly", padding: "50px", flexWrap: "wrap"}}>
      <LoadEmbed
        config={{
          id: "first",
          showStudio: true,
          showTerminal: true,
          userCredentials: [
            {
              handle: "akash@neoxl.com",
              password: "Akash987"
            }
          ]
        }}
      />
      <LoadEmbed
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
      />
    </div>
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />

    <div style={{display: "flex", justifyContent: "center", padding: "50px"}}>
      <LoadDeeplink
        id={"deeplink1"}
        src={"https://web.orgbeat.com/dl/gh-LKCBQg9fCEbSnZTYaPOIL24r6"}
      />
      <LoadDeeplink
        id={"deeplink2"}
        src={"https://web.orgbeat.com/dl/gh-vktO6XoNl79ff6J43o0lUOyXI"}
      />
    </div>

    <LoadDeeplink
      id={"deeplink3"}
      src={"https://web.orgbeat.com/dl/gh-MpWeerSTXSqnSH7Or0xXoMlkf"}
    />

    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <LoadFloating
      config={{
        id: "third"
      }}
    />
  </>;
}

function LoadEmbed(props: {
  config: NeomeWidgetEmbed
})
{
  const neomeRef = useRef<(() => void) | null>(null);

  const load = useCallback(() =>
  {
    neomeRef.current = embed(props.config);
  }, [props]);

  const remove = useCallback(() =>
  {
    if(neomeRef.current)
    {
      neomeRef.current();
    }
  }, []);

  return (
    <div>
      <div
        id={props.config.id}
        style={{
          minWidth: "300px",
          maxWidth: "360px",
          height: "600px",
          borderRadius: "8px",
          border: "8px solid black",
          background: "#d3f0ff",
          margin: "10px 0"
        }}
      >
      </div>

      <button onClick={load}>Load</button>
      &nbsp;
      <button onClick={remove}>Remove</button>
    </div>
  );
}

function LoadDeeplink(props: {
  id: string,
  src: string
})
{
  const {id, src} = props;
  const deeplinkRef = useRef<(() => void) | null>(null);

  const load = useCallback(() =>
  {
    deeplinkRef.current = embedDeeplink(id, src);
  }, [props]);

  const remove = useCallback(() =>
  {
    if(deeplinkRef.current)
    {
      deeplinkRef.current();
    }
  }, []);

  return (
    <div style={{width: "100%"}}>
      <div
        id={id}
        style={{
          height: "600px",
          borderRadius: "8px",
          border: "8px solid black",
          background: "#d3f0ff",
          margin: "10px 0"
        }}
      >
      </div>

      <button onClick={load}>Load</button>
      &nbsp;
      <button onClick={remove}>Remove</button>
    </div>
  );
}

function LoadFloating(props: {
  config: NeomeWidgetFloating
})
{
  useEffect(() =>
  {
    floating(props.config);
  }, []);

  return <div
    id={props.config.id}
    style={{
      position: "fixed",
      top: "32px",
      right: "32px"
    }}
  >
  </div>;
}

function SimpleDiv()
{
  return <div
    style={{
      height: "500px",
      background: "beige",
      border: "1px solid black",
      textAlign: "center",
      lineHeight: "500px"
    }}
  >
    {
      "Content " + Math.floor(Math.random() * 100)
    }
  </div>;
}

render(<App />, document.getElementById("app")!);

