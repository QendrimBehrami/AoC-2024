if (import.meta.main) {
  part02();
}

function _part01() {
  const file_content = Deno.readTextFileSync("input.txt");

  const file_array = file_content.split(/\s+/);
  const [maze_width, maze_height] = [
    file_array[0].length,
    file_array.length,
  ];

  const movement = [
    (i: number, j: number) => [i - 1, j], // Up
    (i: number, j: number) => [i, j + 1], // Right
    (i: number, j: number) => [i + 1, j], // Down
    (i: number, j: number) => [i, j - 1], // Left
  ];

  // Find guard
  const position = {
    x: -1,
    y: -1,
  };

  for (let i = 0; i < maze_width; i++) {
    for (let j = 0; j < maze_height; j++) {
      if (file_array[i][j] == "^") {
        position.x = i;
        position.y = j;
        break;
      }
    }
  }

  let direction = 0; // Start upwards

  const filtered_file_content = file_content.replaceAll(/\s+/g, "");
  const modified_map = [...filtered_file_content];
  const idx = (i: number, j: number) => i * maze_width + j;

  while (true) {
    const [newX, newY] = movement[direction](position.x, position.y);

    // Case 1: Out ouf bounds
    if (newX < 0 || newX >= maze_width || newY < 0 || newY >= maze_height) {
      modified_map[idx(position.x, position.y)] = "X";
      break;
    }

    // Case 2: Free to move
    if (
      modified_map[idx(newX, newY)] == "." ||
      modified_map[idx(newX, newY)] == "X"
    ) {
      modified_map[idx(position.x, position.y)] = "X";
      modified_map[idx(newX, newY)] = "^";
      position.x = newX;
      position.y = newY;
    }

    // Case 3: Obstacle
    if (modified_map[idx(newX, newY)] == "#") {
      direction = (direction + 1) % movement.length;
    }
  }

  // Result map
  for (let i = 0; i < maze_width; i++) {
    let line = "";
    for (let j = 0; j < maze_height; j++) {
      line += modified_map[idx(i, j)];
    }
    console.log(line, "\n");
  }

  // Compute distinct positions
  const result = modified_map.filter((c) => c === "X").length;
  console.log(`I found ${result} distinct positions`);
}

function part02() {
  const file_content = Deno.readTextFileSync("input.txt");

  const file_array = file_content.split(/\s+/);
  const [maze_width, maze_height] = [
    file_array[0].length,
    file_array.length,
  ];

  const movement = [
    (i: number, j: number) => [i - 1, j], // Up
    (i: number, j: number) => [i, j + 1], // Right
    (i: number, j: number) => [i + 1, j], // Down
    (i: number, j: number) => [i, j - 1], // Left
  ];

  // Find guard
  let originalX = -1;
  let originalY = -1;

  for (let i = 0; i < maze_width; i++) {
    for (let j = 0; j < maze_height; j++) {
      if (file_array[i][j] == "^") {
        originalX = i;
        originalY = j;
        break;
      }
    }
  }

  const filtered_file_content = file_content.replaceAll(/\s+/g, "");
  const idx = (i: number, j: number) => i * maze_width + j;

  let total_count = 0;

  for (let o = 0; o < filtered_file_content.length; o++) {
    const modified_map = [...filtered_file_content];
    if (modified_map[o] == "^" || modified_map[o] == "#") continue;
    else modified_map[o] = "#";

    let steps = 0;
    let cycle = true;
    let direction = 0; // Start upwards
    const position = { x: originalX, y: originalY };

    while (steps <= maze_height * maze_height) {
      const [newX, newY] = movement[direction](position.x, position.y);

      // Case 1: Out ouf bounds
      if (newX < 0 || newX >= maze_width || newY < 0 || newY >= maze_height) {
        modified_map[idx(position.x, position.y)] = "X";
        cycle = false;
        break;
      }

      // Case 2: Free to move
      if (
        modified_map[idx(newX, newY)] == "." ||
        modified_map[idx(newX, newY)] == "X"
      ) {
        modified_map[idx(position.x, position.y)] = "X";
        modified_map[idx(newX, newY)] = "^";
        position.x = newX;
        position.y = newY;
      }

      // Case 3: Obstacle
      if (modified_map[idx(newX, newY)] == "#") {
        direction = (direction + 1) % movement.length;
      }

      steps++;
    }
    if (cycle) total_count++;
  }

  console.log(`I found ${total_count} possibilities`);
}
