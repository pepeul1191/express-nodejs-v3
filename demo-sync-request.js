var request = require('sync-request');
var status = 200;
var rpta = '';

try{
  var res = request('POST', 'http://127.0.0.1:4000/sistema/usuario/validar', {
    headers: {
      'csrf_val': 'PKBcauXg6sTXz7Ddlty0nejVgoUodXL89KNxcrfwkEme0Huqtj6jjt4fP7v2uF4L',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'usuario=' + 'pepe&' + 'sistema_id=' + 1,
  });
  status = res.statusCode;
  rpta = res.body.toString('utf8');
}
catch(err){
    //do whatever with error
  status = 500;
  rpta = err.toString('utf-8');
}

console.log(status);
console.log(rpta);
