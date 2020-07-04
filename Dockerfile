FROM node:14.3.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn install
COPY . /app
ARG REACT_APP_API_PREFIX="https://serverless-weur-dev-<fid>-apim.azure-api.net/v1/"
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
