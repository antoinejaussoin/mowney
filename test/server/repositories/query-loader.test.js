var rewire = require('rewire');
var sinon = require("sinon");
var path = require('path');
var mockFs = null;
var result;
var systemUnderTest;

describe('Query Loader', function () {

    beforeEach(function () {
        systemUnderTest = rewire('../../../server/repositories/query-loader');
        mockFs = {
            readFileSync: sinon.spy(function (p) {
                return 'blah';
            })
        };

        systemUnderTest.__set__({
            'fs': mockFs
        });
    });

    describe('When loading a file for the first time', function () {
        beforeEach(function () {
            result = systemUnderTest('foo');
        });
        
        
        it('should return the content of the file', function () {
            result.should.equal('blah');
        });
        
        it('should have called the read file function with the correct file name', function(){
            var expectedPath = path.join(__dirname, '..', '..', '..', 'server', 'repositories', 'queries', 'foo.sql');
            mockFs.readFileSync.should.have.been.calledWith(expectedPath);
        });
        
    });
    
    describe('When loading a file multiple times', function () {
        beforeEach(function () {
            systemUnderTest('foo');
            result = systemUnderTest('foo');
        });
        
        
        it('should return the content of the file', function () {
            result.should.equal('blah');
        });
        
        it('should have called the read file function only once', function(){
            mockFs.readFileSync.should.have.been.calledOnce;
        });
        
    });
});