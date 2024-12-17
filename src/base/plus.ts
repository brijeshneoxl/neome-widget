import {useCallback} from "preact/compat";
import {CSSProperties} from "preact/compat";
import {useState} from "react";
import {useRef} from "react";
import {useEffect} from "react";
import {TypeWidgetDirection} from "../index.tsx";
import {IWidget} from "../index.tsx";
import {widgetId} from "./const.ts";
import {retryDurationMs} from "./const.ts";
import {IPostMsgResponse} from "./types.ts";

export function getWidgetSrc(config: IWidget)
{
  const id = config.id;
  const hostUrl = config.hostUrl;

  const urlObj = new URL(hostUrl);
  urlObj.searchParams.set(widgetId, id);

  const forceSignIn = Boolean(config.userCredentials?.length);
  if(forceSignIn)
  {
    urlObj.searchParams.set("forceSignIn", "true");
  }

  return urlObj.toString();
}

export function getStyleWidgetDirection(direction: TypeWidgetDirection)
{
  const position: CSSProperties = {};
  switch(direction)
  {
    case "topLeft":
      position.bottom = 64;
      position.right = 2;
      position.boxShadow = "-5px -5px 10px -10px rgba(0, 0, 0, 0.3)";
      break;
    case "topRight":
      position.bottom = 64;
      position.left = 0;
      position.boxShadow = "5px -5px 10px -10px rgba(0, 0, 0, 0.3)";
      break;
    case "bottomLeft":
      position.top = 62;
      position.right = 2;
      position.boxShadow = "-5px 5px 10px -10px rgba(0, 0, 0, 0.3)";
      break;
    case "bottomRight":
      position.top = 62;
      position.left = 0;
      position.boxShadow = "5px 5px 10px -10px rgba(0, 0, 0, 0.3)";
      break;
  }

  return position;
}

interface INeomeRef
{
  initMsg: () => void;
  setBadgeCount?: (badgeCount: number) => void;
}

export function useRetry(widgetId: string, src: string, neomeRef: INeomeRef)
{
  const [isConnected, setIsConnected] = useState(false);
  const timeOutId = useRef<NodeJS.Timeout>();
  const origin = getSrcOrigin(src);

  const reloadWidget = useCallback(() =>
  {
    const widget = document.getElementById(widgetId)?.getElementsByTagName("iframe").item(0);
    if(widget)
    {
      widget.contentWindow?.location.replace(widget.src);
      setIsConnected(false);
    }
  }, [widgetId]);

  useEffect(() =>
  {
    if(!isConnected)
    {
      timeOutId.current = setInterval(() =>
      {
        neomeRef.initMsg();
        logInfo(widgetId, "is trying to connect...");
      }, retryDurationMs);
    }
    else if(timeOutId.current)
    {
      clearInterval(timeOutId.current);
    }

    return () =>
    {
      if(timeOutId.current)
      {
        clearInterval(timeOutId.current);
      }
    };
  }, [isConnected]);

  useEffect(() =>
  {
    let listener = (event: MessageEvent<IPostMsgResponse>) =>
    {
      if(event.origin === origin)
      {
        const response = event.data;
        switch(response?.type)
        {
          case "connected":
            if(widgetId === response.payload)
            {
              setIsConnected(true);
              logInfo(widgetId, "connected");
            }
            break;
          case "disconnected":
            setIsConnected(false);
            logInfo(widgetId, "disconnected");
            break;
          case "badge":
            if(response.payload !== undefined && typeof response.payload === "number" && neomeRef.setBadgeCount)
            {
              neomeRef.setBadgeCount(response.payload);
            }
            break;
          case "getConfig":
            neomeRef.initMsg();
            break;
          case "reload":
            reloadWidget();
            break;
        }
      }
    };

    window.addEventListener("message", listener);

    return () =>
    {
      window.removeEventListener("message", listener);
    };
  }, []);

  return isConnected;
}

export function useCheckIsMobile()
{
  const [value, setValue] = useState(window.innerWidth);

  useEffect(() =>
  {
    const handleResize = () => setValue(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () =>
    {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return value > 280 && value < 680;
}

export function getSrcOrigin(src: string)
{
  const urlObj = new URL(src);
  return urlObj.origin;
}

export function logInfo(widgetId: string, message: string)
{
  const logText = `${new Date().toLocaleString()} | ${widgetId}: ${message}`;
  console.log(`%c${logText}`, `color: #00bcd4`);
}
