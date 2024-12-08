# Sử dụng Node.js làm base image
FROM node:18-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Biên dịch mã TypeScript sang JavaScript
RUN npm run build

# GExpose port mà ứng dụng sử dụng
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["node", "dist/main"]
