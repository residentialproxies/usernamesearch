# UsernameSearch.io 

本地位置
PROJECT_NAME="usernamesearch.io"
PROJECT_PATH="/Users/butterfly/dev/usernamesearch.io"

完成后需要推送到github 并部署到vercel。

─ / (Homepage) 

├─ /pricing -> 简洁的定价页, 按api次数 $10 美金 500次
├─Resource
         ├─ 支持的网站全列表 (原/supported-sites)。
         └─  /guides -> 指南 (blog)。（推荐4个相关主题 做错list合集。 ）
├─ /tools -> 免费工具集 (如用户名生成器)。
        ├─ /username-checker (类似Homepage, homepage的查询不输出Pro, 这个输出)
     /username-availability-checker/[site-name]  (e.g., /username-checker/tiktok)  -选做！基于我们的数据和seo agent推荐来做
        ├─ /tools/username-generator  
        └─  /tools/brand-name-generator  

├─ API Portal (API 门户)
            ├─ /api -> API 产品介绍。
            └─ /api/docs -> 开发者文档

 └─   /contact /privacy & /terms  


## backend agent

后端你先学习查看之前的2个项目
<thinking>
1.
PROJECT_NAME="whatsmyname"
PROJECT_PATH="/Users/butterfly/dev/whatsmyname"

主要是 
/whatsmyname/lib/api-client.ts
/whatsmyname/lib/data.json

我们网站主要使用 /whatsmyname/lib/api-client.ts 后端逻辑！
api提供了1500多个站！不需要再额外开发。 
** 能用的代码尽量用！**

2.
PROJECT_NAME="whatsmynameapp"
PROJECT_PATH="/Users/butterfly/dev/whatsmynameapp"

主要是，
expressjs/src/api/v1/domain/stats.ts 
（需要域名的rank，流量高的排名到前面，取一次就可以了，）这个应该是通过similarweb定时获取，我们获取1次即可，我们主要需要一个rank数据。
https://data.similarweb.com/api/v1/data?domain=github.com


主要是这么多网站，展示时候需要按目录展示排名， 流量高的排名再前面。
（目录排名，也是类似的思路。）

</thinking>


学习完毕后，按照最合理的逻辑去完成你的后端实现工作。
记住，一定要简单和稳定，尽量之前的2个项目为基础来做。

你是项目的核心，你认真做好规划和 to do list 开展工作。

/pricing

API key
EE4GPYN-SB2MM6W-MP2EEGW-Y5N3ZGG
Public key
c0c51dfc-f71c-4b82-a0c5-006b88e91631
Set up IPN
eucve+np/UVAIuMLaNoscc8BE2VL/+hY
Webhook URL？


#### ai username推荐

curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: GEMINI_API_KEY' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'

GEMINI_API_KEY 可使用下面3个free的key
AIzaSyCbinafIhh5cHsoC4vU35Zu0DbOHe-SjVc




## frontend agent

As the Frontend Developer for UsernameSearch.io, implement:

Task: [Specific feature/component]
Page/Component: [Component name]
Route: [URL path]

Technical Requirements:
1. Next.js 14 App Router with TypeScript
2. Tailwind CSS + shadcn/ui components
3. Responsive design (mobile-first)
4. Dark/light mode support
5. Loading states with skeletons
6. Error boundaries
7. Optimistic updates
8. Form validation with React Hook Form + Zod

Performance Targets:
- Lighthouse Score: >95
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle size: <200KB per route

SEO Requirements (coordinate with SEO Specialist):
- Semantic HTML structure
- Meta tags implementation
- Open Graph tags
- Schema.org markup
- Accessibility (WCAG 2.1 AA)

UI/UX Specifications:
- Primary Color: #6366F1
- Font: Inter
- Border Radius: 8px
- Animations: Framer Motion
- Icons: Lucide React

Deliverables:
- Complete React component
- Storybook story
- Unit tests
- Integration with backend API
- Mobile/desktop responsive
- Loading and error states


###  参考header
简要说明：
- 目的：顶部导航，展示品牌与核心导航链接，提供登录/注册入口。
- 结构：
  - 左侧品牌标题：usernamesearch.io（点击回首页）。
  - 中间主导航：Pricing、Sites（Supported Sites）、API（桌面端显示，移动端可隐藏）。
  - 右侧操作：Log In、Sign Up（主色按钮）。
- 响应式：在移动端隐藏主导航和操作区，只保留品牌（或使用后续的抽屉菜单）。
- 交互：本节无额外交互，仅跳转链接。




###  参考footer
简要说明：
- 目的：页面底部的简单导航与版权信息。
- 结构：
  - 链接：Home、Pricing、API。
  - 版权：© 2025 usernamesearch.io。
- 布局：单行在桌面端左右分布，移动端上下堆叠。
- 交互：纯链接，无复杂逻辑。


### home
简要说明：
- 页面目标：最小可用的用户名搜索页。
- 关键元素：
  - 标题：Username Search（置中）。
  - 输入框与按钮：输入用户名并触发搜索。
  - 状态条：展示“Checking...”/提示信息。
  - 结果容器：展示搜索结果或占位文本。
- 基础行为：
  - 点击 Search 且输入非空时：状态条显示“Checking...”，结果容器显示“Results will appear here.”（示意占位）。
- 样式约束：使用 Tailwind 基础工具类，浅色/深色模式兼容即可；不需要复杂动画与图标。


###  /supported-sites
All Supported Sites (sample)
<!DOCTYPE html>
<html lang="en" class="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>All 400+ Supported Sites for Username Checks | usernamesearch.io</title>
    <meta name="description" content="The complete, searchable list of all social media, gaming, and developer sites checked by our tool. See which platforms are available in our Free vs. Pro plans.">
    <meta name="keywords" content="supported sites, username checker list, instagram username check, tiktok username check, github username check">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .filter-btn.active {
            background-color: #0ea5e9; /* sky-500 */
            color: white;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        }
        .table-row-group-header {
            position: sticky;
            top: 110px; /* Adjust based on the height of your sticky controls */
            z-index: 5;
        }
    </style>
</head>
<body class="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 antialiased">

    <div class="container mx-auto px-4 py-12 md:py-20">
        
        <div class="text-center max-w-3xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">All Supported Sites</h1>
            <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">We check your username across over 400 platforms. Our Free plan covers the essentials, while Pro unlocks the full list for ultimate coverage.</p>
        </div>

        <!-- Search and Filter Controls -->
        <div class="mt-10 max-w-4xl mx-auto sticky top-4 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-xl shadow-lg border dark:border-slate-700">
            <input type="text" id="search-input" placeholder="Search for a site (e.g., Instagram, Steam...)" class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition">
            <div class="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button class="filter-btn active px-4 py-1.5 text-sm font-semibold rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200" data-filter="all">All Sites</button>
                <button class="filter-btn px-4 py-1.5 text-sm font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full" data-filter="Free">Free Tier</button>
                <button class="filter-btn px-4 py-1.5 text-sm font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full" data-filter="Pro">Pro Tier</button>
            </div>
        </div>

        <!-- Site List Table -->
        <div class="mt-12 max-w-6xl mx-auto">
            <div class="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                <table class="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                    <thead class="text-xs text-slate-700 uppercase bg-slate-100 dark:text-slate-300 dark:bg-slate-700">
                        <tr>
                            <th scope="col" class="px-6 py-3 min-w-[200px]">Platform Name</th>
                            <th scope="col" class="px-6 py-3 min-w-[200px]">Domain</th>
                            <th scope="col" class="px-6 py-3 text-center">Tier</th>
                        </tr>
                    </thead>
                    <tbody id="site-list-body">
                        <!-- Categories and sites will be injected here by JavaScript -->
                    </tbody>
                </table>
            </div>
             <div id="no-results" class="text-center py-16 text-slate-500 dark:text-slate-400 hidden">
                <p class="text-lg font-semibold">No sites found.</p>
                <p class="mt-1">Try adjusting your search or filter.</p>
            </div>
        </div>
    </div>

    <script>
        const siteData = [
            // This is the full list of 415 sites provided by the user.
            {"Category":"Social Networks","Platform Name":"Instagram","Domain":"instagram.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"TikTok","Domain":"tiktok.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"X (Twitter)","Domain":"x.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Facebook","Domain":"facebook.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Reddit","Domain":"reddit.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Snapchat","Domain":"snapchat.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Bluesky","Domain":"bsky.app","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Threads","Domain":"threads.net","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"LinkedIn","Domain":"linkedin.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Pinterest","Domain":"pinterest.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Telegram","Domain":"t.me","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"VK","Domain":"vk.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Discord","Domain":"discord.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Mastodon.social","Domain":"mastodon.social","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Tumblr","Domain":"tumblr.com","Tier":"Free"},
            {"Category":"Social Networks","Platform Name":"Flickr","Domain":"flickr.com","Tier":"Pro"},
            {"Category":"Social Networks","Platform Name":"About.me","Domain":"about.me","Tier":"Pro"},
            {"Category":"Social Networks","Platform Name":"Linktree","Domain":"linktr.ee","Tier":"Pro"},
            {"Category":"Social Networks","Platform Name":"VSCO","Domain":"vsco.co","Tier":"Pro"},
            {"Category":"Social Networks","Platform Name":"9GAG","Domain":"9gag.com","Tier":"Pro"},
            // ... truncated for brevity. The full JS will contain all 415 entries.
            {"Category":"Video & Streaming","Platform Name":"YouTube","Domain":"youtube.com","Tier":"Free"},
            {"Category":"Video & Streaming","Platform Name":"Twitch","Domain":"twitch.tv","Tier":"Free"},
            {"Category":"Design & Art","Platform Name":"Behance","Domain":"behance.net","Tier":"Free"},
            {"Category":"Software & Development","Platform Name":"GitHub","Domain":"github.com","Tier":"Free"},
            {"Category":"Gaming","Platform Name":"Steam Community (User)","Domain":"steamcommunity.com","Tier":"Free"},
            {"Category":"Content & Blogging","Platform Name":"Medium","Domain":"medium.com","Tier":"Free"},
            {"Category":"Music & Audio","Platform Name":"Spotify","Domain":"open.spotify.com","Tier":"Free"}
        ];

        const siteListBody = document.getElementById('site-list-body');
        const searchInput = document.getElementById('search-input');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const noResults = document.getElementById('no-results');

        const slugify = (text) => {
            return text
                .toString()
                .toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars except -
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
        };

        const renderList = (filter = 'all', searchTerm = '') => {
            siteListBody.innerHTML = '';
            
            const filteredData = siteData.filter(site => {
                const tierMatch = filter === 'all' || site.Tier === filter;
                const searchMatch = !searchTerm || site['Platform Name'].toLowerCase().includes(searchTerm.toLowerCase()) || site['Domain'].toLowerCase().includes(searchTerm.toLowerCase());
                return tierMatch && searchMatch;
            });

            if (filteredData.length === 0) {
                noResults.classList.remove('hidden');
                siteListBody.parentElement.parentElement.classList.add('hidden');
                return;
            }
            noResults.classList.add('hidden');
            siteListBody.parentElement.parentElement.classList.remove('hidden');

            const groupedByCategory = filteredData.reduce((acc, site) => {
                (acc[site.Category] = acc[site.Category] || []).push(site);
                return acc;
            }, {});

            const categoryOrder = Object.keys(groupedByCategory).sort();

            categoryOrder.forEach(category => {
                const categoryHeaderRow = document.createElement('tr');
                categoryHeaderRow.className = 'bg-slate-200 dark:bg-slate-800 table-row-group-header';
                categoryHeaderRow.innerHTML = `<td colspan="3" class="px-6 py-2 font-bold text-slate-800 dark:text-slate-200">${category}</td>`;
                siteListBody.appendChild(categoryHeaderRow);

                groupedByCategory[category].forEach(site => {
                    const tierBadgeClass = site.Tier === 'Pro' 
                        ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-400' 
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-400';
                    
                    const slug = slugify(site['Platform Name']);
                    
                    const row = document.createElement('tr');
                    row.className = 'bg-white border-b dark:bg-slate-800/50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/20';
                    row.innerHTML = `
                        <th scope="row" class="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">
                            <a href="/username-checker/${slug}" class="hover:text-sky-500 dark:hover:text-sky-400 transition">${site['Platform Name']}</a>
                        </th>
                        <td class="px-6 py-4">${site.Domain}</td>
                        <td class="px-6 py-4 text-center">
                            <span class="text-xs font-bold px-2.5 py-1 rounded-full ${tierBadgeClass}">${site.Tier}</span>
                        </td>
                    `;
                    siteListBody.appendChild(row);
                });
            });
        };

        const updateFilters = () => {
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            const searchTerm = searchInput.value;
            renderList(activeFilter, searchTerm);
        };

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                updateFilters();
            });
        });

        searchInput.addEventListener('input', () => {
            updateFilters();
        });

        // Initial Render
        renderList();

        // Dark mode logic
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>

</body>
</html>


###  tool/username-checker
<!DOCTYPE html>
<html lang="en" class="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>All 400+ Supported Sites for Username Checks | usernamesearch.io</title>
    <meta name="description" content="The complete, searchable list of all social media, gaming, and developer sites checked by our tool. See which platforms are available in our Free vs. Pro plans.">
    <meta name="keywords" content="supported sites, username availability checker, instagram username check, tiktok username check, github username check">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .loader {
            border: 2px solid #e5e7eb;
            border-top: 2px solid #3b82f6;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        .summary-arrow { transition: transform 0.2s; }
        details[open] .summary-arrow { transform: rotate(90deg); }
    </style>
</head>
<body class="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 antialiased">

    <main class="container mx-auto px-4 py-8 md:py-12">

        <div class="text-center mb-8">
             <div class="inline-flex items-center space-x-3">
                <svg class="w-12 h-12 text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5">
                    <path d="M25 25 L20 20"/>
                    <circle cx="13" cy="13" r="8"/>
                    <circle cx="13" cy="11" r="3" stroke-width="2"/>
                    <path d="M9, 18 C9, 15.5, 17, 15.5, 17, 18" stroke-width="2"/>
                </svg>
                <div>
                    <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Full Username Checker</h1>
                    <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">on usernamesearch.io</p>
                </div>
            </div>
            <p class="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">Get the full picture. See your username's availability across all 400+ platforms.</p>
        </div>

        <div class="sticky top-4 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-10">
            <div class="flex items-center space-x-2">
                <div class="relative flex-grow">
                    <svg class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                    </svg>
                    <input type="text" id="username-input" placeholder="Enter username to check all sites..." class="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-lg">
                </div>
                <button id="search-btn" class="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                    <span class="hidden sm:inline">Search</span>
                     <svg class="w-6 h-6 sm:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </button>
            </div>
             <div id="status-bar" class="mt-3 text-sm text-slate-500 dark:text-slate-400 min-h-[20px] text-center"></div>
             <div id="filter-container" class="mt-3 flex-wrap gap-2 hidden"></div>
        </div>

        <div id="results-container" class="mt-6 space-y-4">
            <div id="placeholder" class="col-span-full text-center py-24">
                 <svg class="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <p class="text-lg font-semibold text-slate-600 dark:text-slate-300">Unlock your full digital potential.</p>
                <p class="mt-1">Enter a username to see its availability across the entire web.</p>
            </div>
        </div>
    </main>

    <script>
    document.addEventListener('DOMContentLoaded', () => {

        const siteData = [
            { name: 'Instagram', category: 'Social Networks', tier: 'Free' }, { name: 'TikTok', category: 'Social Networks', tier: 'Free' }, { name: 'X (Twitter)', category: 'Social Networks', tier: 'Free' }, { name: 'Facebook', category: 'Social Networks', tier: 'Free' }, { name: 'Reddit', category: 'Social Networks', tier: 'Free' },
            { name: 'YouTube', category: 'Video & Streaming', tier: 'Free' }, { name: 'Twitch', category: 'Video & Streaming', tier: 'Free' },
            { name: 'Behance', category: 'Design & Art', tier: 'Free' }, { name: 'Dribbble', category: 'Design & Art', tier: 'Free' },
            { name: 'GitHub', category: 'Software & Development', tier: 'Free' }, { name: 'GitLab', category: 'Software & Development', tier: 'Free' },
            { name: 'Steam (User)', category: 'Gaming', tier: 'Free' },
            { name: 'Flickr', category: 'Social Networks', tier: 'Pro' }, { name: '9GAG', category: 'Social Networks', tier: 'Pro' },
            { name: '500px', category: 'Design & Art', tier: 'Pro' }, { name: 'HackerNews', category: 'Professional & Business', tier: 'Pro' },
            // In a real app, this list would contain all ~415 sites.
        ];

        const categoryOrder = [ 'Social Networks', 'Video & Streaming', 'Design & Art', 'Software & Development', 'Gaming', 'Professional & Business' ];

        const ui = {
            usernameInput: document.getElementById('username-input'), searchBtn: document.getElementById('search-btn'),
            resultsContainer: document.getElementById('results-container'), statusBar: document.getElementById('status-bar'),
            placeholder: document.getElementById('placeholder'), filterContainer: document.getElementById('filter-container'),
        };

        let searchIsRunning = false;

        const debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => { func.apply(this, args); }, delay);
            };
        };

        const startSearch = async () => {
            const username = ui.usernameInput.value.trim().toLowerCase();
            if (!username || searchIsRunning) return;

            searchIsRunning = true;
            ui.searchBtn.disabled = true;
            if (ui.placeholder) ui.placeholder.style.display = 'none';
            
            ui.statusBar.innerHTML = `Checking free sites for "${username}"... Pro sites are locked.`;
            
            // This now calls the new combined rendering function
            await renderAndCheckResults(username);

            searchIsRunning = false;
            ui.searchBtn.disabled = false;
            ui.statusBar.innerHTML = `Results for "${username}". <a href="/pricing" class="font-semibold text-sky-500 hover:underline">Upgrade to Pro</a> to unlock all sites.`;
        };
        
        const renderAndCheckResults = async (username) => {
            ui.resultsContainer.innerHTML = '';
            const categories = [...new Set(siteData.map(s => s.category))];
            
            // Render Filter Tags
            ui.filterContainer.innerHTML = `<button class="filter-btn active px-3 py-1 text-sm bg-sky-500 text-white rounded-full" data-category="all">All</button>`;
            categoryOrder.forEach(category => {
                if (categories.includes(category)) {
                    ui.filterContainer.innerHTML += `<button class="filter-btn px-3 py-1 text-sm bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full" data-category="${category}">${category}</button>`;
                }
            });
            ui.filterContainer.classList.remove('hidden');
            ui.filterContainer.classList.add('flex');
            addFilterListeners();

            // Render categories and cards in loading/locked state first
            categoryOrder.forEach(category => {
                if (!categories.includes(category)) return;

                const categorySites = siteData.filter(site => site.category === category);
                const details = document.createElement('details');
                details.className = 'bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden category-details';
                details.setAttribute('data-category', category);
                details.open = true;

                let gridContent = '';
                categorySites.forEach(site => {
                    gridContent += createCardHTML(site, site.tier === 'Pro' ? 'Locked' : 'loading');
                });
                
                details.innerHTML = `
                    <summary class="flex justify-between items-center p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <h2 class="text-xl font-bold text-slate-700 dark:text-slate-200">${category}</h2>
                        <svg class="w-6 h-6 text-slate-500 summary-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                    </summary>
                    <div class="p-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${gridContent}
                    </div>
                `;
                ui.resultsContainer.appendChild(details);
            });

            // Then, check only the free sites
            const freeSites = siteData.filter(s => s.tier === 'Free');
            await Promise.all(freeSites.map(site => mockApiCheck(site, username)));
        };

        const createCardHTML = (site, status) => {
            let statusHTML = '';
            switch(status) {
                case 'loading': statusHTML = `<div class="loader"></div>`; break;
                case 'Available': statusHTML = `<span class="font-semibold text-green-500">Available</span><svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`; break;
                case 'Taken': statusHTML = `<span class="font-semibold text-red-500">Taken</span><svg class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`; break;
                case 'Locked': statusHTML = `<a href="/pricing" class="group relative flex items-center" title="Upgrade to Pro to check this site"><span class="font-semibold text-yellow-500">Pro</span><svg class="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg></a>`; break;
                default: statusHTML = `<span class="font-semibold text-slate-400">Unknown</span>`;
            }
            return `<div id="card-${site.name.replace(/[^a-zA-Z0-9]/g, '')}" class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-between">
                        <span class="font-semibold text-slate-700 dark:text-slate-200">${site.name}</span>
                        <div class="flex items-center space-x-2">${statusHTML}</div>
                    </div>`;
        };

        const updateCard = (site, status) => {
            const card = document.getElementById(`card-${site.name.replace(/[^a-zA-Z0-9]/g, '')}`);
            if (card) {
                card.outerHTML = createCardHTML(site, status);
            }
        };

        const mockApiCheck = async (site, username) => {
            return new Promise(resolve => {
                const delay = 500 + Math.random() * 1500;
                setTimeout(() => {
                    const rand = Math.random();
                    let status = rand < 0.6 ? 'Taken' : 'Available';
                    updateCard(site, status);
                    resolve({ ...site, status });
                }, delay);
            });
        };

        const addFilterListeners = () => {
             document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-sky-500', 'text-white'));
                    btn.classList.add('active', 'bg-sky-500', 'text-white');
                    const categoryToShow = btn.dataset.category;
                    document.querySelectorAll('.category-details').forEach(detail => {
                        detail.style.display = (categoryToShow === 'all' || detail.dataset.category === categoryToShow) ? 'block' : 'none';
                    });
                });
            });
        };

        const debouncedSearch = debounce(startSearch, 500);
        ui.usernameInput.addEventListener('input', debouncedSearch);
        ui.searchBtn.addEventListener('click', startSearch);
        ui.usernameInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); startSearch(); }});
    });
    </script>
</body>
</html>



### /tools/username-generator  
<!DOCTYPE html>
<html lang="en" class="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>AI Username Toolkit - Generator, Analyzer & Bio Creator | usernamesearch.io</title>
    <meta name="description" content="A free suite of AI tools to generate unique usernames, analyze their brand strength, and create engaging bios for Instagram, TikTok, and more.">
    <meta name="keywords" content="username generator, username analyzer, bio generator, AI username generator, handle generator, instagram bio ideas, free tools">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .loader {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #38bdf8;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        /* Tab styling */
        .tab-btn.active {
            background-color: white;
            color: #0ea5e9;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        }
        .dark .tab-btn.active {
            background-color: #1e293b; /* slate-800 */
        }
        .tab-content { display: none; }
        .tab-content.active { display: block; }

        /* Score Circle */
        .score-circle {
            transition: stroke-dashoffset 1s ease-out;
        }
    </style>
</head>
<body class="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 antialiased">

    <div class="container mx-auto px-4 py-12 md:py-20 max-w-2xl">
        
        <div class="text-center">
             <div class="inline-flex items-center space-x-3">
                <svg class="w-12 h-12 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 18.75l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 24l-1.035.259a3.375 3.375 0 00-2.456 2.456L18 27.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 24l1.035-.259a3.375 3.375 0 002.456-2.456L18 18.75z" />
                </svg>
                <div>
                    <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">AI Username Toolkit</h1>
                     <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">A free tool by usernamesearch.io</p>
                </div>
            </div>
            <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">Generate, analyze, and create bios for your perfect digital identity.</p>
        </div>

        <div class="mt-10 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-lg border dark:border-slate-700">
            <!-- Tabs -->
            <div class="grid grid-cols-3 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
                <button class="tab-btn active p-2 text-sm font-semibold rounded-md transition-colors" data-tab="generator">Generator</button>
                <button class="tab-btn p-2 text-sm font-semibold text-slate-600 dark:text-slate-400 rounded-md transition-colors" data-tab="analyzer">Analyzer</button>
                <button class="tab-btn p-2 text-sm font-semibold text-slate-600 dark:text-slate-400 rounded-md transition-colors" data-tab="bio">Bio Generator</button>
            </div>

            <!-- Generator Tab -->
            <div id="generator" class="tab-content active p-4 md:p-6">
                 <div>
                    <label for="keywords-input" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">1. Enter keywords about you</label>
                    <input type="text" id="keywords-input" placeholder="e.g., traveler, gamer, minimalist coder" class="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                </div>
                <div class="mt-4">
                    <label for="style-select" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">2. Choose a username style</label>
                    <select id="style-select" class="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <option value="short-and-catchy">Short & Catchy</option>
                        <option value="professional">Professional</option>
                        <option value="aesthetic">Aesthetic</option>
                        <option value="gaming">Gaming</option>
                    </select>
                </div>
                <button id="generate-btn" class="mt-6 w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50">Generate Usernames</button>
            </div>

            <!-- Analyzer Tab -->
            <div id="analyzer" class="tab-content p-4 md:p-6">
                <div>
                    <label for="analyze-input" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Enter a username to analyze</label>
                    <input type="text" id="analyze-input" placeholder="e.g., traveler_bob_88" class="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                </div>
                <button id="analyze-btn" class="mt-6 w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50">Analyze Username</button>
            </div>

            <!-- Bio Generator Tab -->
            <div id="bio" class="tab-content p-4 md:p-6">
                <div>
                    <label for="bio-keywords-input" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">1. Describe yourself in keywords</label>
                    <input type="text" id="bio-keywords-input" placeholder="e.g., photographer, world traveler, coffee lover" class="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                </div>
                <div class="mt-4">
                    <label for="bio-platform-select" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">2. Choose a platform</label>
                    <select id="bio-platform-select" class="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <option value="Instagram">Instagram</option>
                        <option value="X (Twitter)">X (Twitter)</option>
                        <option value="TikTok">TikTok</option>
                        <option value="LinkedIn">LinkedIn</option>
                    </select>
                </div>
                <button id="bio-generate-btn" class="mt-6 w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50">Generate Bio</button>
            </div>
        </div>

        <!-- Results Section -->
        <div id="results-container" class="mt-10 min-h-[200px]">
            <!-- AI-generated results will appear here -->
        </div>
    </div>

    <script>
        const ui = {
            tabs: document.querySelectorAll('.tab-btn'),
            tabContents: document.querySelectorAll('.tab-content'),
            keywordsInput: document.getElementById('keywords-input'),
            styleSelect: document.getElementById('style-select'),
            generateBtn: document.getElementById('generate-btn'),
            analyzeInput: document.getElementById('analyze-input'),
            analyzeBtn: document.getElementById('analyze-btn'),
            bioKeywordsInput: document.getElementById('bio-keywords-input'),
            bioPlatformSelect: document.getElementById('bio-platform-select'),
            bioGenerateBtn: document.getElementById('bio-generate-btn'),
            resultsContainer: document.getElementById('results-container')
        };

        ui.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                ui.tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                ui.tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(tab.dataset.tab).classList.add('active');
                ui.resultsContainer.innerHTML = '';
            });
        });

        // --- Username Generator Logic ---
        ui.generateBtn.addEventListener('click', async () => {
            const keywords = ui.keywordsInput.value.trim();
            if (!keywords) { ui.resultsContainer.innerHTML = `<p class="text-center text-red-500">Please enter some keywords.</p>`; return; }
            setLoading(ui.generateBtn, 'Generating usernames...');
            const prompt = `Generate 15 creative, modern usernames based on: "${keywords}". Style: "${ui.styleSelect.value}". They must be single words, no spaces. Return a comma-separated list.`;
            try {
                const resultText = await callGeminiApi(prompt, false);
                const usernames = resultText.split(',').map(name => name.trim().replace(/\.$/, '')).filter(Boolean);
                let html = `<h2 class="text-2xl font-bold text-center mb-6">Username Ideas</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${usernames.map(name => `<div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border dark:border-slate-700 flex flex-col justify-between"><span class="font-bold text-lg">${name}</span><a href="/?q=${encodeURIComponent(name.toLowerCase())}" target="_blank" class="mt-3 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 px-3 py-2 rounded-md text-center">Check Availability &rarr;</a></div>`).join('')}</div>`;
                ui.resultsContainer.innerHTML = html;
            } catch (error) { handleError(error, 'generator');
            } finally { resetLoading(ui.generateBtn, 'Generate Usernames'); }
        });

        // --- Username Analyzer Logic ---
        ui.analyzeBtn.addEventListener('click', async () => {
            const username = ui.analyzeInput.value.trim();
            if (!username) { ui.resultsContainer.innerHTML = `<p class="text-center text-red-500">Please enter a username to analyze.</p>`; return; }
            setLoading(ui.analyzeBtn, 'Analyzing...');
            const prompt = `Act as a branding expert. Analyze the username "${username}". Provide a score from 0 to 100 on its brandability. Give a brief analysis on memorability, length, and style. Provide 2-3 actionable improvement suggestions.`;
            try {
                const resultJson = await callGeminiApi(prompt, true);
                renderAnalysis(resultJson);
            } catch (error) { handleError(error, 'analyzer');
            } finally { resetLoading(ui.analyzeBtn, 'Analyze Username'); }
        });

        // --- Bio Generator Logic ---
        ui.bioGenerateBtn.addEventListener('click', async () => {
            const keywords = ui.bioKeywordsInput.value.trim();
            const platform = ui.bioPlatformSelect.value;
            if (!keywords) { ui.resultsContainer.innerHTML = `<p class="text-center text-red-500">Please enter some keywords.</p>`; return; }
            setLoading(ui.bioGenerateBtn, 'Generating bios...');
            const prompt = `Generate 3 short, engaging bio options for a ${platform} profile. Each must be under 150 characters, include relevant emojis, and be based on: "${keywords}". Separate each option with '---'.`;
            try {
                const resultText = await callGeminiApi(prompt, false);
                const bios = resultText.split('---').map(b => b.trim()).filter(Boolean);
                ui.resultsContainer.innerHTML = `<h2 class="text-2xl font-bold text-center mb-6">AI-Generated Bios for ${platform}</h2><div class="space-y-4">${bios.map((bio, i) => `<div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border dark:border-slate-700"><p class="text-slate-700 dark:text-slate-300" id="bio-text-${i}">${bio}</p><button onclick="copyToClipboard('bio-text-${i}', this)" class="mt-3 text-xs font-semibold text-sky-600 hover:text-sky-500">Copy</button></div>`).join('')}</div>`;
            } catch (error) { handleError(error, 'bio');
            } finally { resetLoading(ui.bioGenerateBtn, 'Generate Bio'); }
        });

        function renderAnalysis(data) {
            // ... (renderAnalysis function remains the same) ...
        }

        window.copyToClipboard = (elementId, button) => {
            const textToCopy = document.getElementById(elementId).innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => { button.textContent = 'Copy'; }, 2000);
            });
        };
        
        // --- Helper Functions ---
        function setLoading(button, text) {
            button.disabled = true;
            button.innerHTML = `<div class="loader"></div><span class="ml-3">${text}</span>`;
            ui.resultsContainer.innerHTML = '';
        }

        function resetLoading(button, text) {
            button.disabled = false;
            button.innerHTML = text;
        }

        function handleError(error, context) {
            console.error(`Error in ${context}:`, error);
            ui.resultsContainer.innerHTML = `<p class="text-center text-red-500">Sorry, an AI error occurred. Please try again later.</p>`;
        }

        async function callGeminiApi(prompt, useJsonSchema) {
            const apiKey = ""; // Canvas will provide the key at runtime
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const payload = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 1024 }};
            if (useJsonSchema) {
                payload.generationConfig.responseMimeType = "application/json";
                payload.generationConfig.responseSchema = { type: "OBJECT", properties: { score: { type: "NUMBER" }, analysis: { type: "STRING" }, suggestions: { type: "ARRAY", items: { type: "STRING" } } }, required: ["score", "analysis", "suggestions"] };
            }
            let response, retries = 3, delay = 1000;
            while (retries > 0) {
                try {
                    response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                    if (response.ok) {
                        const result = await response.json();
                        const candidate = result.candidates?.[0];
                        if (candidate?.content?.parts?.[0]?.text) { return useJsonSchema ? JSON.parse(candidate.content.parts[0].text) : candidate.content.parts[0].text; } 
                        else { throw new Error("Invalid Gemini response"); }
                    } else if (response.status === 429) { await new Promise(res => setTimeout(res, delay)); delay *= 2; retries--;
                    } else { throw new Error(`API error: ${response.status}`); }
                } catch (error) { if (retries === 1) throw error; await new Promise(res => setTimeout(res, delay)); delay *= 2; retries--; }
            }
            throw new Error("Gemini request failed after retries.");
        }
    </script>

</body>
</html>



###  /tools/brand-name-generator  
<!DOCTYPE html>
<html lang="en" class="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>AI Brand Name Generator - Free & Instant Ideas | usernamesearch.io</title>
    <meta name="description" content="Stuck on a name? Use our free AI Brand Name Generator to instantly create unique, memorable, and available brand names based on your ideas. Powered by Gemini.">
    <meta name="keywords" content="brand name generator, company name generator, business name generator, AI name generator, free branding tools">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .loader {
            border: 3px solid #f3f3f3; /* Light grey */
            border-top: 3px solid #38bdf8; /* Sky Blue */
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body class="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 antialiased">

    <div class="container mx-auto px-4 py-12 md:py-20 max-w-2xl">
        
        <div class="text-center">
             <div class="inline-flex items-center space-x-3">
                <svg class="w-12 h-12 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a14.994 14.994 0 01-4.5 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">AI Brand Name Generator</h1>
                     <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">A free tool by usernamesearch.io</p>
                </div>
            </div>
            <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">Turn your ideas into a memorable brand name. Describe your business, and let our AI do the creative work.</p>
        </div>

        <!-- Generator Input Section -->
        <div class="mt-10 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-lg border dark:border-slate-700">
            <div>
                <label for="keywords-input" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">1. Enter keywords that describe your brand</label>
                <input type="text" id="keywords-input" placeholder="e.g., sustainable, minimalist, coffee" class="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
            </div>
            <div class="mt-4">
                <label for="style-select" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">2. Choose a style (optional)</label>
                <select id="style-select" class="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option value="modern">Modern & Techy</option>
                    <option value="elegant">Elegant & Classic</option>
                    <option value="playful">Playful & Fun</option>
                    <option value="natural">Natural & Organic</option>
                    <option value="one-word">One Word</option>
                </select>
            </div>
            <button id="generate-btn" class="mt-6 w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50">
                Generate Names
            </button>
        </div>

        <!-- Results Section -->
        <div id="results-container" class="mt-10">
            <!-- AI-generated results will appear here -->
        </div>

    </div>

    <script>
        const ui = {
            keywordsInput: document.getElementById('keywords-input'),
            styleSelect: document.getElementById('style-select'),
            generateBtn: document.getElementById('generate-btn'),
            resultsContainer: document.getElementById('results-container')
        };

        ui.generateBtn.addEventListener('click', async () => {
            const keywords = ui.keywordsInput.value.trim();
            const style = ui.styleSelect.value;

            if (!keywords) {
                ui.resultsContainer.innerHTML = `<p class="text-center text-red-500">Please enter some keywords to get started.</p>`;
                return;
            }

            ui.generateBtn.disabled = true;
            ui.generateBtn.innerHTML = `<div class="loader"></div><span class="ml-3">Generating brand names...</span>`;
            ui.resultsContainer.innerHTML = '';

            const userPrompt = `You are a creative branding expert. Generate 15 creative, modern, and brandable business names based on these keywords: "${keywords}". The desired style is "${style}". The names should be short (one or two words), easy to remember, and sound professional. Avoid generic or cliché names. Do not include numbers or special characters. Return the results as a simple comma-separated list. For example: AuraBloom,TerraVibe,ZenithCore`;

            try {
                const resultText = await callGeminiApi(userPrompt);
                const brandNames = resultText.split(',').map(name => name.trim()).filter(Boolean);
                
                let resultsHTML = `
                    <h2 class="text-2xl font-bold text-center text-slate-900 dark:text-white mb-6">Here are some ideas for you:</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${brandNames.map(name => `
                            <div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border dark:border-slate-700 flex flex-col justify-between">
                                <span class="font-bold text-lg text-slate-800 dark:text-slate-200">${name}</span>
                                <a href="/?q=${encodeURIComponent(name.toLowerCase().replace(/\s+/g, ''))}" target="_blank" class="mt-3 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 px-3 py-2 rounded-md text-center transition">
                                    Check Availability &rarr;
                                </a>
                            </div>
                        `).join('')}
                    </div>
                `;
                ui.resultsContainer.innerHTML = resultsHTML;

            } catch (error) {
                console.error('Error calling Gemini API:', error);
                ui.resultsContainer.innerHTML = `<p class="text-center text-red-500">Sorry, the AI service is having trouble right now. Please try again later.</p>`;
            } finally {
                ui.generateBtn.disabled = false;
                ui.generateBtn.innerHTML = 'Generate Names';
            }
        });

        async function callGeminiApi(prompt) {
            const apiKey = ""; // Canvas will provide the key at runtime
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const payload = {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.9,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            };
            
            let response;
            let retries = 3;
            let delay = 1000;

            while (retries > 0) {
                try {
                    response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (response.ok) {
                        const result = await response.json();
                        const candidate = result.candidates?.[0];
                        if (candidate && candidate.content?.parts?.[0]?.text) {
                            return candidate.content.parts[0].text;
                        } else {
                           throw new Error("Invalid response structure from Gemini API");
                        }
                    } else if (response.status === 429) { // Too Many Requests
                        console.warn(`Gemini API rate limited. Retrying in ${delay / 1000}s...`);
                        await new Promise(res => setTimeout(res, delay));
                        delay *= 2; // Increase delay
                        retries--;
                    } else {
                        throw new Error(`API request failed with status ${response.status}`);
                    }
                } catch (error) {
                     if (retries === 1) throw error; // Rethrow last error
                     console.warn(`An error occurred. Retrying in ${delay / 1000}s...`, error);
                     await new Promise(res => setTimeout(res, delay));
                     delay *= 2;
                     retries--;
                }
            }
            throw new Error("Failed to get a response from Gemini API after multiple retries.");
        }

        // Dark mode logic
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>

</body>
</html>


### /api 

<!DOCTYPE html>
<html lang="en" class="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Username Availability API - Flexible Credits | usernamesearch.io</title>
    <meta name="description" content="Integrate the most comprehensive username checker. Use our flexible credit system to check 400+ platforms. Get 1,000 free credits to start.">
    <meta name="keywords" content="username search api, username availability api, social media checker api, handle checker api, rest api, credits api">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
    <style>
        body { font-family: 'Inter', sans-serif; }
        pre[class*="language-"] {
            font-family: 'Fira Code', 'Dank Mono', 'Menlo', monospace;
            font-size: 14px;
            border-radius: 0.5rem;
            max-height: 400px;
        }
        .loader {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #38bdf8;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .tab-btn.active {
            background-color: #0ea5e9;
            color: white;
        }
    </style>
</head>
<body class="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 antialiased">

    <div class="container mx-auto px-4 py-12 md:py-20">
        
        <!-- Hero Section -->
        <div class="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div class="text-center md:text-left">
                <span class="text-sm font-bold uppercase text-sky-500 tracking-wider">Our API</span>
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mt-4">
                    The Most Flexible Username API
                </h1>
                <p class="mt-6 text-lg text-slate-600 dark:text-slate-400">
                    Programmatically check 400+ platforms with our simple credit system. Get started instantly with <strong>1,000 free credits</strong> on us.
                </p>
                <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a href="/auth/signup?plan=api" class="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition text-center">
                        Get 1,000 Free Credits
                    </a>
                    <a href="/api/docs" class="bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold py-3 px-6 rounded-lg transition text-center">
                        View Docs
                    </a>
                </div>
            </div>
            <div class="bg-gray-900 rounded-xl shadow-2xl p-4">
<pre><code class="language-js">// Simple, flexible, powerful.
async function checkSite(username, site) {
  const apiKey = 'YOUR_API_KEY';
  const url = `https://api.usernamesearch.io/v1/${username}/${site}`;
  
  const response = await fetch(url, {
    headers: { 'X-API-KEY': apiKey }
  });
  
  const data = await response.json();
  
  // { site: 'github', status: 'taken' }
  return data;
}</code></pre>
            </div>
        </div>

        <!-- NEW: AI Code Generator Section -->
        <div class="mt-20 md:mt-32 max-w-4xl mx-auto">
            <div class="text-center">
                 <h2 class="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center">
                    <span class="mr-3 text-3xl">✨</span> Try it Live: AI Code Generator
                </h2>
                <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">Describe what you want to do in plain English. Our AI will write the code for you.</p>
            </div>
            <div class="mt-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border dark:border-slate-700">
                <div>
                    <label for="ai-prompt-input" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Request:</label>
                    <textarea id="ai-prompt-input" rows="2" class="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="e.g., check the username 'pixelpioneer' on twitter and dribbble"></textarea>
                </div>
                <div class="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
                        <button class="code-lang-tab tab-btn active px-3 py-1 text-sm font-semibold rounded-md" data-lang="javascript">JavaScript</button>
                        <button class="code-lang-tab tab-btn px-3 py-1 text-sm font-semibold text-slate-600 dark:text-slate-400 rounded-md" data-lang="python">Python</button>
                        <button class="code-lang-tab tab-btn px-3 py-1 text-sm font-semibold text-slate-600 dark:text-slate-400 rounded-md" data-lang="curl">cURL</button>
                    </div>
                    <button id="ai-generate-btn" class="w-full sm:w-auto flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50">
                        Generate Code
                    </button>
                </div>
                <div id="ai-code-output-container" class="mt-6">
                    <div class="bg-gray-900 rounded-xl shadow-lg p-4">
                        <pre><code id="ai-code-output" class="language-javascript">// Your generated code will appear here...</code></pre>
                    </div>
                </div>
            </div>
        </div>

        <!-- How It Works / Credit System Section -->
        <div class="mt-20 md:mt-32 max-w-5xl mx-auto">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Pay-As-You-Go with Credits</h2>
                <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">Our simple credit system puts you in control. No monthly fees, no hidden costs.</p>
            </div>
            <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center">
                    <div class="text-4xl font-extrabold text-sky-500">5</div>
                    <h3 class="mt-2 font-bold text-lg text-slate-900 dark:text-white">Credits</h3>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">per **single site** real-time check. Get the most up-to-date status for any specific platform.</p>
                </div>
                <div class="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center">
                    <div class="text-4xl font-extrabold text-sky-500">1</div>
                    <h3 class="mt-2 font-bold text-lg text-slate-900 dark:text-white">Credit</h3>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">per **cached** result. Access our vast database of recently checked usernames at a fraction of the cost.</p>
                </div>
                <div class="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center">
                     <div class="text-4xl font-extrabold text-sky-500">1000+</div>
                    <h3 class="mt-2 font-bold text-lg text-slate-900 dark:text-white">Credits</h3>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">for a **full check** of all 400+ sites. The ultimate scan for complete brand protection.</p>
                </div>
            </div>
        </div>


        <!-- Use Cases Section -->
        <div class="mt-20 md:mt-32 max-w-5xl mx-auto">
             <div class="text-center">
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white">What Will You Build?</h2>
                <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">Power your next big idea with our versatile API.</p>
            </div>
            <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div class="bg-white dark:bg-slate-800 p-8 rounded-lg">
                    <h3 class="font-bold text-lg text-slate-900 dark:text-white">New User Onboarding</h3>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Prevent "username taken" errors during signup by checking availability in real-time.</p>
                </div>
                <div class="bg-white dark:bg-slate-800 p-8 rounded-lg">
                    <h3 class="font-bold text-lg text-slate-900 dark:text-white">Brand Monitoring Tools</h3>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Track your brand's presence and identify potential impersonation across the web.</p>
                </div>
                <div class="bg-white dark:bg-slate-800 p-8 rounded-lg">
                    <h3 class="font-bold text-lg text-slate-900 dark:text-white">Domain & Handle Finders</h3>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Build your own availability checker or creative name generator for your specific niche.</p>
                </div>
            </div>
        </div>


        <!-- Final CTA Section -->
        <div class="mt-20 md:mt-32 text-center max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Ready to Integrate?</h2>
            <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">Sign up in seconds and get your first 1,000 credits, completely free. No credit card required.</p>
            <a href="/auth/signup?plan=api" class="mt-8 inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 px-8 rounded-lg transition">
                Start Building for Free
            </a>
        </div>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script>
        // --- AI Code Generator Logic ---
        const ui = {
            promptInput: document.getElementById('ai-prompt-input'),
            generateBtn: document.getElementById('ai-generate-btn'),
            codeOutput: document.getElementById('ai-code-output'),
            langTabs: document.querySelectorAll('.code-lang-tab')
        };

        let currentLang = 'javascript';

        ui.langTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                ui.langTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentLang = tab.dataset.lang;
                ui.codeOutput.className = `language-${currentLang}`;
                Prism.highlightElement(ui.codeOutput);
            });
        });
        
        ui.generateBtn.addEventListener('click', async () => {
            const userRequest = ui.promptInput.value.trim();
            if (!userRequest) {
                ui.codeOutput.textContent = "// Please enter a request above.";
                Prism.highlightElement(ui.codeOutput);
                return;
            }

            ui.generateBtn.disabled = true;
            ui.generateBtn.innerHTML = `<div class="loader !w-5 !h-5 !border-2"></div><span class="ml-2">Generating...</span>`;
            ui.codeOutput.textContent = `// Generating code for "${userRequest}" in ${currentLang}...`;
            Prism.highlightElement(ui.codeOutput);

            const systemPrompt = `You are an expert developer assistant for the usernamesearch.io API. Your task is to generate clean, correct, and easy-to-understand code snippets based on user requests.
            - The API endpoint for a single site check is \`https://api.usernamesearch.io/v1/{username}/{site}\`.
            - The endpoint for a full check is \`https://api.usernamesearch.io/v1/{username}\`.
            - Authentication is done via an \`X-API-KEY\` header.
            - You must only generate the raw code, without any extra explanations, notes, or markdown formatting like \`\`\`js.`;

            const fullPrompt = `Generate a code snippet in ${currentLang} to ${userRequest}.`;

            try {
                const generatedCode = await callGeminiApi(fullPrompt, systemPrompt);
                ui.codeOutput.textContent = generatedCode;
                Prism.highlightElement(ui.codeOutput);
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                ui.codeOutput.textContent = `// Sorry, there was an error generating the code.\n// Please try again.`;
                Prism.highlightElement(ui.codeOutput);
            } finally {
                ui.generateBtn.disabled = false;
                ui.generateBtn.textContent = 'Generate Code';
            }
        });

        async function callGeminiApi(prompt, systemInstruction) {
            const apiKey = ""; // Canvas will provide the key at runtime
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const payload = {
                contents: [{ parts: [{ text: prompt }] }],
                systemInstruction: { parts: [{ text: systemInstruction }] },
                generationConfig: {
                    temperature: 0.2,
                    maxOutputTokens: 1024,
                }
            };
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            const candidate = result.candidates?.[0];
            if (candidate && candidate.content?.parts?.[0]?.text) {
                return candidate.content.parts[0].text;
            } else {
                throw new Error("Invalid response structure from Gemini API");
            }
        }

        // Dark mode logic
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>

</body>
</html>



### /api/docs 
<!DOCTYPE html>
<html lang="en" class="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>API Documentation | usernamesearch.io</title>
    <meta name="description" content="Official developer documentation for the usernamesearch.io API. Learn how to integrate the world's most comprehensive username availability checker.">
    <meta name="robots" content="index, follow">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
    <style>
        body { font-family: 'Inter', sans-serif; }
        pre[class*="language-"], code[class*="language-"] {
            font-family: 'Fira Code', 'Dank Mono', 'Menlo', monospace;
            font-size: 14px;
        }
        .prose a { color: #0ea5e9; text-decoration: none; }
        .prose a:hover { text-decoration: underline; }
        .dark .prose a { color: #38bdf8; }
        .prose code { background-color: #f1f5f9; color: #475569; padding: 0.2em 0.4em; margin: 0; border-radius: 0.25rem; font-size: 0.9em; }
        .dark .prose code { background-color: #334155; color: #cbd5e1; }
        .prose pre { border-radius: 0.5rem; }
    </style>
</head>
<body class="bg-slate-50 dark:bg-slate-900">

    <div class="flex">
        <!-- Sidebar Navigation -->
        <aside class="sticky top-0 h-screen w-64 flex-shrink-0 overflow-y-auto border-r border-slate-200 dark:border-slate-800 hidden md:block">
            <div class="p-6">
                <a href="/" class="flex items-center space-x-2">
                    <svg class="w-8 h-8 text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5">
                        <path d="M25 25 L20 20"/><circle cx="13" cy="13" r="8"/><circle cx="13" cy="11" r="3" stroke-width="2"/><path d="M9, 18 C9, 15.5, 17, 15.5, 17, 18" stroke-width="2"/>
                    </svg>
                    <span class="font-bold text-lg text-slate-800 dark:text-white">API Docs</span>
                </a>
            </div>
            <nav class="px-6 py-4 space-y-4 text-sm">
                <h3 class="font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Getting Started</h3>
                <ul class="space-y-2">
                    <li><a href="#introduction" class="block font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500">Introduction</a></li>
                    <li><a href="#authentication" class="block font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500">Authentication</a></li>
                    <li><a href="#credit-system" class="block font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500">Credit System</a></li>
                </ul>
                <h3 class="font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mt-6">Endpoints</h3>
                <ul class="space-y-2">
                    <li><a href="#check-single" class="block font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500">Check a Single Site</a></li>
                    <li><a href="#check-full" class="block font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500">Perform a Full Check</a></li>
                </ul>
                 <h3 class="font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mt-6">Guides</h3>
                <ul class="space-y-2">
                    <li><a href="#error-handling" class="block font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500">Error Handling</a></li>
                    <li><a href="#rate-limiting" class="block font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500">Rate Limiting</a></li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-grow p-6 md:p-10 prose prose-slate dark:prose-invert max-w-none">
            
            <section id="introduction">
                <h1>Introduction</h1>
                <p>Welcome to the usernamesearch.io API documentation. Our REST API allows you to programmatically check username availability across our entire network of over 400 social, gaming, and developer platforms. It's designed to be simple, fast, and flexible to power your applications.</p>
            </section>

            <section id="authentication" class="mt-12">
                <h2>Authentication</h2>
                <p>All API requests must be authenticated using an API key. You can create and manage your API keys from your dashboard. Authenticate your requests by providing your key in the <code>X-API-KEY</code> header.</p>
                <p>Sign up to get <strong>1,000 free credits</strong> and your API key instantly.</p>
                <pre><code class="language-http">GET /v1/some_endpoint HTTP/1.1
Host: api.usernamesearch.io
X-API-KEY: YOUR_API_KEY</code></pre>
            </section>
            
            <section id="credit-system" class="mt-12">
                <h2>The Credit System</h2>
                <p>We use a flexible credit system instead of traditional request-based billing. This gives you more control over your usage and costs. Your account balance is debited based on the type of request you make.</p>
                <ul>
                    <li><strong>1 Credit:</strong> Check a username against our cache. This is the fastest and most cost-effective way to get data that has been recently checked by our system.</li>
                    <li><strong>5 Credits:</strong> Perform a real-time check on a single, specified platform. This guarantees you get the absolute latest availability status.</li>
                    <li><strong>1000+ Credits:</strong> Perform a full, real-time check across all 400+ supported platforms. The exact cost may vary based on network conditions and is confirmed before the request is processed.</li>
                </ul>
            </section>
            
            <hr class="my-16 border-slate-200 dark:border-slate-800">

            <!-- Endpoints Section -->
            <div>
                <h1 class="text-3xl font-bold">API Endpoints</h1>

                <div id="check-single" class="grid md:grid-cols-2 gap-8 items-start mt-12">
                    <div class="prose prose-slate dark:prose-invert">
                        <h2>Check a Single Site</h2>
                        <p>Retrieves the availability of a specific username on a single platform. This is the most common and efficient way to check a handle.</p>
                        <p>You can force a real-time check (5 credits) or allow a cached check (1 credit) using the <code>cache</code> parameter.</p>
                        
                        <h4>Path Parameters</h4>
                        <ul>
                            <li><strong>username</strong> (string, required): The username to check.</li>
                            <li><strong>site</strong> (string, required): The platform to check (e.g., <code>tiktok</code>, <code>github</code>).</li>
                        </ul>
                        
                        <h4>Query Parameters</h4>
                        <ul>
                            <li><strong>cache</strong> (boolean, optional): If <code>false</code>, forces a real-time check. Defaults to <code>true</code> (allows cached results).</li>
                        </ul>
                    </div>
                    <div>
                        <div class="bg-gray-900 rounded-xl shadow-2xl">
                            <div class="p-2 border-b border-gray-700 text-xs text-gray-400">
                                <span class="font-bold">GET</span> /v1/&#123;username&#125;/&#123;site&#125;
                            </div>
                            <div class="p-4">
                                <h4 class="text-white font-semibold mb-2">Request</h4>
<pre><code class="language-bash">curl --request GET \
  --url 'https://api.usernamesearch.io/v1/pixelpioneer/github' \
  --header 'X-API-KEY: YOUR_API_KEY'</code></pre>
                                <h4 class="text-white font-semibold mt-4 mb-2">Response</h4>
<pre><code class="language-json">{
  "site": "github",
  "username": "pixelpioneer",
  "status": "taken",
  "checked_at": "2025-09-02T12:30:00Z",
  "is_cached": false,
  "credits_used": 5
}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="check-full" class="grid md:grid-cols-2 gap-8 items-start mt-16">
                    <div class="prose prose-slate dark:prose-invert">
                        <h2>Perform a Full Check</h2>
                        <p>Retrieves the availability of a username across all 400+ supported platforms. This is a powerful but credit-intensive operation.</p>
                        <p>By default, this endpoint uses cached data where available to reduce cost. You can force a full real-time scan.</p>
                         <h4>Path Parameters</h4>
                        <ul>
                            <li><strong>username</strong> (string, required): The username to check.</li>
                        </ul>
                    </div>
                    <div>
                        <div class="bg-gray-900 rounded-xl shadow-2xl">
                            <div class="p-2 border-b border-gray-700 text-xs text-gray-400">
                                <span class="font-bold">GET</span> /v1/&#123;username&#125;
                            </div>
                            <div class="p-4">
                                <h4 class="text-white font-semibold mb-2">Request</h4>
<pre><code class="language-bash">curl --request GET \
  --url 'https://api.usernamesearch.io/v1/pixelpioneer' \
  --header 'X-API-KEY: YOUR_API_KEY'</code></pre>
                                <h4 class="text-white font-semibold mt-4 mb-2">Response</h4>
<pre><code class="language-json">{
  "username": "pixelpioneer",
  "credits_used": 1250,
  "results": [
    {
      "site": "instagram",
      "status": "taken"
    },
    {
      "site": "github",
      "status": "taken"
    },
    {
      "site": "dribbble",
      "status": "available"
    },
    // ... 400+ more results
  ]
}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
             <section id="error-handling" class="mt-12">
                <h2>Error Handling</h2>
                <p>Our API uses conventional HTTP response codes to indicate the success or failure of an API request.</p>
                <ul>
                    <li><code>200 OK</code> - Everything worked as expected.</li>
                    <li><code>401 Unauthorized</code> - Your API key is wrong.</li>
                    <li><code>402 Payment Required</code> - Your credit balance is too low to perform the requested action.</li>
                    <li><code>404 Not Found</code> - The requested resource could not be found.</li>
                    <li><code>429 Too Many Requests</code> - You have hit the rate limit. Please slow down your requests.</li>
                    <li><code>5xx Server Errors</code> - Something went wrong on our end.</li>
                </ul>
            </section>
             <section id="rate-limiting" class="mt-12">
                <h2>Rate Limiting</h2>
                <p>Our API has a rate limit of 60 requests per minute per API key. If you exceed this limit, you will receive a <code>429 Too Many Requests</code> HTTP status code. We recommend implementing a request queue with exponential backoff to handle rate-limited requests gracefully.</p>
            </section>
        </main>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script>
        // Smooth scroll for sidebar links
        document.querySelectorAll('aside a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>

</body>
</html>



## SEO agent

As the SEO Specialist for UsernameSearch.io, optimize:

Task: [SEO optimization task]
Target: [Pages/Content type]
Keywords: [Primary and secondary keywords]

SEO Requirements:
1. Technical SEO
   - Meta tags optimization
   - Schema.org markup
   - XML sitemap generation
   - Robots.txt configuration
   - Canonical URLs
   - Hreflang tags (if multi-language)

2. Content Optimization
   - Keyword research and mapping
   - Title tag optimization (50-60 chars)
   - Meta descriptions (150-160 chars)
   - Header hierarchy (H1-H6)
   - Internal linking strategy
   - Image alt texts

3. Performance Optimization
   - Core Web Vitals optimization
   - Page speed improvements
   - Mobile optimization
   - Structured data testing

4. Content Strategy
   - Platform comparison pages
   - Username availability guides
   - Social media best practices
   - API documentation for SEO

Deliverables:
- SEO-optimized page components
- Meta tag configurations
- Schema markup implementation
- Content templates
- Sitemap generation logic
- SEO monitoring dashboard
- Monthly SEO reports

各个页面都需要meta data， 确保各个页面没有 死链。

SEO Meta
Page (URL)
Primary Keywords
SEO Title (Under 60 characters)
Meta Description (Under 160 characters)
Homepage (/)
username search, username checker, handle checker
Instant Username Search Across 400+ Sites | usernamesearch.io
The most comprehensive username checker. Instantly see if your name is available on Instagram, TikTok, Twitter, GitHub, and hundreds more. Free to start!
Pricing (/pricing)
usernamesearch.io pricing, username checker pro
Pricing Plans - Simple & Transparent | usernamesearch.io
Compare our Free and Pro plans. Get started for free or upgrade to Pro for 400+ sites, 100 daily real-time searches, and an ad-free experience.
Guides Index (/guides)
branding guides, social media guides, username selection
Guides for Creators & Brands - Digital Identity | usernamesearch.io
In-depth guides on choosing the perfect brand name, building a consistent social media presence, and securing your online identity from scratch.
Tools Index (/tools)
free branding tools, username generator, social media tools
Free Tools for Brand Building | usernamesearch.io
A suite of free tools designed for creators, including our AI Username Generator, Brand Name Suggester, and more. Your one-stop shop for brand creation.
Username Checker Hub (/username-checker)
username availability checker
All 400+ Supported Sites for Username Checks | usernamesearch.io
The complete, searchable list of all social media, gaming, and developer sites checked by our tool. See which platforms are available in our Free vs. Pro plans.
pSEO Template (/username-checker/[site])
[Site Name] username checker, check [Site Name] username
[Site Name] Username Checker - Check Availability Instantly
Instantly check if your desired username is available on [Site Name]. Our free tool provides real-time results to help you secure your perfect handle.


【1】 XX username search / username finder / user ID search  
 相关 热词， social media username search （
 pof username search
onlyfans username search （dating站 username ）
 instagram username search -XX username availability checker


 // SEO Configuration for Next.js
interface SEOConfig {
  title: string
  description: string
  canonical: string
  openGraph: {
    title: string
    description: string
    images: Array<{url: string, width: number, height: number}>
    siteName: string
  }
  twitter: {
    handle: string
    cardType: string
  }
  schema: {
    '@context': string
    '@type': string
    [key: string]: any
  }
}

// Page types to optimize:
1. Homepage - "username search", "check username availability"
2. Platform Pages - "[platform] username checker"
3. Search Results - Dynamic SEO based on search
4. Blog Posts - Educational content
5. API Docs - Developer-focused SEO
6. Comparison Pages - "vs" keywords


#### 其他内容，

/terms  
Terms of Service
Last Updated: September 2, 2025

1. Agreement to Terms
By using our website, APIs, or any other services provided by usernamesearch.io (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service. These Terms affect your legal rights and obligations.

2. User Accounts
When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.

3. Services and Subscriptions
Our Service is offered under different plans, including a free tier and paid subscription tiers (e.g., "Pro," "API").

Free Service: The free service is provided for personal, non-commercial use and is subject to usage limits (e.g., a limited number of real-time searches per day), which we may change at our sole discretion.
Paid Subscriptions: Paid plans provide access to enhanced features, such as an increased number of searches, access to more platforms, and API access. Fees for subscriptions are billed on a recurring basis (e.g., monthly or annually). You agree to pay all applicable fees for the plan you select.
4. Service Limitations and Availability
Our Service functions by checking for username availability on numerous third-party websites ("Platforms"). You acknowledge and agree that these Platforms are not under the control of usernamesearch.io.

Platforms may change their website structure, update their security measures, block our IP addresses, or otherwise alter their systems at any time and without notice. Consequently, a check for any given Platform may fail, be delayed, or return an inaccurate result.

Therefore, we do not guarantee that every check on every platform will be successful or that the results will be 100% accurate at all times. This applies to all tiers of our Service, including both the free website tool and our paid API. While we will use commercially reasonable efforts to maintain and update our checking mechanisms, we shall not be liable for any failures or inaccuracies caused by factors outside of our direct control. Paid subscriptions are for access to our platform and its features, not for a guarantee of successful checks on any specific third-party site.

5. Communications from Us
By creating an account on our Service, you agree to subscribe to newsletters, marketing or promotional materials, and other information we may send. This is a condition of creating an account. However, you may opt out of receiving any, or all, of these promotional communications from us by following the unsubscribe link or instructions provided in any email we send or by adjusting your account settings. For more information, please see our Privacy Policy.

6. Prohibited Activities
You agree not to use the Service for any purpose that is illegal or prohibited by these Terms. You agree not to:

Use the Service in any way that could damage, disable, overburden, or impair our servers or networks.
Attempt to gain unauthorized access to any part of the Service, other accounts, or computer systems.
Use any automated system, including "robots," "spiders," or "offline readers," to access the Service in a manner that sends more request messages to our servers than a human can reasonably produce in the same period, except as expressly permitted by our API terms.
Resell or systematically scrape data from the Service without our express written permission.
7. Termination
We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.

8. Disclaimer of Warranties
The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Your use of the Service is at your sole risk. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance. usernamesearch.io does not warrant the accuracy or reliability of any search result obtained through the Service.

9. Limitation of Liability
In no event shall usernamesearch.io, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.

10. Governing Law
These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is based, without regard to its conflict of law provisions.

11. Contact Us
If you have any questions about these Terms, please contact us at:

info@usernamesearch.io

/privacy

Privacy Policy
Last Updated: September 2, 2025

Welcome to usernamesearch.io. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (collectively, the "Service"). Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.

1. Information We Collect
We may collect information about you in a variety of ways. The information we may collect on the Service includes:

Personal Data You Provide to Us
We collect personally identifiable information, such as your name and email address, that you voluntarily give to us when you register for an account, subscribe to our services, or contact us. If you purchase a Pro or API plan, we will also collect payment information (e.g., credit card details), which is processed securely by our third-party payment processor.

Derivative Data
Our servers automatically collect information when you access the Service, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site. This also includes your usage data, like the usernames you search for and your interactions with the tool.

2. How We Use Your Information
Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:

Create and manage your account.
Process your payments and subscriptions.
Provide customer support and respond to your inquiries.
Monitor and analyze usage and trends to improve your experience with the Service.
Notify you of updates to the Service.
Email you with promotional materials, newsletters, and other information about our products and special offers, which we believe may be of interest to you.
3. Disclosure of Your Information
We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. However, we may share information we have collected about you in certain situations. Your information may be disclosed as follows:

By Law or to Protect Rights
If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.

Third-Party Service Providers
We may share your information with third parties that perform services for us or on our behalf, including payment processing (e.g., Stripe), data analysis, email delivery, hosting services, and customer service.

4. Your Rights and Choices
Account Information
You may at any time review or change the information in your account or terminate your account by logging into your account settings and updating your account.

Email and Communications
If you no longer wish to receive correspondence, emails, or other promotional communications from us, you may opt-out by:

Noting your preferences at the time you register your account.
Logging into your account settings and updating your preferences.
Following the unsubscribe link provided in every promotional email.
5. Data Security
We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.

6. Changes to This Privacy Policy
We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.

7. Contact Us
If you have questions or comments about this Privacy Policy, please contact us at:

info@usernamesearch.io

/contact
Contact Us
We'd love to hear from you. Whether you have a question, feedback, or need support, our team is ready to help.

General Inquiries & Support
For the fastest response, please email us directly:

info@usernamesearch.io
