/**
 * Extrait le HTML standalone vers Markdown + images dans public/processus-scrum/
 * Usage : node scripts/extract-processus-scrum.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'process-scrum-generique-standalone.html');
const outDir = path.join(root, 'src/content/docs/processus-scrum');
const imgDir = path.join(root, 'public/processus-scrum');

const td = new TurndownService({
	headingStyle: 'atx',
	codeBlockStyle: 'fenced',
	bulletListMarker: '-',
});
td.addRule('imgAbsolute', {
	filter: 'img',
	replacement: (content, node) => {
		const src = node.getAttribute('src') || '';
		const alt = node.getAttribute('alt') || '';
		if (!src) return '';
		return `![${alt}](${src})`;
	},
});

function ensureDir(d) {
	fs.mkdirSync(d, { recursive: true });
}

function writeMd(relPath, title, description, bodyMd) {
	const front = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
---

`;
	const full = front + bodyMd.trim() + '\n';
	const filePath = path.join(outDir, relPath);
	ensureDir(path.dirname(filePath));
	fs.writeFileSync(filePath, full, 'utf8');
	console.log('written', relPath);
}

function htmlToMd(html) {
	if (!html) return '';
	return td.turndown(html).replace(/\n{3,}/g, '\n\n');
}

function main() {
	const html = fs.readFileSync(htmlPath, 'utf8');
	const $ = cheerio.load(html);

	ensureDir(imgDir);
	let imgCounter = 0;
	$('img').each((_, el) => {
		const src = $(el).attr('src');
		if (!src || !src.startsWith('data:')) return;
		const m = src.match(/^data:image\/([\w+]+);base64,(.+)$/);
		if (!m) return;
		let ext = m[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg');
		const buf = Buffer.from(m[2], 'base64');
		imgCounter += 1;
		const fname = `capture-${String(imgCounter).padStart(2, '0')}.${ext}`;
		fs.writeFileSync(path.join(imgDir, fname), buf);
		$(el).attr('src', `/processus-scrum/${fname}`);
		if (!$(el).attr('alt')) $(el).attr('alt', `Illustration ${imgCounter}`);
	});

	ensureDir(outDir);

	const sections = [
		{ id: 'contexte', file: 'contexte.md', title: 'Contexte', desc: 'À propos de ce document et cadre PU Platform.' },
		{ id: 'roles', file: 'roles.md', title: 'Rôles & responsabilités', desc: 'Rôles Scrum et responsabilités dans la PU Platform.' },
		{ id: 'quarter', file: 'quarter.md', title: 'Planification du quarter', desc: 'Découpage et planification du quarter.' },
		{ id: 'flow', file: 'flow.md', title: 'Le flow du sprint', desc: 'Organisation et déroulé du sprint.' },
		{ id: 'jira', file: 'jira.md', title: 'Retranscription dans Jira', desc: 'Alignement du processus avec Jira.' },
		{ id: 'metriques', file: 'metriques.md', title: 'Indicateurs & métriques', desc: 'Suivi et indicateurs.' },
	];

	for (const s of sections) {
		const block = $(`#${s.id}`);
		if (!block.length) {
			console.warn('missing section', s.id);
			continue;
		}
		const inner = block.html() || '';
		writeMd(s.file, s.title, s.desc, htmlToMd(inner));
	}

	/* Rituels : une page par carte */
	const ritualMap = [
		['ritual-refinement', 'refinement.md', 'Backlog refinement', 'Affiner et préparer le backlog avant le sprint.'],
		['ritual-sprint-planning', 'sprint-planning.md', 'Sprint Planning', 'Planification du sprint et engagement sur le backlog.'],
		['ritual-daily', 'daily.md', 'Daily', 'Synchronisation quotidienne de l’équipe.'],
		['ritual-retrospective', 'retrospective.md', 'Rétrospective', 'Amélioration continue en fin de sprint.'],
		['ritual-tech-guilde', 'tech-guilde.md', 'Tech guild / COP', 'Partage technique et communautés de pratiques.'],
		['ritual-biweekly', 'biweekly.md', 'Bi-weekly', 'Synchronisation bi-hebdomadaire.'],
		['ritual-synchro-roadmap', 'synchro-roadmap.md', 'Synchro roadmap', 'Alignement sur la roadmap produit.'],
		['ritual-synchro-run', 'synchro-run.md', 'Synchro RUN', 'Synchronisation opérationnelle RUN.'],
		['ritual-slack-day', 'slack-day.md', 'Slack day', 'Temps dédié pour réduction du bruit et focus.'],
	];

	for (const [cardId, fname, title, desc] of ritualMap) {
		const card = $(`#${cardId}`);
		if (!card.length) {
			console.warn('missing ritual', cardId);
			continue;
		}
		writeMd(`rituels/${fname}`, title, desc, htmlToMd(card.html() || ''));
	}

	const rituelsIntro = $(`#rituels`).clone();
	rituelsIntro.find('.ritual-card').remove();
	let introMd = htmlToMd(rituelsIntro.html() || '');
	introMd +=
		'\n\n## Liste des rituels\n\n' +
		ritualMap
			.map(([id, file, title]) => `- [${title}](./${file.replace('.md', '/')})`)
			.join('\n') +
		'\n';

	writeMd(
		'rituels/index.md',
		'Les rituels',
		'Vue d’ensemble et détail de chaque rituel Scrum / PU Platform.',
		introMd
	);

	console.log('Images extraites :', imgCounter);
}

main();
