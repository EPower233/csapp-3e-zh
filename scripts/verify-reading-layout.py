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
ALERT_TITLE = re.compile(r'<p class="custom-block-title">(.*?)</p>', re.S)
TYPEDEF_EXAMPLE = 'typedef int* int_pointer;\nint_pointer ip;'


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


def check_information_storage(page):
    listings = [article_text(match).strip() for match in re.findall(r'<pre\b[^>]*>(.*?)</pre>', page, re.S)]
    diagrams = [listing.splitlines() for listing in listings]
    return (
        TYPEDEF_EXAMPLE in listings
        and any(len(lines) == 5
                and lines[0].split() == '0 0 0 0 3 0 3 9'.split()
                and lines[2] == ' ' * 19 + '*' * 13
                and lines[3].split() == '4 6 4 0 E 4 0 0'.split() for lines in diagrams)
        and bool(re.search(r'<p class="custom-block-title">[^<]*<code>printf</code>', page))
    )


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
        if any('`' in article_text(re.sub(r'<code\b[^>]*>.*?</code>', '', title, flags=re.S))
               for title in ALERT_TITLE.findall(page)):
            problems.append((rel, 'The page displays raw inline code delimiters in a callout title.'))
        if path.name.startswith('2.1 '):
            counts['information-storage'] += 1
            if not check_information_storage(page):
                problems.append((rel, 'Section 2.1 must preserve the pointer, binary diagram and formatted note title.'))
        if '**' in page:
            without_code = CODE.sub('', page)
            if any(BROKEN_BOLD.search(article_text(match[2])) for match in BLOCK.finditer(without_code)):
                problems.append((rel, 'The page displays Markdown bold delimiters in prose.'))
        if path.name.startswith('4.2 ') and 'HCL' in path.name:
            counts['hcl'] += 1
            if not check_hcl(page):
                problems.append((rel, 'Section 4.2.2 must show the logic-gate list, figure, and HCL in that order.'))

    if not counts['pages'] or not counts['tables'] or counts['hcl'] != 2 or counts['information-storage'] != 2:
        problems.append((str(dist), 'The built book, tables, or regression page pairs are incomplete.'))
    for path, description in problems:
        print(f'{path}: {description}')
    print(f'Reading layout checked on {counts["pages"]} pages with {counts["tables"]} tables.')
    return bool(problems)


if __name__ == '__main__':
    sys.exit(main(Path(sys.argv[1] if len(sys.argv) == 2 else '.vitepress/dist')))
