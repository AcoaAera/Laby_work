const app = require('express')()
const content_disposition = app.content_disposition;
const multer = require("multer");
const upload = multer();
const fs = require("fs");
const { exec } = require("child_process");
var request = require('request');

const host = '127.0.0.1'
const port = 7000



app.get('/', (req, res) => {
  res.status(200).type('text/html');
  res.sendFile(__dirname + "/index.html");
})

app.post('/upload', upload.any(), (req, res) => {

  fs.writeFileSync(req.files[0].originalname, req.files[0].buffer);
  var name = req.files[0].originalname;

  exec("curl -k -v 'https://smarty.mail.ru/api/v1/objects/detect?oauth_provider=mcs&oauth_token=ck4hiWXazVk1NbNSXE7TNKtcmS4gJa7Lp95nTdqc7uZ2rrSM' -F file_0=@" + name + " -F meta='{\"mode\":[\"pedestrian\",\"multiobject\",\"object\"], \"images\":[{\"name\": \"file_0\"}]}'", (error, stdout, stderr) => {
    console.log(error);
    console.log(stdout);
    res.send(stdout);
  });

  // curl -k -v 'https://smarty.mail.ru/api/v1/objects/detect?oauth_provider=mcs&oauth_token=ck4hiWXazVk1NbNSXE7TNKtcmS4gJa7Lp95nTdqc7uZ2rrSMv' -F file_0=C:\group-of-young-peopl.jpeg -F meta='{\"mode\":[\"pedestrian\",\"multiobject\",\"object\"], \"images\":[{\"name\": \"file_0\"}]}'

  /** 
  let options = {
    headers: {
      "Content-Type": "multipart/form-data",
      "boundary": "----WebKitFormBoundaryfCqTBHeLZlsicvMp",
    },
    meta: {
      mode: ["pedestrian", "multiobject", "object"],
      images: [
        { "name": "@" + name }
      ]
    }
  }

  //let options = {
  //  headers: {
  //    "Content-Type": "multipart/form-data",
  //    "boundary": {
  //      "Content-Disposition" : form-data; name="file_0"; filename=""
  //    },
  //  },
  //  method: "POST",
  //  meta: {
  //    "images": [{ "name": "@' + name + '" }],
  //    "mode": ["resolution", "improve"],
  //    "rfactor": 4, "rtype": "art"
  //  }
  //}
//
  //app.
//
  //request('https://smarty.mail.ru/api/v1/objects/detect?oauth_provider=mcs&oauth_token=ck4hiWXazVk1NbNSXE7TNKtcmS4gJa7Lp95nTdqc7uZ2rrSMv', options, (err, response, body) => {
  //  if (err) {
  //    return res.status(500).send({ message: err });
  //  }
  //  else {
  //    console.log('---------------------response----------------------');
  //    console.log(response);
  //    console.log('---------------------body---------------------');
  //    console.log(body);
  //    return res.send(response);
  //  }
  //});
  */

})


app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`)
})