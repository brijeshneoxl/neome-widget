import {loadNeome} from "./";

if(typeof window !== "undefined")
{
  // @ts-ignore
  window.loadNeome = loadNeome;
}
