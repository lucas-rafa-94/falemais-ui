#FROM nginx:1.13.3-alpine
## Remove default nginx website
#RUN rm -rf /usr/share/nginx/html/*
## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY /dist /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]

FROM node:10.16.0 AS builder
COPY . ./falemais-ui
WORKDIR /falemais-ui
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /falemais-ui/dist/ /usr/share/nginx/html
