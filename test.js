let Checker = require('./tool');
let should = require('should');
const LOTTERY_PRIZE = require('./constants').LOTTERY_PRIZE;

// Init value
let winNum = [11, 22, 33, 44, 55, 6];

// Util functions
let shuffle = (a) => {
    let j, x, i;
    let array = JSON.parse(JSON.stringify(a));
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
    return array;
};

let getRandomNum = (min, max, except) => {
    if (except === null) {
        return Math.floor(Math.random() * (max - min + 1) + min );
    } else {
        let r = Math.floor(Math.random() * (max - min + 1) + min );
        while(r === except) {
            r = Math.floor(Math.random() * (max - min + 1) + min );
        }
        return r;
    }
};

let getRandomArr = (a, numberOfElements) => {
    let arr = shuffle(a);
    arr = arr.splice(0, numberOfElements);
    for (let i = numberOfElements; i < a.length; i++) {
        let r = getRandomNum(1, 69);
        while (a.indexOf(r) >= 0) {
            r = getRandomNum(1, 69);
        }
        arr.push(r);
    }
    return shuffle(arr);
};

describe('Winning number: 1-2-3-4-5-6', function() {
    let whiteBalls = winNum.slice(0, winNum.length - 1 );
    let redBall = winNum[winNum.length - 1];
    let looptimes = 10;

    // 5 white + power ball
    describe('Prize: 5/5 + power ball', function() {

        for (let i = 1; i <= looptimes; i++) {
            let ticket = shuffle(whiteBalls);
            ticket.push(redBall);
            it('Test ' + i + ':'+ ' Ticket ' + ticket.join('-') + ' should be 5/5 + powerball', function() {
                let result = Checker.checkWinningNumber(ticket, winNum);
                should.exist(result);

                // 5 white + power ball
                result.should.be.eql(LOTTERY_PRIZE.powerball[0]);
            });
        }
    });


    // 5 white
    describe('Prize: 5/5', function() {

        for (let i = 1; i <= looptimes; i++) {
            let ticket = shuffle(whiteBalls);
            ticket.push(getRandomNum(1, 26, redBall));
            it('Test ' + i + ':'+ ' Ticket ' + ticket.join('-') + ' should be 5/5', function() {
                let result = Checker.checkWinningNumber(ticket, winNum);
                should.exist(result);

                // 5 white
                result.should.be.eql(LOTTERY_PRIZE.powerball[1]);
            });
        }
    });


    // 4/5 white + powerball
    describe('Prize: 4/5 + powerball', function() {

        for (let i = 1; i <= looptimes; i++) {
            let ticket = getRandomArr(whiteBalls, 4);
            ticket.push(redBall);
            it('Test ' + i + ':'+ ' Ticket ' + ticket.join('-') + ' should be 4/5 + powerball', function() {
                let result = Checker.checkWinningNumber(ticket, winNum);
                should.exist(result);

                // 4/5 white + powerball
                result.should.be.eql(LOTTERY_PRIZE.powerball[2]);
            });
        }
    });


    // 4/5 white
    describe('Prize: 4/5', function() {

        for (let i = 1; i <= looptimes; i++) {
            let ticket = getRandomArr(whiteBalls, 4);
            ticket.push(getRandomNum(1, 26, redBall));
            it('Test ' + i + ':'+ ' Ticket ' + ticket.join('-') + ' should be 4/5', function() {
                let result = Checker.checkWinningNumber(ticket, winNum);
                should.exist(result);

                // 4/5 white
                result.should.be.eql(LOTTERY_PRIZE.powerball[3]);
            });
        }
    });

    // 3/5 white + powerball
    describe('Prize: 3/5 + powerball', function() {

        for (let i = 1; i <= looptimes; i++) {
            let ticket = getRandomArr(whiteBalls, 3);
            ticket.push(redBall);
            it('Test ' + i + ':'+ ' Ticket ' + ticket.join('-') + ' should be 3/5 + powerball', function() {
                let result = Checker.checkWinningNumber(ticket, winNum);
                should.exist(result);

                // 3/5 white + powerball
                result.should.be.eql(LOTTERY_PRIZE.powerball[4]);
            });
        }
    });


    // 3/5 white
    describe('Prize: 3/5', function() {

        for (let i = 1; i <= looptimes; i++) {
            let ticket = getRandomArr(whiteBalls, 3);
            ticket.push(getRandomNum(1, 26, redBall));
            it('Test ' + i + ':'+ ' Ticket ' + ticket.join('-') + ' should be 3/5', function() {
                let result = Checker.checkWinningNumber(ticket, winNum);
                should.exist(result);

                // 3/5 white
                result.should.be.eql(LOTTERY_PRIZE.powerball[5]);
            });
        }
    });


    // 2/5 white + powerball
    describe('Prize: 2/5 + powerball', function() {

        for (let i = 1; i <= looptimes; i++) {
            let ticket = getRandomArr(whiteBalls, 2);
            ticket.push(redBall);
            it('Test ' + i + ':'+ ' Ticket ' + ticket.join('-') + ' should be 2/5 + powerball', function() {
                let result = Checker.checkWinningNumber(ticket, winNum);
                should.exist(result);

                // 2/5 white + powerball
                result.should.be.eql(LOTTERY_PRIZE.powerball[6]);
            });
        }
    });


    // 1/5 white + powerball
    describe('Prize: 1/5 + powerball', function() {

        for (let i = 1; i <= looptimes; i++) {
            let ticket = getRandomArr(whiteBalls, 1);
            ticket.push(redBall);
            it('Test ' + i + ':'+ ' Ticket ' + ticket.join('-') + ' should be 1/5 + powerball', function() {
                let result = Checker.checkWinningNumber(ticket, winNum);
                should.exist(result);

                // 1/5 white + powerball
                result.should.be.eql(LOTTERY_PRIZE.powerball[7]);
            });
        }
    });


    // 0/5 white + powerball
    describe('Prize: 0/5 + powerball', function() {

        for (let i = 1; i <= looptimes; i++) {
            let ticket = getRandomArr(whiteBalls, 0);
            ticket.push(redBall);
            it('Test ' + i + ':'+ ' Ticket ' + ticket.join('-') + ' should be 0/5 + powerball', function() {
                let result = Checker.checkWinningNumber(ticket, winNum);
                should.exist(result);

                // 0/5 white + powerball
                result.should.be.eql(LOTTERY_PRIZE.powerball[8]);
            });
        }
    });


    // 0/5 white
    describe('Prize: 0/5 + powerball', function() {

        for (let i = 1; i <= looptimes; i++) {
            let ticket = getRandomArr(whiteBalls, 0);
            ticket.push(getRandomNum(1, 26, redBall));
            it('Test ' + i + ':'+ ' Ticket ' + ticket.join('-') + ' should be fail', function() {
                let result = Checker.checkWinningNumber(ticket, winNum);
                should.not.exist(result);
            });
        }
    });
    
    // Finish test
});
