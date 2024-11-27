import {useRef} from "preact/compat";
import {useCallback} from "preact/compat";
import {useState} from "preact/compat";
import {render} from "react";
import {iframePermission} from "../../base/const.ts";
import {defaultPostMsgDelay} from "../../base/const.ts";
import {defaultFloatingHeight} from "../../base/const.ts";
import {defaultFloatingWidth} from "../../base/const.ts";
import {getSrcOrigin} from "../../base/plus.ts";
import {useCheckIsMobile} from "../../base/plus.ts";
import {useRetry} from "../../base/plus.ts";
import {getWidgetSrc} from "../../base/plus.ts";
import {getStyleWidgetDirection} from "../../base/plus.ts";
import {neomeIFrameContainerStyleMobile} from "../../base/styles.ts";
import {neomeIFrameStyle} from "../../base/styles.ts";
import {neomeIFrameContainerStyle} from "../../base/styles.ts";
import {IGetMsgPayload} from "../../base/types.ts";
import {NeomeWidgetFloating} from "../../index.tsx";
import {CrossSvg} from "../icons/Svgs.tsx";
import {WidgetButton} from "./WidgetButton.tsx";

export function floating(config: NeomeWidgetFloating)
{
  const id = config.id;
  const hostUrl = config.hostUrl;
  if(id && hostUrl)
  {
    const neomeWidget = document.getElementById(id);
    if(neomeWidget)
    {
      const style = document.createElement("style");
      style.id = "neomeWidgetStyle";
      style.innerHTML = `@keyframes opacity-animate{0%{opacity:0}100%{opacity:1}}`;
      const isStyleExist = document.getElementById("neomeWidgetStyle");
      if(!isStyleExist)
      {
        document.head.append(style);
      }

      render(<WidgetFloating
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

function WidgetFloating(props: {
  config: NeomeWidgetFloating
})
{
  const config = props.config;
  const src = getWidgetSrc(config);

  const [open, setOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState<number>();

  const isMobile = useCheckIsMobile();

  const buttonRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetWidth = config?.widgetWidth || defaultFloatingWidth;
  const widgetHeight = config?.widgetHeight || defaultFloatingHeight;
  const direction = config?.direction || "topLeft";
  const styleWidgetDirection = getStyleWidgetDirection(direction);

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

  const onClick = useCallback((open: boolean) =>
  {
    setOpen(open);
  }, [direction]);

  useRetry(config.id, config.hostUrl, {
    initMsg: initMsg,
    setBadgeCount: setBadgeCount
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <div
        style={{
          ...neomeIFrameContainerStyle,
          ...styleWidgetDirection,
          display: open ? "unset" : "none",
          width: widgetWidth,
          height: widgetHeight,
          ...isMobile && neomeIFrameContainerStyleMobile
        }}
      >
        {
          (config?.onOpenHideWidgetButton || isMobile) &&
          <CrossElement onClick={() => setOpen(false)} />
        }

        <iframe
          ref={iframeRef}
          style={neomeIFrameStyle}
          src={src}
          referrerpolicy={"no-referrer"}
          allow={iframePermission}
        />
      </div>

      <WidgetButton
        open={open}
        config={config}
        onClick={onClick}
        maxCount={100}
        ref={buttonRef}
        badgeCount={badgeCount}
      />
    </div>
  );
}

function CrossElement(props: {
  onClick: () => void,
})
{
  return <div
    style={{
      position: "absolute",
      top: 1,
      right: -1,
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      userSelect: "none",
      background: "#b3261e",
      borderTopRightRadius: "4px",
      borderBottomLeftRadius: "12px",
      zIndex: 999
    }}
    onClick={props.onClick}
  >
    <CrossSvg />
  </div>;
}
