import React, { useState } from "react";

function AddPlayerForm({ onAdd }) {
  const [player, setPlayer] = useState({
    name: "",
    skill: "",
    position: "",
    credit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer({ ...player, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!player.name || !player.skill || !player.position || !player.credit) {
      alert("Please fill all fields");
      return;
    }
    // Convert skill and credit to numbers
    const newPlayer = { ...player, skill: Number(player.skill), credit: Number(player.credit) };
    onAdd(newPlayer);
    setPlayer({ name: "", skill: "", position: "", credit: "" }); // reset form
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        name="name"
        placeholder="Player Name"
        value={player.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="skill"
        placeholder="Skill (1-10)"
        value={player.skill}
        min="1"
        max="10"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="position"
        placeholder="Position (Forward, Midfielder etc.)"
        value={player.position}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="credit"
        placeholder="Credit"
        value={player.credit}
        min="0"
        onChange={handleChange}
        required
      />
      <button type="submit" style={{ marginLeft: "1rem" }}>Add Player</button>
    </form>
  );
}

export default AddPlayerForm;
