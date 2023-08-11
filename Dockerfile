FROM node:latest
RUN mkdir -p /project
WORKDIR /project
COPY . /project
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]