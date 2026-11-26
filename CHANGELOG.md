# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Every merge from `dev` into `main` is a release with its own version tag.

## [Unreleased]

### Added

- Car theory exam page: which language you take the exam in (English, extra time, interpreter rules) (#73).
- Information pages end with links to prices, the expats page and the trial lesson (#73).

### Changed

- Amsterdam page title starts with "Rijschool Amsterdam", like the other city pages (#73).

### Fixed

- Review score on the site and in the structured data matches the Google Business Profile again (4.8 from 25 reviews), with a decimal comma in Dutch.
- Applying for your licence: the CBR deadlines (1 year health statement, 3 years proficiency statement) replace the incorrect 1.5 years (#73).

## [1.0.0] - 2026-11-25

First tagged release. It covers everything that went live since the first release in March 2026 (#49).

### Added

- Dutch and English site with translated URLs, hreflang and a first-visit language choice (#50, #65).
- Contact form and sign-up flow with confirmation emails, auto-reply, lead source and Telegram notifications (#50, #52, #61, #63).
- City pages for the service area with the nearest CBR exam centres (#52, #61, #66).
- Service pages, including rijtest, opfriscursus and driving lessons for expats (#52, #63, #65).
- Information pages about the theory exam, booking it, authorising the driving school and applying for the licence (#52).
- Price page with packages, single rates and a promo popup (#61, #65).
- Structured data, sitemap, robots.txt, llms.txt and Markdown versions for AI agents (#52, #66).
- IndexNow ping after every production deploy (#69).
- CI with lint, tests, build, Lighthouse 90+ on every category and axe accessibility checks on every page; Stylelint for CSS (#52, #71).

### Changed

- Homepage title and H1 lead with the brand and main product; one host (`www`) for the whole site (#68).
- New header and cleaner buttons (#61, #65).
- Zaandam offers manual lessons only (#64).
- Mobile performance: subset fonts, responsive AVIF/WebP images, a smaller JavaScript bundle and GSAP loaded after the first paint (#70).

### Fixed

- Check mark size and promo line on the package cards (#62).
- Accessible names of the language and menu buttons, and the contrast issues found by axe (#70).

[Unreleased]: https://github.com/Recss68/rijschool-all-drive/compare/v1.0.0...dev
[1.0.0]: https://github.com/Recss68/rijschool-all-drive/releases/tag/v1.0.0
