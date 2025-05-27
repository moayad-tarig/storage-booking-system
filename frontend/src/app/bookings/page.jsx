'use client'


import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import toast from "react-hot-toast";

const BookingsPage = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  const fetchBookings = async () => {
    if (!userName) return;
    
    try {
      setLoading(true);
      setError(null);
      const loadingToast = toast.loading('Loading bookings...');
      const response = await api.getBookings(userName);
      setBookings(response.data || []);
      toast.dismiss(loadingToast);
      toast.success('Bookings loaded successfully');
    } catch (err) {
      setError(err.message);
      toast.dismiss();
      toast.error(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBookings();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-500">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Bookings</h1>
          <p className="text-gray-600">View and manage your storage unit bookings</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              type="text"
              placeholder="Enter your name to view bookings..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit">
              View Bookings
            </Button>
          </form>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Unit #{booking.unitId}</h2>
                    <p className="text-gray-600 mb-1">Booking ID: {booking.id}</p>
                    <p className="text-gray-600 mb-1">User: {booking.userName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 mb-1">
                      From: {new Date(booking.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mb-1">
                      To: {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      Created: {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          userName && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bookings found for {userName}.</p>
              <Button
                onClick={() => router.push("/storage-units")}
                className="mt-4"
              >
                Browse Available Units
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
