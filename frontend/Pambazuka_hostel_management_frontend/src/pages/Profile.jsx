import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/Profile.css";

function Profile() {
    const [profile, setProfile] = useState({
        user_id: "",
        username: "",
        email: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function getProfile() {
            const token = localStorage.getItem("authToken");

            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/hostels/profile/",
                    {
                        headers: {
                            "Authorization": `Token ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Could not load profile.");
                }

                setProfile(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getProfile();
    }, []);

    function handleChange(e) {
        setProfile({ ...profile, email: e.target.value });
    }

    async function handleSubmit(e) {e.preventDefault(); setSaving(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/hostels/profile/",
                {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json", "Authorization": `Token ${localStorage.getItem("authToken")}`},
                    body: JSON.stringify({ email: profile.email })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Profile update failed.");
            }

            setProfile(data);
            toast.success("Profile updated successfully.");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <main className="profile-page">
            <div className="profile-card">
                <h1>My Profile</h1>
                <p>View and update your account information.</p>

                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" value={profile.username} readOnly/>

                    <label>Email Address</label>
                    <input type="email" value={profile.email} onChange={handleChange} required/>
                    <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
                </form>
            </div>
        </main>
    );
}

export default Profile;
