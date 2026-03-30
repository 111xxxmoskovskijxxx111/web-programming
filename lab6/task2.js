const Repository = (function() {
    const _db = {
      'app-root':    { id: 'app-root',    size: 100, content: '111', deps: ['auth-mod', 'ui-lib'] },
      'auth-mod':    { id: 'auth-mod',    size: 50, content: '222',  deps: ['crypto-utils'] },
      'ui-lib':      { id: 'ui-lib',      size: 200, content: '333', deps: ['icon-set', 'canvas-api'] },
      'crypto-utils': { id: 'crypto-utils', size: 30, content: '444',  deps: ['wasm-core'] },
      'canvas-api':   { id: 'canvas-api',   size: 80, content: '555',  deps: ['wasm-core'] },
      'icon-set':     { id: 'icon-set',     size: 20, content: '666',  deps: [] },
      'wasm-core':    { id: 'wasm-core',    size: 500, content: '777', deps: [] },
    };
  
    return {
      getScriptInfo: (id) => new Promise((resolve, reject) => {
        console.log(`API Request: ${id}`);
        const isServerDown = Math.random() < 0.01; 
        setTimeout(() => {
          if (isServerDown) return reject(new Error('Server is unavailable'));
          _db[id] ? resolve(_db[id]) : reject(new Error(`Script ${id} not found.`));
        }, 1000 + Math.random() * 3000);
      })
    };
})();

async function loadScripts(ids) {
    const visited = new Set();
    const cache = new Map(); 

    async function helper(id) {
        if (visited.has(id)) return null;
        visited.add(id);

        
        if (!cache.has(id)) {
            const promise = Repository.getScriptInfo(id).then(async script => {
                const depsResults = await Promise.all(script.deps.map(helper));
                return { id: script.id, content: script.content };
            });
            cache.set(id, promise);
        }

        return cache.get(id);
    }

   
    const results = await Promise.all(ids.map(helper));

  
    return results.filter(r => r !== null);
}

// ------------------ Тест ------------------
async function runTest() {
    try {
        const scripts = await loadScripts(['app-root']);
        console.log("\n--- LOADED SCRIPTS ---");
        console.log(scripts);
        console.log(`Total scripts loaded: ${scripts.length}`);
    } catch (e) {
        console.error("ERROR:", e.message);
    }
}


runTest();