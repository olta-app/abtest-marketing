import { d as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_BTup8YuA.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"draft":false,"name":"Robert Palmer","title":"Marketing Engineer","avatar":{"src":"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&fit=crop&w=280","alt":"Robert Palmer"},"publishDate":"2022-11-09 15:39"};
				const file = "/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/robert-palmer.md";
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
