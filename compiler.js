function Calculator(inputString) {
	this.tokenStream = this.lexer(inputString);
}

Calculator.prototype.lexer = function(inputString) {
  var tokenTypes = [
    ["NUMBER",    /^\d+/ ],
    ["ADD",       /^\+/  ],
    ["SUB",       /^\-/  ],
    ["MUL",       /^\*/  ]
    // ["DIV",       /^\ / /  ]
    // ["LPAREN",    /^\(/  ],
    // ["RPAREN",    /^\)/  ]
  ];

  var tokens = [];
  var matched = true;

  while(inputString.length > 0 && matched) {
    matched = false;

    tokenTypes.forEach(tokenRegex => {
      var token = tokenRegex[0];
      var regex = tokenRegex[1];

      var result = regex.exec(inputString);

      if(result !== null) {
        matched = true;
        tokens.push({name: token, value: result[0]});
        inputString = inputString.slice(result[0].length)
      }
    })

    if(!matched) {
      throw new Error("Found unparseable token: " + inputString);
    }

  }
  console.log("tokens", tokens);

  return tokens;
};


Calculator.prototype.peek = function() {
  return this.tokenStream[0] || null;
}

Calculator.prototype.get = function() {
  return this.tokenStream.shift();
}

function TreeNode(name, ...children) {
  this.name = name;
  this.children = children;
}

Calculator.prototype.parseExpression = function () {
  var term = this.parseTerm();
  var a = this.parseA();

  return new TreeNode("Expression", term, a);
};

Calculator.prototype.parseA = function () {
  var nextToken = this.peek();
  if(nextToken && nextToken.name === "ADD") {
    this.get();
    return new TreeNode("A", "+", this.parseTerm(), this.parseA());
  } else if(nextToken && nextToken.name == "SUB") {
    this.get();
    return new TreeNode("A", "-", this.parseTerm(), this.parseA());
  } else {
    return new TreeNode("A")
  }
};

Calculator.prototype.parseTerm = function () {
  var nextToken = this.peek();
  if(nextToken && nextToken.name == "NUMBER"){
    this.get();
    return new TreeNode("Term", )
  }
}

var test = new Calculator("5+6");


