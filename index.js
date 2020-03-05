require("dotenv").config();
var express = require("express"),
  cors = require("cors");
const app = express();

app.use(cors());

const server = require("http").Server(app);

const io = require("socket.io")(server);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

var router = express.Router();
/* Socket irá aqui depois */
var emitir = function(req, res, next) {
  var notificar = req.query.notificacao || "";
  var teste = req.query.teste || "";
  var id = req.query.id || "";

  if (notificar != "") {
    io.emit("notificacao", notificar);
    next();
  } else {
    next();
  }

  if (teste != "") {
    io.emit("teste", teste, id);
    next();
  } else {
    next();
  }
};

app.use(emitir);
app.use("/api", router);
router.route("/notificar").get(function(req, res) {
  //aqui vamos receber a mensagem
  res.json({ message: "Rota Ok" });
});
router.route("/teste").get(function(req, res) {
  //aqui vamos receber a mensagem
  res.json({ message: "Rota Ok" });
});

server.listen(process.env.PORT || 5000);
console.log("conectado a porta " + process.env.PORT || 5000);
