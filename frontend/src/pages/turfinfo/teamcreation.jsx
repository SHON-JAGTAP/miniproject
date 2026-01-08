import React, { useState, useEffect } from "react";

function TeamCreationPage() {
  const [availablePlayers, setAvailablePlayers] = useState(initialPlayersData);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/players');
      if (response.ok) {
        const players = await response.json();
        setAvailablePlayers(players.length > 0 ? players : initialPlayersData);
      } else {
        setAvailablePlayers(initialPlayersData);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
      setAvailablePlayers(initialPlayersData);
    }
  };

  const handleAddPlayer = async (player) => {
    try {
      const response = await fetch('http://localhost:5000/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player)
      });
      if (response.ok) {
        fetchPlayers();
      }
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return <TeamCreation availablePlayers={availablePlayers} onAddPlayer={handleAddPlayer} fetchPlayers={fetchPlayers} />;
}

const initialPlayersData = [
  { id: 1, name: "Alice", skill: 7, position: "Forward", age: 25, experience: 3, credits: 50 },
  { id: 2, name: "Bob", skill: 6, position: "Midfielder", age: 28, experience: 5, credits: 60 },
  { id: 3, name: "Charlie", skill: 8, position: "Defender", age: 30, experience: 7, credits: 80 },
  { id: 4, name: "Diana", skill: 5, position: "Goalkeeper", age: 22, experience: 2, credits: 40 },
  { id: 5, name: "Ethan", skill: 7, position: "Forward", age: 26, experience: 4, credits: 55 },
  { id: 6, name: "Fiona", skill: 6, position: "Midfielder", age: 24, experience: 3, credits: 45 },
];

function TeamCreation({ availablePlayers: propPlayers, onAddPlayer, fetchPlayers }) {
  const [availablePlayers, setAvailablePlayers] = useState(propPlayers || initialPlayersData);

  useEffect(() => {
    if (propPlayers && propPlayers.length > 0) {
      setAvailablePlayers(propPlayers);
    }
  }, [propPlayers]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ 
    name: "", 
    skill: 5, 
    position: "Forward", 
    age: 18, 
    experience: 0, 
    credits: 30 
  });
  const [teamCredits, setTeamCredits] = useState({ teamA: 200, teamB: 200 });

  // Add new player
  const handleAddPlayer = async (e) => {
    e.preventDefault();
    if (newPlayer.name.trim()) {
      const player = {
        name: newPlayer.name.trim(),
        skill: parseInt(newPlayer.skill),
        position: newPlayer.position,
        age: parseInt(newPlayer.age),
        experience: parseInt(newPlayer.experience),
        credits: parseInt(newPlayer.credits)
      };
      await onAddPlayer(player);
      setNewPlayer({ name: "", skill: 5, position: "Forward", age: 18, experience: 0, credits: 30 });
      setShowAddForm(false);
    }
  };

  // Move player from available list to a team
  const addToTeam = (player, teamSetter, team, teamType) => {
    const currentCredits = teamType === 'A' ? teamCredits.teamA : teamCredits.teamB;
    if (currentCredits >= player.credits) {
      setAvailablePlayers(availablePlayers.filter(p => p.id !== player.id));
      teamSetter([...team, player]);
      setTeamCredits(prev => ({
        ...prev,
        [teamType === 'A' ? 'teamA' : 'teamB']: currentCredits - player.credits
      }));
    } else {
      alert(`Not enough credits! Need ${player.credits}, have ${currentCredits}`);
    }
  };

  // Remove player from a team and add back to available list
  const removeFromTeam = (player, teamSetter, team, teamType) => {
    teamSetter(team.filter(p => p.id !== player.id));
    setAvailablePlayers([...availablePlayers, player]);
    setTeamCredits(prev => ({
      ...prev,
      [teamType === 'A' ? 'teamA' : 'teamB']: prev[teamType === 'A' ? 'teamA' : 'teamB'] + player.credits
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Team Creation</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Players */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Players</h2>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-black text-black px-3 py-1 rounded hover:bg-gray-800"
            >
              Add Player
            </button>
          </div>
          
          {/* Add Player Form */}
          {showAddForm && (
            <form onSubmit={handleAddPlayer} className="mb-4 p-3 bg-gray-50 rounded">
              <input
                type="text"
                placeholder="Player Name"
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="number"
                  min="16"
                  max="45"
                  value={newPlayer.age}
                  onChange={(e) => setNewPlayer({...newPlayer, age: e.target.value})}
                  className="p-2 border rounded"
                  placeholder="Age"
                />
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={newPlayer.experience}
                  onChange={(e) => setNewPlayer({...newPlayer, experience: e.target.value})}
                  className="p-2 border rounded"
                  placeholder="Experience (years)"
                />
              </div>
              <select
                value={newPlayer.position}
                onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
                className="w-full p-2 mb-2 border rounded"
              >
                <option value="Forward">Forward</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Defender">Defender</option>
                <option value="Goalkeeper">Goalkeeper</option>
              </select>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newPlayer.skill}
                  onChange={(e) => setNewPlayer({...newPlayer, skill: e.target.value})}
                  className="p-2 border rounded"
                  placeholder="Skill (1-10)"
                />
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={newPlayer.credits}
                  onChange={(e) => setNewPlayer({...newPlayer, credits: e.target.value})}
                  className="p-2 border rounded"
                  placeholder="Credits"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-black text-black px-3 py-1 rounded hover:bg-gray-800">Add</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800">Cancel</button>
              </div>
            </form>
          )}
          
          {availablePlayers.length === 0 && <p className="text-gray-500">No more players available</p>}
          <div className="space-y-2">
            {availablePlayers.map((player) => (
              <div key={player.id} className="p-2 border rounded bg-gray-50">
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-gray-600">
                  {player.position} | Age: {player.age} | Exp: {player.experience}y
                </div>
                <div className="text-sm text-gray-600">
                  Skill: {player.skill}/10 | Credits: {player.credits}
                </div>
                <div className="flex gap-1 mt-2">
                  <button 
                    onClick={() => addToTeam(player, setTeamA, teamA, 'A')}
                    className="bg-black text-black px-2 py-1 text-xs rounded hover:bg-gray-800"
                    disabled={teamCredits.teamA < player.credits}
                  >
                    Team A
                  </button>
                  <button 
                    onClick={() => addToTeam(player, setTeamB, teamB, 'B')}
                    className="bg-black text-black px-2 py-1 text-xs rounded hover:bg-gray-800"
                    disabled={teamCredits.teamB < player.credits}
                  >
                    Team B
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team A */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Team A ({teamA.length})</h2>
          <div className="text-sm text-gray-600 mb-4">Credits: {teamCredits.teamA}/200</div>
          {teamA.length === 0 && <p className="text-gray-500">No players yet</p>}
          <div className="space-y-2">
            {teamA.map((player) => (
              <div key={player.id} className="p-2 border rounded bg-red-50">
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-gray-600">
                  {player.position} | Age: {player.age} | Skill: {player.skill}
                </div>
                <div className="text-sm text-gray-600">Credits: {player.credits}</div>
                <button 
                  onClick={() => removeFromTeam(player, setTeamA, teamA, 'A')}
                  className="bg-black text-black px-2 py-1 text-xs rounded mt-1 hover:bg-gray-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Team B */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Team B ({teamB.length})</h2>
          <div className="text-sm text-gray-600 mb-4">Credits: {teamCredits.teamB}/200</div>
          {teamB.length === 0 && <p className="text-gray-500">No players yet</p>}
          <div className="space-y-2">
            {teamB.map((player) => (
              <div key={player.id} className="p-2 border rounded bg-blue-50">
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-gray-600">
                  {player.position} | Age: {player.age} | Skill: {player.skill}
                </div>
                <div className="text-sm text-gray-600">Credits: {player.credits}</div>
                <button 
                  onClick={() => removeFromTeam(player, setTeamB, teamB, 'B')}
                  className="bg-black text-black px-2 py-1 text-xs rounded mt-1 hover:bg-gray-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-6 text-center space-x-4">
        <button 
          onClick={autoBalanceTeams}
          className="bg-purple-600 text-black px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold"
        >
          🤖 Auto Balance Teams
        </button>
        <button 
          onClick={saveTeams}
          className="bg-green-600 text-black px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
          disabled={teamA.length === 0 && teamB.length === 0}
        >
          Save Teams for AI Training
        </button>
      </div>
    </div>
  );

  async function autoBalanceTeams() {
    try {
      const response = await fetch('http://localhost:5000/api/balance-teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        const balanced = data.balanced_teams;
        
        // Clear current teams
        setTeamA([]);
        setTeamB([]);
        setTeamCredits({ teamA: 200, teamB: 200 });
        
        // Set balanced teams
        setTeamA(balanced.team_a.players);
        setTeamB(balanced.team_b.players);
        setTeamCredits({
          teamA: balanced.team_a.remaining_credits,
          teamB: balanced.team_b.remaining_credits
        });
        
        // Remove assigned players from available list
        const assignedPlayerIds = [...balanced.team_a.players, ...balanced.team_b.players].map(p => p.id);
        setAvailablePlayers(availablePlayers.filter(p => !assignedPlayerIds.includes(p.id)));
        
        alert(`Teams auto-balanced! Balance Score: ${balanced.balance_score.toFixed(2)}`);
      } else {
        alert('Error balancing teams');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to AI balancer');
    }
  }

  async function saveTeams() {
    try {
      const teamData = {
        teamA: {
          team_name: 'Team A',
          players: teamA,
          total_credits: 200 - teamCredits.teamA,
          performance_data: calculatePerformanceData(teamA)
        },
        teamB: {
          team_name: 'Team B', 
          players: teamB,
          total_credits: 200 - teamCredits.teamB,
          performance_data: calculatePerformanceData(teamB)
        }
      };

      await Promise.all([
        fetch('http://localhost:5000/api/teams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(teamData.teamA)
        }),
        fetch('http://localhost:5000/api/teams', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(teamData.teamB)
        })
      ]);

      alert('Teams saved successfully for AI training!');
    } catch (error) {
      console.error('Error saving teams:', error);
      alert('Error saving teams');
    }
  }

  function calculatePerformanceData(team) {
    const avgSkill = team.reduce((sum, p) => sum + p.skill, 0) / team.length || 0;
    const avgAge = team.reduce((sum, p) => sum + p.age, 0) / team.length || 0;
    const avgExperience = team.reduce((sum, p) => sum + p.experience, 0) / team.length || 0;
    const totalCredits = team.reduce((sum, p) => sum + p.credits, 0);
    
    return {
      avg_skill: avgSkill,
      avg_age: avgAge,
      avg_experience: avgExperience,
      total_credits: totalCredits,
      team_size: team.length,
      position_distribution: getPositionDistribution(team)
    };
  }

  function getPositionDistribution(team) {
    return team.reduce((dist, player) => {
      dist[player.position] = (dist[player.position] || 0) + 1;
      return dist;
    }, {});
  }
}

export default TeamCreationPage;