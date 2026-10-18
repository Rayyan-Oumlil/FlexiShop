import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function AccountManagement() {
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

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
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Account Management</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Manage your account information, update your profile, change your password, or delete your account.
      </p>

      {/* Update Profile */}
      <div className="bg-card border border-border rounded-lg p-8 mb-8">
        <h2 className="text-xl font-bold mb-6">Update Profile</h2>
        {profileMessage && <div className="text-green-600 font-semibold mb-4">{profileMessage}</div>}
        {profileError && <div className="text-destructive font-semibold mb-4">{profileError}</div>}
        <form className="space-y-4" onSubmit={handleProfileUpdate}>
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              type="text"
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={profileEmail}
              onChange={e => setProfileEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={profileLoading}>
            {profileLoading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-card border border-border rounded-lg p-8 mb-8">
        <h2 className="text-xl font-bold mb-6">Change Password</h2>
        {passwordMessage && <div className="text-green-600 font-semibold mb-4">{passwordMessage}</div>}
        {passwordError && <div className="text-destructive font-semibold mb-4">{passwordError}</div>}
        <form className="space-y-4" onSubmit={handlePasswordChange}>
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={passwordLoading}>
            {passwordLoading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </div>

      {/* Delete Account */}
      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-xl font-bold mb-6">Delete Account</h2>
        {deleteMessage && <div className="text-green-600 font-semibold mb-4">{deleteMessage}</div>}
        {deleteError && <div className="text-destructive font-semibold mb-4">{deleteError}</div>}
        {deleteConfirm ? (
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">Warning: This action is irreversible. All your data will be permanently deleted.</p>
            <div className="flex gap-4">
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Confirm Delete My Account"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(false)}
                disabled={deleteLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="destructive"
            onClick={() => setDeleteConfirm(true)}
          >
            Delete My Account
          </Button>
        )}
      </div>
    </div>
  );
}
