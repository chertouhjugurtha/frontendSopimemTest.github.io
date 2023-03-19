FROM  nginx:latest 
LABEL Name="DBAEI Frontend VueJS" Version=1.0.0
LABEL maintainr="Abdelghani Benabderrahmane"
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /code
COPY  app/dist /code
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]