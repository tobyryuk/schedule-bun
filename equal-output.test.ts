import { expect, test } from "bun:test";
import funcyHandle from "./funcy";
import literalHandle from "./literal";

test("all versions output the same", () => {
  const funcyOutput = funcyHandle("./sample.json");
  const literalOutput = literalHandle("./sample.json");
  expect(funcyOutput).toEqual(literalOutput);
});
