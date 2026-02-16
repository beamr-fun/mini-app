# Beamr Agent Context

## Product Definition
Beamr is a microsubscription mini app for Farcaster that allows users to split a pool based on their interactions on Farcaster.

## Primary Users
- Content curators
- Farcaster power users
- Streaming enthusiasts

## Core Concepts
- `BeamPool`: A Superfluid GDA Pool that a user uses to subscribe to users based on interactions (like, comment, etc).
- `Beam`: A single microsubscription; the substream of tokens from sender's pool to recipient.
- Product-facing flow language should be `Incoming` and `Outgoing`.
- `Protocol Fee`: protocol fee stream.
- `Boost`: when someone other than the pool creator distributes to that pool.

## Source Data
Primary sources include:
- Envio indexer
- Beamr contract
- Superfluid contracts
- Neynar data
- Beamr API data (including user preferences and pool preferences)

## Display Semantics
- `Net Monthly Rate = Incoming - Outgoing`
- `Incoming`: all beams currently streaming to the user.
- `Outgoing`: streams user sends to their pool plus collector pool.
- `Monthly Budget`: flow rate normalized to 30 days.

## Screen Semantics
- Home: landing page if user has a pool or incoming streams; displays outgoing and incoming flows.
- Settings: manage Neynar connection (for interaction-based pool updates) and update pools.
- Global:
  - `Leaderboard`: top distributors.
  - `Recent`: most recent interactions and pool share allocations.

## Collaboration Rules
- No commits without user review/approval first.
- For large changes, discuss before implementing.
- If information is insufficient to make a decision, ask questions.
