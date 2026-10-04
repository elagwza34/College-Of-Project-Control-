# Sectors

Composition: [page.tsx](page.tsx). Routes: `/sectors`.

Purpose: gives the "Sectors" navigation group a destination of its own. The header menu
previously opened the sector list on hover while the word "Sectors" itself linked nowhere,
because no sector index page existed.

Sections:
- Sectors hero
- Sector directory (reads the sector records from the API, so editors can manage them)

The directory renders one card per active sector and links to that sector's own route
page. Section content is editable through the CMS in the usual way.
