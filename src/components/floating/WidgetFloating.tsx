import {useRef} from "preact/compat";
import {useEffect} from "preact/compat";
import {useCallback} from "preact/compat";
import {useState} from "preact/compat";
import {CSSProperties} from "react";
import {render} from "react";
import {getPopUpPosition} from "../../base/plus.ts";
import {neomeIFrameStyle} from "../../base/styles.ts";
import {neomeIFrameContainerStyle} from "../../base/styles.ts";
import {IGetMsgPayload} from "../../base/types.ts";
import {IWidgetScriptConfig} from "../../base/types.ts";
import {IPostMsgResponse} from "../../base/types.ts";
import {neomeFrameSrc} from "../../base/types.ts";
import {CrossSvg} from "../icons/Svgs.tsx";
import {WidgetButton} from "./WidgetButton.tsx";

export function floating(config: IWidgetScriptConfig)
{
  const id = config.id;
  if(id)
  {
    const neomeWidget = document.getElementById(id);
    if(neomeWidget)
    {
      render(<WidgetFloating config={config} />, neomeWidget);
    }
  }
}

function WidgetFloating(props: {
  config?: IWidgetScriptConfig
})
{
  const config = props.config;
  const url = `${neomeFrameSrc}`;

  const [open, setOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [badgeCount, setBadgeCount] = useState<number>();
  const [popupPosition, setPopupPosition] = useState<CSSProperties>();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetPosition = config?.floatingButtonPosition ?? "bottomRight";
  const widgetWidth = config?.widgetWidth || 360;
  const widgetHeight = config?.widgetHeight || 600;

  const onLoad = useCallback(() =>
  {
    setTimeout(() =>
    {
      if(iframeRef.current)
      {
        iframeRef.current.contentWindow?.postMessage({
          type: "init",
          payload: config
        } as IGetMsgPayload, url);
      }
    }, 50);
  }, [config]);

  const onClick = useCallback((open: boolean, menuAnchor: HTMLDivElement) =>
  {
    setOpen(open);
    const popupPosition = getPopUpPosition(widgetWidth, widgetHeight, menuAnchor);
    setPopupPosition(popupPosition);
  }, []);

  useEffect(() =>
  {
    if(iframeRef.current)
    {
      if(!isConnected)
      {
        setTimeout(() =>
        {
          if(iframeRef.current)
          {
            iframeRef.current.contentWindow?.postMessage({
              type: "init",
              payload: config
            }, url);
          }
        }, 50);
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
          case "badge":
            if(response.payload)
            {
              setBadgeCount(response.payload);
            }
            break;
          case "disconnected":
            setIsConnected(false);
            break;
        }
      }
    };
  }, []);

  return (
    <>
      <div
        style={{
          ...neomeIFrameContainerStyle,
          ...popupPosition,
          display: open ? "unset" : "none",
          width: widgetWidth,
          height: widgetHeight
        }}
      >
        {
          config?.onOpenHideWidgetButton &&
          <CrossElement onClick={() => setOpen(false)} />
        }
        <iframe
          ref={iframeRef}
          style={neomeIFrameStyle}
          onLoad={onLoad}
          src={url}
          referrerpolicy={"no-referrer"}
          allow="camera; microphone; geolocation; fullscreen;"
        />
      </div>

      <WidgetButton
        open={open}
        config={config}
        onClick={onClick}
        maxCount={100}
        badgeCount={badgeCount}
        position={widgetPosition}
      />
    </>
  );
}

function CrossElement(props: {
  onClick: () => void,
})
{
  return <div
    style={{
      position: "absolute",
      top: 0,
      right: -1,
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      userSelect: "none",
      background: "#b3261e",
      borderTopRightRadius: "8px",
      borderBottomLeftRadius: "12px"
    }}
    onClick={props.onClick}
  >
    <CrossSvg />
  </div>;
}
