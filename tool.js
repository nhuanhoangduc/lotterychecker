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
    let redBall = ticketNumber.slice(ticketNumber.length - 1);
    let whiteBalls = ticketNumber.slice(0, ticketNumber.length - 1);

    // Red ball and white balls of Winning number
    let result = {
        whiteBalls: winNum.slice(0, winNum.length - 1),
        redBall: winNum.slice(winNum.length - 1)
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
        prizeIndex = redBall ? 0 : 1;
    } else if (whiteBallsMatch.length === 4) {
        prizeIndex = redBall ? 2 : 3;
    } else if (whiteBallsMatch.length === 3) {
        prizeIndex = redBall ? 4 : 5;
    } else if (whiteBallsMatch.length === 2) {
        prizeIndex = redBall ? 6 : null;
    } else if (whiteBallsMatch.length === 1) {
        prizeIndex = redBall ? 7 : null;
    } else {
        prizeIndex = redBall ? 8 : null;
    }

    if (!prizeIndex) {
        return null;
    } else {
        return LOTTERY_PRIZE.powerball[prizeIndex];
    }
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
