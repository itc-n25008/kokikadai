// 軽量 IndexedDB ヘルパー（画像保存用）
const ImageDB = (function () {
  const DB_NAME = "images-db";
  const STORE = "images";
  const VERSION = 1;
  let dbp = null;

  function openDB() {
    if (dbp) return dbp;
    dbp = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
        }
      };
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    });
    return dbp;
  }

  async function saveImage(file) {
    if (!file) return null;
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      const obj = { blob: file, createdAt: Date.now() };
      const req = store.add(obj);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function getBlob(id) {
    if (id === undefined || id === null) return null;
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const store = tx.objectStore(STORE);
      const req = store.get(Number(id));
      req.onsuccess = () => resolve(req.result ? req.result.blob : null);
      req.onerror = () => reject(req.error);
    });
  }

  async function getURL(id) {
    const blob = await getBlob(id);
    if (!blob) return null;
    return URL.createObjectURL(blob);
  }

  async function deleteImage(id) {
    if (id === undefined || id === null) return false;
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      const req = store.delete(Number(id));
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  return { saveImage, getBlob, getURL, deleteImage };
})();
