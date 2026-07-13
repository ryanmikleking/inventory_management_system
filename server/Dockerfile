FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y \
    graphicsmagick \
    imagemagick \
    tesseract-ocr \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]