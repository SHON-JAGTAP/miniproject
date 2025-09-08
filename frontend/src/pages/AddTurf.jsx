import React, { useState, useEffect } from "react";



const AddTurf = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [turfs, setTurfs] = useState([]);

  // Load existing turfs from localStorage on mount
  useEffect(() => {
    const storedTurfs = JSON.parse(localStorage.getItem("turfList")) || [];
    setTurfs(storedTurfs);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleAddTurf = (e) => {
    e.preventDefault();

    const newTurf = {
      id: Date.now(),
      title,
      location,
      description,
      price,
      type,
      slug,
      img: image,
      
    };

    const updatedTurfs = [...turfs, newTurf];
    setTurfs(updatedTurfs);
    localStorage.setItem("turfList", JSON.stringify(updatedTurfs));

    // Reset form
    setTitle("");
    setLocation("");
    setDescription("");
    setPrice("");
    setType("");
    setSlug("");
    setImage("");
  };

  const handleDelete = (id) => {
    const updated = turfs.filter((turf) => turf.id !== id);
    setTurfs(updated);
    localStorage.setItem("turfList", JSON.stringify(updated));
  };

  return (
    <div className="flex justify-center pt-24 px-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Add New Turf
        </h2>

        <form
          onSubmit={handleAddTurf}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Price (e.g., ₹1000)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Type (e.g., Synthetic Turf)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Slug (e.g., cricket)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 text-center ">
              Upload Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="upload-image"
                className="hidden"
              />
              <label
                htmlFor="upload-image"
                className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Choose Image
              </label>
              {image && (
                <p className="mt-2 text-sm text-green-600 font-medium">
                  Image selected ✅
                </p>
              )}
            </div>
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-4 w-40 h-28 object-cover border rounded"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-black px-5 py-2 rounded hover:bg-green-700"
          >
            Add Turf
          </button>
        </form>

        <h3 className="text-xl mt-10 mb-4 font-semibold">Your Added Turfs</h3>
        {turfs.length === 0 ? (
          <p>No turfs added yet.</p>
        ) : (
          <ul className="space-y-3">
            {turfs.map((turf) => (
              <li
                key={turf.id}
                className="bg-gray-100 p-4 rounded flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  {turf.img && (
                    <img
                      src={turf.img}
                      alt={turf.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-bold">{turf.title}</p>
                    <p className="text-sm text-gray-600">{turf.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(turf.id)}
                  className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddTurf;
