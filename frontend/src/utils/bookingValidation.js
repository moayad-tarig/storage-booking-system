export const validateBookingForm = (formData, startDate, endDate) => {
    const errors = {}
  
    if (!formData.customerName.trim()) {
      errors.customerName = "Name is required"
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
  

  