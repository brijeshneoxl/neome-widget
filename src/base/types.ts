type IPostMsgType =
  | "connected"
  | "getConfig"
  | "reload"
  | "disconnected"
  | "badge";

type IGetMsgType = "init" | "terminate";

export interface IGetMsgPayload
{
  type: IGetMsgType,
  payload: any
}

export interface IPostMsgResponse
{
  type: IPostMsgType,
  payload: any
}
