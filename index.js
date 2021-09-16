import { get, listen } from "./app";
const PORT = 5000;

get("/api", (req, res) => {
  res.send("WORKING");
});

listen(PORT, () => {
  console.log("RUNNING ON 5000");
});
