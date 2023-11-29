import {embedDeeplink} from "./components/deeplink/EmbedDeeplink.tsx";
import {embed} from "./components/embed/WidgetEmbed.tsx";
import {floating} from "./components/floating/WidgetFloating";

export interface IWidgetCredential
{
  handle: string;
  password: string;
}

export interface NeomeWidget
{
  allowPersonalChat?: boolean;
  demoFlag?: boolean
  filterEntId?: string;
  id: string,
  selectGroupId?: string;
  showProduction?: boolean;
  showStore?: boolean;
  showStudio?: boolean;
  showTerminal?: boolean;
  userCredentials?: IWidgetCredential[]
}

export interface NeomeWidgetEmbed extends NeomeWidget
{
}

export interface NeomeWidgetFloating extends NeomeWidget
{
  disableBadgeCount?: boolean;
  floatingButtonIconSrc?: string;
  onOpenHideWidgetButton?: boolean;
  widgetHeight?: number;
  widgetWidth?: number;
}

export {
  embed,
  floating,
  embedDeeplink
};
