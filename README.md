Keycloak
========


admin 123456 
command cmd dans bin> kc.bat start-dev

USERS: youness1998  123456 role: USER ET ADMIN    et anouar  123456 role:USER

1- create realm
2- create client (Valid redirect URIs = http://localhost:4200/*) c'est es url que keyckloack va autoriser pour authentification 
3- create roles
4- create users with password(in credential) and roles (in role mapping)

users : youness1998: 123456 a le roles USER et ADMIN
        anouar:123456 a le role USER

first i have to run this in http client : POST http://localhost:8080/realms/ebank-realm/protocol/openid-connect/token
Accept: application/json
Content-Type: application/x-www-form-urlencoded

grant_type=password&client_id=slimi-client&username=youness1998&password=123456

then i take the access_token to send it in Bearer Token in postman to tesp my apis acording to user roles



POUR UTILISER AVEC ANGULAR :
1- initializeKeycloak dans app.module.ts en changent url: 'http://localhost:8080',
        realm: 'ebank-realm',
        clientId: 'slimi-client'

2- cree fichier html  silent-check-sso.html dans assets
3- importer KeycloakAngularModule dans appmodule
4- generer guard : ng g g guards/auth et le remplir
5- je vais a approuting puis dans les route que je veux les securiser je tap canActivate:[AuthGuard], data:{roles:['ADMIN']}
6- cree securityservice pour afficher les info des user connecter  ng g s services/security mais je vais pas utiliser je peut ignorer en commenatnt (@injectable)
7- pour voir user qui est connecter (ajouter du code dans ngOnInit dans AppComponent)
8- si j'inject un service dans constructeur et je le declare public alors je peux utiliser dans html fichier mais s'il est private je peut acceder seulement dans ts.     this.keycloakService.getUserRoles(); et dans html {{keycloakService.getUserRoles()| json}}


9- il est pratique d'utiliser securite front avec keycloak et back avec     @PreAuthorize("hasAuthority('ADMIN')") les deux sont tres pratique 

10- pour determiner le role de chaqe utilisateur quand je l'ai cree sans l'asigner un role : Realm setting ->User registration ->Assign role et je choisit le role

11- Docker:
        a- je vais lancer customer-service manual(pas avec docker compose)
        b- pour le front si je veux l'utiliser via docker compose il faut changer onLoad: 'check-sso', ---> onLoad: 'login-required', in appmodule et puis generer DIST apres je peux lancer docker copose up -d --build
        PS: n'oublier pas d'ajouter path dans Web origins  du client de keycloak
        c- docker compose up -d --build
        d- pour se connecter a keycloak: localhost:8080 pour user et password il fat les crees comme precedent ....
        e- pour se connecter a base de donnee de app: localhost:9999 (user: younes, 123456) ou (root, admin)
        f- pour se connecter a base de donnee postegres: localhost:5050 (youness@slimi.net, 123456) et puis cree connection (db: keycloak, user: keycloak, password: k1234,port: 5432 )
j'ai utiliser les volumes pour stocker les donnees et au ca ou j'ai suprimer ou stoper le container ne pas perdu du data.

le seul que je dois le lancer par button c'est customer-service
