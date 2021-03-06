import {seq, tok, Expression, IStatementRunnable, str, plus, ver, opt, alt} from "../combi";
import {WParenLeftW, WParenRightW} from "../tokens/";
import {ComponentName, Source, Field} from ".";
import {Version} from "../../version";

export class CorrespondingBody extends Expression {
  public getRunnable(): IStatementRunnable {
    const mapping = seq(str("MAPPING"), plus(seq(new ComponentName(), str("="), new ComponentName())));

    const baseParen = seq(str("BASE"), tok(WParenLeftW), new Source(), tok(WParenRightW));

    const discarding = ver(Version.v751, str("DISCARDING DUPLICATES"));

    return seq(
      opt(baseParen),
      new Source(),
      opt(discarding),
      opt(mapping),
      opt(seq(str("EXCEPT"), alt(plus(new Field()), str("*")))),
    );
  }
}