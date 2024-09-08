function getHeaderHashText(headerText: string) {
  return `${encodeURIComponent(headerText.toLowerCase().replace(/\s+/g, '-'))}`;
}

export default Object.freeze({ getHeaderHashText });
