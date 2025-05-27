'use client'

import { useState, useEffect, Suspense } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
import { useSearchParams, useRouter } from 'next/navigation';

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { validateBookingForm, formatPhoneNumber } from "@/utils/bookingValidation";
import UnitDetailsCard from "@/components/UnitDetailsCard";
import BookingForm from "@/components/BookingForm";
import toast from "react-hot-toast";

const BookUnitContent = () => {
  const searchParams = useSearchParams(); // for getting query params
  const router = useRouter();
  const unitId = searchParams.get("unitId");

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUnit = async () => {
      if (unitId) {
        try {
          setLoading(true);
          const response = await api.getUnits({ id: unitId });
          if (response.data && response.data.length > 0) {
            setSelectedUnit(response.data[0]);
          }
        } catch (err) {
          setError(err.message);
          toast.error('Failed to fetch unit details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUnit();
  }, [unitId]);

  const validateForm = () => {
    const newErrors = validateBookingForm(formData, startDate, endDate);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "customerPhone") {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const bookingData = {
        userName: formData.customerName,
        unitId: parseInt(selectedUnit.id),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };

      await api.createBooking(bookingData);
      toast.success('Booking confirmed successfully!');
      
      setTimeout(() => {
        router.push("/bookings");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
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

  if (error || !selectedUnit) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Unit Not Found</h1>
            <p className="text-gray-600 mb-8">
              {error || "The requested storage unit could not be found."}
            </p>
            <Button onClick={() => router.push("/storage-units")} className="bg-primary-500 hover:bg-primary-600">
              Browse Available Units
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Storage Unit</h1>
          <p className="text-gray-600">
            Complete the form below to reserve your storage unit
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UnitDetailsCard unit={selectedUnit} />

          <BookingForm
            formData={formData}
            errors={errors}
            startDate={startDate}
            endDate={endDate}
            onFormDataChange={handleInputChange}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    </div>
  </div>
);

// Main component with Suspense
const BookUnit = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookUnitContent />
    </Suspense>
  );
};

export default BookUnit;
