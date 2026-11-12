
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_BASE_URL from "../api";
import "../styles/MyHostels.css";

function MyHostels() {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingHostel, setEditingHostel] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const initialFormData = {
        name: "",
        location: "",
        price: "",
        gender: "Mixed",
        rooms: "Single",
        availability: "",
        distance: "",
        amenities: "",
        description: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        getMyHostels();
    }, []);

    async function getMyHostels() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/hostels/my-hostels/`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load hostels.");
            }

            const data = await response.json();
            setHostels(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    }

    function handleAdd() {
        setEditingHostel(null);
        setFormData(initialFormData);
        setCoverImage(null);
        setShowForm(true);
    }

    function handleEdit(hostel) {
        setEditingHostel(hostel);

        setFormData({
            name: hostel.name,
            location: hostel.location,
            price: hostel.price,
            gender: hostel.gender,
            rooms: hostel.rooms,
            availability: hostel.availability,
            distance: hostel.distance || "",
            amenities: (hostel.amenities || []).join(", "),
            description: hostel.description || ""
        });

        setCoverImage(null);
        setShowForm(true);
    }

    function handleCancel() {
        setShowForm(false);
        setEditingHostel(null);
        setFormData(initialFormData);
        setCoverImage(null);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const hostelData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key === "amenities") {
                const amenitiesList = value
                    .split(",")
                    .map(item => item.trim())
                    .filter(item => item !== "");

                hostelData.append(key, JSON.stringify(amenitiesList));
            } else {
                hostelData.append(key, value);
            }
        });

        if (coverImage) {
            hostelData.append("cover_image", coverImage);
        }

        const url = editingHostel
            ? `${API_BASE_URL}/api/hostels/${editingHostel.id}/manage/`
            : `${API_BASE_URL}/api/hostels/create/`;

        try {
            setSaving(true);

            const response = await fetch(url, {
                method: editingHostel ? "PATCH" : "POST",
                headers: {
                    Authorization: `Token ${token}`
                },
                body: hostelData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(data));
            }

            toast.success(
                editingHostel
                    ? "Hostel updated successfully."
                    : "Hostel added successfully."
            );

            handleCancel();
            await getMyHostels();

        } catch (error) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(hostelId) {
        if (!window.confirm("Are you sure you want to delete this hostel?")) {
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/hostels/${hostelId}/manage/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete hostel.");
            }

            toast.success("Hostel deleted successfully.");
            await getMyHostels();

        } catch (error) {
            toast.error(error.message);
        }
    }

    if (loading) {
        return <p className="loading-message">Loading your hostels...</p>;
    }

    return (
        <div className="my-hostels-page">
            <div className="my-hostels-header">
                <div>
                    <h1>My Hostels</h1>
                    <p>Manage your hostel listings.</p>
                </div>

                <button onClick={handleAdd}>
                    + Add New Hostel
                </button>
            </div>

            {showForm && (
                <form className="hostel-form" onSubmit={handleSubmit}>
                    <h2>
                        {editingHostel ? "Edit Hostel" : "Add New Hostel"}
                    </h2>

                    <label>Hostel Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                    <label>Monthly Price (Ksh)</label>
                    <input
                        type="number"
                        name="price"
                        min="0.01"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />

                    <label>Gender Policy</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Mixed">Mixed</option>
                    </select>

                    <label>Room Type</label>
                    <select
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                    >
                        <option value="Single">Single</option>
                        <option value="Shared">Shared</option>
                        <option value="Both">Single and Shared</option>
                    </select>

                    <label>Available Rooms</label>
                    <input
                        type="number"
                        name="availability"
                        min="0"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                    />

                    <label>Distance from Campus</label>
                    <input
                        type="text"
                        name="distance"
                        value={formData.distance}
                        onChange={handleChange}
                    />

                    <label>Amenities</label>
                    <input
                        type="text"
                        name="amenities"
                        placeholder="WiFi, Water, Security"
                        value={formData.amenities}
                        onChange={handleChange}
                    />

                    <label>Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <label>Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={event =>
                            setCoverImage(event.target.files[0] || null)
                        }
                    />

                    <div className="form-actions">
                        <button type="submit" disabled={saving}>
                            {saving
                                ? "Saving..."
                                : editingHostel
                                    ? "Update Hostel"
                                    : "Save Hostel"}
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {hostels.length === 0 ? (
                <p className="empty-message">
                    You have not listed any hostels yet.
                </p>
            ) : (
                <div className="my-hostels-list">
                    {hostels.map(hostel => (
                        <div className="my-hostel-card" key={hostel.id}>
                            {hostel.cover_image && (
                                <img
                                    src={
                                        hostel.cover_image.startsWith("http")
                                            ? hostel.cover_image
                                            : `${API_BASE_URL}${hostel.cover_image}`
                                    }
                                    alt={hostel.name}
                                    className="hostel-card-image"
                                />
                            )}

                            <div className="hostel-card-content">
                                <h2>{hostel.name}</h2>
                                <p>Location: {hostel.location}</p>
                                <p>Price: Ksh {hostel.price}</p>
                                <p>Available rooms: {hostel.availability}</p>
                                <p>Gender: {hostel.gender}</p>
                                <p>Room type: {hostel.rooms}</p>

                                <div className="hostel-actions">
                                    <button onClick={() => handleEdit(hostel)}>
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(hostel.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyHostels;
