export default function Loader(props: {
  msg?: string
})
{
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        color: "rgba(0, 0, 0, 0.38)",
        display: "flex",
        fontFamily: "'.AppleSystemUIFont', 'Arial', 'serif'",
        fontSize: "16px",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5"
      }}
    >
      {props.msg || "Loading neome..."}
    </div>
  );
}
