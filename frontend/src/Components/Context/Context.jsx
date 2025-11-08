export const API = "https://truenorthhomes.in/nodeapis";
//export const API = "http://localhost:5000";
export const options = {
  method: "POST, GET",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "",
    mobile: "",
    email: "",
  }),
};
