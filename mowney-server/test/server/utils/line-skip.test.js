var systemUnderTest = require('../../../server/utils/line-skip');

describe('Skip Lines', function () {
    it('Should return the same thing with 0 skip', function () {
        systemUnderTest('a\nb\nc', 0).should.equal('a\nb\nc');
    });
    
    it('Should remove the first line with 1 skip', function () {
        systemUnderTest('a\nb\nc', 1).should.equal('b\nc');
    });
    
    it('Should return an empty string with all skip', function () {
        systemUnderTest('a\nb\nc', 3).should.equal('');
    });
});