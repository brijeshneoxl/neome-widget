import {render} from "preact/compat";
import {useCallback} from "preact/compat";
import {useRef} from "react";
import {defaultPostMsgDelay} from "../../base/const.ts";
import {iframePermission} from "../../base/const.ts";
import {getSrcOrigin} from "../../base/plus.ts";
import {useRetry} from "../../base/plus.ts";
import {getWidgetSrc} from "../../base/plus.ts";
import {IGetMsgPayload} from "../../base/types.ts";
import {NeomeWidgetDeeplink} from "../../index.tsx";
import Loader from "../raw/Loader.tsx";

export function embedDeeplink(config: NeomeWidgetDeeplink)
{
  const id = config.id;
  const hostUrl = config.hostUrl;
  if(id && hostUrl)
  {
    const neomeWidget = document.getElementById(id);
    if(neomeWidget)
    {
      render(<EmbedDeeplink
        config={config}
        key={Math.random()}
      />, neomeWidget);
    }
  }

  return () =>
  {
    const neomeWidget = document.getElementById(id);
    if(neomeWidget)
    {
      neomeWidget.replaceChildren();
    }
  };
}

function EmbedDeeplink(props: {
  config: NeomeWidgetDeeplink
})
{
  const config = props.config;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src = getWidgetSrc(config);

  const initMsg = useCallback(() =>
  {
    const origin = getSrcOrigin(config.hostUrl);
    setTimeout(() =>
    {
      if(iframeRef.current)
      {
        iframeRef.current.contentWindow?.postMessage({
          type: "init",
          payload: config
        } as IGetMsgPayload, origin);
      }
    }, defaultPostMsgDelay);
  }, [config]);

  const isConnected = useRetry(config.id, config.hostUrl, {
    initMsg: initMsg
  });

  return (
    <>
      {
        !isConnected
          ? <Loader msg={"Loading..."} />
          : null
      }
      <iframe
        ref={iframeRef}
        style={{
          display: !isConnected ? "none" : "unset",
          width: "100%",
          height: "100%",
          border: "1px solid #DCDCDCFF"
        }}
        src={src}
        referrerpolicy={"no-referrer"}
        allow={iframePermission}
      />
    </>
  );
}
