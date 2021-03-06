import {seq, tok, Expression, IStatementRunnable, opt, str, alt} from "../combi";
import {ParenLeft, ParenRightW} from "../tokens";
import {MessageTypeAndNumber, MessageClass, Source} from ".";

export class MessageSource extends Expression {
  public getRunnable(): IStatementRunnable {
    const msgid = seq(tok(ParenLeft), new MessageClass(), tok(ParenRightW));
    const simple = seq(new MessageTypeAndNumber(), opt(msgid));

    const mess1 = seq(str("ID"), new Source(), str("TYPE"), new Source(), str("NUMBER"), new Source());

    return alt(simple, mess1);
  }
}