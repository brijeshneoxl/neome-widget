import {render} from "preact/compat";
import {useState} from "preact/compat";
import {useCallback} from "preact/compat";
import {iframePermission} from "../../base/const.ts";
import {getDeeplinkUrl} from "../../base/plus.ts";
import {NeomeWidgetDeeplink} from "../../index.tsx";
import Loader from "../raw/Loader.tsx";

export function embedDeeplink(config: NeomeWidgetDeeplink)
{
  const id = config.id;
  const src = config.src;
  if(id && src)
  {
    const element = document.getElementById(id);
    if(element)
    {
      render(<EmbedDeeplink
        config={config}
        key={Math.random()}
      />, element);
    }
  }

  return () =>
  {
    const element = document.getElementById(id);
    if(element)
    {
      element.replaceChildren();
    }
  };
}

function EmbedDeeplink(props: {
  config: NeomeWidgetDeeplink
})
{
  const config = props.config;
  const url = getDeeplinkUrl(config);
  const [isLoading, setIsLoading] = useState(true);
  
  const onLoad = useCallback(() =>
  {
    setIsLoading(false);
  }, []);

  return (
    <>
      {
        isLoading ? <Loader /> : null
      }
      <iframe
        style={{
          display: isLoading ? "none" : "unset",
          width: "100%",
          height: "100%",
          border: "1px solid #DCDCDCFF"
        }}
        onLoad={onLoad}
        src={url}
        referrerpolicy={"no-referrer"}
        allow={iframePermission}
      />
    </>
  );
}
