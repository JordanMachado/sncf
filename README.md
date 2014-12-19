NCF

###Installation

Type this in your command line interface:

``` $ npm i && bower i ```

#Commands

```$ gulp watch ```

Launch project in browser and watch file.

```$ gulp ```

Will create a build of the sncf project in __www__ folder.

###Schémas de modélisation du ou des processus de l'application.

##Arborescence

- App.js
    - Navigation.js *module de gestion de la navigation*
    	- views
    	- templates
    - Storytelling.js *module pour l'affichage du storytelling*
    	- views
    	- templates

    - RushHourTool.js *module gérant l'outil des heures de pointe*
        - views
    	- templates
    	- collections
- Utils
	- asEvent.js
	- Backbone.View.Resize.js
	- DataManager.js

##Navigation.js

Permet à l'utilisateur de se situer dans l'application.

##Storytelling.js

Au lancement de l'application le storytelling commence. Puis disparaît à la fin de la vidéo.

##RushHourTool.js

Cet outil permet à l'utilisateur d'obtenir des informations sur l'affluence d'une gare.

### Les étapes
- Sélection de la ligne
- Sélection de la zone
- Sélection de la gare
- Visualisation de l'affluence d'une gare pour une journée


#Project SNCF

###Recherches techniques permettant la mise en oeuvre de la conception graphique.
========

##Workflow

J'ai utilisé __Yeoman__ pour la génération de la structure de mon application (generator gulp web-app).

Pour l'automatisation des tâches j'ai utilisé __Gulp__ permettant de faire du multi-tâches à l'instar de Grunt.

Enfin la mise à jour de mon code sur le serveur et le versionning est géré par la technologie **Git** via la plate-forme __Github__.

##Technologie

J'ai orienté ma recherche sur des technologies permettant une grande flexibilité tout en ayant une structure solide similaire au __MVC__. J'ai donc opté pour __Marionettejs__ une 'extension' de __Backbonejs__ permettant de créer une structure __MVVM__.Marionette permet d'éviter certaines tâches redondantes dans le développement d'une application en Backbone et dispose aussi de nombreuses fonctionnalités retrouvées sur de nombreux design pattern d'application Backbone. Marionette permet notamment de diviser son application en plusieurs mini applications appelées 'Modules' ainsi qu'une gestion des vues plus complexes (ItemView, CollectionView, CompositeView).

Pour les animations j'ai utilisé les librairies de __Gsap__ permettant une gestion des animations poussées et performantes.

La gestion des données est gérée en interne à l'application via des fichiers Json (récupérations des lignes, des zones et gares).

Pour faciliter la lisibilité du code j'ai utilisé __Requirejs__ qui permet de créer des modules ayant des dépendances ceci évitant les 'raised condition' et les variables globales.


Pour la détection des différentes fonctionnalités supportées par les navigateurs j'ai utilisé __ModernizR__. Un outil très utile pour développer une expérience cross plate-formes.

##Liste

- Backbone
- Marionette
- Modernizr
- Underscore
- JQuery
- FastClick
- Gsap
- CountUp
- Requirejs
- Gulp



![I see you](http://machadojordan.fr/screenshots/TROLL.jpg "I see you")
