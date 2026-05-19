import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema, HowToSchema, ArticleSchema } from '@/components/seo/structured-data';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

const URL_PATTERN = /(https?:\/\/[^\s<>"'，。；、？！）)】]+)/g;

function isApiEndpointUrl(value: string) {
  try {
    const url = new URL(value);
    return url.hostname !== 'apiuspro.cn' && (
      url.hostname.startsWith('api.') ||
      url.pathname.startsWith('/v1') ||
      url.pathname.includes('/api/') ||
      url.pathname.includes('/compatible-mode/')
    );
  } catch {
    return false;
  }
}

// 将文本中的 URL 转换为可点击链接
function LinkText({ text }: { text: string }) {
  const parts = text.split(URL_PATTERN);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('http://') || part.startsWith('https://')) {
          if (isApiEndpointUrl(part)) {
            return (
              <code key={i} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
                {part}
              </code>
            );
          }

          return (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-foreground/10 px-2.5 py-1 text-sm font-medium text-foreground transition-colors hover:bg-foreground/20">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {part.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export const metadata: Metadata = generateTdkMetadata('/local-deploy');

// 教程步骤数据
const deploySteps = [
  {
    title: '了解本地部署',
    description: '在开始之前，先了解什么是本地部署以及为什么需要它。',
    items: [
      '本地部署：将AI模型下载到自己的电脑上运行，不需要联网',
      '优势：完全免费、数据隐私有保障、无需网络、可离线使用',
      '适用场景：学习AI、隐私敏感任务、离线环境、轻度使用',
      '限制：模型能力通常弱于云端大模型、需要一定的电脑配置',
    ],
    tip: '简单理解：本地部署就像是把AI助手"请"到你的电脑里住，不用联网也能聊天。',
  },
  {
    title: '检查电脑配置',
    description: '本地部署对电脑配置有一定要求，请先确认您的电脑是否满足。',
    items: [
      '内存（RAM）：最低8GB，推荐16GB，32GB更佳',
      '存储空间：至少10GB可用空间（用于存放模型文件）',
      '显卡（可选）：NVIDIA显卡可加速推理，无显卡也可用CPU运行',
      '操作系统：Windows 10/11、macOS、Linux 均支持',
    ],
    code: '# Windows 用户查看内存：\n# 右键"此电脑" → 属性 → 查看"已安装的RAM"\n\n# 或者在 PowerShell 中运行：\nwmic memorychip get capacity',
    codeLanguage: 'bash',
    codeExplanation: '运行后会显示内存条容量（单位是字节），除以 1073741824 就是 GB 数。',
    warning: '如果您的电脑内存低于8GB，建议先升级内存或使用云端API服务。',
  },
  {
    title: '安装 Ollama',
    description: 'Ollama 是最简单的本地大模型部署工具，支持一键安装和运行模型。',
    items: [
      '访问 Ollama 官网：https://ollama.ai',
      '点击页面上的 Download 按钮',
      '选择对应的操作系统（Windows/macOS/Linux）',
      '下载完成后，双击安装包，按默认选项一路安装即可',
    ],
    code: '# 安装完成后，打开终端（Windows用户打开PowerShell或CMD）\n# 输入以下命令验证安装是否成功\nollama --version',
    codeLanguage: 'bash',
    codeExplanation: '如果显示版本号（如 ollama version 0.x.x），说明安装成功。如果提示"命令不存在"，请重新打开终端或重启电脑。',
    tip: 'Windows 用户：按 Win+R，输入 powershell，回车即可打开终端。',
  },
  {
    title: '下载并运行模型',
    description: 'Ollama 支持多种开源模型，这里推荐适合笔记本的小模型。',
    items: [
      'Qwen3 0.6B：超轻量，2GB内存即可运行，入门首选',
      'Qwen3 1.7B：轻量级，4GB内存可运行，中文能力强',
      'Gemma 4 1B：轻量多模态，3GB内存可运行',
      'Qwen3 4B/8B：平衡版，8GB内存可运行',
      'Gemma 4 4B：支持图片理解，8GB内存可运行',
      'Qwen3.6 35B-A3B：MoE架构，激活参数仅3B，编程能力强',
    ],
    code: '# 下载并运行 Qwen3 0.6B 模型（最轻量，2GB内存即可）\nollama run qwen3:0.6b\n\n# 或者下载 Qwen3 1.7B（4GB内存，中文能力强）\nollama run qwen3:1.7b\n\n# 或者下载 Gemma 4 1B（3GB内存，支持多模态）\nollama run gemma4:1b\n\n# 或者下载 Qwen3 8B（8GB内存，性能均衡）\nollama run qwen3:8b\n\n# 高配：下载 Qwen3.6 27B（16GB内存，编程能力强）\nollama run qwen3.6:27b',
    codeLanguage: 'bash',
    codeExplanation: '首次运行会自动下载模型，下载完成后即可开始对话。输入问题后按回车即可得到回答，输入 /bye 退出。',
    tip: '下载时间取决于网络速度，0.6B 模型约 500MB，8B 模型约 4GB。下载完成后会缓存到本地，下次启动无需重新下载。',
  },
  {
    title: '常用操作命令',
    description: '掌握这些常用命令，可以更好地管理本地模型。',
    items: [
      'ollama list：查看已下载的所有模型',
      'ollama pull <模型名>：下载模型但不运行',
      'ollama rm <模型名>：删除不需要的模型',
      'ollama show <模型名>：查看模型详细信息',
    ],
    code: '# 查看已下载的模型\nollama list\n\n# 下载模型（不运行）\nollama pull gemma4:4b\n\n# 删除模型（释放空间）\nollama rm gemma4:4b\n\n# 查看模型信息\nollama show gemma4:4b',
    codeLanguage: 'bash',
    codeExplanation: '这些命令可以帮助您管理本地模型，释放存储空间。',
    tip: '如果磁盘空间不足，可以用 ollama rm 删除不用的模型。模型文件通常在 C:\\Users\\用户名\\.ollama\\models 目录下。',
  },
  {
    title: '启动 API 服务',
    description: '如果您需要在其他应用中使用本地模型，可以启动 API 服务，并用 CC Switch 把本地兼容接口接入 Claude Code、Codex、OpenCode 等 AI 工具。',
    items: [
      'Ollama 默认会启动 API 服务，端口为 11434',
      '可以通过 http://localhost:11434 访问 API',
      '支持 OpenAI 兼容格式，可以替代云端 API 使用',
      '可以配合 ChatBox、Open WebUI 等工具使用',
      '推荐使用 CC Switch 统一管理本地接口、云端 API 和多个 AI 工具的配置',
    ],
    code: '# 测试 API 是否正常工作\ncurl http://localhost:11434/api/generate -d \'{\"model\": \"gemma4:4b\", \"prompt": "你好"}\'\n\n# 如果安装了 jq，可以格式化输出\ncurl http://localhost:11434/api/generate -d \'{\"model\": \"gemma4:4b\", \"prompt": "你好"}\' | jq',
    codeLanguage: 'bash',
    codeExplanation: '如果返回 JSON 格式的响应，说明 API 服务正常工作。',
    tip: 'Windows 用户如果没有 curl 命令，可以用 PowerShell 的 Invoke-WebRequest 代替，或者直接在浏览器访问 http://localhost:11434 查看服务状态。',
  },
];

// 模型对比数据
const models = [
  {
    name: 'Qwen3 0.6B',
    size: '0.6B',
    memory: '2GB',
    gpu: '无需',
    desc: '超轻量入门',
    command: 'ollama run qwen3:0.6b',
    isNew: true,
    brand: '阿里云',
  },
  {
    name: 'Qwen3 1.7B',
    size: '1.7B',
    memory: '4GB',
    gpu: '无需',
    desc: '轻量中文首选',
    command: 'ollama run qwen3:1.7b',
    isNew: true,
    brand: '阿里云',
  },
  {
    name: 'Gemma 4 1B',
    size: '1B',
    memory: '3GB',
    gpu: '无需',
    desc: '轻量多模态',
    command: 'ollama run gemma4:1b',
    isNew: true,
    brand: 'Google',
  },
  {
    name: 'Qwen3 4B',
    size: '4B',
    memory: '8GB',
    gpu: '4GB+',
    desc: '中文能力最强',
    command: 'ollama run qwen3:4b',
    isNew: true,
    brand: '阿里云',
  },
  {
    name: 'Gemma 4 4B',
    size: '4B',
    memory: '8GB',
    gpu: '4GB+',
    desc: '支持图片理解',
    command: 'ollama run gemma4:4b',
    isNew: true,
    brand: 'Google',
  },
  {
    name: 'Qwen3 8B',
    size: '8B',
    memory: '8GB',
    gpu: '4GB+',
    desc: '性能均衡',
    command: 'ollama run qwen3:8b',
    isNew: true,
    brand: '阿里云',
  },
  {
    name: 'Qwen3.6 35B-A3B',
    size: '35B(激活3B)',
    memory: '32GB',
    gpu: '8GB+',
    desc: 'MoE架构，编程能力强',
    command: 'ollama run qwen3.6:27b',
    isNew: true,
    brand: '阿里云',
  },
  {
    name: 'Gemma 4 12B',
    size: '12B',
    memory: '16GB',
    gpu: '8GB+',
    desc: '高配多模态',
    command: 'ollama run gemma4:12b',
    isNew: true,
    brand: 'Google',
  },
  {
    name: 'Qwen3 14B',
    size: '14B',
    memory: '16GB',
    gpu: '8GB+',
    desc: '高性能中文',
    command: 'ollama run qwen3:14b',
    isNew: true,
    brand: '阿里云',
  },
];

const localCloudDecision = [
  {
    title: '优先用本地模型',
    items: [
      '处理隐私资料、内部文档或离线环境任务',
      '只是学习 Prompt、试验工作流或轻量问答',
      '希望零调用成本，能接受模型能力弱一些',
    ],
  },
  {
    title: '优先用云端 API',
    items: [
      '需要稳定代码生成、复杂推理或生产环境 SLA',
      '任务需要多模态、长上下文、函数调用或高并发',
      '不想占用本机资源，希望直接接入应用或工具',
    ],
  },
  {
    title: '推荐混合使用',
    items: [
      '本地模型做草稿、分类、轻量摘要，云端 API 做最终高质量结果',
      '通过 CC Switch 管理本地 Ollama 和 DeepSeek、OpenAI 等云端模型',
      '上线前用真实样本测试质量、延迟、成本和失败率',
    ],
  },
];

// 常见问题
const faqs = [
  {
    question: 'Qwen3.6 是什么？和 Qwen3 有什么区别？',
    answer: 'Qwen3.6 是阿里云发布的新一代模型，采用 MoE（混合专家）架构，总参数 35B 但激活参数仅 3B，推理速度快。相比 Qwen3，Qwen3.6 编程能力更强，适合代码生成和编程辅助任务。',
  },
  {
    question: 'Gemma 4 和 Gemma 3 有什么区别？',
    answer: 'Gemma 4 是 Google 于 2026 年 3 月发布的新一代模型，采用 Sparse MoE（稀疏混合专家）架构，只激活部分参数，速度更快。相比 Gemma 3，Gemma 4 支持更长的上下文（128K）、原生多模态和函数调用能力。',
  },
  {
    question: '下载模型很慢怎么办？',
    answer: 'Ollama 默认从国外服务器下载，国内用户可能较慢。解决方案：①使用代理；②在网络较好的时段下载（如凌晨）；③耐心等待，首次下载后会缓存到本地。',
  },
  {
    question: '运行模型时电脑很卡怎么办？',
    answer: '模型运行会占用大量内存和CPU。解决方案：①关闭其他大型应用；②使用更小的模型（如 Gemma4-1B）；③减少上下文长度；④保持电源连接并启用高性能模式。',
  },
  {
    question: '模型回答质量不好怎么办？',
    answer: '小模型能力有限，可以尝试：①使用更大的模型（如从1B升级到4B）；②优化提问方式，问题要具体明确；③对于复杂任务，考虑使用云端API。',
  },
  {
    question: '如何更新模型到最新版本？',
    answer: '运行 ollama pull <模型名> 即可更新到最新版本。例如：ollama pull gemma4:4b。Ollama 会自动检测并下载更新。',
  },
  {
    question: 'Qwen3.6 35B 在笔记本上能跑吗？',
    answer: '可以，但需要较高配置。Qwen3.6 采用 MoE 架构，激活参数仅 3B，量化后约 21GB。建议配置：①32GB 内存 + 8GB 显存；②使用 Q4_K_S 量化版本；③限制上下文长度（8k-32k）；④增大 Windows 页面文件到 64GB。配置较低建议使用 Qwen3-8B 或更小模型。',
  },
  {
    question: 'ollama 命令提示"不是内部或外部命令"怎么办？',
    answer: '这说明 Ollama 没有正确安装或环境变量没有配置好。解决方案：①重新安装 Ollama；②安装完成后重启电脑；③如果还是不行，手动将 Ollama 安装目录添加到 PATH 环境变量。',
  },
  {
    question: '模型下载到一半失败了怎么办？',
    answer: '重新运行相同的 ollama run 命令即可，Ollama 会自动断点续传。如果还是失败，可以尝试：①检查网络连接；②使用代理；③删除不完整的文件后重新下载。',
  },
  {
    question: '本地模型和云端 API 哪个更好？',
    answer: '各有优劣：①本地模型：免费、隐私好、离线可用，但能力较弱；②云端 API：能力强、无需硬件，但需要付费和网络。建议：轻度使用用本地，重度使用用云端。',
  },
  {
    question: '如何查看我的电脑有多少内存？',
    answer: 'Windows：右键"此电脑" → 属性 → 查看"已安装的RAM"。Mac：点击左上角苹果图标 → 关于本机 → 查看"内存"。Linux：在终端运行 free -h。',
  },
  {
    question: 'Ollama 安装后模型文件在哪里？',
    answer: 'Windows：C:\\Users\\你的用户名\\.ollama\\models。Mac/Linux：~/.ollama/models。如果 C 盘空间不足，可以设置环境变量 OLLAMA_MODELS 指向其他盘符。',
  },
];

export default function LocalDeployPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: '本地部署', url: 'https://apiuspro.cn/local-deploy' },
        ]}
      />
      <ArticleSchema
        title="AI大模型本地部署教程 2026"
        description="面向初学者的AI大模型本地部署教程：使用Ollama在笔记本电脑上部署Gemma 4等开源模型"
        url="https://apiuspro.cn/local-deploy"
        datePublished="2026-05-07"
        dateModified="2026-05-07"
      />
      <HowToSchema
        name="如何在笔记本电脑上本地部署AI大模型"
        description="使用Ollama在笔记本电脑上部署Gemma 4等AI大模型的完整教程"
        totalTime="PT30M"
        supply={['笔记本电脑（8GB+ RAM）', '稳定的网络连接']}
        tool={['Ollama', '终端/命令行']}
        steps={[
          { name: '安装 Ollama', text: '访问 https://ollama.ai 下载并安装 Ollama' },
          { name: '下载模型', text: '运行 ollama run gemma4:4b 下载模型' },
          { name: '开始使用', text: '在终端中与模型对话' },
        ]}
      />

      <div className="min-h-screen bg-background">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-50 border-b border-border bg-card">
          <div className="max-w-[1000px] mx-auto px-6 h-14 flex items-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              返回首页
            </Link>
            <span className="mx-3 text-border">|</span>
            <span className="text-sm font-semibold text-foreground">本地部署教程</span>
          </div>
        </header>

        <main className="max-w-[1000px] mx-auto px-6 py-8">
          {/* 页面标题 */}
          <div className="mb-10 border-b border-border pb-8">
            <p className="text-sm font-medium text-muted-foreground mb-2">教程</p>
            <h1 className="text-3xl font-semibold tracking-tight mb-3">
              AI大模型本地部署教程
            </h1>
            <p className="text-[15px] leading-7 text-muted-foreground max-w-2xl">
              本教程面向初学者，教您如何使用 Ollama 在笔记本电脑上部署和运行 AI 大模型。
              无需昂贵硬件，3GB 内存即可开始体验本地 AI。
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer">
                <span className="inline-block rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-foreground/90">
                  下载 Ollama
                </span>
              </a>
              <a href="#step-3">
                <span className="inline-block rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                  直接看部署步骤
                </span>
              </a>
            </div>
          </div>

          <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {localCloudDecision.map((decision) => (
              <div key={decision.title} className="rounded-lg border border-border bg-card p-5">
                <h2 className="text-base font-semibold">{decision.title}</h2>
                <ul className="mt-3 space-y-2">
                  {decision.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* 适合谁 / 不适合谁 */}
          <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-5">
              <p className="text-sm font-semibold text-emerald-800">适合谁</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-6 text-emerald-700 dark:text-emerald-300">
                <li>• 想零成本体验 AI 对话和代码生成的初学者</li>
                <li>• 处理隐私资料、不希望数据上传到云端的用户</li>
                <li>• 在没有网络的环境下也需要使用 AI 的人</li>
                <li>• 想学习 AI 模型原理、Prompt 工程的学生和研究者</li>
              </ul>
            </div>
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5">
              <p className="text-sm font-semibold text-amber-800">不适合谁</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-700 dark:text-amber-300">
                <li>• 需要稳定代码生成、复杂推理或生产环境 SLA（请看 <Link href="/cloud-api" className="text-foreground hover:underline">云端 API 官网入口</Link>）</li>
                <li>• 电脑内存低于 8GB 且不想升级硬件</li>
                <li>• 需要多模态、长上下文、函数调用等高级能力</li>
                <li>• 不想占用本机资源，希望直接接入应用（请看 <Link href="/tutorial" className="text-foreground hover:underline">AI API 购买教程</Link>）</li>
              </ul>
            </div>
          </section>

          {/* 步骤导航 - 固定在顶部 */}
          <div className="sticky top-14 z-40 mb-8 p-4 rounded-lg border border-border bg-card shadow-sm">
            <p className="text-sm font-semibold mb-3">快速导航</p>
            <div className="flex flex-wrap gap-2">
              {deploySteps.map((step, i) => (
                <a
                  key={i}
                  href={`#step-${i}`}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <span className="font-medium">{i + 1}</span>
                  <span className="hidden sm:inline">{step.title}</span>
                </a>
              ))}
              <a
                href="#ccswitch"
                className="inline-flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                <span className="font-medium">7</span>
                <span className="hidden sm:inline">CC Switch</span>
              </a>
              <a
                href="#models"
                className="inline-flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                <span className="font-medium">8</span>
                <span className="hidden sm:inline">推荐模型</span>
              </a>
              <a
                href="#faq"
                className="inline-flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                <span className="font-medium">9</span>
                <span className="hidden sm:inline">常见问题</span>
              </a>
            </div>
          </div>

          {/* 教程步骤 */}
          <div className="space-y-10">
            {deploySteps.map((step, stepIdx) => (
              <section
                key={stepIdx}
                id={`step-${stepIdx}`}
                className={stepIdx < deploySteps.length - 1 ? 'border-b border-border pb-10' : ''}
              >
                {/* 步骤标题 */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                    {stepIdx + 1}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">{step.title}</h2>
                </div>

                {/* 步骤描述 */}
                {step.description && (
                  <p className="mb-4 text-[15px] leading-7 text-muted-foreground">{step.description}</p>
                )}

                {/* 操作列表 */}
                {step.items && step.items.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {step.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                        <span className="leading-6"><LinkText text={item} /></span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* 代码块 */}
                {step.code && (
                  <div className="my-4 rounded-lg border border-border bg-card overflow-hidden">
                    <div className="px-4 py-2 bg-muted/50 border-b border-border">
                      <span className="text-xs font-medium text-muted-foreground">命令</span>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-foreground">{step.code}</code>
                    </pre>
                    {step.codeExplanation && (
                      <div className="px-4 py-3 bg-muted/30 border-t border-border">
                        <p className="text-sm text-muted-foreground">{step.codeExplanation}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 警告 */}
                {step.warning && (
                  <div className="my-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-5 py-3 text-sm leading-6 text-amber-800">
                    注意：<LinkText text={step.warning} />
                  </div>
                )}

                {/* 提示 */}
                {step.tip && (
                  <div className="my-4 rounded-lg border border-blue-200 bg-blue-50 px-5 py-3 text-sm leading-6 text-blue-800">
                    提示：<LinkText text={step.tip} />
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* CC Switch 推荐 */}
          <section id="ccswitch" className="mt-12 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 px-5 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="mb-1 text-base font-semibold text-emerald-800">配置推荐：用 CC Switch 管理本地和云端模型</h2>
                <p className="text-sm leading-6 text-emerald-700 dark:text-emerald-300">
                  启动 Ollama API 后，如果要接入 Claude Code、Codex、Gemini CLI、OpenCode 或 OpenClaw，建议使用 CC Switch 统一管理 Base URL、模型名和供应商切换。云端 API 与本地兼容接口可以放在同一个工具里管理，后续切换更方便。
                </p>
              </div>
              <Link
                href="/app/ccswitch"
                className="shrink-0 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
              >
                查看 CC Switch 详细教程
              </Link>
            </div>
          </section>

          {/* 模型推荐 */}
          <section id="models" className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-semibold tracking-tight mb-6">推荐模型</h2>
            <p className="text-[15px] leading-7 text-muted-foreground mb-6">
              以下是适合笔记本电脑运行的小模型，按配置要求从低到高排列：
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">模型</th>
                    <th className="text-left py-3 px-4 font-semibold">大小</th>
                    <th className="text-left py-3 px-4 font-semibold">最低内存</th>
                    <th className="text-left py-3 px-4 font-semibold">显卡要求</th>
                    <th className="text-left py-3 px-4 font-semibold">特点</th>
                    <th className="text-left py-3 px-4 font-semibold">命令</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model, i) => (
                    <tr key={i} className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">
                        {model.name}
                        {model.isNew && (
                          <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:text-emerald-300">
                            新
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{model.size}</td>
                      <td className="py-3 px-4 text-muted-foreground">{model.memory}</td>
                      <td className="py-3 px-4 text-muted-foreground">{model.gpu}</td>
                      <td className="py-3 px-4 text-muted-foreground">{model.desc}</td>
                      <td className="py-3 px-4">
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{model.command}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 模型特性介绍 */}
            <div className="mt-6 space-y-4">
              <div className="p-5 rounded-lg border border-border bg-muted/30">
                <p className="text-sm font-semibold mb-3">Qwen3.6 特性介绍</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-2">MoE 架构优势</p>
                    <ul className="space-y-1">
                      <li>总参数 35B，激活参数仅 3B</li>
                      <li>推理速度快，资源占用少</li>
                      <li>编程和代码能力突出</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">部署方式</p>
                    <ul className="space-y-1">
                      <li>Ollama：ollama run qwen3.6:27b</li>
                      <li>LM Studio：图形界面，零配置</li>
                      <li>llama.cpp：极客路线，WSL2 编译</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg border border-border bg-muted/30">
                <p className="text-sm font-semibold mb-3">Gemma 4 特性介绍</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-2">架构创新</p>
                    <ul className="space-y-1">
                      <li>Sparse MoE（稀疏混合专家）架构</li>
                      <li>只激活部分参数，笔记本也能跑</li>
                      <li>更少的计算资源，更高的效率</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">功能特性</p>
                    <ul className="space-y-1">
                      <li>原生支持文本+视觉多模态</li>
                      <li>128K 超长上下文</li>
                      <li>原生函数调用支持</li>
                      <li>生成速度快，交互体验好</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 常见问题 */}
          <section id="faq" className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-semibold tracking-tight mb-6">常见问题</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-border p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 使用提示 */}
          <section className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 p-5">
                <p className="text-sm font-semibold text-sky-800 mb-3">使用提示</p>
                <ul className="space-y-2 text-sm text-sky-700 dark:text-sky-300">
                  <li>首次下载模型需要一定时间，请耐心等待</li>
                  <li>模型文件会缓存到本地，下次启动无需重新下载</li>
                  <li>可以同时下载多个模型，按需切换使用</li>
                  <li>遇到问题可以查看 Ollama 官方文档</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5">
                <p className="text-sm font-semibold text-amber-800 mb-3">注意事项</p>
                <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                  <li>本地模型能力有限，复杂任务建议使用云端API</li>
                  <li>模型运行时会占用较多系统资源</li>
                  <li>定期更新模型以获得最佳体验</li>
                  <li>重要数据请勿完全依赖本地模型处理</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 相关链接 */}
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-semibold tracking-tight mb-6">相关内容</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/faq"
                className="rounded-lg border border-border p-5 transition-colors hover:border-foreground/30 hover:bg-muted/30"
              >
                <p className="font-semibold text-sm mb-2">常见问题 FAQ</p>
                <p className="text-xs text-muted-foreground">更多关于API使用的问题解答</p>
              </Link>
              <Link
                href="/tutorial"
                className="rounded-lg border border-border p-5 transition-colors hover:border-foreground/30 hover:bg-muted/30"
              >
                <p className="font-semibold text-sm mb-2">AI API 购买教程</p>
                <p className="text-xs text-muted-foreground">如果本地模型不够用，可以使用云端API</p>
              </Link>
              <Link
                href="/cloud-api"
                className="rounded-lg border border-border p-5 transition-colors hover:border-foreground/30 hover:bg-muted/30"
              >
                <p className="font-semibold text-sm mb-2">API 官网入口</p>
                <p className="text-xs text-muted-foreground">DeepSeek、通义千问等API快速访问</p>
              </Link>
            </div>
          </section>

          {/* 底部引导 */}
          <section className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground mb-4">
              本地部署遇到问题？查看我们的 FAQ 或访问 Ollama 官方文档获取帮助。
            </p>
            <div className="flex justify-center gap-3">
              <a href="/faq">
                <span className="inline-block rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                  AI API 接入常见问题
                </span>
              </a>
              <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer">
                <span className="inline-block rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                  Ollama 官网
                </span>
              </a>
            </div>
          </section>
        </main>

        {/* 页脚 */}
        <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
          <p>API知识站 - 适合初学者的 AI API 学习平台</p>
          <div className="mt-2">
            <Link href="/" className="transition-colors hover:text-foreground">返回首页</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
