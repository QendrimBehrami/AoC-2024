if (import.meta.main) {
  part02();
}

function _part01() {
  const file_content = Deno.readTextFileSync("input.txt");
  const content = file_content
    .split(/\n/)
    .map((row) => {
      const result_str = row.split(/\s+/);
      const result = result_str.map((s) => parseInt(s));
      return result;
    });

  let safe_sum = 0;
  content.forEach((row) => {
    if (validate_row(row)) safe_sum++;
  });

  console.log(`There are ${safe_sum} safe reports!`);
}

function part02() {
  const file_content = Deno.readTextFileSync("input.txt");
  const content = file_content
    .split(/\n/)
    .map((row) => {
      const result_str = row.split(/\s+/);
      const result = result_str.map((s) => parseInt(s));
      return result;
    });

  let safe_sum = 0;
  content.forEach((row) => {
    if (validate_row(row)) safe_sum++;
    else {
      for (let i = 0; i < row.length; i++) {
        const new_row = [
          ...row.slice(0, i),
          ...row.slice(i + 1),
        ];
        if (validate_row(new_row)) {
          safe_sum++;
          break;
        }
      }
    }
  });

  console.log(`There are ${safe_sum} safe reports!`);
}

function validate_row(row: number[]): boolean {
  const ascending = row[0] <= row[1];
  let safe = true;

  for (let i = 0; i < row.length - 1; i++) {
    if (
      (ascending && row[i] >= row[i + 1]) ||
      (!ascending && row[i] <= row[i + 1]) ||
      Math.abs(row[i] - row[i + 1]) > 3
    ) {
      safe = false;
      break;
    }
  }
  return safe;
}
