function escapeHTML(str: string) {
  return str
    .replaceAll('&#8211;', '–')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

export default escapeHTML;
