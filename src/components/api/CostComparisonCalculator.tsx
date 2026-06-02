'use client';

import { useMemo, useState } from 'react';

const USD_TO_CNY = 7.25;
const DAYS_PER_MONTH = 30;

const deepSeekModels = [
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    inputCnyPerMillion: 1,
    cachedInputCnyPerMillion: 0.02,
    outputCnyPerMillion: 2,
  },
  {
    id: 'deepseek-v4-pro',
    name: 'DeepSeek V4 Pro（折扣期）',
    inputCnyPerMillion: 3,
    cachedInputCnyPerMillion: 0.025,
    outputCnyPerMillion: 6,
  },
];

const openAIModels = [
  {
    id: 'gpt-5.5',
    name: 'OpenAI GPT-5.5',
    inputUsdPerMillion: 5,
    outputUsdPerMillion: 30,
  },
  {
    id: 'gpt-5.5-batch-flex',
    name: 'GPT-5.5 Batch/Flex',
    inputUsdPerMillion: 2.5,
    outputUsdPerMillion: 15,
  },
  {
    id: 'gpt-5.5-pro',
    name: 'GPT-5.5 Pro',
    inputUsdPerMillion: 30,
    outputUsdPerMillion: 180,
  },
];

function clampNumber(value: string, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

function formatCurrency(value: number) {
  if (value >= 10000) return `¥${Math.round(value).toLocaleString('zh-CN')}`;
  if (value >= 100) return `¥${value.toFixed(0)}`;
  if (value >= 10) return `¥${value.toFixed(1)}`;
  return `¥${value.toFixed(2)}`;
}

function formatTimes(value: number) {
  if (!Number.isFinite(value) || value <= 0) return '0x';
  if (value >= 100) return `${Math.round(value)}x`;
  if (value >= 10) return `${value.toFixed(1)}x`;
  return `${value.toFixed(2)}x`;
}

function NumberField({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="mt-2 flex min-h-11 items-center rounded-xl border border-border bg-background px-3 focus-within:border-foreground/40">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(clampNumber(event.target.value, min, min, max))}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none"
        />
        {suffix && <span className="ml-2 shrink-0 text-xs text-muted-foreground">{suffix}</span>}
      </div>
    </label>
  );
}

export function CostComparisonCalculator() {
  const [deepSeekModelId, setDeepSeekModelId] = useState(deepSeekModels[0].id);
  const [openAIModelId, setOpenAIModelId] = useState(openAIModels[0].id);
  const [requestsPerDay, setRequestsPerDay] = useState(1000);
  const [inputTokens, setInputTokens] = useState(2000);
  const [outputTokens, setOutputTokens] = useState(800);
  const [cacheHitRate, setCacheHitRate] = useState(20);

  const result = useMemo(() => {
    const deepSeek = deepSeekModels.find((model) => model.id === deepSeekModelId) ?? deepSeekModels[0];
    const openAI = openAIModels.find((model) => model.id === openAIModelId) ?? openAIModels[0];
    const dailyInputTokens = requestsPerDay * inputTokens;
    const dailyOutputTokens = requestsPerDay * outputTokens;
    const cachedInputTokens = dailyInputTokens * (cacheHitRate / 100);
    const normalInputTokens = dailyInputTokens - cachedInputTokens;

    const deepSeekDaily =
      (normalInputTokens / 1_000_000) * deepSeek.inputCnyPerMillion +
      (cachedInputTokens / 1_000_000) * deepSeek.cachedInputCnyPerMillion +
      (dailyOutputTokens / 1_000_000) * deepSeek.outputCnyPerMillion;

    const openAIDaily =
      (dailyInputTokens / 1_000_000) * openAI.inputUsdPerMillion * USD_TO_CNY +
      (dailyOutputTokens / 1_000_000) * openAI.outputUsdPerMillion * USD_TO_CNY;

    const monthlyDeepSeek = deepSeekDaily * DAYS_PER_MONTH;
    const monthlyOpenAI = openAIDaily * DAYS_PER_MONTH;
    const monthlySavings = Math.max(monthlyOpenAI - monthlyDeepSeek, 0);
    const ratio = monthlyDeepSeek > 0 ? monthlyOpenAI / monthlyDeepSeek : 0;

    return {
      deepSeek,
      openAI,
      deepSeekDaily,
      openAIDaily,
      monthlyDeepSeek,
      monthlyOpenAI,
      monthlySavings,
      ratio,
      dailyInputTokens,
      dailyOutputTokens,
    };
  }, [cacheHitRate, deepSeekModelId, inputTokens, openAIModelId, outputTokens, requestsPerDay]);

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border bg-muted/25 px-5 py-5 sm:px-6">
        <p className="text-sm font-medium text-muted-foreground">Cost Calculator</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">DeepSeek vs OpenAI 实时成本计算器</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          输入每天请求量和平均 Token，用站内价格估算 DeepSeek 与 OpenAI 的日成本、月成本和节省金额。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-foreground">DeepSeek 模型</span>
              <select
                value={deepSeekModelId}
                onChange={(event) => setDeepSeekModelId(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-foreground/40"
              >
                {deepSeekModels.map((model) => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-foreground">OpenAI 模型</span>
              <select
                value={openAIModelId}
                onChange={(event) => setOpenAIModelId(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-foreground/40"
              >
                {openAIModels.map((model) => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NumberField label="每天请求量" value={requestsPerDay} min={1} max={10_000_000} suffix="次/天" onChange={setRequestsPerDay} />
            <NumberField label="平均输入" value={inputTokens} min={0} max={1_000_000} suffix="Token/次" onChange={setInputTokens} />
            <NumberField label="平均输出" value={outputTokens} min={0} max={384_000} suffix="Token/次" onChange={setOutputTokens} />
            <NumberField label="缓存命中" value={cacheHitRate} min={0} max={100} suffix="%" onChange={setCacheHitRate} />
          </div>

          <div className="grid gap-3 rounded-xl border border-border bg-background/55 p-4 text-sm text-muted-foreground sm:grid-cols-2">
            <p><span className="font-medium text-foreground">日输入量：</span>{Math.round(result.dailyInputTokens).toLocaleString('zh-CN')} Token</p>
            <p><span className="font-medium text-foreground">日输出量：</span>{Math.round(result.dailyOutputTokens).toLocaleString('zh-CN')} Token</p>
            <p><span className="font-medium text-foreground">DeepSeek 单价：</span>输入 ¥{result.deepSeek.inputCnyPerMillion}/百万，输出 ¥{result.deepSeek.outputCnyPerMillion}/百万</p>
            <p><span className="font-medium text-foreground">OpenAI 折算：</span>输入 ${(result.openAI.inputUsdPerMillion).toFixed(1)}/百万，输出 ${(result.openAI.outputUsdPerMillion).toFixed(1)}/百万</p>
          </div>
        </div>

        <aside className="border-t border-border bg-background/40 p-5 sm:p-6 lg:border-l lg:border-t-0">
          <div className="grid gap-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">DeepSeek 月成本</p>
              <p className="mt-1 text-2xl font-semibold">{formatCurrency(result.monthlyDeepSeek)}</p>
              <p className="mt-1 text-xs text-muted-foreground">日成本 {formatCurrency(result.deepSeekDaily)}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">OpenAI 月成本</p>
              <p className="mt-1 text-2xl font-semibold">{formatCurrency(result.monthlyOpenAI)}</p>
              <p className="mt-1 text-xs text-muted-foreground">日成本 {formatCurrency(result.openAIDaily)}</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
              <p className="text-xs font-medium">预计每月节省</p>
              <p className="mt-1 text-2xl font-semibold">{formatCurrency(result.monthlySavings)}</p>
              <p className="mt-1 text-xs">OpenAI 约为 DeepSeek 的 {formatTimes(result.ratio)}</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            说明：OpenAI 按 1 USD ≈ 7.25 RMB 折算；DeepSeek 缓存命中仅作用于输入 Token。实际账单以各平台控制台为准。
          </p>
        </aside>
      </div>
    </section>
  );
}
