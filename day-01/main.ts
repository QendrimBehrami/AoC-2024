// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  _part02();
}

function _part01() {
  const input = Deno.readTextFileSync("input.txt").replaceAll(/\s+/g, ",")
    .split(",");

  let left_side = [];
  let right_side = [];

  for (let i = 0; i < input.length; i += 2) {
    left_side.push(input[i]);
    right_side.push(input[i + 1]);
  }

  left_side = left_side.sort();
  right_side = right_side.sort();

  let dif = 0;

  for (let i = 0; i < left_side.length; i++) {
    dif += Math.abs(parseInt(left_side[i]) - parseInt(right_side[i]));
  }

  console.log("The difference is : " + dif);
}

function _part02() {
  const input = Deno.readTextFileSync("input.txt").replaceAll(/\s+/g, ",")
    .split(",");

  const left_side = [];
  const right_side = [];

  for (let i = 0; i < input.length; i += 2) {
    left_side.push(input[i]);
    right_side.push(input[i + 1]);
  }

  const right_map = new Map<number, number>();
  right_side.forEach((key_str: string) => {
    const key = parseInt(key_str);
    const value = right_map.get(key) ?? 0;
    right_map.set(key, value + 1);
  });

  let similarity_score = 0;

  left_side.forEach((key_str: string) => {
    const key = parseInt(key_str);
    const simiarity = right_map.get(key) ?? 0;
    similarity_score += key * simiarity;
  });

  console.log("The similarity is " + similarity_score);
}
