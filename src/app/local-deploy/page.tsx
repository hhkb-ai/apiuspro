import type { Metadata } from 'next';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbSchema } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  title: 'AI 大模型本地部署指南 | Ollama、LM Studio 等方案',
  description:
    '本地部署 AI 大模型完整指南：Ollama、LM Studio、vLLM 等主流方案对比，含安装配置、硬件要求和模型推荐。',
  alternates: { canonical: 'https://apiuspro.cn/local-deploy' },
  openGraph: {
    title: 'AI 大模型本地部署指南 | API知识站',
    description: '本地部署 AI 大模型完整指南，含主流方案对比和硬件要求。',
    url: 'https://apiuspro.cn/local-deploy',
    type: 'website',
  },
};

export default function LocalDeployPage() {
  return (
    <SidebarLayout>
      <BreadcrumbSchema
        items={[
          { name: 'API知识站', url: 'https://apiuspro.cn' },
          { name: '本地部署', url: 'https://apiuspro.cn/local-deploy' },
        ]}
      />
      <div className="p-6 lg:p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">本地部署</h1>
          <p className="text-muted-foreground">
            学习如何在本地部署开源AI模型，从环境准备到服务启动，掌握完整的本地部署流程
          </p>
        </div>

        {/* 开源模型部署 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-6">开源模型部署方案</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ollama */}
            <Card className="border-2 border-foreground/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ollama</CardTitle>
                  <Badge>推荐</Badge>
                </div>
                <CardDescription>最简单易用，一键安装</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>跨平台支持</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>命令行简单直观</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>自动管理模型版本</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>内置API服务</span>
                  </li>
                </ul>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">快速开始：</p>
                  <code className="block bg-muted p-2 rounded text-xs">
                    ollama run llama2
                  </code>
                </div>
                <a 
                  href="https://ollama.ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    访问官网
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* LM Studio */}
            <Card>
              <CardHeader>
                <CardTitle>LM Studio</CardTitle>
                <CardDescription>图形界面友好，支持多种模型</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>可视化界面操作</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>内置模型搜索下载</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>支持本地API服务</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    <span>仅支持桌面系统</span>
                  </li>
                </ul>
                <a 
                  href="https://lmstudio.ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    访问官网
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Text Generation WebUI */}
            <Card>
              <CardHeader>
                <CardTitle>Text Generation WebUI</CardTitle>
                <CardDescription>功能全面，社区活跃</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>高度可定制</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>支持多种推理引擎</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Web界面+API服务</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    <span>需要一定技术基础</span>
                  </li>
                </ul>
                <a 
                  href="https://github.com/oobabooga/text-generation-webui" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    GitHub
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 硬件要求指南 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-6">硬件要求指南</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                    低
                  </div>
                  最低配置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">内存</p>
                  <p className="text-sm text-muted-foreground">8GB RAM</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">GPU</p>
                  <p className="text-sm text-muted-foreground">CPU推理（速度慢）</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">推荐模型</p>
                  <p className="text-sm text-muted-foreground">Llama 2 7B（量化版）</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-foreground/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                    中
                  </div>
                  推荐配置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">内存</p>
                  <p className="text-sm text-muted-foreground">16GB RAM</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">GPU</p>
                  <p className="text-sm text-muted-foreground">RTX 3060 12GB / 4060 Ti 16GB</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">推荐模型</p>
                  <p className="text-sm text-muted-foreground">Llama 2 13B / Qwen 14B</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                    高
                  </div>
                  高性能配置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">内存</p>
                  <p className="text-sm text-muted-foreground">32GB+ RAM</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">GPU</p>
                  <p className="text-sm text-muted-foreground">RTX 4090 / A100 40GB+</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">推荐模型</p>
                  <p className="text-sm text-muted-foreground">Llama 2 70B / Qwen 72B</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 云端GPU租赁 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>云端GPU租赁方案</CardTitle>
              <CardDescription>
                没有高性能显卡？可以租用云端GPU
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">AutoDL</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    国内GPU租赁平台，价格实惠
                  </p>
                  <Badge variant="outline">国内访问快</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Featurize</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    提供多种GPU配置
                  </p>
                  <Badge variant="outline">环境丰富</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Google Colab Pro</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    免费版可用，Pro版更强
                  </p>
                  <Badge variant="outline">易上手</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 部署步骤详解 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-6">部署步骤详解</h2>

          {/* 环境准备 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                  1
                </div>
                环境准备
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Python环境</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    推荐Python 3.10+，使用conda管理虚拟环境
                  </p>
                  <code className="block bg-muted p-2 rounded text-xs">
                    conda create -n llm python=3.10
                  </code>
                </div>
                <div>
                  <h4 className="font-medium mb-2">CUDA环境</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    如有NVIDIA显卡，安装CUDA 11.8+和cuDNN
                  </p>
                  <code className="block bg-muted p-2 rounded text-xs">
                    nvidia-smi  # 检查GPU状态
                  </code>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Docker（可选）</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    使用Docker可简化环境配置
                  </p>
                  <code className="block bg-muted p-2 rounded text-xs">
                    docker pull ollama/ollama
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 模型下载与配置 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                  2
                </div>
                模型下载与配置
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Ollama 方式（最简单）</h4>
                  <div className="space-y-2 text-sm">
                    <code className="block bg-background p-2 rounded">
                      # 下载模型
                    </code>
                    <code className="block bg-background p-2 rounded">
                      ollama pull llama2
                    </code>
                    <code className="block bg-background p-2 rounded">
                      # 查看已下载模型
                    </code>
                    <code className="block bg-background p-2 rounded">
                      ollama list
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 服务启动与测试 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                  3
                </div>
                服务启动与测试
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">启动服务</h4>
                  <div className="space-y-2 text-sm">
                    <code className="block bg-background p-2 rounded">
                      # Ollama启动API服务（默认端口11434）
                    </code>
                    <code className="block bg-background p-2 rounded">
                      ollama serve
                    </code>
                    <code className="block bg-background p-2 rounded mt-4">
                      # 测试API
                    </code>
                    <code className="block bg-background p-2 rounded">
                      curl http://localhost:11434/api/generate -d {`'{"model": "llama2", "prompt": "Hello"}'`}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* API接口暴露 */}
        <section>
          <h2 className="text-xl font-bold mb-6">API接口暴露</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>本地API服务搭建</CardTitle>
                <CardDescription>
                  使用FastAPI或Flask封装模型服务
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">FastAPI示例</h4>
                    <code className="block bg-muted p-3 rounded text-xs overflow-x-auto">
{`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Prompt(BaseModel):
    text: str

@app.post("/generate")
async def generate(prompt: Prompt):
    result = model.generate(prompt.text)
    return {"text": result}`}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>安全配置</CardTitle>
                <CardDescription>
                  认证、限流等安全措施
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-medium mb-2 text-foreground">认证机制</h4>
                    <ul className="space-y-1">
                      <li>• API Key认证</li>
                      <li>• JWT Token验证</li>
                      <li>• IP白名单限制</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-foreground">限流措施</h4>
                    <ul className="space-y-1">
                      <li>• 请求频率限制</li>
                      <li>• 并发连接数控制</li>
                      <li>• Token消耗统计</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
