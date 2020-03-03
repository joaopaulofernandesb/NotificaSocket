var express = require("express"),
  cors = require("cors");
(app = express()), app.use(cors());
(server = require("http")
  .createServer(app)
  .listen(3002)),
  (io = require("socket.io").listen(server)),
  (bodyParser = require("body-parser"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 8080;
var router = express.Router();
/* Socket irá aqui depois */
var emitir = function(req, res, next) {
  var notificar = req.query.notificacao || "";
  if (notificar != "") {
    io.emit("notificacao", notificar);
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

app.listen(port);
console.log("conectado a porta " + port);
