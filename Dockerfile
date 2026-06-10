From node 

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=qwerty

RUN mkdir -p testapp

COPY . /testapp

RUN cd /testapp

CMD ["node","server.js"]