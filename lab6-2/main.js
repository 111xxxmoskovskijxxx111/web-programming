
const Repository = (function () {
    const _db = {
      'app-root': { id: 'app-root', size: 100, content: 'App Root', deps: ['auth-mod', 'ui-lib'] },
      'auth-mod': { id: 'auth-mod', size: 50, content: 'Auth Module', deps: ['crypto-utils'] },
      'ui-lib': { id: 'ui-lib', size: 200, content: 'UI Library', deps: ['icon-set', 'canvas-api'] },
      'crypto-utils': { id: 'crypto-utils', size: 30, content: 'Crypto Utils', deps: ['wasm-core'] },
      'canvas-api': { id: 'canvas-api', size: 80, content: 'Canvas API', deps: ['wasm-core'] },
      'icon-set': { id: 'icon-set', size: 20, content: 'Icon Set', deps: [] },
      'wasm-core': { id: 'wasm-core', size: 500, content: 'WASM Core', deps: [] },
    };
  
    return {
      getScriptInfo: (id) =>
        new Promise((resolve, reject) => {
          console.log(`API Request: ${id}`);
          const isServerDown = Math.random() < 0.05; // 5% chance server fails
          setTimeout(() => {
            if (isServerDown) return reject(new Error('Server is unavailable'));
            _db[id] ? resolve(_db[id]) : reject(new Error(`Script ${id} not found.`));
          }, 1000 + Math.random() * 2000); // 1-3 сек
        }),
    };
  })();
  
  
  const cache = new Map();
  
  async function fetchWithRetry(id, retries = 3, delay = 200) {
    try {
      return await Repository.getScriptInfo(id);
    } catch (err) {
      if (retries === 0) throw err;
      await new Promise((res) => setTimeout(res, delay));
      return fetchWithRetry(id, retries - 1, delay * 2);
    }
  }
  
  
  async function loadScripts(ids, concurrencyLimit = 3) {
    const result = [];
    const visited = new Set();
    const semaphore = { count: 0, queue: [] };
  
    async function acquire() {
      if (semaphore.count < concurrencyLimit) {
        semaphore.count++;
        return;
      }
      await new Promise((res) => semaphore.queue.push(res));
      semaphore.count++;
    }
  
    function release() {
      semaphore.count--;
      if (semaphore.queue.length > 0) {
        const next = semaphore.queue.shift();
        next();
      }
    }
  
    async function dfs(id, path = new Set()) {
      if (path.has(id)) throw new Error(`Circular dependency detected: ${id}`);
      if (visited.has(id)) return;
  
      visited.add(id);
      path.add(id);
  
      if (!cache.has(id)) {
        cache.set(id, fetchWithRetry(id));
      }
  
      await acquire();
      let script;
      try {
        script = await cache.get(id);
      } finally {
        release();
      }
  
      result.push({ id: script.id, content: script.content });
  
      
      await Promise.all(script.deps.map((dep) => dfs(dep, new Set(path))));
    }
  
    await Promise.all(ids.map((id) => dfs(id)));
  
    return result;
  }
  
  
  async function runTest() {
    try {
      const scripts = await loadScripts(['app-root']);
      console.log('\n--- LOADED SCRIPTS ---');
      scripts.forEach((s) => console.log(`${s.id}: ${s.content}`));
      console.log(`Total scripts loaded: ${scripts.length}`);
    } catch (e) {
      console.error('ERROR:', e.message);
    }
  }
  
  runTest();