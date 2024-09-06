#! /bin/sh

cd /usr/share/nginx/html
echo ${CERTBOT_EMAIL}
certbot -n --nginx -d connect4.dempsey.graduate-program.journeyone.com.au -m ${CERTBOT_EMAIL} --redirect --agree-tos
