(function () {
    var systemUnderTest = require('../../../server/loaders/loader-factory');
    var result;

    describe('Loader Factory', function () {
        describe('When loading the loaders', function () {
            
            it('should have a CIC loader', function(){
               systemUnderTest['CicParis'].name.should.equal('CIC Paris'); 
            });
            
            it('should have a Nationwide loader', function(){
               systemUnderTest['NationWideCurrent'].name.should.equal('Nationwide UK'); 
            });
            
            it('should have a Microsoft Money loader', function(){
               systemUnderTest['MicrosoftMoney'].name.should.equal('Microsoft Money (OFX)'); 
            });
            
            it('should have a Citibank loader', function(){
               systemUnderTest['CitibankUk'].name.should.equal('Citibank UK'); 
            });
        });
    });

})();