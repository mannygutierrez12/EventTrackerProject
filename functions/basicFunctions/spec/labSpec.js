describe(`Functions Lab Test Suite`, function() {
  describe(`1 : Write a function named 'reverse' ...  `, function() {
    it(`there is a reverse function`, function() {
      expect(reverse).to.be.defined;
      expect(typeof reverse).to.equal('function');
    });
    it(`reverses the order of the characters in a string`, function() {
      expect(reverse('banana')).to.equal('ananab');
      expect(reverse('hannah')).to.equal('hannah');
      expect(reverse('cat')).to.equal('tac');
    });
  });
  describe(`2 : Write a function named 'palindromeChecker' ...  `, function() {
    it(`there is a palindromeChecker function`, function() {
      expect(palindromeChecker).to.be.defined;
      expect(typeof palindromeChecker).to.equal('function');
    });
    it(`determines if a string is a palindrome`, function() {
      expect(palindromeChecker('banana')).to.be.false;
      expect(palindromeChecker('hannah')).to.be.true;
      expect(palindromeChecker('cat')).to.be.false;
    });
  });
  describe(`3 : Write a function named 'isPrime' ...`, function() {
    it(`there is a isPrime function`, function() {
      expect(isPrime).to.be.defined;
      expect(typeof isPrime).to.equal('function');
    });
    it(`determines if a number is prime`, function() {
      expect(isPrime(3)).to.be.true;
      expect(isPrime(144)).to.be.false;
      expect(isPrime(149)).to.be.true;
    });
  });
  describe(`4: computeTax function ...`, function() {
    it(`there is a computeTax function`, function() {
      expect(computeTax).to.be.defined;
      expect(typeof computeTax).to.equal('function');
    })
    it(`calculates the tax at 7.5% if no alternate tax value is provided`, function() {
      expect(computeTax(10)).to.equal(0.75);
      expect(computeTax(20)).to.equal(1.5);
      expect(computeTax(100)).to.equal(7.50);
    });
    it(`calculates the tax at a rate provided when the function is invoked`, function() {
      expect(computeTax(10,10)).to.equal(1);
      expect(computeTax(10,100)).to.equal(10);
      expect(computeTax(1000,50)).to.equal(500);
      expect(computeTax(100,1.5)).to.equal(1.5);
    });
  });
});
