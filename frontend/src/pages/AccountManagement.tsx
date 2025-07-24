import React, { useState } from "react";

export default function AccountManagement() {
  // Profile update states
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Delete account states
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Fetch user info on mount (optional, for pre-filling profile)
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const API_URL = import.meta.env.VITE_API_URL || "";
    fetch(`${API_URL}/api/users/me`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProfileName(data.name || "");
        setProfileEmail(data.email || "");
      });
  }, []);

  // Profile update handler
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage(null);
    setProfileError(null);
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL || "";
    try {
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: profileName, email: profileEmail })
      });
      if (res.ok) {
        setProfileMessage("Profile updated!");
      } else {
        const data = await res.json();
        setProfileError(data.detail || "Error updating profile.");
      }
    } catch {
      setProfileError("Network error.");
    } finally {
      setProfileLoading(false);
      setTimeout(() => setProfileMessage(null), 2000);
    }
  };

  // Password change handler
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage(null);
    setPasswordError(null);
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL || "";
    try {
      const res = await fetch(`${API_URL}/api/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ old_password: currentPassword, new_password: newPassword })
      });
      if (res.ok) {
        setPasswordMessage("Password changed!");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        const data = await res.json();
        setPasswordError(data.detail || "Error changing password.");
      }
    } catch {
      setPasswordError("Network error.");
    } finally {
      setPasswordLoading(false);
      setTimeout(() => setPasswordMessage(null), 2000);
    }
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setDeleteMessage(null);
    setDeleteError(null);
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL || "";
    try {
      const res = await fetch(`${API_URL}/api/users/delete`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        setDeleteMessage("Your account has been deleted. You will be logged out.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        const data = await res.json();
        setDeleteError(data.detail || "Error deleting account.");
      }
    } catch {
      setDeleteError("Network error.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6">Account Management</h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage your account information, update your profile, change your password, or delete your account.
      </p>
      {/* Update Profile */}
      <div className="bg-white rounded-xl shadow p-8 mb-10">
        <h2 className="text-xl font-bold text-pink-500 mb-4">Update Profile</h2>
        {profileMessage && <div className="text-green-600 font-semibold mb-4">{profileMessage}</div>}
        {profileError && <div className="text-red-600 font-semibold mb-4">{profileError}</div>}
        <form className="space-y-4" onSubmit={handleProfileUpdate}>
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={profileName} onChange={e => setProfileName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} required />
          </div>
          <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-2 rounded-full transition" disabled={profileLoading}>{profileLoading ? "Updating..." : "Update"}</button>
        </form>
      </div>
      {/* Change Password */}
      <div className="bg-white rounded-xl shadow p-8 mb-10">
        <h2 className="text-xl font-bold text-pink-500 mb-4">Change Password</h2>
        {passwordMessage && <div className="text-green-600 font-semibold mb-4">{passwordMessage}</div>}
        {passwordError && <div className="text-red-600 font-semibold mb-4">{passwordError}</div>}
        <form className="space-y-4" onSubmit={handlePasswordChange}>
          <div>
            <label className="block text-gray-700 mb-1">Current Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          </div>
          <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-2 rounded-full transition" disabled={passwordLoading}>{passwordLoading ? "Changing..." : "Change Password"}</button>
        </form>
      </div>
      {/* Delete Account */}
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-bold text-pink-500 mb-4">Delete Account</h2>
        {deleteMessage && <div className="text-green-600 font-semibold mb-4">{deleteMessage}</div>}
        {deleteError && <div className="text-red-600 font-semibold mb-4">{deleteError}</div>}
        {deleteConfirm ? (
          <div className="space-y-4">
            <p className="text-gray-700 mb-4">Warning: This action is irreversible. All your data will be permanently deleted.</p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-2 rounded-full transition"
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Confirm Delete My Account"}
            </button>
            <button
              className="ml-4 px-8 py-2 rounded border"
              onClick={() => setDeleteConfirm(false)}
              disabled={deleteLoading}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-2 rounded-full transition"
            onClick={() => setDeleteConfirm(true)}
          >
            Delete My Account
          </button>
        )}
      </div>
    </div>
  );
} 