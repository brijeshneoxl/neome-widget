import {IWidgetScriptConfig} from "./base/types.ts";
import {embed} from "./components/embed/WidgetEmbed.tsx";
import {floating} from "./components/floating/WidgetFloating";

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

const style = document.createElement("style");
style.innerHTML =
  `@media only screen and (max-width:500px){#neomeFrameId{height:calc(100vh - 190px);width:calc(100vw - 20px)}}@keyframes opacity-animate{0%{opacity:0}100%{opacity:1}}`;
document.head.append(style);

if(window)
{
  // @ts-ignore
  window.loadNeome = loadNeome;
}

export {loadNeome};
