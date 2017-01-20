import React from 'react';

import './Note.css';

const buildEndingPoints = selections => {
  return selections.map( sel => (
    {...sel,
     entryIndex: sel.startIndex + sel.text.length
    })
  );
}

const concatAndSort = selections => {
  const endPoints = buildEndingPoints(selections);
  const allStartsAndEnds = [...selections, ...endPoints];

  return allStartsAndEnds.map( sel => {
    if (!sel.entryIndex) {
      sel.entryIndex = sel.startIndex;
    }
    return sel;
  })
  .sort(
    (a,b) => a.entryIndex > b.entryIndex
  );
}

const prepareContent = (content, selections) => {
  const sortedSelections = concatAndSort(selections);
  let prepared = [];
  let lastSlicePoint = 0;

  for(var i = 0; i < sortedSelections.length; i++) {
    let sel = sortedSelections[i];
    let slicePoint = sel.entryIndex;
    prepared.push({text: content.slice(lastSlicePoint, slicePoint)});
    prepared.push({selectionId: sel._id, highlighterIndex: sel.highlighterIndex});
    lastSlicePoint = slicePoint;
  }

  prepared.push({text: content.slice(lastSlicePoint)})
  return prepared;
}

const recursiveBuildElements = (result, remaining) => {
  if (!remaining.length) {
    return result
  } else {
    if (remaining[0].text) {
      result.push(remaining.shift().text);
    } else {
      const endIndexForCurrent = remaining.slice(1)
        .findIndex( elem => elem.selectionId === remaining[0].selectionId);

      if (endIndexForCurrent !== -1) {
        let children = remaining.splice(1, endIndexForCurrent);
        let current = remaining.shift();
        result.push(
          <span
          key={current.selectionId}
          className={`highlight-note color${current.highlighterIndex}`} >
            {recursiveBuildElements([], children)}
          </span>
        );
      } else {
        remaining.shift();
      }
    }
    return recursiveBuildElements(result, remaining);
  }
};

const buildElements = (noteContent) => {
  return recursiveBuildElements([], noteContent)
}



export default ({element, elementId, selections, contents}) => {
  if(selections.length) {
    return React.createElement(
      element,
      {},
      buildElements(prepareContent(contents, selections))
    );
  } else {
    return React.createElement(
      element,
      {},
      contents
    );
  }
};
