Att göra:
 - (X) lon, lat och cityName ska sparas i objekt som sparas i favoritesList[]
 - (X) data för favoriter i favoritesList[] ska presenteras på index.html vid window.onload
 - (X) favoriter ska kunna tas bort även från index.html, då ska favoriter presenteras på nytt
 - (X) bild ska ändras vid årstider
 - symboler ska ändras vid olika vädertillstånd
 - (X) bryt isär forecast.ts
 - lägg till JSDOC
 - (X) hantera felaktiga söktermer (användaren kan inte längre frisöka)
 - (X) lägga till fritext som beskriver väderförhållandet just nu


 Lista över väderförhållanden: (+ solupp/solned?)
1	Clear sky : Dag = brightness_7, Natt = brightness_2 ELLER bedtime
2	Nearly clear sky : Dag = brightness_7 + cloud, Natt = nights_stay
3	Variable cloudiness : cloud
4	Halfclear sky : cloud
5	Cloudy sky : cloud
6	Overcast : cloud
7	Fog : cloud(?)
8	Light rain showers : wash + cloud
9	Moderate rain showers : wash + cloud
10	Heavy rain showers : wash + cloud
11	Thunderstorm : flash_on
12	Light sleet showers : wash + cloud
13	Moderate sleet showers : wash + cloud
14	Heavy sleet showers : wash + cloud
15	Light snow showers : ac_unit + cloud
16	Moderate snow showers : ac_unit + cloud
17	Heavy snow showers : ac_unit + cloud
18	Light rain : wash + cloud
19	Moderate rain : wash + cloud
20	Heavy rain : wash + cloud
21	Thunder : flash_on
22	Light sleet : wash + cloud
23	Moderate sleet : wash + cloud
24	Heavy sleet : wash + cloud
25	Light snowfall : ac_unit
26	Moderate snowfall : ac_unit
27	Heavy snowfall : ac_unit
