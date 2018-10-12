import {Statement} from "./statement";
import {str, IRunnable} from "../combi";

export class Return extends Statement {

  public get_matcher(): IRunnable {
    return str("RETURN");
  }

}