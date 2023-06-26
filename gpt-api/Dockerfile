FROM denoland/deno:alpine-1.34.3  

WORKDIR /app

USER deno

COPY . .

RUN deno cache src/main.ts

EXPOSE 8000

CMD ["deno", "task","start"]