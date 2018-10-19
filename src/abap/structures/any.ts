import {star, sub, alt, sta, IStructureRunnable} from "./_combi";
import * as Structures from "./";
import * as Statements from "../statements";
import {Structure} from "./_structure";

export class Any extends Structure {

  public getMatcher(): IStructureRunnable {

    return star(alt(sta(Statements.ClassOther),
                    sta(Statements.Report),
                    sta(Statements.Program),
                    sta(Statements.Parameter),
                    sta(Statements.Get),
                    sta(Statements.Initialization),
                    sta(Statements.SelectionScreen),
                    sta(Statements.SelectOption),
                    sta(Statements.AtSelectionScreen),
                    sta(Statements.AtLineSelection),
                    sta(Statements.AtUserCommand),
                    sta(Statements.StartOfSelection),
                    sta(Statements.EndOfSelection),
                    sta(Statements.LoadOfProgram),
                    sta(Statements.Tables),
                    sta(Statements.Ranges),
                    sta(Statements.TopOfPage),
                    sta(Statements.Controls),
                    sta(Statements.TypePools),
                    sta(Statements.TypePool),
                    sta(Statements.FunctionPool),
                    sub(new Structures.Normal()),
                    sub(new Structures.Form()),
                    sub(new Structures.Module()),
                    sub(new Structures.FunctionModule()),
                    sub(new Structures.Interface()),
                    sub(new Structures.ClassDefinition()),
                    sub(new Structures.ClassImplementation())));

  }

}