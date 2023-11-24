import {render} from "preact/compat";
import {useState} from "preact/compat";
import {useEffect} from "preact/compat";
import {useCallback} from "preact/compat";
import {useRef} from "preact/compat";
import {defaultPostMsgDelay} from "../../base/const.ts";
import {neomeFrameSrc} from "../../base/const.ts";
import {minWidgetWidth} from "../../base/const.ts";
import {minWidgetHeight} from "../../base/const.ts";
import {getUrl} from "../../base/plus.ts";
import {IGetMsgPayload} from "../../base/types.ts";
import {IPostMsgResponse} from "../../base/types.ts";

import {IWidgetConfig} from "../../index.tsx";
import {NeomePlaceHolder} from "../icons/NeomePlaceHolder.tsx";
import Loader from "../raw/Loader.tsx";

export function embed(config: IWidgetConfig)
{
  const id = config.id;
  if(id)
  {
    const neomeWidget = document.getElementById(id);
    if(neomeWidget)
    {
      const neomeWidgetStyle = getComputedStyle(neomeWidget);
      const showGif = Boolean(parseInt(neomeWidgetStyle.width, 10) < minWidgetWidth
        || parseInt(neomeWidgetStyle.height, 10) < minWidgetHeight);

      render(<WidgetEmbed
        config={config}
        showGif={showGif}
      />, neomeWidget);
    }
  }
}

function WidgetEmbed(props: {
  config: IWidgetConfig,
  showGif?: boolean
})
{
  const config = props.config;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const url = getUrl(config.id);

  const initMsg = useCallback(() =>
  {
    setTimeout(() =>
    {
      if(iframeRef.current)
      {
        iframeRef.current.contentWindow?.postMessage({
          type: "init",
          payload: config
        } as IGetMsgPayload, neomeFrameSrc);
      }
    }, defaultPostMsgDelay);
  }, [config]);

  const onLoad = useCallback(() =>
  {
    setIsLoading(false);
    initMsg();
  }, [config, initMsg]);

  useEffect(() =>
  {
    if(iframeRef.current)
    {
      if(!isConnected)
      {
        initMsg();
      }
    }
  }, [isConnected, iframeRef.current]);

  useEffect(() =>
  {
    window.onmessage = (event) =>
    {
      if(event.origin === neomeFrameSrc)
      {
        const response = event.data as IPostMsgResponse;
        switch(response?.type)
        {
          case "connected":
            setIsConnected(true);
            break;
          case "disconnected":
            setIsConnected(false);
            break;
          case "getConfig":
            initMsg();
        }
      }
    };
  }, []);

  if(props.showGif)
  {
    return <NeomePlaceHolder />;
  }

  return (
    <>
      {
        isLoading ? <Loader /> : null
      }
      <iframe
        ref={iframeRef}
        style={{
          display: isLoading ? "none" : "unset",
          width: "100%",
          height: "100%",
          border: "1px solid #DCDCDCFF"
        }}
        onLoad={onLoad}
        src={url}
        referrerpolicy={"no-referrer"}
        allow="camera; microphone; geolocation; fullscreen;"
      />
    </>
  );
}
