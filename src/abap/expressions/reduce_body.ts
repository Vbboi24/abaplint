import {Expression, IStatementRunnable, seq, opt, str, plus} from "../combi";
import {Let, For, Field, Source, InlineFieldDefinition} from ".";

export class ReduceBody extends Expression {
  public getRunnable(): IStatementRunnable {
    const fields = seq(new Field(), str("="), new Source());

    const init = seq(str("INIT"), plus(new InlineFieldDefinition()));

    return seq(opt(new Let()),
               init,
               new For(),
               str("NEXT"),
               plus(fields));
  }
}