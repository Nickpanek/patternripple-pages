// RTP Test for Tacticool Patches Slot Machine
// Runs 10,000 spins to verify RTP is between 94-96%

const COLS = 5;
const ROWS = 3;
const BONUS_ID = 6;

const PAYOUTS = {
    0: [0, 0, 0.5, 2, 10],
    1: [0, 0, 0.5, 2, 10],
    2: [0, 0, 1, 4, 15],
    3: [0, 0, 1, 5, 20],
    4: [0, 0, 2, 10, 50],
    5: [0, 0, 5, 25, 200],
    6: [0, 0, 0, 5, 20]
};

const PAYLINES = [
    [[0,0],[0,1],[0,2],[0,3],[0,4]],
    [[1,0],[1,1],[1,2],[1,3],[1,4]],
    [[2,0],[2,1],[2,2],[2,3],[2,4]],
    [[0,0],[1,1],[2,2],[1,3],[0,4]],
    [[2,0],[1,1],[0,2],[1,3],[2,4]],
    [[0,0],[0,1],[1,2],[0,3],[0,4]],
    [[2,0],[2,1],[1,2],[2,3],[2,4]],
    [[1,0],[0,1],[0,2],[0,3],[1,4]],
    [[1,0],[2,1],[2,2],[2,3],[1,4]],
    [[0,0],[1,1],[1,2],[1,3],[0,4]],
    [[0,0],[1,1],[0,2],[1,3],[0,4]],
    [[2,0],[1,1],[2,2],[1,3],[2,4]],
    [[0,0],[1,1],[1,2],[1,3],[2,4]],
    [[2,0],[1,1],[1,2],[1,3],[0,4]],
    [[1,0],[0,1],[1,2],[2,3],[1,4]],
    [[1,0],[2,1],[1,2],[0,3],[1,4]],
    [[0,0],[0,1],[1,2],[2,3],[2,4]],
    [[2,0],[2,1],[1,2],[0,3],[0,4]],
    [[0,0],[1,1],[2,2],[1,3],[2,4]],
    [[2,0],[1,1],[0,2],[1,3],[0,4]]
];

function getRandomSymbol() {
    const rand = Math.random() * 100;
    if (rand < 18) return 0;
    if (rand < 36) return 1;
    if (rand < 54) return 2;
    if (rand < 70) return 3;
    if (rand < 84) return 4;
    if (rand < 92) return 5;
    return 6;
}

function fillGrid() {
    const grid = [];
    for (let r = 0; r < ROWS; r++) {
        const row = [];
        for (let c = 0; c < COLS; c++) {
            row.push(getRandomSymbol());
        }
        grid.push(row);
    }
    return grid;
}

function checkWins(grid, currentBet) {
    let foundWins = [];
    let bonusTriggered = false;
    let totalWin = 0;

    // Standard Payline Logic
    PAYLINES.forEach(line => {
        let symbols = line.map(pos => grid[pos[0]][pos[1]]);

        let firstNonWild = symbols.find(s => s !== 5 && s !== BONUS_ID);
        let matchTarget = (firstNonWild === undefined) ? 5 : firstNonWild;

        let count = 0;
        if (matchTarget !== BONUS_ID) {
            for (let s of symbols) {
                if (s === matchTarget || s === 5) count++;
                else break;
            }
        }

        if (count >= 3) {
            let multiplier = PAYOUTS[matchTarget][count-1];
            let winAmount = currentBet * multiplier * 0.108;

            if (winAmount > 0) {
                totalWin += winAmount;
                foundWins.push({
                    payout: winAmount,
                    coords: line.slice(0, count),
                    isBonus: false
                });
            }
        }
    });

    // Bonus Scatter Logic
    let scatterCoords = [];
    for(let c=0; c<3; c++) {
        for(let r=0; r<ROWS; r++) {
            if(grid[r][c] === BONUS_ID) {
                scatterCoords.push([r,c]);
            }
        }
    }

    const hasC0 = scatterCoords.some(p => p[1] === 0);
    const hasC1 = scatterCoords.some(p => p[1] === 1);
    const hasC2 = scatterCoords.some(p => p[1] === 2);

    if (hasC0 && hasC1 && hasC2) {
        bonusTriggered = true;
    }

    return { totalWin, bonusTriggered, hasWins: foundWins.length > 0 };
}

function simulateCascade(currentBet) {
    let totalWin = 0;
    let bonusTriggered = false;
    let cascades = 0;

    let grid = fillGrid();

    // Process cascades
    while (true) {
        const result = checkWins(grid, currentBet);

        if (!result.hasWins && !result.bonusTriggered) {
            break;
        }

        totalWin += result.totalWin;
        if (result.bonusTriggered) {
            bonusTriggered = true;
        }

        // Refill grid for cascade
        grid = fillGrid();
        cascades++;

        // Safety limit
        if (cascades > 100) break;
    }

    return { totalWin, bonusTriggered };
}

function runTest(numSpins = 10000, betAmount = 5) {
    let totalWagered = 0;
    let totalWon = 0;
    let bonusCount = 0;
    let winningSpins = 0;

    console.log(`Running ${numSpins.toLocaleString()} spins at $${betAmount} per spin...`);
    console.log('');

    for (let i = 0; i < numSpins; i++) {
        totalWagered += betAmount;

        const result = simulateCascade(betAmount);
        totalWon += result.totalWin;

        if (result.totalWin > 0) {
            winningSpins++;
        }

        if (result.bonusTriggered) {
            bonusCount++;
            // Simulate 3 free spins
            for (let fs = 0; fs < 3; fs++) {
                const freeResult = simulateCascade(betAmount);
                totalWon += freeResult.totalWin;
            }
        }

        // Progress indicator every 1000 spins
        if ((i + 1) % 1000 === 0) {
            const currentRTP = (totalWon / totalWagered) * 100;
            console.log(`Spin ${(i + 1).toLocaleString()}: RTP = ${currentRTP.toFixed(2)}%`);
        }
    }

    const rtp = (totalWon / totalWagered) * 100;
    const hitFrequency = (winningSpins / numSpins) * 100;
    const bonusFrequency = (bonusCount / numSpins) * 100;

    console.log('');
    console.log('='.repeat(50));
    console.log('RESULTS');
    console.log('='.repeat(50));
    console.log(`Total Spins:        ${numSpins.toLocaleString()}`);
    console.log(`Total Wagered:      $${totalWagered.toLocaleString()}`);
    console.log(`Total Won:          $${totalWon.toFixed(2)}`);
    console.log(`Net Result:         $${(totalWon - totalWagered).toFixed(2)}`);
    console.log('');
    console.log(`RTP:                ${rtp.toFixed(2)}%`);
    console.log(`Hit Frequency:      ${hitFrequency.toFixed(2)}%`);
    console.log(`Bonus Frequency:    ${bonusFrequency.toFixed(2)}%`);
    console.log(`Bonus Count:        ${bonusCount}`);
    console.log('');

    if (rtp >= 94 && rtp <= 96) {
        console.log('✅ RTP is within target range (94-96%)');
    } else if (rtp < 94) {
        console.log('❌ RTP is TOO LOW (target: 94-96%)');
    } else {
        console.log('❌ RTP is TOO HIGH (target: 94-96%)');
    }
    console.log('='.repeat(50));

    return { rtp, hitFrequency, bonusFrequency };
}

// Run the test
runTest(10000, 5);
