import React, { useState, useEffect } from 'react';
import Token from './Token';

interface IToken {
  token_id: string;
  image: string;
}

export default function App() {
  const [tokens, setTokens] = useState<IToken[]>([]);

  useEffect(() => {
    fetch('/api/tokens', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data: { tokens: IToken[] }) => setTokens(data.tokens));
  }, [setTokens]);

  const childs = tokens.map((token: IToken) => (
    <Token key={token.token_id} image={token.image} />
  ));

  return <div className="items-grid">{childs}</div>;
}
