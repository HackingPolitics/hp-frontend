import * as encoding from 'lib0/encoding'
import { MessageType, OutgoingMessageArguments } from '../types'
import { OutgoingMessage } from '../OutgoingMessage'

export class TokenUpdateMessage extends OutgoingMessage {
  type = MessageType.TokenUpdate

  description = 'A JWT update'

  get(args: Partial<OutgoingMessageArguments>) {
    encoding.writeVarUint(this.encoder, this.type)
    encoding.writeVarString(this.encoder, args.token || '')

    return this.encoder
  }
}
