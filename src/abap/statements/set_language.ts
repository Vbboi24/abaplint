import {Statement} from "./statement";
import {verNot, str, seq, IRunnable} from "../combi";
import {Source} from "../expressions";
import {Version} from "../../version";

export class SetLanguage extends Statement {

  public get_matcher(): IRunnable {
    let ret = seq(str("SET LANGUAGE"),
                  new Source());

    return verNot(Version.Cloud, ret);
  }

}