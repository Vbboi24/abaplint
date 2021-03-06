import {expect} from "chai";
import {getFile, getStatements} from "./_utils";
import {MacroCall, Unknown} from "../../src/abap/statements/_statement";
import {StatementParser} from "../../src/abap/statement_parser";
import {Write, Data} from "../../src/abap/statements";
import {defaultVersion} from "../../src/version";


describe("statement parser", () => {

  it("Stupid macro", () => {
    const abap = "moo bar\n" +
      "WRITE bar.";

    const globalMacros = ["moo"];

    const statements = new StatementParser().run(getFile(abap), defaultVersion, globalMacros);
    expect(statements.length).to.equal(1);
    expect(statements[0].getStatements()[0].get()).to.be.instanceof(MacroCall);
  });

  it("Unknown statements should be lazy, 2 statements", () => {
    const abap = "moo bar\n" +
      "WRITE bar.";

    const statements = getStatements(abap);
    expect(statements.length).to.equal(2);
    expect(statements[0].get()).to.be.instanceof(Unknown);
    expect(statements[1].get()).to.be.instanceof(Write);
  });

  it("Unknown statements should be lazy, 3 statements", () => {
    const abap = "WRITE moo.\n" +
      "moo bar\n" +
      "WRITE bar.";

    const statements = getStatements(abap);
    expect(statements.length).to.equal(3);
    expect(statements[0].get()).to.be.instanceof(Write);
    expect(statements[1].get()).to.be.instanceof(Unknown);
    expect(statements[2].get()).to.be.instanceof(Write);
  });

  it("Unknown statements should be lazy, multi line", () => {
    const abap = "moo\nbar\n" +
      "WRITE bar.";

    const statements = getStatements(abap);
    expect(statements.length).to.equal(2);
    expect(statements[0].get()).to.be.instanceof(Unknown);
    expect(statements[1].get()).to.be.instanceof(Write);
  });

  it("Chained/Colon statement", () => {
    const abap = "WRITE: bar.";

    const statements = getStatements(abap);
    expect(statements.length).to.equal(1);
    expect(statements[0].get()).to.be.instanceof(Write);
    expect(statements[0].getColon()).to.not.equal(undefined);
  });

  it("Keep track of pragmas", () => {
    const abap = "WRITE bar ##foobar.";

    const statements = getStatements(abap);
    expect(statements.length).to.equal(1);
    expect(statements[0].get()).to.be.instanceof(Write);
    expect(statements[0].getPragmas().length).to.equal(1);
  });

  it("Chained, pragma malplaced", () => {
    const abap = "DATA ##NEEDED: foo, bar.";

    const statements = getStatements(abap);
    expect(statements.length).to.equal(2);
    expect(statements[0].get()).to.be.instanceof(Data);
    expect(statements[0].getPragmas().length).to.equal(1);
    expect(statements[1].get()).to.be.instanceof(Data);
    expect(statements[1].getPragmas().length).to.equal(1);
  });

});