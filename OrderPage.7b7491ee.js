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
})({"cLs3Y":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "7eeb65527b7491ee";
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

},{}],"12mnl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrderPage", ()=>(0, _orderPage.OrderPage));
var _orderPage = require("./OrderPage");

},{"./OrderPage":"gDJyP","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"gDJyP":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$91f0 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$91f0.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$91f0.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrderPage", ()=>OrderPage);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _orderSection = require("@/widgets/OrderSection/OrderSection");
var _orderDataJson = require("@/shared/model/orderData.json");
var _orderDataJsonDefault = parcelHelpers.interopDefault(_orderDataJson);
var _types = require("@/widgets/OrderSection/model/types");
var _s = $RefreshSig$();
function OrderPage() {
    _s();
    const { isMenuOpen, toggleMenu } = (0, _reactRouterDom.useOutletContext)();
    const { orderId } = (0, _reactRouterDom.useParams)();
    const storedOrder = (0, _react.useMemo)(()=>{
        if (!orderId) return null;
        try {
            const raw = localStorage.getItem((0, _types.ORDER_STORAGE_KEY));
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            return parsed.orderId === orderId ? parsed : null;
        } catch  {
            return null;
        }
    }, [
        orderId
    ]);
    if (!orderId || !storedOrder) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _orderSection.OrderSection), {
        isMenuOpen: isMenuOpen,
        onMenuToggle: toggleMenu
    }, void 0, false, {
        fileName: "src/pages/OrderPage/OrderPage.tsx",
        lineNumber: 44,
        columnNumber: 12
    }, this);
    const car = (0, _orderDataJsonDefault.default).cars.find((c)=>`${c.brand}, ${c.name}` === storedOrder.carName) ?? (0, _orderDataJsonDefault.default).cars[0];
    const orderItems = [
        {
            label: "\u041F\u0443\u043D\u043A\u0442 \u0432\u044B\u0434\u0430\u0447\u0438",
            value: `${storedOrder.city}, ${storedOrder.pickupPoint}`
        },
        {
            label: "\u041C\u043E\u0434\u0435\u043B\u044C",
            value: storedOrder.carName
        },
        {
            label: "\u0426\u0432\u0435\u0442",
            value: storedOrder.color
        },
        {
            label: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0430\u0440\u0435\u043D\u0434\u044B",
            value: storedOrder.duration
        },
        {
            label: "\u0422\u0430\u0440\u0438\u0444",
            value: storedOrder.rate
        },
        {
            label: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0431\u0430\u043A",
            value: storedOrder.fullTank
        }
    ];
}
_s(OrderPage, "JI9UvVP1m5sLNy2i0R3Jz19j7JA=", false, function() {
    return [
        (0, _reactRouterDom.useOutletContext),
        (0, _reactRouterDom.useParams)
    ];
});
_c = OrderPage;
var _c;
$RefreshReg$(_c, "OrderPage");

  $parcel$ReactRefreshHelpers$91f0.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","react-router-dom":"61z4w","@/widgets/OrderSection/OrderSection":"coGlk","@/shared/model/orderData.json":"17rOc","@/widgets/OrderSection/model/types":"bf8WC","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"coGlk":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$3680 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$3680.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$3680.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrderSection", ()=>OrderSection);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _orderDataJson = require("@/shared/model/orderData.json");
var _orderDataJsonDefault = parcelHelpers.interopDefault(_orderDataJson);
var _baseSection = require("@/widgets/BaseSection");
var _loader = require("@/shared/components/Loader");
var _useApiOrderData = require("./model/useApiOrderData");
var _breadcrumbs = require("@/shared/components/Breadcrumbs");
var _horizontalContentContainer = require("@/shared/components/HorizontalContentContainer");
var _orderDefaults = require("@/config/orderDefaults");
var _orderSectionModuleScss = require("./OrderSection.module.scss");
var _ui = require("./ui");
var _orderStepRenderer = require("./ui/OrderStepRenderer");
var _types = require("./model/types");
var _formatPrice = require("./model/formatPrice");
var _useOrderSubmit = require("./model/useOrderSubmit");
var _s = $RefreshSig$();
const ru = String.fromCharCode;
const TEXT = {
    notSelected: ru(1053, 1077, 32, 1074, 1099, 1073, 1088, 1072, 1085, 1072),
    from: ru(1086, 1090),
    to: ru(1076, 1086),
    pickupPoint: ru(1055, 1091, 1085, 1082, 1090, 32, 1074, 1099, 1076, 1072, 1095, 1080),
    model: ru(1052, 1086, 1076, 1077, 1083, 1100),
    color: ru(1062, 1074, 1077, 1090),
    duration: ru(1044, 1083, 1080, 1090, 1077, 1083, 1100, 1085, 1086, 1089, 1090, 1100, 32, 1072, 1088, 1077, 1085, 1076, 1099),
    rate: ru(1058, 1072, 1088, 1080, 1092),
    fullTank: ru(1055, 1086, 1083, 1085, 1099, 1081, 32, 1073, 1072, 1082),
    dayRate: ru(1053, 1072, 32, 1089, 1091, 1090, 1082, 1080),
    minuteRate: ru(1055, 1086, 1084, 1080, 1085, 1091, 1090, 1085, 1086),
    yes: ru(1044, 1072),
    no: ru(1053, 1077, 1090),
    orderNumber: ru(1047, 1072, 1082, 1072, 1079, 32, 1085, 1086, 1084, 1077, 1088)
};
const formatAvailableAt = (value)=>{
    if (!value) return TEXT.notSelected;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year} 12:00`;
};
function OrderSection({ isMenuOpen, onMenuToggle }) {
    _s();
    const navigate = (0, _reactRouterDom.useNavigate)();
    const { stepSlug } = (0, _reactRouterDom.useParams)();
    const [orderState, setOrderState] = (0, _react.useState)({
        step: 1,
        cityInput: (0, _orderDefaults.ORDER_DEFAULTS).CITY,
        pickupInput: '',
        selectedPickupId: null,
        selectedCategory: (0, _orderDefaults.ORDER_DEFAULTS).CATEGORY,
        selectedCarId: null,
        selectedColor: (0, _orderDefaults.ORDER_DEFAULTS).COLOR,
        dateFrom: '',
        dateTo: '',
        selectedRateId: (0, _orderDefaults.ORDER_DEFAULTS).RATE_ID,
        selectedExtraIds: [
            ...(0, _orderDefaults.ORDER_DEFAULTS).EXTRAS
        ],
        isConfirmOpen: false,
        orderId: ''
    });
    const replaceOrderRouteStep = (0, _react.useCallback)((step)=>{
        const nextPath = `/order/${(0, _types.STEP_ROUTE_SEGMENTS)[step]}`;
        navigate(nextPath, {
            replace: true
        });
    }, [
        navigate
    ]);
    const { data: apiData, loading: apiLoading } = (0, _useApiOrderData.useApiOrderData)();
    const orderData = apiData ?? (0, _orderDataJsonDefault.default);
    const { cities } = orderData;
    const cityOptions = cities.map((city)=>city.name);
    const selectedCity = (0, _react.useMemo)(()=>cities.find((city)=>city.name.toLowerCase() === orderState.cityInput.trim().toLowerCase()) || null, [
        cities,
        orderState.cityInput
    ]);
    const pickupOptions = selectedCity ? selectedCity.pickupPoints.map((point)=>point.name) : [];
    const selectedPickup = (0, _react.useMemo)(()=>{
        if (!selectedCity) return null;
        if (orderState.selectedPickupId) return selectedCity.pickupPoints.find((point)=>point.id === orderState.selectedPickupId) || null;
        return selectedCity.pickupPoints.find((point)=>point.name.toLowerCase() === orderState.pickupInput.trim().toLowerCase()) || null;
    }, [
        orderState.pickupInput,
        selectedCity,
        orderState.selectedPickupId
    ]);
    const filteredCars = (0, _react.useMemo)(()=>{
        if (orderState.selectedCategory === (0, _orderDefaults.ORDER_DEFAULTS).CATEGORY) return orderData.cars;
        return orderData.cars.filter((car)=>car.category === orderState.selectedCategory);
    }, [
        orderData.cars,
        orderState.selectedCategory
    ]);
    const selectedCar = orderData.cars.find((car)=>car.id === orderState.selectedCarId) || null;
    const selectedRate = orderData.rentalRates.find((rate)=>rate.id === orderState.selectedRateId) || null;
    const selectedExtras = orderData.extras.filter((extra)=>orderState.selectedExtraIds.includes(extra.id));
    const availableAt = formatAvailableAt(orderState.dateFrom || orderState.dateTo);
    const isLocationStepComplete = Boolean(selectedCity && selectedPickup);
    const isModelStepComplete = Boolean(isLocationStepComplete && selectedCar);
    const isExtrasStepComplete = Boolean(isModelStepComplete && selectedRate && orderState.selectedColor);
    const canGoToStep2 = isLocationStepComplete;
    const canGoToStep3 = isModelStepComplete;
    const canGoToStep4 = isExtrasStepComplete;
    const minPrice = selectedCar?.priceMin || (0, _orderDefaults.ORDER_DEFAULTS).MIN_PRICE;
    const maxPrice = selectedCar?.priceMax || (0, _orderDefaults.ORDER_DEFAULTS).MAX_PRICE;
    const totalPrice = (0, _react.useMemo)(()=>{
        if (!selectedCar) return `${TEXT.from} ${(0, _formatPrice.formatPrice)(minPrice)} ${TEXT.to} ${(0, _formatPrice.formatPrice)(maxPrice)}`;
        const extrasPrice = selectedExtras.reduce((acc, extra)=>acc + extra.price, 0);
        const basePrice = selectedCar.priceMin;
        const ratePrice = selectedRate?.id === 'daily' ? selectedRate.price : 0;
        return (0, _formatPrice.formatPrice)(basePrice + extrasPrice + ratePrice);
    }, [
        maxPrice,
        minPrice,
        selectedCar,
        selectedExtras,
        selectedRate
    ]);
    const orderItems = [
        {
            label: TEXT.pickupPoint,
            value: selectedPickup ? `${selectedCity?.name}, ${selectedPickup.name}` : null
        },
        {
            label: TEXT.model,
            value: selectedCar ? `${selectedCar.brand}, ${selectedCar.name}` : null
        },
        {
            label: TEXT.color,
            value: orderState.step >= 3 ? orderState.selectedColor : null
        },
        {
            label: TEXT.duration,
            value: orderState.step >= 3 ? '1d 2h' : null
        },
        {
            label: TEXT.rate,
            value: orderState.step >= 3 ? selectedRate?.id === 'daily' ? TEXT.dayRate : TEXT.minuteRate : null
        },
        {
            label: TEXT.fullTank,
            value: orderState.step >= 3 ? orderState.selectedExtraIds.includes('fullTank') ? TEXT.yes : TEXT.no : null
        }
    ];
    const maxAvailableStep = (0, _react.useMemo)(()=>{
        if (canGoToStep4) return 4;
        if (canGoToStep3) return 3;
        if (canGoToStep2) return 2;
        return 1;
    }, [
        canGoToStep2,
        canGoToStep3,
        canGoToStep4
    ]);
    const isStepEnabled = (0, _react.useCallback)((stepIndex)=>stepIndex <= maxAvailableStep, [
        maxAvailableStep
    ]);
    const handleStepTransition = (0, _react.useCallback)((nextStep)=>{
        if (!isStepEnabled(nextStep)) return;
        replaceOrderRouteStep(nextStep);
    }, [
        isStepEnabled,
        replaceOrderRouteStep
    ]);
    (0, _react.useEffect)(()=>{
        if (orderState.step === 5) return;
        if (stepSlug && !(0, _types.ROUTE_SEGMENT_TO_STEP)[stepSlug]) {
            replaceOrderRouteStep(maxAvailableStep);
            return;
        }
        const rawStep = stepSlug ? (0, _types.ROUTE_SEGMENT_TO_STEP)[stepSlug] : 1;
        const guardedStep = rawStep <= maxAvailableStep ? rawStep : maxAvailableStep;
        if (orderState.step !== guardedStep) setOrderState((prev)=>({
                ...prev,
                step: guardedStep
            }));
        const expectedSegment = (0, _types.STEP_ROUTE_SEGMENTS)[guardedStep];
        if (stepSlug !== expectedSegment) replaceOrderRouteStep(guardedStep);
    }, [
        maxAvailableStep,
        orderState.step,
        replaceOrderRouteStep,
        stepSlug
    ]);
    const resetAfterLocationChange = (0, _react.useCallback)((prev)=>({
            ...prev,
            selectedCategory: (0, _orderDefaults.ORDER_DEFAULTS).CATEGORY,
            selectedCarId: null,
            selectedColor: (0, _orderDefaults.ORDER_DEFAULTS).COLOR,
            dateFrom: '',
            dateTo: '',
            selectedRateId: (0, _orderDefaults.ORDER_DEFAULTS).RATE_ID,
            selectedExtraIds: [
                ...(0, _orderDefaults.ORDER_DEFAULTS).EXTRAS
            ],
            step: 1
        }), []);
    const resetAfterModelChange = (0, _react.useCallback)((prev)=>({
            ...prev,
            selectedColor: (0, _orderDefaults.ORDER_DEFAULTS).COLOR,
            dateFrom: '',
            dateTo: '',
            selectedRateId: (0, _orderDefaults.ORDER_DEFAULTS).RATE_ID,
            selectedExtraIds: [
                ...(0, _orderDefaults.ORDER_DEFAULTS).EXTRAS
            ],
            step: 2
        }), []);
    const handleCityChange = (0, _react.useCallback)((value)=>{
        setOrderState((prev)=>resetAfterLocationChange({
                ...prev,
                cityInput: value,
                pickupInput: '',
                selectedPickupId: null
            }));
    }, [
        resetAfterLocationChange
    ]);
    const handlePickupChange = (0, _react.useCallback)((value)=>{
        setOrderState((prev)=>resetAfterLocationChange({
                ...prev,
                pickupInput: value,
                selectedPickupId: null
            }));
    }, [
        resetAfterLocationChange
    ]);
    const handlePickupSelectFromMap = (0, _react.useCallback)((pickupId)=>{
        setOrderState((prev)=>{
            if (!selectedCity) return prev;
            const point = selectedCity.pickupPoints.find((pickup)=>pickup.id === pickupId);
            if (!point) return prev;
            return {
                ...resetAfterLocationChange(prev),
                selectedPickupId: point.id,
                pickupInput: point.name
            };
        });
    }, [
        resetAfterLocationChange,
        selectedCity
    ]);
    const handleCarSelect = (0, _react.useCallback)((carId)=>{
        setOrderState((prev)=>resetAfterModelChange({
                ...prev,
                selectedCarId: carId
            }));
    }, [
        resetAfterModelChange
    ]);
    const handleExtraToggle = (0, _react.useCallback)((extraId)=>{
        setOrderState((prev)=>({
                ...prev,
                selectedExtraIds: prev.selectedExtraIds.includes(extraId) ? prev.selectedExtraIds.filter((item)=>item !== extraId) : [
                    ...prev.selectedExtraIds,
                    extraId
                ]
            }));
    }, []);
    const handleCategoryChange = (0, _react.useCallback)((category)=>{
        setOrderState((prev)=>{
            if (prev.selectedCategory === category) return prev;
            return resetAfterModelChange({
                ...prev,
                selectedCategory: category,
                selectedCarId: null
            });
        });
    }, [
        resetAfterModelChange
    ]);
    const handleColorChange = (0, _react.useCallback)((color)=>{
        setOrderState((prev)=>({
                ...prev,
                selectedColor: color
            }));
    }, []);
    const handleDateFromChange = (0, _react.useCallback)((value)=>{
        setOrderState((prev)=>({
                ...prev,
                dateFrom: value
            }));
    }, []);
    const handleDateToChange = (0, _react.useCallback)((value)=>{
        setOrderState((prev)=>({
                ...prev,
                dateTo: value
            }));
    }, []);
    const handleRateChange = (0, _react.useCallback)((rateId)=>{
        setOrderState((prev)=>({
                ...prev,
                selectedRateId: rateId
            }));
    }, []);
    const { handleSubmitOrder } = (0, _useOrderSubmit.useOrderSubmit)(orderState, {
        selectedCity: selectedCity,
        selectedPickup: selectedPickup,
        selectedCar: selectedCar,
        selectedRate: selectedRate,
        selectedColor: orderState.selectedColor,
        selectedExtraIds: orderState.selectedExtraIds,
        availableAt,
        totalPrice
    }, setOrderState);
    if (apiLoading && !apiData) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _baseSection.BaseSection), {
        isMenuOpen: isMenuOpen,
        onMenuToggle: onMenuToggle,
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _loader.Loader), {
            fullHeight: true
        }, void 0, false, {
            fileName: "src/widgets/OrderSection/OrderSection.tsx",
            lineNumber: 396,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/widgets/OrderSection/OrderSection.tsx",
        lineNumber: 395,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _baseSection.BaseSection), {
        isMenuOpen: isMenuOpen,
        onMenuToggle: onMenuToggle,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _orderSectionModuleScss.orderContent,
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: _orderSectionModuleScss.breadcrumbsContainer,
                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _horizontalContentContainer.HorizontalContentContainer), {
                            children: [
                                orderState.step !== 5 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _breadcrumbs.Breadcrumbs), {
                                    items: [
                                        1,
                                        2,
                                        3,
                                        4
                                    ].map((stepKey)=>({
                                            key: stepKey,
                                            label: (0, _types.STEP_LABELS)[stepKey],
                                            active: stepKey === orderState.step,
                                            enabled: isStepEnabled(stepKey)
                                        })),
                                    onStepClick: (nextStep)=>handleStepTransition(nextStep)
                                }, void 0, false, {
                                    fileName: "src/widgets/OrderSection/OrderSection.tsx",
                                    lineNumber: 407,
                                    columnNumber: 15
                                }, this),
                                orderState.step === 5 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                    className: _orderSectionModuleScss.orderNumber,
                                    children: [
                                        TEXT.orderNumber,
                                        " ",
                                        orderState.orderId
                                    ]
                                }, void 0, true, {
                                    fileName: "src/widgets/OrderSection/OrderSection.tsx",
                                    lineNumber: 419,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/widgets/OrderSection/OrderSection.tsx",
                            lineNumber: 405,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/widgets/OrderSection/OrderSection.tsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: _orderSectionModuleScss.split,
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("section", {
                                className: _orderSectionModuleScss.leftPane,
                                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _orderStepRenderer.OrderStepRenderer), {
                                    step: orderState.step,
                                    cityInput: orderState.cityInput,
                                    pickupInput: orderState.pickupInput,
                                    cityOptions: cityOptions,
                                    pickupOptions: pickupOptions,
                                    selectedCity: selectedCity,
                                    selectedPickup: selectedPickup,
                                    selectedCarId: orderState.selectedCarId,
                                    selectedCategory: orderState.selectedCategory,
                                    selectedColor: orderState.selectedColor,
                                    dateFrom: orderState.dateFrom,
                                    dateTo: orderState.dateTo,
                                    selectedRateId: orderState.selectedRateId,
                                    selectedExtraIds: orderState.selectedExtraIds,
                                    filteredCars: filteredCars,
                                    selectedCar: selectedCar,
                                    availableAt: availableAt,
                                    onCityChange: handleCityChange,
                                    onPickupChange: handlePickupChange,
                                    onPickupSelectFromMap: handlePickupSelectFromMap,
                                    onCategoryChange: handleCategoryChange,
                                    onCarSelect: handleCarSelect,
                                    onColorChange: handleColorChange,
                                    onDateFromChange: handleDateFromChange,
                                    onDateToChange: handleDateToChange,
                                    onRateChange: handleRateChange,
                                    onExtraToggle: handleExtraToggle
                                }, void 0, false, {
                                    fileName: "src/widgets/OrderSection/OrderSection.tsx",
                                    lineNumber: 426,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "src/widgets/OrderSection/OrderSection.tsx",
                                lineNumber: 425,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _ui.OrderSidebar), {
                                step: orderState.step,
                                items: orderItems,
                                priceText: selectedCar ? totalPrice : `${TEXT.from} ${(0, _formatPrice.formatPrice)(minPrice)} ${TEXT.to} ${(0, _formatPrice.formatPrice)(maxPrice)}`,
                                canGoToStep2: canGoToStep2,
                                canGoToStep3: canGoToStep3,
                                onStepChange: (step)=>handleStepTransition(step),
                                onOpenConfirm: ()=>setOrderState((prev)=>({
                                            ...prev,
                                            isConfirmOpen: true
                                        }))
                            }, void 0, false, {
                                fileName: "src/widgets/OrderSection/OrderSection.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/widgets/OrderSection/OrderSection.tsx",
                        lineNumber: 424,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/widgets/OrderSection/OrderSection.tsx",
                lineNumber: 403,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _ui.ConfirmModal), {
                isOpen: orderState.isConfirmOpen,
                onConfirm: handleSubmitOrder,
                onCancel: ()=>setOrderState((prev)=>({
                            ...prev,
                            isConfirmOpen: false
                        }))
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/OrderSection.tsx",
                lineNumber: 471,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/widgets/OrderSection/OrderSection.tsx",
        lineNumber: 402,
        columnNumber: 5
    }, this);
}
_s(OrderSection, "P8NmtHyM1w4yS2yLqw0MjK6Ozw4=", false, function() {
    return [
        (0, _reactRouterDom.useNavigate),
        (0, _reactRouterDom.useParams),
        (0, _useApiOrderData.useApiOrderData),
        (0, _useOrderSubmit.useOrderSubmit)
    ];
});
_c = OrderSection;
var _c;
$RefreshReg$(_c, "OrderSection");

  $parcel$ReactRefreshHelpers$3680.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","react-router-dom":"61z4w","@/shared/model/orderData.json":"17rOc","@/widgets/BaseSection":"UDN13","@/shared/components/Loader":"fHoxP","./model/useApiOrderData":"ciJI0","@/shared/components/Breadcrumbs":"3S2s1","@/shared/components/HorizontalContentContainer":"34dfs","@/config/orderDefaults":"lnYtK","./OrderSection.module.scss":"fITna","./ui":"b4Cu5","./ui/OrderStepRenderer":"h88o0","./model/types":"bf8WC","./model/formatPrice":"Oy39a","./model/useOrderSubmit":"5t25y","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"17rOc":[function(require,module,exports,__globalThis) {
module.exports = JSON.parse('{"cities":[{"id":"ulyanovsk","name":"\u0423\u043B\u044C\u044F\u043D\u043E\u0432\u0441\u043A","mapCenter":{"x":54,"y":66},"pickupPoints":[{"id":"uly-1","name":"\u041D\u0430\u0440\u0438\u043C\u0430\u043D\u043E\u0432\u0430 42","x":55,"y":67},{"id":"uly-2","name":"\u0413\u043E\u043D\u0447\u0430\u0440\u043E\u0432\u0430 11","x":64,"y":41},{"id":"uly-3","name":"\u041F\u0443\u0448\u043A\u0430\u0440\u0451\u0432\u0430 19","x":44,"y":26},{"id":"uly-4","name":"\u041A\u0438\u0440\u043E\u0432\u0430 2","x":30,"y":72}]},{"id":"kazan","name":"\u041A\u0430\u0437\u0430\u043D\u044C","mapCenter":{"x":52,"y":61},"pickupPoints":[{"id":"kzn-1","name":"\u041F\u0443\u0448\u043A\u0438\u043D\u0430 5","x":52,"y":58},{"id":"kzn-2","name":"\u041A\u0440\u0435\u043C\u043B\u0451\u0432\u0441\u043A\u0430\u044F 9","x":64,"y":35},{"id":"kzn-3","name":"\u0411\u0430\u0443\u043C\u0430\u043D\u0430 42","x":38,"y":73},{"id":"kzn-4","name":"\u0427\u0438\u0441\u0442\u043E\u043F\u043E\u043B\u044C\u0441\u043A\u0430\u044F 1","x":70,"y":64}]},{"id":"samara","name":"\u0421\u0430\u043C\u0430\u0440\u0430","mapCenter":{"x":55,"y":63},"pickupPoints":[{"id":"smr-1","name":"\u041B\u0435\u043D\u0438\u043D\u0430 12","x":56,"y":62},{"id":"smr-2","name":"\u041D\u043E\u0432\u043E-\u0421\u0430\u0434\u043E\u0432\u0430\u044F 44","x":66,"y":44},{"id":"smr-3","name":"\u0424\u0440\u0443\u043D\u0437\u0435 7","x":41,"y":74},{"id":"smr-4","name":"\u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0435 \u0448\u043E\u0441\u0441\u0435 99","x":28,"y":57}]},{"id":"moscow","name":"\u041C\u043E\u0441\u043A\u0432\u0430","mapCenter":{"x":52,"y":59},"pickupPoints":[{"id":"msk-1","name":"\u0422\u0432\u0435\u0440\u0441\u043A\u0430\u044F 10","x":51,"y":58},{"id":"msk-2","name":"\u041B\u0435\u043D\u0438\u043D\u0433\u0440\u0430\u0434\u0441\u043A\u0438\u0439 \u043F\u0440\u043E\u0441\u043F\u0435\u043A\u0442 35","x":36,"y":48},{"id":"msk-3","name":"\u041F\u0440\u043E\u0441\u043F\u0435\u043A\u0442 \u041C\u0438\u0440\u0430 74","x":61,"y":40},{"id":"msk-4","name":"\u041A\u0443\u0442\u0443\u0437\u043E\u0432\u0441\u043A\u0438\u0439 18","x":43,"y":70}]}],"carCategories":["\u0412\u0441\u0435 \u043C\u043E\u0434\u0435\u043B\u0438","\u042D\u043A\u043E\u043D\u043E\u043C","\u041F\u0440\u0435\u043C\u0438\u0443\u043C"],"cars":[{"id":"elantra","name":"ELANTRA","brand":"Hyundai","category":"\u042D\u043A\u043E\u043D\u043E\u043C","priceMin":12000,"priceMax":25000,"fuel":"100%","plate":"\u041A 761 \u041D\u0410 73","image":"/uploads/cars/elantra.png","variants":["\u041B\u0435\u0432\u044B\u0439 \u0440\u0443\u043B\u044C","\u041F\u0440\u0430\u0432\u044B\u0439 \u0440\u0443\u043B\u044C"],"colors":["\u041B\u044E\u0431\u043E\u0439","\u041A\u0440\u0430\u0441\u043D\u044B\u0439","\u0413\u043E\u043B\u0443\u0431\u043E\u0439"]},{"id":"i30","name":"i30 N","brand":"Hyundai","category":"\u041F\u0440\u0435\u043C\u0438\u0443\u043C","priceMin":10000,"priceMax":32000,"fuel":"100%","plate":"\u041A 761 \u041D\u0410 73","image":"/uploads/cars/i30n.png","variants":["\u041B\u0435\u0432\u044B\u0439 \u0440\u0443\u043B\u044C","\u041F\u0440\u0430\u0432\u044B\u0439 \u0440\u0443\u043B\u044C"],"colors":["\u041B\u044E\u0431\u043E\u0439","\u041A\u0440\u0430\u0441\u043D\u044B\u0439","\u0413\u043E\u043B\u0443\u0431\u043E\u0439"]},{"id":"creta","name":"CRETA","brand":"Hyundai","category":"\u042D\u043A\u043E\u043D\u043E\u043C","priceMin":12000,"priceMax":25000,"fuel":"95%","plate":"\u0410 123 \u041C\u0420 73","image":"/uploads/cars/creta.png","variants":["\u041B\u0435\u0432\u044B\u0439 \u0440\u0443\u043B\u044C","\u041F\u0440\u0430\u0432\u044B\u0439 \u0440\u0443\u043B\u044C"],"colors":["\u041B\u044E\u0431\u043E\u0439","\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439","\u0427\u0451\u0440\u043D\u044B\u0439"]},{"id":"sonata","name":"SONATA","brand":"Hyundai","category":"\u041F\u0440\u0435\u043C\u0438\u0443\u043C","priceMin":10000,"priceMax":32000,"fuel":"88%","plate":"\u041E 991 \u0422\u0420 73","image":"/uploads/cars/sonata.png","variants":["\u041B\u0435\u0432\u044B\u0439 \u0440\u0443\u043B\u044C","\u041F\u0440\u0430\u0432\u044B\u0439 \u0440\u0443\u043B\u044C"],"colors":["\u041B\u044E\u0431\u043E\u0439","\u0421\u0438\u043D\u0438\u0439","\u0427\u0451\u0440\u043D\u044B\u0439"]},{"id":"solaris","name":"SOLARIS","brand":"Hyundai","category":"\u042D\u043A\u043E\u043D\u043E\u043C","priceMin":8000,"priceMax":18000,"fuel":"77%","plate":"\u0412 010 \u0410\u0410 73","image":"/uploads/cars/solaris.png","variants":["\u041B\u0435\u0432\u044B\u0439 \u0440\u0443\u043B\u044C","\u041F\u0440\u0430\u0432\u044B\u0439 \u0440\u0443\u043B\u044C"],"colors":["\u041B\u044E\u0431\u043E\u0439","\u0411\u0435\u043B\u044B\u0439","\u0421\u0435\u0440\u044B\u0439"]},{"id":"tucson","name":"TUCSON","brand":"Hyundai","category":"\u041F\u0440\u0435\u043C\u0438\u0443\u043C","priceMin":14000,"priceMax":36000,"fuel":"92%","plate":"\u0421 555 \u0422\u0415 73","image":"/uploads/cars/tucson.png","variants":["\u041B\u0435\u0432\u044B\u0439 \u0440\u0443\u043B\u044C","\u041F\u0440\u0430\u0432\u044B\u0439 \u0440\u0443\u043B\u044C"],"colors":["\u041B\u044E\u0431\u043E\u0439","\u0411\u0435\u043B\u044B\u0439","\u0413\u043E\u043B\u0443\u0431\u043E\u0439"]}],"rentalRates":[{"id":"minute","label":"\u041F\u043E\u043C\u0438\u043D\u0443\u0442\u043D\u043E, 7 \u20BD/\u043C\u0438\u043D","price":7,"unit":"minute"},{"id":"daily","label":"\u041D\u0430 \u0441\u0443\u0442\u043A\u0438, 1999 \u20BD/\u0441\u0443\u0442\u043A\u0438","price":1999,"unit":"day"}],"extras":[{"id":"fullTank","label":"\u041F\u043E\u043B\u043D\u044B\u0439 \u0431\u0430\u043A","price":500},{"id":"childSeat","label":"\u0414\u0435\u0442\u0441\u043A\u043E\u0435 \u043A\u0440\u0435\u0441\u043B\u043E","price":200},{"id":"rightWheel","label":"\u041F\u0440\u0430\u0432\u044B\u0439 \u0440\u0443\u043B\u044C","price":1600}]}');

},{}],"UDN13":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseSection", ()=>(0, _baseSection.BaseSection));
var _baseSection = require("./BaseSection");

},{"./BaseSection":"eIds4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"eIds4":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$0e38 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$0e38.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$0e38.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseSection", ()=>BaseSection);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _header = require("@/widgets/Header");
var _horizontalContentContainer = require("@/shared/components/HorizontalContentContainer");
var _baseSectionModuleScss = require("./BaseSection.module.scss");
function BaseSection({ isMenuOpen, onMenuToggle, children }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("section", {
        className: _baseSectionModuleScss.section,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _baseSectionModuleScss.headerContainer,
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _horizontalContentContainer.HorizontalContentContainer), {
                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _header.Header), {
                        isMenuOpen: isMenuOpen,
                        onMenuToggle: onMenuToggle
                    }, void 0, false, {
                        fileName: "src/widgets/BaseSection/BaseSection.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/widgets/BaseSection/BaseSection.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/widgets/BaseSection/BaseSection.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _baseSectionModuleScss.content,
                children: children
            }, void 0, false, {
                fileName: "src/widgets/BaseSection/BaseSection.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/widgets/BaseSection/BaseSection.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = BaseSection;
var _c;
$RefreshReg$(_c, "BaseSection");

  $parcel$ReactRefreshHelpers$0e38.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","@/widgets/Header":"i9Clt","@/shared/components/HorizontalContentContainer":"34dfs","./BaseSection.module.scss":"l4YHj","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"i9Clt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Header", ()=>(0, _header.Header));
var _header = require("./Header");

},{"./Header":"dNFtD","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dNFtD":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$06fc = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$06fc.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$06fc.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Header", ()=>Header);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _burgerButton = require("@/shared/components/BurgerButton");
var _logo = require("@/shared/components/Logo");
var _waypoint = require("@/shared/components/Waypoint");
var _headerModuleScss = require("./Header.module.scss");
function Header({ isMenuOpen, onMenuToggle }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("header", {
        className: _headerModuleScss.header,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _burgerButton.BurgerButton), {
                color: "dark",
                isActive: isMenuOpen,
                mobileOnly: true,
                onClick: onMenuToggle
            }, void 0, false, {
                fileName: "src/widgets/Header/Header.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _logo.Logo), {}, void 0, false, {
                fileName: "src/widgets/Header/Header.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _waypoint.Waypoint), {
                city: "\u0423\u043B\u044C\u044F\u043D\u043E\u0432\u0441\u043A"
            }, void 0, false, {
                fileName: "src/widgets/Header/Header.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/widgets/Header/Header.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Header;
var _c;
$RefreshReg$(_c, "Header");

  $parcel$ReactRefreshHelpers$06fc.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","@/shared/components/BurgerButton":"9BMea","@/shared/components/Logo":"iqIfN","@/shared/components/Waypoint":"bdjIt","./Header.module.scss":"1ONeN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"iqIfN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Logo", ()=>(0, _logo.Logo));
var _logo = require("./Logo");

},{"./Logo":"3aPa8","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3aPa8":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$8cd8 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$8cd8.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$8cd8.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Logo", ()=>Logo);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _reactRouterDom = require("react-router-dom");
var _logoModuleScss = require("./Logo.module.scss");
function Logo() {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactRouterDom.Link), {
        className: _logoModuleScss.logo,
        to: "/",
        children: "Need for drive"
    }, void 0, false, {
        fileName: "src/shared/components/Logo/Logo.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = Logo;
var _c;
$RefreshReg$(_c, "Logo");

  $parcel$ReactRefreshHelpers$8cd8.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react-router-dom":"61z4w","./Logo.module.scss":"3oRkn","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"3oRkn":[function(require,module,exports,__globalThis) {
module.exports["logo"] = `wfJX8q_logo`;

},{}],"bdjIt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Waypoint", ()=>(0, _waypoint.Waypoint));
var _waypoint = require("./Waypoint");

},{"./Waypoint":"ggby4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"ggby4":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$3920 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$3920.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$3920.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Waypoint", ()=>Waypoint);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _waypointModuleScss = require("./Waypoint.module.scss");
function Waypoint({ city }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
        className: _waypointModuleScss.waypoint,
        href: "#",
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("svg", {
                className: _waypointModuleScss.icon,
                fill: "none",
                viewBox: "0 0 18 20",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("path", {
                        d: "M16.0802 8.36364C16.0802 14.0909 8.54011 19 8.54011 19C8.54011 19 1 14.0909 1 8.36364C1 6.41068 1.7944 4.53771 3.20845 3.15676C4.62249 1.77581 6.54035 1 8.54011 1C10.5399 1 12.4577 1.77581 13.8718 3.15676C15.2858 4.53771 16.0802 6.41068 16.0802 8.36364Z",
                        stroke: "#999999",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "src/shared/components/Waypoint/Waypoint.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("path", {
                        d: "M8.5401 10.8182C9.9282 10.8182 11.0535 9.71925 11.0535 8.36364C11.0535 7.00803 9.9282 5.90909 8.5401 5.90909C7.15201 5.90909 6.02673 7.00803 6.02673 8.36364C6.02673 9.71925 7.15201 10.8182 8.5401 10.8182Z",
                        stroke: "#999999",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "src/shared/components/Waypoint/Waypoint.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/shared/components/Waypoint/Waypoint.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                className: _waypointModuleScss.text,
                children: city
            }, void 0, false, {
                fileName: "src/shared/components/Waypoint/Waypoint.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/shared/components/Waypoint/Waypoint.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Waypoint;
var _c;
$RefreshReg$(_c, "Waypoint");

  $parcel$ReactRefreshHelpers$3920.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","./Waypoint.module.scss":"lWgVN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"lWgVN":[function(require,module,exports,__globalThis) {
module.exports["icon"] = `Jc1tFa_icon`;
module.exports["text"] = `Jc1tFa_text`;
module.exports["waypoint"] = `Jc1tFa_waypoint`;

},{}],"1ONeN":[function(require,module,exports,__globalThis) {
module.exports["header"] = `ObOPJq_header`;

},{}],"34dfs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HorizontalContentContainer", ()=>(0, _horizontalContentContainer.HorizontalContentContainer));
var _horizontalContentContainer = require("./HorizontalContentContainer");

},{"./HorizontalContentContainer":"cnyr9","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"cnyr9":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$8a36 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$8a36.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$8a36.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HorizontalContentContainer", ()=>HorizontalContentContainer);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _horizontalContentContainerModuleScss = require("./HorizontalContentContainer.module.scss");
function HorizontalContentContainer({ children }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _horizontalContentContainerModuleScss.container,
        children: children
    }, void 0, false, {
        fileName: "src/shared/components/HorizontalContentContainer/HorizontalContentContainer.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_c = HorizontalContentContainer;
var _c;
$RefreshReg$(_c, "HorizontalContentContainer");

  $parcel$ReactRefreshHelpers$8a36.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","./HorizontalContentContainer.module.scss":"4P2OM","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"4P2OM":[function(require,module,exports,__globalThis) {
module.exports["container"] = `Ip70_a_container`;

},{}],"l4YHj":[function(require,module,exports,__globalThis) {
module.exports["content"] = `jFHU3W_content`;
module.exports["headerContainer"] = `jFHU3W_headerContainer`;
module.exports["section"] = `jFHU3W_section`;

},{}],"ciJI0":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$13a1 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$13a1.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$13a1.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useApiOrderData", ()=>useApiOrderData);
var _react = require("react");
var _citiesApi = require("@/shared/api/citiesApi");
var _carsApi = require("@/shared/api/carsApi");
const ru = String.fromCharCode;
const ECONOMY_CATEGORY = ru(1069, 1082, 1086, 1085, 1086, 1084);
const PREMIUM_CATEGORY = ru(1055, 1088, 1077, 1084, 1080, 1091, 1084);
const DEFAULT_BRAND = ru(1040, 1074, 1090, 1086);
const DEFAULT_PLATE = ru(1050, 32, 55, 54, 49, 32, 1053, 1040, 32, 55, 51);
const DEFAULT_RATE_LABEL = ru(1058, 1072, 1088, 1080, 1092);
const RATE_DAILY_MARKER = ru(1089, 1091, 1090);
const RUBLE_SIGN = ru(8381);
const LOAD_ERROR = ru(1054, 1096, 1080, 1073, 1082, 1072, 32, 1079, 1072, 1075, 1088, 1091, 1079, 1082, 1080, 32, 1076, 1072, 1085, 1085, 1099, 1093);
const EXTRAS_STATIC = [
    {
        id: 'fullTank',
        label: `${ru(1055, 1086, 1083, 1085, 1099, 1081, 32, 1073, 1072, 1082)}, 500${ru(1088)}`,
        price: 500
    },
    {
        id: 'childChair',
        label: `${ru(1044, 1077, 1090, 1089, 1082, 1086, 1077, 32, 1082, 1088, 1077, 1089, 1083, 1086)}, 200${ru(1088)}`,
        price: 200
    },
    {
        id: 'rightWheel',
        label: `${ru(1055, 1088, 1072, 1074, 1099, 1081, 32, 1088, 1091, 1083, 1100)}, 1600${ru(1088)}`,
        price: 1600
    }
];
function pseudoCoord(seed, offset) {
    return (seed * 7919 + offset) % 80 + 10;
}
function useApiOrderData() {
    const [data, setData] = (0, _react.useState)(null);
    const [loading, setLoading] = (0, _react.useState)(true);
    const [error, setError] = (0, _react.useState)(null);
    (0, _react.useEffect)(()=>{
        let cancelled = false;
        setLoading(true);
        setError(null);
        Promise.all([
            (0, _citiesApi.citiesApi).getAll(),
            (0, _citiesApi.pointsApi).getAll({
                limit: 1000
            }),
            (0, _carsApi.carsApi).getAll({
                limit: 1000
            }),
            (0, _citiesApi.ratesApi).getAll()
        ]).then(([citiesRes, pointsRes, carsRes, ratesRes])=>{
            if (cancelled) return;
            const cities = citiesRes.data;
            const points = pointsRes.data;
            const cars = carsRes.data;
            const rates = ratesRes.data;
            const mapped = {
                cities: cities.map((c)=>{
                    const cityPoints = points.filter((p)=>p.cityId?.id === c.id);
                    return {
                        id: `city-${c.id}`,
                        backendId: c.id,
                        name: c.name,
                        mapCenter: {
                            x: 50,
                            y: 50
                        },
                        pickupPoints: cityPoints.map((p, idx)=>({
                                id: `point-${p.id}`,
                                name: p.name,
                                x: pseudoCoord(p.id, idx * 13),
                                y: pseudoCoord(p.id + 1, idx * 17)
                            }))
                    };
                }),
                cars: cars.map((car)=>{
                    const parts = (car.name || '').split(' ');
                    const brand = parts[0] || car.name || DEFAULT_BRAND;
                    const rest = parts.slice(1).join(' ') || car.name;
                    const rawFuel = String(car.tank || '').trim();
                    const fuel = rawFuel ? rawFuel.includes('%') ? rawFuel : `${rawFuel}%` : '100%';
                    return {
                        id: `car-${car.id}`,
                        backendId: car.id,
                        brand,
                        name: rest,
                        category: car.categoryId?.id === 1 ? ECONOMY_CATEGORY : PREMIUM_CATEGORY,
                        image: car.thumbnail?.path || '',
                        priceMin: car.priceMin || 0,
                        priceMax: car.priceMax || 0,
                        colors: car.colors || [],
                        plate: car.number || DEFAULT_PLATE,
                        fuel
                    };
                }),
                rentalRates: rates.map((r)=>({
                        id: r.rateTypeId?.name?.toLowerCase().includes(RATE_DAILY_MARKER) ? 'daily' : 'minute',
                        label: `${r.rateTypeId?.name || DEFAULT_RATE_LABEL}, ${r.price} ${RUBLE_SIGN}/${r.rateTypeId?.unit || ''}`,
                        price: r.price,
                        backendId: r.id
                    })),
                extras: EXTRAS_STATIC
            };
            setData(mapped);
        }).catch((e)=>{
            if (!cancelled) setError(e.message || LOAD_ERROR);
        }).finally(()=>{
            if (!cancelled) setLoading(false);
        });
        return ()=>{
            cancelled = true;
        };
    }, []);
    return {
        data,
        loading,
        error
    };
}

  $parcel$ReactRefreshHelpers$13a1.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react":"jMk1U","@/shared/api/citiesApi":"kzLY1","@/shared/api/carsApi":"iSPxy","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"kzLY1":[function(require,module,exports,__globalThis) {
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

},{"./mockStore":"d1tY0","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3S2s1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Breadcrumbs", ()=>(0, _breadcrumbs.Breadcrumbs));
var _breadcrumbs = require("./Breadcrumbs");

},{"./Breadcrumbs":"ciQ7w","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"ciQ7w":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$e153 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$e153.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$e153.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Breadcrumbs", ()=>Breadcrumbs);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _breadcrumbsModuleScss = require("./Breadcrumbs.module.scss");
const Breadcrumbs = ({ items, onStepClick })=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _breadcrumbsModuleScss.breadcrumbs,
        children: items.map((item, index)=>{
            const isClickable = Boolean(item.enabled && onStepClick);
            return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                        className: `${_breadcrumbsModuleScss.item} ${item.active ? _breadcrumbsModuleScss.active : ''} ${!item.enabled ? _breadcrumbsModuleScss.disabled : ''}`,
                        disabled: !isClickable,
                        type: "button",
                        onClick: ()=>onStepClick?.(item.key),
                        children: item.label
                    }, void 0, false, {
                        fileName: "src/shared/components/Breadcrumbs/Breadcrumbs.tsx",
                        lineNumber: 23,
                        columnNumber: 13
                    }, undefined),
                    index < items.length - 1 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                        className: _breadcrumbsModuleScss.separator,
                        children: "\u25B6"
                    }, void 0, false, {
                        fileName: "src/shared/components/Breadcrumbs/Breadcrumbs.tsx",
                        lineNumber: 31,
                        columnNumber: 42
                    }, undefined)
                ]
            }, item.key, true, {
                fileName: "src/shared/components/Breadcrumbs/Breadcrumbs.tsx",
                lineNumber: 22,
                columnNumber: 11
            }, undefined);
        })
    }, void 0, false, {
        fileName: "src/shared/components/Breadcrumbs/Breadcrumbs.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, undefined);
_c = Breadcrumbs;
var _c;
$RefreshReg$(_c, "Breadcrumbs");

  $parcel$ReactRefreshHelpers$e153.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","./Breadcrumbs.module.scss":"8O59c","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"8O59c":[function(require,module,exports,__globalThis) {
module.exports["active"] = `ZJU3NG_active`;
module.exports["breadcrumbs"] = `ZJU3NG_breadcrumbs`;
module.exports["disabled"] = `ZJU3NG_disabled`;
module.exports["item"] = `ZJU3NG_item`;
module.exports["separator"] = `ZJU3NG_separator`;

},{}],"lnYtK":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ORDER_DEFAULTS", ()=>ORDER_DEFAULTS);
const ru = String.fromCharCode;
const ORDER_DEFAULTS = {
    CITY: ru(1059, 1083, 1100, 1103, 1085, 1086, 1074, 1089, 1082),
    COLOR: ru(1043, 1086, 1083, 1091, 1073, 1086, 1081),
    RATE_ID: 'daily',
    EXTRAS: [
        'fullTank'
    ],
    CATEGORY: ru(1042, 1089, 1077, 32, 1084, 1086, 1076, 1077, 1083, 1080),
    MIN_PRICE: 8000,
    MAX_PRICE: 12000
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fITna":[function(require,module,exports,__globalThis) {
module.exports["breadcrumbsContainer"] = `ybhGja_breadcrumbsContainer`;
module.exports["leftPane"] = `ybhGja_leftPane`;
module.exports["orderContent"] = `ybhGja_orderContent`;
module.exports["orderNumber"] = `ybhGja_orderNumber`;
module.exports["split"] = `ybhGja_split`;
module.exports["stepPanel"] = `ybhGja_stepPanel`;

},{}],"b4Cu5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ConfirmModal", ()=>(0, _confirmModal.ConfirmModal));
parcelHelpers.export(exports, "ModelCard", ()=>(0, _modelCard.ModelCard));
parcelHelpers.export(exports, "OrderSidebar", ()=>(0, _orderSidebar.OrderSidebar));
parcelHelpers.export(exports, "StepExtras", ()=>(0, _stepExtras.StepExtras));
parcelHelpers.export(exports, "StepLocation", ()=>(0, _stepLocation.StepLocation));
parcelHelpers.export(exports, "StepModels", ()=>(0, _stepModels.StepModels));
parcelHelpers.export(exports, "StepSummary", ()=>(0, _stepSummary.StepSummary));
parcelHelpers.export(exports, "RadioOption", ()=>(0, _radioOption.RadioOption));
parcelHelpers.export(exports, "CheckboxOption", ()=>(0, _checkboxOption.CheckboxOption));
parcelHelpers.export(exports, "SectionTitle", ()=>(0, _sectionTitle.SectionTitle));
parcelHelpers.export(exports, "DateInputRow", ()=>(0, _dateInputRow.DateInputRow));
var _confirmModal = require("./ConfirmModal");
var _modelCard = require("./ModelCard");
var _orderSidebar = require("./OrderSidebar");
var _stepExtras = require("./StepExtras");
var _stepLocation = require("./StepLocation");
var _stepModels = require("./StepModels");
var _stepSummary = require("./StepSummary");
var _radioOption = require("./RadioOption");
var _checkboxOption = require("./CheckboxOption");
var _sectionTitle = require("./SectionTitle");
var _dateInputRow = require("./DateInputRow");

},{"./ConfirmModal":"hGOCh","./ModelCard":"1gmWB","./OrderSidebar":"45k9f","./StepExtras":"80puh","./StepLocation":"79vcC","./StepModels":"5ZNaQ","./StepSummary":"03P3r","./RadioOption":"gQSOc","./CheckboxOption":"eLa6Z","./SectionTitle":"bq7ed","./DateInputRow":"88eGo","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hGOCh":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ConfirmModal", ()=>(0, _confirmModal.ConfirmModal));
var _confirmModal = require("./ConfirmModal");

},{"./ConfirmModal":"9VRar","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9VRar":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$a116 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$a116.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$a116.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ConfirmModal", ()=>ConfirmModal);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _confirmModalModuleScss = require("./ConfirmModal.module.scss");
const ru = String.fromCharCode;
const TEXT = {
    title: ru(1055, 1086, 1076, 1090, 1074, 1077, 1088, 1076, 1080, 1090, 1100, 32, 1079, 1072, 1082, 1072, 1079),
    confirm: ru(1055, 1086, 1076, 1090, 1074, 1077, 1088, 1076, 1080, 1090, 1100),
    back: ru(1042, 1077, 1088, 1085, 1091, 1090, 1100, 1089, 1103)
};
function ConfirmModal({ isOpen, onConfirm, onCancel }) {
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _confirmModalModuleScss.modalOverlay,
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
            className: _confirmModalModuleScss.modalContent,
            children: [
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                    className: _confirmModalModuleScss.title,
                    children: TEXT.title
                }, void 0, false, {
                    fileName: "src/widgets/OrderSection/ui/ConfirmModal/ConfirmModal.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    className: _confirmModalModuleScss.modalActions,
                    children: [
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                            className: _confirmModalModuleScss.mainAction,
                            type: "button",
                            onClick: onConfirm,
                            children: TEXT.confirm
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/ConfirmModal/ConfirmModal.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                            className: _confirmModalModuleScss.cancelAction,
                            type: "button",
                            onClick: onCancel,
                            children: TEXT.back
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/ConfirmModal/ConfirmModal.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/widgets/OrderSection/ui/ConfirmModal/ConfirmModal.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/widgets/OrderSection/ui/ConfirmModal/ConfirmModal.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/widgets/OrderSection/ui/ConfirmModal/ConfirmModal.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = ConfirmModal;
var _c;
$RefreshReg$(_c, "ConfirmModal");

  $parcel$ReactRefreshHelpers$a116.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","./ConfirmModal.module.scss":"lXspg","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"lXspg":[function(require,module,exports,__globalThis) {
module.exports["cancelAction"] = `ot5RvG_cancelAction`;
module.exports["mainAction"] = `ot5RvG_mainAction`;
module.exports["modalActions"] = `ot5RvG_modalActions`;
module.exports["modalContent"] = `ot5RvG_modalContent`;
module.exports["modalOverlay"] = `ot5RvG_modalOverlay`;
module.exports["title"] = `ot5RvG_title`;

},{}],"1gmWB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ModelCard", ()=>(0, _modelCard.ModelCard));
var _modelCard = require("./ModelCard");

},{"./ModelCard":"bGH2p","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bGH2p":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$cae5 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$cae5.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$cae5.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ModelCard", ()=>ModelCard);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _formatPrice = require("@/widgets/OrderSection/model/formatPrice");
var _carImages = require("@/widgets/OrderSection/ui/ModelCard/carImages");
var _modelCardModuleScss = require("./ModelCard.module.scss");
var _s = $RefreshSig$();
function ModelCard({ car, selected, onSelect }) {
    _s();
    const [hasImageError, setHasImageError] = (0, _react.useState)(false);
    const imageSrc = (0, _carImages.getCarImage)(car);
    const hasImage = Boolean(imageSrc) && !hasImageError;
    const handleImageError = ()=>{
        console.error('Failed to load image for:', car.id, imageSrc);
        setHasImageError(true);
    };
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
        className: `${_modelCardModuleScss.card} ${selected ? _modelCardModuleScss.selected : ''}`,
        type: "button",
        onClick: ()=>onSelect(car.id),
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _modelCardModuleScss.name,
                children: car.name
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/ModelCard/ModelCard.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _modelCardModuleScss.price,
                children: `${(0, _formatPrice.formatPrice)(car.priceMin)} - ${(0, _formatPrice.formatPrice)(car.priceMax)}`
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/ModelCard/ModelCard.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _modelCardModuleScss.imageWrap,
                children: hasImage ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("img", {
                    className: _modelCardModuleScss.image,
                    src: imageSrc,
                    alt: car.name,
                    onError: handleImageError
                }, void 0, false, {
                    fileName: "src/widgets/OrderSection/ui/ModelCard/ModelCard.tsx",
                    lineNumber: 35,
                    columnNumber: 21
                }, this) : null
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/ModelCard/ModelCard.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/widgets/OrderSection/ui/ModelCard/ModelCard.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(ModelCard, "hksgi+MjrUU53AfCPg21D2OtVF8=");
_c = ModelCard;
var _c;
$RefreshReg$(_c, "ModelCard");

  $parcel$ReactRefreshHelpers$cae5.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@/widgets/OrderSection/model/formatPrice":"Oy39a","@/widgets/OrderSection/ui/ModelCard/carImages":"aCdjN","./ModelCard.module.scss":"1wYnd","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"Oy39a":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "formatPrice", ()=>formatPrice);
function formatPrice(value) {
    return `${value.toLocaleString('ru-RU')} \u{20BD}`;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aCdjN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "carImages", ()=>carImages);
parcelHelpers.export(exports, "getCarImage", ()=>getCarImage);
const carImages = {
    elantra: new URL(require("6381d80009c7e098")).href,
    i30: new URL(require("e560442516435aa3")).href,
    creta: new URL(require("4c5d21a01edfc51b")).href,
    sonata: new URL(require("59f586c8c9b6904e")).href,
    solaris: new URL(require("3d90ab824a99239f")).href,
    tucson: new URL(require("64ebaa88594a61a")).href
};
function getCarImage(car) {
    const source = `${car?.id || ''} ${car?.name || ''} ${car?.image || ''}`.toLowerCase();
    if (source.includes('elantra')) return carImages.elantra;
    if (source.includes('creta')) return carImages.creta;
    if (source.includes('sonata')) return carImages.sonata;
    if (source.includes('solaris')) return carImages.solaris;
    if (source.includes('tucson')) return carImages.tucson;
    return carImages.i30;
}

},{"6381d80009c7e098":"jOCr5","e560442516435aa3":"eSFbb","4c5d21a01edfc51b":"3LDYw","59f586c8c9b6904e":"hGuOG","3d90ab824a99239f":"80vDI","64ebaa88594a61a":"2FJdO","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jOCr5":[function(require,module,exports,__globalThis) {
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

},{}],"1wYnd":[function(require,module,exports,__globalThis) {
module.exports["card"] = `RepfMG_card`;
module.exports["image"] = `RepfMG_image`;
module.exports["imageWrap"] = `RepfMG_imageWrap`;
module.exports["name"] = `RepfMG_name`;
module.exports["price"] = `RepfMG_price`;
module.exports["selected"] = `RepfMG_selected`;

},{}],"45k9f":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrderSidebar", ()=>(0, _orderSidebar.OrderSidebar));
var _orderSidebar = require("./OrderSidebar");

},{"./OrderSidebar":"jLSou","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jLSou":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$82a2 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$82a2.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$82a2.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrderSidebar", ()=>OrderSidebar);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _button = require("@/shared/components/Button");
var _orderDetails = require("@/shared/components/OrderDetails");
var _orderSidebarModuleScss = require("./OrderSidebar.module.scss");
const ru = String.fromCharCode;
const TEXT = {
    yourOrder: ru(1042, 1072, 1096, 32, 1079, 1072, 1082, 1072, 1079, 58),
    chooseModel: ru(1042, 1099, 1073, 1088, 1072, 1090, 1100, 32, 1084, 1086, 1076, 1077, 1083, 1100),
    additionally: ru(1044, 1086, 1087, 1086, 1083, 1085, 1080, 1090, 1077, 1083, 1100, 1085, 1086),
    total: ru(1048, 1090, 1086, 1075, 1086),
    order: ru(1047, 1072, 1082, 1072, 1079, 1072, 1090, 1100),
    cancel: ru(1054, 1090, 1084, 1077, 1085, 1080, 1090, 1100)
};
const OrderSidebar = /*#__PURE__*/ (0, _react.memo)(_c = function OrderSidebar({ step, items, priceText, canGoToStep2, canGoToStep3, onStepChange, onOpenConfirm }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("aside", {
        className: _orderSidebarModuleScss.sidebar,
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
            className: _orderSidebarModuleScss.box,
            children: [
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                    className: _orderSidebarModuleScss.title,
                    children: TEXT.yourOrder
                }, void 0, false, {
                    fileName: "src/widgets/OrderSection/ui/OrderSidebar/OrderSidebar.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _orderDetails.OrderDetails), {
                    items: items,
                    priceText: priceText
                }, void 0, false, {
                    fileName: "src/widgets/OrderSection/ui/OrderSidebar/OrderSidebar.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    className: _orderSidebarModuleScss.buttonContainer,
                    children: [
                        step === 1 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _button.Button), {
                            size: "full",
                            disabled: !canGoToStep2,
                            onClick: ()=>onStepChange(2),
                            children: TEXT.chooseModel
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/OrderSidebar/OrderSidebar.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this),
                        step === 2 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _button.Button), {
                            size: "full",
                            disabled: !canGoToStep3,
                            type: "button",
                            onClick: ()=>onStepChange(3),
                            children: TEXT.additionally
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/OrderSidebar/OrderSidebar.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this),
                        step === 3 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _button.Button), {
                            size: "full",
                            onClick: ()=>onStepChange(4),
                            children: TEXT.total
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/OrderSidebar/OrderSidebar.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this),
                        step === 4 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _button.Button), {
                            size: "full",
                            onClick: onOpenConfirm,
                            children: TEXT.order
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/OrderSidebar/OrderSidebar.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this),
                        step === 5 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _button.Button), {
                            size: "full",
                            tone: "darkRed",
                            children: TEXT.cancel
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/OrderSidebar/OrderSidebar.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/widgets/OrderSection/ui/OrderSidebar/OrderSidebar.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/widgets/OrderSection/ui/OrderSidebar/OrderSidebar.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/widgets/OrderSection/ui/OrderSidebar/OrderSidebar.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
});
_c1 = OrderSidebar;
var _c, _c1;
$RefreshReg$(_c, "OrderSidebar$memo");
$RefreshReg$(_c1, "OrderSidebar");

  $parcel$ReactRefreshHelpers$82a2.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@/shared/components/Button":"IybDD","@/shared/components/OrderDetails":"4EwDN","./OrderSidebar.module.scss":"1Vzcl","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"IybDD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Button", ()=>(0, _button.Button));
var _button = require("./Button");

},{"./Button":"emxqQ","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"emxqQ":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$68e4 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$68e4.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$68e4.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Button", ()=>Button);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _classNames = require("@/shared/lib/classNames");
var _buttonModuleScss = require("./Button.module.scss");
const toneClassName = {
    primary: _buttonModuleScss.tonePrimary,
    darkGreen: _buttonModuleScss.toneDarkGreen,
    cyan: _buttonModuleScss.toneCyan,
    darkRed: _buttonModuleScss.toneDarkRed,
    purple: _buttonModuleScss.tonePurple
};
const sizeClassName = {
    hero: _buttonModuleScss.sizeHero,
    slider: _buttonModuleScss.sizeSlider,
    full: _buttonModuleScss.sizeFull
};
function Button({ children, className, fullWidthOnMobile = false, squareOnMobile = false, size = 'hero', tone = 'primary', type = 'button', disabled = false, ...props }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
        className: (0, _classNames.classNames)(_buttonModuleScss.button, toneClassName[tone], sizeClassName[size], fullWidthOnMobile && _buttonModuleScss.fullWidthOnMobile, squareOnMobile && _buttonModuleScss.squareOnMobile, disabled && _buttonModuleScss.disabled, className),
        type: type,
        disabled: disabled,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "src/shared/components/Button/Button.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
$RefreshReg$(_c, "Button");

  $parcel$ReactRefreshHelpers$68e4.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","@/shared/lib/classNames":"aoYIh","./Button.module.scss":"lhQzf","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"lhQzf":[function(require,module,exports,__globalThis) {
module.exports["button"] = `HoRqaa_button`;
module.exports["disabled"] = `HoRqaa_disabled`;
module.exports["fullWidthOnMobile"] = `HoRqaa_fullWidthOnMobile`;
module.exports["sizeFull"] = `HoRqaa_sizeFull`;
module.exports["sizeHero"] = `HoRqaa_sizeHero`;
module.exports["sizeSlider"] = `HoRqaa_sizeSlider`;
module.exports["squareOnMobile"] = `HoRqaa_squareOnMobile`;
module.exports["toneCyan"] = `HoRqaa_toneCyan`;
module.exports["toneDarkGreen"] = `HoRqaa_toneDarkGreen`;
module.exports["toneDarkRed"] = `HoRqaa_toneDarkRed`;
module.exports["tonePrimary"] = `HoRqaa_tonePrimary`;
module.exports["tonePurple"] = `HoRqaa_tonePurple`;

},{}],"4EwDN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrderDetails", ()=>(0, _orderDetails.OrderDetails));
var _orderDetails = require("./OrderDetails");

},{"./OrderDetails":"gNZor","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"gNZor":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$6d91 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$6d91.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$6d91.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrderDetails", ()=>OrderDetails);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _orderDetailsModuleScss = require("./OrderDetails.module.scss");
function OrderDetails({ items, priceText }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _orderDetailsModuleScss.orderDetails,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("ul", {
                className: _orderDetailsModuleScss.list,
                children: items.map((item)=>item.value && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
                        className: _orderDetailsModuleScss.item,
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                className: _orderDetailsModuleScss.label,
                                children: item.label
                            }, void 0, false, {
                                fileName: "src/shared/components/OrderDetails/OrderDetails.tsx",
                                lineNumber: 21,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: _orderDetailsModuleScss.dots
                            }, void 0, false, {
                                fileName: "src/shared/components/OrderDetails/OrderDetails.tsx",
                                lineNumber: 22,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                className: _orderDetailsModuleScss.value,
                                children: item.value
                            }, void 0, false, {
                                fileName: "src/shared/components/OrderDetails/OrderDetails.tsx",
                                lineNumber: 23,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item.label, true, {
                        fileName: "src/shared/components/OrderDetails/OrderDetails.tsx",
                        lineNumber: 20,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "src/shared/components/OrderDetails/OrderDetails.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _orderDetailsModuleScss.price,
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                        className: _orderDetailsModuleScss.priceLabel,
                        children: "\u0426\u0435\u043D\u0430: "
                    }, void 0, false, {
                        fileName: "src/shared/components/OrderDetails/OrderDetails.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                        className: _orderDetailsModuleScss.priceValue,
                        children: priceText
                    }, void 0, false, {
                        fileName: "src/shared/components/OrderDetails/OrderDetails.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/shared/components/OrderDetails/OrderDetails.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/shared/components/OrderDetails/OrderDetails.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = OrderDetails;
var _c;
$RefreshReg$(_c, "OrderDetails");

  $parcel$ReactRefreshHelpers$6d91.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","./OrderDetails.module.scss":"hR6sv","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"hR6sv":[function(require,module,exports,__globalThis) {
module.exports["dots"] = `s9WXMW_dots`;
module.exports["item"] = `s9WXMW_item`;
module.exports["label"] = `s9WXMW_label`;
module.exports["list"] = `s9WXMW_list`;
module.exports["orderDetails"] = `s9WXMW_orderDetails`;
module.exports["price"] = `s9WXMW_price`;
module.exports["priceLabel"] = `s9WXMW_priceLabel`;
module.exports["priceValue"] = `s9WXMW_priceValue`;
module.exports["value"] = `s9WXMW_value`;

},{}],"1Vzcl":[function(require,module,exports,__globalThis) {
module.exports["box"] = `LCUgJW_box`;
module.exports["buttonContainer"] = `LCUgJW_buttonContainer`;
module.exports["sidebar"] = `LCUgJW_sidebar`;
module.exports["title"] = `LCUgJW_title`;

},{}],"80puh":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StepExtras", ()=>(0, _stepExtras.StepExtras));
var _stepExtras = require("./StepExtras");

},{"./StepExtras":"55KbV","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"55KbV":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$4deb = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$4deb.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$4deb.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StepExtras", ()=>StepExtras);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _orderDataJson = require("@/shared/model/orderData.json");
var _orderDataJsonDefault = parcelHelpers.interopDefault(_orderDataJson);
var _formatPrice = require("@/widgets/OrderSection/model/formatPrice");
var _checkboxOption = require("@/widgets/OrderSection/ui/CheckboxOption");
var _dateInputRow = require("@/widgets/OrderSection/ui/DateInputRow");
var _radioOption = require("@/widgets/OrderSection/ui/RadioOption");
var _sectionTitle = require("@/widgets/OrderSection/ui/SectionTitle");
var _stepExtrasModuleScss = require("./StepExtras.module.scss");
const StepExtras = /*#__PURE__*/ (0, _react.memo)(_c = function StepExtras({ selectedCar, selectedColor, dateFrom, dateTo, selectedRateId, selectedExtraIds, onColorChange, onDateFromChange, onDateToChange, onRateChange, onExtraToggle }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _stepExtrasModuleScss.panel,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _sectionTitle.SectionTitle), {
                text: "\u0426\u0432\u0435\u0442"
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _stepExtrasModuleScss.row,
                children: selectedCar.colors.map((color)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _radioOption.RadioOption), {
                        checked: selectedColor === color,
                        name: "color",
                        label: color,
                        onChange: ()=>onColorChange(color)
                    }, color, false, {
                        fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _sectionTitle.SectionTitle), {
                text: "\u0414\u0430\u0442\u0430 \u0430\u0440\u0435\u043D\u0434\u044B"
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _dateInputRow.DateInputRow), {
                prefix: "\u0421",
                value: dateFrom,
                showClear: true,
                onChange: onDateFromChange,
                onClear: ()=>onDateFromChange('')
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _dateInputRow.DateInputRow), {
                prefix: "\u041F\u043E",
                value: dateTo,
                showClear: true,
                onChange: onDateToChange,
                onClear: ()=>onDateToChange('')
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _sectionTitle.SectionTitle), {
                text: "\u0422\u0430\u0440\u0438\u0444"
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _stepExtrasModuleScss.column,
                children: (0, _orderDataJsonDefault.default).rentalRates.map((rate)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _radioOption.RadioOption), {
                        checked: selectedRateId === rate.id,
                        name: "rate",
                        label: rate.label,
                        onChange: ()=>onRateChange(rate.id)
                    }, rate.id, false, {
                        fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _sectionTitle.SectionTitle), {
                text: "\u0414\u043E\u043F \u0443\u0441\u043B\u0443\u0433\u0438"
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _stepExtrasModuleScss.column,
                children: (0, _orderDataJsonDefault.default).extras.map((extra)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _checkboxOption.CheckboxOption), {
                        checked: selectedExtraIds.includes(extra.id),
                        label: `${extra.label}, ${(0, _formatPrice.formatPrice)(extra.price)}`,
                        onChange: ()=>onExtraToggle(extra.id)
                    }, extra.id, false, {
                        fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/widgets/OrderSection/ui/StepExtras/StepExtras.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
});
_c1 = StepExtras;
var _c, _c1;
$RefreshReg$(_c, "StepExtras$memo");
$RefreshReg$(_c1, "StepExtras");

  $parcel$ReactRefreshHelpers$4deb.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@/shared/model/orderData.json":"17rOc","@/widgets/OrderSection/model/formatPrice":"Oy39a","@/widgets/OrderSection/ui/CheckboxOption":"eLa6Z","@/widgets/OrderSection/ui/DateInputRow":"88eGo","@/widgets/OrderSection/ui/RadioOption":"gQSOc","@/widgets/OrderSection/ui/SectionTitle":"bq7ed","./StepExtras.module.scss":"jq8pF","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"eLa6Z":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CheckboxOption", ()=>(0, _checkboxOption.CheckboxOption));
var _checkboxOption = require("./CheckboxOption");

},{"./CheckboxOption":"4GcGL","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4GcGL":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$247e = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$247e.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$247e.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CheckboxOption", ()=>CheckboxOption);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _checkboxOptionModuleScss = require("./CheckboxOption.module.scss");
function CheckboxOption({ checked, label, onChange, disabled = false }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
        className: `${_checkboxOptionModuleScss.checkboxLabel} ${checked ? _checkboxOptionModuleScss.checked : ''} ${disabled ? _checkboxOptionModuleScss.disabled : ''}`,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                checked: checked,
                type: "checkbox",
                onChange: onChange,
                disabled: disabled
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/CheckboxOption/CheckboxOption.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            label
        ]
    }, void 0, true, {
        fileName: "src/widgets/OrderSection/ui/CheckboxOption/CheckboxOption.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = CheckboxOption;
var _c;
$RefreshReg$(_c, "CheckboxOption");

  $parcel$ReactRefreshHelpers$247e.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","./CheckboxOption.module.scss":"74Hlu","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"74Hlu":[function(require,module,exports,__globalThis) {
module.exports["checkboxLabel"] = `_6-jirW_checkboxLabel`;
module.exports["checked"] = `_6-jirW_checked`;
module.exports["disabled"] = `_6-jirW_disabled`;

},{}],"88eGo":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DateInputRow", ()=>(0, _dateInputRow.DateInputRow));
var _dateInputRow = require("./DateInputRow");

},{"./DateInputRow":"hZ2nx","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hZ2nx":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$9d29 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$9d29.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$9d29.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DateInputRow", ()=>DateInputRow);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _dateInputRowModuleScss = require("./DateInputRow.module.scss");
function DateInputRow({ prefix, value, placeholder, showClear = false, onChange, onClear }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _dateInputRowModuleScss.row,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                className: _dateInputRowModuleScss.prefix,
                children: prefix
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/DateInputRow/DateInputRow.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _dateInputRowModuleScss.inputWrap,
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                        type: "date",
                        value: value,
                        placeholder: placeholder,
                        onChange: (event)=>onChange(event.target.value)
                    }, void 0, false, {
                        fileName: "src/widgets/OrderSection/ui/DateInputRow/DateInputRow.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    showClear && Boolean(value) && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                        className: _dateInputRowModuleScss.clearBtn,
                        type: "button",
                        onClick: onClear,
                        children: "\xd7"
                    }, void 0, false, {
                        fileName: "src/widgets/OrderSection/ui/DateInputRow/DateInputRow.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/widgets/OrderSection/ui/DateInputRow/DateInputRow.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/widgets/OrderSection/ui/DateInputRow/DateInputRow.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = DateInputRow;
var _c;
$RefreshReg$(_c, "DateInputRow");

  $parcel$ReactRefreshHelpers$9d29.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","./DateInputRow.module.scss":"6b7BN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"6b7BN":[function(require,module,exports,__globalThis) {
module.exports["clearBtn"] = `_6LvkXW_clearBtn`;
module.exports["inputWrap"] = `_6LvkXW_inputWrap`;
module.exports["prefix"] = `_6LvkXW_prefix`;
module.exports["row"] = `_6LvkXW_row`;

},{}],"gQSOc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RadioOption", ()=>(0, _radioOption.RadioOption));
var _radioOption = require("./RadioOption");

},{"./RadioOption":"dldM8","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dldM8":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$3ad6 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$3ad6.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$3ad6.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RadioOption", ()=>RadioOption);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _radioOptionModuleScss = require("./RadioOption.module.scss");
function RadioOption({ checked, name, label, onChange, disabled = false }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
        className: `${_radioOptionModuleScss.radioLabel} ${checked ? _radioOptionModuleScss.checked : ''} ${disabled ? _radioOptionModuleScss.disabled : ''}`,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                className: _radioOptionModuleScss.radioInput,
                checked: checked,
                name: name,
                type: "radio",
                onChange: onChange,
                disabled: disabled
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/RadioOption/RadioOption.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                className: _radioOptionModuleScss.radioMark,
                "aria-hidden": true
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/RadioOption/RadioOption.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            label
        ]
    }, void 0, true, {
        fileName: "src/widgets/OrderSection/ui/RadioOption/RadioOption.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = RadioOption;
var _c;
$RefreshReg$(_c, "RadioOption");

  $parcel$ReactRefreshHelpers$3ad6.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","./RadioOption.module.scss":"gQrC5","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"gQrC5":[function(require,module,exports,__globalThis) {
module.exports["checked"] = `N_ZbGW_checked`;
module.exports["disabled"] = `N_ZbGW_disabled`;
module.exports["radioInput"] = `N_ZbGW_radioInput`;
module.exports["radioLabel"] = `N_ZbGW_radioLabel`;
module.exports["radioMark"] = `N_ZbGW_radioMark`;

},{}],"bq7ed":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SectionTitle", ()=>(0, _sectionTitle.SectionTitle));
var _sectionTitle = require("./SectionTitle");

},{"./SectionTitle":"FQpRz","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"FQpRz":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$79cd = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$79cd.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$79cd.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SectionTitle", ()=>SectionTitle);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _sectionTitleModuleScss = require("./SectionTitle.module.scss");
function SectionTitle({ text }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _sectionTitleModuleScss.title,
        children: text
    }, void 0, false, {
        fileName: "src/widgets/OrderSection/ui/SectionTitle/SectionTitle.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_c = SectionTitle;
var _c;
$RefreshReg$(_c, "SectionTitle");

  $parcel$ReactRefreshHelpers$79cd.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","./SectionTitle.module.scss":"1Dgv4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"1Dgv4":[function(require,module,exports,__globalThis) {
module.exports["title"] = `bfYPva_title`;

},{}],"jq8pF":[function(require,module,exports,__globalThis) {
module.exports["column"] = `F9FN_G_column`;
module.exports["panel"] = `F9FN_G_panel`;
module.exports["row"] = `F9FN_G_row`;

},{}],"79vcC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StepLocation", ()=>(0, _stepLocation.StepLocation));
var _stepLocation = require("./StepLocation");

},{"./StepLocation":"izx1x","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"izx1x":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$9b39 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$9b39.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$9b39.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StepLocation", ()=>StepLocation);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _autocompleteInput = require("@/shared/components/AutocompleteInput");
var _mapSelection = require("@/shared/components/MapSelection");
var _stepLocationModuleScss = require("./StepLocation.module.scss");
const StepLocation = /*#__PURE__*/ (0, _react.memo)(_c = function StepLocation({ cityInput, pickupInput, cityOptions, pickupOptions, selectedCity, selectedPickupId, onCityChange, onPickupChange, onPickupSelectFromMap }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _stepLocationModuleScss.panel,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _autocompleteInput.AutocompleteInput), {
                label: "\u0413\u043E\u0440\u043E\u0434",
                placeholder: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u0433\u043E\u0440\u043E\u0434...",
                value: cityInput,
                options: cityOptions,
                onChange: onCityChange
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepLocation/StepLocation.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _autocompleteInput.AutocompleteInput), {
                label: "\u041F\u0443\u043D\u043A\u0442 \u0432\u044B\u0434\u0430\u0447\u0438",
                placeholder: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u043F\u0443\u043D\u043A\u0442...",
                value: pickupInput,
                options: pickupOptions,
                disabled: !selectedCity,
                onChange: onPickupChange
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepLocation/StepLocation.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _mapSelection.MapSelection), {
                points: (selectedCity?.pickupPoints || []).map((point)=>({
                        id: point.id,
                        x: point.x,
                        y: point.y,
                        address: point.name
                    })),
                selectedId: selectedPickupId,
                onPointSelect: (point)=>onPickupSelectFromMap(point.id)
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepLocation/StepLocation.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/widgets/OrderSection/ui/StepLocation/StepLocation.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
});
_c1 = StepLocation;
var _c, _c1;
$RefreshReg$(_c, "StepLocation$memo");
$RefreshReg$(_c1, "StepLocation");

  $parcel$ReactRefreshHelpers$9b39.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@/shared/components/AutocompleteInput":"4jUte","@/shared/components/MapSelection":"4m5DR","./StepLocation.module.scss":"4XF23","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"4jUte":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AutocompleteInput", ()=>(0, _autocompleteInput.AutocompleteInput));
var _autocompleteInput = require("./AutocompleteInput");

},{"./AutocompleteInput":"gGA8F","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"gGA8F":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$45b7 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$45b7.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$45b7.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AutocompleteInput", ()=>AutocompleteInput);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _autocompleteInputModuleScss = require("./AutocompleteInput.module.scss");
var _s = $RefreshSig$();
const AutocompleteInput = ({ label, value, placeholder, options, disabled = false, onChange })=>{
    _s();
    const [isOpen, setIsOpen] = (0, _react.useState)(false);
    const [inputValue, setInputValue] = (0, _react.useState)(value);
    const wrapperRef = (0, _react.useRef)(null);
    (0, _react.useEffect)(()=>{
        setInputValue(value);
    }, [
        value
    ]);
    const filteredOptions = (0, _react.useMemo)(()=>options.filter((option)=>option.toLowerCase().includes(inputValue.toLowerCase())), [
        inputValue,
        options
    ]);
    (0, _react.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleInputChange = (e)=>{
        const nextValue = e.target.value;
        setInputValue(nextValue);
        onChange(nextValue);
        setIsOpen(true);
    };
    const handleOptionClick = (option)=>{
        setInputValue(option);
        onChange(option);
        setIsOpen(false);
    };
    const handleClear = ()=>{
        setInputValue('');
        onChange('');
        setIsOpen(true);
    };
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _autocompleteInputModuleScss.autocomplete,
        ref: wrapperRef,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                className: _autocompleteInputModuleScss.autocompleteLabel,
                children: label
            }, void 0, false, {
                fileName: "src/shared/components/AutocompleteInput/AutocompleteInput.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _autocompleteInputModuleScss.autocompleteInputWrapper,
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                        type: "text",
                        className: _autocompleteInputModuleScss.autocompleteInput,
                        value: inputValue,
                        onChange: handleInputChange,
                        onFocus: ()=>setIsOpen(true),
                        placeholder: placeholder,
                        disabled: disabled
                    }, void 0, false, {
                        fileName: "src/shared/components/AutocompleteInput/AutocompleteInput.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, undefined),
                    inputValue && !disabled && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                        className: _autocompleteInputModuleScss.autocompleteClear,
                        type: "button",
                        onClick: handleClear,
                        children: "\xd7"
                    }, void 0, false, {
                        fileName: "src/shared/components/AutocompleteInput/AutocompleteInput.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, undefined),
                    isOpen && !disabled && filteredOptions.length > 0 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: _autocompleteInputModuleScss.autocompleteDropdown,
                        children: filteredOptions.map((option)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                className: _autocompleteInputModuleScss.autocompleteOption,
                                type: "button",
                                onClick: ()=>handleOptionClick(option),
                                children: option
                            }, option, false, {
                                fileName: "src/shared/components/AutocompleteInput/AutocompleteInput.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, undefined))
                    }, void 0, false, {
                        fileName: "src/shared/components/AutocompleteInput/AutocompleteInput.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "src/shared/components/AutocompleteInput/AutocompleteInput.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "src/shared/components/AutocompleteInput/AutocompleteInput.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, undefined);
};
_s(AutocompleteInput, "6IkxtGIZRplw1z2O5lsgudfeCf8=");
_c = AutocompleteInput;
var _c;
$RefreshReg$(_c, "AutocompleteInput");

  $parcel$ReactRefreshHelpers$45b7.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","./AutocompleteInput.module.scss":"eYKrk","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"eYKrk":[function(require,module,exports,__globalThis) {
module.exports["autocomplete"] = `R_f1WG_autocomplete`;
module.exports["autocompleteClear"] = `R_f1WG_autocompleteClear`;
module.exports["autocompleteDropdown"] = `R_f1WG_autocompleteDropdown`;
module.exports["autocompleteInput"] = `R_f1WG_autocompleteInput`;
module.exports["autocompleteInputWrapper"] = `R_f1WG_autocompleteInputWrapper`;
module.exports["autocompleteLabel"] = `R_f1WG_autocompleteLabel`;
module.exports["autocompleteOption"] = `R_f1WG_autocompleteOption`;

},{}],"4m5DR":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MapSelection", ()=>(0, _mapSelection.MapSelection));
var _mapSelection = require("./MapSelection");

},{"./MapSelection":"9iR8X","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9iR8X":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$670d = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$670d.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$670d.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MapSelection", ()=>MapSelection);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _mapSelectionModuleScss = require("./MapSelection.module.scss");
const MapSelection = ({ points, selectedId, onPointSelect })=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _mapSelectionModuleScss.mapSelection,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _mapSelectionModuleScss.mapSelectionTitle,
                children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435:"
            }, void 0, false, {
                fileName: "src/shared/components/MapSelection/MapSelection.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _mapSelectionModuleScss.mapSelectionMap,
                children: points.map((point)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                        className: `${_mapSelectionModuleScss.mapSelectionMarker} ${selectedId === point.id ? _mapSelectionModuleScss.selected : ''}`,
                        style: {
                            left: `${point.x}%`,
                            top: `${point.y}%`
                        },
                        type: "button",
                        onClick: ()=>onPointSelect?.(point),
                        title: point.address
                    }, point.id, false, {
                        fileName: "src/shared/components/MapSelection/MapSelection.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, undefined))
            }, void 0, false, {
                fileName: "src/shared/components/MapSelection/MapSelection.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "src/shared/components/MapSelection/MapSelection.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, undefined);
_c = MapSelection;
var _c;
$RefreshReg$(_c, "MapSelection");

  $parcel$ReactRefreshHelpers$670d.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","./MapSelection.module.scss":"6UTJf","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"6UTJf":[function(require,module,exports,__globalThis) {
module.exports["mapSelection"] = `xjkIma_mapSelection`;
module.exports["mapSelectionMap"] = `xjkIma_mapSelectionMap`;
module.exports["mapSelectionMarker"] = `xjkIma_mapSelectionMarker`;
module.exports["mapSelectionTitle"] = `xjkIma_mapSelectionTitle`;
module.exports["selected"] = `xjkIma_selected`;

},{}],"4XF23":[function(require,module,exports,__globalThis) {
module.exports["panel"] = `un3RWW_panel`;

},{}],"5ZNaQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StepModels", ()=>(0, _stepModels.StepModels));
var _stepModels = require("./StepModels");

},{"./StepModels":"dctqy","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dctqy":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$944e = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$944e.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$944e.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StepModels", ()=>StepModels);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _orderDataJson = require("@/shared/model/orderData.json");
var _orderDataJsonDefault = parcelHelpers.interopDefault(_orderDataJson);
var _modelCard = require("@/widgets/OrderSection/ui/ModelCard");
var _radioOption = require("@/widgets/OrderSection/ui/RadioOption");
var _stepModelsModuleScss = require("./StepModels.module.scss");
const StepModels = /*#__PURE__*/ (0, _react.memo)(_c = function StepModels({ selectedCategory, selectedCarId, cars, onCategoryChange, onCarSelect }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _stepModelsModuleScss.panel,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _stepModelsModuleScss.filtersRow,
                children: (0, _orderDataJsonDefault.default).carCategories.map((category)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _radioOption.RadioOption), {
                        checked: selectedCategory === category,
                        name: "category",
                        label: category,
                        onChange: ()=>onCategoryChange(category)
                    }, category, false, {
                        fileName: "src/widgets/OrderSection/ui/StepModels/StepModels.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepModels/StepModels.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _stepModelsModuleScss.modelsGrid,
                children: cars.map((car)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _modelCard.ModelCard), {
                        car: car,
                        selected: selectedCarId === car.id,
                        onSelect: onCarSelect
                    }, car.id, false, {
                        fileName: "src/widgets/OrderSection/ui/StepModels/StepModels.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/StepModels/StepModels.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/widgets/OrderSection/ui/StepModels/StepModels.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
});
_c1 = StepModels;
var _c, _c1;
$RefreshReg$(_c, "StepModels$memo");
$RefreshReg$(_c1, "StepModels");

  $parcel$ReactRefreshHelpers$944e.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@/shared/model/orderData.json":"17rOc","@/widgets/OrderSection/ui/ModelCard":"1gmWB","@/widgets/OrderSection/ui/RadioOption":"gQSOc","./StepModels.module.scss":"7EudH","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"7EudH":[function(require,module,exports,__globalThis) {
module.exports["filtersRow"] = `_033gMq_filtersRow`;
module.exports["modelsGrid"] = `_033gMq_modelsGrid`;
module.exports["panel"] = `_033gMq_panel`;

},{}],"03P3r":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StepSummary", ()=>(0, _stepSummary.StepSummary));
var _stepSummary = require("./StepSummary");

},{"./StepSummary":"haSTE","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"haSTE":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$e1c4 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$e1c4.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$e1c4.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StepSummary", ()=>StepSummary);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _carImages = require("@/widgets/OrderSection/ui/ModelCard/carImages");
var _stepSummaryModuleScss = require("./StepSummary.module.scss");
var _s = $RefreshSig$();
const ru = String.fromCharCode;
const TEXT = {
    defaultPlate: ru(1050, 32, 55, 54, 49, 32, 1053, 1040, 32, 55, 51),
    fuel: ru(1058, 1086, 1087, 1083, 1080, 1074, 1086),
    availableFrom: ru(1044, 1086, 1089, 1090, 1091, 1087, 1085, 1072, 32, 1089)
};
const StepSummary = /*#__PURE__*/ _s((0, _react.memo)(_c = _s(function StepSummary({ car, dateFrom }) {
    _s();
    const [hasImageError, setHasImageError] = (0, _react.useState)(false);
    const carWithDetails = car;
    const imageSrc = (0, _carImages.getCarImage)(car);
    const hasImage = Boolean(imageSrc) && !hasImageError;
    const plate = carWithDetails.plate || TEXT.defaultPlate;
    const fuel = carWithDetails.fuel || '100%';
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _stepSummaryModuleScss.panel,
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
            className: _stepSummaryModuleScss.top,
            children: [
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: _stepSummaryModuleScss.carName,
                            children: `${car.brand}, ${car.name}`
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: _stepSummaryModuleScss.plate,
                            children: plate
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: _stepSummaryModuleScss.line,
                            children: [
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("b", {
                                    children: TEXT.fuel
                                }, void 0, false, {
                                    fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                " ",
                                fuel
                            ]
                        }, void 0, true, {
                            fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: _stepSummaryModuleScss.line,
                            children: [
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("b", {
                                    children: TEXT.availableFrom
                                }, void 0, false, {
                                    fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this),
                                " ",
                                dateFrom
                            ]
                        }, void 0, true, {
                            fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    className: _stepSummaryModuleScss.imageWrap,
                    children: hasImage ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("img", {
                        className: _stepSummaryModuleScss.image,
                        src: imageSrc,
                        alt: car.name,
                        onError: ()=>setHasImageError(true)
                    }, void 0, false, {
                        fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, this) : null
                }, void 0, false, {
                    fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/widgets/OrderSection/ui/StepSummary/StepSummary.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}, "hksgi+MjrUU53AfCPg21D2OtVF8=")), "hksgi+MjrUU53AfCPg21D2OtVF8=");
_c1 = StepSummary;
var _c, _c1;
$RefreshReg$(_c, "StepSummary$memo");
$RefreshReg$(_c1, "StepSummary");

  $parcel$ReactRefreshHelpers$e1c4.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@/widgets/OrderSection/ui/ModelCard/carImages":"aCdjN","./StepSummary.module.scss":"kvG92","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"kvG92":[function(require,module,exports,__globalThis) {
module.exports["cancelButton"] = `UvZOmW_cancelButton`;
module.exports["carName"] = `UvZOmW_carName`;
module.exports["image"] = `UvZOmW_image`;
module.exports["imageWrap"] = `UvZOmW_imageWrap`;
module.exports["line"] = `UvZOmW_line`;
module.exports["orderId"] = `UvZOmW_orderId`;
module.exports["panel"] = `UvZOmW_panel`;
module.exports["plate"] = `UvZOmW_plate`;
module.exports["top"] = `UvZOmW_top`;

},{}],"h88o0":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrderStepRenderer", ()=>(0, _orderStepRenderer.OrderStepRenderer));
var _orderStepRenderer = require("./OrderStepRenderer");

},{"./OrderStepRenderer":"iV0Yu","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"iV0Yu":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$296b = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$296b.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$296b.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrderStepRenderer", ()=>OrderStepRenderer);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _horizontalContentContainer = require("@/shared/components/HorizontalContentContainer");
var _stepLocation = require("@/widgets/OrderSection/ui/StepLocation");
var _stepModels = require("@/widgets/OrderSection/ui/StepModels");
var _stepExtras = require("@/widgets/OrderSection/ui/StepExtras");
var _stepSummary = require("@/widgets/OrderSection/ui/StepSummary");
var _stepOrderConfirmed = require("@/widgets/OrderSection/ui/StepOrderConfirmed");
var _orderSectionModuleScss = require("../../OrderSection.module.scss");
function OrderStepRenderer({ step, cityInput, pickupInput, cityOptions, pickupOptions, selectedCity, selectedPickup, selectedCarId, selectedCategory, selectedColor, dateFrom, dateTo, selectedRateId, selectedExtraIds, filteredCars, selectedCar, availableAt, onCityChange, onPickupChange, onPickupSelectFromMap, onCategoryChange, onCarSelect, onColorChange, onDateFromChange, onDateToChange, onRateChange, onExtraToggle }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _horizontalContentContainer.HorizontalContentContainer), {
        children: [
            step === 1 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: _orderSectionModuleScss.stepPanel,
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _stepLocation.StepLocation), {
                    cityInput: cityInput,
                    pickupInput: pickupInput,
                    cityOptions: cityOptions,
                    pickupOptions: pickupOptions,
                    selectedCity: selectedCity,
                    selectedPickupId: selectedPickup?.id,
                    onCityChange: onCityChange,
                    onPickupChange: onPickupChange,
                    onPickupSelectFromMap: onPickupSelectFromMap
                }, void 0, false, {
                    fileName: "src/widgets/OrderSection/ui/OrderStepRenderer/OrderStepRenderer.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/OrderStepRenderer/OrderStepRenderer.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this),
            step === 2 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _stepModels.StepModels), {
                selectedCategory: selectedCategory,
                selectedCarId: selectedCarId,
                cars: filteredCars,
                onCategoryChange: onCategoryChange,
                onCarSelect: onCarSelect
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/OrderStepRenderer/OrderStepRenderer.tsx",
                lineNumber: 90,
                columnNumber: 9
            }, this),
            step === 3 && selectedCar && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _stepExtras.StepExtras), {
                selectedCar: selectedCar,
                selectedColor: selectedColor,
                dateFrom: dateFrom,
                dateTo: dateTo,
                selectedRateId: selectedRateId,
                selectedExtraIds: selectedExtraIds,
                onColorChange: onColorChange,
                onDateFromChange: onDateFromChange,
                onDateToChange: onDateToChange,
                onRateChange: onRateChange,
                onExtraToggle: onExtraToggle
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/OrderStepRenderer/OrderStepRenderer.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this),
            step === 4 && selectedCar && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _stepSummary.StepSummary), {
                car: selectedCar,
                dateFrom: availableAt
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/OrderStepRenderer/OrderStepRenderer.tsx",
                lineNumber: 115,
                columnNumber: 37
            }, this),
            step === 5 && selectedCar && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _stepOrderConfirmed.StepOrderConfirmed), {
                car: selectedCar,
                dateFrom: availableAt
            }, void 0, false, {
                fileName: "src/widgets/OrderSection/ui/OrderStepRenderer/OrderStepRenderer.tsx",
                lineNumber: 117,
                columnNumber: 37
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/widgets/OrderSection/ui/OrderStepRenderer/OrderStepRenderer.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_c = OrderStepRenderer;
var _c;
$RefreshReg$(_c, "OrderStepRenderer");

  $parcel$ReactRefreshHelpers$296b.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","@/shared/components/HorizontalContentContainer":"34dfs","@/widgets/OrderSection/ui/StepLocation":"79vcC","@/widgets/OrderSection/ui/StepModels":"5ZNaQ","@/widgets/OrderSection/ui/StepExtras":"80puh","@/widgets/OrderSection/ui/StepSummary":"03P3r","@/widgets/OrderSection/ui/StepOrderConfirmed":"kx1mX","../../OrderSection.module.scss":"fITna","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"kx1mX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StepOrderConfirmed", ()=>(0, _stepOrderConfirmed.StepOrderConfirmed));
var _stepOrderConfirmed = require("./StepOrderConfirmed");

},{"./StepOrderConfirmed":"57lkj","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"57lkj":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$8366 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$8366.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$8366.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StepOrderConfirmed", ()=>StepOrderConfirmed);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _carImages = require("@/widgets/OrderSection/ui/ModelCard/carImages");
var _stepOrderConfirmedModuleScss = require("./StepOrderConfirmed.module.scss");
var _s = $RefreshSig$();
const ru = String.fromCharCode;
const TEXT = {
    successTitle: ru(1042, 1072, 1096, 32, 1079, 1072, 1082, 1072, 1079, 32, 1087, 1086, 1076, 1090, 1074, 1077, 1088, 1078, 1076, 1105, 1085),
    defaultPlate: ru(1050, 32, 55, 54, 49, 32, 1053, 1040, 32, 55, 51),
    fuel: ru(1058, 1086, 1087, 1083, 1080, 1074, 1086),
    availableFrom: ru(1044, 1086, 1089, 1090, 1091, 1087, 1085, 1072, 32, 1089)
};
const StepOrderConfirmed = /*#__PURE__*/ _s((0, _react.memo)(_c = _s(function StepOrderConfirmed({ car, dateFrom }) {
    _s();
    const [hasImageError, setHasImageError] = (0, _react.useState)(false);
    const carWithDetails = car;
    const imageSrc = (0, _carImages.getCarImage)(car);
    const hasImage = Boolean(imageSrc) && !hasImageError;
    const plate = carWithDetails.plate || TEXT.defaultPlate;
    const fuel = carWithDetails.fuel || '100%';
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: _stepOrderConfirmedModuleScss.panel,
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
            className: _stepOrderConfirmedModuleScss.top,
            children: [
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: _stepOrderConfirmedModuleScss.successTitle,
                            children: TEXT.successTitle
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: _stepOrderConfirmedModuleScss.carName,
                            children: `${car.brand}, ${car.name}`
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: _stepOrderConfirmedModuleScss.plate,
                            children: plate
                        }, void 0, false, {
                            fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: _stepOrderConfirmedModuleScss.line,
                            children: [
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("b", {
                                    children: TEXT.fuel
                                }, void 0, false, {
                                    fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this),
                                " ",
                                fuel
                            ]
                        }, void 0, true, {
                            fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: _stepOrderConfirmedModuleScss.line,
                            children: [
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("b", {
                                    children: TEXT.availableFrom
                                }, void 0, false, {
                                    fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this),
                                " ",
                                dateFrom
                            ]
                        }, void 0, true, {
                            fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    className: _stepOrderConfirmedModuleScss.imageWrap,
                    children: hasImage ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("img", {
                        className: _stepOrderConfirmedModuleScss.image,
                        src: imageSrc,
                        alt: car.name,
                        onError: ()=>setHasImageError(true)
                    }, void 0, false, {
                        fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
                        lineNumber: 45,
                        columnNumber: 13
                    }, this) : null
                }, void 0, false, {
                    fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/widgets/OrderSection/ui/StepOrderConfirmed/StepOrderConfirmed.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}, "hksgi+MjrUU53AfCPg21D2OtVF8=")), "hksgi+MjrUU53AfCPg21D2OtVF8=");
_c1 = StepOrderConfirmed;
var _c, _c1;
$RefreshReg$(_c, "StepOrderConfirmed$memo");
$RefreshReg$(_c1, "StepOrderConfirmed");

  $parcel$ReactRefreshHelpers$8366.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@/widgets/OrderSection/ui/ModelCard/carImages":"aCdjN","./StepOrderConfirmed.module.scss":"3LXpO","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"3LXpO":[function(require,module,exports,__globalThis) {
module.exports["cancelButton"] = `QuQR7G_cancelButton`;
module.exports["carName"] = `QuQR7G_carName`;
module.exports["image"] = `QuQR7G_image`;
module.exports["imageWrap"] = `QuQR7G_imageWrap`;
module.exports["line"] = `QuQR7G_line`;
module.exports["orderId"] = `QuQR7G_orderId`;
module.exports["panel"] = `QuQR7G_panel`;
module.exports["plate"] = `QuQR7G_plate`;
module.exports["successTitle"] = `QuQR7G_successTitle`;
module.exports["top"] = `QuQR7G_top`;

},{}],"bf8WC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "STEP_LABELS", ()=>STEP_LABELS);
parcelHelpers.export(exports, "ORDER_STORAGE_KEY", ()=>ORDER_STORAGE_KEY);
parcelHelpers.export(exports, "STEP_ROUTE_SEGMENTS", ()=>STEP_ROUTE_SEGMENTS);
parcelHelpers.export(exports, "ROUTE_SEGMENT_TO_STEP", ()=>ROUTE_SEGMENT_TO_STEP);
const ru = String.fromCharCode;
const STEP_LABELS = {
    1: ru(1052, 1077, 1089, 1090, 1086, 1087, 1086, 1083, 1086, 1078, 1077, 1085, 1080, 1077),
    2: ru(1052, 1086, 1076, 1077, 1083, 1100),
    3: ru(1044, 1086, 1087, 1086, 1083, 1085, 1080, 1090, 1077, 1083, 1100, 1085, 1086),
    4: ru(1048, 1090, 1086, 1075, 1086),
    5: ' '
};
const ORDER_STORAGE_KEY = 'need-for-drive-order';
const STEP_ROUTE_SEGMENTS = {
    1: 'location',
    2: 'model',
    3: 'additional',
    4: 'total'
};
const ROUTE_SEGMENT_TO_STEP = {
    location: 1,
    model: 2,
    additional: 3,
    total: 4
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5t25y":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$3bc4 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$3bc4.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$3bc4.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useOrderSubmit", ()=>useOrderSubmit);
var _react = require("react");
var _types = require("./types");
var _ordersApi = require("@/shared/api/ordersApi");
// Extract numeric ID from "city-12" / "point-3" / "car-7" prefixed strings
function extractId(prefixed) {
    if (!prefixed) return null;
    const m = String(prefixed).match(/(\d+)$/);
    return m ? Number(m[1]) : null;
}
function priceToNumber(price) {
    const n = parseInt(String(price).replace(/[^\d]/g, ''), 10);
    return Number.isFinite(n) ? n : 0;
}
function useOrderSubmit(orderState, deps, setOrderState) {
    const { selectedCity, selectedPickup, selectedCar, selectedRate, selectedColor, selectedExtraIds, availableAt, totalPrice } = deps;
    const handleSubmitOrder = (0, _react.useCallback)(async ()=>{
        if (!selectedCity || !selectedPickup || !selectedCar) return;
        let orderId = `RUS${Date.now()}${Math.floor(Math.random() * 1000)}`;
        // Try to POST to backend; if it fails, fall back to local order id (offline mode)
        const cityId = extractId(selectedCity.id);
        const pointId = extractId(selectedPickup.id);
        const carId = extractId(selectedCar.id);
        const rateBackendId = selectedRate?.backendId ?? null;
        if (cityId && pointId && carId) try {
            const dto = {
                cityId: {
                    id: cityId
                },
                pointId: {
                    id: pointId
                },
                carId: {
                    id: carId
                },
                rateId: rateBackendId ? {
                    id: rateBackendId
                } : {
                    id: 1
                },
                color: selectedColor || "\u041B\u044E\u0431\u043E\u0439",
                dateFrom: orderState.dateFrom ? new Date(orderState.dateFrom).getTime() : Date.now(),
                dateTo: orderState.dateTo ? new Date(orderState.dateTo).getTime() : Date.now() + 86400000,
                price: priceToNumber(totalPrice),
                isFullTank: selectedExtraIds.includes('fullTank'),
                isNeedChildChair: selectedExtraIds.includes('childChair'),
                isRightWheel: selectedExtraIds.includes('rightWheel')
            };
            const res = await (0, _ordersApi.ordersApi).create(dto);
            if (res?.data?.id) orderId = `RU${res.data.id}`;
        } catch (e) {
            // Silent fallback — keep generated orderId
            // eslint-disable-next-line no-console
            console.warn('Order POST failed, using local id', e);
        }
        setOrderState((prev)=>({
                ...prev,
                orderId
            }));
        const completedOrder = {
            orderId,
            city: selectedCity.name,
            pickupPoint: selectedPickup.name,
            carName: `${selectedCar.brand}, ${selectedCar.name}`,
            carImage: selectedCar.image,
            color: selectedColor,
            duration: "1\u0434 2\u0447",
            rate: selectedRate?.id === 'daily' ? "\u041D\u0430 \u0441\u0443\u0442\u043A\u0438" : "\u041F\u043E\u043C\u0438\u043D\u0443\u0442\u043D\u043E",
            fullTank: selectedExtraIds.includes('fullTank') ? "\u0414\u0430" : "\u041D\u0435\u0442",
            totalPrice,
            availableAt
        };
        localStorage.setItem((0, _types.ORDER_STORAGE_KEY), JSON.stringify(completedOrder));
        setOrderState((prev)=>({
                ...prev,
                isConfirmOpen: false,
                step: 5,
                orderId
            }));
    }, [
        selectedCity,
        selectedPickup,
        selectedCar,
        selectedRate,
        selectedColor,
        selectedExtraIds,
        availableAt,
        totalPrice,
        setOrderState,
        orderState.dateFrom,
        orderState.dateTo
    ]);
    return {
        handleSubmitOrder
    };
}

  $parcel$ReactRefreshHelpers$3bc4.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react":"jMk1U","./types":"bf8WC","@/shared/api/ordersApi":"bBlUw","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"bBlUw":[function(require,module,exports,__globalThis) {
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

},{"./mockStore":"d1tY0","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["cLs3Y"], null, "parcelRequiree4dd", {}, "./", "/")

//# sourceMappingURL=OrderPage.7b7491ee.js.map
