(function () {
    var systemUnderTest = require('../../../server/loaders/nationwide-loader').load;
    var data = '"Account Name:","Current_Account ****98703"\n"Account Balance:","£10019.02"\n"Available Balance: ","£10018.23"\n\n"Date","Transaction type","Description","Paid out","Paid in","Balance"\n"30 Sep 2014","Visa","FOO","£141.30","","£13710.46"\n"01 Oct 2014","Direct debit","BAR","£10.00","","£13700.46"\n"01 Oct 2014","Direct debit Fizz","Fizz Ltd","£48.50","","£13651.96"\n"01 Oct 2014","Direct debit Buzz","Buzz","£75.00","","£13576.96"\n';
    var result;

    describe('Nationwide Loader', function () {

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
                result.length.should.equal(4);
            });

            it('should return the correct date for the first item', function () {
                result[0].date.getFullYear().should.equal(2014);
                result[0].date.getMonth().should.equal(9 - 1);
                result[0].date.getDate().should.equal(30);
            });

            it('should return the correct amount for the first item', function () {
                result[0].amount.should.equal(-141.30);
            });

            it('should return the correct description for the first item', function () {
                result[0].description.should.equal('FOO');
            });
        });

        describe('When loading an empty file', function () {
            beforeEach(function (done) {
                systemUnderTest('"Account Name:","Current_Account ****98703"\n"Account Balance:","£10019.02"\n"Available Balance: ","£10018.23"\n\n"Date","Transaction type","Description","Paid out","Paid in","Balance"').then(function (r) {
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