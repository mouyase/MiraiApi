FROM node:16-alpine
WORKDIR /miraiapi
ADD . /miraiapi
RUN yarn
EXPOSE 3000
CMD yarn serve
