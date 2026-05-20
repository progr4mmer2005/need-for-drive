// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  function $parcel$resolve(url) {  url = importMap[url] || url;  return import.meta.resolve(distDir + url);}newRequire.resolve = $parcel$resolve;

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"gwd56":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "a2efdf2caa49af7c";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"biHEi":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$805f = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$805f.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$805f.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrdersPage", ()=>OrdersPage);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _ordersApi = require("@/shared/api/ordersApi");
var _carsApi = require("@/shared/api/carsApi");
var _citiesApi = require("@/shared/api/citiesApi");
var _adminPageTitle = require("@/shared/components/AdminPageTitle");
var _loader = require("@/shared/components/Loader");
var _ordersPageModuleScss = require("./OrdersPage.module.scss");
var _ordersPageModuleScssDefault = parcelHelpers.interopDefault(_ordersPageModuleScss);
var _s = $RefreshSig$();
const PAGE_SIZE = 10;
const carImages = {
    elantra: new URL(require("dcc5fff5058ea5f")).toString(),
    i30n: new URL(require("253848460a9f20f0")).toString(),
    creta: new URL(require("f7570365e1f7682c")).toString(),
    sonata: new URL(require("b74a55a3c5c60caf")).toString(),
    solaris: new URL(require("ec08fc24274b96c3")).toString(),
    tucson: new URL(require("dc8de16d15ddff99")).toString()
};
function getCarImage(name) {
    const normalizedName = (name || '').toLowerCase();
    if (normalizedName.includes('elantra')) return carImages.elantra;
    if (normalizedName.includes('creta')) return carImages.creta;
    if (normalizedName.includes('sonata')) return carImages.sonata;
    if (normalizedName.includes('solaris')) return carImages.solaris;
    if (normalizedName.includes('tucson')) return carImages.tucson;
    return carImages.i30n;
}
function formatDate(ts) {
    if (!ts) return "\u2014";
    return new Date(ts).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function formatPrice(p) {
    return p ? `${p.toLocaleString('ru-RU')} \u{20BD}` : "\u2014";
}
function OrdersPage() {
    _s();
    const navigate = (0, _reactRouterDom.useNavigate)();
    const [orders, setOrders] = (0, _react.useState)([]);
    const [total, setTotal] = (0, _react.useState)(0);
    const [page, setPage] = (0, _react.useState)(1);
    const [loading, setLoading] = (0, _react.useState)(true);
    const [cars, setCars] = (0, _react.useState)([]);
    const [cities, setCities] = (0, _react.useState)([]);
    const [statuses, setStatuses] = (0, _react.useState)([]);
    const [draftFilters, setDraftFilters] = (0, _react.useState)({
        period: '',
        car: '',
        city: '',
        status: ''
    });
    const [appliedFilters, setAppliedFilters] = (0, _react.useState)({
        period: '',
        car: '',
        city: '',
        status: ''
    });
    (0, _react.useEffect)(()=>{
        Promise.all([
            (0, _carsApi.carsApi).getAll({
                limit: 100
            }),
            (0, _citiesApi.citiesApi).getAll(),
            (0, _citiesApi.orderStatusApi).getAll()
        ]).then(([carsData, citiesData, statusData])=>{
            setCars(carsData.data);
            setCities(citiesData.data);
            setStatuses(statusData.data);
        }).catch(console.error);
    }, []);
    const fetchOrders = (0, _react.useCallback)(async ()=>{
        setLoading(true);
        try {
            const data = await (0, _ordersApi.ordersApi).getAll({
                limit: PAGE_SIZE,
                page
            });
            setOrders(data.data);
            setTotal(data.count ?? 0);
        } catch (e) {
            if (e?.response?.status === 401) navigate('/admin/login');
        } finally{
            setLoading(false);
        }
    }, [
        page,
        navigate
    ]);
    (0, _react.useEffect)(()=>{
        fetchOrders();
    }, [
        fetchOrders
    ]);
    const filtered = orders.filter((o)=>{
        if (appliedFilters.car && o.carId?.id !== Number(appliedFilters.car)) return false;
        if (appliedFilters.city && o.cityId?.id !== Number(appliedFilters.city)) return false;
        if (appliedFilters.status && o.orderStatusId?.id !== Number(appliedFilters.status)) return false;
        return true;
    });
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const paginationPages = Array.from({
        length: Math.min(totalPages, 7)
    }, (_, i)=>i + 1);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _adminPageTitle.AdminPageTitle), {
                children: "\u0417\u0430\u043A\u0430\u0437\u044B"
            }, void 0, false, {
                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: (0, _ordersPageModuleScssDefault.default).tableWrap,
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: (0, _ordersPageModuleScssDefault.default).filters,
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("select", {
                                className: `${(0, _ordersPageModuleScssDefault.default).filterSelect} ${!draftFilters.period ? (0, _ordersPageModuleScssDefault.default).filterPlaceholder : ''}`,
                                value: draftFilters.period,
                                onChange: (e)=>setDraftFilters((p)=>({
                                            ...p,
                                            period: e.target.value
                                        })),
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                        value: "",
                                        children: "\u0412\u0440\u0435\u043C\u044F"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                        value: "week",
                                        children: "\u0417\u0430 \u043D\u0435\u0434\u0435\u043B\u044E"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                        value: "month",
                                        children: "\u0417\u0430 \u043C\u0435\u0441\u044F\u0446"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                        value: "all",
                                        children: "\u0417\u0430 \u0432\u0441\u0451 \u0432\u0440\u0435\u043C\u044F"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("select", {
                                className: `${(0, _ordersPageModuleScssDefault.default).filterSelect} ${!draftFilters.car ? (0, _ordersPageModuleScssDefault.default).filterPlaceholder : ''}`,
                                value: draftFilters.car,
                                onChange: (e)=>setDraftFilters((p)=>({
                                            ...p,
                                            car: e.target.value
                                        })),
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                        value: "",
                                        children: "\u0410\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this),
                                    cars.map((c)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                            value: c.id,
                                            children: c.name
                                        }, c.id, false, {
                                            fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                            lineNumber: 107,
                                            columnNumber: 30
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("select", {
                                className: `${(0, _ordersPageModuleScssDefault.default).filterSelect} ${!draftFilters.city ? (0, _ordersPageModuleScssDefault.default).filterPlaceholder : ''}`,
                                value: draftFilters.city,
                                onChange: (e)=>setDraftFilters((p)=>({
                                            ...p,
                                            city: e.target.value
                                        })),
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                        value: "",
                                        children: "\u0413\u043E\u0440\u043E\u0434"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this),
                                    cities.map((c)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                            value: c.id,
                                            children: c.name
                                        }, c.id, false, {
                                            fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                            lineNumber: 111,
                                            columnNumber: 32
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("select", {
                                className: `${(0, _ordersPageModuleScssDefault.default).filterSelect} ${!draftFilters.status ? (0, _ordersPageModuleScssDefault.default).filterPlaceholder : ''}`,
                                value: draftFilters.status,
                                onChange: (e)=>setDraftFilters((p)=>({
                                            ...p,
                                            status: e.target.value
                                        })),
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                        value: "",
                                        children: "\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    statuses.map((s)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                            value: s.id,
                                            children: s.name
                                        }, s.id, false, {
                                            fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                            lineNumber: 115,
                                            columnNumber: 34
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                className: (0, _ordersPageModuleScssDefault.default).applyBtn,
                                type: "button",
                                onClick: ()=>setAppliedFilters(draftFilters),
                                children: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C"
                            }, void 0, false, {
                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: (0, _ordersPageModuleScssDefault.default).scrollArea,
                        children: loading ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _loader.Loader), {}, void 0, false, {
                            fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                            lineNumber: 121,
                            columnNumber: 22
                        }, this) : filtered.length === 0 ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                            className: (0, _ordersPageModuleScssDefault.default).empty,
                            children: "\u041D\u0435\u0442 \u0437\u0430\u043A\u0430\u0437\u043E\u0432"
                        }, void 0, false, {
                            fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                            lineNumber: 121,
                            columnNumber: 59
                        }, this) : filtered.map((order)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: (0, _ordersPageModuleScssDefault.default).orderCard,
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: (0, _ordersPageModuleScssDefault.default).carImg,
                                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("img", {
                                            src: getCarImage(order.carId?.name),
                                            alt: ""
                                        }, void 0, false, {
                                            fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                            lineNumber: 123,
                                            columnNumber: 46
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: (0, _ordersPageModuleScssDefault.default).orderInfo,
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: (0, _ordersPageModuleScssDefault.default).orderTitle,
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                        children: order.carId?.name?.toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                        className: (0, _ordersPageModuleScssDefault.default).orderMuted,
                                                        children: " \u0432 "
                                                    }, void 0, false, {
                                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                        children: order.cityId?.name
                                                    }, void 0, false, {
                                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                        className: (0, _ordersPageModuleScssDefault.default).orderMuted,
                                                        children: ", "
                                                    }, void 0, false, {
                                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                        className: (0, _ordersPageModuleScssDefault.default).orderAddress,
                                                        children: order.pointId?.address
                                                    }, void 0, false, {
                                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: (0, _ordersPageModuleScssDefault.default).orderDates,
                                                children: [
                                                    formatDate(order.dateFrom),
                                                    " \u2013 ",
                                                    formatDate(order.dateTo)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                lineNumber: 132,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: (0, _ordersPageModuleScssDefault.default).orderColor,
                                                children: [
                                                    "\u0426\u0432\u0435\u0442: ",
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                        children: order.color || "\u2014"
                                                    }, void 0, false, {
                                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 58
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                lineNumber: 133,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: (0, _ordersPageModuleScssDefault.default).orderExtras,
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                className: `${(0, _ordersPageModuleScssDefault.default).checkbox} ${order.isFullTank ? (0, _ordersPageModuleScssDefault.default).checkboxChecked : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                        className: (0, _ordersPageModuleScssDefault.default).checkboxBox,
                                                        children: order.isFullTank ? "\u2713" : ''
                                                    }, void 0, false, {
                                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 19
                                                    }, this),
                                                    "\u041F\u043E\u043B\u043D\u044B\u0439 \u0431\u0430\u043A"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                lineNumber: 136,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                className: `${(0, _ordersPageModuleScssDefault.default).checkbox} ${order.isNeedChildChair ? (0, _ordersPageModuleScssDefault.default).checkboxChecked : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                        className: (0, _ordersPageModuleScssDefault.default).checkboxBox,
                                                        children: order.isNeedChildChair ? "\u2713" : ''
                                                    }, void 0, false, {
                                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 19
                                                    }, this),
                                                    "\u0414\u0435\u0442\u0441\u043A\u043E\u0435 \u043A\u0440\u0435\u0441\u043B\u043E"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                className: `${(0, _ordersPageModuleScssDefault.default).checkbox} ${order.isRightWheel ? (0, _ordersPageModuleScssDefault.default).checkboxChecked : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                        className: (0, _ordersPageModuleScssDefault.default).checkboxBox,
                                                        children: order.isRightWheel ? "\u2713" : ''
                                                    }, void 0, false, {
                                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 19
                                                    }, this),
                                                    "\u041F\u0440\u0430\u0432\u044B\u0439 \u0440\u0443\u043B\u044C"
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                lineNumber: 144,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: (0, _ordersPageModuleScssDefault.default).orderPrice,
                                        children: formatPrice(order.price)
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: (0, _ordersPageModuleScssDefault.default).orderActions,
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: `${(0, _ordersPageModuleScssDefault.default).actionBtn} ${(0, _ordersPageModuleScssDefault.default).successBtn}`,
                                                type: "button",
                                                onClick: ()=>(0, _ordersApi.ordersApi).update(order.id, {
                                                        orderStatusId: {
                                                            id: 4
                                                        }
                                                    }).then(fetchOrders),
                                                children: "\u2713 \u0413\u043E\u0442\u043E\u0432\u043E"
                                            }, void 0, false, {
                                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                lineNumber: 151,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: `${(0, _ordersPageModuleScssDefault.default).actionBtn} ${(0, _ordersPageModuleScssDefault.default).dangerBtn}`,
                                                type: "button",
                                                onClick: ()=>(0, _ordersApi.ordersApi).update(order.id, {
                                                        orderStatusId: {
                                                            id: 3
                                                        }
                                                    }).then(fetchOrders),
                                                children: "\u2715 \u041E\u0442\u043C\u0435\u043D\u0430"
                                            }, void 0, false, {
                                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: `${(0, _ordersPageModuleScssDefault.default).actionBtn} ${(0, _ordersPageModuleScssDefault.default).editBtn}`,
                                                type: "button",
                                                onClick: ()=>navigate(`/admin/orders/${order.id}`),
                                                children: "\u22EE \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"
                                            }, void 0, false, {
                                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                                lineNumber: 153,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, order.id, true, {
                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: (0, _ordersPageModuleScssDefault.default).pagination,
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                type: "button",
                                className: (0, _ordersPageModuleScssDefault.default).pageBtn,
                                onClick: ()=>setPage(1),
                                children: "\xab"
                            }, void 0, false, {
                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            totalPages > 1 ? paginationPages.map((p)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                    type: "button",
                                    className: `${(0, _ordersPageModuleScssDefault.default).pageBtn} ${p === page ? (0, _ordersPageModuleScssDefault.default).pageBtnActive : ''}`,
                                    onClick: ()=>setPage(p),
                                    children: p
                                }, p, false, {
                                    fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                    lineNumber: 162,
                                    columnNumber: 40
                                }, this)) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        type: "button",
                                        className: (0, _ordersPageModuleScssDefault.default).pageBtn,
                                        children: "1"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                        className: (0, _ordersPageModuleScssDefault.default).pageDots,
                                        children: "..."
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        type: "button",
                                        className: (0, _ordersPageModuleScssDefault.default).pageBtn,
                                        children: "4"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        type: "button",
                                        className: (0, _ordersPageModuleScssDefault.default).pageBtnActive,
                                        children: "5"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        type: "button",
                                        className: (0, _ordersPageModuleScssDefault.default).pageBtn,
                                        children: "6"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 169,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                        className: (0, _ordersPageModuleScssDefault.default).pageDots,
                                        children: "..."
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        type: "button",
                                        className: (0, _ordersPageModuleScssDefault.default).pageBtn,
                                        children: "31"
                                    }, void 0, false, {
                                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                type: "button",
                                className: (0, _ordersPageModuleScssDefault.default).pageBtn,
                                onClick: ()=>setPage(totalPages || 1),
                                children: "\xbb"
                            }, void 0, false, {
                                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/admin/OrdersPage/OrdersPage.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_s(OrdersPage, "HtCgYzBPb8UB5G3puTzqgV/ejec=", false, function() {
    return [
        (0, _reactRouterDom.useNavigate)
    ];
});
_c = OrdersPage;
var _c;
$RefreshReg$(_c, "OrdersPage");

  $parcel$ReactRefreshHelpers$805f.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","react-router-dom":"61z4w","@/shared/api/ordersApi":"bBlUw","@/shared/api/carsApi":"iSPxy","@/shared/api/citiesApi":"kzLY1","@/shared/components/AdminPageTitle":"4WM47","@/shared/components/Loader":"fHoxP","./OrdersPage.module.scss":"7T4vR","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi","dcc5fff5058ea5f":"jOCr5","253848460a9f20f0":"eSFbb","f7570365e1f7682c":"3LDYw","b74a55a3c5c60caf":"hGuOG","ec08fc24274b96c3":"80vDI","dc8de16d15ddff99":"2FJdO"}],"bBlUw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ordersApi", ()=>ordersApi);
var _mockStore = require("./mockStore");
const ordersApi = {
    getAll: (params)=>(0, _mockStore.mockOrders).getAll(params),
    getOne: (id)=>(0, _mockStore.mockOrders).getOne(id),
    create: (dto)=>(0, _mockStore.mockOrders).create(dto),
    update: (id, dto)=>(0, _mockStore.mockOrders).update(id, dto),
    delete: (id)=>(0, _mockStore.mockOrders).delete(id)
};

},{"./mockStore":"d1tY0","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"d1tY0":[function(require,module,exports,__globalThis) {
/* In-memory + localStorage backed mock store. Mimics the NestJS backend. */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "resetMockDb", ()=>resetMockDb);
parcelHelpers.export(exports, "mockCars", ()=>mockCars);
parcelHelpers.export(exports, "mockOrders", ()=>mockOrders);
parcelHelpers.export(exports, "mockCities", ()=>mockCities);
parcelHelpers.export(exports, "mockPoints", ()=>mockPoints);
parcelHelpers.export(exports, "mockRates", ()=>mockRates);
parcelHelpers.export(exports, "mockRateTypes", ()=>mockRateTypes);
parcelHelpers.export(exports, "mockCategories", ()=>mockCategories);
parcelHelpers.export(exports, "mockOrderStatus", ()=>mockOrderStatus);
var _mockData = require("./mockData");
const STORAGE_KEY = 'nfd_mock_db_v1';
function freshDb() {
    return {
        cars: [
            ...(0, _mockData.seedCars)
        ],
        categories: [
            ...(0, _mockData.seedCategories)
        ],
        cities: [
            ...(0, _mockData.seedCities)
        ],
        points: [
            ...(0, _mockData.seedPoints)
        ],
        rates: [
            ...(0, _mockData.seedRates)
        ],
        rateTypes: [
            ...(0, _mockData.seedRateTypes)
        ],
        orderStatuses: [
            ...(0, _mockData.seedOrderStatuses)
        ],
        orders: [
            ...(0, _mockData.seedOrders)
        ],
        nextId: {
            cars: Math.max(...(0, _mockData.seedCars).map((c)=>c.id)) + 1,
            orders: Math.max(...(0, _mockData.seedOrders).map((o)=>o.id), 0) + 1
        }
    };
}
function loadDb() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.cars) return parsed;
        }
    } catch  {
    // ignore
    }
    const fresh = freshDb();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
}
let db = loadDb();
function saveDb() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch  {
    // ignore quota errors
    }
}
function resetMockDb() {
    db = freshDb();
    saveDb();
}
// simulate small network delay so loaders are visible
function delay(value, ms = 150) {
    return new Promise((res)=>setTimeout(()=>res(value), ms));
}
function paginate(items, params) {
    const total = items.length;
    if (!params?.limit) return {
        data: items,
        count: total
    };
    const page = Math.max(1, params.page || 1);
    const start = (page - 1) * params.limit;
    return {
        data: items.slice(start, start + params.limit),
        count: total
    };
}
const mockCars = {
    getAll: (params)=>delay(paginate(db.cars, params)),
    getOne: (id)=>{
        const car = db.cars.find((c)=>c.id === id);
        if (!car) return Promise.reject({
            response: {
                status: 404,
                data: {
                    message: 'Not found'
                }
            }
        });
        return delay({
            data: car
        });
    },
    create: (dto)=>{
        const cat = db.categories.find((c)=>c.id === dto.categoryId.id) || db.categories[0];
        const car = {
            id: db.nextId.cars++,
            name: dto.name || "\u041D\u043E\u0432\u044B\u0439 \u0430\u0432\u0442\u043E",
            priceMin: dto.priceMin || 0,
            priceMax: dto.priceMax || 0,
            colors: dto.colors || [],
            thumbnail: dto.thumbnail || null,
            description: dto.description || '',
            number: dto.number || '',
            tank: dto.tank || '',
            categoryId: cat
        };
        db.cars.push(car);
        saveDb();
        return delay({
            data: car
        });
    },
    update: (id, dto)=>{
        const idx = db.cars.findIndex((c)=>c.id === id);
        if (idx === -1) return Promise.reject({
            response: {
                status: 404
            }
        });
        const existing = db.cars[idx];
        const cat = dto.categoryId ? db.categories.find((c)=>c.id === dto.categoryId.id) || existing.categoryId : existing.categoryId;
        const updated = {
            ...existing,
            ...dto,
            categoryId: cat
        };
        db.cars[idx] = updated;
        saveDb();
        return delay({
            data: updated
        });
    },
    delete: (id)=>{
        db.cars = db.cars.filter((c)=>c.id !== id);
        saveDb();
        return delay({
            data: undefined
        });
    }
};
const mockOrders = {
    getAll: (params)=>delay(paginate(db.orders, params)),
    getOne: (id)=>{
        const o = db.orders.find((x)=>x.id === id);
        if (!o) return Promise.reject({
            response: {
                status: 404
            }
        });
        return delay({
            data: o
        });
    },
    create: (dto)=>{
        const order = {
            id: db.nextId.orders++,
            cityId: db.cities.find((c)=>c.id === dto.cityId.id) || db.cities[0],
            pointId: db.points.find((p)=>p.id === dto.pointId.id) || db.points[0],
            carId: db.cars.find((c)=>c.id === dto.carId.id) || db.cars[0],
            rateId: db.rates.find((r)=>r.id === dto.rateId.id) || db.rates[0],
            orderStatusId: dto.orderStatusId ? db.orderStatuses.find((s)=>s.id === dto.orderStatusId.id) || db.orderStatuses[0] : db.orderStatuses[0],
            color: dto.color,
            dateFrom: dto.dateFrom,
            dateTo: dto.dateTo,
            price: dto.price,
            isFullTank: dto.isFullTank,
            isNeedChildChair: dto.isNeedChildChair,
            isRightWheel: dto.isRightWheel
        };
        db.orders.push(order);
        saveDb();
        return delay({
            data: order
        });
    },
    update: (id, dto)=>{
        const idx = db.orders.findIndex((o)=>o.id === id);
        if (idx === -1) return Promise.reject({
            response: {
                status: 404
            }
        });
        const o = db.orders[idx];
        if (dto.orderStatusId) {
            const s = db.orderStatuses.find((x)=>x.id === dto.orderStatusId.id);
            if (s) o.orderStatusId = s;
        }
        saveDb();
        return delay({
            data: o
        });
    },
    delete: (id)=>{
        db.orders = db.orders.filter((o)=>o.id !== id);
        saveDb();
        return delay({
            data: undefined
        });
    }
};
const mockCities = {
    getAll: ()=>delay({
            data: db.cities,
            count: db.cities.length
        })
};
const mockPoints = {
    getAll: (params)=>{
        let pts = db.points;
        const cityId = params && (params['cityId'] || params['city_id']);
        if (cityId) {
            const cid = Number(cityId);
            pts = pts.filter((p)=>p.cityId.id === cid);
        }
        return delay({
            data: pts,
            count: pts.length
        });
    }
};
const mockRates = {
    getAll: ()=>delay({
            data: db.rates,
            count: db.rates.length
        })
};
const mockRateTypes = {
    getAll: ()=>delay({
            data: db.rateTypes,
            count: db.rateTypes.length
        })
};
const mockCategories = {
    getAll: ()=>delay({
            data: db.categories,
            count: db.categories.length
        })
};
const mockOrderStatus = {
    getAll: ()=>delay({
            data: db.orderStatuses,
            count: db.orderStatuses.length
        })
};

},{"./mockData":"41v8A","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"41v8A":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "seedCategories", ()=>seedCategories);
parcelHelpers.export(exports, "seedCities", ()=>seedCities);
parcelHelpers.export(exports, "seedPoints", ()=>seedPoints);
parcelHelpers.export(exports, "seedRateTypes", ()=>seedRateTypes);
parcelHelpers.export(exports, "seedRates", ()=>seedRates);
parcelHelpers.export(exports, "seedOrderStatuses", ()=>seedOrderStatuses);
parcelHelpers.export(exports, "seedCars", ()=>seedCars);
parcelHelpers.export(exports, "seedOrders", ()=>seedOrders);
const seedCategories = [
    {
        id: 1,
        name: "\u042D\u043A\u043E\u043D\u043E\u043C"
    },
    {
        id: 2,
        name: "\u041F\u0440\u0435\u043C\u0438\u0443\u043C"
    }
];
const seedCities = [
    {
        id: 1,
        name: "\u0423\u043B\u044C\u044F\u043D\u043E\u0432\u0441\u043A"
    },
    {
        id: 2,
        name: "\u041A\u0430\u0437\u0430\u043D\u044C"
    },
    {
        id: 3,
        name: "\u041C\u043E\u0441\u043A\u0432\u0430"
    },
    {
        id: 4,
        name: "\u0421\u0430\u043C\u0430\u0440\u0430"
    }
];
const seedPoints = [
    {
        id: 1,
        name: "\u041D\u0430\u0440\u0438\u043C\u0430\u043D\u043E\u0432\u0430 42",
        address: "\u041D\u0430\u0440\u0438\u043C\u0430\u043D\u043E\u0432\u0430 42",
        cityId: seedCities[0]
    },
    {
        id: 2,
        name: "\u0413\u043E\u043D\u0447\u0430\u0440\u043E\u0432\u0430 11",
        address: "\u0413\u043E\u043D\u0447\u0430\u0440\u043E\u0432\u0430 11",
        cityId: seedCities[0]
    },
    {
        id: 3,
        name: "\u041F\u0443\u0448\u043A\u0430\u0440\u0451\u0432\u0430 19",
        address: "\u041F\u0443\u0448\u043A\u0430\u0440\u0451\u0432\u0430 19",
        cityId: seedCities[0]
    },
    {
        id: 4,
        name: "\u041F\u0443\u0448\u043A\u0438\u043D\u0430 5",
        address: "\u041F\u0443\u0448\u043A\u0438\u043D\u0430 5",
        cityId: seedCities[1]
    },
    {
        id: 5,
        name: "\u041A\u0440\u0435\u043C\u043B\u0451\u0432\u0441\u043A\u0430\u044F 9",
        address: "\u041A\u0440\u0435\u043C\u043B\u0451\u0432\u0441\u043A\u0430\u044F 9",
        cityId: seedCities[1]
    },
    {
        id: 6,
        name: "\u041B\u0435\u043D\u0438\u043D\u0430 12",
        address: "\u041B\u0435\u043D\u0438\u043D\u0430 12",
        cityId: seedCities[3]
    },
    {
        id: 7,
        name: "\u041A\u0443\u0439\u0431\u044B\u0448\u0435\u0432\u0430 5",
        address: "\u041A\u0443\u0439\u0431\u044B\u0448\u0435\u0432\u0430 5",
        cityId: seedCities[3]
    },
    {
        id: 8,
        name: "\u041D\u043E\u0432\u044B\u0439 \u0410\u0440\u0431\u0430\u0442 1",
        address: "\u041D\u043E\u0432\u044B\u0439 \u0410\u0440\u0431\u0430\u0442 1",
        cityId: seedCities[2]
    },
    {
        id: 9,
        name: "\u0422\u0432\u0435\u0440\u0441\u043A\u0430\u044F 10",
        address: "\u0422\u0432\u0435\u0440\u0441\u043A\u0430\u044F 10",
        cityId: seedCities[2]
    }
];
const seedRateTypes = [
    {
        id: 1,
        name: "\u041F\u043E\u043C\u0438\u043D\u0443\u0442\u043D\u043E",
        unit: "\u043C\u0438\u043D"
    },
    {
        id: 2,
        name: "\u041D\u0430 \u0441\u0443\u0442\u043A\u0438",
        unit: "\u0441\u0443\u0442"
    }
];
const seedRates = [
    {
        id: 1,
        price: 7,
        rateTypeId: seedRateTypes[0]
    },
    {
        id: 2,
        price: 1999,
        rateTypeId: seedRateTypes[1]
    }
];
const seedOrderStatuses = [
    {
        id: 1,
        name: "\u041D\u043E\u0432\u044B\u0439"
    },
    {
        id: 2,
        name: "\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435"
    },
    {
        id: 3,
        name: "\u041E\u0442\u043C\u0435\u043D\u0435\u043D"
    },
    {
        id: 4,
        name: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D"
    }
];
const seedCars = [
    {
        id: 1,
        name: 'Hyundai ELANTRA',
        priceMin: 12000,
        priceMax: 25000,
        colors: [
            "\u041A\u0440\u0430\u0441\u043D\u044B\u0439",
            "\u0421\u0438\u043D\u0438\u0439",
            "\u0411\u0435\u043B\u044B\u0439",
            "\u0427\u0451\u0440\u043D\u044B\u0439"
        ],
        thumbnail: {
            path: '',
            originalname: 'elantra.jpg',
            mimetype: 'image/jpeg'
        },
        description: "\u0421\u0442\u0438\u043B\u044C\u043D\u044B\u0439 \u0441\u0435\u0434\u0430\u043D \u0434\u043B\u044F \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u0445 \u043F\u043E\u0435\u0437\u0434\u043E\u043A",
        number: "\u0410 123 \u0411\u0412 73",
        tank: '92',
        categoryId: seedCategories[0]
    },
    {
        id: 2,
        name: 'Hyundai i30 N',
        priceMin: 10000,
        priceMax: 32000,
        colors: [
            "\u041A\u0440\u0430\u0441\u043D\u044B\u0439",
            "\u0421\u0438\u043D\u0438\u0439",
            "\u0411\u0435\u043B\u044B\u0439"
        ],
        thumbnail: {
            path: '',
            originalname: 'i30n.jpg',
            mimetype: 'image/jpeg'
        },
        description: "\u0421\u043F\u043E\u0440\u0442\u0438\u0432\u043D\u044B\u0439 \u0445\u0435\u0442\u0447\u0431\u044D\u043A \u0441 \u043C\u043E\u0449\u043D\u044B\u043C \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u0435\u043C",
        number: "\u041A 761 \u041D\u0410 73",
        tank: '95',
        categoryId: seedCategories[1]
    },
    {
        id: 3,
        name: 'Hyundai CRETA',
        priceMin: 12000,
        priceMax: 25000,
        colors: [
            "\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439",
            "\u0411\u0435\u043B\u044B\u0439",
            "\u0421\u0435\u0440\u044B\u0439"
        ],
        thumbnail: {
            path: '',
            originalname: 'creta.jpg',
            mimetype: 'image/jpeg'
        },
        description: "\u041A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u044B\u0439 \u043A\u0440\u043E\u0441\u0441\u043E\u0432\u0435\u0440 \u0434\u043B\u044F \u043B\u044E\u0431\u044B\u0445 \u0434\u043E\u0440\u043E\u0433",
        number: "\u0412 456 \u0413\u0414 73",
        tank: '95',
        categoryId: seedCategories[0]
    },
    {
        id: 4,
        name: 'Hyundai SONATA',
        priceMin: 10000,
        priceMax: 32000,
        colors: [
            "\u0422\u0451\u043C\u043D\u043E-\u0441\u0438\u043D\u0438\u0439",
            "\u0421\u0435\u0440\u0435\u0431\u0440\u0438\u0441\u0442\u044B\u0439",
            "\u0411\u0435\u043B\u044B\u0439"
        ],
        thumbnail: {
            path: '',
            originalname: 'sonata.jpg',
            mimetype: 'image/jpeg'
        },
        description: "\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0441\u0435\u0434\u0430\u043D \u0431\u0438\u0437\u043D\u0435\u0441-\u043A\u043B\u0430\u0441\u0441\u0430",
        number: "\u0415 789 \u0416\u0417 73",
        tank: '95',
        categoryId: seedCategories[1]
    }
];
const seedOrders = [
    {
        id: 1,
        orderStatusId: seedOrderStatuses[1],
        cityId: seedCities[0],
        pointId: seedPoints[0],
        carId: seedCars[0],
        rateId: seedRates[1],
        color: "\u0413\u043E\u043B\u0443\u0431\u043E\u0439",
        dateFrom: Date.now() - 86400000,
        dateTo: Date.now() + 86400000,
        price: 4300,
        isFullTank: true,
        isNeedChildChair: false,
        isRightWheel: false
    }
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"iSPxy":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "carsApi", ()=>carsApi);
var _mockStore = require("./mockStore");
const carsApi = {
    getAll: (params)=>(0, _mockStore.mockCars).getAll(params),
    getOne: (id)=>(0, _mockStore.mockCars).getOne(id),
    create: (dto)=>(0, _mockStore.mockCars).create(dto),
    update: (id, dto)=>(0, _mockStore.mockCars).update(id, dto),
    delete: (id)=>(0, _mockStore.mockCars).delete(id)
};

},{"./mockStore":"d1tY0","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"kzLY1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "citiesApi", ()=>citiesApi);
parcelHelpers.export(exports, "pointsApi", ()=>pointsApi);
parcelHelpers.export(exports, "ratesApi", ()=>ratesApi);
parcelHelpers.export(exports, "rateTypesApi", ()=>rateTypesApi);
parcelHelpers.export(exports, "categoriesApi", ()=>categoriesApi);
parcelHelpers.export(exports, "orderStatusApi", ()=>orderStatusApi);
var _mockStore = require("./mockStore");
const citiesApi = {
    getAll: ()=>(0, _mockStore.mockCities).getAll()
};
const pointsApi = {
    getAll: (params)=>(0, _mockStore.mockPoints).getAll(params)
};
const ratesApi = {
    getAll: ()=>(0, _mockStore.mockRates).getAll()
};
const rateTypesApi = {
    getAll: ()=>(0, _mockStore.mockRateTypes).getAll()
};
const categoriesApi = {
    getAll: ()=>(0, _mockStore.mockCategories).getAll()
};
const orderStatusApi = {
    getAll: ()=>(0, _mockStore.mockOrderStatus).getAll()
};

},{"./mockStore":"d1tY0","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4WM47":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AdminPageTitle", ()=>(0, _adminPageTitle.AdminPageTitle));
var _adminPageTitle = require("./AdminPageTitle");

},{"./AdminPageTitle":"bUnhk","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bUnhk":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$e14a = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$e14a.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$e14a.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AdminPageTitle", ()=>AdminPageTitle);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _adminPageTitleModuleScss = require("./AdminPageTitle.module.scss");
var _adminPageTitleModuleScssDefault = parcelHelpers.interopDefault(_adminPageTitleModuleScss);
function AdminPageTitle({ children }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h1", {
        className: (0, _adminPageTitleModuleScssDefault.default).title,
        children: children
    }, void 0, false, {
        fileName: "src/shared/components/AdminPageTitle/AdminPageTitle.tsx",
        lineNumber: 9,
        columnNumber: 10
    }, this);
}
_c = AdminPageTitle;
var _c;
$RefreshReg$(_c, "AdminPageTitle");

  $parcel$ReactRefreshHelpers$e14a.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","./AdminPageTitle.module.scss":"gdbUR","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"gdbUR":[function(require,module,exports,__globalThis) {
module.exports["title"] = `_5q5tcG_title`;

},{}],"7T4vR":[function(require,module,exports,__globalThis) {
module.exports["actionBtn"] = `YZJ0Qa_actionBtn`;
module.exports["applyBtn"] = `YZJ0Qa_applyBtn`;
module.exports["carImg"] = `YZJ0Qa_carImg`;
module.exports["checkbox"] = `YZJ0Qa_checkbox`;
module.exports["checkboxBox"] = `YZJ0Qa_checkboxBox`;
module.exports["checkboxChecked"] = `YZJ0Qa_checkboxChecked`;
module.exports["dangerBtn"] = `YZJ0Qa_dangerBtn`;
module.exports["editBtn"] = `YZJ0Qa_editBtn`;
module.exports["empty"] = `YZJ0Qa_empty`;
module.exports["filterPlaceholder"] = `YZJ0Qa_filterPlaceholder`;
module.exports["filterSelect"] = `YZJ0Qa_filterSelect`;
module.exports["filters"] = `YZJ0Qa_filters`;
module.exports["orderActions"] = `YZJ0Qa_orderActions`;
module.exports["orderAddress"] = `YZJ0Qa_orderAddress`;
module.exports["orderCard"] = `YZJ0Qa_orderCard`;
module.exports["orderColor"] = `YZJ0Qa_orderColor`;
module.exports["orderDates"] = `YZJ0Qa_orderDates`;
module.exports["orderExtras"] = `YZJ0Qa_orderExtras`;
module.exports["orderMuted"] = `YZJ0Qa_orderMuted`;
module.exports["orderPrice"] = `YZJ0Qa_orderPrice`;
module.exports["orderTitle"] = `YZJ0Qa_orderTitle`;
module.exports["pageBtn"] = `YZJ0Qa_pageBtn`;
module.exports["pageBtnActive"] = `YZJ0Qa_pageBtnActive`;
module.exports["pageDots"] = `YZJ0Qa_pageDots`;
module.exports["pagination"] = `YZJ0Qa_pagination`;
module.exports["scrollArea"] = `YZJ0Qa_scrollArea`;
module.exports["successBtn"] = `YZJ0Qa_successBtn`;
module.exports["tableWrap"] = `YZJ0Qa_tableWrap`;

},{}],"jOCr5":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("elantra.0067b650.png") + "?" + Date.now();

},{}],"eSFbb":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("i30n.4d78e036.png") + "?" + Date.now();

},{}],"3LDYw":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("creta.469dce0c.png") + "?" + Date.now();

},{}],"hGuOG":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("sonata.360b898b.png") + "?" + Date.now();

},{}],"80vDI":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("solaris.ad08c0d3.png") + "?" + Date.now();

},{}],"2FJdO":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("tucson.caea86c2.png") + "?" + Date.now();

},{}]},["gwd56"], null, "parcelRequiree4dd", {}, "./", "/")

//# sourceMappingURL=OrdersPage.aa49af7c.js.map
