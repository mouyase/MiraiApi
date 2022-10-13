FROM node:16
WORKDIR /miraiapi
ADD . /miraiapi
RUN npm i yarn -g
RUN yarn
EXPOSE 3000
CMD yarn start
