/// <reference path="typings/mocha/mocha.d.ts" />
/// <reference path="typings/chai/chai.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

import Lexer from "../src/lexer";
import Parser from "../src/parser";
import Token from "../src/token";
import Report from "../src/report";
import Runner from "../src/runner";
import * as chai from "chai";
import * as fs from "fs";

let expect = chai.expect;

function helper(file: string): Parser {
    let buf = fs.readFileSync("./test/abap/" + file, "utf8");
    let parser = new Parser(new Lexer(buf));
    return parser;
}

describe("files, tokens", function() {
    let tests = [
        {file: "zhello01", tokens:  6},
        {file: "zhello02", tokens:  6},
        {file: "zhello03", tokens:  6},
        {file: "zhello04", tokens:  6},
        {file: "zhello05", tokens:  6},
        {file: "zhello06", tokens:  6},
        {file: "zhello07", tokens: 10},
        {file: "zhello08", tokens:  9},
        {file: "zhello09", tokens: 11},
        {file: "zhello10", tokens: 18},
    ];

    tests.forEach(function(test) {
        let tokens = helper(test.file + ".prog.abap").get_lexer().get_tokens();

        it(test.file + " should have " + test.tokens + " tokens", () => {
            expect(tokens.length).to.equals(test.tokens);
        });
    });
});

describe("files, statements", function() {
    let tests = [
        {file: "zhello01", statements: 2},
        {file: "zhello02", statements: 2},
        {file: "zhello03", statements: 2},
        {file: "zhello04", statements: 2},
        {file: "zhello05", statements: 2},
        {file: "zhello06", statements: 2},
        {file: "zhello07", statements: 3},
        {file: "zhello08", statements: 3},
        {file: "zhello09", statements: 3},
        {file: "zhello10", statements: 5},
        {file: "zif01",    statements: 4},
        {file: "zif02",    statements: 6},
        {file: "zif03",    statements: 8},
    ];

    tests.forEach(function(test) {
        let statements = helper(test.file + ".prog.abap").get_statements();

        it(test.file + " should have " + test.statements + " statements", () => {
            expect(statements.length).to.equals(test.statements);
        });
    });
});

describe("zcheck01", function() {
    let runner = new Runner("./test/abap/zcheck01.prog.abap");

    it("should have 1 error", () => {
        expect(runner.get_report().get_count()).to.equals(1);
    });
});