export interface ErrorSolution {
  id: string;
  title: string;
  shortTitle: string;
  statusLabel: string;
  summary: string;
  affectedArea: string;
  symptoms: string[];
  causes: string[];
  checklist: {
    label: string;
    detail: string;
  }[];
  apiSpecialCases: {
    api: string;
    note: string;
  }[];
  fixExamples: {
    title: string;
    language: string;
    code: string;
    explanation?: string;
  }[];
  relatedTutorialIds: string[];
}

export const errorSolutions: ErrorSolution[] = [
  {
    id: '401-unauthorized',
    title: '401 Unauthorized：API 调用未通过认证怎么解决',
    shortTitle: '401 Unauthorized',
    statusLabel: '认证失败',
    summary: '请求已经发到 API 服务，但服务端没有接受你的身份凭证。优先检查 API Key、请求头、环境变量和 Base URL 是否属于同一个平台。',
    affectedArea: 'API Key / Authorization Header',
    symptoms: [
      'HTTP 状态码返回 401，响应里出现 Unauthorized、invalid_api_key、Incorrect API key 或 authentication failed。',
      '同一段代码昨天能跑，今天突然全部失败，通常是 Key 被删除、过期、轮换或账号权限变化。',
      '控制台能正常登录，但 SDK、curl、Claude Code、Codex 或其他工具调用失败。',
      '返回的是 HTML 登录页或网关错误页，而不是 JSON 错误对象，说明请求可能打到了错误地址。'
    ],
    causes: [
      'Authorization 请求头缺失，或没有使用 Bearer 前缀。',
      '环境变量没有加载成功，代码实际传入的是空字符串、undefined 或旧 Key。',
      '复制 API Key 时带了空格、换行、引号，或只复制了部分内容。',
      '把 A 平台的 Key 用在 B 平台的 Base URL 上，例如 OpenAI Key 配了 DeepSeek Base URL。',
      'Key 被删除、禁用、泄露后被轮换，或创建在另一个项目/组织下。'
    ],
    checklist: [
      {
        label: '确认代码实际读到 Key',
        detail: '只打印长度和前后 4 位，不要打印完整 Key；长度为 0 或前缀不对时先修环境变量。'
      },
      {
        label: '确认请求头格式',
        detail: 'OpenAI 兼容接口通常是 Authorization: Bearer <API_KEY>；不要写成 Token、Basic 或只传裸 Key。'
      },
      {
        label: '确认 Key 和 Base URL 属于同一平台',
        detail: 'DeepSeek Key 配 https://api.deepseek.com，Kimi Key 配 https://api.moonshot.cn/v1，通义千问 Key 配 DashScope 兼容模式地址。'
      },
      {
        label: '重新生成一个最小权限测试 Key',
        detail: '如果新 Key 可用，旧 Key 就是被删、过期、权限错误或复制错误。'
      },
      {
        label: '用 curl 跳过业务代码测试',
        detail: '先用最小请求确认认证能通过，再回到 SDK 或工具配置。'
      }
    ],
    apiSpecialCases: [
      {
        api: 'OpenAI',
        note: 'ChatGPT Plus/Pro 订阅不等于 API 额度。API Key 还要确认所属 Project、组织和 Billing 状态。'
      },
      {
        api: 'Claude / Anthropic',
        note: '直连 Anthropic Messages API 使用 x-api-key 和 anthropic-version；不要把 Anthropic Key 当成 OpenAI Bearer Key 直接打 OpenAI 路径。'
      },
      {
        api: 'DeepSeek / Kimi / 通义千问',
        note: '这些平台常用 OpenAI 兼容 SDK，但 base_url 必须换成各自平台地址，Key 也必须来自同一个平台控制台。'
      },
      {
        api: '豆包火山方舟',
        note: 'model 经常是控制台里的推理接入点 ID；Key 正确但模型 ID 填错时也可能伴随认证或权限类错误。'
      }
    ],
    fixExamples: [
      {
        title: '用 curl 验证 Bearer Token 是否有效',
        language: 'bash',
        code: `export API_KEY="sk-替换成你的真实Key"
export BASE_URL="https://api.deepseek.com"

curl -i "$BASE_URL/v1/models" \\
  -H "Authorization: Bearer $API_KEY"`,
        explanation: '如果这里仍是 401，问题在 Key、Base URL 或账号权限，不在业务代码。'
      },
      {
        title: 'Python 中安全检查环境变量是否加载',
        language: 'python',
        code: `import os
from openai import OpenAI

api_key = (os.getenv("DEEPSEEK_API_KEY") or "").strip()
if not api_key:
    raise RuntimeError("DEEPSEEK_API_KEY 没有加载")

print("key_loaded", len(api_key), api_key[:4] + "..." + api_key[-4:])

client = OpenAI(api_key=api_key, base_url="https://api.deepseek.com")
print(client.models.list().data[0].id)`,
        explanation: '只打印脱敏信息，确认程序读到的是当前 Key。'
      }
    ],
    relatedTutorialIds: ['deepseek', 'openai', 'claude', 'kimi']
  },
  {
    id: '403-forbidden',
    title: '403 Forbidden：账号已认证但没有调用权限怎么解决',
    shortTitle: '403 Forbidden',
    statusLabel: '权限不足',
    summary: '403 通常表示 API Key 被识别了，但账号、项目、地区、模型或网络环境没有权限执行当前请求。',
    affectedArea: '模型权限 / 地区限制 / 项目权限',
    symptoms: [
      'HTTP 状态码返回 403，错误信息包含 Forbidden、permission denied、access denied 或 account not allowed。',
      '同一个 Key 可以调用便宜模型，但调用高阶模型、视觉模型或推理模型时报 403。',
      '控制台显示账号正常，但某个项目、区域、模型或接口路径不可用。',
      '换网络、换地区节点或换组织后错误表现不同。'
    ],
    causes: [
      '账号未完成实名认证、未开通对应 API 服务，或项目没有绑定计费方式。',
      '所选模型需要单独申请、白名单、企业权限或更高套餐。',
      '请求打到了错误区域的 endpoint，模型部署在另一个区域。',
      '账号所在国家/地区、代理 IP、账单地址触发平台风控。',
      'Key 属于只读、受限项目或旧项目，不能访问当前资源。'
    ],
    checklist: [
      {
        label: '先确认认证是否通过',
        detail: '401 是认证失败，403 是认证通过但无权限；先不要反复换 Key，先看权限和开通状态。'
      },
      {
        label: '到控制台检查服务开通',
        detail: '确认已开通模型服务、完成实名认证或 Billing，并且当前项目有调用权限。'
      },
      {
        label: '换成最基础模型测试',
        detail: '如果基础模型能跑，高阶模型 403，说明是模型权限或套餐问题。'
      },
      {
        label: '核对区域和 endpoint',
        detail: '云厂商常按地域区分接入地址，区域错了会出现权限或资源不存在。'
      },
      {
        label: '检查网络环境',
        detail: 'OpenAI、Claude、Gemini 等海外服务对地区、IP 稳定性和账单地址一致性更敏感。'
      }
    ],
    apiSpecialCases: [
      {
        api: 'OpenAI',
        note: '部分模型可能受 Project、组织或账户等级限制。先用当前 Project 可见的模型 ID 测试。'
      },
      {
        api: 'Claude',
        note: '地区、账号风控和支付环境影响很大。IP、账单地址和登录环境频繁变化时更容易被拒。'
      },
      {
        api: 'Google Gemini / Vertex AI',
        note: 'Google AI Studio Key、Google Cloud Project、Vertex AI API 开通状态是不同层级，403 时要检查项目和 API 是否启用。'
      },
      {
        api: '国内云厂商',
        note: '通义千问、腾讯混元、豆包、智谱等通常需要先在控制台开通服务、实名认证或购买资源包。'
      }
    ],
    fixExamples: [
      {
        title: '用低权限模型验证是不是模型权限问题',
        language: 'python',
        code: `from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    base_url="https://api.openai.com/v1",
)

response = client.chat.completions.create(
    model="替换成控制台明确可用的模型ID",
    messages=[{"role": "user", "content": "ping"}],
    max_tokens=20,
)
print(response.choices[0].message.content)`,
        explanation: '基础模型能成功，高阶模型 403 时，优先申请模型权限或更换可用模型。'
      },
      {
        title: '确认当前 Key 能访问模型列表',
        language: 'bash',
        code: `curl -i "$BASE_URL/v1/models" \\
  -H "Authorization: Bearer $API_KEY"`,
        explanation: '如果模型列表也 403，通常是账号、项目、服务开通或区域权限问题。'
      }
    ],
    relatedTutorialIds: ['openai', 'claude', 'gemini', 'aliyun']
  },
  {
    id: '404-model-not-found',
    title: '404 model not found：模型名称不存在或不可访问怎么解决',
    shortTitle: '404 model not found',
    statusLabel: '模型不存在',
    summary: '404 model not found 多数不是网络 404，而是 model 字段、部署 ID、区域或接口类型不匹配。',
    affectedArea: 'Model ID / Deployment ID',
    symptoms: [
      'HTTP 状态码返回 404，错误信息出现 model not found、The model does not exist 或 deployment not found。',
      'curl 能访问 API，Key 也有效，但只要填某个模型名就失败。',
      '从教程、博客或旧项目复制的模型名已经不可用，控制台里找不到。',
      'OpenAI SDK 能跑一个平台，换到另一个 OpenAI 兼容平台后同样模型名失效。'
    ],
    causes: [
      'model 字段不是控制台显示的精确模型 ID，多了空格、大小写错误或用了展示名称。',
      '把 OpenAI 模型名填到了 DeepSeek、Kimi、通义千问等平台。',
      '豆包、Azure OpenAI 等平台要求填写部署名或推理接入点 ID，而不是通用模型名。',
      '模型只在特定区域、项目或套餐下可见。',
      '直连 Claude/Gemini 却使用了 OpenAI 的 /v1/chat/completions 格式。'
    ],
    checklist: [
      {
        label: '从控制台复制模型 ID',
        detail: '不要从截图、文章标题或营销名称手打；复制控制台或官方文档里的 exact id。'
      },
      {
        label: '确认接口格式',
        detail: 'OpenAI 兼容接口、Anthropic Messages API、Gemini API 的路径和参数并不一样。'
      },
      {
        label: '列出当前 Key 可访问模型',
        detail: '如果平台支持 /v1/models，先打印模型列表；不支持时以控制台接入指南为准。'
      },
      {
        label: '检查部署 ID 和区域',
        detail: 'Azure、火山方舟、部分云平台需要填部署名、Endpoint ID 或区域内资源名。'
      },
      {
        label: '清理不可见字符',
        detail: '从网页复制时可能带全角空格、换行或零宽字符，建议重新手动输入一次。'
      }
    ],
    apiSpecialCases: [
      {
        api: 'DeepSeek',
        note: 'DeepSeek V4 新项目优先用 deepseek-v4-flash 或 deepseek-v4-pro；deepseek-chat、deepseek-reasoner 仅作为旧项目兼容别名，并将在 2026-07-24 15:59 UTC 后退役。'
      },
      {
        api: 'Kimi',
        note: '常见模型名包括 moonshot-v1-8k、moonshot-v1-32k、moonshot-v1-128k；长上下文任务要选对应上下文版本。'
      },
      {
        api: '通义千问 DashScope',
        note: 'OpenAI 兼容模式下用 DashScope 的模型 ID，例如 qwen-plus；Base URL 也要是 compatible-mode/v1。'
      },
      {
        api: '豆包火山方舟',
        note: 'model 往往填写控制台创建的推理接入点 ID，而不是文章里的通用模型展示名。'
      },
      {
        api: 'Claude / Gemini',
        note: '直连官方 API 时不要套 OpenAI 的模型名和路径；除非你使用的是明确支持 OpenAI 兼容的网关。'
      }
    ],
    fixExamples: [
      {
        title: '先列出当前 Key 可用的模型 ID',
        language: 'python',
        code: `from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ["API_KEY"],
    base_url=os.environ["BASE_URL"],
)

for item in client.models.list().data:
    print(item.id)`,
        explanation: '把输出的 id 原样复制到 chat.completions.create 的 model 字段。'
      },
      {
        title: '把模型名做成显式配置，避免混用平台',
        language: 'bash',
        code: `# DeepSeek 示例
export BASE_URL="https://api.deepseek.com"
export MODEL_ID="deepseek-v4-flash"

# Kimi 示例
# export BASE_URL="https://api.moonshot.cn/v1"
# export MODEL_ID="moonshot-v1-8k"`,
        explanation: '每个平台的 Base URL 和模型名一起切换，不要只换其中一个。'
      }
    ],
    relatedTutorialIds: ['deepseek', 'kimi', 'aliyun', 'doubao']
  },
  {
    id: '429-too-many-requests',
    title: '429 Too Many Requests：API 限流、并发过高怎么解决',
    shortTitle: '429 Too Many Requests',
    statusLabel: '触发限流',
    summary: '429 表示请求频率、Token 速率、并发数或短时间突发量超过平台限制。正确做法是降并发、排队、指数退避和减少单次 Token。',
    affectedArea: 'RPM / TPM / 并发 / 重试',
    symptoms: [
      'HTTP 状态码返回 429，错误包含 rate limit、Too Many Requests、requests per minute 或 tokens per minute。',
      '单次请求能成功，批量并发、循环任务或多用户同时使用时失败。',
      '短时间连续重试后错误更严重，甚至触发更长时间的冷却。',
      '流式输出前几秒正常，后续大量任务一起启动时开始报错。'
    ],
    causes: [
      '并发请求太多，没有队列或限速器。',
      '单次 prompt 太长，输出 max_tokens 太大，触发 TPM 限制。',
      '失败后立即重试，所有请求在同一时间再次打到 API。',
      '免费额度或低等级套餐的 RPM/TPM 很低，不适合批量任务。',
      '多个服务实例共用同一个 Key，但每个实例都以为自己没有超过限制。'
    ],
    checklist: [
      {
        label: '区分 RPM 和 TPM',
        detail: '请求次数限制和 Token 限制是两件事；短文本高并发看 RPM，长文本任务通常先撞 TPM。'
      },
      {
        label: '限制并发',
        detail: '先把并发降到 1 到 3 跑通，再逐步增加，记录失败点。'
      },
      {
        label: '使用指数退避和随机抖动',
        detail: '不要固定每秒重试；等待 1s、2s、4s 并加入随机抖动，避免请求同时恢复。'
      },
      {
        label: '减少 max_tokens 和上下文',
        detail: '摘要、分块、缓存系统提示词，避免每个请求都带完整历史。'
      },
      {
        label: '需要稳定吞吐就升级额度',
        detail: '业务确实需要更高吞吐时，升级套餐或申请更高限额，比多 Key 硬绕更可靠。'
      }
    ],
    apiSpecialCases: [
      {
        api: 'OpenAI',
        note: '错误信息可能区分 rate_limit_exceeded 和 insufficient_quota。前者是限速，后者是余额或额度问题。'
      },
      {
        api: 'Gemini',
        note: '免费层通常同时有分钟级和日级限制；开发环境要把批量任务拆小。'
      },
      {
        api: 'DeepSeek / Kimi / 通义千问',
        note: '国内平台常按套餐、账号等级或资源包设置并发和速率，控制台一般能看到限制说明。'
      },
      {
        api: 'Claude',
        note: '长上下文和大输出更容易撞 Token 速率限制；建议开启流式输出并减少无用上下文。'
      }
    ],
    fixExamples: [
      {
        title: 'TypeScript 指数退避重试 429',
        language: 'typescript',
        code: `async function callWithRetry<T>(fn: () => Promise<T>, maxRetries = 4): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const status = error?.status ?? error?.response?.status;
      if (status !== 429 || attempt === maxRetries) throw error;

      const jitterMs = Math.floor(Math.random() * 300);
      const waitMs = 1000 * 2 ** attempt + jitterMs;
      await new Promise(resolve => setTimeout(resolve, waitMs));
    }
  }
  throw new Error("unreachable");
}`,
        explanation: '只对 429 做退避重试，不要对所有错误盲目重试。'
      },
      {
        title: '用队列把并发限制到 2',
        language: 'typescript',
        code: `async function runLimited<T>(tasks: (() => Promise<T>)[], concurrency = 2) {
  const results: T[] = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const current = index++;
      results[current] = await tasks[current]();
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}`,
        explanation: '批量任务先限并发，再加退避，通常能解决大部分 429。'
      }
    ],
    relatedTutorialIds: ['openai', 'claude', 'gemini', 'deepseek']
  },
  {
    id: 'timeout',
    title: 'timeout：API 请求超时、504 或连接中断怎么解决',
    shortTitle: 'timeout',
    statusLabel: '请求超时',
    summary: 'timeout 可能来自网络、代理、DNS、服务端处理太慢、上下文过长或你的运行环境超时限制。先定位是连接超时还是读取超时。',
    affectedArea: '网络 / 代理 / 长上下文',
    symptoms: [
      'SDK 报 timeout、ETIMEDOUT、ECONNRESET、AbortError、Read timed out 或 504 Gateway Timeout。',
      '短 prompt 正常，长文档、图片、多轮上下文或推理模型请求容易超时。',
      '本地运行成功，部署到 Vercel、Cloudflare Workers、Serverless 后超时。',
      '非流式等待很久无响应，开启 stream 后能看到持续输出。'
    ],
    causes: [
      '请求体过大，模型推理时间超过客户端、代理或 Serverless 超时时间。',
      '海外 API 网络链路不稳定，代理节点、DNS 或 TLS 握手失败。',
      '没有开启流式输出，长回答必须等完整生成后才返回。',
      'max_tokens 设置过大，模型尝试生成很长内容。',
      '服务端没有设置合理 timeout 和重试，连接池复用异常。'
    ],
    checklist: [
      {
        label: '区分连接超时和读取超时',
        detail: '连接超时多看网络、DNS、代理；读取超时多看 prompt 长度、模型速度和输出长度。'
      },
      {
        label: '用最小请求测试链路',
        detail: '只发 ping 级别 prompt，如果也超时，先修网络或 Base URL。'
      },
      {
        label: '开启 stream',
        detail: '长输出、推理模型和聊天产品建议用流式输出，避免网关长时间无数据返回。'
      },
      {
        label: '缩短上下文',
        detail: '把长文档分块、摘要历史消息、降低 max_tokens。'
      },
      {
        label: '检查部署平台限制',
        detail: 'Serverless 常有 10 到 60 秒限制，长任务应改为后台队列或长连接流式接口。'
      }
    ],
    apiSpecialCases: [
      {
        api: 'OpenAI / Claude / Gemini',
        note: '海外链路受网络环境影响明显。国内服务器直连失败时，要使用合规稳定的网络出口或国内可用平台。'
      },
      {
        api: 'Claude',
        note: '长上下文能力强，但长上下文也意味着更长处理时间；大文档任务优先 stream。'
      },
      {
        api: 'DeepSeek / Kimi',
        note: '长文本、推理模型或高峰时段可能更慢。先用短 prompt 验证 Key 和 Base URL，再调大上下文。'
      },
      {
        api: '本地部署模型',
        note: 'timeout 也可能是本机显存不足或模型加载太慢，不要只排查网络。'
      }
    ],
    fixExamples: [
      {
        title: 'Python OpenAI SDK 设置 timeout 和有限重试',
        language: 'python',
        code: `from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ["API_KEY"],
    base_url=os.environ["BASE_URL"],
    timeout=60.0,
    max_retries=2,
)

response = client.chat.completions.create(
    model=os.environ["MODEL_ID"],
    messages=[{"role": "user", "content": "用三句话总结这段内容"}],
    max_tokens=300,
)
print(response.choices[0].message.content)`,
        explanation: '同时控制 timeout、重试次数和输出长度，避免无限等待。'
      },
      {
        title: 'fetch 使用 AbortController 控制超时',
        language: 'typescript',
        code: `const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 60000);

try {
  const response = await fetch(process.env.BASE_URL + "/chat/completions", {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Authorization": "Bearer " + process.env.API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.MODEL_ID,
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 50,
    }),
  });
  console.log(await response.text());
} finally {
  clearTimeout(timer);
}`,
        explanation: '超时要显式失败并记录日志，不要让请求永久挂住。'
      }
    ],
    relatedTutorialIds: ['claude', 'gemini', 'kimi', 'deepseek']
  },
  {
    id: 'insufficient-quota',
    title: 'insufficient quota：余额不足、额度用完怎么解决',
    shortTitle: 'insufficient quota',
    statusLabel: '额度不足',
    summary: 'insufficient quota 不是代码格式问题，而是账号可用额度、预算上限、账单状态或免费层限制不足。',
    affectedArea: 'Billing / Quota / Budget',
    symptoms: [
      '错误信息包含 insufficient_quota、quota exceeded、balance not enough、credit exhausted 或 payment required。',
      '小号、新项目或刚创建的 Key 立刻失败，但老项目还能调用。',
      '充值后仍失败，可能是充错账号、充错项目、账单未刷新或预算上限未解除。',
      'ChatGPT、Claude Pro、Gemini Advanced 能聊天，但 API 调用仍提示没额度。'
    ],
    causes: [
      'API 账户没有余额，或免费额度已经过期/用完。',
      '平台把 Chat 订阅和 API 计费分开，订阅不提供 API 额度。',
      '项目设置了预算上限、欠费停机或账单验证未完成。',
      '使用了价格更高的模型，单次请求消耗超过预期。',
      '团队/组织下有多个项目，Key 属于没有余额的项目。'
    ],
    checklist: [
      {
        label: '登录控制台看 Billing 和 Usage',
        detail: '不要只看聊天产品订阅页；API 控制台的余额、用量和账单状态才是依据。'
      },
      {
        label: '确认 Key 所属项目',
        detail: '多项目、多组织时，充值和 Key 必须在同一个项目或账号下。'
      },
      {
        label: '确认免费额度是否过期',
        detail: '很多平台的新用户额度有有效期，不是永久余额。'
      },
      {
        label: '降低模型和 max_tokens',
        detail: '先用便宜模型、短输出跑通，再切回高阶模型。'
      },
      {
        label: '充值后等待刷新',
        detail: '国内支付通常很快，但仍可能需要几分钟；失败时查看支付订单和账号是否一致。'
      }
    ],
    apiSpecialCases: [
      {
        api: 'OpenAI',
        note: 'ChatGPT Plus/Pro 与 API Billing 分开计费。开了 ChatGPT 订阅，API 仍需要单独充值或绑定账单。'
      },
      {
        api: 'Claude',
        note: 'Claude Pro/Max 订阅和 Anthropic Console API 也是两套计费。API 需要在 console.anthropic.com 单独开通。'
      },
      {
        api: 'Gemini',
        note: 'Google AI Studio 免费层、Google Cloud Billing、Vertex AI 项目额度要分开检查。'
      },
      {
        api: 'DeepSeek / 通义千问 / Kimi / 智谱',
        note: '国内平台通常在控制台有余额、资源包或 Tokens 页面；充值和实名认证状态会影响可调用额度。'
      }
    ],
    fixExamples: [
      {
        title: '捕获额度不足并切到便宜模型',
        language: 'typescript',
        code: `async function ask(client: any, messages: any[]) {
  try {
    return await client.chat.completions.create({
      model: process.env.PRIMARY_MODEL,
      messages,
      max_tokens: 800,
    });
  } catch (error: any) {
    const code = error?.code ?? error?.error?.code;
    if (code !== "insufficient_quota") throw error;

    return client.chat.completions.create({
      model: process.env.FALLBACK_MODEL,
      messages,
      max_tokens: 300,
    });
  }
}`,
        explanation: '降级只能作为临时兜底，根因仍要回控制台处理余额或账单。'
      },
      {
        title: '给批量任务加预算保护',
        language: 'typescript',
        code: `const DAILY_TOKEN_BUDGET = 200000;
let usedTokensToday = 0;

function assertBudget(estimatedTokens: number) {
  if (usedTokensToday + estimatedTokens > DAILY_TOKEN_BUDGET) {
    throw new Error("已达到今日 Token 预算，停止继续调用 API");
  }
  usedTokensToday += estimatedTokens;
}`,
        explanation: '先在业务侧阻止失控循环，避免额度被异常任务一次性耗尽。'
      }
    ],
    relatedTutorialIds: ['openai', 'claude', 'gemini', 'deepseek']
  },
  {
    id: 'invalid-api-key',
    title: 'invalid API key：密钥无效、格式错误或泄露后怎么处理',
    shortTitle: 'invalid API key',
    statusLabel: 'Key 无效',
    summary: 'invalid API key 是 401 的最常见具体原因。重点检查复制完整性、前后空白、环境变量名、Key 所属平台和泄露轮换。',
    affectedArea: 'API Key 格式 / 轮换',
    symptoms: [
      '错误信息明确出现 invalid API key、Incorrect API key provided、API key not valid 或 malformed key。',
      '同一个 Base URL 下，换成新 Key 后马上恢复。',
      '本地 .env 修改了，但运行中的进程仍使用旧 Key。',
      '把 Key 放到前端、截图或仓库后，平台自动禁用了该 Key。'
    ],
    causes: [
      'Key 复制不完整、开头结尾带空格或换行。',
      '环境变量名写错，例如代码读 OPENAI_API_KEY，实际写了 OPENAI_KEY。',
      '开发工具缓存旧配置，重启前没有重新读取 .env。',
      'Key 泄露后被平台或你自己撤销。',
      '把 Gemini、Anthropic、OpenAI 兼容平台的 Key 混用。'
    ],
    checklist: [
      {
        label: '不要继续使用可疑 Key',
        detail: '如果 Key 出现在公开仓库、截图、聊天记录或前端代码里，立即删除并重新生成。'
      },
      {
        label: '修剪空白字符',
        detail: '读取环境变量后 trim，但不要在日志里输出完整值。'
      },
      {
        label: '确认变量名一致',
        detail: '.env、部署平台 Secret、代码里的 getenv 名称必须完全一致。'
      },
      {
        label: '重启进程和工具',
        detail: 'Next.js、Node、Python、Claude Code、Codex 等进程通常不会自动重读已经加载的环境变量。'
      },
      {
        label: '一平台一 Key',
        detail: '不要把同一个变量名 API_KEY 在多个平台间复用，建议按供应商命名。'
      }
    ],
    apiSpecialCases: [
      {
        api: 'Gemini',
        note: 'AI Studio Key 常见前缀是 AIza；不要把它传给 OpenAI SDK 的 OpenAI 官方 Base URL。'
      },
      {
        api: 'Anthropic',
        note: 'Anthropic Key 常见前缀是 sk-ant；直连时用 Anthropic SDK 或 x-api-key。'
      },
      {
        api: 'OpenAI 兼容国产平台',
        note: '即使都能用 OpenAI SDK，Key 仍然只在各自平台有效，不能跨平台通用。'
      },
      {
        api: '工具类应用',
        note: 'CC Switch、Claude Code、Codex 等工具可能有自己的配置文件；改了 .env 不代表工具配置已更新。'
      }
    ],
    fixExamples: [
      {
        title: 'Node.js 启动时校验 Key，并避免完整日志泄露',
        language: 'typescript',
        code: `function readRequiredSecret(name: string) {
  const value = (process.env[name] ?? "").trim();
  if (!value) {
    throw new Error(name + " 未配置或为空");
  }

  const masked = value.slice(0, 4) + "..." + value.slice(-4);
  console.log(name + " loaded:", masked, "length:", value.length);
  return value;
}

const apiKey = readRequiredSecret("DEEPSEEK_API_KEY");`,
        explanation: '只记录脱敏信息，既能排查加载问题，也不会泄露完整 Key。'
      },
      {
        title: '发现泄露后的处理顺序',
        language: 'bash',
        code: `# 1. 到平台控制台删除已泄露的 API Key
# 2. 重新创建一个新 Key
# 3. 更新服务器环境变量或 Secret
# 4. 重启应用进程
# 5. 检查 Git 历史、日志和截图里是否仍保留旧 Key`,
        explanation: '不要只在 .env 里改值；旧 Key 必须在控制台删除。'
      }
    ],
    relatedTutorialIds: ['deepseek', 'openai', 'claude', 'gemini']
  },
  {
    id: 'base-url-config-error',
    title: 'Base URL 配置错误：API 地址、路径和兼容模式怎么排查',
    shortTitle: 'Base URL 配置错误',
    statusLabel: '地址配置错误',
    summary: 'Base URL 错了会伪装成 401、404、timeout、JSON 解析失败或 HTML 响应。先确认协议、域名、/v1 路径和平台兼容模式。',
    affectedArea: 'Endpoint / SDK Base URL',
    symptoms: [
      '返回 404、HTML 页面、Cannot GET /v1/chat/completions、JSON parse error 或连接超时。',
      'Key 和模型名确认无误，但请求始终打不到正确 API。',
      '浏览器能打开官网，代码调用 API 却失败，因为官网域名不是 API endpoint。',
      '把 /v1 写了两次，或 SDK 自动拼接路径后变成 /v1/v1/chat/completions。'
    ],
    causes: [
      '使用了官网、控制台或文档页面地址，而不是 API 接入地址。',
      'OpenAI SDK 的 base_url 少了 /v1，或平台要求不要手动加 /chat/completions。',
      '通义千问等平台需要 compatible-mode/v1，不能只写控制台域名。',
      'Claude、Gemini 直连 API 不是 OpenAI 兼容路径，却被当作 OpenAI Base URL 使用。',
      '代理、中转或网关要求自定义路径，和官方 SDK 默认路径冲突。'
    ],
    checklist: [
      {
        label: '打印最终请求 URL',
        detail: '确认最终请求是 https://域名/.../chat/completions，而不是官网页面或重复路径。'
      },
      {
        label: '确认是否 OpenAI 兼容',
        detail: '只有明确支持 OpenAI 兼容的服务，才使用 OpenAI SDK 的 chat.completions.create。'
      },
      {
        label: '用 /models 或最小聊天请求探测',
        detail: '平台支持 /v1/models 时先测模型列表，不支持时按控制台给出的完整示例测试。'
      },
      {
        label: 'Base URL 和模型名一起切换',
        detail: '换供应商时不要只换 Key；Base URL、模型名、Key 必须成套。'
      },
      {
        label: '检查部署环境变量',
        detail: '本地 .env 正确不代表线上 Secret 正确；线上常见问题是漏了路径或多了斜杠。'
      }
    ],
    apiSpecialCases: [
      {
        api: 'DeepSeek',
        note: 'OpenAI SDK 示例常用 base_url=https://api.deepseek.com，SDK 会拼接 /v1/chat/completions。'
      },
      {
        api: '通义千问 DashScope',
        note: 'OpenAI 兼容模式常用 https://dashscope.aliyuncs.com/compatible-mode/v1，少了 compatible-mode/v1 会请求到错误接口。'
      },
      {
        api: 'Kimi',
        note: 'OpenAI 兼容地址是 https://api.moonshot.cn/v1，模型名用 moonshot-v1-* 或控制台可见模型。'
      },
      {
        api: '腾讯混元',
        note: 'OpenAI 兼容地址可用 https://api.hunyuan.cloud.tencent.com/v1，密钥和模型名按控制台说明填写。'
      },
      {
        api: '豆包火山方舟',
        note: '常见地址是 https://ark.cn-beijing.volces.com/api/v3，但不同区域和接入点可能不同，复制控制台参数最稳。'
      },
      {
        api: 'Claude / Gemini',
        note: '直连官方 API 不等于 OpenAI 兼容 Base URL。使用官方 SDK，或确认你使用的网关明确支持 OpenAI 兼容。'
      }
    ],
    fixExamples: [
      {
        title: '常见 OpenAI 兼容 Base URL 模板',
        language: 'bash',
        code: `# DeepSeek
export BASE_URL="https://api.deepseek.com"
export MODEL_ID="deepseek-v4-flash"

# 通义千问 DashScope 兼容模式
# export BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
# export MODEL_ID="qwen-plus"

# Kimi
# export BASE_URL="https://api.moonshot.cn/v1"
# export MODEL_ID="moonshot-v1-8k"

# 豆包火山方舟：以控制台实际区域和接入点为准
# export BASE_URL="https://ark.cn-beijing.volces.com/api/v3"
# export MODEL_ID="你的推理接入点ID"`,
        explanation: '同一组配置里，Base URL、模型名和 Key 必须来自同一平台。'
      },
      {
        title: '避免重复拼接 /v1/chat/completions',
        language: 'python',
        code: `from openai import OpenAI
import os

# 正确：base_url 只写平台要求的根路径
client = OpenAI(
    api_key=os.environ["API_KEY"],
    base_url=os.environ["BASE_URL"].rstrip("/"),
)

response = client.chat.completions.create(
    model=os.environ["MODEL_ID"],
    messages=[{"role": "user", "content": "ping"}],
)
print(response.choices[0].message.content)`,
        explanation: '不要把完整 /chat/completions URL 填进 base_url，SDK 会自己拼接接口路径。'
      }
    ],
    relatedTutorialIds: ['deepseek', 'aliyun', 'kimi', 'doubao']
  }
];

export function getErrorSolutionById(id: string) {
  return errorSolutions.find(solution => solution.id === id);
}

export function getAllErrorSolutionIds() {
  return errorSolutions.map(solution => solution.id);
}
