import React, { useEffect, useState } from "react";
import InputField from "../UI/InputField";
import SelectField from "../UI/SelectField";
import { toast } from "sonner";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { formatFieldName } from "../functions";
import useJobApplicationFormValidation from "../hooks/useJobApplicationFormValidation";
import { ROLES } from "../constants";

const Level2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    applyingForPosition: "",
    yearsOfExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    skills: [],
    interviewDateTime: "",
  });
  const [showRelevantExperience, setShowRelevantExperience] = useState(false);
  const [showPortfolioUrl, setShowPortfolioUrl] = useState(false);
  const [showManagementExperience, setShowManagementExperience] =
    useState(false);

  const [showModal, setShowModal] = useState(false);
  const { errors, validateForm } = useJobApplicationFormValidation(formData);
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
      applyingForPosition: "",
      yearsOfExperience: "",
      portfolioUrl: "",
      managementExperience: "",
      skills: [],
      interviewDateTime: "",
    });
  };

  useEffect(() => {
    setShowRelevantExperience(
      formData?.applyingForPosition === ROLES.DEVELOPER ||
        formData?.applyingForPosition === ROLES.DESIGNER
    );
    setShowPortfolioUrl(formData?.applyingForPosition === ROLES.DESIGNER);
    setShowManagementExperience(
      formData?.applyingForPosition === ROLES.MANAGER
    );
  }, [formData?.applyingForPosition]);

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
  console.log(errors);
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
        <InputField
          label={"Preferred Interview Timing"}
          type={"datetime-local"}
          name="interviewDateTime"
          value={formData.interviewDateTime}
          onChange={handleChange}
        />
        <SelectField
          label={"Applying For Position?"}
          options={[
            { value: ROLES.DEVELOPER, label: "Developer" },
            { value: ROLES.DESIGNER, label: "Designer" },
            { value: ROLES.MANAGER, label: "Manager" },
          ]}
          name="applyingForPosition"
          value={formData.applyingForPosition}
          onChange={handleChange}
        />
        <SelectField
          label={"Additional Skills?"}
          options={[
            { value: "css", label: "CSS" },
            { value: "html", label: "HTML" },
            { value: "javascript", label: "Javascript" },
            { value: "typescript", label: "TypeScript" },
            { value: "leadership", label: "Leadership" },
          ]}
          name="skills"
          value={formData.skills}
          onChange={handleSkillChange}
          multiple
        />
        {formData.skills.length > 0 && (
          <div className="flex flex-wrap mt-2">{renderSkills()}</div>
        )}
        {showRelevantExperience && (
          <InputField
            label={"Years of Experience"}
            type={"number"}
            name="yearOfExperience"
            value={formData.yearOfExperience}
            onChange={handleChange}
          />
        )}
        {showPortfolioUrl && (
          <InputField
            label={"Portfolio URL"}
            type={"text"}
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
          />
        )}
        {showManagementExperience && (
          <InputField
            label={"Management Experience"}
            type={"number"}
            name="managementExperience"
            value={formData.managementExperience}
            onChange={handleChange}
          />
        )}

        <Button type={"submit"} label={"Submit"} />
      </form>
    </>
  );
};

export default Level2;
