import {CSSProperties} from "preact/compat";

const widgetMinHeight = "400px";
const widgetMinWidth = "280px";

export const neomeIFrameContainerStyle = {
  animation: "opacity-animate 0.32s ease-in-out",
  borderRadius: "4px",
  boxSizing: "border-box",
  height: "600px",
  minHeight: widgetMinHeight,
  minWidth: widgetMinWidth,
  position: "fixed",
  transition: "all 0.3s ease-in-out",
  width: "360px",
  zIndex: "999"
} as CSSProperties;

export const neomeIFrameStyle = {
  backgroundColor: "#fff",
  border: "1px solid #dcdcdcff",
  borderRadius: "4px",
  height: "100%",
  width: "100%"
};
