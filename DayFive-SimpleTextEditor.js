function processData(input) {
    let text = ""
    const stack = []
    input = input.split("\n")
    const q = +input[0]
    
    for (let i = 1; i <= q; i++) {
      const [operation, value] = input[i].split(" ")
         
      switch (operation) {
        case "1": 
          stack.push(text)       
          text = text + value
          break
        case "2": 
          stack.push(text)
          text = text.substring(0, text.length - value)
          break
        case "3": 
          console.log(text[value - 1])
          break
        case "4":
          text = stack.pop()
          break
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
