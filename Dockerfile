FROM node:8-alpine

MAINTAINER blingweiwei "liang.wei@free-sun.com.cn"

COPY . /var/app

WORKDIR /var/app

EXPOSE 4000

CMD ["-p", "4000", "-g", "postgres://postgres:123456@postgres-test:5432/Visit", "--qnak", "5XrM4wEB9YU6RQwT64sPzzE6cYFKZgssdP5Kj3uu", "--qnsk", "w6j2ixR_i-aelc6I7S3HotKIX-ukMzcKmDfH6-M5", "--qnbkt", "anxinyun-test", "--qndmn", "http://test.resources.anxinyun.cn", "--ahost", "http://localhost:8080", "--aroot", "/fs-wfw"]

ENTRYPOINT [ "node", "server.js" ]
