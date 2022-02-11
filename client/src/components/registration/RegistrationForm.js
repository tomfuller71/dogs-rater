import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
import newTranslateServerErrors from "../../services/newTranslateServerErrors";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    const { email, password, passwordConfirmation, name } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;

    let newErrors = {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    };

    let hasErrors = false;

    if (!email.match(emailRegexp)) {
      newErrors.email = "Is invalid";
      hasErrors = true;
    }

    if (name.trim() == "") {
      newErrors.name = "Is required";
      hasErrors = true;
    }

    if (password.trim() == "") {
      newErrors.password = "Is required";
      hasErrors = true;
    }

    if (passwordConfirmation.trim() == "") {
      newErrors.passwordConfirmation = "Is required";
      hasErrors = true;
    }

    if (passwordConfirmation !== password) {
      newErrors.passwordConfirmation = "Does not match password";
      hasErrors = true;
    }
    return hasErrors ? newErrors : null;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const currentErrors = validateInput(userPayload);

    if (currentErrors) {
      return setErrors(currentErrors);
    } else {
      setErrors({});
    }

    try {
      const response = await fetch("/api/v1/users", {
        method: "post",
        body: JSON.stringify(userPayload),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const responseBody = await response.json();
          const newErrors = newTranslateServerErrors(responseBody.errors);

          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      }
      const userData = await response.json();
      setShouldRedirect(true);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="form-background">
      <div className="form grid-container">
        <h2>Create your Pupperater account</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>
              Email
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              Name
              <input type="text" name="name" value={userPayload.name} onChange={onInputChange} />
              <FormError error={errors.name} />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div>
            <label>
              Password Confirmation
              <input
                type="password"
                name="passwordConfirmation"
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
              />
              <FormError error={errors.passwordConfirmation} />
            </label>
          </div>
          <div>
            <input type="submit" className="button" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
