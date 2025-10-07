Title: Product Requirements Document — 1908 Shop

1. Overview
   Scopo: sito vetrina per vendita di abbigliamento da calcio con carrello virtuale e completamento ordine via Instagram DM, senza pagamenti online.

Brand: “1908 Shop”, attività non ufficiale/privata, con tema visivo nero/rosso e accenti grigi per leggibilità.

Riferimento UX: scheda prodotto ispirata all’immagine fornita, da personalizzare per identità visiva unica.

2. Obiettivi e KPI
   Facilitare la scoperta prodotti e l’avvio conversazioni DM con CTA “Contatta su Instagram”.

KPI principali: CTR sul pulsante DM, numero di DM generati dal carrello, LCP mobile < 2,5 s su pagine elenco/prodotto.

3. Ambito e non‑obiettivi
   Ambito: catalogo prodotti, categorie (Mystery Box, Serie A, Serie B, Champions League, Maglie Retrò, Recensioni, Home), carrello virtuale con riepilogo e link DM precompilato.

Non‑obiettivi: gestione pagamenti online e account utente con credenziali in questa fase MVP.

4. Personas sintetiche
   Appassionati di calcio che cercano maglie attuali o retrò, desiderano personalizzazione nome+numero e comunicazione diretta tramite Instagram.

5. User stories principali
   Come visitatore, voglio filtrare per competizione/club/stagione per trovare rapidamente una maglia.

Come visitatore, voglio aggiungere personalizzazione nome+numero e vedere il prezzo aggiornato prima di contattare via Instagram.

Come gestore, voglio inserire/modificare prodotti e contenuti dal pannello CMS senza toccare codice.

6. IA e navigazione
   Voci top‑level: Home, Prodotti, Mystery Box, Maglie Retrò, Recensioni, Contatti.

Prodotti: sottocategorie per competizione (Serie A, Serie B, Champions League) con filtri per club, stagione, taglia e disponibilità.

7. Tipi di contenuto e modello dati (CMS)
   Product: id, slug, title, brand, season, competition, club, priceBase, images[], sizes[], patches[] {label, price}, customization {enableNameNumber, surchargeFixed: 10}, stockBySize, disclaimers, status.

Category: id, slug, title, type, ordering; relazione molti‑a‑molti con Product via riferimenti.

Review: id, author, rating, text, relatedProductId, publishedAt, status (moderata prima della pubblicazione).

8. Requisiti pagina prodotto
   Layout: gallery immagini a sinistra, dettagli a destra (titolo, codice, prezzo base, selettori taglia/patch, campi nome+numero, carrello e CTA DM), ispirato allo screenshot fornito.

Prezzo dinamico: l’inserimento di nome+numero aggiunge 10 € al prezzo base, più eventuali sovrapprezzi per toppe e varianti, con riepilogo aggiornato in tempo reale.

Stato: indicazioni su tempi di personalizzazione e disponibilità taglia; messaggi di validazione per lunghezza nome e range numero.

9. Carrello virtuale e handoff su Instagram
   Carrello lato client con persistenza locale e riepilogo di articoli, personalizzazioni e totale; nessun checkout/pagamento sul sito.

CTA “Contatta su Instagram” che apre una conversazione DM tramite link ig.me verso l’account del negozio.

Messaggio precompilato: utilizzare ig.me/m/<username> con parametro text URL‑encoded quando supportato, includendo elenco articoli, varianti, personalizzazioni e totale, con fallback a DM senza testo se il client ignora il parametro.

10. Regole prezzo e validazioni
    Sovrapprezzi configurabili: nome+numero (+10 € di default), patch torneo, manica lunga, ecc., cumulabili e definiti per prodotto o a livello globale.

Validazioni: nome max 12 caratteri, numero 0–99, compatibilità patch/competizione, taglia disponibile.

11. CMS e pannello redazionale
    CMS: TinaCMS/TinaCloud con schema tipizzato e editor visuale per contenuti Git‑based (MD/MDX/JSON) e anteprima live.

Flussi: bozza/pubblicato, campi guidati per prezzi/sovrapprezzi, upload immagini e ordinamento categorie, con interfaccia /admin.

12. Stack tecnico
    Frontend: Next.js con App Router + TypeScript, rendering SSG/ISR per liste e schede prodotto e ottimizzazione performance/SEO.

Stile: Tailwind CSS e componenti accessibili per tema nero/rosso con accenti grigi; immagini ottimizzate e lazy loading.

Motivazione: TinaCMS integra editing visivo e data layer per Next.js, riducendo la necessità di backend/server e accelerando l’MVP.

13. SEO, performance, accessibilità
    Metadata, Open Graph, sitemap, e build statiche con revalidazione periodica; immagini responsive e WebP dove possibile.

Obiettivo LCP mobile < 2,5 s, CLS < 0,1, interazioni accessibili con ARIA e focus visibili su tema scuro.

14. Analytics e tracciamento eventi
    Eventi: view_item, add_to_cart (virtuale), begin_checkout_DM, click_igme, con attribuzione basata su clic al link ig.me.

Dashboard: conversione DM per categoria/prodotto, tasso personalizzazioni, abbandono tra carrello e DM.

15. Legale e policy
    Disclaimers: “1908 Shop non è un negozio ufficiale; vendita da privato” visibile su footer e schede prodotto.

Privacy: nessuna raccolta di dati di pagamento sul sito; contatto e dati ordine transitano su Instagram DM secondo policy Meta e funzionalità ig.me.

16. Localizzazione e contenuti
    Lingua primaria: IT con possibilità di i18n futura; valute e formati europei per prezzi e taglie.

Contenuti editoriali: guida taglie, politiche resi/ritiro, FAQ personalizzazioni, recensioni moderate.

17. Roadmap e fasi
    MVP (3–4 settimane): Home, categorie per competizione, scheda prodotto con personalizzazione e prezzo dinamico, carrello virtuale, link ig.me, CMS per prodotti/categorie.

R1: recensioni, ricerca e filtri avanzati, landing “Mystery Box”, metriche DM e ottimizzazione immagini.

R2: i18n, collezioni stagionali, eventuali automazioni DM con strumenti terzi se necessario.

18. Criteri di accettazione (MVP)
    Un editor non tecnico può creare un prodotto, impostare prezzo e sovrapprezzi, pubblicarlo e vederlo correttamente in lista e scheda.

L’utente può aggiungere un prodotto con personalizzazione al carrello, vedere il totale aggiornato e aprire la conversazione Instagram tramite ig.me.

Le pagine principali passano controlli lighthouse base e rispettano obiettivi di performance e accessibilità definiti.

19. Note implementative ig.me
    Formato link: https://ig.me/m/<username>, opzionalmente con ?text=<messaggio_url_encoded> per precompilare il DM quando supportato dai client.

Fallback: se il parametro text non viene letto dal client, aprire comunque la chat e mostrare il riepilogo in pagina per copia manuale.

20. Alternative architetturali future
    Valutare Strapi per esigenze API‑centriche con database, relazioni complesse, RBAC avanzato o processi server‑side, self‑hosted o cloud.

Integrazione ibrida possibile: Next.js + Strapi per dati transazionali e Tina per contenuti editoriali file‑based.
