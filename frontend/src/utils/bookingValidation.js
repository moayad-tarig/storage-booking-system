export const validateBookingForm = (formData, startDate, endDate) => {
    const errors = {}
  
    if (!formData.customerName.trim()) {
      errors.customerName = "Name is required"
    }
  
    if (!formData.customerEmail.trim()) {
      errors.customerEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      errors.customerEmail = "Email is invalid"
    }
  
    if (!formData.customerPhone.trim()) {
      errors.customerPhone = "Phone number is required"
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.customerPhone)) {
      errors.customerPhone = "Phone must be in format (555) 123-4567"
    }
  
    if (!startDate) {
      errors.startDate = "Start date is required"
    }
  
    if (!endDate) {
      errors.endDate = "End date is required"
    } else if (startDate && endDate <= startDate) {
      errors.endDate = "End date must be after start date"
    }
  
    return errors
  }
  
  export const formatPhoneNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
  }
  