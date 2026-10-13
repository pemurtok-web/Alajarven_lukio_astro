# Netlify-julkaisu ja Sanity

Ohje Claudelle ja kehittäjälle. Lue ennen kuin lisäät webhookeja, build hookeja tai
muutat julkaisutapaa.

## Älä lisää Sanity → Netlify build -webhookia

Sivusto renderöidään palvelimella (`output: 'server'` ja `useCdn: false` tiedostossa
`astro.config.mjs`). Jokainen sivulataus hakee sisällön Sanitystä tuoreeltaan, joten
Studiossa julkaistu muutos näkyy sivulla heti **ilman uutta buildia**.

Sanityn webhook, joka kutsuu Netlifyn build hookia, on siis tässä sivustossa turha.
Netlifyn krediittipohjaisessa hinnoittelussa se on myös kallis: jokainen
tuotantodeploy maksaa 15 krediittiä, ja webhook laukaisi deployn jokaisesta
Studio-tallennuksesta. Lokakuussa 2026 tämä kulutti lähes koko Personal-plaanin
1 000 krediitin kuukausikiintiön.

Poistettu 13.10.2026:
- Sanity (projekti `8idyoy2x`) → API → Webhooks: "Netlify Automaatti-julkaisu"
- Netlify (alajarven-lukio-dev) → Project configuration → Developer settings →
  Continuous deployment → Build hooks: "Sanity Studio Auto Publish" ja "Sanity-päivitys"

## Mikä maksaa krediittejä

- Tuotantodeploy (push `main`-haaraan tai build hookin kutsu): 15 krediittiä.
- Deploy Previewt ja branch deployt: 0 krediittiä.
- Lisäksi liikenne, web-pyynnöt ja palvelinfunktioiden laskenta.

Kokoa koodimuutokset muihin haaroihin ja yhdistä `main`-haaraan harvemmin. Pelkät
dokumentaatiomuutokset voi pushata ilman buildia lisäämällä commit-viestiin
`[skip netlify]`.

## Jos sivu joskus muutetaan staattiseksi

Jos sivuja muutetaan esirenderöidyiksi (`prerender = true` tai `output: 'static'`),
sisältö jäätyy buildin hetkeen. Silloin tarvitaan jokin päivitystapa. Silloinkin
suosi ISR:ää tai on-demand-revalidointia ennen build-webhookia, ja jos webhook on
pakko lisätä, rajaa se vain julkaisuihin (ei luonnoksiin:
`!(_id in path("drafts.**"))`) ja vain sivulla näkyviin dokumenttityyppeihin.
