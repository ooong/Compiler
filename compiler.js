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




var test = new Calculator("5+6");


