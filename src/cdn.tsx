import {embed, embedDeeplink, floating} from "./";

if(window)
{
  // @ts-ignore
  window.embed = embed;
  // @ts-ignore
  window.floating = floating;
  // @ts-ignore
  window.embedDeeplink = embedDeeplink;
}
