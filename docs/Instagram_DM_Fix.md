# Instagram Direct Message - Opzioni di Implementazione

## Problema Attuale

Il link `https://ig.me/m/{username}?text={message}` **non sempre funziona** perché:

1. Instagram ha limitazioni API sui deep link
2. Il parametro `?text=` non viene sempre popolato automaticamente
3. Funziona solo su mobile con app Instagram installata

## Soluzioni Alternative (in ordine di affidabilità)

### ✅ **Opzione 1: Instagram Direct Link + Copy Fallback** (CONSIGLIATO)

**Pro:** Funziona sempre, esperienza fluida
**Come:**

- Copia automaticamente il messaggio negli appunti
- Apre profilo Instagram
- Utente incolla manualmente il messaggio

**Implementazione:**

```tsx
// 1. Copia il messaggio negli appunti
navigator.clipboard.writeText(message)

// 2. Apri il profilo Instagram
window.open('https://www.instagram.com/1908shop_/', '_blank')

// 3. Mostra toast con istruzioni
toast({
  title: '📋 Messaggio copiato!',
  description: 'Incolla il messaggio nella chat Instagram che si aprirà',
  duration: 5000,
})
```

### ⚠️ **Opzione 2: Instagram Direct URL (mobile-only)**

**Pro:** Link diretto alla chat
**Contro:** Non funziona su desktop, non popola messaggio

```
https://www.instagram.com/direct/t/{user_id}
```

Serve l'user ID numerico (non username), difficile da ottenere.

### 🔄 **Opzione 3: Hybrid - Try Deep Link + Fallback**

**Pro:** Tenta deep link, poi fallback automatico
**Implementazione:**

```tsx
// Prova deep link
const deepLink = `instagram://user?username=1908shop_`
window.location.href = deepLink

// Fallback dopo 1 secondo
setTimeout(() => {
  window.open('https://www.instagram.com/1908shop_/', '_blank')
}, 1000)
```

### 📱 **Opzione 4: QR Code con link**

**Pro:** Funziona perfettamente su mobile
**Contro:** Serve generare QR code

```tsx
// Genera QR con link: instagram://user?username=1908shop_
<QRCode value={instagramLink} />
```

## Raccomandazione Finale

**Implemento Opzione 1 (Copy + Open)** perché:

- ✅ Funziona su tutti i dispositivi
- ✅ Non richiede API o user ID
- ✅ UX chiara con feedback visivo (toast)
- ✅ Utente controlla cosa invia
- ✅ Non viola policy Instagram

---

## Username Instagram Corretto

Conferma quale usare:

- `1908shop_` (con underscore) ← vedo questo nel codice
- `1908.shop` (con punto) ← vedo questo nei link Footer/Homepage

**Quale è corretto?** Devo allineare tutto il codice.
