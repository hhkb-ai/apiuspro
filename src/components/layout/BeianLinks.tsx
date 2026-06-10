import Image from 'next/image';

export function BeianLinks() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <a
        href="https://beian.miit.gov.cn/"
        rel="noopener noreferrer"
        target="_blank"
        className="footer-beian-link text-muted-foreground transition-colors hover:text-foreground"
      >
        粤ICP备2026048178号
      </a>
      <a
        href="https://beian.mps.gov.cn/#/query/webSearch?code=44162102000181"
        rel="noopener noreferrer"
        target="_blank"
        className="footer-beian-link inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
      >
        <Image
          src="/images/beian.png"
          alt="公安备案图标"
          width={16}
          height={16}
          className="h-4 w-4 border-0 outline-none shadow-none"
        />
        粤公网安备44162102000181号
      </a>
    </div>
  );
}
