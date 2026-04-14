import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AddTurf = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [turfs, setTurfs] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load existing turfs from backend on mount
  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/turfs`);
      setTurfs(response.data);
    } catch (error) {
      setMessage("Error fetching turfs. Please try again.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5MB");
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      setMessage("Please select a valid image file");
      return;
    }
    
    setImage(file);
    setMessage("");
  };

  const handleAddTurf = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!image) {
      setMessage("Please select an image");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("slug", slug);
    formData.append("image", image);

    try {
      await axios.post(`${API_URL}/api/turfs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      setMessage("Turf added successfully!");
      fetchTurfs();

      setTitle("");
      setLocation("");
      setDescription("");
      setPrice("");
      setType("");
      setSlug("");
      setImage(null);
    } catch (error) {
      setMessage("Error adding turf. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this turf?")) {
      return;
    }
    
    try {
      await axios.delete(`${API_URL}/api/turfs/${id}`);
      setMessage("Turf deleted successfully!");
      fetchTurfs();
    } catch (error) {
      setMessage("Error deleting turf. Please try again.");
    }
  };

  return (
    <div className="flex justify-center pt-24 px-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Add New Turf
        </h2>
        
        {message && (
          <div className={`p-3 mb-4 rounded ${message.includes('Error') || message.includes('must') || message.includes('Please select') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

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
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-4 w-40 h-28 object-cover border rounded"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-black px-5 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Add Turf"}
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
                      src={`${API_URL}${turf.img}`}
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
