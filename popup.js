document.addEventListener('DOMContentLoaded', function () {
  const getQuery = () => {
    const keywords = document.getElementById('keywords').value.trim();
    const exact = document.getElementById('exactPhrase')?.value.trim();
    const any = document.getElementById('anyWords')?.value.trim();
    const exclude = document.getElementById('excludeWords')?.value.trim();
    const range = document.getElementById('numberRange')?.value.trim();
    const site = document.getElementById('site')?.value.trim();
    const filetype = document.getElementById('filetype')?.value;
    const inType = document.getElementById('inType')?.value;
    const lang = document.getElementById('lang')?.value.trim();
    const daterange = document.getElementById('daterange')?.value.trim();
    

    let query = '';
    if (keywords) query += keywords + ' ';
    if (exact) query += `"${exact}" `;
    if (any) query += any + ' ';
    if (exclude) query += `-${exclude} `;
    if (range) query += range + ' ';
    if (site) query += `site:${site} `;
    if (filetype) query += `filetype:${filetype} `;
    if (inType && keywords) query += `${inType}${keywords} `;
    if (lang) query += `lang:${lang} `;
    if (daterange) query += `${daterange} `;

    return encodeURIComponent(query.trim());
  };

  document.getElementById('searchButton').addEventListener('click', function () {
    const platform = document.getElementById('platform').value;
    const encodedQuery = getQuery();
    let searchUrl = '';

    switch (platform) {
      case 'google':
        searchUrl = `https://www.google.com/search?q=${encodedQuery}`; break;
      case 'facebook':
        searchUrl = `https://www.facebook.com/search/top?q=${encodedQuery}`; break;
      case 'instagram':
        searchUrl = `https://www.google.com/search?q=site:instagram.com+${encodedQuery}`; break;
      case 'tiktok':
        searchUrl = `https://www.google.com/search?q=site:tiktok.com+${encodedQuery}`; break;
      case 'linkedin':
        searchUrl = `https://www.google.com/search?q=site:linkedin.com/in+${encodedQuery}`; break;
      case 'reddit':
        searchUrl = `https://www.reddit.com/search/?q=${encodedQuery}`; break;
      case 'twitter':
        searchUrl = `https://www.google.com/search?q=site:twitter.com+${encodedQuery}`; break;
      case 'youtube':
        searchUrl = `https://www.youtube.com/results?search_query=${encodedQuery}`; break;
      default:
        searchUrl = `https://www.google.com/search?q=${encodedQuery}`;
    }

    chrome.tabs.create({ url: searchUrl });
  });

  document.getElementById('chatgptButton').addEventListener('click', function () {
    const keywords = document.getElementById('keywords').value.trim();
    if (!keywords) return;

    const encodedPrompt = encodeURIComponent(keywords);
    const chatgptUrl = `https://chat.openai.com/?q=${encodedPrompt}`;

    chrome.tabs.create({ url: chatgptUrl });
  });
});
