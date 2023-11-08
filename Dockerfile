FROM node:21.1.0

# Utwórz i ustaw katalog roboczy w kontenerze
ENV DockerHOME=C:/Users/artse/Desktop/15minut/15-minute-admin

WORKDIR $DockerHOME

# Skopiuj plik package.json i package-lock.json do katalogu roboczego
COPY package*.json ./

RUN npm install -g react-scripts@5.0.1

# Zainstaluj zależności
RUN npm install

# Skopiuj pozostałe pliki projektu
COPY . $DockerHOME

# Zbuduj aplikację React
RUN npm run build

# Domyślny port naszej aplikacji
EXPOSE 8000

# Uruchom serwer WWW
CMD [ "npm", "start" ]
