let async = require('async');
const LOTTERY_PRIZE = require('./constants').LOTTERY_PRIZE;

/**
 * Check if your number won
 * 
 * @params {Number} ticketNumber Your ticket number
 * @params {Number} winNum Winning number
 * 
 * @returns {null|Array} Prize that you won     
 */
let checkWinningNumber = (ticketNumber, winNum) => {
    // Your red ball and white balls
    let redBall = ticketNumber[ticketNumber.length - 1];
    let whiteBalls = ticketNumber.slice(0, ticketNumber.length - 1);

    // Red ball and white balls of Winning number
    let result = {
        whiteBalls: winNum.slice(0, winNum.length - 1),
        redBall: winNum[winNum.length - 1]
    };

    // Check match red ball
    let redBallMatch = redBall === result.redBall ? true : false;
    // Check match white balls
    let whiteBallsMatch = result.whiteBalls.filter((numberPair) => {
        return whiteBalls.indexOf(numberPair) >= 0;
    });

    // Determine prize
    let prizeIndex = null;
    if (whiteBallsMatch.length === 5) {
        prizeIndex = redBallMatch ? 0 : 1;
    } else if (whiteBallsMatch.length === 4) {
        prizeIndex = redBallMatch ? 2 : 3;
    } else if (whiteBallsMatch.length === 3) {
        prizeIndex = redBallMatch ? 4 : 5;
    } else if (whiteBallsMatch.length === 2) {
        prizeIndex = redBallMatch ? 6 : null;
    } else if (whiteBallsMatch.length === 1) {
        prizeIndex = redBallMatch ? 7 : null;
    } else {
        prizeIndex = redBallMatch ? 8 : null;
    }

    return LOTTERY_PRIZE.powerball[prizeIndex];
};

/**
 * Check a list of ticket numbers
 */
let checkWinningNumbers = (ticketNumbers, winNum, done) => {
    let response = [];

    async.each(ticketNumbers, (ticketNumber, nextTicket) => {
        let checkResult = checkWinningNumber(ticketNumber, winNum);

        if (!checkResult) {
            return setImmediate(nextTicket);
        }

        response[ticketNumber.join('-')] = checkResult;
        setImmediate(nextTicket);
    }, () => {
        done(null, response);
    });
};

module.exports = {
    checkWinningNumber: checkWinningNumber,
    checkWinningNumbers: checkWinningNumbers
};
