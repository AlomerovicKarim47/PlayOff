# Playoff

## How to run

1) Make sure you have postgresql installed and within it a user account with root/root username/password

2) RUN BACKEND: 

    go to play-back folder and run the following npm commands:
    
    npm install
    
    npm audit fix --force
    
    npm start

3) RUN FRONTEND: go to play-off and do the same as for the backend



## Inicijalni prijedlog teme
### Opis aplikacije
Playoff je aplikacija namijenjena sportistima i rekreativcima. Prilikom organizovanja prijateljskih susreta postoji mnogo problema koje nemaju sistematično rješenje. Često timovi igraju protiv istih timova i ne mogu naći nove adekvatne protivnike. Nekim timovima fali igrača dok također postoje igrači koji ne mogu naći tim. Ovom aplikacijom omogućavamo korisniku da nađe/formira tim i suigrače na njegovom nivou vještine, organizuje utakmice sa adekvatnim protivnicima te da ima pregled nad ostvarenim rezultatima u prošlim mečevima.

### Opis funkcionalnosti
Algoritam koji će pronalaziti protivnike koristit će kombinaciju informacija unesenih od strane korisnika te ostvarenih rezultata u prijašnjim mečevima da formira relativno preciznu sliku o sportskim sposobnostima svakog korisnika i upari ga sa drugim igračima istog nivoa, eliminirajući standardnu zamisao najboljih i najslabijih igrača. Pored ovoga, korisnici će također imati opciju da zakažu prijateljske susrete koji se neće rangirati, što bi pružilo priliku za standardne, opuštene susrete i zamijenilo trenutni način okupljanja ekipa slanjem velikog broja poruka na raznim messaging platformama.

Svaki korisnik će imati profil gdje će biti prikazane najvažnije informacije i ostvareni rezultati. Playoff će prvobitno podržavati pet sportova – fudbal, košarka, odbojka, tenis i trčanje, te će se izgraditi framework preko kojeg će se aplikacija dalje moći proširiti.

### Tehnologije
Frontend se planira realizovati koristeći React, backend preko node.js, dok će se za bazu podataka koristiti PostgreSQL.
