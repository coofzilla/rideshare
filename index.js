const app = require("./app");
const PORT = 5000;

app.get('/api', (req, res)=>{
    res.send('WORKING')
})

app.listen(PORT, () => {
  console.log("RUNNING ON 5000");
});
