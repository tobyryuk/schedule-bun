import { expect, test } from "bun:test";
import funcyHandle from "./funcy";
import literalHandle from "./literal";

test("all versions output the same", () => {
  const funcyOutput = funcyHandle("./fixtures/sample.json");
  const literalOutput = literalHandle("./fixtures/sample.json");
  expect(funcyOutput).toEqual(literalOutput);
});
