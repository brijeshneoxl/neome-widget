import {CSSProperties} from "preact/compat";

const widgetMinHeight = "400px";
const widgetMinWidth = "280px";

export const neomeIFrameContainerStyle: CSSProperties = {
  animation: "opacity-animate 0.32s ease-in-out",
  borderRadius: "4px",
  boxSizing: "border-box",
  height: "600px",
  minHeight: widgetMinHeight,
  minWidth: widgetMinWidth,
  position: "absolute",
  width: "360px",
  zIndex: "999"
};

export const neomeIFrameContainerStyleMobile: CSSProperties = {
  position: "fixed",
  width: "calc(100vw - 42px)",
  height: "calc(100vh - 42px)",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: "auto"
};

export const neomeIFrameStyle = {
  backgroundColor: "#fff",
  border: "1px solid #dcdcdcff",
  borderRadius: "4px",
  height: "100%",
  width: "100%"
};
