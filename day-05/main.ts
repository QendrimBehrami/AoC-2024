if (import.meta.main) {
  part02();
}

function _part01() {
  const file_content = Deno.readTextFileSync("input.txt");
  const content = file_content.split("\n");

  const rules: string[] = [];
  const updates: string[] = [];

  content.forEach((row) => {
    if (row.includes("|")) {
      rules.push(row);
    } else if (row.includes(",")) {
      updates.push(row);
    }
  });

  const rule_map = new Map<string, Set<string>>();
  for (const rule of rules) {
    const [left, right] = rule.split("|");
    const values = rule_map.get(left) ?? new Set();
    values.add(right);
    rule_map.set(
      left,
      values,
    );
  }

  let middle_page_sum = 0;

  for (const update of updates) {
    const order = update.split(",");
    let valid = true;
    for (let i = 1; i < order.length; i++) {
      const current = order[i];
      const pre = order.slice(0, i);

      const forbidden_pre = rule_map.get(current);
      //if (!forbidden_pre) continue;

      const intersection = pre.filter((value) => forbidden_pre?.has(value));
      if (intersection.length) {
        //console.log("Found rule break:", current, "->", intersection);
        valid = false;
        break;
      }
    }
    if (valid) {
      const middle_index = Math.trunc(order.length / 2);
      const middle_page = order[middle_index];
      middle_page_sum += parseInt(middle_page);
    }
    console.log(`The update ${update} is ${valid ? "" : "not "}valid`);
  }

  console.log(`The middle page sum is ${middle_page_sum}`);
}

function part02() {
  const file_content = Deno.readTextFileSync("input.txt");
  const content = file_content.split("\n");

  const rules: string[] = [];
  const updates: string[] = [];

  content.forEach((row) => {
    if (row.includes("|")) {
      rules.push(row);
    } else if (row.includes(",")) {
      updates.push(row);
    }
  });

  const rule_map = new Map<string, Set<string>>();
  for (const rule of rules) {
    const [left, right] = rule.split("|");
    const values = rule_map.get(left) ?? new Set();
    values.add(right);
    rule_map.set(
      left,
      values,
    );
  }

  let middle_page_sum = 0;

  for (const update of updates) {
    const order = update.split(",");
    let valid = true;
    for (let i = 1; i < order.length; i++) {
      const current = order[i];
      const pre = order.slice(0, i);

      const forbidden_pre = rule_map.get(current);

      const intersection = pre.filter((value) => forbidden_pre?.has(value));
      if (intersection.length) {
        //console.log("Found rule break:", current, "->", intersection);
        valid = false;
        let current_index = i;
        for (
          let prev_index = current_index - 1;
          prev_index >= 0;
          prev_index--
        ) {
          if (intersection.includes(order[prev_index])) {
            const temp = order[current_index];
            order[current_index] = order[prev_index];
            order[prev_index] = temp;
            current_index = prev_index;
          }
        }
      }
    }
    if (!valid) {
      const middle_index = Math.trunc(order.length / 2);
      const middle_page = order[middle_index];
      middle_page_sum += parseInt(middle_page);
    }
    console.log(`The order ${order} was ${valid ? "" : "not "}valid`);
  }

  console.log(`The middle page sum is ${middle_page_sum}`);
}
