import React from 'react';

export interface IToken {
  token_id: string;
  image: string;
}

export default function Token({ image }: IToken): React.ReactElement {
  const canBeRendered = image.includes('<svg');
  if (canBeRendered) {
    return <div className="item" dangerouslySetInnerHTML={{ __html: image }} />;
  }

  return (
    <div className="item">
      <img src={image}/>
    </div>
  );
}
