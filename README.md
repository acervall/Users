## Explicit typning

Jag använder mig utav explicit typing i min AuthForm komponent pga jag har skapat den för att kunna använda den på flera olika ställen och beroende på vilken funktion den ska köra behövs lite olika typer av interfaces.

Till exempel jag använder den vid Signup komponenten och då är det <NewUser> som SignupUser behöver så då skickas den med, jag använder mig av samma vid Singin och då är det istället <IdentifierPassword> som LoginUser behöver.

Så beroende på vilken funktion jag skickar in behöver den olika typer av props och därför använder jag mig utav explicit typing för att den ska fungera korrekt för flera olika tillfällen.
