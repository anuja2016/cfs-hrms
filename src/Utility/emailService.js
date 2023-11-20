import { privateAxios } from "./Helper"

export const sendmail = (emailData) => { // Pass emailData as a parameter
  return privateAxios.post("/sendemail", emailData) // Use the passed emailData
    .then((resp) => resp.data);
};


export const sendmail1 = (emailData) => { // Pass emailData as a parameter
  return privateAxios.post("/sendemail", emailData) // Use the passed emailData
    .then((resp) => resp.data);
};

