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
        if(config.showAs === "embed")
        {
          neomeWidget.innerHTML = "";
        }
        else if(config.showAs === "floating")
        {
          neomeWidget.remove();
        }
      }
    }
  };
}

// @ts-ignore
window.loadNeome = loadNeome;

export {loadNeome};
