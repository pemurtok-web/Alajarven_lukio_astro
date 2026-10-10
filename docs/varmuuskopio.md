# Varmuuskopio

Ohje Claudelle ja kehittäjälle. Sama järjestelmä kuin Astro + Sanity -sivustopohjassa
(pemurtok-web/astro-sanity-starter). Tässä sivustossa ei ole pohjan hätätilaa
(sivusto on rakennettu eri tavalla), mutta kopiosta voi palauttaa sisällön uuteen
Sanity-datasettiin: `npx sanity dataset import <kopio>.tar.gz <dataset>`.

## Miten varmuuskopio toimii

`.github/workflows/sanity-varmuuskopio.yml` ajetaan sunnuntaisin (ja käsin: Actions →
Sanity-varmuuskopio → Run workflow):

1. Sanity-datasetin export: tekstit, kuvat, tiedostot, myös luonnokset (`.tar.gz`).
2. Eheystarkistus (dokumenttien määrä, data.ndjson mukana).
3. (Palautustesti ajetaan vain sivustoissa, joissa on hätätila. Tässä ei ole.)
4. Tallennus GitHubiin (artefakti, 90 päivää).
5. Tallennus Google Driveen:
   - `Sanity-varmuuskopiot/<repo>/viikoittain/`: 90 päivää
   - `Sanity-varmuuskopiot/<repo>/kuukausittain/`: kuun 1. viikon kopio, pysyvästi

Epäonnistunut ajo → GitHub lähettää sähköpostin repon omistajalle.

### GitHub-salaisuudet (Settings → Secrets and variables → Actions)

| Nimi | Mikä | Mistä |
|---|---|---|
| `SANITY_AUTH_TOKEN` | Viewer-token | sanity.io/manage → projekti → API → Tokens → Add API token (Viewer), tai `npx sanity tokens create "Varmuuskopio" --role viewer --yes --json -p <id>` |
| `GDRIVE_TOKEN` | Google Driven rclone-token | sama kaikissa repoissa, ks. alla |
| `SANITY_PROJECT_ID` | projektin tunnus | ei tarvita, jos tunnus on kirjoitettu workflow'n kohtaan `PROJECT_ID` |

Muuttuja (Variables) `SANITY_DATASET` vain, jos dataset on muu kuin `production`.

Komentoriviltä (älä koskaan tulosta tokenia chattiin, putkita se suoraan):
```bash
gh secret set SANITY_AUTH_TOKEN -R <owner>/<repo>
rclone config show gdrive | sed -n 's/^token = //p' | gh secret set GDRIVE_TOKEN -R <owner>/<repo>
gh workflow run sanity-varmuuskopio -R <owner>/<repo> && gh run watch -R <owner>/<repo>
```

### Google Driven kytkentä (kerran käyttäjää kohden)

1. Asenna rclone (`brew install rclone`, Windows: `winget install Rclone.Rclone`).
2. `rclone config create gdrive drive scope=drive.file`. Selain aukeaa ja käyttäjä hyväksyy
   Google-kirjautumisen. `drive.file` = rclone näkee vain itse luomansa tiedostot, ei muuta Drivea.
   - Ilman selainta (esim. pilvi-istunto): komento tulostaa osoitteen `http://127.0.0.1:53682/auth?state=…`.
     Hae siitä Googlen kirjautumisosoite (`curl -s -o /dev/null -w '%{redirect_url}' <osoite>`)
     ja anna se käyttäjälle. Hyväksynnän jälkeen käyttäjän selain siirtyy osoitteeseen
     `http://127.0.0.1:53682/?state=…&code=…`, joka ei aukea. Käyttäjä kopioi sen osoitteen,
     ja se avataan koneella, jossa rclone odottaa (`curl '<osoite>'`).
3. Tarkista: `rclone mkdir gdrive:Sanity-varmuuskopiot && rclone lsd gdrive:`.
4. Aseta `GDRIVE_TOKEN` jokaiseen asiakasrepoon (yllä) ja käynnistä varmuuskopio kerran.

Token ei vanhene, kun sitä käytetään viikoittain. Jos ajo kaatuu virheeseen `invalid_grant`,
kytke uudelleen (`rclone config reconnect gdrive:`) ja päivitä `GDRIVE_TOKEN` kaikkiin repoihin.
