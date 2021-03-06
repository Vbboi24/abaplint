import {seq, star, tok, regex as reg, Expression, IStatementRunnable} from "../combi";
import {Dash} from "../tokens/";

export class MacroName extends Expression {
  public getRunnable(): IStatementRunnable {
    return seq(reg(/^[\w\*%\?$]+>?$/), star(seq(tok(Dash), reg(/^\w+$/))));
  }
}