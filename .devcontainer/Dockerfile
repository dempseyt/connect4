FROM nginx:stable-alpine3.19-slim

RUN apk add certbot certbot-nginx
RUN apk add bash vim
RUN mkdir /etc/letsencrypt

ENV CERTBOT_EMAIL=dempsey.thompson@journeyone.com.au

COPY default.conf /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html
COPY dist/. .
COPY startup.sh /

