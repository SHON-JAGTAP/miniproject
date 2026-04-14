const Player = require('../models/playerModel');

exports.balanceTeamsSimple = async (req, res) => {
    try {
        // Fetch all players
        const players = await Player.getAll();
        
        if (players.length < 2) {
            return res.status(400).json({ error: 'Need at least 2 players to create teams' });
        }
        
        // Sort players by total value (skill + credits)
        const playersSorted = players.sort((a, b) => (b.skill + b.credits) - (a.skill + a.credits));
        
        const teamA = [];
        const teamB = [];
        let creditsA = 200;
        let creditsB = 200;
        
        // Distribute players alternately, checking credit limits
        for (let i = 0; i < playersSorted.length; i++) {
            const player = playersSorted[i];
            const playerCost = player.credits;
            
            // Try to add to team with more credits available
            if (creditsA >= creditsB) {
                if (creditsA >= playerCost) {
                    teamA.push(player);
                    creditsA -= playerCost;
                } else if (creditsB >= playerCost) {
                    teamB.push(player);
                    creditsB -= playerCost;
                }
            } else {
                if (creditsB >= playerCost) {
                    teamB.push(player);
                    creditsB -= playerCost;
                } else if (creditsA >= playerCost) {
                    teamA.push(player);
                    creditsA -= playerCost;
                }
            }
        }
        
        // Calculate team stats
        const teamAStats = calculateTeamStats(teamA);
        const teamBStats = calculateTeamStats(teamB);
        const balanceScore = calculateBalanceScore(teamAStats, teamBStats);
        
        const result = {
            team_a: {
                players: teamA,
                remaining_credits: creditsA,
                stats: teamAStats
            },
            team_b: {
                players: teamB,
                remaining_credits: creditsB,
                stats: teamBStats
            },
            balance_score: balanceScore
        };
        
        res.json({
            message: 'Teams balanced successfully',
            balanced_teams: result
        });
        
    } catch (error) {
        console.error('Balance error:', error);
        res.status(500).json({ error: error.message });
    }
};

function calculateTeamStats(team) {
    if (!team || team.length === 0) {
        return { avg_skill: 0, avg_age: 0, total_credits: 0, player_count: 0 };
    }
    
    const avgSkill = team.reduce((sum, p) => sum + p.skill, 0) / team.length;
    const avgAge = team.reduce((sum, p) => sum + p.age, 0) / team.length;
    const totalCredits = team.reduce((sum, p) => sum + p.credits, 0);
    
    return {
        avg_skill: Math.round(avgSkill * 100) / 100,
        avg_age: Math.round(avgAge * 100) / 100,
        total_credits: totalCredits,
        player_count: team.length
    };
}

function calculateBalanceScore(statsA, statsB) {
    if (statsA.player_count === 0 || statsB.player_count === 0) {
        return 0;
    }
    
    const skillDiff = Math.abs(statsA.avg_skill - statsB.avg_skill);
    const creditDiff = Math.abs(statsA.total_credits - statsB.total_credits);
    const playerDiff = Math.abs(statsA.player_count - statsB.player_count);
    
    // Normalize differences (lower is better)
    const skillBalance = Math.max(0, 1 - skillDiff / 10);
    const creditBalance = Math.max(0, 1 - creditDiff / 200);
    const playerBalance = Math.max(0, 1 - playerDiff / 10);
    
    return Math.round(((skillBalance + creditBalance + playerBalance) / 3) * 1000) / 1000;
}