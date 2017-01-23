(function () {
    var systemUnderTest = require('../../../server/loaders/cic-loader').load;
    var data = "Date d'opÈration;Date de valeur;DÈbit;CrÈdit;LibellÈ;Solde\n28/10/2014;28/10/2014;-4,90;;FOO;1415,21\n31/10/2014;31/10/2014;-0,38;;BAR;1414,83\n05/11/2014;05/11/2014;-10,00;;FU 2609321/0n9134929/66 22518606 2609321 9134929/66;1404,83\n11/11/2014;11/11/2014;-59,99;;GNARK;1344,84\n13/11/2014;01/11/2014;-9,17;;GLOP;1335,67\n13/11/2014;13/11/2014;-2,00;;SARAH-CONNOR;1333,67\n14/11/2014;14/11/2014;-19,22;;AIE AIE AIE;1314,45";
    var result;

    describe('CIC Loader', function () {

        describe('When loading some CSV data', function () {

            beforeEach(function (done) {
                systemUnderTest(data).then(function (r) {
                    result = r;
                    done();
                }, function () {
                    done();
                });
            });

            it('should return a list of items', function () {
                result.length.should.equal(7);
            });

            it('should return the correct date for the first item', function () {
                result[0].date.getFullYear().should.equal(2014);
                result[0].date.getMonth().should.equal(10 - 1);
                result[0].date.getDate().should.equal(28);
            });

            it('should return the correct amount for the first item', function () {
                result[0].amount.should.equal(-4.90);
            });

            it('should return the correct description for the first item', function () {
                result[0].description.should.equal('FOO');
            });
        });

        describe('When loading an empty file', function () {
            beforeEach(function (done) {
                systemUnderTest("Date d'opÈration;Date de valeur;DÈbit;CrÈdit;LibellÈ;Solde").then(function (r) {
                    result = r;
                    done();
                }, function () {
                    done();
                });
            });

            it('should return an empty list', function () {
                result.length.should.equal(0);
            });

        });
    });
})();