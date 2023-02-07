function processData(input) {
    //Enter your code here
 let inputArray = input.split("\n");
  let q = Number(inputArray[0]);
  let stack1 = [];
  let stack2 = [];

  for (let i = 1; i <= q; i++) {
    let query = inputArray[i].split(" ");
    let type = Number(query[0]);

    if (type === 1) {
      stack1.push(Number(query[1]));
    } else if (type === 2) {
      if (stack2.length === 0) {
        while (stack1.length > 0) {
          stack2.push(stack1.pop());
        }
      }
      stack2.pop();
    } else if (type === 3) {
      if (stack2.length === 0) {
        while (stack1.length > 0) {
          stack2.push(stack1.pop());
        }
      }
      console.log(stack2[stack2.length - 1]);
    }
  }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
