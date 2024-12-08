if (import.meta.main) {
  part02();
}

function _part01() {
  const content = Deno.readTextFileSync("input.txt")
    .split(/\n/);

  let total_sum = 0;

  content.forEach((row: string) => {
    const [result_str, operands_str] = row.split(/\:/);
    const result = parseInt(result_str);
    const operands = operands_str
      .split(/\s+/)
      .filter((s) => s !== "")
      .map((s) => parseInt(s));

    const possible_operators = generate_operator_arrays(operands.length - 1);
    for (const operators of possible_operators) {
      const evaluation = evaluate(operands, operators);
      if (evaluation == result) {
        total_sum += evaluation;
        break;
      }
    }
  });

  console.log(`The total sum is ${total_sum}`);
}

function evaluate(operands: number[], operators: string[]) {
  if (
    !(operands && operators && operands.length == operators.length + 1)
  ) {
    throw console.error(
      `Failed to evaluate for operands ${operands} and operators ${operators}`,
    );
  }

  let result = operands[0];
  for (let i = 0; i < operands.length - 1; i++) {
    switch (operators[i]) {
      case "+":
        result += operands[i + 1];
        break;
      case "*":
        result *= operands[i + 1];
        break;
      case "||":
        result = parseInt("" + result + operands[i + 1]);
        break;
      default:
        console.error("Could not parse operator", operators[i]);
    }
  }
  return result;
}

function generate_operator_arrays(n: number, allow_concat = false): string[][] {
  if (n == 1) {
    if (allow_concat) return [["+"], ["*"], ["||"]];
    return [["+"], ["*"]];
  }

  const prev = generate_operator_arrays(n - 1, allow_concat);
  const result: string[][] = [];

  for (const previous_operator_sequence of prev) {
    result.push(previous_operator_sequence.concat("+"));
    result.push(previous_operator_sequence.concat("*"));
    if (allow_concat) result.push(previous_operator_sequence.concat("||"));
  }

  return result;
}

function part02() {
  const content = Deno.readTextFileSync("input.txt")
    .split(/\n/);

  let total_sum = 0;

  content.forEach((row: string) => {
    const [result_str, operands_str] = row.split(/\:/);
    const result = parseInt(result_str);
    const operands = operands_str
      .split(/\s+/)
      .filter((s) => s !== "")
      .map((s) => parseInt(s));

    const possible_operators = generate_operator_arrays(
      operands.length - 1,
      true,
    );

    for (const operators of possible_operators) {
      const evaluation = evaluate(operands, operators);
      if (evaluation == result) {
        total_sum += evaluation;
        break;
      }
    }
  });

  console.log(`The total sum is ${total_sum}`);
}
