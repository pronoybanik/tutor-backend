Backend url: https://tutor-backend-jet.vercel.app/


create network 


database run docker :
docker run --name mongodb --rm --network docker-tutor-site mongo

Build image docker for Backend:
docker build -t tutor-backend:v2 .

run docker commend Backend:
docker run --name tutor-backend-container --rm --network docker-tutor-site --env-file .env -w //app  -v "//$(pwd)"://app -v //app/node_modules -p 5000:5000 tutor-backend:v2


Build image docker for Frontend:
docker build -t tutor-frontend:v2 .

run docker commend frontend:
docker run --name tutor-frontend-conatiner --rm -p 3000:3000 --env-file .env.local -w //app -v "//$(pwd)"://app -v //app/node_modules --network docker-tutor-site tutor-frontend:v2