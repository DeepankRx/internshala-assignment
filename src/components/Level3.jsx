import React, { useEffect, useState } from "react";
import InputField from "../UI/InputField";
import SelectField from "../UI/SelectField";
import { toast } from "sonner";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { formatFieldName } from "../functions";
import { ROLES } from "../constants";
import useSurveyForm from "../hooks/useSurveyForm";
import axios from "axios";

const Level3 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    interviewDateTime: "",
    applyingForPosition: "",
    skills: [],
    yearsOfExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    topic: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
    favProgrammingLanguage: "",
    progYOE: "",
    exerciseFrequency: "",
    diet: "",
  });

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [showTechnologySection, setShowTechnologySection] = useState(false);
  const [showHealthSection, setShowHealthSection] = useState(false);
  const [showEducationSection, setShowEducationSection] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { errors, validateForm } = useSurveyForm(formData);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Object.entries(errors).forEach(([field, errorMessage]) => {
        toast.error(errorMessage);
      });
      return;
    }

    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      interviewDateTime: "",
      applyingForPosition: "",
      skills: [],
      yearsOfExperience: "",
      portfolioUrl: "",
      managementExperience: "",
      topic: "",
      highestQualification: "",
      fieldOfStudy: "",
      feedback: "",
      favProgrammingLanguage: "",
      progYOE: "",
      exerciseFrequency: "",
      diet: "",
    });
  };

  useEffect(() => {
    setShowTechnologySection(formData.topic === "Technology");
    setShowHealthSection(formData.topic === "Health");
    setShowEducationSection(formData.topic === "Education");
  }, [formData.topic]);

  const handleSkillChange = (event) => {
    const selectedSkill = event.target.value;
    const newSkills = formData.skills.slice();

    if (newSkills.includes(selectedSkill)) {
      const index = newSkills.indexOf(selectedSkill);
      newSkills.splice(index, 1);
    } else {
      newSkills.push(selectedSkill);
    }

    setFormData({ ...formData, skills: newSkills });
  };

  const renderSkills = () => {
    return formData.skills.map((skill) => (
      <div key={skill} className="flex items-center mr-2">
        <span className="mr-2">{skill}</span>
        <button onClick={() => handleSkillChange({ target: { value: skill } })}>
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    ));
  };

  return (
    <>
      <Modal isOpen={showModal} onClose={handleClose}>
        <div className="text-center p-4">
          <h1 className="text-xl font-bold mb-4">
            Form Submitted Successfully!
          </h1>

          <table className="w-full">
            <tbody>
              {Object.entries(formData).map(([key, value]) => {
                if (value)
                  return (
                    <tr key={key} className="border-b border-gray-200">
                      <td className="p-2">{formatFieldName(key)}</td>
                      <td className="p-2">{value}</td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
      </Modal>
      <form className="w-1/2 p-4 flex flex-col gap-2" onSubmit={handleSubmit}>
        <InputField
          label={"Name"}
          type={"text"}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label={"Email"}
          type={"email"}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label={"Phone Number"}
          type={"number"}
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <SelectField
          label={"Survey Topic"}
          options={[
            { value: "Technology", label: "Technology" },
            { value: "Health", label: "Health" },
            { value: "Education", label: "Education" },
          ]}
          name="topic"
          value={formData.topic}
          onChange={handleChange}
        />
        {showTechnologySection && (
          <>
            <InputField
              label={"Favorite Programming Language"}
              type={"text"}
              name="favProgrammingLanguage"
              value={formData.favProgrammingLanguage}
              onChange={handleChange}
            />
            <InputField
              label={"Programming Years of Experience"}
              type={"number"}
              name="progYOE"
              value={formData.progYOE}
              onChange={handleChange}
            />
          </>
        )}
        {showHealthSection && (
          <>
            <InputField
              label={"Exercise Frequency"}
              type={"text"}
              name="exerciseFrequency"
              value={formData.exerciseFrequency}
              onChange={handleChange}
            />
            <InputField
              label={"Diet"}
              type={"text"}
              name="diet"
              value={formData.diet}
              onChange={handleChange}
            />
          </>
        )}
        {showEducationSection && (
          <>
            <InputField
              label={"Highest Qualification"}
              type={"text"}
              name="highestQualification"
              value={formData.highestQualification}
              onChange={handleChange}
            />
            <InputField
              label={"Field of Study"}
              type={"text"}
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
            />
          </>
        )}
        {additionalQuestions.map((question) => (
          <InputField
            key={question.id}
            label={question.label}
            type={question.type}
            name={question.name}
            value={formData[question.name]}
            onChange={handleChange}
          />
        ))}
        <InputField
          label={"Feedback"}
          type={"text"}
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
        />
        <Button type={"submit"} label={"Submit"} />
      </form>
    </>
  );
};

export default Level3;
