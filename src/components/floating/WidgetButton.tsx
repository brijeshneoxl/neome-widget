import {useRef} from "preact/compat";
import {NeomeWidgetFloating} from "../../index.tsx";
import {CloseSvg} from "../icons/CloseSvg.tsx";
import {NeomeSvg} from "../icons/NeomeSvg.tsx";

export function WidgetButton(props: {
  config?: NeomeWidgetFloating,
  open: boolean,
  onClick: (open: boolean, menuAnchor: HTMLDivElement) => void,
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
      style={{
        border: "none",
        borderRadius: "50%",
        boxSizing: "border-box",
        cursor: "pointer",
        height: "48px",
        position: "relative",
        userSelect: "none",
        width: "48px",
        ...props.open && {
          transform: "rotate(90deg)",
          transition: "all 0.2s ease-in-out"
        }
      }}
      ref={buttonRef}
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
        <div
          style={{
            alignItems: "center",
            background: "#b3261e",
            borderRadius: "10px",
            color: "white",
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "'.AppleSystemUIFont', 'Arial', 'serif'",
            fontSize: "0.9em",
            fontWeight: "500",
            height: "20px",
            justifyContent: "center",
            lineHeight: "20px",
            marginLeft: "4px",
            minWidth: "15px",
            padding: "0 4px",
            position: "absolute",
            right: "-4px",
            textAlign: "center",
            top: "-5px",
            width: "fit-content"
          }}
        >
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
