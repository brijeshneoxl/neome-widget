import {CSSProperties} from "preact/compat";
import {useState} from "react";
import {useRef} from "react";
import {useEffect} from "react";
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

export function getPopUpPosition(
  popupWidth: number,
  popupHeight: number,
  menuAnchor: HTMLDivElement
)
{
  const rect = menuAnchor.getBoundingClientRect();
  const pageX = +rect.right;
  const pageY = +rect.bottom;
  const {innerWidth, innerHeight} = window;

  const position: CSSProperties = {};

  const spaceLeft = innerWidth - pageX;
  const spaceRight = pageX;
  const spaceAbove = pageY;
  const spaceBelow = innerHeight - pageY;

  // Calculate position based on available space
  if(spaceLeft >= popupWidth)
  {
    const right = innerWidth - pageX;
    if(right + popupWidth >= innerWidth)
    {
      position.right = innerWidth - pageX - popupWidth;
    }
    else
    {
      position.right = right;
    }
    position.right = +position.right + 24;
  }
  else if(spaceRight >= popupWidth)
  {
    position.left = pageX;
    if(pageX + popupWidth >= innerWidth)
    {
      position.left = pageX - popupWidth;
    }
    position.left = +position.left - 24;
  }

  if(spaceBelow >= popupHeight)
  {
    position.top = pageY;
    if(pageY + popupHeight >= innerHeight)
    {
      position.top = pageY - popupHeight;
    }
  }
  else if(spaceAbove >= popupHeight)
  {
    const bottom = innerHeight - pageY;
    if(bottom + popupHeight >= innerHeight)
    {
      position.bottom = bottom - popupHeight;
    }
    else
    {
      position.bottom = bottom;
    }
  }

  // Default position if no suitable space found
  if(Object.keys(position).length === 0)
  {
    position.bottom = innerHeight - pageY;
    position.right = innerWidth - pageX;
  }

  setBoxShadow(position);

  return position;
}

function setBoxShadow(style: CSSProperties)
{
  if(style.top)
  {
    if(style.left)
    {
      style.top = +style.top + 16;
      style.left = +style.left + 24;
      style.boxShadow = "-5px -5px 10px -10px rgba(0, 0, 0, 0.3)";
    }
    else if(style.right)
    {
      style.top = +style.top + 16;
      style.right = +style.right + 8;
      style.boxShadow = "5px -5px 10px -10px rgba(0, 0, 0, 0.3)";
    }
  }
  else if(style.bottom)
  {
    if(style.left)
    {
      style.bottom = +style.bottom + 60;
      style.left = +style.left + 24;
      style.boxShadow = "-5px 5px 10px -10px rgba(0, 0, 0, 0.3)";
    }
    else if(style.right)
    {
      style.bottom = +style.bottom + 60;
      style.right = +style.right + 12;
      style.boxShadow = "5px 5px 10px -10px rgba(0, 0, 0, 0.3)";
    }
  }
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

  useEffect(() =>
  {
    if(!isConnected)
    {
      timeOutId.current = setInterval(() =>
      {
        neomeRef.initMsg();
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
            }
            break;
          case "disconnected":
            setIsConnected(false);
            break;
          case "badge":
            if(response.payload && neomeRef.setBadgeCount)
            {
              neomeRef.setBadgeCount(response.payload);
            }
            break;
          case "getConfig":
            neomeRef.initMsg();
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
