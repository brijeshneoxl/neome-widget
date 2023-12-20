import {render} from "preact";
import {useCallback} from "preact/compat";
import {useRef} from "preact/compat";
import {useEffect} from "preact/compat";
import {NeomeWidgetDeeplink} from "./index";
import {floating} from "./index";
import {embedDeeplink} from "./index";
import {NeomeWidgetFloating} from "./index";
import {NeomeWidgetEmbed} from "./index";
import {embed} from "./index";

const local = "http://localhost:3000";
const orgbeat = "https://web.orgbeat.com";
const neome = "https://web.neome.ai";

function App()
{
  return <>
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <div style={{display: "flex", justifyContent: "space-evenly", padding: "50px", flexWrap: "wrap"}}>
      {/*<LoadEmbed*/}
      {/*  config={{*/}
      {/*    id: "first",*/}
      {/*    hostUrl: local,*/}
      {/*    filterEntId: "e-S85bGsw0sK18S98EJcuKiAke8",*/}
      {/*    // selectGroupId: "g-eTaeh1Bsm8Tj6ivhOfDVsi3CS",*/}
      {/*    // selectGroupIdBackButton: true,*/}
      {/*    allowStudio: true,*/}
      {/*    allowPersonalChat: true,*/}
      {/*    userCredentials: [*/}
      {/*      {*/}
      {/*        handle: "brijesh@neomenta.com",*/}
      {/*        password: "Brijesh@123"*/}
      {/*      }*/}
      {/*    ]*/}
      {/*    // userCredentials: [*/}
      {/*    //   {*/}
      {/*    //     handle: "akash@neoxl.com",*/}
      {/*    //     password: "Akash987"*/}
      {/*    //   }*/}
      {/*    // ]*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<LoadEmbed*/}
      {/*  config={{*/}
      {/*    id: "second",*/}
      {/*    hostUrl: local,*/}
      {/*    allowProduction: true,*/}
      {/*    // demoFlag: true,*/}
      {/*    // filterEntId: "e-vyWHWljcsyux7RImnE20tuONh",*/}
      {/*    // selectGroupId: "g-xEN2Rds8LrcW0u5t12EgMmvt2",*/}
      {/*    userCredentials: [*/}
      {/*      {*/}
      {/*        handle: "akash@neoxl.com",*/}
      {/*        password: "Akash987"*/}
      {/*      },*/}
      {/*      {*/}
      {/*        handle: "aditya@neoxl.com",*/}
      {/*        password: "Pa$$w0rd"*/}
      {/*      },*/}
      {/*      {*/}
      {/*        handle: "brijesh@neomenta.com",*/}
      {/*        password: "Brijesh@123"*/}
      {/*      },*/}
      {/*      {*/}
      {/*        handle: "jason@demo.com",*/}
      {/*        password: "Demo1234"*/}
      {/*      },*/}
      {/*      {*/}
      {/*        handle: "neel@neoxl.com",*/}
      {/*        password: "Neel@123"*/}
      {/*      },*/}
      {/*      {*/}
      {/*        handle: "neomekhushal+1@gmail.com",*/}
      {/*        password: "Test1234"*/}
      {/*      }*/}
      {/*    ]*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<LoadEmbed*/}
      {/*  config={{*/}
      {/*    id: "third",*/}
      {/*    hostUrl: local,*/}
      {/*    showStudio: true,*/}
      {/*    showTerminal: true,*/}
      {/*    showProduction: true,*/}
      {/*    showStore: true,*/}
      {/*    userCredentials: [*/}
      {/*      {*/}
      {/*        handle: "aditya@neoxl.com",*/}
      {/*        password: "Pa$$w0rd"*/}
      {/*      }*/}
      {/*    ]*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<LoadEmbed*/}
      {/*  config={{*/}
      {/*    id: "second",*/}
      {/*    hostUrl: "https://web.orgbeat.com",*/}
      {/*    filterEntId: "e-0b1hiotFKBW8qsCS3tzhyRhZf",*/}
      {/*    allowPersonalChat: true,*/}
      {/*    selectGroupId: "g-zmI4Fa6QYtHIBIWrCyUifWhBt",*/}
      {/*    showStudio: true,*/}
      {/*    demoFlag: true,*/}
      {/*    userCredentials: [*/}
      {/*      {*/}
      {/*        handle: "brijesh@neoxl.com",*/}
      {/*        password: "Brijesh@123"*/}
      {/*      }*/}
      {/*    ]*/}
      {/*  }}*/}
      {/*/>*/}
    </div>

    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />
    <SimpleDiv />

    <div style={{display: "flex", justifyContent: "space-evenly", padding: "50px", flexWrap: "wrap"}}>
      <LoadDeeplink
        config={{
          id: "deeplink1",
          hostUrl: local + "/dl/gh-wFnrhBB9EbwDMzx7GxSmCJIdE",
          // userCredentials: [
          //   {
          //     handle: "brijesh@neomenta.com",
          //     password: "Brijesh@123"
          //   }
          // ],
          hideFooter: true
        }}
      />

      <LoadDeeplink
        config={{
          id: "deeplink2",
          hostUrl: orgbeat + "/dl/gh-tINh7zO8dr93QCWyVzZLrWJ6R",
          userCredentials: [
            {
              handle: "neomekhushal+1@gmail.com",
              password: "Test1234"
            }
          ]
        }}
      />

      <LoadDeeplink
        config={{
          id: "deeplink3",
          // hostUrl: orgbeat + "/dl/gh-Usa4Zc8GQhT9SKNvOgLmkx58X",
          hostUrl: orgbeat + "/dl/gh-2ojl0xNBk3TPlIyclyixzNMGK",
          userCredentials: [
            {
              handle: "neomekhushal+1@gmail.com",
              password: "Test1234"
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
    <LoadFloating
      config={{
        id: "floating1",
        hostUrl: local,
        filterEntId: "e-S85bGsw0sK18S98EJcuKiAke8",
        selectGroupId: "g-eTaeh1Bsm8Tj6ivhOfDVsi3CS",
        selectGroupIdBackButton: true,
        allowPersonalChat: true,
        demoFlag: true,
        userCredentials: [
          {
            handle: "aditya@neoxl.com",
            password: "Pa$$w0rd"
          }
        ]
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

  useEffect(() =>
  {
    neomeRef.current = embed(props.config);
  }, []);

  return (
    <div>
      <div
        id={props.config.id}
        style={{
          minWidth: "35vw",
          // minWidth: "350px",
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
  config: NeomeWidgetDeeplink
})
{
  const config = props.config;
  const deeplinkRef = useRef<(() => void) | null>(null);

  const load = useCallback(() =>
  {
    deeplinkRef.current = embedDeeplink(config);
  }, [config]);

  const remove = useCallback(() =>
  {
    if(deeplinkRef.current)
    {
      deeplinkRef.current();
    }
  }, []);

  return (
    <div>
      <div
        id={config.id}
        style={{
          height: "600px",
          width: "70vw",
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
      right: "320px"
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
