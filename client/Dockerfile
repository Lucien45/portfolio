#on render or vercel
FROM node:23-alpine3.21 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]

#on vps
# FROM nginx:1.27-alpine
# COPY build/ /usr/share/nginx/html/
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]