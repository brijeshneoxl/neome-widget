import {embedDeeplink} from "./components/deeplink/EmbedDeeplink";
import {embed} from "./components/embed/WidgetEmbed";
import {floating} from "./components/floating/WidgetFloating";

export interface IWidgetCredential
{
  handle: string;
  password: string;
}

interface IWidget
{
  id: string;
  hostUrl: string;
}

export interface NeomeWidget extends IWidget
{
  allowPersonalChat?: boolean;
  demoFlag?: boolean;
  filterEntId?: string;
  selectGroupId?: string;
  allowProduction?: boolean;
  allowStore?: boolean;
  allowStudio?: boolean;
  allowTerminal?: boolean;
  userCredentials?: IWidgetCredential[];
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

export interface NeomeWidgetDeeplink extends IWidget
{
}

export {
  embed,
  floating,
  embedDeeplink
};
