# Instagram DM Integration - Implementazione Finale

**Status**: ✅ Implementato  
**Data**: 2025-01-07  
**Approccio**: ig.me URL con messaggio precompilato

## Come Funziona

### Flusso Utente

1. **Utente clicca** "Invia ordine su Instagram" nel carrello
2. **Sistema apre** `https://ig.me/m/1908shop_?text=<messaggio_codificato>`
3. **Instagram si apre** (app su mobile, web su desktop)
4. **Messaggio è già inserito** nel composer della chat
5. **Utente preme "Invia"** per completare l'ordine

### Vantaggi ✅

- **Universale**: Funziona su mobile (app) E desktop (web)
- **Messaggio precompilato**: Cliente non deve copiare/incollare
- **UX semplice**: Un click → Instagram si apre → Premi invia
- **Affidabile**: Non servono permessi clipboard o API
- **Nativo Instagram**: Pattern URL ufficiale

### Limitazioni ⚠️

- L'utente deve premere manualmente "Invia" (requisito sicurezza Instagram)
- Richiede sessione Instagram attiva
- Lunghezza messaggio limitata a ~2000 caratteri (sufficiente per ordini)

## Codice

### Posizione

**File**: `src/components/cart/CartDrawer.tsx`

### Implementazione

```typescript
const handleSendDM = () => {
  // Track analytics
  trackBeginCheckout({
    totalValue: totalPrice,
    itemCount: items.length,
    items: items.map((item) => ({ ... })),
  })

  trackInstagramDMClick({
    totalValue: totalPrice,
    itemCount: items.length,
  })

  const message = generateDMMessage() // Già URL-encoded

  // Apri Instagram DM con messaggio precompilato
  const instagramDMUrl = `https://ig.me/m/${getInstagramUsername()}?text=${message}`
  window.open(instagramDMUrl, '_blank')

  // Mostra conferma
  toast({
    title: '📱 Apertura Instagram...',
    description: 'Premi Invia per completare l\'ordine',
    duration: 4000,
  })
}
```

### Generazione Messaggio

```typescript
const generateDMMessage = () => {
  let message = '🛒 *NUOVO ORDINE 1908 SHOP*\n\n'

  items.forEach((item, idx) => {
    message += `*${idx + 1}. ${item.name}*\n`
    message += `   Taglia: ${item.size}\n`
    if (item.customization) { ... }
    if (item.patches) { ... }
    message += `   Prezzo: €${item.totalPrice.toFixed(2)}\n\n`
  })

  message += `*Totale: €${totalPrice.toFixed(2)}*\n\n`
  message += "Attendo conferma per procedere con l'ordine 👍"

  return encodeURIComponent(message)
}
```

## Configurazione

### Environment Variable

**File**: `.env.local`

```bash
NEXT_PUBLIC_INSTAGRAM_USERNAME=1908shop_
```

**Fallback**: Se la variabile d'ambiente manca, usa `1908shop_` (hardcoded in `src/lib/instagram.ts`)

### Utility

**File**: `src/lib/instagram.ts`

```typescript
export const getInstagramUsername = () => process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || '1908shop_'

export const getInstagramProfileUrl = () => `https://instagram.com/${getInstagramUsername()}`
```

## Testing

### Desktop

1. Aggiungi prodotti al carrello
2. Clicca "Invia ordine su Instagram"
3. **Atteso**: Instagram Web si apre in nuova tab con messaggio pronto
4. Clicca "Invia" in Instagram

### Mobile

1. Aggiungi prodotti al carrello
2. Tap "Invia ordine su Instagram"
3. **Atteso**: Instagram app si apre con messaggio precompilato
4. Tap bottone invia

### Formato Messaggio

```
🛒 *NUOVO ORDINE 1908 SHOP*

*1. Inter 2023/24 Home*
   Taglia: L
   Nome: LAUTARO
   Numero: 10
   Patch: Serie A, Coppa Italia
   Prezzo: €89.99

*Totale: €89.99*

Attendo conferma per procedere con l'ordine 👍
```

## Analytics

Eventi tracciati:

- `begin_checkout`: Quando utente clicca pulsante invio
- `instagram_dm_click`: Quando URL Instagram viene aperto
- Totale ordine e numero articoli inclusi nei parametri

## Compatibilità Browser

| Browser | Desktop | Mobile |
| ------- | ------- | ------ |
| Chrome  | ✅      | ✅     |
| Safari  | ✅      | ✅     |
| Firefox | ✅      | ✅     |
| Edge    | ✅      | ✅     |
| Opera   | ✅      | ✅     |

## Alternative Considerate

1. ❌ **ig:// deep link**: Rimosso da Instagram
2. ❌ **instagram:// scheme**: Non affidabile, solo mobile
3. ✅ **ig.me URL**: SCELTO - funziona ovunque
4. ❌ **Clipboard + incolla manuale**: Troppi step, UX scadente

## Future Enhancements

- [ ] Webhook conferma ordine (richiede Instagram Business API)
- [ ] Sistema tracking ordini in pannello admin
- [ ] Opzione "Reinvia ordine" per tentativi falliti
- [ ] Alternativa WhatsApp per migliore integrazione API

---

**Note**:

- URL ig.me richiedono username (non user ID)
- Encoding messaggio gestito da `generateDMMessage()`
- Toast notifications guidano utente nel processo
