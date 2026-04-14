const { spawn } = require('child_process');
const path = require('path');

exports.balanceTeams = async (req, res) => {
    try {
        const pythonScript = path.join(__dirname, '../../ai_model/team_balancer.py');
        console.log('Python script path:', pythonScript);
        
        const python = spawn('python', [pythonScript], {
            cwd: path.join(__dirname, '../../ai_model')
        });
        
        let result = '';
        let error = '';
        
        python.stdout.on('data', (data) => {
            result += data.toString();
        });
        
        python.stderr.on('data', (data) => {
            error += data.toString();
            console.log('Python stderr:', data.toString());
        });
        
        python.on('close', (code) => {
            console.log('Python exit code:', code);
            console.log('Python result:', result);
            console.log('Python error:', error);
            
            if (code === 0 && result.trim()) {
                try {
                    const balancedTeams = JSON.parse(result.trim());
                    res.json({ 
                        message: 'Teams balanced successfully',
                        balanced_teams: balancedTeams
                    });
                } catch (parseError) {
                    console.log('Parse error:', parseError);
                    res.status(500).json({ 
                        error: 'Failed to parse team data', 
                        details: result,
                        parseError: parseError.message 
                    });
                }
            } else {
                res.status(500).json({ 
                    error: 'Failed to balance teams', 
                    details: error || 'No output from Python script',
                    exitCode: code
                });
            }
        });
        
        python.on('error', (err) => {
            console.log('Python spawn error:', err);
            res.status(500).json({ error: 'Failed to start Python script', details: err.message });
        });
        
    } catch (error) {
        console.log('Controller error:', error);
        res.status(500).json({ error: error.message });
    }
};