import {render} from "preact/compat";
import {useCallback} from "preact/compat";
import {useRef} from "preact/compat";
import {defaultPostMsgDelay} from "../../base/const.ts";
import {iframePermission} from "../../base/const.ts";
import {minWidgetWidth} from "../../base/const.ts";
import {minWidgetHeight} from "../../base/const.ts";
import {getSrcOrigin} from "../../base/plus.ts";
import {useRetry} from "../../base/plus.ts";
import {getWidgetSrc} from "../../base/plus.ts";
import {IGetMsgPayload} from "../../base/types.ts";
import {NeomeWidgetEmbed} from "../../index.tsx";
import {NeomePlaceHolder} from "../icons/NeomePlaceHolder.tsx";
import Loader from "../raw/Loader.tsx";

export function embed(config: NeomeWidgetEmbed)
{
  const id = config.id;
  const hostUrl = config.hostUrl;
  if(id && hostUrl)
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

function WidgetEmbed(props: {
  config: NeomeWidgetEmbed,
  showGif?: boolean
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

  if(props.showGif)
  {
    return <NeomePlaceHolder />;
  }

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
