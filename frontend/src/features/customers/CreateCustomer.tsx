import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveCustomer } from "../../api/customersApi";
import { validateEmail } from "../../utils/helpers";
import { CustomerType } from "./CustomerType";

type FormState = {
  customer: CustomerType;
  submitSuccess: boolean;
  loading: boolean;
};

function CreateCustomer() {
  const navigation = useNavigate();

  const defaultFormValues = () => {
    return {
      customer: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
      },
      submitSuccess: false,
      loading: false,
    };
  };
  const [formData, setFormData] = useState<FormState>(defaultFormValues());

  const [errorEmail, setErrorEmail] = useState("");

  const validateData = () => {
    setErrorEmail("");
    // TODO: Completar el resto de casos de error
    let isValid = true;
    if (!validateEmail(formData.customer.first_name)) {
      setErrorEmail("Debes de ingresar un correo válido.");
      isValid = false;
    }
    return isValid;
  };

  const doCreateCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!validateData()) {
      //  return;
    }

    formData.loading = true;
    const result = await saveCustomer(formData.customer);
    formData.loading = false;

    if (!result.statusResponse) {
      setErrorEmail(result.error);
      return;
    }

    navigation("/");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      customer: { ...formData.customer, [e.target.name]: e.target.value },
    });
  };
  return (
    <div>
      <div className={"col-md-12 form-wrapper"}>
        <h2> Create Post </h2>
        {!formData.submitSuccess && (
          <div className="alert alert-info" role="alert">
            Fill the form below to create a new post
          </div>
        )}
        {formData.submitSuccess && (
          <div className="alert alert-info" role="alert">
            The form was successfully submitted!
          </div>
        )}
        <form
          id={"create-post-form"}
          onSubmit={doCreateCustomer}
          noValidate={true}
        >
          <div className="form-group col-md-12">
            <label htmlFor="first_name"> First Name </label>
            <input
              type="text"
              id="first_name"
              onChange={(e) => onChange(e)}
              name="first_name"
              className="form-control"
              placeholder="Enter customer's first name"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="last_name"> Last Name </label>
            <input
              type="text"
              id="last_name"
              onChange={(e) => onChange(e)}
              name="last_name"
              className="form-control"
              placeholder="Enter customer's last name"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="email"> Email </label>
            <input
              type="email"
              id="email"
              onChange={(e) => onChange(e)}
              name="email"
              className="form-control"
              placeholder="Enter customer's email address"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="phone"> Phone </label>
            <input
              type="text"
              id="phone"
              onChange={(e) => onChange(e)}
              name="phone"
              className="form-control"
              placeholder="Enter customer's phone number"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="address"> Address </label>
            <input
              type="text"
              id="address"
              onChange={(e) => onChange(e)}
              name="address"
              className="form-control"
              placeholder="Enter customer's address"
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="description"> Description </label>
            <input
              type="text"
              id="description"
              onChange={(e) => onChange(e)}
              name="description"
              className="form-control"
              placeholder="Enter Description"
            />
          </div>
          <div className="form-group col-md-4 pull-right">
            <button className="btn btn-success" type="submit">
              Create Customer
            </button>
            {formData.loading && (
              <span className="fa fa-circle-o-notch fa-spin" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCustomer;
