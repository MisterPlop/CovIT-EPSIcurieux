const http = require("http");
const app = require("./app");

// const PORT = process.env.PORT || process.env.LOCAL_PORT;
const PORT = process.env.PORT ?? process.env.LOCAL_PORT;
// ici ?? même chose que les doubles barres (si le premier n'est pas défini on prends le deuxième, sauf que les doubles barres prennent automatiquement la seconde option)

app.use(express.static("public/store"));
app.use(cors(/* {
    origin: "http://localhost:3000"
} */));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log("Server http://localhost:" + PORT));