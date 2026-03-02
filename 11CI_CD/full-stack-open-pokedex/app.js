const express = require("express");
const app = express();

// get the port from env variable
const PORT = process.env.PORT || 5000;

app.use(express.static("dist"));

app.get('/health', (req, res) => {
  // UNCOMMNET TO SIMULATE A BROKEN DEPLOYMENT, NEED TO IMPLEMENT A TEST FOR THIS THO AND ADD TO pipeline.yml WORKFLOW
  // // eslint-disable-next-line no-constant-condition
  // if (true) throw('error...  ')
  res.send('ok')
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`); // eslint-disable-line no-console
});
