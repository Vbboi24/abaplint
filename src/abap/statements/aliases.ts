import {Statement} from "./statement";
import {str, seq, IRunnable} from "../combi";
import {Field} from "../expressions";

export class Aliases extends Statement {

  public get_matcher(): IRunnable {
    return seq(str("ALIASES"),
               new Field(),
               str("FOR"),
               new Field());
  }

}