import { DefaultCtx, DefaultPublicData, SessionContext } from "blitz"
import { User } from "db"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface PublicData extends DefaultPublicData {
    userId: User["id"]
  }
}
