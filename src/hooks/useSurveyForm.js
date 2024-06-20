import { useState } from "react";
import { SURVEY_TOPIC } from "../constants";

const useSurveyForm = (formData) => {
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
    if (!formData.topic) {
      newErrors.topic = "Survey topic is required!";
    }

    if (formData.topic === SURVEY_TOPIC.TECHNOLOGY) {
      if (!formData.favProgrammingLanguage)
        newErrors.favProgrammingLanguage = "Fav Programming Language required";
      if (formData.progYOE <= 0)
        newErrors.progYOE =
          "Fav Programming Language experience must be greater than 0";
    }
    if (formData.topic === SURVEY_TOPIC.HEALTH) {
      if (!formData.exerciseFrequency)
        newErrors.exerciseFrequency = "Exercise Frequency required";
      if (formData.diet <= 0) newErrors.diet = "Diet Preference is required!";
    }
    if (formData.topic === SURVEY_TOPIC.EDUCATION) {
      if (!formData.highestQualification)
        newErrors.highestQualification = "Highest Qualification required";
      if (formData.fieldOfStudy <= 0)
        newErrors.fieldOfStudy = "Field Of Study  is required!";
    }
    if (formData.feedback.length < 50) {
      newErrors.feedback = "Feedback should be of atleast 50 charachters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};

export default useSurveyForm;
