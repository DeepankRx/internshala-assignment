import React, { useEffect, useState } from "react";
import InputField from "../UI/InputField";
import SelectField from "../UI/SelectField";
import { toast } from "sonner";
import Button from "../UI/Button";
import useEventFormValidation from "../hooks/useEventFormValidation";
import Modal from "../UI/Modal";
import { formatFieldName } from "../functions";

const Level1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "",
    guestName: "",
  });

  const [showGuestNameField, setShowGuestNameField] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { errors, validateForm } = useEventFormValidation(formData);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setShowGuestNameField(formData.attendingWithGuest === "Yes");
  }, [formData.attendingWithGuest]);

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
      age: "",
      attendingWithGuest: "",
      guestName: "",
    });
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
          // required
        />
        <InputField
          label={"Email"}
          type={"email"}
          name="email"
          value={formData.email}
          onChange={handleChange}
          // required
        />

        <InputField
          label={"Age"}
          type={"number"}
          name="age"
          value={formData.age}
          onChange={handleChange}
          // required
        />
        <SelectField
          label={"Are you attending with a guest?(Yes/No)"}
          options={[
            { value: "No", label: "No" },
            { value: "Yes", label: "Yes" },
          ]}
          // required
          name="attendingWithGuest"
          value={formData.attendingWithGuest}
          onChange={handleChange}
        />
        {showGuestNameField && (
          <InputField
            label={"Guest Name"}
            //   required
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
          />
        )}
        <Button type={"submit"} label={"Submit"} />
      </form>
    </>
  );
};

export default Level1;
