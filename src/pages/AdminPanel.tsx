import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  Check,
  X,
  Eye,
  LogOut,
  Users,
  Mail,
} from "lucide-react";
import { RegistrationService } from "../lib/registrationService";
import { Registration } from "../lib/supabase";

interface Participant extends Registration {
  status?: "pending" | "approved" | "rejected";
}

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Participant[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  // Load data from Supabase
  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const registrations = await RegistrationService.getAllRegistrations();
        const participantsWithStatus: Participant[] = registrations.map(
          (reg) => ({
            ...reg,
            status: (reg.payment_verified ? "approved" : "pending") as
              | "pending"
              | "approved"
              | "rejected",
          })
        );
        setParticipants(participantsWithStatus);
        setFilteredParticipants(participantsWithStatus);
      } catch (error) {
        console.error("Error loading participants:", error);
        // Fallback to empty array on error
        setParticipants([]);
        setFilteredParticipants([]);
      }
    };

    loadParticipants();
  }, []);

  useEffect(() => {
    let filtered = participants;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.college.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    setFilteredParticipants(filtered);
  }, [participants, searchTerm, statusFilter]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication (in production, use proper authentication)
    if (
      loginData.username === "admin" &&
      loginData.password === "illuminate2025"
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleStatusChange = async (
    participantId: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      // Update in Supabase
      await RegistrationService.updatePaymentVerification(
        participantId,
        newStatus === "approved"
      );

      // Update local state
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === participantId
            ? {
                ...p,
                status: newStatus,
                payment_verified: newStatus === "approved",
              }
            : p
        )
      );

      // In a real application, you would send an email here
      const participant = participants.find((p) => p.id === participantId);
      if (participant) {
        if (newStatus === "approved") {
          console.log(`Sending approval email to ${participant.email}`);
          // Send ticket confirmation email with PDF
        } else {
          console.log(`Sending rejection email to ${participant.email}`);
          // Send polite rejection email
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "College",
        "Year",
        "Status",
        "Registration Date",
      ],
      ...filteredParticipants.map((p) => [
        p.full_name,
        p.email,
        p.phone_number,
        p.college,
        p.year,
        p.status,
        p.created_at?.split("T")[0] || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "illuminate-2025-participants.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-300">Illuminate 2025 - E-Cell IIT Bombay</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-black font-bold py-3 px-6 rounded-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-yellow-400/30 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              Admin Dashboard
            </h1>
            <p className="text-gray-300">
              Illuminate 2025 - Participant Management
            </p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-yellow-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {participants.length}
                </div>
                <div className="text-gray-300 text-sm">Total Registrations</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-green-400/30">
            <div className="flex items-center">
              <Check className="h-8 w-8 text-green-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {participants.filter((p) => p.status === "approved").length}
                </div>
                <div className="text-gray-300 text-sm">Approved</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-orange-400/30">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-orange-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {participants.filter((p) => p.status === "pending").length}
                </div>
                <div className="text-gray-300 text-sm">Pending Review</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-red-400/30">
            <div className="flex items-center">
              <X className="h-8 w-8 text-red-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {participants.filter((p) => p.status === "rejected").length}
                </div>
                <div className="text-gray-300 text-sm">Rejected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or college..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input w-full pl-10 pr-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input px-4 py-3 rounded-lg text-white focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={exportToCSV}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors duration-200"
              >
                <Download className="h-5 w-5 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Participants Table */}
        <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-yellow-400/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-yellow-400/10 border-b border-yellow-400/30">
                <tr>
                  <th className="text-left p-4 text-white font-semibold">
                    Name
                  </th>
                  <th className="text-left p-4 text-white font-semibold">
                    Email
                  </th>
                  <th className="text-left p-4 text-white font-semibold">
                    College
                  </th>
                  <th className="text-left p-4 text-white font-semibold">
                    Year
                  </th>
                  <th className="text-left p-4 text-white font-semibold">
                    Status
                  </th>
                  <th className="text-left p-4 text-white font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="border-b border-gray-700/50 hover:bg-yellow-400/5"
                  >
                    <td className="p-4">
                      <div className="font-semibold text-white">
                        {participant.full_name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {participant.phone_number}
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{participant.email}</td>
                    <td className="p-4 text-gray-300">{participant.college}</td>
                    <td className="p-4 text-gray-300">{participant.year}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          participant.status === "approved"
                            ? "bg-green-400/20 text-green-400"
                            : participant.status === "rejected"
                            ? "bg-red-400/20 text-red-400"
                            : "bg-orange-400/20 text-orange-400"
                        }`}
                      >
                        {participant.status
                          ? participant.status.charAt(0).toUpperCase() +
                            participant.status.slice(1)
                          : "Pending"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedParticipant(participant)}
                          className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {participant.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                participant.id &&
                                handleStatusChange(participant.id, "approved")
                              }
                              className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors duration-200"
                              title="Approve"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                participant.id &&
                                handleStatusChange(participant.id, "rejected")
                              }
                              className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors duration-200"
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Participant Detail Modal */}
      {selectedParticipant && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-black/90 to-gray-900/90 rounded-2xl p-8 border border-yellow-400/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Participant Details
              </h2>
              <button
                onClick={() => setSelectedParticipant(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">Full Name</label>
                  <div className="text-white font-semibold">
                    {selectedParticipant.full_name}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Phone Number</label>
                  <div className="text-white font-semibold">
                    {selectedParticipant.phone_number}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <div className="text-white font-semibold">
                    {selectedParticipant.email}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">College</label>
                  <div className="text-white font-semibold">
                    {selectedParticipant.college}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">Year</label>
                  <div className="text-white font-semibold">
                    {selectedParticipant.year}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">
                    Registration Date
                  </label>
                  <div className="text-white font-semibold">
                    {selectedParticipant.created_at?.split("T")[0] || "N/A"}
                  </div>
                </div>
              </div>

              {selectedParticipant.startup_idea && (
                <div>
                  <label className="text-gray-400 text-sm">Startup Idea</label>
                  <div className="text-white bg-gray-800/50 p-4 rounded-lg mt-2">
                    {selectedParticipant.startup_idea}
                  </div>
                </div>
              )}

              <div>
                <label className="text-gray-400 text-sm">
                  Payment Screenshot
                </label>
                <div className="mt-2 p-4 bg-gray-800/50 rounded-lg text-center">
                  <div className="text-yellow-400 mb-2">
                    📄 Payment Screenshot
                  </div>
                  {selectedParticipant.payment_screenshot_url ? (
                    <a
                      href={selectedParticipant.payment_screenshot_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Click to view payment screenshot
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No screenshot uploaded
                    </span>
                  )}
                </div>
              </div>

              {selectedParticipant.status === "pending" && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      if (selectedParticipant.id) {
                        handleStatusChange(selectedParticipant.id, "approved");
                        setSelectedParticipant(null);
                      }
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Approve Registration
                  </button>
                  <button
                    onClick={() => {
                      if (selectedParticipant.id) {
                        handleStatusChange(selectedParticipant.id, "rejected");
                        setSelectedParticipant(null);
                      }
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Reject Registration
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
