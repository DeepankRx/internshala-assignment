import { useState } from "react";
import { ROLES } from "../constants";

const useJobApplicationFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required!";
      // return;
    }
    if (!formData.email) {
      newErrors.email = "Email is required!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required!";
    }
    if (formData.phoneNumber.includes("+")) {
      newErrors.phoneNumber = "Please enter phone number without country code!";
    }
    if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Please enter a valid phone number of 10 digits!";
    }
    if (
      formData.applyingForPosition === ROLES.DEVELOPER ||
      formData.applyingForPosition === ROLES.DESIGNER
    ) {
      if (formData.yearOfExperience <= 0)
        newErrors.yearOfExperience = "Experience must be greater than 0 years.";
    }
    const urlRegex = /^(http|https):\/\/[^ "]+\.[^ "]+$/;
    if (formData.applyingForPosition === ROLES.DESIGNER) {
      if (!formData.portfolioUrl || !urlRegex.test(formData.portfolioUrl)) {
        newErrors.portfolioUrl =
          "Portfolio URL is required for designers and must be a valid URL.";
      }
    }
    if (formData.applyingForPosition === ROLES.MANAGER) {
      if (!formData.managementExperience) {
        newErrors.managementExperience = "Management experience is required.";
      }
    }
    if (formData.skills.length === 0) {
      if (!formData.managementExperience) {
        newErrors.skills = "Select atleast one skill.";
      }
    }
    const today = new Date();
    if (formData.interviewDateTime) {
      const interviewDate = new Date(formData.interviewDateTime);
      if (interviewDate.getTime() <= today.getTime()) {
        newErrors.interviewDateTime =
          "Please select a future date and time for the interview.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};

export default useJobApplicationFormValidation;
