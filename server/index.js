const app = require("./server");

const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Express now departing from port ${port}!`));
