ARG repo=node
ARG tag=8.11.1

FROM ${repo}:${tag}

COPY . /Hackathon/hackathon-wind/

RUN cd /Hackathon/hackathon-wind \
  && npm install

CMD [ "npm", "start" ]