if (import.meta.main) {
  part02();
}

function part01() {
  const file_content = Deno.readTextFileSync("input.txt");
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const result = file_content.matchAll(regex);
  let total_sum = 0;
  for (const match of result) {
    const product = match.at(0)?.slice(4, -1).split(",").map((v) => parseInt(v))
      .reduce((a, b) => a * b);
    total_sum += product ?? 0;
  }

  console.log(`The total sum is ${total_sum}`);
}

function part02() {
  const file_content = Deno.readTextFileSync("input.txt");
  const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
  const result = file_content.matchAll(regex);

  let mode = true;
  let total_sum = 0;

  for (const match of result) {
    const instruction = match.at(0);
    if (instruction === "don't()") mode = false;
    else if (instruction === "do()") mode = true;
    else if (mode) {
      const product = match.at(0)?.slice(4, -1).split(",").map((v) =>
        parseInt(v)
      )
        .reduce((a, b) => a * b);
      total_sum += product ?? 0;
    }
  }

  console.log(`The total sum is ${total_sum}`);
}
