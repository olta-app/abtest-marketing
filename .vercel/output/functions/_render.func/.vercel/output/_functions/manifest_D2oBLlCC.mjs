import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_BTup8YuA.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.5.1_typescript@5.4.2/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.Btn2yKQQ.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.Btn2yKQQ.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.Btn2yKQQ.css"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.Btn2yKQQ.css"}],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.Btn2yKQQ.css"},{"type":"inline","content":".invalid-feedback[data-astro-cid-uwnxe3i2],.empty-feedback[data-astro-cid-uwnxe3i2]{display:none}.was-validated[data-astro-cid-uwnxe3i2] :-moz-placeholder-shown:invalid[data-astro-cid-uwnxe3i2]~.empty-feedback[data-astro-cid-uwnxe3i2]{display:block}.was-validated[data-astro-cid-uwnxe3i2] :placeholder-shown:invalid[data-astro-cid-uwnxe3i2]~.empty-feedback[data-astro-cid-uwnxe3i2]{display:block}.was-validated[data-astro-cid-uwnxe3i2] :not(:-moz-placeholder-shown):invalid[data-astro-cid-uwnxe3i2]~.invalid-feedback[data-astro-cid-uwnxe3i2]{display:block}.was-validated[data-astro-cid-uwnxe3i2] :not(:placeholder-shown):invalid[data-astro-cid-uwnxe3i2]~.invalid-feedback[data-astro-cid-uwnxe3i2]{display:block}.is-invalid[data-astro-cid-uwnxe3i2],.was-validated[data-astro-cid-uwnxe3i2] :invalid[data-astro-cid-uwnxe3i2]{border-color:#dc3545}\n"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.Btn2yKQQ.css"}],"routeData":{"route":"/pricing","isIndex":false,"type":"page","pattern":"^\\/pricing\\/?$","segments":[[{"content":"pricing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pricing.astro","pathname":"/pricing","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.Btn2yKQQ.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://astroship.web3templates.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/conormurphy/Documents/GitHub/abtest-marketing/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/conormurphy/Documents/GitHub/abtest-marketing/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["/Users/conormurphy/Documents/GitHub/abtest-marketing/src/pages/blog.astro",{"propagation":"in-tree","containsHead":true}],["/Users/conormurphy/Documents/GitHub/abtest-marketing/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/conormurphy/Documents/GitHub/abtest-marketing/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/conormurphy/Documents/GitHub/abtest-marketing/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/conormurphy/Documents/GitHub/abtest-marketing/src/pages/pricing.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/blog.astro":"chunks/pages/blog_CeZKeZ7m.mjs","/node_modules/.pnpm/astro@4.5.1_typescript@5.4.2/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_2i_BJHoe.mjs","/src/pages/pricing.astro":"chunks/pages/pricing_0n-rfF5M.mjs","\u0000@astrojs-manifest":"manifest_D2oBLlCC.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.5.1_typescript@5.4.2/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_pd0XHKJR.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_CGjRfMrf.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_CSIr1k9w.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"chunks/_slug__BxjpWGPD.mjs","\u0000@astro-page:src/pages/blog@_@astro":"chunks/blog_C7fetzgF.mjs","\u0000@astro-page:src/pages/contact@_@astro":"chunks/contact_BPrqa2KK.mjs","\u0000@astro-page:src/pages/pricing@_@astro":"chunks/pricing_CdGyV4CO.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_BBLC7F-n.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/complete-guide-fullstack-development.md?astroContentCollectionEntry=true":"chunks/complete-guide-fullstack-development_CdXB09dz.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/essential-data-structures-algorithms.md?astroContentCollectionEntry=true":"chunks/essential-data-structures-algorithms_DpOtyDBV.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/how-to-become-frontend-master.md?astroContentCollectionEntry=true":"chunks/how-to-become-frontend-master_Dx6FgZ2O.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/kitchensink.mdx?astroContentCollectionEntry=true":"chunks/kitchensink_DjB1Atc9.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/janette-lynch.md?astroContentCollectionEntry=true":"chunks/janette-lynch_N61R3cwq.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/marcell-ziemann.md?astroContentCollectionEntry=true":"chunks/marcell-ziemann_CFHehuiP.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/robert-palmer.md?astroContentCollectionEntry=true":"chunks/robert-palmer_CoaK6DWF.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/complete-guide-fullstack-development.md?astroPropagatedAssets":"chunks/complete-guide-fullstack-development_BZWYwcm3.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/essential-data-structures-algorithms.md?astroPropagatedAssets":"chunks/essential-data-structures-algorithms_CVh9eaC9.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/how-to-become-frontend-master.md?astroPropagatedAssets":"chunks/how-to-become-frontend-master_B5tPzs5X.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/kitchensink.mdx?astroPropagatedAssets":"chunks/kitchensink_CVOEB7Un.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/janette-lynch.md?astroPropagatedAssets":"chunks/janette-lynch_C76UoceT.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/marcell-ziemann.md?astroPropagatedAssets":"chunks/marcell-ziemann_DLNYHjg3.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/robert-palmer.md?astroPropagatedAssets":"chunks/robert-palmer_CqMqtKO9.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/complete-guide-fullstack-development.md":"chunks/complete-guide-fullstack-development_WpmCV_zN.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/essential-data-structures-algorithms.md":"chunks/essential-data-structures-algorithms_BL8pKI8c.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/how-to-become-frontend-master.md":"chunks/how-to-become-frontend-master_CGZx9QVB.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/blog/kitchensink.mdx":"chunks/kitchensink_CmhDti2H.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/janette-lynch.md":"chunks/janette-lynch_US7a7glu.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/marcell-ziemann.md":"chunks/marcell-ziemann_CDMqnYVl.mjs","/Users/conormurphy/Documents/GitHub/abtest-marketing/src/content/team/robert-palmer.md":"chunks/robert-palmer_Byz-4G18.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/about.Btn2yKQQ.css","/favicon.ico","/opengraph.png","/robots.txt"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
