FROM node:18 as build
WORKDIR /src

COPY ./ .

RUN npm install 
RUN npm run build

EXPOSE 2000
CMD ["npm", "start"]


