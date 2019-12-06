ARG repo=node
ARG tag=8.11.1

FROM ${repo}:${tag}

COPY . /Hackathon/hackathon-wind/

WORKDIR /Hackathon/hackathon-wind
RUN npm install
CMD [ "npm", "run", "start" ]