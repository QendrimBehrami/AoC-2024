class Position {
  x: number = -1;
  y: number = -1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

if (import.meta.main) {
  _part02();
}

function _part01() {
  const file_content = Deno.readTextFileSync("input.txt");

  const file_array = file_content.split(/\s+/);
  const [maze_width, maze_height] = [
    file_array[0].length,
    file_array.length,
  ];

  const filtered_file_content = file_content.replaceAll(/\s+/g, "");
  const maze = [...filtered_file_content];
  const idx = (i: number, j: number) => i * maze_width + j;

  // Create a frequency map
  const frequency_map = new Map<string, [Position]>();

  for (let i = 0; i < maze_width; i++) {
    for (let j = 0; j < maze_height; j++) {
      const frequency = maze[idx(i, j)];
      if (frequency === ".") continue;
      const position = new Position(i, j);

      let value = frequency_map.get(frequency);
      if (value === undefined) {
        value = [position];
      } else {
        value.push(position);
      }
      frequency_map.set(frequency, value);
    }
  }

  const addAntinode = (p: Position) => {
    if (p.x >= 0 && p.x < maze_width && p.y >= 0 && p.y < maze_height) {
      maze[idx(p.x, p.y)] = "#";
    }
  };

  for (const frequency of frequency_map.keys()) {
    const positions = frequency_map.get(frequency);
    if (!positions || positions?.length < 2) continue;

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];

        // Create a vector from p1 to p2
        const row_vec = p2.x - p1.x;
        const col_vec = p2.y - p1.y;

        // Create antinodes
        const a1 = new Position(p1.x - row_vec, p1.y - col_vec);
        const a2 = new Position(p2.x + row_vec, p2.y + col_vec);

        addAntinode(a1);
        addAntinode(a2);

        // console.log(frequency, a1, maze[idx(a1.x, a1.y)]);
        // console.log(frequency, a2, maze[idx(a2.x, a2.y)]);
      }
    }
  }

  const found_antinodes = maze.filter((c) => c == "#").length;
  console.log(`I found ${found_antinodes} antinodes`);

  // for (let i = 0; i < maze_width; i++) {
  //   const start = i * maze_width;
  //   const row = maze.slice(start, start + maze_width).reduce((a, b) => a + b);
  //   console.log(row);
  // }
}

function _part02() {
  const file_content = Deno.readTextFileSync("input.txt");

  const file_array = file_content.split(/\s+/);
  const [maze_width, maze_height] = [
    file_array[0].length,
    file_array.length,
  ];

  const filtered_file_content = file_content.replaceAll(/\s+/g, "");
  const maze = [...filtered_file_content];
  const idx = (i: number, j: number) => i * maze_width + j;

  // Create a frequency map
  const frequency_map = new Map<string, [Position]>();

  for (let i = 0; i < maze_width; i++) {
    for (let j = 0; j < maze_height; j++) {
      const frequency = maze[idx(i, j)];
      if (frequency === ".") continue;
      const position = new Position(i, j);

      let value = frequency_map.get(frequency);
      if (value === undefined) {
        value = [position];
      } else {
        value.push(position);
      }
      frequency_map.set(frequency, value);
    }
  }

  const isValid = (p: Position) =>
    p.x >= 0 && p.x < maze_width && p.y >= 0 && p.y < maze_height;

  for (const frequency of frequency_map.keys()) {
    const positions = frequency_map.get(frequency);
    if (!positions || positions?.length < 2) continue;

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];

        // Create a vector from p1 to p2
        const row_vec = p2.x - p1.x;
        const col_vec = p2.y - p1.y;

        const a1 = { ...p1 };
        const a2 = { ...p2 };
        while (isValid(a1)) {
          maze[idx(a1.x, a1.y)] = "#";
          a1.x -= row_vec;
          a1.y -= col_vec;
        }

        while (isValid(a2)) {
          maze[idx(a2.x, a2.y)] = "#";
          a2.x += row_vec;
          a2.y += col_vec;
        }
      }
    }
  }

  const found_antinodes = maze.filter((c) => c == "#").length;
  console.log(`I found ${found_antinodes} antinodes`);

  for (let i = 0; i < maze_width; i++) {
    const start = i * maze_width;
    const row = maze.slice(start, start + maze_width).reduce((a, b) => a + b);
    console.log(row);
  }
}
