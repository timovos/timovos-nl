---
title:  "Code ontwikkelen bij DBK: Git basis en continuous deployment"
date:   2017-12-07 12:38:56
categories: []
tags: [Git, GitLab, Continuous deployment, Push, Pull, Deploy, Deployment, Commit, Branch, Server, Webserver, Development, Production]
---
In dit (technische) blog geef ik inzicht in de werkwijze van begin tot eind van de ontwikkelaars bij DBK. Ontwikkelaars, maar soms ook designers, maken gebruik van Git om samen te werken bij de opbouw van code.

Artikel geschreven voor [DBK](https://dbk.nl).

Bij DBK maken we gebruik van _continuous deployment_ (CD). Dit stelt de ontwikkelaars in staat nieuwe code op webservers te plaatsen zonder daadwerkelijk verbinding te hoeven maken met deze servers.

Git ([git-scm.com](https://git-scm.com)) is een versiebeheersysteem en dient geïnstalleerd te worden op een server. De broncode (bestanden) van een project staat op deze server. Medewerkers die toegang hebben tot deze server (met een gebruikersnaam en wachtwoord of een SSH-key) kunnen deze code naar hun pc of laptop halen, wijzigingen maken en weer "uploaden" naar de server. Het ophalen van deze wijzigingen heet een _pull_.

![Een typische pull in de projectmap](/images/2017-12-07-ci/Selection_443.png) Een typische pull in de projectmap

Aan elke wijziging die een medewerker maakt geeft hij of zij een betekenisvol bericht mee. Deze wijziging, met daarbij dat bericht, heet een _commit_. Deze commit kan alleen, of met meerdere commits tegelijk _gepusht_ worden. Mocht er een andere collega wijzigingen gemaakt hebben aan dezelfde bestanden in tussentijd (dus tussen een pull en een push), dan treedt er een _merge_ op. De bestanden moeten samengevoegd worden. Na het samenvoegen kan de merge gecommit en gepusht worden.

De geschiedenis van de code in Git kun je zien als een boom. Een boom heeft een stam en vele vertakkingen. In Git heten deze vertakkingen _branches_. De stam van de boom noemen we de _default_ (of _master_) branch. Zo kun je als medewerker voor een bepaalde (nieuwe) functionaliteit een nieuwe branch maken zodat je je andere collega's niet in de weg zit. Is je functionaliteit klaar? Dan merge je je branch naar de default branch, en kunnen je collega's ook genieten van jouw werk.

![Visualisatie van de Git-boom. Bron: drupal.org](/images/2017-12-07-ci/repositorydiagram.png) Visualisatie van de Git-boom. Bron: drupal.org

Voor het visueel inzichtelijk maken van projecten gebruiken we bij DBK de software _GitLab_ ([about.gitlab.com](https://about.gitlab.com/)). GitLab draait op dezelfde server als waar Git geïnstalleerd is. GitLab maakt alle projecten die in Git staan inzichtelijk en toont alles wat met deze projecten te maken heeft: bestanden, commits, medewerkers, en nog veel meer. GitLab wordt (mede) ontwikkeld door een Nederlander (Sytse Sijbrandij).

![Homepage van GitLab](/images/2017-12-07-ci/Selection_442.png) Homepage van GitLab

Wat GitLab, onder andere, mogelijk maakt is het automatisch plaatsen van code op test-, acceptatie- en productieomgeving. Bij DBK heeft elke omgeving een eigen branch. De ontwikkel- of testomgeving is de default branch, en daarbij bestaat een _production_ branch.

Door gebruik te maken van de _Continuous Integration_ en _Continuous Deployment_ mogelijkheden van GitLab, kunnen we ervoor zorgen dat zodra er gepusht wordt naar een bepaalde branch, deze code vrijwel direct op de server komt te staan. Push je dus bijvoorbeeld naar de master (ontwikkel) branch, dan komt de code direct op de ontwikkelserver te staan en kan de klant direct testen. Push je naar de production branch, dan komt de code direct op de productie-server te staan, en staat de nieuwe code live.

Het opleveren van broncode op ontwikkelomgeving of productieomgeving heet _deployment_of een _deploy_.

Voor een oplevering op productie is overigens nog wel een handmatige actie ("druk op de knop") nodig om het op te leveren. Dit om te voorkomen dat als er per ongeluk gepusht wordt naar de productie branch, dit ook direct live staat.

Er mag nooit direct gepusht worden naar de productie branch. Dit moet altijd gedaan worden middels een merge vanuit de master (development) branch naar de productie branch. Dit kan ook gedaan worden met een merge-request (een verzoek tot mergen), waarbij elke collega bij DBK de merge kan goedkeuren voordat de code op productie geplaatst wordt.

![Pipelines](/images/2017-12-07-ci/Selection_444.png) Overzicht van alle pushes en mogelijkheid om bij de production branch handmatig op te leveren

GitLab leest informatie over het automatisch opleveren van code op test-, acceptatie- of productieomgeving uit een bestand met bestandsnaam ".gitlab-ci.yml". In dit bestand staan regels waardoor GitLab weet wat het moet doen met welke branch. Ook wordt beschreven naar welke map op de server de bestanden moeten komen te staan en of de oplevering handmatig gebeurt of automatisch.

De zogeheten GitLab _runner_ zorgt ervoor dat het .gitlab-ci.yml bestand wordt uitgelezen en verwerkt.

![Gitlab-ci.yml](/images/2017-12-07-ci/Selection_447.png) Inhoud van een .gitlab-ci.yml bestand

Door gebruik te maken van continuous deployment, is er geen noodzaak meer om direct verbinding te maken met de verschillende webservers van DBK. De handmatige stap van het plaatsen van een nieuwe versie van de code op de server hebben we er tussenuit gehaald. Dit scheelt op een werkdag veel tijd, en bij nauwe samenwerking waarbij de klant als product owner in een scrum-team een actieve rol speelt, kan de klant direct zien wat er gewijzigd is, en of deze wijzigingen naar wens zijn doorgevoerd.

Met dit blog geef ik een klein beetje inzicht in de dagelijkse werkwijze van ontwikkelaars bij DBK. Mocht je nog vragen of opmerkingen hebben naar aanleiding van dit blog, kun je altijd contact opnemen met mij: timo[at]dbk.nl.
