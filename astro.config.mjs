// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Pages projet GitHub : https://mbessan95.github.io/sm_wiki/
// Si vous renommez le dépôt, mettez à jour `site`, `base` et `editLink.baseUrl`.
// En `npm run dev`, base vide → http://localhost:4321/ (build & preview gardent /sm_wiki).
const siteBase = process.env.npm_lifecycle_event === 'dev' ? '' : '/sm_wiki';

export default defineConfig({
	site: 'https://mbessan95.github.io',
	base: siteBase,
	integrations: [
		starlight({
			title: 'Documentation équipe',
			description:
				'Base documentaire partagée — organisation, processus et guides.',
			social: {
				github: 'https://github.com/mbessan95/sm_wiki',
			},
			editLink: {
				baseUrl: 'https://github.com/mbessan95/sm_wiki/edit/main/',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [{ label: 'Exemple de guide', slug: 'guides/example' }],
				},
				{
					label: 'Référence',
					autogenerate: { directory: 'reference' },
				},
			],
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Français',
					lang: 'fr',
				},
			},
		}),
	],
});
