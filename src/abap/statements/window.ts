import {Statement} from "./statement";
import {verNot, str, seq, IRunnable} from "../combi";
import {Source} from "../expressions";
import {Version} from "../../version";

export class Window extends Statement {

  public get_matcher(): IRunnable {
    let ret = seq(str("WINDOW STARTING AT"),
                  new Source(),
                  new Source(),
                  str("ENDING AT"),
                  new Source(),
                  new Source());

    return verNot(Version.Cloud, ret);
  }

}