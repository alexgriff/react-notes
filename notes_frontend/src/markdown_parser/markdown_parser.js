const SNIPPET_DELIMITER = 'ç';
const HEADING_DELIMITER = '#';
const IMAGE_DELIMITER = '!';
const SNIPPET_START = '```';

const markdownParser = markdown => {
  let partOfSnippet = false;
  let partOfParagraphGroup = false;

  const removeUnNeeded = text => text !== '' && text[0] !== '<';

  const groupCodeSnippets = (accum, current) => {
    let result = accum

    if (partOfSnippet) {
      if (current.substr(0,3) !== SNIPPET_START) {
        let snippet = accum[accum.length - 1];
        snippet += (current + '\n');
        result = [...accum.slice(0,-1), snippet]
      }
    }

    if (current.substr(0,3) === SNIPPET_START) {
      if(!partOfSnippet) {
        partOfSnippet = true;
        result = [...accum, SNIPPET_DELIMITER]
      } else {
        partOfSnippet = false;
      }
    }

    return result;
  };

  const isBodyText = text => {
    return ![HEADING_DELIMITER, IMAGE_DELIMITER].includes(text[0]) && text.substr(0,3) !== SNIPPET_START
  }

  const groupParagraphs = (accum, current) => {
    let result = accum;
    if(!partOfSnippet) {
      result = [...accum, current];
      if (isBodyText(current)) {
        if (!partOfParagraphGroup) {
          partOfParagraphGroup = true;
        } else {
          let currentGroup = accum[accum.length - 1];
          currentGroup += ('\n\n' + current);
          result = [...accum.slice(0,-1), currentGroup];
        }
      } else {
        if (current.substr(0,3) === SNIPPET_START) {
          result = accum;
        }
        partOfParagraphGroup = false;
      }

    }

    return result;
  };

  const groupTogetherSections = (accum, current) => {
    const _accum = groupCodeSnippets(accum, current);
    return groupParagraphs(_accum, current);
  };

  const mapStringToObject = text => {
    switch(text[0]) {
      case HEADING_DELIMITER:
        let arrayified = text.split(' ');

        return {
          element: `h${arrayified[0].length}`,
          contents: arrayified.slice(1).join(" ")
        };
      case IMAGE_DELIMITER:
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
    .reduce(groupTogetherSections, [])
    .map(mapStringToObject);
}


export default markdownParser;
