import {embed} from "./components/embed/WidgetEmbed.tsx";
import {floating} from "./components/floating/WidgetFloating";

type TypeWidget = "floating" | "embed";

export interface IWidgetFloatingConfig
{
  disableBadgeCount?: boolean;
  floatingButtonIconSrc?: string;
  onOpenHideWidgetButton?: boolean;
  widgetHeight?: number;
  widgetMargin?: number;
  widgetWidth?: number;
}

export interface IWidgetCredential
{
  handle: string;
  password: string;
}

export interface IWidgetConfig extends IWidgetFloatingConfig
{
  allowPersonalChat?: boolean;
  demoFlag?: boolean
  filterEntId?: string;
  id: string,
  selectGroupId?: string;
  showAs: TypeWidget;
  showProduction?: boolean;
  showStore?: boolean;
  showStudio?: boolean;
  showTerminal?: boolean;
  userCredentials?: IWidgetCredential[];
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
