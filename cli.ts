import funcy from "./funcy";
import literal from "./literal";

const run = () => {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error("Invalid number of arguments");
    console.log("Usage: bun cli.ts { funcy | literal }");
    process.exit(1);
  }

  switch (args[0]) {
    case "funcy":
      funcy("./fixtures/sample.json").forEach((s) => console.log(s));
      break;
    case "literal":
      literal("./fixtures/sample.json").forEach((s) => console.log(s));
      break;
    default:
      console.error("Invalid argument");
      console.log("Usage: bun cli.ts { funcy | literal }");
      process.exit(1);
  }
};

run();
