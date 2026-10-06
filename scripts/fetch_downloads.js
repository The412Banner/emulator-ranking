import fs from "fs";

// Optional GitHub token: raises the rate limit from 60 req/hr (unauth)
// to 5,000 req/hr. In Actions this is the automatic GITHUB_TOKEN.
const GH_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

const repos = [
  // GAMEHUB
  { name: "GameHub Lite (Producdevity)", repo: "Producdevity/gamehub-lite", category: "GameHub", logo: "gamehub.png" },
  { name: "GameHub Lite (ItzDFPlayer)", repo: "ItzDFPlayer/gamehub-lite", category: "GameHub", logo: "gamehub.png" },
  { name: "GameHub Lite (J4MCU-builds)", repo: "J4MCU-builds/Gamehub-Lite-RedMagic", category: "GameHub", logo: "gamehub.png" },
  { name: "BannerHub (The412Banner)", repo: "The412Banner/bannerhub", category: "GameHub", logo: "bannerhub.png" },
  { name: "BannerHub v6 (The412Banner)", repo: "The412Banner/bannerhub-revanced", category: "GameHub", logo: "bannerhub-v6.png" },
  { name: "BannerHub Lite (The412Banner)", repo: "The412Banner/Bannerhub-Lite", category: "GameHub", logo: "bannerhub-lite.png" },
  { name: "Bannerlator (The412Banner)", repo: "The412Banner/Bannerlator", category: "GameHub", logo: "bannerlator.png", excludeAssets: ["update.json"] },

    // DRIVERS
  { name: "Adreno Tools Drivers", repo: "K11MCH1/AdrenoToolsDrivers", category: "Drivers", logo: "drivers.png", extensions: [".zip"] },
  { name: "Adrenotools Drivers (StevenMXZ)", repo: "StevenMXZ/Adrenotools-Drivers", category: "Drivers", logo: "drivers.png", extensions: [".zip"] },
  { name: "Freedreno Turnip CI (Weab-chan)", repo: "Weab-chan/freedreno_turnip-CI", category: "Drivers", logo: "drivers.png", extensions: [".zip"] },
  { name: "Freedreno Turnip CI (StevenMXZ)", repo: "StevenMXZ/freedreno_turnip-CI", category: "Drivers", logo: "drivers.png", extensions: [".zip"] },
  { name: "Freedreno Turnip CI (whitebelyash)", repo: "whitebelyash/freedreno_turnip-CI", category: "Drivers", logo: "drivers.png", extensions: [".zip"] },
  { name: "Upload Grave", repo: "jhinzuo/upload_grave", category: "Drivers", logo: "drivers.png", extensions: [".zip"] },
  { name: "Winlator Ref4ik (Drivers/Wine)", repo: "REF4IK/winlator-ref4ik-", category: "Drivers", logo: "drivers.png", extensions: [".wcp"] },
  { name: "StevenMXZ Contents Cmod", repo: "StevenMXZ/Contents-Cmod", category: "Drivers", logo: "drivers.png", extensions: [".wcp", ".wcp.xz"] },

  // GAMENATIVE
  { name: "GameNative", repo: "utkarshdalal/GameNative", category: "GameNative", logo: "gamenative.png" },

  // WINLATOR
  { name: "Winlator BrunoDev", repo: "brunodev85/winlator", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Ludashi", repo: "StevenMXZ/Winlator-Ludashi", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Afei", repo: "afeimod/winlator-mod", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Xmod", repo: "deivid22srk/Winlator-Xmod", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Ref4ik", repo: "REF4IK/winlator-ref4ik-", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Ajay", repo: "ajay9634/winlator-ajay", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Coffincolors", repo: "coffincolors/winlator", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator X", repo: "JURIS-X/winlator_x", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Bionic jhinzuo", repo: "jhinzuo/winlator", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator XR", repo: "WinlatorXR/WinlatorXR", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Bionic duckyduckG", repo: "duckyduckG/winlator", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Bionic Stredohiri", repo: "Stredohori/Winlator-CMOD", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Bionic Alexoqool", repo: "Alexoqool/winlator-bionic-build", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Honkon", repo: "Honkonx/winlator-honkon", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Glibc", repo: "longjunyu2/winlator", category: "Winlator", logo: "winlator.png" },
  { name: "Wb64dev", repo: "winebox64/winlator", category: "Winlator", logo: "winlator.png" },
  { name: "Winlator Mali", repo: "Fcharan/WinlatorMali", category: "Winlator", logo: "winlator.png" },
  { name: "Star (fork)", repo: "jacojayy/star", category: "Winlator", logo: "star.png" },
  { name: "Steamlator", repo: "slaker222/Steamlator", category: "Winlator", logo: "winlator.png" },
  { name: "WinNative", repo: "WinNative-Emu/WinNative", category: "Winlator", logo: "winnative.jpeg" },

  // PC EMULATOR
  { name: "Horizon Emu", repo: "HorizonEmuTeam/Horizon-Emu", category: "PC Emulator", logo: "horizon.png" },
  { name: "ExaGear 302", repo: "XHYN-PH/exagear-302", category: "PC Emulator", logo: "exagear.png" },
  { name: "XoDos", repo: "xodiosx/XoDos", category: "PC Emulator", logo: "xodos.png" },
  { name: "Mobox Patched", repo: "jaycore/mobox-patched", category: "PC Emulator", logo: "mobox.png", extensions: [".tar.gz"] },
  { name: "Pluvia", repo: "oxters168/Pluvia", category: "PC Emulator", logo: "pluvia.png" },
  { name: "DroidDeck", repo: "Droid-Deck/DroidDeck", category: "PC Emulator", logo: "droiddeck.png", releaseNamePrefix: "DroidDeck" },

  // Wii U Emulator
  { name: "Cemu", repo: "SSimco/Cemu", category: "Wii U Emulator", logo: "cemu.png" },
  
  // XBOX
  { name: "X1 BOX", repo: "NETHERSTRIKER/x1-box-apk-1.1.4-compiled-via-izzy2lost-source-code", category: "Xbox", logo: "x1-box.png" },

  // Nintendo Switch Emulator

  // Nintendo 3DS
  { name: "Azahar", repo: "azahar-emu/azahar", category: "Nintendo 3DS", logo: "azahar.png" },
  { name: "Citra (weihuoya)", repo: "weihuoya/citra", category: "Nintendo 3DS", logo: "citra.png" },

  // Emulator PS3
  { name: "APS3e", repo: "aenu1/aps3e", category: "Emulator PS3", logo: "aps3e.png" },
  { name: "RPCSX Android", repo: "RPCSX/rpcsx-ui-android", category: "Emulator PS3", logo: "rpcsx.png" },

  // Emulator PS2
  { name: "ARMSX2", repo: "ARMSX2/ARMSX2", category: "Emulator PS2", logo: "armsx2.png" },
  { name: "NetherSX2 Patch", repo: "Trixarian/NetherSX2-patch", category: "Emulator PS2", logo: "nethersx2.png" },
  { name: "NetherSX2 Classic", repo: "Trixarian/NetherSX2-classic", category: "Emulator PS2", logo: "nethersx2.png" },

  // PSVITA
  { name: "Vita3K Android", repo: "Vita3K/Vita3K-Android", category: "PSVITA", logo: "vita3k.png" },

  // Nintendo GameCube / Nintendo Wii
  { name: "Dolphin MMJR2 VBI", repo: "Medard22/Dolphin-MMJR2-VBI", category: "Nintendo GameCube / Wii", logo: "dolphin.png" },

  // Emulator Sega Dreamcast
  { name: "Flycast", repo: "flyinghead/flycast", category: "Sega Dreamcast", logo: "flycast.png" },

  // Emulator ALL IN ONE
  { name: "Lemuroid", repo: "Swordfish90/Lemuroid", category: "All In One", logo: "lemuroid.png" },
  { name: "Exiled Kingdoms Multiplayer", repo: "winlatorbrasil/Exiled-Kingdoms-Multiplayer", category: "GAME", logo: "drivers.png" },
];

// ===== GitHub API =====
async function getGitHubReleasesData(repo, releaseNamePrefix = null, excludeAssets = null) {
  try {
    console.log(`  → Buscando releases de ${repo} (GitHub)...`);

    const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Emulator-Battle-Arena',
        ...(GH_TOKEN ? { 'Authorization': `Bearer ${GH_TOKEN}` } : {})
      }
    });

    if (!res.ok) {
      console.log(`  ⚠️  Status ${res.status} para ${repo}`);
      return { total: 0, releases: [] };
    }

    let releases = await res.json();

    // Repos that also publish non-app releases (runtime components, tools) can keep only
    // the app's own releases by name, e.g. "DroidDeck 0.3.1".
    if (releaseNamePrefix && Array.isArray(releases)) {
      releases = releases.filter(r => (r.name || r.tag_name || "").startsWith(releaseNamePrefix));
    }

    if (!Array.isArray(releases) || releases.length === 0) {
      console.log(`  ℹ️  Nenhuma release encontrada para ${repo}`);
      return { total: 0, releases: [] };
    }

    return parseReleases(releases, false, excludeAssets);

  } catch (error) {
    console.error(`  ❌ Erro ao buscar ${repo}:`, error.message);
    return { total: 0, releases: [] };
  }
}


// ===== Nightlies README (Drivers tab: components by type, driver sources, Discord) =====
const NIGHTLIES = "The412Banner/Nightlies";
async function gh(path) {
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: { 'Accept': 'application/vnd.github+json', 'User-Agent': 'Emulator-Battle-Arena', ...(GH_TOKEN ? { 'Authorization': `Bearer ${GH_TOKEN}` } : {}) }
  });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
}
const mdLinks = s => [...String(s).matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)].map(m => ({ label: m[1].replace(/\*\*/g, "").trim(), url: m[2] }));
const plain = s => String(s).replace(/\*\*|`/g, "").trim();
function section(md, startRe) {
  const lines = md.split("\n"); const i = lines.findIndex(l => startRe.test(l)); if (i < 0) return [];
  const out = []; for (let j = i + 1; j < lines.length; j++) { if (/^#{1,3} /.test(lines[j])) break; out.push(lines[j]); } return out;
}
const tableRows = lines => lines.filter(l => /^\|/.test(l) && !/^\|\s*:?-{2,}/.test(l)).map(l => l.split("|").slice(1, -1).map(c => c.trim()));
const assetInfo = a => ({ name: a.name, url: a.browser_download_url, date: a.updated_at, downloads: a.download_count, size: a.size });
// Which nightly files belong to a component type, by file name.
function typeMatcher(name) {
  const n = name.toLowerCase();
  if (n.includes("binsem")) return f => /binsem/i.test(f);
  if (n.includes("sarek")) return f => /sarek/i.test(f);
  if (n.startsWith("dxvk")) return f => /^dxvk/i.test(f) && !/binsem|sarek/i.test(f);
  if (n.includes("vkd3d")) return f => /vkd3d|vk3dk/i.test(f);
  if (n.includes("d7vk")) return f => /d7vk/i.test(f);
  if (n.includes("wowbox64")) return f => /wowbox64/i.test(f);
  if (n.includes("box64")) return f => /^box64/i.test(f);
  if (n.includes("fex")) return f => /^fex/i.test(f);
  if (n.includes("proton") || n.includes("wine")) return f => /proton|wine/i.test(f);
  if (n.includes("turnip")) return f => /turnip/i.test(f);
  return () => false;
}
const baseKey = name => { const n = name.toLowerCase(); const binsem = n.includes("binsem");
  return n.split("(")[0].replace(/binsem|·/g, " ").replace(/[^a-z0-9]+/g, " ").trim() + (binsem ? "+binsem" : ""); };

async function fetchNightlies() {
  try {
    const raw = await fetch(`https://raw.githubusercontent.com/${NIGHTLIES}/main/README.md`).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); });
    // Components: stable archives + nightly
    const comp = tableRows(section(raw, /^## .*Releases/)).filter(r => r.length >= 3 && !/^Component$/i.test(plain(r[0])));
    const nightlyBlock = (raw.split("<!-- NIGHTLY-LATEST-START -->")[1] || "").split("<!-- NIGHTLY-LATEST-END -->")[0];
    const nightlyRows = tableRows(nightlyBlock.split("\n")).filter(r => r.length >= 2 && plain(r[0]));
    const nightlyRelease = nightlyRows.find(r => /^release$/i.test(plain(r[0])));
    const commits = nightlyRows.filter(r => !/^(release|files)$/i.test(plain(r[0]))).map(r => {
      const links = mdLinks(r[1]); const note = r[1].split("—")[1];
      return { name: plain(r[0]), version: links.length ? links.map(l => l.label.replace(/`/g, "")).join(" + ") : plain(r[1]), url: links[0] ? links[0].url : null, note: note ? plain(note) : null, key: baseKey(plain(r[0])) };
    });
    let nightlyDate = null, nightlyAssets = [];
    try { const nl = await gh(`repos/${NIGHTLIES}/releases/tags/nightly-latest`); nightlyDate = nl.published_at; nightlyAssets = (nl.assets || []).map(assetInfo); } catch { }
    const types = [];
    for (const r of comp) {
      const name = plain(r[0]).replace(/\*\(([^)]*)\)\*/, "").replace(/\*/g, "").trim();
      const hint = (r[0].match(/\*\(([^)]*)\)\*/) || [])[1] || null;
      const stable = [];
      for (const l of mdLinks(r[1])) {
        const tag = (l.url.match(/\/releases\/tag\/([^/?#]+)/) || [])[1];
        const item = { label: l.label, url: l.url, tag: tag || null };
        if (tag && l.url.includes(NIGHTLIES)) {
          try {
            const rel = await gh(`repos/${NIGHTLIES}/releases/tags/${tag}`);
            const assets = (rel.assets || []).filter(a => !/\.(txt|json|sha\d*)$/i.test(a.name)).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            if (assets[0]) Object.assign(item, { file: assets[0].name, fileUrl: assets[0].browser_download_url, date: assets[0].updated_at, files: assets.length,
              downloads: assets.reduce((n, a) => n + a.download_count, 0), assets: assets.slice(0, 80).map(assetInfo) });
          } catch (e) { console.log(`  ⚠️  Nightlies tag ${tag}: ${e.message}`); }
          await new Promise(res => setTimeout(res, 150));
        }
        stable.push(item);
      }
      const k = baseKey(name);
      const match = typeMatcher(name);
      types.push({ name, hint, stable, nightly: mdLinks(r[2])[0] ? { url: mdLinks(r[2])[0].url, date: nightlyDate, builds: commits.filter(c => c.key === k), files: nightlyAssets.filter(a => match(a.name)) } : null });
    }
    // Nightly-only components (e.g. Turnip): latest from the nightly block, stable from the project's latest release
    for (const c of commits.filter(c => !types.some(tp => baseKey(tp.name) === c.key))) {
      const match = typeMatcher(c.name);
      const type = { name: c.name, hint: null, stable: [], nightly: { url: `https://github.com/${NIGHTLIES}/releases/tag/nightly-latest`, date: nightlyDate, builds: [c], files: nightlyAssets.filter(a => match(a.name)) } };
      const repo = c.url && (c.url.match(/github\.com\/([^/]+\/[^/]+)\/releases/) || [])[1];
      if (repo) {
        try { const rel = await gh(`repos/${repo}/releases/latest`);
          type.stable.push({ label: rel.name || rel.tag_name, url: rel.html_url, tag: rel.tag_name, date: rel.published_at,
            files: (rel.assets || []).length, downloads: (rel.assets || []).reduce((n, a) => n + a.download_count, 0), assets: (rel.assets || []).slice(0, 80).map(assetInfo) });
        } catch (e) { console.log(`  ⚠️  ${repo} latest: ${e.message}`); }
      }
      types.push(type);
    }
    const catalogRows = tableRows(section(raw, /^## .*Component Catalog/));
    const catalog = { repo: mdLinks((catalogRows.find(r => /repo/i.test(r[0])) || [])[1] || "")[0] || null,
      raw: ((catalogRows.find(r => /raw url/i.test(r[0])) || [])[1] || "").replace(/`/g, "").trim() || null };
    const driverSources = tableRows(section(raw, /^### .*Adreno GPU Drivers/)).filter(r => mdLinks(r[0]).length)
      .map(r => ({ ...mdLinks(r[0])[0], desc: plain(r[1]) }));
    const mirrorLine = raw.split("\n").find(l => /<b>\s*Driver mirrors/i.test(l)) || "";
    const mirrors = [...mirrorLine.matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)].map(m => ({ label: m[2], url: m[1] }));
    const discord = section(raw, /^## .*Community/).filter(l => /^\s*-\s*\[/.test(l)).map(l => {
      const lk = mdLinks(l)[0]; const note = (l.match(/\*\(([^)]*)\)\*/) || [])[1]; return lk && { ...lk, note: note || null };
    }).filter(Boolean);
    const credits = section(raw, /^## .*Credits/).filter(l => /^\s*-\s*\*\*/.test(l)).map(l => ({ what: plain((l.match(/\*\*([^*]+)\*\*/) || [])[1] || "").replace(/:$/, ""), ...(mdLinks(l)[0] || {}) })).filter(c => c.url);
    console.log(`  ✅ Nightlies: ${types.length} component types, ${driverSources.length} driver sources, ${discord.length} Discord servers`);
    return { repo: NIGHTLIES, nightlyRelease: nightlyRelease ? mdLinks(nightlyRelease[1])[0] || null : null, nightlyDate, types, catalog, driverSources, mirrors, discord, credits };
  } catch (e) {
    console.log(`  ⚠️  Nightlies README: ${e.message}`);
    return null;
  }
}

// ===== Repo stats (stars, forks, watchers, age) =====
async function getGitHubRepoStats(repo) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'Emulator-Battle-Arena',
        ...(GH_TOKEN ? { 'Authorization': `Bearer ${GH_TOKEN}` } : {})
      }
    });
    if (!res.ok) {
      console.log(`  ⚠️  Repo stats: status ${res.status} for ${repo}`);
      return null;
    }
    const j = await res.json();
    return {
      stars: j.stargazers_count || 0,
      forks: j.forks_count || 0,
      watchers: j.subscribers_count || 0,
      issues: j.open_issues_count || 0,
      description: j.description || null,
      language: j.language || null,
      license: j.license ? j.license.spdx_id : null,
      pushedAt: j.pushed_at || null,
      createdAt: j.created_at || null,
      topics: (j.topics || []).slice(0, 6),
      archived: !!j.archived,
      homepage: j.homepage || null
    };
  } catch (error) {
    console.error(`  ❌ Repo stats error for ${repo}:`, error.message);
    return null;
  }
}

// ===== Gitea API (para Citron e similares) =====
async function getGiteaReleasesData(host, repo) {
  try {
    console.log(`  → Buscando releases de ${repo} (Gitea: ${host})...`);

    const res = await fetch(`${host}/api/v1/repos/${repo}/releases`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Emulator-Battle-Arena'
      }
    });

    if (!res.ok) {
      console.log(`  ⚠️  Status ${res.status} para ${repo} (Gitea)`);
      return { total: 0, releases: [] };
    }

    const releases = await res.json();

    if (!Array.isArray(releases) || releases.length === 0) {
      console.log(`  ℹ️  Nenhuma release encontrada para ${repo} (Gitea)`);
      return { total: 0, releases: [] };
    }

    // Gitea tem a mesma estrutura de resposta do GitHub para releases
    return parseReleases(releases, true);

  } catch (error) {
    console.error(`  ❌ Erro ao buscar ${repo} (Gitea):`, error.message);
    return { total: 0, releases: [] };
  }
}

// ===== Manifest Loader (StevenMXZ Contents) =====
async function fetchManifestDrivers() {
  try {
    console.log(`\n📂 Buscando manifest de drivers (Winlator-Contents)...`);
    const res = await fetch("https://raw.githubusercontent.com/StevenMXZ/Winlator-Contents/main/contents.json");
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();

    // Agrupar por tipo para facilitar a exibição
    const grouped = {};
    data.forEach(item => {
      const type = item.type || "Other";
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push({
        name: item.verName,
        version: item.verCode,
        url: item.remoteUrl,
        date: new Date().toISOString() // Manifests JSON geralmente não tem data por item, usamos 'now'
      });
    });

    console.log(`  ✅ Manifest processado: ${data.length} itens encontrados.`);
    return grouped;
  } catch (error) {
    console.error(`  ❌ Erro ao buscar manifest:`, error.message);
    return {};
  }
}

// ===== Parser comum para ambas as APIs =====
// excludeAssets: file names that are not downloads of the app itself (e.g. an in-app updater's
// update.json, fetched on every check) - left out of the asset list and the totals.
function parseReleases(releases, isGitea = false, excludeAssets = null) {
  let total = 0;
  const releasesList = [];

  for (const r of releases) {
    let releaseDownloads = 0;
    const assets = [];

    for (const a of r.assets || []) {
      if (excludeAssets && excludeAssets.includes(a.name)) continue;
      const count = isGitea ? (a.download_count || 0) : (a.download_count || 0);
      total += count;
      releaseDownloads += count;

      assets.push({
        name: a.name,
        size: a.size,
        downloads: count,
        url: isGitea ? a.browser_download_url : a.browser_download_url
      });
    }

    if (assets.length > 0) {
      releasesList.push({
        name: r.name || r.tag_name,
        tag: r.tag_name,
        date: r.published_at || r.created_at,
        downloads: releaseDownloads,
        body: r.body || "",
        prerelease: r.prerelease || false,
        assets: assets,
        htmlUrl: r.html_url
      });
    }
  }

  console.log(`  ✅ ${releasesList.length} releases encontradas (${total} downloads totais)`);
  return { total, releases: releasesList };
}

(async () => {
  console.log("\n🎮 EMULATOR BATTLE ARENA - Buscando dados...\n");

  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (const r of repos) {
    console.log(`\n📦 ${r.name}`);

    let data;
    if (r.apiType === "gitea") {
      data = await getGiteaReleasesData(r.apiHost, r.repo);
    } else {
      data = await getGitHubReleasesData(r.repo, r.releaseNamePrefix || null, r.excludeAssets || null);
    }

    const repoStats = r.apiType === "gitea" ? null : await getGitHubRepoStats(r.repo);

    const repoUrl = r.apiType === "gitea"
      ? `${r.apiHost}/${r.repo}`
      : `https://github.com/${r.repo}`;

    results.push({
      name: r.name,
      repo: r.repo,
      category: r.category,
      logo: r.logo || null,
      extensions: r.extensions || null,
      downloads: data.total,
      repoStats: repoStats,
      releases: data.releases,
      repoUrl: repoUrl
    });

    if (data.total > 0) {
      successCount++;
    } else {
      errorCount++;
    }

    // Delay para evitar rate limit (máximo 60 req/hora sem auth)
    await new Promise(resolve => setTimeout(resolve, 1100));
  }

  // Buscar drivers do manifest
  const manifestDrivers = await fetchManifestDrivers();
  const nightlies = await fetchNightlies();

  // Ordenar por downloads (decrescente)
  results.sort((a, b) => b.downloads - a.downloads);

  // Criar diretório data se não existir
  fs.mkdirSync("data", { recursive: true });

  // Salvar JSON
  const output = {
    updatedAt: new Date().toISOString(),
    totalProjects: results.length,
    projectsWithReleases: successCount,
    projectsWithoutReleases: errorCount,
    results: results,
    manifestDrivers: manifestDrivers, // Novos drivers categorizados do manifest
    nightlies: nightlies
  };

  fs.writeFileSync("data/rankings.json", JSON.stringify(output, null, 2));

  // ===== README badges: docs/badges/<owner>/<repo>.svg =====
  const compact = n => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n || 0);
  const ranked = results.filter(r => r.repoStats).sort((a, b) => b.downloads - a.downloads);
  ranked.forEach((r, i) => {
    const left = "emulator rankings", right = `#${i + 1} · ${compact(r.downloads)} downloads`;
    const w = t => Math.round(t.length * 6.3 + 14), lw = w(left), rw = w(right), W = lw + rw;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="20" role="img" aria-label="${left}: ${right}"><title>${left}: ${right}</title><linearGradient id="g" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="${W}" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="${lw}" height="20" fill="#1f2433"/><rect x="${lw}" width="${rw}" height="20" fill="#2f6bff"/><rect width="${W}" height="20" fill="url(#g)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11"><text x="${lw / 2}" y="15" fill="#010101" fill-opacity=".3">${left}</text><text x="${lw / 2}" y="14">${left}</text><text x="${lw + rw / 2}" y="15" fill="#010101" fill-opacity=".3">${right}</text><text x="${lw + rw / 2}" y="14">${right}</text></g></svg>`;
    const [o, n] = r.repo.split("/");
    fs.mkdirSync(`docs/badges/${o}`, { recursive: true });
    fs.writeFileSync(`docs/badges/${o}/${n}.svg`, svg);
  });

  // ===== Visitor stats from GoatCounter (only when the repo secrets are set) =====
  const GC_CODE = process.env.GOATCOUNTER_CODE, GC_TOKEN = process.env.GOATCOUNTER_TOKEN;
  if (GC_CODE) {
    const visitors = { code: GC_CODE, total: 0, countries: {}, updatedAt: new Date().toISOString() };
    if (GC_TOKEN) {
      const gc = path => fetch(`https://${GC_CODE}.goatcounter.com/api/v0/${path}`, { headers: { Authorization: `Bearer ${GC_TOKEN}`, "Content-Type": "application/json" } })
        .then(r => { if (!r.ok) throw new Error(`${r.status} ${path}`); return r.json(); });
      const range = `start=2020-01-01&end=${new Date().toISOString().slice(0, 10)}`;
      try { const tot = await gc(`stats/total?${range}`); visitors.total = tot.total || 0; } catch (e) { console.log(`  ⚠️  GoatCounter total: ${e.message}`); }
      try { const loc = await gc(`stats/locations?${range}&limit=250`); for (const st of loc.stats || []) if (st.id) visitors.countries[st.id.slice(0, 2).toUpperCase()] = (visitors.countries[st.id.slice(0, 2).toUpperCase()] || 0) + (st.count || 0); }
      catch (e) { console.log(`  ⚠️  GoatCounter locations: ${e.message}`); }
    }
    fs.writeFileSync("docs/data/visitors.json", JSON.stringify(visitors));
    console.log(`  👥 GoatCounter: ${visitors.total} visits, ${Object.keys(visitors.countries).length} countries`);
  }

  // ===== Daily download history (powers the "Last 14 days" ranking) =====
  // One total per repo per UTC day; each hourly run overwrites today's value. Keeps 60 days.
  const HISTORY_FILE = "docs/data/history.json";
  let history = { days: [], totals: {} };
  try { history = JSON.parse(fs.readFileSync(HISTORY_FILE)); } catch { }
  const today = new Date().toISOString().slice(0, 10);
  if (!history.days.includes(today)) history.days.push(today);
  history.days = history.days.sort().slice(-60);
  const keep = new Set(history.days);
  const totals = {};
  for (const r of results) {
    const prev = history.totals[r.repo] || {};
    const row = {};
    for (const d of Object.keys(prev)) if (keep.has(d)) row[d] = prev[d];
    // A failed fetch reports 0; skip it so a rate limit can't distort the 14-day numbers.
    if (r.downloads > 0) row[today] = r.downloads;
    totals[r.repo] = row;
  }
  history.totals = totals;
  fs.mkdirSync("docs/data", { recursive: true });
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history));

  console.log("\n" + "=".repeat(60));
  console.log("✅ Rankings atualizados com sucesso!");
  console.log("=".repeat(60));
  console.log(`📊 Total de projetos: ${results.length}`);
  console.log(`✅ Com releases: ${successCount}`);
  console.log(`⚠️  Sem releases: ${errorCount}`);
  console.log(`💾 Arquivo salvo em: data/rankings.json`);
  console.log("=".repeat(60) + "\n");

  // Mostrar top 5
  console.log("🏆 TOP 5:");
  results.slice(0, 5).forEach((item, index) => {
    const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    console.log(`${medals[index]} ${item.name}: ${item.downloads.toLocaleString('pt-BR')} downloads`);
  });
  console.log("");

})();
