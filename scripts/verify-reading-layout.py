"""Verify the generated book before publishing it."""

import html
import re
import sys
from collections import Counter
from pathlib import Path


TABLE = re.compile(r'<table(?=[\s>])', re.I)
WRAPPED_TABLE = re.compile(r'<div class="book-table(?: [^"]*)?">\s*<table(?=[\s>])', re.I)
CODE = re.compile(r'<(pre|code)\b[^>]*>.*?</\1>', re.S | re.I)
BLOCK = re.compile(r'<(p|li|th|td)\b[^>]*>(.*?)</\1>', re.S | re.I)
TAG = re.compile(r'<[^>]*>')
BROKEN_BOLD = re.compile(r'(?<!\*)\*\*(?=[^\s*])[^*]+[。？！；：）】]\*\*(?=\w|[（(])')
EQUALITY = 'bool eq = (a && b) || (!a && !b);'


def article_text(markup):
    return html.unescape(TAG.sub('', markup))


def check_hcl(page):
    subsection = re.search(r'<h2\b[^>]*>\s*4\.2\.2\b(.*?)<h2\b', page, re.S)
    if subsection is None:
        return False
    markup = subsection[1]
    diagram = re.search(r'<img\b[^>]*\blogic-bit-equal(?:\.[\w-]+)?\.svg', markup)
    code = next((match for match in re.finditer(r'<pre\b[^>]*>(.*?)</pre>', markup, re.S)
                 if article_text(match[1]).strip() == EQUALITY), None)
    if diagram is None or code is None or diagram.start() >= code.start():
        return False
    options = re.search(r'<ol\b[^>]*>(.*?)</ol>', markup[:diagram.start()], re.S)
    return bool(options and len(re.findall(r'<li(?=[\s>])', options[1])) == 3)


def main(dist):
    problems = []
    counts = Counter()
    for path in sorted(dist.rglob('*.html')):
        page = path.read_text(encoding='utf-8')
        if not re.search(r'class="vp-doc(?:[\s"]|$)', page):
            continue
        rel = path.relative_to(dist).as_posix()
        counts['pages'] += 1
        tables = len(TABLE.findall(page))
        counts['tables'] += tables
        if tables != len(WRAPPED_TABLE.findall(page)):
            problems.append((rel, 'Every table needs its own scroll region.'))
        if re.search(r'<link\b[^>]*href="[^"]*jetbrains-maple-mono', page):
            problems.append((rel, 'Use the default reader code font.'))
        if '**' in page:
            without_code = CODE.sub('', page)
            if any(BROKEN_BOLD.search(article_text(match[2])) for match in BLOCK.finditer(without_code)):
                problems.append((rel, 'The page displays Markdown bold delimiters in prose.'))
        if path.name.startswith('4.2 ') and 'HCL' in path.name:
            counts['hcl'] += 1
            if not check_hcl(page):
                problems.append((rel, 'Section 4.2.2 must show the logic-gate list, figure, and HCL in that order.'))

    if not counts['pages'] or not counts['tables'] or counts['hcl'] != 2:
        problems.append((str(dist), 'The built book, tables, or HCL page pair is incomplete.'))
    for path, description in problems:
        print(f'{path}: {description}')
    print(f'Reading layout checked on {counts["pages"]} pages with {counts["tables"]} tables.')
    return bool(problems)


if __name__ == '__main__':
    sys.exit(main(Path(sys.argv[1] if len(sys.argv) == 2 else '.vitepress/dist')))
