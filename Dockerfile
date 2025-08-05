FROM node:21
WORKDIR "/opt/movies"
COPY . ./
# COPY package*.json .
# RUN npm i
EXPOSE "5173"
CMD ["sleep", "infinity"]
