import {Statement} from "./statement";
import {IRunnable} from "../combi";
import {Select as eSelect} from "../expressions";

export class Select extends Statement {

  public get_matcher(): IRunnable {
    return new eSelect();
  }

}