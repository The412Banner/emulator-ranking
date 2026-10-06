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
    manifestDrivers: manifestDrivers // Novos drivers categorizados do manifest
  };

  fs.writeFileSync("data/rankings.json", JSON.stringify(output, null, 2));

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
