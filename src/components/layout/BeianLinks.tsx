export function BeianLinks() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <a
        href="https://beian.miit.gov.cn/"
        rel="noopener noreferrer"
        target="_blank"
        className="transition-colors hover:text-foreground"
      >
        粤ICP备2026048178号
      </a>
      <a
        href="https://beian.mps.gov.cn/#/query/webSearch?code=44162102000181"
        rel="noopener noreferrer"
        target="_blank"
        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
      >
        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-current text-[10px] font-semibold leading-none"
        >
          安
        </span>
        粤公网安备44162102000181号
      </a>
    </div>
  );
}
