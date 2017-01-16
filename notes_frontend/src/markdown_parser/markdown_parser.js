const SNIPPET_DELIMITER = 'ç';

const markdownParser = markdown => {
  let partOfSnippet = false;

  const removeUnNeeded = text => text !== '' && text !== '<';

  const groupCodeSnippets = (accum, current) => {
    let result = [...accum, current]

    if (partOfSnippet) {
      let snippet = accum[accum.length - 1];
      snippet += (current + '\n');
      result = [...accum.slice(0,-1), snippet]
    }

    if (current.substr(0,3) === '```') {
      if(!partOfSnippet) {
        partOfSnippet = true;
        result = [...accum, SNIPPET_DELIMITER]
      } else {
        partOfSnippet = false;
        result = accum
      }
    }

    return result
  }

  const mapStringToObject = text => {
    switch(text[0]) {
      case '#':
        let arrayified = text.split(' ');

        return {
          element: `h${arrayified[0].length}`,
          contents: arrayified.slice(1).join(" ")
        };
      case '!':
        const srcRegex = /http.*(?=\))/;
        const altRegex = /\[(.*)\]/;

        return {
          element: 'img',
          contents: {
            src: text.match(srcRegex)[0],
            alt: text.match(altRegex)[1]
          }
        };
      case SNIPPET_DELIMITER:
        arrayified = text.split(SNIPPET_DELIMITER);

        return {
          element: 'pre',
          contents: arrayified[1]
        };
      default:
        return {
          element: 'p',
          contents: text
        };
    }
  }

  return markdown.split('\n')
    .filter(removeUnNeeded)
    .reduce(groupCodeSnippets, [])
    .map(mapStringToObject);
}


export default markdownParser;
