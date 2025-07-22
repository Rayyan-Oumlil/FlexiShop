import React, { useState } from "react";

export default function AccountManagement() {
  // States for password change
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // State for delete
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Change password handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    setPasswordError(null);
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
      });
      if (res.ok) {
        setPasswordMessage("Password updated successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        setPasswordError(data.detail || "Error updating password.");
      }
    } catch (err) {
      setPasswordError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    setDeleteMessage(null);
    setDeleteError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/users/delete", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (res.ok) {
        setDeleteMessage("Account deleted. You will be logged out.");
        // Optionally, clear token and redirect
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        const data = await res.json();
        setDeleteError(data.detail || "Error deleting account.");
      }
    } catch (err) {
      setDeleteError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-pink-500">Account Management</h1>
      {/* Change Password */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form className="space-y-4" onSubmit={handleChangePassword}>
          <div>
            <label className="block text-gray-700 mb-1">Old Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </div>
          {passwordMessage && <p className="text-green-600">{passwordMessage}</p>}
          {passwordError && <p className="text-red-600">{passwordError}</p>}
          <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded" disabled={loading}>Change Password</button>
        </form>
      </section>
      {/* Delete Account */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
        {!deleteConfirm ? (
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded" onClick={() => setDeleteConfirm(true)} disabled={loading}>Delete my account</button>
        ) : (
          <div className="space-y-2">
            <p className="text-red-600">Are you sure? This action is irreversible.</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded" onClick={handleDeleteAccount} disabled={loading}>Yes, delete my account</button>
            <button className="ml-4 px-6 py-2 rounded border" onClick={() => setDeleteConfirm(false)} disabled={loading}>Cancel</button>
          </div>
        )}
        {deleteMessage && <p className="text-green-600 mt-2">{deleteMessage}</p>}
        {deleteError && <p className="text-red-600 mt-2">{deleteError}</p>}
      </section>
    </div>
  );
} 