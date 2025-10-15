import React from "react";

type Props = { primary: string; secondary: string };

export default function CTA({ primary, secondary }: Props) {
  return (
    <div className="flex gap-3">
      <a href="#get" className="btn btn-primary">{primary}</a>
      <a href="#demo" className="btn btn-secondary">{secondary}</a>
    </div>
  );
}

