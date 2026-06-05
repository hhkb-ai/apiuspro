// ==================== API应用教程配置 ====================
export interface AppTutorial {
  id: string;
  name: string;
  desc: string;
  url: string;
  icon: string;
  badge: { text: string; type: string };
  sections: {
    title: string;
    content: string;
    steps?: {
      title: string;
      description: string;
      code?: string;
      image?: string;
      items?: string[];
      warning?: string;
    }[];
    tips?: string[];
    warnings?: string[];
  }[];
}

export const appTutorials: AppTutorial[] = [
  {
    id: 'ccswitch',
    name: 'CC Switch',
    desc: '跨平台 AI 终端配置管理工具，统一管理 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 的 API 供应商、模型、MCP 和 Skills。',
    url: 'https://github.com/farion1231/cc-switch',
    icon: '🔀',
    badge: { text: '推荐', type: 'success' },
    sections: [
      {
        title: 'CC Switch 是什么',
        content: 'CC Switch 是一个开源的跨平台桌面端 AI 编程工具配置中心。它可以接管 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 等工具的本地配置文件，用图形界面统一管理 API Key、Base URL、模型名称、代理、MCP 和 Skills，减少手动改 JSON、TOML、env 文件导致的配置错误。',
        steps: [
          {
            title: '适合谁使用',
            description: '如果你经常在多个 API 供应商或多个 AI 编程工具之间切换，CC Switch 能明显减少重复配置成本。',
            items: [
              '经常使用 Claude Code、Codex、Gemini CLI、OpenCode 或 OpenClaw',
              '同时购买了 DeepSeek、Kimi、智谱、通义千问、MiMo、OpenAI 等多个 API',
              '需要在便宜模型、强模型和备用节点之间快速切换',
              '不想手动编辑 settings.json、AGENTS.md、CLAUDE.md 或环境变量文件'
            ]
          },
          {
            title: '核心能力',
            description: '它不是单纯改 API 地址的小工具，而是把供应商配置、模型切换、MCP、Prompt 和 Skills 集中到一个面板里。',
            items: [
              '多供应商一键切换：内置常见模型厂商和中转服务商预设',
              '配置可视化：在界面里填写 API Key、Endpoint、Model Name，降低格式错误概率',
              '系统托盘热切换：运行任务时可快速切换下一个模型或供应商',
              'MCP 与 Skills 管理：把多个 AI 终端工具的扩展能力集中维护',
              '本地存储：配置数据保存在本机，适合重视密钥安全的用户'
            ]
          }
        ],
        tips: [
          '项目地址：https://github.com/farion1231/cc-switch',
          '配置前先准备好对应平台的 API Key、Base URL 和模型名称',
          '密钥仍然属于敏感信息，不要把截图或配置文件公开发布'
        ]
      },
      {
        title: '下载与安装',
        content: 'CC Switch 通过 GitHub Releases 发布安装包。Windows 用户优先下载 MSI，macOS 用户下载 DMG，Linux 用户按发行版选择 deb、rpm 或 AppImage。',
        steps: [
          {
            title: '打开发布页面',
            description: '进入 GitHub Releases 页面，展开最新版本的 Assets 区域。',
            items: [
              '访问：https://github.com/farion1231/cc-switch/releases',
              '确认下载的是最新稳定版本',
              '根据自己的系统选择安装包，不要下载源码压缩包当作软件安装包'
            ]
          },
          {
            title: 'Windows 安装',
            description: 'Windows 用户推荐下载 `.msi` 安装包，双击后按向导安装。',
            items: [
              '优先选择 `CC-Switch-版本号-Windows.msi`',
              '如果电脑没有管理员权限，可选择 Portable zip 便携版',
              '便携版建议解压到不含中文和特殊字符的目录，例如 `D:\\Tools\\CC-Switch`'
            ]
          },
          {
            title: 'macOS 安装',
            description: 'macOS 用户下载 `.dmg` 文件，打开后把 CC Switch 拖入 Applications。',
            code: 'brew tap farion1231/ccswitch\nbrew install --cask cc-switch',
            items: [
              '普通用户推荐使用 DMG 图形安装',
              '习惯 Homebrew 的用户可使用命令行安装',
              '安装后从启动台或应用程序目录打开 CC Switch'
            ]
          },
          {
            title: 'Linux 安装',
            description: 'Linux 用户按发行版选择对应包格式。AppImage 需要先赋予执行权限。',
            code: '# Debian / Ubuntu\nsudo apt install ./CC-Switch-*.deb\n\n# Fedora / RHEL\nsudo dnf install ./CC-Switch-*.rpm\n\n# AppImage\nchmod +x CC-Switch-*.AppImage\n./CC-Switch-*.AppImage',
            items: [
              'Ubuntu、Debian、Linux Mint 优先使用 deb',
              'Fedora、RHEL、CentOS、Rocky Linux 优先使用 rpm',
              '不确定发行版时可使用 AppImage'
            ]
          }
        ],
        warnings: [
          '只从官方 GitHub 项目或可信发布页下载安装包',
          '安装前关闭来源不明的同名工具，避免混淆配置文件'
        ]
      },
      {
        title: '添加 API 供应商',
        content: '安装完成后，第一步是为你正在使用的 AI 工具添加供应商。以 Claude Code 为例，选择对应工具标签后添加 DeepSeek、Kimi、智谱、通义、MiMo 或 OpenAI 等供应商。',
        steps: [
          {
            title: '选择要配置的工具',
            description: '打开 CC Switch 后，先选择 Claude Code、Codex、Gemini CLI、OpenCode 或 OpenClaw 对应标签，确保配置写入正确位置。',
            items: [
              '使用 Claude Code 就选择 Claude Code 标签',
              '使用 Codex 就选择 Codex 标签',
              '多个工具都用时，建议逐个工具分别配置和测试'
            ],
            warning: '不要在错误的工具标签下添加供应商，否则实际使用的 AI 工具可能读不到配置。'
          },
          {
            title: '添加供应商预设',
            description: '点击 Add Provider 或右上角加号，从内置预设中选择你购买的 API 平台。',
            items: [
              '优先使用内置预设，它会自动填好协议类型和常见 Endpoint',
              '如果平台不在预设列表里，选择自定义供应商',
              '填写 Provider Name、API Endpoint、API Key、Model Name',
              '保存前检查 Base URL 末尾路径是否和平台文档一致'
            ]
          },
          {
            title: '示例：接入 OpenAI 兼容 API',
            description: '多数国产和中转平台都提供 OpenAI 兼容格式，通常只需要填 API Key、Base URL 和模型名。',
            code: 'Provider Name: DeepSeek\nAPI Endpoint: https://api.deepseek.com\nAPI Key: sk-xxxxxxxxxxxxxxxx\nModel Name: deepseek-v4-flash',
            items: [
              'DeepSeek 可使用 `https://api.deepseek.com`',
              'MiMo 可使用 `https://api.xiaomimimo.com/v1`',
              '通义、Kimi、智谱等平台按各自官方文档填写',
              '保存后用对应 AI 工具发起一次简单对话测试'
            ]
          }
        ],
        tips: [
          '每个平台的 Base URL 和模型名可能会更新，最终以官方控制台或文档为准',
          '建议先配置一个低成本模型用于日常任务，再配置一个强模型用于复杂任务',
          '新增或切换供应商后，必要时重启对应 AI 终端工具以确保配置生效'
        ]
      },
      {
        title: '在 AI 工具里验证',
        content: '供应商保存后，需要在实际工具中验证。验证目标不是只看 CC Switch 里是否保存成功，而是确认 Claude Code、Codex 或其他工具能读取新配置并正常调用模型。',
        steps: [
          {
            title: '验证 Claude Code',
            description: '打开一个新的终端窗口，进入项目目录后启动 Claude Code，发送一个简单问题。',
            code: 'claude',
            items: [
              '建议重新打开终端，避免旧进程缓存旧配置',
              '询问简单问题，例如「请用一句话介绍当前模型」',
              '如果能正常回答，说明供应商配置已经生效',
              '如果报 401、403 或余额不足，优先检查 API Key 和账户状态'
            ]
          },
          {
            title: '验证 Codex 或其他 CLI',
            description: '选择对应工具标签配置后，用该工具自己的启动命令测试。',
            items: [
              'Codex、Gemini CLI、OpenCode、OpenClaw 都需要在各自标签下配置',
              '确认工具读取的是 CC Switch 写入的配置路径',
              '同一平台在不同工具下可能需要不同协议格式，保存前查看预设说明'
            ]
          },
          {
            title: '使用托盘热切换',
            description: '配置多个供应商后，可以通过系统托盘快速切换当前模型。',
            items: [
              '日常轻量任务使用低成本模型',
              '复杂重构、长上下文分析时切换到强模型',
              '备用节点可作为 API 限流或故障时的替代方案',
              '切换后如未立即生效，重启对应 AI 工具或新开会话再试'
            ]
          }
        ],
        warnings: [
          '不同 AI 工具对热切换的响应方式不同，遇到不生效时先新开会话验证',
          '不要把包含 API Key 的 CC Switch 配置库直接上传到公开仓库'
        ]
      },
      {
        title: '常见问题',
        content: '大多数问题集中在 API Key、Base URL、模型名、工具标签选错和旧进程缓存配置这几类。',
        steps: [
          {
            title: '保存后工具仍然没有响应',
            description: '先确认配置写入的是你正在使用的工具标签，再重启终端和 AI 工具。',
            items: [
              '检查是否选错 Claude Code、Codex 或 OpenCode 标签',
              '重新打开终端窗口',
              '确认对应 AI 工具本身已经安装并能启动',
              '查看 CC Switch 是否有配置保存失败或权限提示'
            ]
          },
          {
            title: '提示认证失败',
            description: '认证失败通常来自 API Key 错误、复制了多余空格、账户未充值或平台权限未开通。',
            items: [
              '重新复制 API Key，避免前后空格',
              '确认账号已完成实名、充值或套餐开通',
              '检查 Key 是否被删除、禁用或过期',
              '不要把 OpenAI 平台的 Key 填到其他供应商预设里'
            ]
          },
          {
            title: '提示模型不存在',
            description: '模型名必须和供应商文档完全一致，大小写、连字符和版本号都可能影响调用。',
            items: [
              '在平台模型列表里复制模型 ID',
              '使用 Fetch Models 或类似按钮拉取可用模型',
              '确认当前 API Key 有权限访问该模型',
              '不确定时先换成平台推荐的默认聊天模型测试'
            ]
          }
        ],
        tips: [
          '排查顺序：工具标签 → API Key → Base URL → 模型名 → 账户余额 → 网络代理',
          '配置成功后建议记录一组稳定可用的低成本模型，作为日常默认方案'
        ]
      }
    ]
  },
  {
    "id": "codex",
    "name": "OpenAI Codex",
    "desc": "OpenAI 官方 AI 编程助手安装与使用教程，覆盖 CLI、IDE 扩展、云端任务、AGENTS.md、权限审批、安全规范和真实项目工作流。",
    "url": "https://chatgpt.com/codex",
    "icon": "🤖",
    "badge": {
      "text": "官方",
      "type": "success"
    },
    "sections": [
      {
        "title": "Codex 是什么，适合谁",
        "content": "Codex 是 OpenAI 面向软件开发的 AI 编程助手。它不是单纯聊天工具，而是可以读取项目、解释代码、修改文件、运行命令、做 code review，并把失败日志继续交给模型修复的开发代理。新手最容易混淆的是：Codex 有 CLI、IDE 扩展和云端任务三种入口，适合的场景并不完全一样。",
        "steps": [
          {
            "title": "先分清三种入口",
            "description": "如果你只记一件事：本地 CLI 适合直接在项目目录里干活，IDE 扩展适合边看代码边改，云端 Codex 适合把明确任务委托出去后台跑。",
            "image": "/images/tutorial/codex-site-overview.png",
            "items": [
              "Codex CLI：在终端中启动，适合修 bug、跑测试、生成脚本、批量读写项目文件。",
              "Codex IDE：在 VS Code、Cursor、Windsurf、JetBrains 等编辑器内使用，适合结合当前文件和选区做修改。",
              "Codex Cloud：从 chatgpt.com/codex 进入，适合把任务交给云端环境处理，例如修复 issue、分析仓库、准备 PR 草稿。",
              "三者不是替代关系：日常本地开发优先 CLI/IDE，明确的大任务再交给云端。"
            ]
          },
          {
            "title": "Codex 最适合的任务",
            "description": "Codex 的优势在于“理解项目上下文 + 修改代码 + 自己验证”。不要把它只当成问答模型，用任务目标和验收标准驱动它。",
            "items": [
              "读项目：让它先总结目录结构、技术栈、关键路由和数据来源。",
              "修 bug：给出复现路径、报错日志、期望行为，让它定位并改最小范围。",
              "写功能：明确页面路径、组件范围、数据结构、移动端要求和验证命令。",
              "做 review：让它检查当前 diff 的 bug、回归风险、遗漏测试和安全问题。",
              "写维护材料：让它生成 AGENTS.md、README、部署日志、排错清单。"
            ]
          },
          {
            "title": "哪些任务不建议直接交给它",
            "description": "Codex 很强，但不代表所有任务都应该一次性交给它自动完成。权限、安全、支付、生产数据库相关任务要拆小并人工确认。",
            "items": [
              "不要直接让它执行生产删除、批量覆盖、数据库迁移、密钥轮换这类高风险动作。",
              "不要把需求写成“优化一下全站”，应改成“只改这个页面，验证 360px 移动端不横向溢出”。",
              "不要把 API Key、服务器密码、Cookie 直接写进聊天记录或提交到仓库。",
              "不要让它在脏工作区里随便 commit，先要求列出会包含和会排除的文件。"
            ]
          }
        ],
        "tips": [
          "官方 CLI 文档：https://developers.openai.com/codex/cli",
          "官方 IDE 文档：https://developers.openai.com/codex/ide",
          "官方 AGENTS.md 文档：https://developers.openai.com/codex/guides/agents-md"
        ]
      },
      {
        "title": "安装前准备",
        "content": "安装 Codex 前先把基础环境准备好，可以避免一半以上的新手报错。Windows 用户尤其要确认 Node.js、npm、Git、终端路径和项目目录都可用。",
        "steps": [
          {
            "title": "准备账号与网络",
            "description": "Codex 首次启动需要登录 OpenAI / ChatGPT 账号，或按提示使用 API Key。账号、套餐、组织和项目权限会影响可用模型与额度。",
            "image": "/images/tutorial/codex-site-auth.png",
            "items": [
              "准备一个可正常登录的 ChatGPT / OpenAI 账号。",
              "如果使用 API Key，确认 key 属于正确的 OpenAI Project，并且账号有可用额度。",
              "网络需要能正常访问 OpenAI 相关服务，否则登录、模型调用和云端任务都会失败。",
              "不要把 API Key 写进前端代码、公开仓库、截图或教程评论区。"
            ]
          },
          {
            "title": "检查本机基础命令",
            "description": "打开终端，先确认 Node.js、npm 和 Git 都能输出版本号。没有版本号就先安装对应工具。",
            "code": "node -v\nnpm -v\ngit --version",
            "items": [
              "Node.js：建议安装 LTS 版本，安装后重新打开终端。",
              "npm：随 Node.js 一起安装，用来安装 Codex CLI。",
              "Git：建议安装 Git for Windows，便于 Codex 查看 diff、分支和提交历史。",
              "终端：Windows 可用 PowerShell、Windows Terminal 或 Git Bash。"
            ]
          },
          {
            "title": "准备一个干净项目目录",
            "description": "第一次不要直接拿生产项目练手，建议新建一个测试目录，或在真实项目里先让 Codex 只读分析。",
            "code": "mkdir codex-demo\ncd codex-demo\ngit init",
            "items": [
              "真实项目使用前先执行 `git status --short`，确认有哪些未提交改动。",
              "让 Codex 修改前先要求它列出计划修改的文件。",
              "重要项目先新建分支，避免把实验改动混进主分支。",
              "不要在没有版本控制的目录里让 Codex 大范围改文件。"
            ]
          }
        ],
        "warnings": [
          "如果你的项目里已经有未提交改动，先保存或提交自己的工作，再让 Codex 动手。否则很难区分哪些是你改的，哪些是 AI 改的。"
        ]
      },
      {
        "title": "安装 Codex CLI",
        "content": "Codex CLI 是最直接的本地入口。官方推荐通过 npm 全局安装 `@openai/codex`，安装完成后用 `codex --version` 验证。",
        "steps": [
          {
            "title": "执行官方安装命令",
            "description": "在终端执行 npm 全局安装命令。安装过程需要联网下载依赖，第一次可能需要几十秒到几分钟。",
            "image": "/images/tutorial/codex-site-install-cli.png",
            "code": "npm install -g @openai/codex",
            "items": [
              "只从 npm 官方包名安装，不要安装来源不明的同名包。",
              "Windows 如果提示权限不足，尝试以管理员身份打开终端后重试。",
              "macOS / Linux 如果全局安装权限失败，优先修复 npm 全局目录权限，不要随便使用来路不明的一键脚本。"
            ]
          },
          {
            "title": "验证安装结果",
            "description": "安装完成后检查 Codex 命令是否可用。能输出版本号，说明 CLI 已经进入 PATH。",
            "code": "codex --version",
            "items": [
              "能看到类似 `codex-cli 0.x.x` 的版本号：安装成功。",
              "提示 command not found：终端没有读取到 npm 全局 bin 路径。",
              "提示权限或执行策略错误：检查 Windows PowerShell 执行策略或 npm 全局目录权限。"
            ]
          },
          {
            "title": "command not found 的快速修复",
            "description": "先查 npm 全局安装目录，再确认对应 bin 目录已经加入 PATH。Windows 用户安装后一定要重新打开终端。",
            "code": "npm config get prefix\nnpm bin -g",
            "items": [
              "Windows 常见路径：`C:\\Users\\你的用户名\\AppData\\Roaming\\npm`。",
              "macOS / Linux 常见路径：`/usr/local/bin`、`~/.npm-global/bin` 或 Node 版本管理器目录。",
              "修改 PATH 后重新打开终端，再执行 `codex --version`。",
              "如果公司电脑限制全局安装，先咨询管理员或使用受控开发环境。"
            ]
          }
        ],
        "tips": [
          "官方安装命令以 OpenAI 文档为准：https://developers.openai.com/codex/cli",
          "如果只是临时试用，可以先在测试目录里启动，确认体验后再进入真实项目。"
        ]
      },
      {
        "title": "登录与首次启动",
        "content": "安装完成后不要急着让 Codex 改项目。第一次启动的目标是完成登录、确认当前目录、让它只读分析项目，并验证你能控制权限。",
        "steps": [
          {
            "title": "启动 Codex",
            "description": "进入一个测试目录或项目根目录，执行 `codex`。首次启动会进入登录或授权流程。",
            "image": "/images/tutorial/codex-site-auth.png",
            "code": "cd your-project\ncodex",
            "items": [
              "如果弹出浏览器登录，按页面提示完成 OpenAI / ChatGPT 授权。",
              "如果选择 API Key，确认 key 不会被写进项目文件。",
              "登录成功后，Codex 会以当前目录作为主要工作区。",
              "不要在桌面、下载目录或整个磁盘根目录直接启动 Codex。"
            ]
          },
          {
            "title": "第一条指令只做只读分析",
            "description": "首次使用建议先让 Codex 读项目，不要修改文件。这样可以确认它理解的是正确目录和技术栈。",
            "image": "/images/tutorial/codex-site-first-task.png",
            "code": "请阅读当前项目，先总结目录结构、技术栈、主要页面入口和数据来源。\n不要修改任何文件，也不要运行会改变文件的命令。",
            "items": [
              "回答里应该能看到框架、路由目录、主要配置文件和启动脚本。",
              "如果它识别错项目，先退出，进入正确目录再启动。",
              "如果它准备修改文件，立刻打断并要求先给计划。"
            ]
          },
          {
            "title": "确认权限审批逻辑",
            "description": "Codex 在执行命令、写文件、联网或高风险操作时通常会按当前模式请求确认。新手建议保留审批，不要一开始就全自动。",
            "items": [
              "允许：读文件、搜索代码、运行无副作用的检查命令。",
              "谨慎允许：安装依赖、写文件、启动服务、联网下载。",
              "拒绝或拆小：删除目录、覆盖大量文件、重置 Git、修改生产配置。",
              "每次同意前看清命令和工作目录，尤其是 `rm`、`del`、`git reset`、`git checkout`。"
            ],
            "warning": "如果你看不懂某条命令，不要直接同意。让 Codex 先解释命令目的、影响范围和回退方式。"
          }
        ],
        "tips": [
          "安全的第一条提示词：先读项目，只总结，不修改。",
          "Codex 能力越强，越要把任务边界、验收方式和禁止事项写清楚。"
        ]
      },
      {
        "title": "在真实项目里使用 Codex",
        "content": "真实项目里最稳的做法是：先让 Codex 只读定位，再确认计划，然后小范围修改，最后运行验证命令并查看 diff。不要一次性把“设计、重构、测试、部署”全部塞进一个模糊请求。",
        "steps": [
          {
            "title": "让它先定位问题，不要立刻改",
            "description": "当页面错位、接口报错或构建失败时，先让 Codex 收集上下文和复现原因。",
            "code": "请只读排查这个问题：移动端 390px 下搜索框和推荐栏没有对齐。\n先指出可能相关的文件、CSS 规则和复现路径，不要修改文件。",
            "items": [
              "适合 UI bug、构建失败、路由 404、搜索结果缺失等问题。",
              "让它先列文件和原因，可以避免误改无关页面。",
              "如果它的判断不准确，再补充截图、URL、报错日志。"
            ]
          },
          {
            "title": "确认计划后再让它修改",
            "description": "计划合理后，把任务改成可验收的修改请求。范围越明确，结果越稳定。",
            "code": "按刚才定位结果修复，但只允许修改首页相关组件和样式。\n要求：桌面端不变，移动端 360px 不横向溢出，修完后运行相关检查并给出截图。",
            "items": [
              "写清楚允许修改的目录或文件。",
              "写清楚不能影响的页面或端。",
              "写清楚验证方式，例如截图、lint、ts-check、单测、构建。"
            ]
          },
          {
            "title": "让它验证并解释 diff",
            "description": "修改完成后，要求 Codex 用命令和浏览器验证，并说明每个文件为什么被改。",
            "code": "请运行必要检查，然后总结：\n1. 修改了哪些文件\n2. 每个文件为什么改\n3. 如何验证\n4. 是否有未处理风险",
            "items": [
              "前端页面：至少看桌面端和移动端首屏。",
              "后端或脚本：至少跑最接近的测试或类型检查。",
              "上线前：要求列出会提交的文件和排除的脏文件。"
            ]
          }
        ],
        "tips": [
          "推荐工作流：只读分析 → 修改计划 → 小范围改动 → 运行验证 → 查看 diff → 再决定提交。",
          "如果项目有 AGENTS.md，Codex 会更稳定地遵守包管理器、测试命令、代码风格和安全边界。"
        ]
      },
      {
        "title": "写好 AGENTS.md",
        "content": "AGENTS.md 是给 Codex 看的项目说明文件，适合写包管理器、构建命令、目录约定、禁止事项、测试流程和提交规范。它相当于把你经常重复告诉 AI 的规则固化到仓库里。",
        "steps": [
          {
            "title": "在项目根目录创建 AGENTS.md",
            "description": "把项目级规则写在仓库根目录。以后 Codex 进入这个项目时，会优先读取这些说明。",
            "image": "/images/tutorial/codex-site-agents-md.png",
            "code": "# AGENTS.md\n\n## Project Rules\n\n- Use pnpm only. Do not use npm or yarn.\n- Make surgical changes. Do not refactor unrelated files.\n- Before editing, state which files you plan to change.\n- Never run destructive git commands unless explicitly requested.\n- After code changes, run pnpm exec tsc -p tsconfig.json --noEmit.\n- For frontend changes, verify desktop and 390px mobile layout.",
            "items": [
              "规则要短、具体、可验证，不要写空泛价值观。",
              "把最容易出错的地方写进去，例如包管理器、启动命令、部署方式。",
              "如果项目有多套应用，可以在子目录再放一个 AGENTS.md 覆盖局部规则。"
            ]
          },
          {
            "title": "把常用验证命令写进去",
            "description": "不要只告诉 Codex “测试一下”，要把项目真实命令写清楚。",
            "code": "## Verification\n\n- Type check: pnpm exec tsc -p tsconfig.json --noEmit\n- Lint changed files: pnpm exec eslint <changed-files>\n- Local preview: pnpm run preview:local\n- Production build: pnpm exec next build",
            "items": [
              "命令越准确，Codex 越不容易乱猜。",
              "如果某些命令很慢，写明什么时候才需要跑。",
              "如果部署由人工处理，写明 Codex 不要自动部署。"
            ]
          },
          {
            "title": "写清楚提交和部署边界",
            "description": "很多事故不是代码不会写，而是 AI 把无关文件一起提交或提前部署。把边界写进 AGENTS.md。",
            "code": "## Git and Deployment\n\n- Do not commit or push unless the user explicitly asks.\n- Do not include unrelated dirty files in a commit.\n- Before any commit, show git diff --stat and git status --short.\n- Deployment requires a separate explicit instruction.",
            "items": [
              "适合多人协作仓库、线上网站、带密钥或部署脚本的项目。",
              "Codex 可以帮你写日志，但不应该在你没确认时推送。",
              "如果有服务器部署流程，把入口和等待时间写清楚。"
            ]
          }
        ],
        "tips": [
          "官方 AGENTS.md 指南：https://developers.openai.com/codex/guides/agents-md",
          "AGENTS.md 不是给用户看的文章，而是给 Codex 看的操作手册。"
        ]
      },
      {
        "title": "IDE 扩展怎么用",
        "content": "如果你主要在编辑器里写代码，Codex IDE 扩展比纯 CLI 更顺手。它能结合当前文件、选区、打开的上下文和编辑器状态，让你少复制路径和代码片段。",
        "steps": [
          {
            "title": "选择你的编辑器",
            "description": "OpenAI 官方 Codex IDE 扩展覆盖常见开发编辑器。安装前确认自己使用的是 VS Code、Cursor、Windsurf 或 JetBrains 系列。",
            "image": "/images/tutorial/codex-site-ide.png",
            "items": [
              "VS Code / Cursor / Windsurf：通常从扩展市场搜索 Codex 或 OpenAI Codex。",
              "JetBrains：从插件市场安装对应插件。",
              "安装后按提示登录同一个 OpenAI / ChatGPT 账号。",
              "如果扩展无法连接，先确认本机网络和账号权限，再检查编辑器代理设置。"
            ]
          },
          {
            "title": "用选区驱动修改",
            "description": "IDE 场景下不要只说“优化这个文件”，更好的做法是选中一段代码，再要求它做具体修改。",
            "code": "请只修改我选中的组件：\n- 保持桌面端不变\n- 移动端按钮换行\n- 不改数据结构\n- 修改后解释 CSS 变化",
            "items": [
              "适合局部 CSS、组件拆分、类型修复、函数重写。",
              "如果涉及多个文件，要求它先列出依赖关系。",
              "修改后在编辑器里逐个查看 diff，不要盲目全部接受。"
            ]
          },
          {
            "title": "CLI 和 IDE 怎么搭配",
            "description": "IDE 适合局部编辑，CLI 适合项目级搜索、批量修改和跑命令。两者搭配比只用一种入口更稳定。",
            "items": [
              "先用 CLI 让 Codex 读项目、找文件、跑测试。",
              "再用 IDE 扩展针对关键组件做精修。",
              "最后回到 CLI 跑检查、看 git diff、生成变更总结。"
            ]
          }
        ],
        "tips": [
          "官方 IDE 文档：https://developers.openai.com/codex/ide",
          "编辑器扩展适合“看着代码改”，CLI 适合“围绕项目完成任务”。"
        ]
      },
      {
        "title": "云端 Codex 怎么用",
        "content": "云端 Codex 适合把边界清楚的任务交给后台处理。它不适合你一边改一边实时观察的小修小补，更适合“分析这个仓库并准备一个修复方案”这类明确任务。",
        "steps": [
          {
            "title": "进入云端入口",
            "description": "打开 chatgpt.com/codex，按页面提示选择仓库或任务入口。具体可用能力取决于你的账号、组织和产品开通状态。",
            "image": "/images/tutorial/codex-site-cloud.png",
            "items": [
              "入口地址：https://chatgpt.com/codex",
              "适合处理 issue、代码审查、修复明确 bug、准备 PR 草稿。",
              "第一次使用时通常需要授权代码仓库或选择可访问的项目。",
              "不要给云端任务粘贴生产密钥、服务器密码或私有客户数据。"
            ]
          },
          {
            "title": "给云端任务写清楚验收标准",
            "description": "云端任务比本地 CLI 更需要边界，因为你不会一直盯着它每一步。任务描述必须包含目标、范围、禁止事项和验证方式。",
            "code": "目标：修复 /app/codex 移动端图片溢出。\n范围：只允许修改 app 教程详情页样式。\n禁止：不要重构路由，不要改其他内容数据。\n验证：390px 宽度无横向滚动，桌面端布局不变。",
            "items": [
              "任务越像 issue，云端 Codex 越容易交付可 review 的结果。",
              "不要只写“优化一下”，要写页面、文件范围和成功标准。",
              "完成后先 review diff，再决定是否合并。"
            ]
          },
          {
            "title": "什么时候不用云端",
            "description": "如果你需要频繁查看本地浏览器、处理本机文件、使用本地登录态，优先用本地 CLI 或 IDE。",
            "items": [
              "需要本机浏览器截图：优先本地 Codex。",
              "需要访问本机服务 localhost：优先本地 Codex。",
              "需要非常快地来回调整 UI：优先 IDE 扩展。",
              "需要长时间后台分析仓库或准备 PR：适合云端 Codex。"
            ]
          }
        ],
        "tips": [
          "云端任务要写成“可验收的工单”，不要写成随口聊天。",
          "本地 CLI、IDE 扩展和云端 Codex 可以按任务阶段组合使用。"
        ]
      },
      {
        "title": "权限、安全和密钥管理",
        "content": "Codex 可以读取和修改本地文件，也可能运行命令。安全使用的关键不是完全不用它，而是把权限边界、密钥处理和 Git 回退路径设置好。",
        "steps": [
          {
            "title": "先保护密钥文件",
            "description": "任何包含 API Key、数据库密码、Cookie、Token 的文件，都应该被 `.gitignore` 排除，并避免让 Codex 在回答中原样输出。",
            "code": "# .gitignore\n.env\n.env.local\n.env.*.local\n*.key\n*.pem\nsecrets.json\ncredentials.json",
            "items": [
              "让 Codex 检查配置时，可以要求它只说明变量名，不展示变量值。",
              "如果发现密钥已经提交到仓库，先轮换密钥，再清理 Git 历史。",
              "截图前检查页面上是否显示 API Key、Token 或服务器地址。"
            ]
          },
          {
            "title": "高风险命令必须人工确认",
            "description": "删除、覆盖、迁移、重置、推送、部署都属于高风险操作。让 Codex 先解释，再决定是否执行。",
            "items": [
              "谨慎命令：`rm -rf`、`Remove-Item -Recurse`、`git reset --hard`、`git clean -fd`。",
              "谨慎操作：数据库迁移、生产部署、批量替换、依赖大版本升级。",
              "执行前要求它说明：影响目录、是否可回退、验证方式。",
              "如果只是改文章或页面，不应该出现删除整个目录的命令。"
            ],
            "warning": "不要让 Codex 在你没确认的情况下执行 `git reset --hard` 或清理未跟踪文件。"
          },
          {
            "title": "用 Git 做回退保险",
            "description": "Codex 修改前后都看一眼 Git 状态。小步提交可以把风险控制在可回退范围内。",
            "code": "git status --short\ngit diff --stat\ngit diff",
            "items": [
              "修改前：确认当前有哪些你自己的未提交改动。",
              "修改后：看 diff 是否只包含本次任务范围。",
              "提交前：排除无关文件、日志、临时截图、密钥和构建产物。",
              "不确定时：先让 Codex 列出“本次会提交”和“不会提交”的文件。"
            ]
          }
        ],
        "tips": [
          "Codex 能帮你提高速度，但最终合并、推送、部署仍然应由你确认。",
          "安全边界写进 AGENTS.md，比每次口头提醒更稳定。"
        ]
      },
      {
        "title": "常见问题排查",
        "content": "Codex 的常见问题大多集中在 npm 安装、PATH、登录、网络、额度、权限和当前目录。按下面顺序排查，通常能快速定位。",
        "steps": [
          {
            "title": "npm 安装失败",
            "description": "先判断是网络问题、权限问题还是 npm 缓存问题。不要反复换来源不明的安装脚本。",
            "code": "npm cache verify\nnpm install -g @openai/codex",
            "items": [
              "网络超时：换稳定网络后重试。",
              "权限不足：Windows 用管理员终端，macOS/Linux 修复 npm 全局目录权限。",
              "依赖解析失败：升级 Node.js LTS 后重新安装。",
              "公司网络限制：使用公司允许的代理或内部 npm 源。"
            ]
          },
          {
            "title": "codex 命令不存在",
            "description": "这通常不是 Codex 没装好，而是 npm 全局 bin 没进 PATH，或安装后没有重新打开终端。",
            "code": "npm config get prefix\nnpm bin -g\nwhere codex",
            "items": [
              "Windows 用 `where codex` 查看命令是否能被找到。",
              "macOS/Linux 用 `which codex` 查看命令路径。",
              "修改环境变量后关闭所有终端窗口，再重新打开。",
              "如果仍失败，重新安装 Node.js LTS 并勾选加入 PATH。"
            ]
          },
          {
            "title": "登录失败或无可用模型",
            "description": "先确认账号能正常登录 OpenAI / ChatGPT，再确认 API Key、项目权限、组织权限和额度。",
            "items": [
              "浏览器能登录，不代表 CLI 一定已授权；按 CLI 提示重新登录。",
              "API Key 要属于正确项目，不要复制错组织或旧 key。",
              "额度不足、项目没开通、组织权限不足都会导致模型不可用。",
              "网络不稳定时，登录回调和模型请求都可能超时。"
            ]
          },
          {
            "title": "Codex 改错目录或改太多文件",
            "description": "这通常是启动目录不对，或任务边界写得太宽。先停止，再回到正确项目根目录重新启动。",
            "code": "pwd\ngit status --short",
            "items": [
              "确认当前目录就是目标项目根目录。",
              "要求 Codex 先列修改计划，不要直接改。",
              "修改后如果范围不对，不要继续叠加修复，先查看 diff 再决定回退。",
              "把“只允许修改哪些文件”写进任务描述。"
            ]
          },
          {
            "title": "接口报 401、429、timeout",
            "description": "这些属于 API 调用问题，先按错误类型排查，不要盲目重装 Codex。",
            "items": [
              "401 / invalid API key：重新复制 API Key，确认没有空格、没有用错项目。",
              "429 / rate limit：降低并发，稍后重试，或检查套餐和限速。",
              "insufficient quota：检查账单、余额、项目额度和组织限制。",
              "timeout：先排查网络，再缩短上下文或换更快模型。"
            ]
          }
        ],
        "tips": [
          "本站相关排错：/error/invalid-api-key、/error/429-too-many-requests、/error/timeout、/error/insufficient-quota",
          "如果只是 API Key 或额度问题，重装 Codex 通常没有用。"
        ]
      },
      {
        "title": "推荐工作流和内链",
        "content": "把 Codex 用好，不靠一次性长提示词，而靠稳定流程。下面这套流程适合大多数网站、脚本、后端和工具项目。",
        "steps": [
          {
            "title": "日常开发推荐流程",
            "description": "每次任务都按“读、计划、改、验、总结”推进，速度会比直接让它乱改更快。",
            "code": "1. 只读分析：找相关文件和原因\n2. 修改计划：列出要改的文件和验证方式\n3. 小范围实现：只改本次任务需要的代码\n4. 本地验证：运行测试、类型检查或页面截图\n5. 查看 diff：确认没有混入无关文件\n6. 人工决定：是否 commit、push、deploy",
            "items": [
              "复杂任务拆成多次小任务，比一次性全自动更可靠。",
              "UI 任务必须给桌面端和移动端验收标准。",
              "内容任务必须给结构、语气、不可删除项和内链要求。",
              "部署任务必须明确是否只部署、是否需要检查、是否需要推送。"
            ]
          },
          {
            "title": "本站相关教程",
            "description": "如果你要把 Codex 和其他 AI API、模型切换工具一起用，可以继续看这些页面。",
            "items": [
              "OpenAI API 接入：/api/openai",
              "CC Switch 统一管理 Codex、Claude Code、Gemini CLI 配置：/app/ccswitch",
              "Claude Code 安装与模型接入：/app/claude-code",
              "API Key 错误排查：/error/invalid-api-key",
              "请求超时排查：/error/timeout"
            ]
          },
          {
            "title": "一个可以直接复制的高质量任务模板",
            "description": "以后给 Codex 派任务，可以从这个模板开始改。",
            "code": "目标：修复/新增 [具体页面或功能]\n范围：只允许修改 [文件或目录]\n禁止：不要修改 [无关页面、数据源、部署脚本]\n要求：保留现有风格，移动端 360px 不横向溢出\n验证：运行 [具体命令]，并截图检查 [具体 URL]\n交付：列出修改文件、验证结果、未处理风险",
            "items": [
              "把“你要什么”和“不要什么”都写进去。",
              "把验收标准写成可检查的事实。",
              "把提交、推送、部署作为单独指令，不要默认授权。"
            ]
          }
        ],
        "tips": [
          "Codex 最适合处理边界清楚、可验证、有版本控制保护的开发任务。",
          "写给 Codex 的提示词越像工程任务单，交付质量越稳定。"
        ]
      }
    ]
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    desc: 'Claude Code 安装、区域限制处理、CC Switch 配置与 DeepSeek 模型接入完整教程',
    url: 'https://claude.com/product/claude-code',
    icon: '💻',
    badge: { text: '热门', type: 'warning' },
    sections: [
      {
        title: '安装 Node.js',
        content: 'Claude Code 是由 JavaScript 编写的命令行工具，Windows 电脑需要先安装 Node.js 运行环境。Node.js 会同时提供 npm 包管理器，后续安装 Claude Code 和相关工具都依赖它。',
        steps: [
          {
            title: '下载 Node.js 安装包',
            description: '访问 Node.js 中文下载页面，下载 Windows Installer (.msi)。新手建议选择 LTS 版本，稳定性更好。',
            image: '/images/tutorial/claude-code-deepseek-p01-01.png',
            items: [
              '打开官网：https://nodejs.org/zh-cn/download',
              '选择 Windows Installer (.msi)',
              '普通 Windows 电脑选择 x64 版本即可',
              '下载完成后双击安装包启动安装向导'
            ]
          },
          {
            title: '运行 Node.js 安装程序',
            description: '安装过程保持默认即可，一路点击 Next，最后点击 Finish 完成安装。',
            image: '/images/tutorial/claude-code-deepseek-p01-01.png',
            items: [
              '安装路径保持默认',
              '组件选项保持默认',
              '一定要勾选 Automatically install the necessary tools',
              '等待安装完成后关闭安装向导'
            ]
          },
          {
            title: '验证 Node.js 是否成功',
            description: '安装完成后重新打开终端，检查 Node.js 和 npm 是否可用。',
            code: 'node -v\nnpm -v',
            items: [
              '能显示 node 版本号，说明 Node.js 安装成功',
              '能显示 npm 版本号，说明包管理器可用',
              '如果命令不存在，关闭终端后重新打开再试'
            ]
          }
        ],
        tips: [
          'Node.js 是 Claude Code 在 Windows 上运行的前置环境',
          'npm 后续会用于执行 `npm install -g @anthropic-ai/claude-code`',
          '安装完成后必须新开终端，旧终端可能读取不到新环境变量'
        ],
        warnings: [
          '如果之前装过旧版 Node.js，建议先卸载旧版本再安装新版',
          '不要把 Node.js 安装到包含中文或特殊字符的路径'
        ]
      },
      {
        title: '安装 Git / Git Bash',
        content: 'Claude Code 底层依赖 Bash 环境。Windows 默认的 CMD 和 PowerShell 对部分命令行行为支持不完整，因此建议安装 Git for Windows，并使用它自带的 Git Bash。',
        steps: [
          {
            title: '下载 Git for Windows',
            description: '访问 Git for Windows 下载页面，下载 Windows/x64 Setup 安装包。',
            image: '/images/tutorial/claude-code-deepseek-p02-01.png',
            items: [
              '打开官网：https://git-scm.com/install/windows',
              '页面通常会自动下载 Git for Windows/x64 Setup',
              '如果没有自动下载，点击页面上的下载链接手动触发',
              '下载完成后双击安装包'
            ]
          },
          {
            title: '运行 Git 安装向导',
            description: 'Git 安装步骤较多，新手保持默认选项一路 Next 即可。',
            image: '/images/tutorial/claude-code-deepseek-p03-01.png',
            items: [
              '安装位置保持默认',
              '组件选择保持默认',
              '终端模拟器建议使用默认的 MinTTY',
              '等待安装完成后点击 Finish'
            ]
          },
          {
            title: '验证 Git Bash 可用',
            description: '安装完成后重新打开终端，确认 git 命令可以正常输出版本号。',
            image: '/images/tutorial/claude-code-deepseek-p04-01.png',
            code: 'git -v',
            items: [
              '按 Win 键搜索 Git Bash 并打开',
              '也可以在任意文件夹右键选择 Git Bash Here',
              '执行 `git -v` 后能显示版本号即可'
            ]
          }
        ],
        tips: [
          '后续 Claude Code 相关命令优先在 Git Bash 中执行',
          'Git Bash 能提供更接近 Linux 的命令行环境，兼容性更好'
        ],
        warnings: [
          '只用 CMD 或 PowerShell 运行 Claude Code 可能遇到路径、权限或 Bash 兼容问题',
          '如果之前安装过旧版 Git，建议先卸载后再安装新版'
        ]
      },
      {
        title: '安装 Claude Code',
        content: 'Node.js 和 Git Bash 准备好后，就可以通过 npm 安装 Claude Code。Claude Code 是新一代实干型 AI 编程智能体，可以根据指令修改代码、运行命令并继续修复报错。',
        steps: [
          {
            title: '执行安装命令',
            description: '打开 Git Bash，运行以下命令安装 Claude Code 最新版本。',
            image: '/images/tutorial/claude-code-deepseek-p05-01.png',
            code: 'npm install -g @anthropic-ai/claude-code',
            items: [
              '安装过程需要联网下载依赖',
              '如果出现权限问题，以管理员身份打开终端后重试',
              '安装完成后不要关闭页面，继续执行版本检查'
            ]
          },
          {
            title: '验证安装结果',
            description: '安装完成后，在终端中依次检查 Git、Node.js 和 Claude Code 是否安装成功。',
            code: 'git -v\nnode -v\nclaude --version',
            items: [
              '如果三个命令都显示版本号，说明基础环境安装成功',
              '如果某个命令不存在，先关闭终端重新打开',
              '仍然失败时，回到对应安装步骤重新安装'
            ]
          }
        ],
        tips: [
          'Claude Code 可以直接修改代码文件、运行测试命令并根据报错继续修复',
          '国内用户后续建议通过 CC Switch 接入 DeepSeek，网络更稳、成本更低'
        ],
        warnings: [
          '安装期间如果网络不稳定，npm 下载可能失败，重新执行安装命令即可',
          '不要使用来源不明的第三方包，使用官方 npm 包名 `@anthropic-ai/claude-code`'
        ]
      },
      {
        title: '解决 onboarding / 区域限制',
        content: '首次执行 `claude` 可能会触发 onboarding 引导。如果国内环境遇到区域限制或无法继续，可以通过修改 Claude Code 配置文件跳过 onboarding。',
        steps: [
          {
            title: '先启动一次 Claude Code',
            description: '在终端执行 `claude`，让程序生成默认配置文件。如果出现区域限制报错，继续按下面步骤处理。',
            image: '/images/tutorial/claude-code-deepseek-p05-01.png',
            code: 'claude',
            items: [
              '第一次执行可能会进入引导流程',
              '如果提示无法继续或区域限制，不代表安装失败',
              '继续找到配置文件并修改 onboarding 状态'
            ]
          },
          {
            title: '找到并编辑 Claude 配置文件',
            description: '打开用户目录下的 `.claude.json`，加入已完成 onboarding 的配置项。',
            image: '/images/tutorial/claude-code-deepseek-p06-01.png',
            code: '# Windows 路径\nC:\\Users\\你的用户名\\.claude.json\n\n# 在 JSON 对象中加入：\n"hasCompletedOnboarding": true',
            items: [
              '路径中的“你的用户名”替换为当前 Windows 用户名',
              '可以用记事本、VS Code 或其他编辑器打开',
              '字段名必须是 `hasCompletedOnboarding`',
              '值必须是 `true`，不要拼错'
            ],
            warning: '修改 JSON 前建议备份原文件。字段之间要用逗号分隔，不能多逗号或漏括号。'
          },
          {
            title: '保存配置并重新启动',
            description: '保存 `.claude.json` 后关闭编辑器，重新打开终端再执行 Claude Code。',
            image: '/images/tutorial/claude-code-deepseek-p07-01.png',
            items: [
              '保存配置文件',
              '关闭当前终端',
              '重新打开 Git Bash 或终端',
              '后续通过 CC Switch 接入 DeepSeek 模型'
            ]
          }
        ],
        tips: [
          '这个步骤只处理 onboarding 状态，不负责配置模型供应商',
          '模型供应商推荐交给 CC Switch 管理，避免手写配置出错'
        ]
      },
      {
        title: '安装 CC Switch',
        content: 'CC Switch 是跨平台桌面端 AI 终端配置管理工具，可以统一管理 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 的供应商、模型、MCP 和 Skills。这里用于把 Claude Code 接入 DeepSeek 模型。',
        steps: [
          {
            title: '打开 CC Switch 项目页面',
            description: '访问 CC Switch 的 GitHub 项目页面，进入 Releases 下载 Windows 安装包。',
            image: '/images/tutorial/claude-code-deepseek-p08-01.png',
            items: [
              '访问项目地址：https://github.com/farion1231/cc-switch',
              '进入 Releases 页面',
              '找到最新版本的 Assets 下载区'
            ]
          },
          {
            title: '下载 Windows MSI 安装包',
            description: 'Windows 用户优先下载 `CC-Switch-v版本号-Windows.msi`，不要下载源码压缩包。',
            items: [
              '文件名通常类似 `CC-Switch-v3.14.1-Windows.msi`',
              '下载成功后双击运行安装程序',
              '安装向导保持默认，一路下一步即可',
              '安装完成后打开 CC Switch'
            ]
          }
        ],
        tips: [
          'CC Switch GitHub 地址：https://github.com/farion1231/cc-switch',
          '如果需要更完整的图文说明，可查看本站 CC Switch 详细教程：https://www.apiuspro.cn/app/ccswitch'
        ],
        warnings: [
          '只从官方 GitHub 项目或可信发布页下载安装包',
          'Portable 便携版可以用，但新手优先选 MSI 安装包'
        ]
      },
      {
        title: '获取 DeepSeek API Key',
        content: '接入 DeepSeek 前，需要先在 DeepSeek 开放平台创建 API Key。API Key 是调用模型的身份凭证，创建后要立即保存。',
        steps: [
          {
            title: '进入 DeepSeek 开放平台',
            description: '访问 DeepSeek 开放平台，注册或登录账号，并按页面要求完成实名认证。',
            image: '/images/tutorial/claude-code-deepseek-p09-01.png',
            items: [
              '访问 DeepSeek 开放平台：https://platform.deepseek.com',
              '注册或登录账号',
              '按提示完成实名认证',
              '进入 API Keys 页面'
            ]
          },
          {
            title: '创建并保存 API Key',
            description: '在 API Keys 页面创建新的 API Key，复制后保存到安全位置。',
            image: '/images/tutorial/claude-code-deepseek-p10-01.png',
            items: [
              '点击创建 API Key',
              '复制生成的密钥',
              '密钥通常只完整显示一次，忘记后只能重新创建',
              '确认账号有可用额度或余额'
            ],
            warning: 'API Key 不要截图公开、上传到 GitHub 或发送给他人。'
          }
        ],
        tips: [
          'DeepSeek 适合国内开发测试，网络稳定且成本较低',
          '建议先用小额额度测试，确认能正常响应后再用于真实项目'
        ]
      },
      {
        title: '使用 CC Switch 接入 DeepSeek',
        content: '拿到 DeepSeek API Key 后，在 CC Switch 中选择 Claude Code 标签，并把 DeepSeek 配置保存进去。这样 Claude Code 后续就能通过 DeepSeek 模型响应。',
        steps: [
          {
            title: '打开 Claude Code 配置页',
            description: '打开 CC Switch，进入 Claude Code 对应页面，点击右上角添加或配置供应商。',
            image: '/images/tutorial/claude-code-deepseek-p10-01.png',
            items: [
              '确认当前选中的是 Claude Code',
              '点击右上角的添加或配置按钮',
              '选择 DeepSeek 供应商预设'
            ]
          },
          {
            title: '填写 DeepSeek API Key 并保存',
            description: '选择 DeepSeek 后，将刚才复制的 API Key 粘贴进去，保存配置。',
            image: '/images/tutorial/claude-code-deepseek-p11-01.png',
            code: 'Provider Name: DeepSeek\nAPI Endpoint: https://api.deepseek.com\nAPI Key: sk-xxxxxxxxxxxxxxxx\nModel Name: deepseek-v4-flash',
            items: [
              'Provider 选择 DeepSeek',
              '粘贴 DeepSeek API Key',
              '确认模型名称和 API 地址无误',
              '点击保存配置'
            ]
          },
          {
            title: '测试 CC Switch 连接状态',
            description: '保存后点击页面中的测试或状态按钮。如果提示运行正常，说明 DeepSeek 已成功接入。',
            image: '/images/tutorial/claude-code-deepseek-p11-01.png',
            items: [
              '点击测试按钮',
              '确认状态正常',
              '如果失败，优先检查 API Key、余额和模型名称',
              '配置细节可参考：https://www.apiuspro.cn/app/ccswitch'
            ]
          }
        ],
        tips: [
          'CC Switch 可以同时管理多个供应商，后续可在 DeepSeek、Kimi、智谱、OpenAI 等模型间切换',
          '切换后如 Claude Code 未立即生效，重新打开终端再试'
        ],
        warnings: [
          '一定要确认当前配置写入的是 Claude Code 标签，不要误写到其他工具标签',
          '不要把包含 API Key 的配置文件上传到公开仓库'
        ]
      },
      {
        title: '启动 Claude Code 并测试模型',
        content: 'DeepSeek 配置完成后，重新打开一个新的终端，执行 `claude` 启动 Claude Code，并用简单问题验证模型是否正常响应。',
        steps: [
          {
            title: '重新打开终端启动 Claude Code',
            description: '关闭旧终端，重新打开 Git Bash 或终端，然后执行 Claude Code 启动命令。',
            image: '/images/tutorial/claude-code-deepseek-p12-01.png',
            code: 'claude',
            items: [
              '必须重新打开终端，避免旧会话缓存旧配置',
              '在终端输入 `claude`',
              '等待 Claude Code 进入交互界面'
            ]
          },
          {
            title: '提出简单问题测试响应',
            description: '在 Claude Code 中输入一个简单问题，例如“1.9 和 1.11 哪个大”。如果模型能正常回答，说明接入成功。',
            image: '/images/tutorial/claude-code-deepseek-p12-01.png',
            items: [
              '先用简单问题测试，不要一开始就跑复杂项目',
              '能正常回答说明 DeepSeek 模型接入成功',
              '如果没有响应，检查 CC Switch 配置、API Key 和账户余额'
            ]
          }
        ],
        tips: [
          '确认模型响应稳定后，再进入真实项目目录使用 Claude Code 处理代码任务',
          '日常开发建议先用低成本模型，复杂任务再切换到更强模型'
        ]
      },
      {
        title: '进阶使用与补充入口',
        content: '完成 Claude Code 与 DeepSeek 接入后，可以继续配置 VS Code 扩展、Obsidian 插件或查看 CC Switch 的完整教程，把命令行、编辑器和知识库工作流串起来。',
        steps: [
          {
            title: '查看 CC Switch 详细教程',
            description: '如果你还需要配置其他模型、MCP、Skills 或多个 AI 工具，建议继续阅读本站 CC Switch 独立教程。',
            items: [
              '详细教程入口：https://www.apiuspro.cn/app/ccswitch',
              '适合继续配置 Codex、Gemini CLI、OpenCode、OpenClaw',
              '适合统一管理多个 API Key 和模型供应商'
            ]
          },
          {
            title: '接入 VS Code 扩展',
            description: 'Claude Code 提供 VS Code 扩展，安装后可以直接在编辑器内使用侧边栏对话、内联编辑和代码修复。',
            items: [
              '打开 VS Code 扩展市场',
              '搜索 Claude Code',
              '安装官方扩展',
              '扩展会读取 Claude Code 的本地配置'
            ]
          },
          {
            title: '接入 Obsidian 插件',
            description: '如果你使用 Obsidian 管理笔记，可以继续安装 Claudian Obsidian 插件，在知识库中调用 AI。',
            items: [
              '插件教程入口：https://www.apiuspro.cn/app/claudian-obsidian',
              '适合把 Claude Code 工作流延伸到笔记和知识库场景',
              '建议在 Claude Code 基础环境稳定后再配置'
            ]
          }
        ],
        tips: [
          'VS Code 扩展和命令行 Claude Code 共享同一套本地配置',
          'Obsidian 插件是进阶工作流，不影响 Claude Code 基础使用',
          '需要更强配置管理时优先查看 `https://www.apiuspro.cn/app/ccswitch`'
        ]
      }
    ]
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    desc: '开源AI助手平台，支持飞书集成，一键部署私人AI助理',
    url: 'https://openclaw.ai',
    icon: '🦞',
    badge: { text: '开源', type: 'success' },
    sections: [
      {
        title: 'OpenClaw 简介',
        content: 'OpenClaw 是一个开源的 AI 助手平台，支持多种 AI 模型，可集成飞书等通讯工具，打造私人 AI 助理。',
        steps: [
          {
            title: '什么是 OpenClaw',
            description: 'OpenClaw 让你在本地部署 AI 助手，通过飞书等平台与 AI 对话，数据安全可控。',
            items: [
              '支持 Anthropic Claude、OpenAI GPT、GLM 等多种模型',
              '支持飞书集成，随时随地与 AI 对话',
              '开源免费，数据完全本地化',
              '支持技能插件扩展功能'
            ]
          }
        ],
        tips: [
          'OpenClaw 需要本地运行 Gateway 服务',
          '默认监听地址：127.0.0.1:18789',
          '支持多种 AI 模型切换，按需选择'
        ]
      },
      {
        title: '前置准备',
        content: '安装 OpenClaw 前，需要确保系统已安装必要的环境。',
        steps: [
          {
            title: '安装 Node.js（>=22）',
            description: 'OpenClaw 需要 Node.js 22 或更高版本',
            items: [
              '访问 Node.js 官网下载 LTS 版本：https://nodejs.org',
              '安装完成后在命令行验证：node -v',
              '确保 NPM 也已安装：npm -v'
            ],
            warning: 'Node.js 版本必须 >= 22，旧版本无法运行 OpenClaw'
          },
          {
            title: '安装 Git Bash',
            description: 'Windows 用户需要安装 Git Bash 来运行 OpenClaw',
            items: [
              '访问 Git 官网下载 Windows 版本：https://git-scm.com/downloads/win',
              '国内用户可使用镜像：https://registry.npmmirror.com',
              '安装完成后验证：git -v'
            ]
          }
        ],
        tips: [
          '推荐使用 Git Bash 而非 CMD 运行 OpenClaw',
          '国内用户建议先设置 NPM 镜像加速下载'
        ],
        warnings: [
          '确保 Node.js 版本 >= 22，否则安装后无法正常运行'
        ]
      },
      {
        title: '配置环境变量',
        content: '在安装 OpenClaw 前，先配置环境变量，指定工作目录，避免占用 C 盘空间。',
        steps: [
          {
            title: '创建工作区目录',
            description: '在 D 盘创建 OpenClaw 工作区',
            code: 'mkdir D:\\software\\openclaw\\workspace'
          },
          {
            title: '设置系统环境变量',
            description: '通过 Win+R 输入 sysdm.cpl 打开系统属性，添加以下环境变量',
            items: [
              'OPENCLAW_HOME = D:\\software\\openclaw',
              'OPENCLAW_WORKSPACE = D:\\software\\openclaw\\workspace',
              'OPENCLAW_CONFIG_PATH = D:\\software\\openclaw\\openclaw.json',
              'OPENCLAW_STATE_DIR = D:\\software\\openclaw'
            ]
          },
          {
            title: '验证环境变量',
            description: '在 Git Bash 中验证环境变量是否生效',
            code: 'echo $OPENCLAW_HOME\necho $OPENCLAW_WORKSPACE\necho $OPENCLAW_CONFIG_PATH\necho $OPENCLAW_STATE_DIR',
            items: [
              '如果输出为空，说明环境变量未生效，需重启终端',
              'Windows CMD 中使用 echo %OPENCLAW_HOME% 验证'
            ]
          }
        ],
        tips: [
          '建议将工作区放在 D 盘，避免占用 C 盘空间',
          '环境变量设置后需要重启终端才能生效'
        ],
        warnings: [
          '环境变量必须配置正确，否则 OpenClaw 无法找到工作区'
        ]
      },
      {
        title: '安装 OpenClaw',
        content: '使用 NPM 全局安装 OpenClaw，并运行配置向导。',
        steps: [
          {
            title: '安装 OpenClaw',
            description: '在 Git Bash 或 PowerShell 中执行安装命令',
            code: 'npm install -g openclaw\n\n# 或使用最新版\nnpm install -g openclaw@latest\n\n# 或使用 pnpm\npnpm add -g openclaw@latest',
            items: [
              'npm：Node.js 默认包管理器',
              '-g：全局安装，安装后可在命令行直接使用',
              '安装过程可能需要 30 秒左右'
            ]
          },
          {
            title: '运行配置向导',
            description: '执行 onboard 命令启动配置向导',
            code: 'openclaw onboard --workspace D:\\software\\openclaw\\workspace --install-daemon',
            items: [
              '--workspace：指定工作区路径',
              '--install-daemon：安装后台守护进程服务，开机自启',
              '不指定工作区则默认在 C 盘：~/.openclaw/workspace'
            ]
          }
        ],
        tips: [
          '建议使用 --install-daemon 参数，让服务开机自启',
          '安装失败时可尝试以管理员身份运行终端'
        ]
      },
      {
        title: 'Onboard 配置步骤',
        content: '运行 onboard 命令后，需要完成以下交互式配置步骤。',
        steps: [
          {
            title: '步骤 1：确认使用协议',
            description: '选择 Yes 继续',
            items: [
              '提示 "I understand this is personal-by-default..." 选择 Yes'
            ]
          },
          {
            title: '步骤 2：选择 QuickStart',
            description: '选择 QuickStart 快速开始模式'
          },
          {
            title: '步骤 3：选择 AI 模型',
            description: '选择你要使用的 AI 模型提供商',
            items: [
              'Anthropic Claude：官方模型，效果最好但较贵',
              'OpenAI GPT：通用性强',
              'GLM（智谱）：国内首选，性价比高',
              '其他：Moonshot、MiniMax、Google、xAI 等'
            ],
            warning: '推荐国内用户选择 GLM (Z.AI)，访问稳定且性价比高'
          },
          {
            title: '步骤 4：输入 API Key',
            description: '根据选择的模型输入对应的 API Key',
            items: [
              '如果选择 GLM Coding Plan：',
              '访问智谱AI Coding Plan 注册获取 API Key：https://bigmodel.cn/glm-coding',
              '选择 Coding-Plan-CN（国内）或 Coding-Plan-Global（国际）',
              '粘贴 API Key 完成认证'
            ]
          },
          {
            title: '步骤 5：配置飞书集成',
            description: '输入飞书 App ID 和 App Secret',
            items: [
              '在飞书开放平台创建应用获取 App ID 和 Secret',
              '输入后完成飞书集成'
            ]
          },
          {
            title: '步骤 6-8：可选配置（可跳过）',
            description: 'Web 搜索、技能安装、API 配置均可跳过',
            items: [
              'Web 搜索：选择 Skip for now 跳过',
              '技能安装：选择 Skip for now 跳过（后续可单独安装）',
              'API 配置：全部选择 No 跳过'
            ],
            warning: '初次安装建议全部跳过，先让基础功能跑起来'
          },
          {
            title: '步骤 9：Hooks 配置',
            description: '选择 Skip for now 跳过钩子配置'
          },
          {
            title: '步骤 10：重启 Gateway 服务',
            description: '选择 Restart 重启服务让配置生效',
            items: [
              '选择 Restart（默认选项）',
              '按 Enter 确认重启'
            ]
          }
        ],
        tips: [
          '所有可选配置均可后续通过 openclaw configure 重新设置',
          '技能插件可通过 openclaw skills install <名称> 单独安装'
        ]
      },
      {
        title: '验证与连接',
        content: '安装配置完成后，验证服务是否正常运行。',
        steps: [
          {
            title: '验证安装版本',
            description: '检查 OpenClaw 是否安装成功',
            code: 'openclaw --version'
          },
          {
            title: '访问 Gateway 仪表盘',
            description: '打开浏览器访问本地 Gateway 服务',
            items: [
              '默认地址：127.0.0.1:18789',
              '需要在 openclaw.json 中查看 Gateway token',
              '输入 token 完成认证后即可使用'
            ]
          },
          {
            title: '飞书配对',
            description: '将飞书机器人与 OpenClaw 配对连接',
            code: '# 在飞书中与机器人对话获取配对码\n# 然后在命令行中批准配对\nopenclaw pairing approve feishu <配对码>',
            items: [
              '在飞书中找到你的 OpenClaw 机器人',
              '发送任意消息获取配对码',
              '在命令行执行配对批准命令',
              '配对成功后即可在飞书中与 AI 对话'
            ]
          }
        ],
        tips: [
          'Gateway 服务开机自启，无需手动启动',
          '飞书配对只需一次，后续直接对话即可'
        ],
        warnings: [
          '如果无法访问仪表盘，检查 18789 端口是否被占用',
          'Token 在 openclaw.json 中，务必妥善保管'
        ]
      },
      {
        title: '完整安装命令速查',
        content: '以下是从零开始的完整安装步骤命令汇总。',
        steps: [
          {
            title: '一键安装命令',
            description: '按顺序执行以下命令完成安装',
            code: '# 1. 创建工作区\nmkdir D:\\software\\openclaw\\workspace\n\n# 2. 配置环境变量（在系统属性中设置）\n# OPENCLAW_HOME = D:\\software\\openclaw\n# OPENCLAW_WORKSPACE = D:\\software\\openclaw\\workspace\n# OPENCLAW_CONFIG_PATH = D:\\software\\openclaw\\openclaw.json\n# OPENCLAW_STATE_DIR = D:\\software\\openclaw\n\n# 3. 安装 OpenClaw\nnpm install -g openclaw\n\n# 4. 运行配置向导\nopenclaw onboard --workspace D:\\software\\openclaw\\workspace --install-daemon\n\n# 5. 验证安装\nopenclaw --version\n\n# 6. 飞书配对\nopenclaw pairing approve feishu <配对码>'
          }
        ],
        tips: [
          '安装前确保 Node.js >= 22 且 Git Bash 已安装',
          '环境变量设置后需重启终端',
          '国内用户建议先设置 NPM 镜像'
        ]
      }
    ]
  },
  {
    id: 'openclaw-feishu',
    name: 'OpenClaw 接入飞书',
    desc: '基于飞书开放平台创建机器人，并通过 OpenClaw Feishu 插件把本地 AI 助手接入飞书对话',
    url: 'https://openclaw.ai',
    icon: '💬',
    badge: { text: '飞书', type: 'info' },
    sections: [
      {
        title: '创建飞书应用',
        content: '先在飞书开放平台创建企业自建应用。后续 OpenClaw 会通过这个应用的机器人能力接收消息并回复。',
        steps: [
          {
            title: '注册飞书开放平台账号',
            description: '打开飞书开放平台，按页面提示登录或注册账号。',
            image: '/images/tutorial/openclaw-feishu-p01-01.png',
            items: [
              '访问飞书开放平台',
              '使用飞书账号登录',
              '按提示完成开发者或企业相关信息确认'
            ]
          },
          {
            title: '创建企业自建应用',
            description: '在开发者后台创建企业自建应用，作为 OpenClaw 后续接入飞书的载体。',
            image: '/images/tutorial/openclaw-feishu-p01-02.png',
            items: [
              '进入开发者后台',
              '选择创建企业自建应用',
              '填写应用名称和基础信息',
              '创建完成后进入应用管理页面'
            ]
          }
        ],
        tips: [
          '这里创建的是企业自建应用，不是应用商店应用',
          '后续所有权限、机器人和事件配置都在这个应用里完成'
        ]
      },
      {
        title: '获取应用凭证',
        content: 'OpenClaw 需要使用飞书应用的 App ID 和 App Secret 完成鉴权。创建应用后先把这两个值记录下来。',
        steps: [
          {
            title: '进入凭证与基础信息',
            description: '在飞书开放平台应用详情页中找到应用凭证区域。',
            image: '/images/tutorial/openclaw-feishu-p02-01.png',
            items: [
              '进入刚创建的应用',
              '打开凭证与基础信息页面',
              '找到 App ID 和 App Secret'
            ]
          },
          {
            title: '记录 App ID 和 App Secret',
            description: '复制并保存 App ID 和 App Secret，后续配置 OpenClaw Feishu 插件时会用到。',
            image: '/images/tutorial/openclaw-feishu-p02-02.png',
            items: [
              'App ID 用于标识当前飞书应用',
              'App Secret 用于服务端鉴权',
              '建议保存到本地安全位置，不要公开截图或上传仓库'
            ],
            warning: 'App Secret 属于敏感凭证，不要发到公开聊天、文档或代码仓库。'
          }
        ]
      },
      {
        title: '添加机器人能力',
        content: '飞书应用需要先添加机器人能力，才能在飞书会话里接收用户消息并返回 OpenClaw 的响应。',
        steps: [
          {
            title: '打开添加应用能力',
            description: '在应用能力配置区域点击添加能力。',
            image: '/images/tutorial/openclaw-feishu-p03-01.png',
            items: [
              '进入应用能力页面',
              '点击添加应用能力',
              '准备添加机器人能力'
            ]
          },
          {
            title: '选择添加机器人',
            description: '在能力列表里选择机器人，并添加到当前应用。',
            image: '/images/tutorial/openclaw-feishu-p03-02.png',
            items: [
              '选择机器人能力',
              '确认添加',
              '添加后进入机器人相关配置'
            ]
          }
        ],
        tips: [
          '机器人能力是 OpenClaw 接入飞书聊天的核心入口',
          '如果没有添加机器人，后续即使权限正确也无法正常对话'
        ]
      },
      {
        title: '配置应用权限',
        content: '接入机器人后，需要开通聊天与群组相关权限。PDF 中特别强调：应用身份权限和用户权限都要开通。',
        steps: [
          {
            title: '进入权限配置',
            description: '打开权限管理页面，准备添加聊天与群组权限。',
            image: '/images/tutorial/openclaw-feishu-p04-01.png',
            items: [
              '进入权限管理',
              '切换到应用身份权限和用户权限相关区域',
              '搜索 im: 快速定位消息权限'
            ]
          },
          {
            title: '添加聊天与群组权限',
            description: '按需选择接收消息、发送消息、群组相关权限，并确保应用身份权限和用户权限都已开通。',
            image: '/images/tutorial/openclaw-feishu-p04-02.png',
            items: [
              '搜索 im: 统一筛选消息相关权限',
              '添加聊天消息权限',
              '添加群组相关权限',
              '同时检查应用身份权限和用户权限'
            ],
            warning: '只开通其中一类权限可能导致机器人能配置成功，但收发消息异常。'
          },
          {
            title: '点击开通权限',
            description: '权限选择完成后点击开通权限，并在确认弹窗里完成授权。',
            image: '/images/tutorial/openclaw-feishu-p05-01.png',
            items: [
              '检查已选权限',
              '点击开通权限',
              '在确认弹窗里继续确认'
            ]
          }
        ]
      },
      {
        title: '启用机器人能力',
        content: '机器人保存前需要先准备长连接。PDF 中说明：直接点击保存会失败，需要先运行一个长连接，再回到页面保存。',
        steps: [
          {
            title: '进入机器人配置',
            description: '回到机器人能力配置页，页面会提示需要配置订阅方式或长连接。',
            image: '/images/tutorial/openclaw-feishu-p06-01.png',
            items: [
              '打开机器人能力配置',
              '查看页面提示',
              '点击弹出文本里的超链接'
            ]
          },
          {
            title: '按 Python 形式创建长连接',
            description: '根据页面引导，使用 Python 形式创建长连接。长连接运行后再回到飞书开放平台保存配置。',
            image: '/images/tutorial/openclaw-feishu-p06-02.png',
            items: [
              '按飞书页面提示选择 Python 形式',
              '保持长连接运行',
              '再回到机器人配置页面继续保存'
            ],
            warning: '如果没有先运行长连接，直接保存机器人配置可能会失败。'
          },
          {
            title: '选择订阅方式并保存',
            description: '点击订阅方式，完成机器人能力保存。',
            image: '/images/tutorial/openclaw-feishu-p07-01.png',
            items: [
              '点击订阅方式',
              '确认当前配置',
              '点击保存'
            ]
          },
          {
            title: '确认保存成功',
            description: '保存后确认页面没有报错，机器人能力已启用。',
            image: '/images/tutorial/openclaw-feishu-p07-02.png',
            items: [
              '查看保存结果',
              '如果失败，先确认长连接是否仍在运行',
              '确认权限是否已经开通'
            ]
          }
        ]
      },
      {
        title: '添加接收消息事件',
        content: '飞书应用部分最后需要添加接收消息事件，让机器人可以收到用户在飞书里发送的普通消息。',
        steps: [
          {
            title: '点击添加事件',
            description: '进入事件订阅配置，点击添加事件。',
            image: '/images/tutorial/openclaw-feishu-p08-01.png',
            items: [
              '进入事件订阅页面',
              '点击添加事件',
              '准备搜索消息事件'
            ]
          },
          {
            title: '搜索并添加接收消息',
            description: '搜索接收消息，选择对应事件并添加。',
            image: '/images/tutorial/openclaw-feishu-p08-02.png',
            items: [
              '搜索接收消息',
              '选择消息接收事件',
              '点击添加',
              '完成后飞书应用部分配置结束'
            ]
          }
        ],
        tips: [
          '到这一步，飞书开放平台侧的应用、机器人、权限和事件已经配置完成',
          '接下来切换到 OpenClaw 侧安装和配置 Feishu 插件'
        ]
      },
      {
        title: '安装 Feishu 插件',
        content: '飞书应用配置完成后，在 OpenClaw 所在环境安装 Feishu 插件。PDF 中使用 WSL 执行安装命令。',
        steps: [
          {
            title: '在 WSL 下安装插件',
            description: '打开 WSL 终端，执行 OpenClaw Feishu 插件安装命令。',
            image: '/images/tutorial/openclaw-feishu-p09-01.png',
            code: 'openclaw plugins install @openclaw/feishu',
            items: [
              '确保 OpenClaw 已经安装完成',
              '在 WSL 或当前 OpenClaw 运行环境执行命令',
              '等待插件安装完成'
            ]
          },
          {
            title: '确认插件安装完成',
            description: '安装完成后继续进入 OpenClaw 的插件配置向导。',
            image: '/images/tutorial/openclaw-feishu-p09-02.png',
            items: [
              '观察终端输出是否有明显报错',
              '如果下载失败，先检查网络和 npm 源',
              '安装成功后开始配置 App ID 和 App Secret'
            ]
          }
        ]
      },
      {
        title: '通过向导配置',
        content: '推荐使用 OpenClaw 的向导完成飞书插件配置，按截图依次填入前面保存的 App ID 和 App Secret。',
        steps: [
          {
            title: '启动插件配置向导',
            description: '进入 OpenClaw 插件配置流程，选择 Feishu 插件。',
            image: '/images/tutorial/openclaw-feishu-p10-01.png',
            items: [
              '选择 Feishu 插件',
              '进入交互式配置',
              '按提示继续'
            ]
          },
          {
            title: '填写飞书应用凭证',
            description: '按向导提示填入飞书开放平台里的 App ID 和 App Secret。',
            image: '/images/tutorial/openclaw-feishu-p11-01.png',
            items: [
              '填入 App ID',
              '填入 App Secret',
              '检查没有复制多余空格',
              '保存配置'
            ],
            warning: '如果 App ID 或 App Secret 填错，后续网关可以启动，但飞书消息无法正常鉴权。'
          }
        ],
        tips: [
          '新手优先使用向导配置，减少手动编辑配置文件的格式错误',
          '配置完成后再启动 gateway 做真实消息测试'
        ]
      },
      {
        title: '通过配置文件配置（可选）',
        content: '如果熟悉配置文件，也可以直接编辑 OpenClaw 配置。此方式适合已经明确配置结构的用户。',
        steps: [
          {
            title: '打开配置文件',
            description: '找到 OpenClaw 配置文件，定位 Feishu 插件相关配置。',
            image: '/images/tutorial/openclaw-feishu-p12-01.png',
            items: [
              '先备份原配置文件',
              '找到 Feishu 插件配置区域',
              '确认字段位置和 JSON 格式'
            ]
          },
          {
            title: '写入飞书应用信息',
            description: '把 App ID 和 App Secret 写入配置，并保存文件。',
            image: '/images/tutorial/openclaw-feishu-p12-02.png',
            items: [
              '填写 App ID',
              '填写 App Secret',
              '保存后检查 JSON 或配置格式是否有效',
              '不熟悉配置文件时优先回到向导方式'
            ],
            warning: '手动配置最常见的问题是逗号、引号或缩进错误。保存前建议先备份。'
          }
        ]
      },
      {
        title: '启动并测试',
        content: '配置完成后启动 OpenClaw Gateway，在飞书里找到机器人发送普通消息，并完成配对授权。',
        steps: [
          {
            title: '启动网关',
            description: '在终端启动 OpenClaw Gateway，让飞书插件开始监听和处理消息。',
            image: '/images/tutorial/openclaw-feishu-p13-01.png',
            code: 'openclaw gateway',
            items: [
              '保持 gateway 进程运行',
              '确认终端没有报错',
              '启动后再到飞书里测试机器人'
            ]
          },
          {
            title: '发送测试消息',
            description: '在飞书中找到刚创建的机器人，发送一条普通消息。',
            image: '/images/tutorial/openclaw-feishu-p13-02.png',
            items: [
              '打开飞书客户端',
              '找到创建的机器人',
              '发送一条普通消息',
              '默认情况下机器人会回复一个配对码'
            ]
          },
          {
            title: '批准配对码',
            description: '复制机器人返回的配对码，在终端执行批准命令。批准后即可正常与机器人对话。',
            code: 'openclaw pairing approve feishu <配对码>',
            items: [
              '把 <配对码> 替换成飞书机器人实际返回的代码',
              '执行批准命令',
              '回到飞书再次发送消息测试',
              '能正常回复即代表 OpenClaw 接入飞书完成'
            ]
          }
        ],
        tips: [
          '第一次对话需要配对授权，完成后即可正常使用',
          '如果飞书没有收到回复，优先检查 gateway 是否仍在运行、App ID 和 App Secret 是否正确、权限和事件是否完整'
        ]
      }
    ]
  },
  {
    id: 'claudian-obsidian',
    name: 'Claudian Obsidian 插件',
    desc: '在Obsidian中直接使用Claude AI助手，结合笔记与AI提升效率',
    url: 'https://github.com/YishenTu/claudian',
    icon: '📝',
    badge: { text: '插件', type: 'info' },
    sections: [
      {
        title: '前提条件',
        content: '在开始安装 Claudian 插件之前，请确保已完成以下准备工作。',
        steps: [
          {
            title: '确认已完成前置准备',
            description: '以下三项必须提前完成',
            items: [
              '已安装 Claude Code 命令行工具',
              '已配置 DeepSeek API',
              'Obsidian 已安装并运行正常'
            ],
            warning: '如果未完成 Claude Code 安装，请先参考 Claude Code 安装教程'
          }
        ]
      },
      {
        title: '下载 Claudian 插件文件',
        content: '从 GitHub 发布页面下载插件的三个必需文件。',
        steps: [
          {
            title: '下载插件文件',
            description: '访问 Claudian 插件 GitHub 发布页面下载所需文件',
            items: [
              '打开浏览器，访问 Claudian 插件的 GitHub 发布页面',
              '地址：https://github.com/YishenTu/claudian/releases/latest',
              '下载以下三个必需文件：'
            ],
            code: '# 需要下载的三个文件\nmain.js          # 插件主程序\nmanifest.json    # 插件配置文件\nstyles.css       # 插件样式文件'
          }
        ]
      },
      {
        title: '放置插件文件',
        content: '将下载的插件文件放到 Obsidian 的插件目录中。',
        steps: [
          {
            title: '找到插件目录',
            description: '通过 Obsidian 设置打开插件文件夹',
            items: [
              '打开 Obsidian，进入任意笔记仓库',
              '点击左下角的设置图标（齿轮形状）',
              '在左侧菜单中，选择「第三方插件」',
              '点击「打开插件文件夹」图标'
            ]
          },
          {
            title: '放置插件文件',
            description: '在 plugins 文件夹内创建 claudian 目录并放入文件',
            items: [
              '在打开的 plugins 文件夹内，新建文件夹命名为 claudian',
              '将下载的 main.js、manifest.json、styles.css 复制到 claudian 文件夹内',
              '回到 Obsidian，在设置 → 第三方插件页面中点击「重新加载插件」',
              '在插件列表中找到 Claudian，启用插件（切换开关）'
            ]
          }
        ],
        tips: [
          '文件结构参考：.obsidian/plugins/claudian/ 下应有 main.js、manifest.json、styles.css 三个文件'
        ]
      },
      {
        title: '配置 Claudian 连接 Claude Code',
        content: '设置 Claudian 插件连接到本地安装的 Claude Code。',
        steps: [
          {
            title: '设置 Client Path',
            description: '将 Claude Code 的安装路径填入 Claudian 设置',
            items: [
              '在 Obsidian 中，进入 Claudian 插件的设置页面（设置 → Claudian）',
              '找到「Client Path」或「Claude CLI Path」输入框',
              '打开 Git Bash，输入命令获取 Claude Code 路径',
            ],
            code: '# 获取 Claude Code 安装路径\nwhich claude\n# 返回示例：/c/Users/你的用户名/AppData/Roaming/npm/claude',
          },
          {
            title: '完成路径配置',
            description: '将路径粘贴到 Claudian 设置中',
            items: [
              '复制 which claude 返回的路径',
              '粘贴到 Obsidian 的 Client Path 输入框中',
              '点击「保存」按钮'
            ]
          }
        ]
      },
      {
        title: '配置 DeepSeek API 环境变量',
        content: '为了让 Obsidian 能读取 API 配置，需要在 Windows 系统中设置环境变量。',
        steps: [
          {
            title: '设置系统环境变量',
            description: '在 Windows 系统环境变量中添加 DeepSeek API 配置',
            items: [
              '按 Win + S 搜索「编辑系统环境变量」并打开',
              '点击「环境变量」按钮',
              '在「用户变量」区域点击「新建」'
            ],
            code: '# 依次创建以下三个环境变量\n# 变量名                    变量值\nANTHROPIC_BASE_URL     https://api.deepseek.com/anthropic\nANTHROPIC_AUTH_TOKEN   你的DeepSeek API Key\nANTHROPIC_MODEL        deepseek-v4-flash',
          },
          {
            title: '保存并重启',
            description: '保存环境变量后重启 Obsidian',
            items: [
              '点击「确定」保存所有更改',
              '完全关闭 Obsidian（不只是最小化）',
              '重新打开 Obsidian',
              '更彻底的方法：重启电脑'
            ]
          }
        ],
        warnings: [
          '环境变量设置后必须重启 Obsidian 才能生效',
          'API Key 务必保密，不要泄露'
        ]
      },
      {
        title: '测试 Claudian 插件',
        content: '验证插件是否安装配置成功。',
        steps: [
          {
            title: '测试对话',
            description: '在 Obsidian 中与 Claudian 对话测试',
            items: [
              '在 Obsidian 界面中找到 Claudian 插件图标（机器人头像）',
              '通常在右侧边栏或左侧边栏',
              '点击机器人图标，打开 Claudian 对话窗口',
              '输入测试问题，例如：你好，请用中文介绍一下自己',
              '如果收到回复，说明安装成功！'
            ]
          }
        ],
        tips: [
          '如果图标不显示，检查插件是否已启用（设置 → 第三方插件）',
          '尝试重启 Obsidian'
        ]
      },
      {
        title: '常见问题排查',
        content: '安装过程中可能遇到的问题及解决方案。',
        steps: [
          {
            title: 'Claude CLI not found',
            description: 'Obsidian 中 Claudian 报错找不到 Claude CLI',
            items: [
              '检查 Client Path 是否正确',
              '重新执行 which claude 命令确认路径',
              '确保路径中不包含多余的空格或特殊字符'
            ]
          },
          {
            title: '环境变量设置了但 Obsidian 读不到',
            description: '系统环境变量未生效',
            items: [
              '完全关闭 Obsidian 再重新打开',
              '如果仍无效，重启电脑',
              '在 Git Bash 中测试：echo $ANTHROPIC_AUTH_TOKEN'
            ]
          },
          {
            title: 'API 返回错误',
            description: '调用 API 时出错',
            items: [
              '确认 API Key 是否正确',
              '检查网络连接',
              '确认 DeepSeek API 服务是否正常'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'hermes-agent',
    name: 'Hermes Agent',
    desc: 'Nous Research 开源 AI Agent 安装与初始化教程，覆盖一键安装、模型配置、健康检查和常见问题排查',
    url: 'https://github.com/NousResearch/hermes-agent',
    icon: '🪽',
    badge: { text: 'Agent', type: 'warning' },
    sections: [
      {
        title: '先判断 Hermes Agent 适不适合你',
        content: 'Hermes Agent 是 Nous Research 开源的终端 AI Agent。它不是单纯的聊天网页，而是可以在本机、WSL2 或服务器里运行的 Agent 工具，适合需要长期会话、工具调用、MCP、自动化任务和消息网关的用户。',
        steps: [
          {
            title: '适合的使用场景',
            description: '如果你想把 AI Agent 放进真实工作流里，Hermes Agent 会比单纯网页聊天更有价值。',
            image: '/images/tutorial/hermes-agent-overview.png',
            items: [
              '想在终端里使用可调用工具的 AI Agent',
              '需要连接 OpenAI、OpenRouter、Claude、Kimi、Qwen 或本地模型',
              '想尝试 MCP、Skills、记忆、定时任务或消息机器人',
              '愿意处理命令行、配置文件和 API Key'
            ]
          },
          {
            title: '首次安装目标',
            description: '第一次安装不要把所有功能都打开，先完成一个最小闭环。',
            items: [
              '先完成 CLI 对话，再考虑 Telegram、Discord、Slack 等网关',
              '先配置一个模型提供商，不要同时配置多个 fallback',
              '先用 hermes doctor 排查，再接入浏览器、MCP、自动化任务',
              'API Key 不要写进公开仓库或截图里'
            ],
            warning: 'Hermes Agent 有较强工具执行能力，建议先在个人目录或测试环境验证，确认权限边界后再用于重要项目。'
          }
        ],
        tips: [
          'Windows 原生安装目前已正式可用，CLI、TUI、gateway 和 tools 都能原生运行。若需要 dashboard 的 /chat 嵌入终端面板，仍建议使用 WSL2。',
          '如果你只是想购买和调用 API，不需要 Agent 工作流，可以先看本站的 API 购买教程和模型选择页面。'
        ]
      },
      {
        title: '准备安装环境',
        content: 'Hermes Agent 官方安装器会自动处理 uv、Python、Node.js、ripgrep、ffmpeg 等依赖。你需要先确认系统路径和网络环境正常。',
        steps: [
          {
            title: 'Linux / macOS / WSL2 前置检查',
            description: '官方推荐的一键安装路径适用于 Linux、macOS 和 Windows WSL2。',
            image: '/images/tutorial/hermes-agent-prereq.png',
            code: 'git --version',
            items: [
              '打开终端',
              '确认可以访问 GitHub',
              '确认 git 可用',
              '预留一点安装时间，首次安装会拉取依赖'
            ]
          },
          {
            title: 'Windows 原生安装前确认',
            description: 'Windows 10/11 可以使用官方 PowerShell 安装器或桌面安装包。',
            items: [
              '使用 PowerShell 或 Windows Terminal',
              '安装后需要重新打开一个终端窗口',
              '如果终端工具、路径或中文编码异常，改用 WSL2',
              'WSL2 和 Windows 原生安装可以并存，但配置目录不同'
            ]
          },
          {
            title: '准备一个模型提供商',
            description: '安装完成后最关键的一步是选择模型。先准备一个可用的 API Key 或本地模型端点。',
            items: [
              'OpenRouter、OpenAI、Anthropic、Kimi、Qwen、DeepSeek 等都可以作为候选',
              '本地模型需要确认端点、模型名和上下文长度',
              '官方建议使用至少 64K 上下文的模型',
              '先用便宜或稳定的模型跑通，再换更强模型'
            ]
          }
        ],
        warnings: [
          '不要把 API Key 粘贴到公开聊天记录、公开仓库或可被搜索引擎访问的页面。',
          '如果你在公司或服务器环境安装，先确认是否允许脚本安装依赖和执行命令。'
        ]
      },
      {
        title: 'Linux / macOS / WSL2 一键安装',
        content: '这是官方当前最推荐、最稳定的安装路径。安装器会克隆 Hermes Agent、创建环境、配置 hermes 命令，并进入后续设置流程。',
        steps: [
          {
            title: '运行官方安装脚本',
            description: '在 Linux、macOS 或 WSL2 终端中执行以下命令。',
            image: '/images/tutorial/hermes-agent-install.png',
            code: 'curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash',
            items: [
              '命令来自 Nous Research 官方仓库',
              '安装过程会下载依赖，网络慢时需要等待',
              '安装完成后先不要急着配置网关或 MCP',
              '只追求先跑通一次普通对话'
            ]
          },
          {
            title: '刷新终端环境',
            description: '安装完成后让当前 shell 读取新的 PATH。不同 shell 使用不同命令。',
            code: 'source ~/.bashrc\n# 或者\nsource ~/.zshrc',
            items: [
              '也可以直接关闭终端再重新打开',
              '如果提示 hermes: command not found，优先检查 PATH 是否刷新',
              'WSL2 中的配置通常在 ~/.hermes'
            ]
          },
          {
            title: '确认 hermes 命令可用',
            description: '先确认命令能被终端识别，再进入模型配置。',
            code: 'hermes --version\nhermes doctor',
            items: [
              'hermes --version 用来确认命令可执行',
              'hermes doctor 用来检查配置、依赖和环境问题',
              'doctor 报错时先按提示修复，不要继续叠加其它功能'
            ]
          },
          {
            title: 'pip 安装（最简单方式）',
            description: '如果你有 Python 3.11+ 环境，pip 安装是最简单的路径。',
            image: '/images/tutorial/hermes-agent-pip.png',
            code: 'pip install hermes-agent\nhermes postinstall',
            items: [
              'pip 安装后需要运行 hermes postinstall 补装 Node.js、浏览器依赖、ripgrep 和 ffmpeg',
              'PyPI 版本跟随 tagged release，不一定包含 main 分支最新提交',
              '想要最新版本仍用 curl git installer'
            ]
          }
        ],
        tips: [
          '第一次安装只追求能打开 Hermes 并跑通一次普通对话。',
          '服务器或无 sudo 环境安装时，浏览器相关系统依赖可能需要管理员单独处理。'
        ]
      },
      {
        title: 'Windows 原生安装方式',
        content: 'Windows 10/11 可以直接使用官方 PowerShell 安装器或桌面安装包，CLI、TUI、gateway 和 tools 都能原生运行。',
        steps: [
          {
            title: '在 PowerShell 里运行安装器',
            description: '打开 PowerShell 或 Windows Terminal，执行官方 Windows 安装命令。',
            image: '/images/tutorial/hermes-agent-install-windows.png',
            code: 'iex (irm https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1)',
            items: [
              '默认不需要管理员权限',
              '安装目录通常在 %LOCALAPPDATA%\\hermes',
              '安装器会把 hermes 加到用户 PATH',
              '安装完成后必须重新打开终端'
            ],
            warning: 'Windows 原生路径目前已正式可用。如果遇到 dashboard 的 /chat 嵌入终端面板问题，可以改用 WSL2。'
          },
          {
            title: '重新打开终端并验证',
            description: '新开 PowerShell 后运行版本和健康检查命令。',
            code: 'hermes --version\nhermes doctor',
            items: [
              '如果找不到命令，检查用户 PATH 是否生效',
              '如果 doctor 提示缺少配置，继续运行 hermes setup 或 hermes model',
              '如果中文输出或路径异常，先尝试 WSL2 版本'
            ]
          },
          {
            title: '桌面安装包（可选）',
            description: 'Nous 官方提供 Windows 桌面安装包，首次启动时自动完成依赖安装。',
            image: '/images/tutorial/hermes-agent-desktop.png',
            items: [
              '从官方安装页下载 Hermes Desktop .exe 安装包',
              '首次启动会调用 install.ps1 完成 uv、Python、Node.js 等依赖安装',
              '适合不想手动操作 PowerShell 的用户'
            ]
          }
        ],
        tips: [
          'WSL2 与 Windows 原生安装的数据目录不同，切换路径时不要混用配置文件。',
          '需要更像 Linux 的终端行为时，WSL2 更适合长期使用。'
        ]
      },
      {
        title: '配置模型提供商',
        content: '安装成功不代表 Hermes 已经能工作。你还需要配置一个模型提供商，并确认它能完成普通对话。',
        steps: [
          {
            title: '进入模型配置向导',
            description: 'Hermes 官方建议使用 hermes model 选择 LLM provider 和模型。',
            image: '/images/tutorial/hermes-agent-model.png',
            code: 'hermes model',
            items: [
              '只先配置一个你最确定能用的 provider',
              '按向导填写 API Key、Base URL 或 OAuth 登录',
              '确认模型名称没有拼写错误',
              '本地或自托管模型要确认 OpenAI-compatible 接口是否真实可用'
            ]
          },
          {
            title: '完整向导配置',
            description: '如果你不确定该配置哪些项，可以运行完整 setup 向导。',
            code: 'hermes setup',
            items: [
              'setup 会串起模型、工具和其它基础配置',
              '首次使用建议跟着向导走',
              '已经明确 provider 时，hermes model 更直接',
              '配置失败后先回到 hermes model，不要反复手改配置文件'
            ]
          },
          {
            title: '先做一次普通对话',
            description: '模型配置完成后，先发一个最小测试请求。',
            code: 'hermes chat -q "Say hello in one sentence."',
            items: [
              '能正常回复，说明模型和认证基本可用',
              '不能回复，先检查 Key、Base URL、模型名和额度',
              '不要在基础对话失败时继续配置 gateway、cron 或 MCP'
            ]
          },
          {
            title: 'Nous Portal 一键设置（可选）',
            description: '如果你不想逐个配置 API Key，可以用 Nous Portal 统一管理。',
            image: '/images/tutorial/hermes-agent-portal.png',
            code: 'hermes setup --portal\nhermes portal status',
            items: [
              'hermes setup --portal 会引导你通过 OAuth 登录 Nous Portal',
              'Portal 会自动配置 provider 和 Tool Gateway',
              'hermes portal status 用来检查路由状态',
              '适合不想手动管理多个 API Key 的用户'
            ]
          }
        ],
        warnings: [
          '如果使用 OpenRouter、OpenAI、Anthropic 等付费服务，先确认额度和计费方式。',
          '本地模型需要足够上下文窗口；过小的上下文会影响多步骤工具调用。'
        ]
      },
      {
        title: '用 hermes doctor 做健康检查',
        content: 'Hermes Agent 的排错顺序应该很清楚：先 doctor，再 model，再 setup。这样可以避免把配置问题误判成工具问题。',
        steps: [
          {
            title: '运行诊断命令',
            description: 'doctor 会检查缺失依赖、配置项和常见环境问题。',
            image: '/images/tutorial/hermes-agent-doctor.png',
            code: 'hermes doctor',
            items: [
              '如果提示 API key not set，回到 hermes model 配置 provider',
              '如果提示依赖缺失，按 doctor 输出修复',
              '修复后再重新运行 doctor',
              'doctor 通过后再做真实任务'
            ]
          },
          {
            title: '按顺序恢复到可用状态',
            description: '遇到问题时建议按以下顺序排查。',
            code: 'hermes doctor\nhermes model\nhermes setup\nhermes sessions list\nhermes --continue',
            items: [
              '先排配置和依赖，再排会话问题',
              '先确认普通聊天可用，再接入消息平台',
              '切换 profile 后如果找不到旧会话，检查 sessions list',
              '多 provider fallback 不稳定时，先关闭复杂路由'
            ]
          }
        ],
        tips: [
          '最小闭环是：安装成功、模型配置成功、doctor 通过、普通聊天能回复。',
          '只有完成最小闭环后，再考虑浏览器工具、MCP、消息网关、Skills 和自动化任务。'
        ]
      },
      {
        title: '常见问题排查',
        content: '下面是新手最容易遇到的问题。排查时不要同时改很多项，每次只改一个变量并重新测试。',
        steps: [
          {
            title: 'hermes: command not found',
            description: '终端找不到 hermes 命令通常是 PATH 没刷新。',
            items: [
              '关闭终端重新打开',
              'Linux / macOS / WSL2 执行 source ~/.bashrc 或 source ~/.zshrc',
              'Windows 检查用户 PATH 是否包含 Hermes 安装目录',
              '仍然失败时重新运行官方安装器并观察输出'
            ]
          },
          {
            title: 'API key not set 或 401/403',
            description: '认证失败通常来自 Key 没填、Key 过期、额度不足或 provider 选错。',
            items: [
              '重新运行 hermes model',
              '确认 API Key 没有多余空格',
              '确认当前账号有该模型调用权限',
              '确认 Base URL 和 provider 对应'
            ]
          },
          {
            title: '模型名错误或自托管端点不兼容',
            description: '如果 endpoint 能访问但回复异常，通常是模型名、接口路径或上下文长度不匹配。',
            items: [
              '先用 provider 官方控制台或 curl 单独测试端点',
              '确认接口是 OpenAI-compatible 还是专有格式',
              '确认模型上下文长度足够',
              '关闭复杂 fallback，先跑通单模型'
            ]
          },
          {
            title: 'Windows 原生路径异常',
            description: 'Windows 原生路径可能遇到编码、子进程或终端能力差异。',
            items: [
              '先重新打开 PowerShell',
              '确认安装目录在 %LOCALAPPDATA%\\hermes',
              '检查是否被安全软件拦截',
              '问题持续时改用 WSL2 安装路径'
            ]
          }
        ],
        tips: [
          '排错时先保留最简单的配置：一个 provider、一个模型、一个普通聊天请求。',
          '不要把 token、Key 或完整配置文件发到公开页面；需要求助时先脱敏。'
        ]
      },
      {
        title: '常用命令速查',
        content: '下面是安装和日常使用中最常用的命令。',
        steps: [
          {
            title: '核心命令',
            description: '安装、健康检查、模型配置和日常使用的最常用命令。',
            code: 'hermes --version          # 版本\nhermes doctor             # 健康检查\nhermes model              # 配置模型\nhermes setup              # 完整设置向导\nhermes chat -q "hello"    # 快速测试\nhermes update             # 更新到最新版'
          },
          {
            title: '扩展功能',
            description: '工具配置、Skills 管理、编辑器集成和 Web Dashboard 等进阶命令。',
            code: 'hermes tools              # 配置工具\nhermes skills browse      # 浏览 skills\nhermes skills search k8s  # 搜索 skills\nhermes skills install openai/skills/k8s  # 安装 skill\nhermes acp                # 编辑器集成\nhermes dashboard          # 启动 Web dashboard\nhermes auth               # 管理凭据'
          }
        ]
      }
    ]
  },
  {
    id: 'llm-wiki',
    name: 'LLM Wiki 知识编译器',
    desc: '将零散信息编译成结构化知识网络的AI驱动知识管理系统，基于Obsidian和Claude构建',
    url: 'https://github.com/jason-effi-lab/karpathy-llm-wiki-vault',
    icon: '🧠',
    badge: { text: '知识管理', type: 'info' },
    sections: [
      {
        title: '一、项目技术架构与实现细节',
        content: 'karpathy-llm-wiki-vault 是一个具体的知识库项目实现，其整体架构设计深刻体现了【编译思维】，核心目标是将零散、非结构化的原始信息通过自动化处理流程，转化为高度结构化、相互关联的知识网络。这一架构构建在 `Obsidian` 这款本地优先的知识管理工具之上，并深度集成了 `Claude AI` 作为核心的智能处理引擎。',
        steps: [
          {
            title: '核心理念：信息分层与编译流水线',
            description: '项目的架构根植于一个清晰的分层模型，将数据流动与价值提炼的过程具象化为不同的"层"，每一层都有明确的职责和权限设定。',
            items: [
              '原始输入层 `raw/`：充当项目的【只读收件箱】，用于临时存放未经处理的原始材料。对LLM只读',
              '知识编译层 `wiki/`：核心输出层，存放由AI提炼、归纳、链接后生成的【结构化知识】。LLM拥有完全写权限',
              '智能控制层 `.claude/skills/` 与 `CLAUDE.md`：定义AI如何理解和操作知识库的【行为规范和技能工具】',
              '资源管理层 `assets/`：统一的媒体资源仓库，存放图片、PDF等附件'
            ]
          },
          {
            title: '分层架构的核心思想',
            description: '这种分层架构确保了数据处理流程的【单向性与秩序性】：信息从 `raw/` 流入，经过 ingest 技能的处理，价值被萃取至 `wiki/`，而原始文件则被移至 `raw/09-archive/` 归档。体现了【"源码"与"编译产物"分离】的思想。',
            items: [
              '信息从 `raw/` 单向流入，经处理后提炼至 `wiki/`',
              '处理完毕的原始文件自动移至 `raw/09-archive/` 归档',
              '【"源码"与"编译产物"分离】，避免混杂',
              '数据处理流程具有单向性与秩序性'
            ]
          },
          {
            title: '实现范式：声明式配置与AI代理驱动',
            description: '该项目的技术实现细节主要体现在其配置化与代理驱动的范式上，而非传统意义上的编码。',
            items: [
              '声明式的架构规范 `CLAUDE.md` —— 项目的【"宪法"文件】，用自然语言编写的协议文档',
              '技能化的工作流 `.claude/skills/` —— 可复用的AI工作流模块，架构中的【"微服务"】',
              '与宿主环境 `Obsidian` 的深度集成 —— 利用Markdown存储、双向链接、官方技能扩展'
            ]
          },
          {
            title: 'CLAUDE.md——项目宪法',
            description: '这是项目的【"宪法"文件】，并非可执行代码，而是一份详细的自然语言协议文档。它定义了：',
            items: [
              '语言协议：整个知识库所使用的术语体系和写作风格',
              '读写权限：AI在 `raw/` 层仅可读，在 `wiki/` 层可读写，约束行为边界',
              'Wiki Schema：规定 `wiki/` 目录下 `concepts/`（概念）、`entities/`（实体）、`sources/`（摘要）、`syntheses/`（综合报告）等子目录的语义和用途',
              '操作指令：指导AI如何执行 `ingest`、`query` 等任务'
            ]
          },
          {
            title: '技能化的工作流',
            description: '在 `.claude/skills/` 目录下定义的一系列"技能"，构成了可复用的AI工作流模块。这些技能通过 Claude Code 环境被调用，是架构中的【"微服务"】。',
            items: [
              '`ingest`：实现了【编译流水线】。读取 `raw/` 收件箱中的新文件，根据 `CLAUDE.md` 规范提炼核心内容至 `wiki/sources/`，更新概念与实体页面，最后将原始文件移至 `archive/`',
              '`query`：实现了【知识检索与综合】。检索 `wiki/index.md` 全局索引，综合信息生成带有双向链接引用的答案，从"存储"到"调用"的完整闭环',
              '`lint`：实现了【系统维护】。检查知识库健康状况，修复死链、提示认知冲突、更新全局索引，确保知识网络的结构化质量'
            ]
          },
          {
            title: '与宿主环境（Obsidian）的深度集成',
            description: '架构充分利用了 `Obsidian` 的原生能力：',
            items: [
              '数据基石：所有知识均以 `Markdown` 文件形式存储，确保可移植性、版本控制（通过 `Git`）和长期可访问性',
              '链接网络：利用 `Obsidian` 原生的【双向链接】功能，自动构建知识节点间的关联网络',
              '官方技能扩展：集成 `obsidian-cli`、`defuddle` 等官方技能，将外部工具能力无缝接入自有流水线'
            ]
          }
        ],
        tips: [
          '该项目的技术架构是一个以"分层数据模型"为骨架、以"声明式协议"为灵魂、以【AI代理技能】为肌肉、以 `Obsidian` 本地知识库为载体的混合系统',
          '其实现细节不体现在代码逻辑的复杂性上，而体现在对【AI行为的精细引导】、对【知识结构的严谨定义】以及对【工具生态的巧妙融合】之中'
        ]
      },
      {
        title: '二、核心功能模块工作原理',
        content: '本系统的核心功能围绕【"知识编译流水线"】展开，所有工作由 `.claude/skills/` 目录下的特定技能模块驱动。这些模块并非传统意义上的代码程序，而是 `Claude Code` 环境下可调用的AI工作流，它们依据 `CLAUDE.md` 定义的语义协议与权限，协同完成从原始信息摄入到结构化知识调用与维护的闭环。',
        steps: [
          {
            title: '"ingest"模块：知识编译主程',
            description: '`ingest` 技能是知识流水线的【核心处理引擎】，负责将收件箱中的原始素材"编译"为结构化的知识笔记。',
            items: [
              '触发与输入：执行 `/ingest` 命令触发，自动扫描 `raw/` 目录（包括 `01-articles/`、`02-papers/`、`03-transcripts/`、`04-meeting_notes/` 等子目录）',
              '内容提炼：深度阅读与分析文本，提取核心观点、关键论据和重要数据',
              '分类归档：将信息分类写入 `wiki/` 知识库——`sources/`（摘要笔记）、`concepts/` 与 `entities/`（概念与实体页面）',
              '索引更新：将新笔记及链接关系更新至 `wiki/index.md`，维护全局索引完整性',
              '自动归档：处理完成后将原始文件从 `raw/` 移至 `raw/09-archive/`，确保收件箱保持清爽'
            ]
          },
          {
            title: '"query"模块：知识检索与综合',
            description: '`query` 技能实现了基于已编译知识库的【智能检索与综合回答】。',
            items: [
              '触发与输入：通过 `/query <问题>` 命令触发',
              '索引定位：检索 `wiki/index.md` 全局索引，快速定位相关笔记页面',
              '内容综合：阅读并综合相关笔记内容，而非简单关键词匹配',
              '链接引用：答案包含【双向链接】，可直接跳转至相关概念或来源页面',
              '产出沉淀：高质量query结果建议保存为新的Wiki页面（如 `wiki/syntheses/`），实现【每次提问都在增厚知识库】'
            ]
          },
          {
            title: '"lint"模块：知识库健康维护',
            description: '`lint` 技能定期检查知识库的结构完整性，确保知识网络持续处于【健康状态】。',
            items: [
              '修复死链：发现并修复指向不存在页面的【无效内部链接】',
              '补充索引：将未被 `wiki/index.md` 收录的新页面补充进全局索引',
              '发现矛盾：识别不同页面间对同一事实的【矛盾描述】，并提示用户或自动修正',
              '发现孤儿页面：找出没有其他页面链接到的【孤立内容】，建立必要的关联'
            ]
          },
          {
            title: '官方技能集成',
            description: '`Obsidian` 官方提供的基础设施技能，作为自定义技能的底层依赖。',
            items: [
              '`obsidian-cli`：提供调用 `Obsidian` 原生API（如检索、打开页面）的能力，是自定义技能的底层依赖',
              '`defuddle`：将网页URL自动清理并转化为干净的Markdown文件，直接存入 `raw/` 目录，是信息输入的入口工具之一'
            ]
          },
          {
            title: '模块协同工作流',
            description: '整个流水线的核心任务是【"将碎片化的信息编译成结构化、高度相互链接的知识网络"】。三大自定义模块分别承担了编译主程、检索调用和系统维护职能，与两个官方技能共同构成一套完整的【知识操作系统】。',
            items: [
              '`defuddle` 将外部信息输入 `raw/` 收件箱',
              '`ingest` 从 `raw/` 编译至 `wiki/`，构建知识网络',
              '`query` 基于 `wiki/` 检索知识并生成综合答案',
              '`lint` 维护 `wiki/` 知识库的结构健康',
              '四个模块形成完整闭环：【输入→编译→查询→维护】'
            ]
          }
        ]
      },
      {
        title: '三、代码结构与关键技术点',
        content: 'karpathy-llm-wiki-vault 的技术实现核心在于【"用结构约定代替程序代码，用协议文件驱动AI行为"】。其代码结构即是数据结构和操作规范的蓝图，而关键技术点则体现在通过 `CLAUDE.md` 和技能对大型语言模型进行精确定制与调度，从而在纯文本文件系统之上，实现了一个自动化、结构化的个人知识编译与检索系统。',
        steps: [
          {
            title: '目录结构总览',
            description: '项目的文件组织本身就是架构设计的重要组成部分：',
            items: [
              '`CLAUDE.md` — 项目宪法：定义术语、权限、Wiki Schema和操作指令',
              '`raw/` — 原始输入层：`01-articles/`、`02-papers/`、`03-transcripts/`、`04-meeting_notes/`、`09-archive/`',
              '`wiki/` — 知识编译层：`concepts/`（概念）、`entities/`（实体）、`sources/`（摘要）、`syntheses/`（综合）、`index.md`（全局索引）',
              '`assets/` — 资源管理层：统一媒体资源仓库',
              '`.claude/skills/ingest/` — 编译技能目录',
              '`.claude/skills/query/` — 检索技能目录',
              '`.claude/skills/lint/` — 维护技能目录',
              '`.claude/skills/obsidian-cli/` — Obsidian官方技能：调用原生API',
              '`.claude/skills/defuddle/` — Obsidian官方技能：网页清理与剪藏'
            ]
          },
          {
            title: '声明式文件协议与心智规范（CLAUDE.md）',
            description: '这是系统运行的【"宪法"】。它不包含可执行代码，而是通过自然语言明确定义了：',
            items: [
              '术语表：什么是 `concept`，什么是 `entity`，什么是 `source`',
              '权限边界：LLM可以在 `wiki/` 下任意创建、编辑文件，但 `raw/` 和 `assets/` 是【只读】的',
              'Wiki Schema（模板）：规定生成 `concept` 或 `entity` 笔记时应遵循的固定结构',
              '操作指令：指导LLM如何执行 `ingest`、`query` 等任务',
              '这种设计将复杂的程序逻辑转化为对AI模型的【精确提示（Prompt）】，使得系统行为可通过修改这个声明式文件进行配置和调整'
            ]
          },
          {
            title: '技能（Skill）模块化机制',
            description: '在 `.claude/skills/` 目录下的每个子目录都代表一个可被 `Claude Code` 直接调用的AI工作流。每个技能内部包含了执行该任务所需的完整上下文、步骤规划和Prompt设计。',
            items: [
              '`obsidian-cli` 和 `defuddle` 作为官方技能，提供了与 `Obsidian` 环境和外部网络交互的底层能力',
              '自定义技能能专注于【高层级的认知任务】（如总结、关联、推理）',
              '技能之间通过共享的 `wiki/` 数据层和 `CLAUDE.md` 协议实现协同'
            ]
          },
          {
            title: '基于纯文本与双向链接的知识网络',
            description: '系统完全构建在 `Markdown` 这一纯文本格式之上。所有知识节点（`wiki/` 下的文件）都通过 `Obsidian` 原生的 `[[双向链接]]` 语法相互连接。',
            items: [
              '`wiki/index.md` 文件充当了一个人工维护的、机器可读的【总索引】',
              '`/query` 技能首先查阅此索引来快速定位相关笔记，而非进行全库模糊搜索',
              '这大大提高了检索的【准确性和效率】',
              '双向链接使知识节点间自动形成【关联网络】'
            ]
          },
          {
            title: '数据持久化与版本控制',
            description: '整个知识库（`raw/`、`wiki/`、`assets/`、`CLAUDE.md`）就是一个标准的 `Git` 仓库。所有知识的增删改查、AI的操作历史都以文本形式保存，天然支持Git的版本管理。',
            items: [
              '用户可以【回滚到任何历史状态】',
              '清晰地追踪知识演变和AI生成内容的变迁',
              '无需依赖向量数据库或特定云端服务',
              '实现知识的完整历史追溯和跨设备同步'
            ]
          }
        ]
      },
      {
        title: '四、面向普通用户的使用方法与操作步骤',
        content: '本项目的设计目标是将用户从繁琐的知识整理工作中解放出来，通过清晰的架构和简单的命令，实现知识的自动"编译"与持续增值。普通用户无需编写代码，只需与图形界面（`Obsidian`）和命令行（`Claude Code`）交互，即可完成从信息收集到知识应用的全流程。',
        steps: [
          {
            title: '第一步：环境准备与知识库初始化',
            description: '要开始使用，您需要完成以下基础准备工作：',
            items: [
              '安装核心软件：安装 `Obsidian` 桌面端应用，它是浏览和管理知识库的【"IDE"】',
              '确保拥有 `Claude Code` 或 `Claudian` 插件，这是驱动AI执行核心操作的【"引擎"】',
              '获取知识库模板：从 GitHub 克隆 `jason-effi-lab/karpathy-llm-wiki-vault` 仓库到本地',
              '关联与配置：打开 `Obsidian`，选择"打开库"，指向 `LLM-Wiki-Vault` 文件夹',
              '确保已启用 `Claude Code` 或 `Claudian` 插件，系统预置的目录结构和技能将自动生效'
            ],
            code: '# 克隆知识库模板\ngit clone https://github.com/jason-effi-lab/karpathy-llm-wiki-vault.git'
          },
          {
            title: '知识库核心结构一览',
            description: '完成初始化后，您的知识库已经就绪。其核心结构清晰可见：',
            items: [
              '`assets/`：统一存放图片、PDF等附件',
              '`raw/`：您的【"收件箱"】，用于存放待处理的原始资料',
              '`wiki/`：AI生成的【"成品知识库"】，供您阅读和探索',
              '`CLAUDE.md`：系统的【"宪法"】，定义了AI的行为规范（普通用户通常只需阅读，必要时微调）'
            ]
          },
          {
            title: '阶段一：收集——将信息放入"收件箱"',
            description: '这是工作的起点，将任何格式的原始资料放入 `raw/` 目录下的对应子文件夹中。',
            items: [
              '自动化收集（推荐）：遇到有价值的网页时，执行 `/defuddle <网页URL>`。自动清理网页噪音，转化为干净的Markdown存入 `raw/01-articles/`',
              '手动收集——`raw/01-articles/`：技术文章、博客',
              '手动收集——`raw/02-papers/`：学术论文、行业研报',
              '手动收集——`raw/03-transcripts/`：播客、视频转录文本',
              '手动收集——`raw/04-meeting_notes/`：头脑风暴或会议纪要'
            ],
            code: '# 自动收集（推荐）：一键剪藏网页\n/defuddle https://example.com/article\n# 自动清理网页噪音，转为Markdown存入 raw/01-articles/'
          },
          {
            title: '阶段二：编译——让AI消化资料，构建知识网络',
            description: '当 `raw/` 收件箱中积累了新文件后，执行核心的编译命令：`/ingest`。AI将自动执行以下工作：',
            items: [
              '1. 读取 `raw/` 目录下的新文件',
              '2. 提炼核心观点，在 `wiki/sources/` 下生成一对一的摘要页',
              '3. 识别并更新相关的概念（`wiki/concepts/`）、实体（`wiki/entities/`）页面，建立【双向链接】',
              '4. 更新全局索引文件 `wiki/index.md`',
              '5. 自动归档：将源文件从 `raw/` 移至 `raw/09-archive/`'
            ],
            code: '# 编译收件箱\n/ingest'
          },
          {
            title: '阶段三：应用——查询与使用已编译的知识',
            description: '当您需要研究某个问题或回忆某个概念时，无需手动翻找。输入：`/query <您的问题>`。',
            items: [
              'AI将基于已编译的 `wiki/` 知识库进行回答',
              '1. 检索 `wiki/index.md` 找到相关页面',
              '2. 综合阅读这些页面的内容',
              '3. 生成一个带有【双向链接引用】、逻辑完整的答案',
              '关键实践：高质量答案应保存为新页面（如 `wiki/syntheses/`），实现【"每次提问都在增厚知识库"】的复利效应'
            ],
            code: '# 智能问答\n/query 对比一下 Transformer 和 RNN 的优缺点'
          },
          {
            title: '阶段四：维护——让知识库保持健康与活力',
            description: '定期对知识库进行"体检"，确保其结构完整、内容一致。输入：`/lint`。',
            items: [
              '1. 修复死链：发现并修复无效的内部链接',
              '2. 补充索引：将未收录的新页面加入 `wiki/index.md`',
              '3. 发现矛盾：识别不同页面间的矛盾描述',
              '4. 找出孤儿页面：发现未被引用的孤立内容'
            ],
            code: '# 知识库体检\n/lint'
          }
        ],
        tips: [
          '一句话工作流：把资料扔进 `raw/` → 运行 `/ingest` → 在 `wiki/` 里阅读或 `/query` → 定期 `/lint` 体检',
          '高质量query结果应保存为新页面，实现【"每次提问都在增厚知识库"】的复利效应'
        ],
        warnings: [
          '在 `CLAUDE.md` 中明确规定"收到指令后立即执行所有步骤"，避免AI中途请求确认',
          '严格区分操作指令和源文件内容，防止AI误将文档描述当作操作指令执行'
        ]
      },
      {
        title: '五、2026年最新功能更新与社区实践',
        content: '自项目发布以来，LLM Wiki的模式在社区中引发了广泛共鸣，围绕【"知识编译"】的核心理念，涌现了一系列增强工具和最佳实践更新，进一步验证并拓展了这一架构的可行性与价值。',
        steps: [
          {
            title: '知识复利效应的验证与深化',
            description: '社区实践进一步验证了【"知识复利"】的核心价值主张：新资料能自动整合进现有知识网络，第100份资料建立在前99份的基础之上，使知识库的价值随使用量呈指数级增长。',
            items: [
              '自动整合：新资料能自动整合进现有知识网络',
              '复利积累：第100份资料建立在前99份的基础之上',
              '指数级增长：知识库的价值随使用量呈【指数级增长】',
              '人类角色转变：从"图书管理员"转变为【"知识策展人"和"使用者"】'
            ]
          },
          {
            title: '社区工具生态',
            description: '围绕LLM Wiki的核心理念，社区已衍生出多种【开源实现和增强工具】：',
            items: [
              '`Graphify`（开源命令行工具）：自动分析 `raw/` 目录中的文档，生成交互式知识图谱（`graph.html`）、核心概念报告及Obsidian兼容的Markdown文件。支持深度推理、增量更新模式',
              '`Obsidian`专属插件：将 `ingest`、`query`、`lint` 等核心操作深度集成到Obsidian命令面板中，实现【"LLM编译，人类浏览"】的无缝工作流',
              '多样的Agent技能包：将LLM Wiki模式封装成可调用的技能（如 `wiki-skills`），用户通过简单指令即可调用复杂的知识库操作'
            ]
          },
          {
            title: '核心操作的最佳实践更新',
            description: '针对 `ingest`、`query`、`lint` 三大核心操作，社区总结了更精细、可规避早期陷阱的【实践经验】。',
            items: [
              '`Ingest`的自动化与确定性——避坑指南：早期LLM容易陷入"只讨论不执行"的循环。最佳实践强调在 `CLAUDE.md` 中明确规定【"收到指令后立即自动执行所有步骤"】',
              '`Ingest`的内容隔离：需严格区分操作指令和源文件内容，防止LLM误将文档描述当作操作指令执行',
              '`Query`的产出沉淀制度：高质量query结果应保存为新的Wiki页面（如 `wiki/analysis/` 或 `wiki/syntheses/`），使有价值的分析得以沉淀',
              '`Lint`的系统化与主动化：定期运行lint检查四大类问题——页面间逻辑矛盾、过时内容、孤立页面、未建立独立页面的重要概念。使知识库具备【"自我修复"和"自我生长"】的潜力'
            ]
          },
          {
            title: '技术栈整合与生态位巩固',
            description: '2026年的实践进一步明确了LLM Wiki在个人知识管理生态中的【优势位置】：',
            items: [
              '`Obsidian`成为"编译产物"的完美前端：其双向链接和图谱视图（Graph View）能直观展示LLM构建的知识网络结构。`Obsidian CLI` 的发布使知识库能通过命令行被AI直接调用，成为【"可编程知识基础设施"】',
              '对小规模数据场景的重新评估：约100篇文章、40万字左右的"小规模"个人知识库场景下，LLM维护的 `index.md` 和摘要文件已能提供高效检索，【传统RAG的复杂向量检索可能并非必需】',
              '绝对的数据主权与可移植性：整个系统基于本地Markdown文件，无需依赖向量数据库或特定云端服务。配合 `Git` 进行版本控制，实现知识的完整历史追溯和跨设备同步'
            ]
          }
        ]
      },
      {
        title: '六、常见问题与解决方案',
        content: '在使用LLM Wiki知识编译器的过程中，用户可能会遇到以下常见问题。这里提供详细的【排查与解决思路】。',
        steps: [
          {
            title: 'Q1：LLM Wiki与传统RAG有什么本质区别？',
            description: 'LLM Wiki的核心差异在于【"编译"而非"检索"】的思维范式。',
            items: [
              '传统RAG类似【"解释器"】，每次查询都需从零开始检索原始文档碎片，知识未被结构化',
              'LLM Wiki是【"编译器"】，预先将资料编译成相互链接的Wiki，查询基于"熟知识"',
              '传统RAG中，第100份资料不会自动与前99份产生关联',
              'LLM Wiki中，新资料【自动整合进现有网络】，实现知识复利',
              '小规模场景（约100篇文章）下，LLM维护的 `index.md` 和摘要文件已能实现高效检索，引入向量数据库可能并非必需'
            ]
          },
          {
            title: 'Q2：如何快速开始使用LLM Wiki？',
            description: '只需三步即可上手：',
            items: [
              '1. 安装 `Obsidian` 和 `Claude Code`（或 `Claudian` 插件）',
              '2. 从GitHub克隆知识库模板：`git clone https://github.com/jason-effi-lab/karpathy-llm-wiki-vault.git`',
              '3. 在 `Obsidian` 中打开该文件夹，即可开始使用 `/ingest`、`/query`、`/lint` 命令'
            ],
            code: '# 快速开始三步走\ngit clone https://github.com/jason-effi-lab/karpathy-llm-wiki-vault.git\n# 在Obsidian中打开LLM-Wiki-Vault文件夹\n# 使用Claude Code执行核心命令\n/ingest\n/query 你的问题\n/lint'
          },
          {
            title: 'Q3：ingest 执行时AI不动或反复确认怎么办？',
            description: '这是最常见的【新手问题】，通常是因为 `CLAUDE.md` 中缺少明确的自动执行指令。',
            items: [
              '在 `CLAUDE.md` 中添加明确规定：【"收到/ingest指令后，立即自动执行所有步骤，不要请求确认"】',
              '确保指令和源文件内容严格隔离，防止AI误将文档描述当作操作指令',
              '检查 `CLAUDE.md` 中的权限设置，确认AI在 `wiki/` 目录下有写权限'
            ]
          },
          {
            title: 'Q4：lint 检查应该关注哪些问题？',
            description: '定期运行的lint操作应覆盖以下【明确的检查范围】：',
            items: [
              '1. 逻辑矛盾：发现不同页面间对同一事实的矛盾描述',
              '2. 过时内容：识别可能因时间而过时的信息',
              '3. 孤儿页面：找出没有其他页面链接到的孤立页面',
              '4. 未创建页面的重要概念：发现被频繁提及但尚未建立独立页面的【关键术语】'
            ]
          },
          {
            title: 'Q5：Obsidian的图谱视图显示混乱或链接不生效怎么办？',
            description: '链接问题通常由【语法不兼容】导致：',
            items: [
              '检查链接语法：确保Wiki层生成的Markdown文件使用 `Obsidian` 能识别的 `[[页面名]]` 维基链接语法',
              '使用兼容性工具：如果使用 `Graphify` 等外部工具，确保启用 `--obsidian` 等参数以生成完全兼容的链接格式',
              '刷新缓存：尝试重启 `Obsidian` 或使用"重新加载应用程序"功能，刷新图谱视图的缓存数据'
            ]
          },
          {
            title: 'Q6：知识库规模变大后，查询速度变慢怎么办？',
            description: '在小规模场景下无需过度担忧，大规模场景有【进阶路径】：',
            items: [
              '重新评估需求：约100篇文章、40万字的"小规模"个人知识库场景下，LLM维护的 `wiki/index.md` 和摘要文件已能实现高效检索，引入向量数据库等复杂RAG【可能并非必需】',
              '进阶路径1——为LLM开发专用工具：可以开发一个简单的命令行搜索引擎，让LLM在处理复杂查询时调用，提高效率',
              '进阶路径2——远期展望：利用高质量的结构化Wiki数据生成合成数据，对专属小模型进行【微调（Fine-tuning）】，将核心知识"内化"到模型权重中'
            ]
          },
          {
            title: 'Q7：如何最大化LLM Wiki的价值？',
            description: '核心在于【人类角色的重新定位】：',
            items: [
              '人类聚焦高杠杆工作：你的核心角色应转向【信息策展人】（筛选高质量输入）、【方向探索者】（提出关键问题）和【最终裁决者】',
              '将摘要、关联、格式化、一致性维护等"体力活"完全委托给LLM',
              '牢记系统定位：LLM Wiki是强大的【辅助外化工具】，能极大提升知识整理和关联的效率，但不能替代人类自身的深度思考',
              '最终的洞察力和创造力依然来源于你'
            ]
          },
          {
            title: 'Q8：初期效果不理想怎么办？',
            description: '效果优化是一个【迭代过程】：',
            items: [
              '效果上限高度依赖于【模型能力】与【提示词（CLAUDE.md）质量】',
              '初期需要投入时间"调教"你的系统规范，这是一个迭代过程',
              '从简单的规则开始，根据LLM的输出结果不断修正和完善你的"宪法"',
              '使其越来越符合你的工作习惯和知识领域要求'
            ]
          }
        ],
        tips: [
          '通过理解上述问题与方案，你可以更有信心地部署和优化你的知识编译系统，让AI真正成为一个不知疲劳的【知识架构师】',
          '如果你对某个功能的具体操作仍有疑问，建议回顾第四章与第五章中关于使用步骤和社区经验的详细说明'
        ]
      }
    ]
  }
];

export function getAppTutorialById(id: string) {
  return appTutorials.find(t => t.id === id);
}
