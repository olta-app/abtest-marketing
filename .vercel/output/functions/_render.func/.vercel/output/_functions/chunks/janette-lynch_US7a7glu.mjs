import { d as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BTup8YuA.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"draft":false,"name":"Janette Lynch","title":"Senior Director","avatar":{"src":"https://images.unsplash.com/photo-1580489944761-15a19d654956?&fit=crop&w=280","alt":"Janette Lynch"},"publishDate":"2022-11-07 15:39"};
				const file = "/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/janette-lynch.md";
				const url = undefined;
				function rawContent() {
					return "";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
