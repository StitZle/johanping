# docker build . -t fire-hose-frontend
# docker run -p 3000:80 -d fire-hose-frontend


FROM node:21-alpine3.18 as builder

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g npm@10.2.5
RUN npm install

COPY .. ./

RUN npm run build


##copy files to ngixn
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

# Copy built assets from `builder` image
COPY --from=builder /app/dist /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
