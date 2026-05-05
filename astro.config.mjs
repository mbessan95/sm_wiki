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
					label: 'Processus Scrum PU',
					items: [
						{ label: 'Vue d’ensemble', slug: 'processus-scrum' },
						{ label: 'Contexte', slug: 'processus-scrum/contexte' },
						{ label: 'Rôles', slug: 'processus-scrum/roles' },
						{ label: 'Quarter', slug: 'processus-scrum/quarter' },
						{ label: 'Flow du sprint', slug: 'processus-scrum/flow' },
						{
							label: 'Rituels',
							items: [
								{ label: 'Vue d’ensemble', slug: 'processus-scrum/rituels' },
								{ label: 'Refinement', slug: 'processus-scrum/rituels/refinement' },
								{ label: 'Sprint Planning', slug: 'processus-scrum/rituels/sprint-planning' },
								{ label: 'Daily', slug: 'processus-scrum/rituels/daily' },
								{ label: 'Rétrospective', slug: 'processus-scrum/rituels/retrospective' },
								{ label: 'Tech guild', slug: 'processus-scrum/rituels/tech-guilde' },
								{ label: 'Bi-weekly', slug: 'processus-scrum/rituels/biweekly' },
								{ label: 'Synchro roadmap', slug: 'processus-scrum/rituels/synchro-roadmap' },
								{ label: 'Synchro RUN', slug: 'processus-scrum/rituels/synchro-run' },
								{ label: 'Slack day', slug: 'processus-scrum/rituels/slack-day' },
							],
						},
						{ label: 'Jira', slug: 'processus-scrum/jira' },
						{ label: 'Métriques', slug: 'processus-scrum/metriques' },
					],
				},
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
