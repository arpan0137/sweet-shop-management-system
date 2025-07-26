// In backend/server.js
import app from "./app.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});