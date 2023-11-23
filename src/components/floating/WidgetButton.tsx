import {useRef} from "preact/compat";
import {IWidgetScriptConfig} from "../../base/types.ts";
import {EnumDefnPosition} from "../../base/types.ts";
import {neomeWidgetBtnId} from "../../base/types.ts";
import {CloseSvg} from "../icons/CloseSvg.tsx";
import {NeomeSvg} from "../icons/NeomeSvg.tsx";

export function WidgetButton(props: {
  config?: IWidgetScriptConfig,
  open: boolean,
  onClick: (open: boolean, menuAnchor: HTMLDivElement) => void,
  position: EnumDefnPosition,
  badgeCount?: number,
  maxCount?: number
})
{
  const config = props.config;
  const buttonRef = useRef<HTMLDivElement>(null);
  const onOpenHideWidgetButton = config?.onOpenHideWidgetButton;

  if(!((onOpenHideWidgetButton && !props.open) || (!onOpenHideWidgetButton)))
  {
    return null;
  }

  const badgeCount = props.badgeCount;
  const maxCount = props.maxCount;
  const disableBadgeCount = config?.disableBadgeCount;
  const floatingButtonIconSrc = config?.floatingButtonIconSrc;

  return (
    <div
      id={neomeWidgetBtnId}
      ref={buttonRef}
      className={`${props.open ? "rotate" : ""}`}
      onClick={() =>
      {
        if(buttonRef.current)
        {
          props.onClick(!props.open, buttonRef.current);
        }
      }}
    >
      {
        !disableBadgeCount && badgeCount && !props.open &&
        <div className={"badgeCount"}>
          {
            maxCount && maxCount <= badgeCount
              ? (maxCount - 1 + "+")
              : badgeCount
          }
        </div>
      }

      <RenderIcon
        iconSrc={floatingButtonIconSrc}
        open={props.open}
      />
    </div>
  );
}

function RenderIcon(props: {
  iconSrc?: string,
  open: boolean
})
{
  if(props.open)
  {
    return <CloseSvg />;
  }
  else
  {
    if(props.iconSrc)
    {
      return <RenderImg src={props.iconSrc} />;
    }
    else
    {
      return <NeomeSvg />;
    }
  }
}

function RenderImg(props: {
  src: string
})
{
  return <img
    src={props.src}
    alt={"NeoMe"}
    width={"100%"}
    height={"100%"}
    style={{
      borderRadius: "50%"
    }}
  />;
}
