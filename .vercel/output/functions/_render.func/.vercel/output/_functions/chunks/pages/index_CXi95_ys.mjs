/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, f as renderSlot, g as renderComponent } from '../astro_BTup8YuA.mjs';
import 'kleur/colors';
import { a as $$Container, $ as $$Layout } from './404_DDuF96dY.mjs';
import 'clsx';
import { $ as $$Icon } from './contact_CmyWxLp-.mjs';

const $$Astro$4 = createAstro("https://astroship.web3templates.com");
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Link;
  const {
    href,
    block,
    size = "lg",
    style = "primary",
    class: className,
    ...rest
  } = Astro2.props;
  const sizes = {
    lg: "px-5 py-2.5",
    md: "px-4 py-2"
  };
  const styles = {
    outline: "bg-white border-2 border-black hover:bg-gray-100 text-black ",
    primary: "bg-black text-white hover:bg-gray-800  border-2 border-transparent",
    inverted: "bg-white text-black   border-2 border-transparent",
    muted: "bg-gray-100 hover:bg-gray-200   border-2 border-transparent"
  };
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${spreadAttributes(rest)}${addAttribute([
    "rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200",
    block && "w-full",
    sizes[size],
    styles[style],
    className
  ], "class:list")}>${renderSlot($$result, $$slots["default"])} </a>`;
}, "/Users/conormurphy/Documents/GitHub/abtest-marketing/src/components/ui/link.astro", void 0);

const $$Astro$3 = createAstro("https://astroship.web3templates.com");
const $$Cta = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Cta;
  return renderTemplate`${maybeRenderHead()}<div class="bg-black p-8 md:px-20 md:py-20 mt-20 max-w-5xl rounded-lg flex flex-col items-center text-center"> <h2 class="font-serif text-amber-50 text-4xl md:text-6xl tracking-tight">
Need more? Hire me.
</h2> <p class="text-amber-50 mt-4 text-lg md:text-xl">
I'm Conor, a Fractional Product Leader obsessed with <br>making companies better with discovery, AB tests and data thinking.
</p> <div class="flex mt-5"> ${renderComponent($$result, "Link", $$Link, { "href": "www.olta.app", "style": "inverted" }, { "default": ($$result2) => renderTemplate`Book a digital coffee` })} </div> </div>`;
}, "/Users/conormurphy/Documents/GitHub/abtest-marketing/src/components/cta.astro", void 0);

const $$Astro$2 = createAstro("https://astroship.web3templates.com");
const $$AppsDetails = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AppsDetails;
  const features = [
    {
      title: "AB test calculator",
      description: "We promise to always give you comprehensible and clear actions. No more 'maybes', it gives a clear yes, no or a date to check back.",
      icon: "bx:bx-outline",
      link: "https://www.abtest.tools/calc"
    },
    {
      title: "[Soon] How much traffic do I need to test?",
      description: "Decide during your planning sessions what tests are worth running at all. Similar but better than the sample size calculators.",
      icon: "bx:bx-volume-full",
      link: "#"
    },
    {
      title: "[Soon] Should I be worried about this KPI?",
      description: "A KPI drops, your company panics, but it turns out to be noise. This tool will help you decide, upfront and in minutes, if it's time to panic or wait.",
      icon: "bx:bx-alarm-exclamation",
      link: "#"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="mt-0 md:mt-0"> <!--<h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight">
    Everything you need to start a website
  </h2>*/--> </div> <div class="grid grid-cols-2 mt-16 gap-16"> ${features.map((item) => renderTemplate`<a href="link"> <div class="flex gap-4 items-start"> <div class="mt4-1 bg-black rounded-full  p-2 w-8 h-8 shrink-0"> ${renderComponent($$result, "Icon", $$Icon, { "class": "text-white", "name": item.icon })} </div> <div> <h3 class="font-serif font-semibold text-lg">${item.title}</h3>${" "} <p class="text-slate-500 mt-2 leading-relaxed">${item.description}</p> </div> </div> </a>`)} </div>`;
}, "/Users/conormurphy/Documents/GitHub/abtest-marketing/src/components/apps_details.astro", void 0);

const $$Astro$1 = createAstro("https://astroship.web3templates.com");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Hero;
  return renderTemplate`${maybeRenderHead()}<main class="pt-8 mb-8 md:pt-16 md:pb-12 pr-8 max-w-4xl"> <!--
  <div class="py-6 lg:order-1 hidden lg:block">
    <Picture
      src={heroImage}
      alt="Astronaut in the air"
      widths={[200, 400, 600]}
      sizes="(max-width: 800px) 100vw, 620px"
      loading="eager"
      format="avif"
    />
  </div>--> <div> <h1 class="pt-4 pb-4 font-serif text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
The simplest AB test tools, <br>free forever
</h1> <p class="text-med mt-4 text-slate-500 max-w-xl">
AB testing is confusing, uncertain and hard to explain. It is also the scientific edge of product and marketing work and should be accessible to everyone.
</p> <p class="text-med mt-4 text-slate-500 max-w-xl">
The confusion with AB tests largely comes from the jargon and the calculators. They're either aimed at amateurs or academic data scientists.
      We need powerful tools for the rest of us. Understandable, explorable, action orientated and shareable.
</p> <p class="text-med mt-4 text-slate-500 max-w-xl">
I'm building a suite of free tools to achieve this.
</p> <div class="mt-6 flex flex-col sm:flex-row gap-3"> ${renderComponent($$result, "Link", $$Link, { "href": "#", "href": "https://web3templates.com/templates/astroship-starter-website-template-for-astro", "target": "_blank", "class": "flex gap-1 items-center justify-center", "rel": "noopener" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "class": "text-white w-5 h-5", "name": "bx:bx-outline" })}
Use the AB test calculator
${renderComponent($$result2, "box-icon", "box-icon", { "type": "solid", "name": "objects-horizontal-left" })} ` })} ${renderComponent($$result, "Link", $$Link, { "size": "lg", "style": "outline", "rel": "noopener", "href": "https://github.com/surjithctly/astroship", "class": "flex gap-1 items-center justify-center", "target": "_blank" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "class": "text-black w-4 h-4", "name": "bx:bx-coffee" })}
Chat to me
` })} </div> </div> </main>`;
}, "/Users/conormurphy/Documents/GitHub/abtest-marketing/src/components/hero.astro", void 0);

const $$Astro = createAstro("https://astroship.web3templates.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Hero", $$Hero, {})} ${renderComponent($$result3, "Apps", $$AppsDetails, {})} ${renderComponent($$result3, "Cta", $$Cta, {})} ` })} ` })}`;
}, "/Users/conormurphy/Documents/GitHub/abtest-marketing/src/pages/index.astro", void 0);

const $$file = "/Users/conormurphy/Documents/GitHub/abtest-marketing/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Link as $, index as i };
