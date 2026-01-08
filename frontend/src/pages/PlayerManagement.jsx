import React, { useState, useEffect } from 'react';

const PlayerManagement = () => {
  const [players, setPlayers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    age: 18,
    experience: 0,
    position: 'Forward',
    skill: 5,
    credits: 30
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/players');
      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlayer)
      });
      if (response.ok) {
        fetchPlayers();
        setNewPlayer({ name: '', age: 18, experience: 0, position: 'Forward', skill: 5, credits: 30 });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const deletePlayer = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/players/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchPlayers();
      }
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Player Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Player
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Player Name"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Age"
              min="16"
              max="45"
              value={newPlayer.age}
              onChange={(e) => setNewPlayer({...newPlayer, age: parseInt(e.target.value)})}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Experience (years)"
              min="0"
              max="20"
              value={newPlayer.experience}
              onChange={(e) => setNewPlayer({...newPlayer, experience: parseInt(e.target.value)})}
              className="p-2 border rounded"
            />
            <select
              value={newPlayer.position}
              onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
              className="p-2 border rounded"
            >
              <option value="Forward">Forward</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
            <input
              type="number"
              placeholder="Skill (1-10)"
              min="1"
              max="10"
              value={newPlayer.skill}
              onChange={(e) => setNewPlayer({...newPlayer, skill: parseInt(e.target.value)})}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Credits"
              min="10"
              max="100"
              value={newPlayer.credits}
              onChange={(e) => setNewPlayer({...newPlayer, credits: parseInt(e.target.value)})}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add Player
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player) => (
          <div key={player.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{player.name}</h3>
            <p className="text-gray-600">Position: {player.position}</p>
            <p className="text-gray-600">Age: {player.age} | Experience: {player.experience}y</p>
            <p className="text-gray-600">Skill: {player.skill}/10 | Credits: {player.credits}</p>
            <button 
              onClick={() => deletePlayer(player.id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerManagement;