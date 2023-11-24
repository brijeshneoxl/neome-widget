import {embed} from "./components/embed/WidgetEmbed.tsx";
import {floating} from "./components/floating/WidgetFloating";

type TypeWidget = "floating" | "embed";

export interface IWidgetButtonConfig
{
  floatingButtonIconSrc?: string;
  onOpenHideWidgetButton?: boolean;
  disableBadgeCount?: boolean;
  widgetWidth?: number;
  widgetHeight?: number;
  widgetMargin?: number;
}

export interface IWidgetScriptConfig extends IWidgetButtonConfig
{
  id: string,
  showAs: TypeWidget;
  filterEntId?: string;
  selectedGroupId?: string;
  allowPersonalChat?: boolean;
  userEmailId?: string;
  userPassword?: string;
  showStore?: boolean;
  showStudio?: boolean;
  showTerminal?: boolean;
  showProduction?: boolean;
}

function loadNeome(config: IWidgetScriptConfig)
{
  const id = config.id;
  if(config.showAs === "embed")
  {
    embed(config);
  }
  else if(config.showAs === "floating")
  {
    floating(config);
  }

  return () =>
  {
    if(id)
    {
      const neomeWidget = document.getElementById(id);
      if(neomeWidget)
      {
        neomeWidget.replaceChildren();
      }
    }
  };
}

export {loadNeome};
