from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE_URL = "https://sostlabs.com"
OG_IMAGE = "https://cdn.imweb.me/upload/S2023030963558ef55ba8e/b8011da8ce265.png"
LAST_MODIFIED = "2026-08-06"

PAGES = {
    "index.html": {
        "url": f"{SITE_URL}/",
        "title": "기업 홈페이지 제작·웹 퍼블리싱·업무 시스템 구축 | SOST STABLE LABS",
        "description": "기업 홈페이지 제작, 반응형 웹 퍼블리싱, 카페24 쇼핑몰과 CRM·업무관리 시스템을 기획부터 개발·운영까지 구축합니다.",
    },
    "about.html": {
        "url": f"{SITE_URL}/about.html",
        "title": "개발·퍼블리싱 전문 기업 소개 | SOST STABLE LABS",
        "description": "기업의 웹사이트, 커머스, 고객관리와 업무 운영체계를 설계하고 구축하는 개발·퍼블리싱 전문 기업 SOST STABLE LABS를 소개합니다.",
    },
    "solutions.html": {
        "url": f"{SITE_URL}/solutions.html",
        "title": "기업 홈페이지·CRM·카페24 쇼핑몰 구축 | SOST STABLE LABS",
        "description": "기업 홈페이지 제작, 웹서비스, CRM, 관리자 대시보드, 카페24 쇼핑몰, HR·주문발주·전자결재 시스템 구축 솔루션을 제공합니다.",
    },
    "projects.html": {
        "url": f"{SITE_URL}/projects.html",
        "title": "기업 홈페이지·웹 플랫폼 구축 사례 | SOST STABLE LABS",
        "description": "기업 홈페이지와 콘텐츠·회원 플랫폼을 기획하고 개발한 실제 구축 사례를 정보 구조, 기능과 운영 시스템 중심으로 소개합니다.",
    },
    "capabilities.html": {
        "url": f"{SITE_URL}/capabilities.html",
        "title": "Firebase·프론트엔드·카페24 개발 역량 | SOST STABLE LABS",
        "description": "서비스 기획, UX/UI 디자인, 반응형 웹 퍼블리싱, 프론트엔드, Firebase, API 연동과 카페24 개발 역량을 소개합니다.",
    },
    "labs.html": {
        "url": f"{SITE_URL}/labs.html",
        "title": "웹 개발·퍼블리싱·기업 시스템 인사이트 | SOST STABLE LABS",
        "description": "기업 홈페이지 제작, 웹 퍼블리싱, 카페24 운영, CRM과 업무 시스템 구축에 관한 기술·운영 인사이트를 기록합니다.",
    },
    "contact.html": {
        "url": f"{SITE_URL}/contact.html",
        "title": "홈페이지·시스템 구축 프로젝트 문의 | SOST STABLE LABS",
        "description": "기업 홈페이지, 카페24 쇼핑몰, CRM, 관리자 페이지와 업무관리 시스템 구축 범위·일정·예산을 상담하고 프로젝트를 문의하세요.",
    },
}


def remove_tag(source: str, pattern: str) -> str:
    return re.sub(pattern, "", source, flags=re.IGNORECASE | re.MULTILINE)


def build_meta(config: dict[str, str]) -> str:
    title = html.escape(config["title"], quote=True)
    description = html.escape(config["description"], quote=True)
    url = html.escape(config["url"], quote=True)
    image = html.escape(OG_IMAGE, quote=True)
    return f'''  <meta name="description" content="{description}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <link rel="canonical" href="{url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{url}" />
  <meta property="og:site_name" content="SOST STABLE LABS" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:image" content="{image}" />
  <meta property="og:image:secure_url" content="{image}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:alt" content="SOST STABLE LABS 기업 홈페이지 제작·웹 개발·비즈니스 시스템 구축" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="{image}" />
'''


def clean_existing_seo(source: str) -> str:
    patterns = [
        r'^\s*<meta\s+name=["\']description["\'][^>]*?/?>\s*$',
        r'^\s*<meta\s+name=["\']robots["\'][^>]*?/?>\s*$',
        r'^\s*<link\s+rel=["\']canonical["\'][^>]*?/?>\s*$',
        r'^\s*<meta\s+property=["\']og:[^"\']+["\'][^>]*?/?>\s*$',
        r'^\s*<meta\s+name=["\']twitter:[^"\']+["\'][^>]*?/?>\s*$',
    ]
    for pattern in patterns:
        source = remove_tag(source, pattern)
    source = re.sub(
        r'\s*<script\s+type=["\']application/ld\+json["\']\s+data-seo-schema[^>]*>.*?</script>\s*',
        "\n",
        source,
        flags=re.IGNORECASE | re.DOTALL,
    )
    return source


def organization_schema() -> str:
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": f"{SITE_URL}/#organization",
                "name": "SOST STABLE LABS",
                "alternateName": "SOST Labs",
                "url": f"{SITE_URL}/",
                "logo": f"{SITE_URL}/assets/logo-sost-stable-labs.svg",
                "image": OG_IMAGE,
                "description": "기업 홈페이지 제작, 웹 퍼블리싱, 카페24 쇼핑몰과 CRM·업무관리 시스템을 구축하는 개발·퍼블리싱 전문 기업입니다.",
                "email": "info@9works.kr",
                "telephone": "+82-32-208-5650",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "원당대로 1039 태경타워 915호",
                    "addressLocality": "서구",
                    "addressRegion": "인천광역시",
                    "postalCode": "23450",
                    "addressCountry": "KR",
                },
                "areaServed": {"@type": "Country", "name": "대한민국"},
            },
            {
                "@type": "WebSite",
                "@id": f"{SITE_URL}/#website",
                "url": f"{SITE_URL}/",
                "name": "SOST STABLE LABS",
                "alternateName": "SOST Labs",
                "publisher": {"@id": f"{SITE_URL}/#organization"},
                "inLanguage": "ko-KR",
            },
        ],
    }
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    return f'  <script type="application/ld+json" data-seo-schema>\n{payload}\n  </script>\n'


def update_page(path: Path, config: dict[str, str], is_home: bool = False) -> None:
    source = path.read_text(encoding="utf-8")
    source = clean_existing_seo(source)
    source = re.sub(
        r'<title>.*?</title>',
        f'<title>{html.escape(config["title"])}</title>',
        source,
        count=1,
        flags=re.IGNORECASE | re.DOTALL,
    )
    source = source.replace('href="./index.html"', 'href="./"')
    meta = build_meta(config)
    source = source.replace("<title>", meta + "  <title>", 1)
    if is_home:
        source = source.replace("</head>", organization_schema() + "</head>", 1)
    path.write_text(source, encoding="utf-8")


for filename, config in PAGES.items():
    target = ROOT / filename
    if not target.exists():
        raise FileNotFoundError(f"Required SEO page is missing: {filename}")
    update_page(target, config, is_home=filename == "index.html")

# Dynamic project detail pages currently share one HTML head, so avoid duplicate generic indexing.
project_detail = ROOT / "project-detail.html"
if project_detail.exists():
    source = project_detail.read_text(encoding="utf-8")
    source = remove_tag(source, r'^\s*<meta\s+name=["\']robots["\'][^>]*?/?>\s*$')
    source = source.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <meta name="robots" content="noindex,follow" />',
        1,
    )
    source = source.replace('href="./index.html"', 'href="./"')
    project_detail.write_text(source, encoding="utf-8")

robots = f"""User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /kakao-preview.html

Sitemap: {SITE_URL}/sitemap.xml
"""
(ROOT / "robots.txt").write_text(robots, encoding="utf-8")

urls = [config["url"] for config in PAGES.values()]
sitemap_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
]
for url in urls:
    sitemap_lines.extend([
        "  <url>",
        f"    <loc>{html.escape(url)}</loc>",
        f"    <lastmod>{LAST_MODIFIED}</lastmod>",
        "  </url>",
    ])
sitemap_lines.append("</urlset>")
(ROOT / "sitemap.xml").write_text("\n".join(sitemap_lines) + "\n", encoding="utf-8")

print("Applied SEO metadata to:", ", ".join(PAGES))
print("Generated robots.txt and sitemap.xml")
