describe(`Basic JavaScript Functions Test Suite`, function() {
  describe(`1 : Invoke a function named 'greet' ... `,function() {
    try {
      if (!greet) {
        it(`throws a ReferenceError`,function(){
          expect(greet('test')).to.throw(ReferenceError);
        });
      } else {
        it(`returns "Hello {name}" after #2`,function(){
          expect(greet('test')).to.equal('Hello test');
        });
      }
    } catch(e) {
      xit('invoke greet', function(){})
    }
  });
  describe(`2 : Write a function **declaration** named 'greet' which ... `,function() {
    it(`returns "Hello {name}"`,function(){
      expect(greet('test')).to.equal('Hello test');
    });
  });
  describe(`3 : Invoke a function named 'farewell' ... `,function() {
    xit(`invoke 'farewell'`, function(){})
  });
  describe(`4 : Write a function **expression** named 'farewell' ...`,function() {
    try {
      farewell;
    } catch (e) {
      if (e.message === 'farewell is not defined') {
        it(`'farewell' is defined`, function() {
          expect(farewell).to.be.defined;
        })
      }
    }
    try {
      farewell();
    } catch (e) {
      if (e.message === 'farewell is not a function') {
        it(`'farewell' is undefined`, function() {
          expect(farewell).to.be.undefined;
        })
      }
    }
    try {
      if (farewell) {
        xit('is defined and a function', function(){})
      }
    } catch(e) {

    }
  });
  describe(`5 : Create a new function **expression** named 'sayHello' ...`,function() {
    it(`sayHello is a function`,function(){
      expect(typeof sayHello).to.equal('function');
    });
    it(`it is the same function as greet`,function(){
      expect(sayHello).to.equal(greet);
    });
    it(`it returns the same value as greet`,function(){
      expect(sayHello('test')).to.equal(greet('test'));
    });
  });
  
});