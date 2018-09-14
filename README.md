## HapiJS NodeJS y MongoDB

Instlación de software y dependencias:

    $ npm install && npm install -g nodemon bower && bower install

Arrancar servicio:

    $ npm run start:prod {{puerto}}

Arrancer servicio con autoreload con cambios:

    $ npm run start:dev {{puerto}}

Para cambiar los colores del estilo de Material Design:

    https://getmdl.io/customize/index.html

y reemplazar public/bower_components/material-design-line/material.min.css

Lista de iconos de Material Design:

    https://material.io/tools/icons/?style=baseline

Solucionar problema nodemon ENOSPC

    $ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

---

Fuentes:

+ https://github.com/expressjs/cookie-session
+ https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
+ https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program
+ https://futurestud.io/tutorials/hapi-how-to-handle-404-responses-for-missing-routes
+ https://github.com/remy/nodemon/issues/907
