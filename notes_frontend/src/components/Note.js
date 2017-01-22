import React from 'react';

import './Note.css';


const buildEndingPoints = selections => {
  return selections.map( sel => (
    {...sel,
     entryIndex: sel.startIndex + sel.text.length,
     end: true
    })
  );
}

const concatAndSort = selections => {
  const endPoints = buildEndingPoints(selections);
  const allStartsAndEnds =
  [...selections, ...endPoints]
    .map( (sel, i) => {
    if (!sel.entryIndex) {
      sel.entryIndex = sel.startIndex;
    }
    sel.uniqueIdForKeyProp = sel._id + i;

    return sel;
  })

  return allStartsAndEnds.sort(
    (a,b) => a.entryIndex > b.entryIndex
  );
}

const prepareContent = (content, selections) => {
  const sortedSelections = concatAndSort(selections);
  let prepared = [];
  let lastSlicePoint = 0;

  for(var i = 0; i < sortedSelections.length; i++) {
    let sel = sortedSelections[i];
    let prev = sortedSelections[i - 1];
    let slicePoint = sel.entryIndex;

    prepared.push({text: content.slice(lastSlicePoint, slicePoint)});

    // EDGE CASE for
    // OVERLAPPING *BUT NOT WHOLLY NESTED WITHIN* SPANS
    if (sel.end && !prev.end && (sel._id !== prev._id)) {
      // ex: current-sel indicates to end blue span,
      // but prev says to open a green span

      // close green first
      prepared.push({
        selectionId: prev._id,
        highlighterIndex: prev.highlighterIndex,
        key: prev.uniqueIdForKeyProp,
        label: prev.label
      });
      // then close blue
      prepared.push({
        selectionId: sel._id,
        highlighterIndex: sel.highlighterIndex,
        key: sel.uniqueIdForKeyProp,
        label: sel.label
      });
      // then open a new green
      prepared.push({
        selectionId: prev._id,
        highlighterIndex: prev.highlighterIndex,
        key: prev.uniqueIdForKeyProp,
        label: sel.label
      });

    } else {
      prepared.push({
        selectionId: sel._id,
        highlighterIndex: sel.highlighterIndex,
        key: sel.uniqueIdForKeyProp,
        label: sel.label
      });
    }
    lastSlicePoint = slicePoint;
  }

  prepared.push({text: content.slice(lastSlicePoint)});
  return prepared;
}

const recursiveBuildElements = (result, remaining) => {
  if (!remaining.length) {
    return result
  } else {
    const current = remaining.shift();

    if (current.text || current.text === "") {
      result.push(current.text);
    } else {
      const endIndexForCurrent = remaining.slice(1)
        .findIndex( elem => elem.selectionId === current.selectionId);

      if (endIndexForCurrent !== -1) {
        const children = remaining.slice(0, endIndexForCurrent + 1);
        remaining = remaining.slice(endIndexForCurrent + 1);

        result.push(
          <span className="span-wrapper" key={current.key} >
            <span className="tooltiptext">
              {current.label}
            </span>
            <span
              className={`highlight-note color${current.highlighterIndex}`} >
              {recursiveBuildElements([], children)}
            </span>
          </span>
        );
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
    const preparedContents = prepareContent(contents, selections);

    return React.createElement(
      element,
      {key: elementId},
      buildElements(preparedContents)
    );
  } else {
    return React.createElement(
      element,
      {key: elementId},
      contents
    );
  }
};
