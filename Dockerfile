FROM node:23-apline3.21 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .

RUN npm run build

FROM nginx:1.27-apline

COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]