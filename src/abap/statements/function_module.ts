import {Statement} from "./statement";
import {str, seq, IRunnable} from "../combi";
import {Field} from "../expressions";

export class FunctionModule extends Statement {

  public get_matcher(): IRunnable {
    return seq(str("FUNCTION"), new Field());
  }

}