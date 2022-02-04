import _ from "lodash";
import translateServerErrors from "./translateServerErrors.js";

class Fetcher {
  static async post(route, body, options = {}) {
    const validationStatus = options.validationStatus ?? 422;
    const validationErrorParser = options.validationErrorParser ?? translateServerErrors;

    const response = {
      ok: false,
      data: null,
      validationErrors: null,
    };

    try {
      const fetchOptions = {
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(body),
      };
      const fetchResponse = await fetch(route, fetchOptions);

      if (!fetchResponse.ok) {
        if (fetchResponse.status === validationStatus) {
          const body = await fetchResponse.json();
          response.validationErrors = validationErrorParser(body.errors);
        } else {
          const errorMessage = `${fetchResponse.status} (${fetchResponse.statusText})`;
          throw Error(errorMessage);
        }
      } else {
        response.ok = true;
        response.data = await fetchResponse.json();
      }
      return response;
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  }
  /**
   *
   * @param {string} route The domain relative url of the post route
   * @returns A response object with properties of :
   * - `ok`: true if successfully inserted
   * - `data`: the post response body
   */
  static async get(route) {
    const response = {
      ok: false,
      data: null,
    };

    try {
      const fetchResponse = await fetch(route);

      if (fetchResponse.ok) {
        response.ok = true;
        response.data = await fetchResponse.json();
      } else {
        throw Error(`${fetchResponse.status} (${fetchResponse.statusText})`);
      }

      return response;
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  }

  // Alt version of error parser that doesn't mutate key case - may then use for <input> specific errors rather than have all in callout in one block
  static parseObjectionValidationErrors(errors) {
    let serializedErrors = {};
    for (const key of Object.keys(errors)) {
      errors[key].forEach((error) => {
        serializedErrors[key] = `${_.startCase(key)} ${error.message}`;
      });
    }
    return serializedErrors;
  }
}

export default Fetcher;
