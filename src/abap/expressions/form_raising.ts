import {seq, str, plus, tok, alt, Expression, IStatementRunnable} from "../combi";
import {ClassName} from "./";
import {ParenLeft, ParenRightW} from "../tokens/";

export class FormRaising extends Expression {
  public getRunnable(): IStatementRunnable {
    const resume = seq(str("RESUMABLE"),
                       tok(ParenLeft),
                       new ClassName(),
                       tok(ParenRightW));

    const raising = seq(str("RAISING"), plus(alt(new ClassName(), resume)));

    return raising;
  }
}