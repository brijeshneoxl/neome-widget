import {embed} from "./components/embed/WidgetEmbed.tsx";
import {floating} from "./components/floating/WidgetFloating";

type TypeWidget = "floating" | "embed";

export interface IWidgetFloatingConfig
{
  floatingButtonIconSrc?: string;
  onOpenHideWidgetButton?: boolean;
  disableBadgeCount?: boolean;
  widgetWidth?: number;
  widgetHeight?: number;
  widgetMargin?: number;
}

export interface IWidgetCredential
{
  handle: string;
  password: string;
}

export interface IWidgetConfig extends IWidgetFloatingConfig
{
  id: string,
  showAs: TypeWidget;
  filterEntId?: string;
  selectGroupId?: string;
  allowPersonalChat?: boolean;
  userCredentials?: IWidgetCredential[];
  showStore?: boolean;
  showStudio?: boolean;
  showTerminal?: boolean;
  showProduction?: boolean;
}

function loadNeome(config: IWidgetConfig)
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
