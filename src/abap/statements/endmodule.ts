import {Statement} from "./statement";
import {verNot, str, IRunnable} from "../combi";
import {Version} from "../../version";

export class EndModule extends Statement {

  public get_matcher(): IRunnable {
    let ret = str("ENDMODULE");
    return verNot(Version.Cloud, ret);
  }

}