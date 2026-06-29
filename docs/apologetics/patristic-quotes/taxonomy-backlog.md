# Patristic Quotes Taxonomy Backlog

Items from the [subtopic analysis](../../../data/patristic_quotes_complete.csv) that were **not** addressed in the Part 1–3 taxonomy migration (March 2026). Use this as a queue for future cleanup.

## Data hygiene

| Item | Detail |
|---|---|
| **FC028 mis-tag** | Tertullian on the Holy Spirit as Christ’s “deputy” is tagged `Sola Scriptura`; the argument is pneumatological, not Scripture-sufficiency. Consider `Christ the Sole Mediator` or a dedicated Spirit subtopic. |
| **Church Practice orphan topic** | FC035 (`Canonical Hours`) is the sole quote under `Church Practice`. Consider moving to `Fasting` or `Scripture & Canon` depending on browse intent. |
| **Sanity re-sync** | After CSV changes, re-run `yarn migrate:patristic-quotes` (or equivalent) so Sanity documents pick up new subtopics, topics, and positions. |
| **Slug regeneration** | Quote slugs are built from primary subtopic; merged/renamed subtopics may change URLs for affected quotes. Audit `/apologetics/quotes/[slug]` redirects if needed. |

## Subtopic merge candidates (not done)

### Sign of the Cross

Merge into **`Power Through Christ's Name`** (or a single parent label):

- `Power in Faith not Sign` (FC186)
- `Cross Efficacious` (FC189)

Already aliased: `Cross + Invocation → Power Through Christ's Name`.

### Invocation of Saints (fine-grained labels retained)

These were **not** folded into `Invocation & Intercession` or `Saint & Idol Worship`:

| Subtopic | Count | Notes |
|---|---|---|
| `Commemoration vs. Invocation` | 2 | Distinct Perkins rebuttal: petition *to God* mentioning saints vs. direct invocation |
| `Uncertainty of Intercession` | 4 | Agnosticism / saints’ lack of earthly knowledge |
| `Merits of Saints` | 2 | Roman Catholic counter-evidence (FC072, RC058) |

**Suggested cross-tags** (add secondary subtopics for discoverability):

| ID | Current | Consider adding |
|---|---|---|
| FC036 | `Saint & Idol Worship` | — (already merged from Marian Invocation) |
| FC039 | `Saint & Idol Worship` | — |
| FC045 | `Commemoration vs. Invocation` | `Sacraments`, `Spiritual Language` (eucharistic context) |
| FC065–FC068 | `Invocation & Intercession` | `Saint & Idol Worship` |
| FC070–FC071 | `Uncertainty of Intercession` | `Saint & Idol Worship` |
| FC073 | `Saint & Idol Worship` | `Merits of Saints` (quote *is* an erroneous invocation example) |
| FC171 | `Souls Cannot Return` | `Uncertainty of Intercession` (Augustine hedging on dead appearing) |

### Purgatory & Afterlife (partial merge only)

Merged into **`Purgatory`**: `State of the Dead`, `Limbus Patrum`, `Purgatorial Fire`, `Against Purgatory`.

**Still separate:**

| Subtopic | Count | Notes |
|---|---|---|
| `Souls Cannot Return` | 5 | Distinct argument from intermediate-state / purgatory debate |
| `Pagan Antecedents` | 1 | FC193 — philosophical source of purgatorial ideas |

**Suggested cross-tags / nuance:**

| ID | Issue |
|---|---|
| FC055, FC056 | Intermediate-state quotes now `Purgatory`; could also carry `Limbus Patrum` nuance via notes |
| FC063 | `Purgatory` (anti-) — directly rebuts inter-death purgatorial fire |
| FC194 | `Purgatory` (pro-, Position: Roman Catholic) — Augustine’s fire is at *final judgment*, not Roman inter-death purgatory. Consider subtopic **`Eschatological Purging`** to distinguish |

### Lord's Supper / Sacraments

Merged **`Figurative Interpretation`**, **`Spiritual Sacrifice`**, **`Spiritual Eating`** → `Sacraments` + `Spiritual Language`.

**Still separate:**

| Subtopic | Count | Notes |
|---|---|---|
| `Against Transubstantiation` | 2 | Positive “real presence without transubstantiation” argument |
| `Christ's Body in One Place` | 3 | Local presence / against ubiquity — supports but distinct from figurative reading |
| `Efficacy of Sacraments` | 3 | RC038–RC040 — grace from Spirit, not element |

**Suggested cross-tags:**

| ID | Consider adding |
|---|---|
| FC102, FC103 | `Sacraments`, `Spiritual Language` |
| FC112–FC114 | `Sacraments`, `Spiritual Language` |
| FC115, FC116 | `Spiritual Language` (already have `Sacraments` if figurative path applied) |
| RC038–RC043 | `Sacraments`, `Spiritual Language` where figurative register applies |

### Papacy & Church Governance

Merged into **`Papal Supremacy`**: `Matthew 16:18`, `Papal Primacy`, `Apostolic Equality`, `Against Universal Bishop`, `Against Papal Jurisdiction`.

**Still separate:**

| Subtopic | Count |
|---|---|
| `Papal Hyperbole` | 3 |
| `Imperial Convocation of Councils` | 6 |
| `Apostolic Power` | 1 |
| `Antichrist` | 1 |

**Suggested cross-tags:**

| ID | Consider adding |
|---|---|
| FC096, FC097 | `Papal Supremacy` (hyperbole cited as evidence for primacy claims) |
| FC100 | `Papal Supremacy` (Peter’s chair = doctrine) |
| FC077 | `Papal Supremacy` (no primacy of power) |

### Christology

| ID | Current | Suggested cross-tag |
|---|---|---|
| FC022, FC024 | `Christ the Sole Mediator` | `Divinity of Christ` |
| FC023 | `Divinity of Christ` | `Christ the Sole Mediator` |
| FC057, FC058 | `Purgatory` (was Limbus Patrum) | Topic could remain `Christology` for descent doctrine |

### Images, Angels, Prayer-adjacent

| Subtopic | Count | Status |
|---|---|---|
| `Against Image Worship` | 9 | Unchanged — alias map still canonicalizes old image labels here |
| `Nine Choirs` | 2 | Unchanged |
| `Implicit Faith` | 1 | RC052 — relates to `Tradition vs. Scripture` |

### Marriage (partial)

Replaced old labels with **`Marriage`** / **`Virginity`**. No merge of opposing-position labels (by design — `Position: Roman Catholic` filtering depends on separate quotes).

## Multi-tagging expansion (Invocation & Purgatory clusters)

The migration added cross-tags for Scripture & Canon and Justification as specified. The **Invocation of Saints** and **Purgatory** clusters above remain the highest-value next pass for multi-tagging.

## Duplicate policy reference

Removed in migration (kept more extensive FC-series entries):

| Removed | Kept | Reason |
|---|---|---|
| RC015 | FC195 | FC195 has fuller source metadata (Ephesians ch. 1, Forged Catholicism) |
| RC055 | FC191 | FC191 has unbracketed full quote text |
| RC056 | FC192 | FC192 has complete quote without truncation |

## Current taxonomy snapshot (post-migration)

- **287 quotes** (was 290)
- **49 unique subtopics** (was 67)
- **81 quotes** with multiple subtopics (was 1)
- **`Salvation` topic eliminated** — consolidated into `Justification` (55 quotes)
- **FC254–FC290** — all assigned `Position: Reformed`

Run `npx tsx scripts/applyPatristicQuoteTaxonomy.ts` is idempotent only before manual CSV edits; for re-application from scratch, restore CSV from git and re-run.
