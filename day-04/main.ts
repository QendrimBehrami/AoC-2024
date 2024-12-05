if (import.meta.main) {
  part02();
}

function _part01() {
  const file_input = Deno.readTextFileSync("input.txt");
  const content = file_input.split(/\s+/);

  let counter = 0;

  // Helper functions
  const increment = (num: number) => num + 1;
  const decrement = (num: number) => num - 1;
  const identity = (num: number) => num;

  for (let row = 0; row < content.length; row++) {
    for (let column = 0; column < content[row].length; column++) {
      if (content[row][column] !== "X") continue;

      const matches = [
        traverse(content, 4, row, column, identity, increment) === "XMAS", //Right
        traverse(content, 4, row, column, identity, decrement) === "XMAS", //Left

        traverse(content, 4, row, column, increment, identity) === "XMAS", //Down
        traverse(content, 4, row, column, decrement, identity) === "XMAS", //Up

        traverse(content, 4, row, column, increment, increment) === "XMAS", //Down Right
        traverse(content, 4, row, column, decrement, increment) === "XMAS", //Up Right
        traverse(content, 4, row, column, increment, decrement) === "XMAS", //Down Left
        traverse(content, 4, row, column, decrement, decrement) === "XMAS", //Up Left
      ];

      const sum = matches.map((b) => +b).reduce((a, b) => a + b);

      counter += sum;
    }
  }

  console.log(`Found XMAS ${counter} times!`);
}

function part02() {
  const file_input = Deno.readTextFileSync("input.txt");
  const content = file_input.split(/\s+/);

  let counter = 0;

  // Helper functions
  const increment = (num: number) => num + 1;
  const decrement = (num: number) => num - 1;

  for (let row = 1; row < content.length - 1; row++) {
    for (let column = 1; column < content[row].length - 1; column++) {
      if (content[row][column] !== "A") continue;

      const right_down_diagonale = traverse(
        content,
        3,
        row - 1,
        column - 1,
        increment,
        increment,
      );
      const left_up_diagonale = traverse(
        content,
        3,
        row + 1,
        column - 1,
        decrement,
        increment,
      );

      if (
        (left_up_diagonale === "MAS" || left_up_diagonale == "SAM") &&
        (right_down_diagonale === "MAS" || right_down_diagonale === "SAM")
      ) counter++;
    }
  }

  console.log(`Found X-MAS ${counter} times!`);
}

function traverse(
  arr: string[],
  n: number,
  row: number,
  column: number,
  row_increment: (arg0: number) => number,
  col_increment: (arg0: number) => number,
) {
  let result = "";
  for (let i = 0; i < n; i++) {
    if (arr[row] == undefined) return result;
    else result += arr[row][column] ?? "";
    row = row_increment(row);
    column = col_increment(column);
  }

  return result;
}
