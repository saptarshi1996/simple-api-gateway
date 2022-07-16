FROM node:15.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p /client
COPY client/package*.json client/

RUN cd client && npm install

COPY client/ client/

RUN rm -f -r dist/ && cd client && npm run build && npm run generate && mv dist ../

COPY . ./

EXPOSE 9091

CMD ["bash", "entrypoint.bash"]
