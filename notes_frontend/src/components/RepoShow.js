import React from 'react';
// import HighlightSelector from './HighlightSelector';
import { Parser } from 'html-to-react';

const JSXify = (html) => {
  let divWrapper = "<div>";
  divWrapper += html;
  divWrapper += "</div>"

  const parser = new Parser();
  return parser.parse(divWrapper);
};

export default ({repo}) => {
  return (
    <div className="RepoShow col-md-9">

      <div className="markdown">
        {JSXify(repo.content)}
      </div>
    </div>
  );
}
