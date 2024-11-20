import {forwardRef} from "preact/compat";
import {NeomeWidgetFloating} from "../../index.tsx";
import {CloseSvg} from "../icons/CloseSvg.tsx";
import {NeomeSvg} from "../icons/NeomeSvg.tsx";

export const WidgetButton = forwardRef<HTMLDivElement, any>((props: {
  config?: NeomeWidgetFloating,
  open: boolean,
  onClick: (open: boolean, menuAnchor: HTMLDivElement) => void,
  badgeCount?: number,
  maxCount?: number
}, ref) =>
{
  const config = props.config;
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
        },
        boxShadow: "1px 2px 6px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.3)"
      }}
      ref={ref}
      onClick={(event) =>
      {
        if(ref)
        {
          props.onClick(!props.open, event.target as HTMLDivElement);
        }
      }}
    >
      {
        (!disableBadgeCount && badgeCount && !props.open)
          ? <div
            style={{
              alignItems: "center",
              background: "#66bb6a",
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
              minWidth: "20px",
              position: "absolute",
              right: "-4px",
              textAlign: "center",
              top: "-5px"
            }}
          >
            &nbsp;
            {
              maxCount && maxCount <= badgeCount
                ? (maxCount - 1 + "+")
                : badgeCount
            }
            &nbsp;
          </div>
          : null
      }

      <RenderIcon
        iconSrc={floatingButtonIconSrc}
        open={props.open}
      />
    </div>
  );
});

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
