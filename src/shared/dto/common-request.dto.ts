import { JwtPayloadUser } from "src/types/common.type"

export class CommonRequest {
  requestId: string
}

export class AuthorizedCommonRequest extends CommonRequest {
  user: JwtPayloadUser
}