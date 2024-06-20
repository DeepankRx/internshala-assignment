import { useState } from "react";

const useEventFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required!";
    }
    if (!formData.email) {
      newErrors.email = "Email is required!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    if (!formData.age) {
      newErrors.age = "Age is required!";
    } else if (formData.age <= 0) {
      newErrors.age = "Age should be greater than 0!";
    }
    if (formData.attendingWithGuest === "Yes" && !formData.guestName) {
      newErrors.guestName = "Guest Name is required!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};

export default useEventFormValidation;
