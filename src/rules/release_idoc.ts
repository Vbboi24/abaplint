import {Issue} from "../issue";
import {BasicRuleConfig} from "./_basic_rule_config";
import {IObject} from "../objects/_iobject";
import {IRule} from "./_irule";
import * as Objects from "../objects";
import {Position} from "../position";

/** Checks idoc types and segments are set to status released */
export class ReleaseIdocConf extends BasicRuleConfig {
}

export class ReleaseIdoc implements IRule {
  private conf = new ReleaseIdocConf();

  public getKey(): string {
    return "release_idoc";
  }

  private getDescription(): string {
    return "Idoc type/segement status must be set to released";
  }

  public getConfig() {
    return this.conf;
  }

  public setConfig(conf: ReleaseIdocConf) {
    this.conf = conf;
  }

  public run(obj: IObject): Issue[] {

    const file = obj.getXMLFile();
    if (file === undefined) {
      return [];
    }

    if (obj instanceof Objects.Table) {
      if (file.getRaw().includes("<SEGMENTDEFINITION>") === false) {
        return [];
      }
    } else if (!(obj instanceof Objects.Idoc)) {
      return [];
    }

    if (file.getRaw().includes("<CLOSED>X</CLOSED>") === false) {
      const position = new Position(1, 1);
      const issue = Issue.atPosition(obj.getFiles()[0], position, this.getDescription(), this.getKey());
      return [issue];
    } else {
      return [];
    }
  }
}