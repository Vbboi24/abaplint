import {statementType} from "../_utils";
import * as Statements from "../../../src/abap/statements/";

const tests = [
  "COMMUNICATION INIT ID c DESTINATION dest.",
  "COMMUNICATION ALLOCATE ID c.",
  "COMMUNICATION SEND ID c BUFFER connect.",
  "COMMUNICATION DEALLOCATE ID c.",
  "COMMUNICATION SEND ID c BUFFER <output> LENGTH slenx.",
  "COMMUNICATION RECEIVE ID c BUFFER input DATAINFO dinf STATUSINFO sinf RECEIVED rlen.",
  "COMMUNICATION ACCEPT ID c.",
];

statementType(tests, "COMMUNICATION", Statements.Communication);