const input = [
    "3",
    "K.P",
    "...",
    "K.K",
    "3 3 4",
    "9 5 9",
    "8 3 7"
];

const n = Number(input[0]);
const arr = [];

for(let i = 1; i <= n; i++) {
    arr.push(input[i].split(""));
}

const height = [];
for(let i = n + 1; i <= n + n; i++) {
    height.push(input[i].split(" ").map(Number));
}

const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
const dx = [-1, -1, -1, 0, 0, 1, 1, 1];

let uniqueHeight = new Set();
let target = 0;
let result = 1e9;
let startX = 0;
let startY = 0;
for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
        uniqueHeight.add(height[i][j]);
        if(arr[i][j] === "P") {
            startX = i;
            startY = j;
        }
        if(arr[i][j] === "K") target +=1;
    }
}

uniqueHeight = [...uniqueHeight]
uniqueHeight.sort((a, b) => a - b);

let left = 0;
let right = 0;
let middle = 0;
for(let i = 0; i < uniqueHeight.length; i++) {
    if(uniqueHeight[i] === height[startX][startY]) {
        right = i;
        middle = i;
        break;
    }
}

let visited = [];
let cnt = 0;
while(true) {
    while(true) {
        visited = [];
        for(let i = 0; i < n; i++) visited.push(new Array(n).fill(false));
        cnt = 0;
        dfs(startX, startY);
        if(right < uniqueHeight.length - 1 && cnt < target) right += 1;
        else break;
    }

    if(cnt === target) {
        result = Math.min(result, uniqueHeight[right] - uniqueHeight[left]);
    }
    left += 1;
    if(left > middle || right >= uniqueHeight.length) break;
}

console.log(result);

function dfs(x, y) {
    visited[x][y] = true;
    if(arr[x][y] === "K") cnt += 1;
    for(let i = 0; i < 8; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        if(nx < 0 || nx >= n || ny < 0 || ny > n) continue;
        if(!visited[nx][ny]) {
            if(height[nx][ny] >= uniqueHeight[left] && height[nx][ny] <= uniqueHeight[right]){
                dfs(nx, ny);
            }
        }
    }
}