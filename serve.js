const path = require("path");
const express = require("express");
const cors = require('cors')
const compression = require('compression')
const app = express();

app.use(cors());
// will use compression while serving files to clients
app.use(compression());

// server static files from the build folder 
app.use(express.static(path.join(__dirname, 'build')));

// redirect any other path to index.html (Client side routes friendly )
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// start express server on port 3030
app.listen(3030, () => {
  console.log("server started on port 3030");
});