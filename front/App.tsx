import React, { useState, useEffect } from 'react';
import Token, { IToken } from './Token';

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
    <Token key={token.token_id} {...token} />
  ));

  return <div className="items-grid">{childs}</div>;
}
